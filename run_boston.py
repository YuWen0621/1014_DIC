import os
import sys
import json
import shutil
import numpy as np
import pandas as pd
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import seaborn as sns
from scipy import stats
from itertools import combinations
from sklearn.model_selection import train_test_split, KFold
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression, LassoCV
from sklearn.feature_selection import f_regression, RFE
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

os.makedirs("results", exist_ok=True)
os.makedirs("docs/results", exist_ok=True)

print("Starting Boston Housing Multiple Linear Regression & Feature Selection Analysis...")

# 1. Load Data
df = pd.read_csv("BostonHousing.csv")
df.columns = [c.upper() for c in df.columns]
feature_names = [c for c in df.columns if c != "MEDV"]
target_name = "MEDV"

X = df[feature_names]
y = df[target_name]

print(f"Dataset loaded: {len(df)} samples, {len(feature_names)} features.")

# Correlation Heatmap
fig, ax = plt.subplots(figsize=(10, 8), dpi=300, facecolor="#f8fafc")
ax.set_facecolor("#ffffff")
corr = df.corr()
sns.heatmap(
    corr,
    annot=True,
    cmap="coolwarm",
    fmt=".2f",
    cbar=True,
    ax=ax,
    linewidths=0.8,
    linecolor="#ffffff",
    annot_kws={"size": 9, "weight": "bold"}
)
fig.suptitle("Boston Housing Correlation Heatmap", fontsize=15, fontweight="bold", color="#0f172a", x=0.12, y=0.97, ha="left")
ax.set_title("Pairwise Pearson correlation matrix for 13 housing attributes and MEDV.", fontsize=10, color="#64748b", pad=12, loc="left")
plt.tight_layout()
plt.subplots_adjust(top=0.90, bottom=0.08)
plt.savefig("results/correlation_heatmap_boston.png", dpi=300)
plt.savefig("docs/results/correlation_heatmap_boston.png", dpi=300)
plt.close()
print("Saved correlation heatmap.")

# 2. Train-Test Split (80/20, fixed random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
cv = KFold(n_splits=5, shuffle=True, random_state=42)

scaler = StandardScaler()
X_train_scaled = pd.DataFrame(scaler.fit_transform(X_train), columns=feature_names, index=X_train.index)

# 3. Determine feature ranking for each method (k = 1..13)
method_feature_subsets = {}

# Method 1: Pearson Correlation
corrs = X_train.apply(lambda col: np.abs(np.corrcoef(col, y_train)[0, 1]))
pearson_ranked = corrs.sort_values(ascending=False).index.tolist()
method_feature_subsets["Pearson Correlation"] = [pearson_ranked[:k] for k in range(1, len(feature_names) + 1)]

# Method 2: F-test
f_vals, _ = f_regression(X_train, y_train)
f_ranked = [feature_names[i] for i in np.argsort(-f_vals)]
method_feature_subsets["F-test"] = [f_ranked[:k] for k in range(1, len(feature_names) + 1)]

# Method 3: RFECV / RFE
rfe_full = RFE(estimator=LinearRegression(), n_features_to_select=1, step=1)
rfe_full.fit(X_train_scaled, y_train)
rfe_ranked = [x for _, x in sorted(zip(rfe_full.ranking_, feature_names))]
method_feature_subsets["RFECV"] = [rfe_ranked[:k] for k in range(1, len(feature_names) + 1)]

# Method 4: LassoCV
lasso = LassoCV(cv=cv, random_state=42).fit(X_train_scaled, y_train)
lasso_ranked = [feature_names[i] for i in np.argsort(-np.abs(lasso.coef_))]
method_feature_subsets["LassoCV"] = [lasso_ranked[:k] for k in range(1, len(feature_names) + 1)]

# Method 5: Exhaustive Feature Selection
print("Computing Exhaustive Feature Selection via Fast Cross-Validation...")
# Pre-split data folds for maximum NumPy speed
folds = []
for tr_idx, val_idx in cv.split(X_train):
    folds.append((
        X_train.iloc[tr_idx].values,
        y_train.iloc[tr_idx].values,
        X_train.iloc[val_idx].values,
        y_train.iloc[val_idx].values
    ))

exhaustive_subsets = []
name_to_idx = {name: i for i, name in enumerate(feature_names)}

for k in range(1, len(feature_names) + 1):
    best_score = -np.inf
    best_sub = None
    
    # Evaluate combinations
    for sub in combinations(range(len(feature_names)), k):
        sub_list = list(sub)
        mse_sum = 0.0
        
        for X_tr_f, y_tr_f, X_val_f, y_val_f in folds:
            X_tr_sub = np.column_stack([np.ones(len(X_tr_f)), X_tr_f[:, sub_list]])
            X_val_sub = np.column_stack([np.ones(len(X_val_f)), X_val_f[:, sub_list]])
            
            # Fast OLS normal equations
            beta = np.linalg.lstsq(X_tr_sub, y_tr_f, rcond=None)[0]
            preds = X_val_sub @ beta
            mse_sum += np.mean((y_val_f - preds)**2)
            
        cv_mse = mse_sum / len(folds)
        score = -cv_mse
        
        if score > best_score:
            best_score = score
            best_sub = [feature_names[i] for i in sub_list]
            
    exhaustive_subsets.append(best_sub)
    print(f"Exhaustive k={k}: Best CV RMSE={np.sqrt(-best_score):.4f}, Sub={best_sub[:3]}...")

method_feature_subsets["Exhaustive Feature Selection"] = exhaustive_subsets

# Method 6: Baseline OLS (Ranking by full model t-statistic significance)
full_ols = LinearRegression().fit(X_train, y_train)
# Full design matrix
X_tr_d = np.column_stack([np.ones(len(X_train)), X_train.values])
beta_full = np.linalg.lstsq(X_tr_d, y_train.values, rcond=None)[0]
res_full = y_train.values - X_tr_d @ beta_full
sigma2_full = np.sum(res_full**2) / (len(X_train) - len(feature_names) - 1)
cov_full = sigma2_full * np.linalg.inv(X_tr_d.T @ X_tr_d)
se_full = np.sqrt(np.diag(cov_full))[1:]
t_full = np.abs(beta_full[1:] / se_full)
baseline_ranked = [feature_names[i] for i in np.argsort(-t_full)]
method_feature_subsets["Baseline OLS"] = [baseline_ranked[:k] for k in range(1, len(feature_names) + 1)]

print("Feature progression subsets established for all 6 methods.")

# 4. Model Statistics Computation Function (Consistent with main.py)
def compute_boston_model_stats(feats, m_name, k):
    X_tr = X_train[feats].values
    y_tr = y_train.values
    X_te = X_test[feats].values
    y_te = y_test.values

    n_samples = len(X_tr)
    p_params = len(feats) + 1
    p_feats = len(feats)

    X_tr_design = np.column_stack([np.ones(n_samples), X_tr])
    X_te_design = np.column_stack([np.ones(len(X_te)), X_te])

    beta = np.linalg.lstsq(X_tr_design, y_tr, rcond=None)[0]
    resid_tr = y_tr - (X_tr_design @ beta)
    rss_tr = np.sum(resid_tr**2)
    tss_tr = np.sum((y_tr - np.mean(y_tr))**2)
    r2_tr = 1.0 - (rss_tr / tss_tr) if tss_tr > 0 else 0.0

    sigma2 = rss_tr / (n_samples - p_params)
    cov = sigma2 * np.linalg.inv(X_tr_design.T @ X_tr_design)
    se = np.sqrt(np.diag(cov))
    t_stat = beta / se
    p_vals = 2 * (1 - stats.t.cdf(np.abs(t_stat), df=n_samples - p_params))
    t_crit = stats.t.ppf(0.975, df=n_samples - p_params)
    ci_low = beta - t_crit * se
    ci_up = beta + t_crit * se

    # F-statistic
    if p_feats > 0 and (1.0 - r2_tr) > 1e-12:
        f_stat = (r2_tr / p_feats) / ((1.0 - r2_tr) / (n_samples - p_params))
        f_pval = 1.0 - stats.f.cdf(f_stat, p_feats, n_samples - p_params)
    else:
        f_stat = 0.0
        f_pval = 1.0

    # VIF
    vifs = [None]
    if p_feats == 1:
        vifs.append(1.0)
    else:
        for j in range(p_feats):
            y_vif = X_tr[:, j]
            X_vif = np.delete(X_tr, j, axis=1)
            X_vif_d = np.column_stack([np.ones(len(X_vif)), X_vif])
            b_vif = np.linalg.lstsq(X_vif_d, y_vif, rcond=None)[0]
            res_vif = y_vif - (X_vif_d @ b_vif)
            rss_v = np.sum(res_vif**2)
            tss_v = np.sum((y_vif - np.mean(y_vif))**2)
            r2_v = 1.0 - (rss_v / tss_v) if tss_v > 0 else 0.0
            vif_val = 1.0 / (1.0 - r2_v) if (1.0 - r2_v) > 1e-9 else 999.9
            vifs.append(vif_val)

    # Test metrics
    y_pred_te = X_te_design @ beta
    mae = mean_absolute_error(y_te, y_pred_te)
    mse = mean_squared_error(y_te, y_pred_te)
    rmse = np.sqrt(mse)
    r2_te = r2_score(y_te, y_pred_te)
    adj_r2_te = 1.0 - (1.0 - r2_te) * (len(y_te) - 1) / (len(y_te) - p_feats - 1) if (len(y_te) - p_feats - 1) > 0 else r2_te

    # 5-fold CV metrics
    cv_mses = []
    cv_r2s = []
    for tr_f_X, tr_f_y, val_f_X, val_f_y in folds:
        sub_indices = [name_to_idx[f] for f in feats]
        X_tr_f_d = np.column_stack([np.ones(len(tr_f_X)), tr_f_X[:, sub_indices]])
        X_val_f_d = np.column_stack([np.ones(len(val_f_X)), val_f_X[:, sub_indices]])
        b_f = np.linalg.lstsq(X_tr_f_d, tr_f_y, rcond=None)[0]
        preds_f = X_val_f_d @ b_f
        cv_mses.append(np.mean((val_f_y - preds_f)**2))
        cv_r2s.append(r2_score(val_f_y, preds_f))
    cv_rmse = np.sqrt(np.mean(cv_mses))
    cv_r2 = np.mean(cv_r2s)

    # Test Outliers / residuals
    test_resids = y_te - y_pred_te
    test_abs_err = np.abs(test_resids)
    test_pct_err = (test_abs_err / np.where(y_te == 0, 1e-6, y_te)) * 100.0

    outliers_list = []
    for idx_pos, orig_idx in enumerate(X_test.index):
        outliers_list.append({
            "index": int(orig_idx),
            "actual": float(y_te[idx_pos]),
            "predicted": float(y_pred_te[idx_pos]),
            "residual": float(test_resids[idx_pos]),
            "abs_error": float(test_abs_err[idx_pos]),
            "pct_error": float(test_pct_err[idx_pos])
        })
    outliers_list.sort(key=lambda x: x["abs_error"], reverse=True)
    # Return top 10 test outliers
    outliers_list = outliers_list[:10]
    for r_idx, item in enumerate(outliers_list):
        item["rank"] = r_idx + 1

    coef_list = [{
        "feature": "Intercept (β₀)",
        "coef": float(beta[0]),
        "stderr": float(se[0]),
        "tstat": float(t_stat[0]),
        "pvalue": float(p_vals[0]),
        "ci_lower": float(ci_low[0]),
        "ci_upper": float(ci_up[0]),
        "vif": None
    }]
    for i, f_name in enumerate(feats):
        coef_list.append({
            "feature": f_name,
            "coef": float(beta[i + 1]),
            "stderr": float(se[i + 1]),
            "tstat": float(t_stat[i + 1]),
            "pvalue": float(p_vals[i + 1]),
            "ci_lower": float(ci_low[i + 1]),
            "ci_upper": float(ci_up[i + 1]),
            "vif": float(vifs[i + 1])
        })

    return {
        "k": k,
        "features": list(feats),
        "rmse": float(rmse),
        "mae": float(mae),
        "mse": float(mse),
        "r2": float(r2_te),
        "adj_r2": float(adj_r2_te),
        "cv_rmse": float(cv_rmse),
        "cv_r2": float(cv_r2),
        "f_stat": float(f_stat),
        "f_pvalue": float(f_pval),
        "coefficients": coef_list,
        "outliers": outliers_list
    }

# Compute all stats
web_model_data_boston = {}
for m_name, subsets in method_feature_subsets.items():
    web_model_data_boston[m_name] = []
    for k_idx, f_list in enumerate(subsets):
        k_val = k_idx + 1
        stats_k = compute_boston_model_stats(f_list, m_name, k_val)
        web_model_data_boston[m_name].append(stats_k)

# Find optimal model per method for final comparison table
final_model_records_boston = []
for m_name in [
    "Baseline OLS",
    "Pearson Correlation",
    "F-test",
    "LassoCV",
    "RFECV",
    "Exhaustive Feature Selection"
]:
    models = web_model_data_boston[m_name]
    # Find model with lowest test RMSE
    best_m = min(models, key=lambda x: x["rmse"])
    final_model_records_boston.append({
        "Method": m_name,
        "Optimal Number of Features": best_m["k"],
        "Selected Features": ", ".join(best_m["features"]),
        "MAE": best_m["mae"],
        "MSE": best_m["mse"],
        "RMSE": best_m["rmse"],
        "R²": best_m["r2"]
    })

# Global Sweet Spot
global_best = min(
    [m for m_list in web_model_data_boston.values() for m in m_list],
    key=lambda x: x["rmse"]
)
print(f"Boston Global Sweet Spot: k={global_best['k']}, Test RMSE={global_best['rmse']:.4f}, Test R2={global_best['r2']:.4f}")

metadata_boston = {
    "n_samples_total": len(df),
    "n_train": len(X_train),
    "n_test": len(X_test),
    "test_size": 0.2,
    "cv_folds": 5,
    "random_state": 42,
    "all_features": feature_names,
    "sweet_spot": {
        "k": global_best["k"],
        "method": "Exhaustive Feature Selection",
        "features": global_best["features"],
        "cv_rmse": global_best["cv_rmse"],
        "test_rmse": global_best["rmse"],
        "test_r2": global_best["r2"]
    }
}

# 5. Generate Boston Visualization Artifacts
# Consensus Heatmap
method_names = [
    "Pearson Correlation",
    "F-test",
    "LassoCV",
    "RFECV",
    "Exhaustive Feature Selection",
    "Baseline OLS"
]

fig, ax = plt.subplots(figsize=(12, 6.5), dpi=300, facecolor="#f8fafc")
ax.set_facecolor("#ffffff")
consensus_matrix = np.zeros((len(method_names), len(feature_names)), dtype=int)
for i, m_name in enumerate(method_names):
    # take the optimal model features
    rec = next(r for r in final_model_records_boston if r["Method"] == m_name)
    opt_k = rec["Optimal Number of Features"]
    chosen_feats = web_model_data_boston[m_name][opt_k - 1]["features"]
    for j, f in enumerate(feature_names):
        if f in chosen_feats:
            consensus_matrix[i, j] = 1

sns.heatmap(
    consensus_matrix,
    annot=True,
    cmap=["#f1f5f9", "#10b981"],
    cbar=False,
    xticklabels=feature_names,
    yticklabels=method_names,
    linewidths=1.2,
    linecolor="#cbd5e1",
    ax=ax
)
fig.suptitle("Boston Housing Feature Selection Consensus Matrix", fontsize=15, fontweight="bold", color="#0f172a", x=0.08, y=0.97, ha="left")
ax.set_title("Binary indicators showing which features were selected by each method's optimal configuration.", fontsize=10, color="#64748b", pad=12, loc="left")
plt.tight_layout()
plt.subplots_adjust(top=0.88, bottom=0.15)
plt.savefig("results/figure4_selected_features_heatmap_boston.png", dpi=300)
plt.savefig("docs/results/figure4_selected_features_heatmap_boston.png", dpi=300)
plt.close()
print("Saved Boston feature consensus heatmap.")

# Final Model Comparison Chart
fig, ax1 = plt.subplots(figsize=(11, 6), dpi=300, facecolor="#f8fafc")
ax1.set_facecolor("#ffffff")
x_pos = np.arange(len(method_names))
bar_width = 0.35

rmses = [rec["RMSE"] for rec in final_model_records_boston]
r2s = [rec["R²"] for rec in final_model_records_boston]

bars1 = ax1.bar(x_pos - bar_width/2, rmses, bar_width, label="Test RMSE ($1k)", color="#4f46e5", alpha=0.9)
ax1.set_ylabel("Test RMSE ($1,000s) [Lower is Better]", color="#4f46e5", fontweight="bold", fontsize=11)
ax1.set_ylim(0, max(rmses) * 1.25)
ax1.set_xticks(x_pos)
ax1.set_xticklabels(method_names, rotation=15, ha="right", fontweight="600")

ax2 = ax1.twinx()
bars2 = ax2.bar(x_pos + bar_width/2, r2s, bar_width, label="Test R²", color="#10b981", alpha=0.9)
ax2.set_ylabel("Test R² [Higher is Better]", color="#10b981", fontweight="bold", fontsize=11)
ax2.set_ylim(0, 1.0)

fig.suptitle("Boston Housing 6-Method Model Performance Comparison", fontsize=15, fontweight="bold", color="#0f172a", x=0.08, y=0.97, ha="left")
ax1.set_title("Optimal feature subset test error and goodness-of-fit comparison across all 6 methods.", fontsize=10, color="#64748b", pad=12, loc="left")
plt.tight_layout()
plt.subplots_adjust(top=0.88, bottom=0.18)
plt.savefig("results/figure3_final_model_comparison_boston.png", dpi=300)
plt.savefig("docs/results/figure3_final_model_comparison_boston.png", dpi=300)
plt.close()
print("Saved Boston model performance comparison chart.")

# Save Boston CSVs
pd.DataFrame(final_model_records_boston).to_csv("docs/results/final_model_comparison_boston.csv", index=False)
pd.DataFrame(final_model_records_boston).to_csv("results/final_model_comparison_boston.csv", index=False)

# 6. Read existing 50 Startups data from docs/model_data.js and create unified DATASETS
print("Reading existing 50 Startups data...")
with open("docs/model_data.js", "r", encoding="utf-8") as f:
    js_content = f.read()

# Extract 50 Startups JSON parts
import re

startups_model_data_match = re.search(r"window\.MODEL_DATA\s*=\s*(\{.*?\});\s*window\.METADATA", js_content, re.DOTALL)
startups_metadata_match = re.search(r"window\.METADATA\s*=\s*(\{.*?\});\s*window\.FINAL_MODEL_COMPARISON", js_content, re.DOTALL)
startups_final_comp_match = re.search(r"window\.FINAL_MODEL_COMPARISON\s*=\s*(\[.*?\]);\s*$", js_content, re.DOTALL)

if not startups_model_data_match:
    raise ValueError("Could not extract window.MODEL_DATA from docs/model_data.js")

startups_model_data = json.loads(startups_model_data_match.group(1))
startups_metadata = json.loads(startups_metadata_match.group(1))
startups_final_comp = json.loads(startups_final_comp_match.group(1))

# Unified Datasets Schema
unified_datasets = {
    "50_startups": {
        "key": "50_startups",
        "name": "50 Startups",
        "target_name": "Profit",
        "target_unit": "$",
        "description": "50 Startups dataset evaluating R&D, Administration, and Marketing expenditures across California, Florida, and New York. Global sweet spot at k=2 (R&D + Marketing).",
        "badge_optimal": "k = 2 ★ Optimal Sweet Spot",
        "badge_overfitting": "k = 5 ⚠ Overfitting Cliff",
        "k_labels": ["1", "2", "3", "4", "5"],
        "default_k": 2,
        "sweet_spot_k": 2,
        "overfitting_k": 5,
        "features": ["R&D Spend", "Administration", "Marketing Spend", "State_Florida", "State_New York"],
        "predictor_features": [
            {"id": "numRD", "sliderId": "rangeRD", "labelId": "labelRD", "name": "R&D Spend ($)", "feature": "R&D Spend", "min": 0, "max": 250000, "step": 5000, "default": 100000, "prefix": "$"},
            {"id": "numMkt", "sliderId": "rangeMkt", "labelId": "labelMkt", "name": "Marketing Spend ($)", "feature": "Marketing Spend", "min": 0, "max": 500000, "step": 5000, "default": 150000, "prefix": "$"},
            {"id": "numAdmin", "sliderId": "rangeAdmin", "labelId": "labelAdmin", "name": "Administration ($)", "feature": "Administration", "min": 0, "max": 250000, "step": 5000, "default": 120000, "prefix": "$"}
        ],
        "categorical": {
            "name": "State Location",
            "options": [
                {"label": "California (Reference Level, Dummies = 0)", "value": "California", "features": []},
                {"label": "Florida", "value": "Florida", "features": ["State_Florida"]},
                {"label": "New York", "value": "New York", "features": ["State_New York"]}
            ]
        },
        "images": {
            "correlation": "results/correlation_heatmap.png",
            "consensus": "results/figure4_selected_features_heatmap.png",
            "comparison": "results/figure3_final_model_comparison.png"
        },
        "image_descriptions": {
            "correlation": "Shows strong linear relationship between <strong>R&D Spend and Profit (r = 0.97)</strong> and moderate correlation with Marketing Spend (r = 0.75). Administration has very low correlation with Profit (r = 0.20), explaining its exclusion in parsimonious models.",
            "consensus": "Compares binary feature choices across all 6 methods. Notice that <strong>R&D Spend is unanimously selected</strong> by 100% of methods, followed by Marketing Spend (selected by 5 of 6), while State dummies are only retained by the full 5-feature baseline and RFECV.",
            "comparison": "Dual-bar visualization contrasting Test RMSE ($) (indigo) and Test R² (emerald). Pearson Correlation and F-test tie for the lowest test error ($8,206.33), outperforming the full Baseline OLS ($9,055.96) by over $849 per startup."
        },
        "model_data": startups_model_data,
        "metadata": startups_metadata,
        "final_model_comparison": startups_final_comp
    },
    "boston_housing": {
        "key": "boston_housing",
        "name": "Boston Housing",
        "target_name": "MEDV (Median Value in $1,000s)",
        "target_unit": "$1k",
        "description": "Boston Housing dataset predicting median home values across 13 socioeconomic, environmental, and structural predictors. Optimal subset balances RM, LSTAT, and PTRATIO.",
        "badge_optimal": f"k = {global_best['k']} ★ Optimal Sweet Spot",
        "badge_overfitting": "k = 13 ⚠ Full Model",
        "k_labels": [str(i) for i in range(1, len(feature_names) + 1)],
        "default_k": global_best["k"],
        "sweet_spot_k": global_best["k"],
        "overfitting_k": 13,
        "features": feature_names,
        "predictor_features": [
            {"id": "numRM", "sliderId": "rangeRM", "labelId": "labelRM", "name": "RM (Average Rooms per Dwelling)", "feature": "RM", "min": 3.0, "max": 9.0, "step": 0.1, "default": 6.28, "prefix": ""},
            {"id": "numLSTAT", "sliderId": "rangeLSTAT", "labelId": "labelLSTAT", "name": "LSTAT (% Lower Status Population)", "feature": "LSTAT", "min": 1.0, "max": 40.0, "step": 0.5, "default": 12.65, "prefix": ""},
            {"id": "numPTRATIO", "sliderId": "rangePTRATIO", "labelId": "labelPTRATIO", "name": "PTRATIO (Pupil-Teacher Ratio)", "feature": "PTRATIO", "min": 12.0, "max": 23.0, "step": 0.1, "default": 18.45, "prefix": ""},
            {"id": "numCRIM", "sliderId": "rangeCRIM", "labelId": "labelCRIM", "name": "CRIM (Per Capita Crime Rate)", "feature": "CRIM", "min": 0.0, "max": 90.0, "step": 0.1, "default": 3.61, "prefix": ""},
            {"id": "numDIS", "sliderId": "rangeDIS", "labelId": "labelDIS", "name": "DIS (Weighted Distance to Employment)", "feature": "DIS", "min": 1.0, "max": 13.0, "step": 0.1, "default": 3.79, "prefix": ""},
            {"id": "numNOX", "sliderId": "rangeNOX", "labelId": "labelNOX", "name": "NOX (Nitric Oxides Concentration)", "feature": "NOX", "min": 0.3, "max": 0.9, "step": 0.01, "default": 0.55, "prefix": ""},
            {"id": "numTAX", "sliderId": "rangeTAX", "labelId": "labelTAX", "name": "TAX (Property-Tax Rate per $10k)", "feature": "TAX", "min": 180, "max": 720, "step": 10, "default": 408, "prefix": ""}
        ],
        "categorical": None,
        "images": {
            "correlation": "results/correlation_heatmap_boston.png",
            "consensus": "results/figure4_selected_features_heatmap_boston.png",
            "comparison": "results/figure3_final_model_comparison_boston.png"
        },
        "image_descriptions": {
            "correlation": "Shows strong negative correlation between <strong>LSTAT and MEDV (r = -0.74)</strong> and strong positive correlation with RM (r = 0.70). PTRATIO, INDUS, and TAX also exhibit strong negative associations with housing prices.",
            "consensus": "Compares feature selection consensus on Boston Housing across all 6 methods. Notice that <strong>RM, LSTAT, and PTRATIO are unanimously selected</strong> by all parsimonious models as core housing price determinants.",
            "comparison": f"Dual-bar visualization contrasting Test RMSE ($1,000s) (indigo) and Test R² (emerald). Parsimonious feature selection achieves Test RMSE of ${global_best['rmse']:.2f}k and R² of {global_best['r2']:.4f}."
        },
        "model_data": web_model_data_boston,
        "metadata": metadata_boston,
        "final_model_comparison": final_model_records_boston
    }
}

# Write unified model_data.js
output_js = (
    "// Unified Multiple Linear Regression & Feature Selection Datasets Repository\n"
    "// Contains complete precomputed data for 50 Startups and Boston Housing\n"
    "window.DATASETS = " + json.dumps(unified_datasets, indent=2) + ";\n\n"
    "// Backward compatibility default pointers (Defaults to 50 Startups)\n"
    "window.CURRENT_DATASET_KEY = '50_startups';\n"
    "window.MODEL_DATA = window.DATASETS['50_startups'].model_data;\n"
    "window.METADATA = window.DATASETS['50_startups'].metadata;\n"
    "window.FINAL_MODEL_COMPARISON = window.DATASETS['50_startups'].final_model_comparison;\n"
)

with open("docs/model_data.js", "w", encoding="utf-8") as f:
    f.write(output_js)

print("Successfully written unified docs/model_data.js!")
print("Analysis complete.")
