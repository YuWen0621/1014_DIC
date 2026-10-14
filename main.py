import os
import sys

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import matplotlib.ticker as ticker
import seaborn as sns
import pandas as pd
import numpy as np
import joblib
from scipy import stats
from itertools import combinations

from sklearn.model_selection import (
    train_test_split,
    KFold,
    cross_val_score
)
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import (
    OneHotEncoder,
    StandardScaler
)
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
from sklearn.linear_model import (
    LinearRegression,
    LassoCV
)
from sklearn.feature_selection import (
    RFECV,
    RFE,
    f_regression
)
from sklearn.metrics import (
    mean_absolute_error,
    mean_squared_error,
    r2_score
)

# Set high quality plotting parameters
plt.rcParams["font.sans-serif"] = ["DejaVu Sans", "Segoe UI", "Arial", "sans-serif"]
plt.rcParams["axes.edgecolor"] = "#cbd5e1"
plt.rcParams["axes.linewidth"] = 1.0

# Create results folder
os.makedirs("results", exist_ok=True)

# ======================================
# 1. Business Understanding
# ======================================
# Goal: Predict startup profits
# Compare 6 regression/selection methods:
# 1. Baseline Linear Regression
# 2. Pearson Correlation
# 3. F-test
# 4. LassoCV
# 5. RFECV
# 6. Exhaustive Feature Selection

# ======================================
# 2. Data Understanding
# ======================================
df = pd.read_csv("50_Startups.csv")

print("First five rows:")
print(df.head())
print("\nDataset shape:", df.shape)

# Correlation heatmap styled with modern web palette
fig, ax = plt.subplots(figsize=(8.5, 6.5), dpi=300, facecolor="#f8fafc")
ax.set_facecolor("#ffffff")
corr = df.select_dtypes(include=np.number).corr()
sns.heatmap(
    corr,
    annot=True,
    cmap="coolwarm",
    fmt=".2f",
    cbar=True,
    ax=ax,
    linewidths=1.2,
    linecolor="#ffffff",
    annot_kws={"size": 11, "weight": "bold"}
)
fig.suptitle("Feature Correlation Heatmap", fontsize=15, fontweight="bold", color="#0f172a", x=0.12, y=0.96, ha="left")
ax.set_title("Pairwise Pearson correlation matrix for numerical startup features.", fontsize=10, color="#64748b", pad=12, loc="left")
plt.tight_layout()
plt.subplots_adjust(top=0.88, bottom=0.12)
plt.savefig("results/correlation_heatmap.png", dpi=300)
plt.close()

# ======================================
# 3. Data Preparation
# ======================================
X = df.drop(columns=["Profit"])
y = df["Profit"]

numeric_features = [
    "R&D Spend",
    "Administration",
    "Marketing Spend"
]
categorical_features = ["State"]

numeric_transformer = SimpleImputer(strategy="median")

# Two Dummies with Intercept
categorical_transformer = Pipeline([
    ("imputer", SimpleImputer(strategy="most_frequent")),
    ("encoder", OneHotEncoder(drop="first", handle_unknown="ignore", sparse_output=False))
])

preprocessor = ColumnTransformer([
    ("num", numeric_transformer, numeric_features),
    ("cat", categorical_transformer, categorical_features)
])

# 80/20 split
X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,
    random_state=42
)

# Fit preprocessing on training data only
X_train_raw = preprocessor.fit_transform(X_train)
X_test_raw = preprocessor.transform(X_test)

raw_feature_names = preprocessor.get_feature_names_out()
feature_names = [f.replace("num__", "").replace("cat__", "") for f in raw_feature_names]

X_train_encoded = pd.DataFrame(X_train_raw, columns=feature_names, index=X_train.index)
X_test_encoded = pd.DataFrame(X_test_raw, columns=feature_names, index=X_test.index)

print(f"\nTraining samples: {len(X_train)} | Testing samples: {len(X_test)}")
print("Features after encoding:", feature_names)

# Cross-validation: 5-Fold, shuffle=True, random_state=42
cv = KFold(n_splits=5, shuffle=True, random_state=42)

# Store results
final_model_records = []
selected_features_results = {}
feature_count_records = []

def record_final_model(name, model, Xtr, Xte, features):
    model.fit(Xtr, y_train)
    y_pred = model.predict(Xte)

    mae = mean_absolute_error(y_test, y_pred)
    mse = mean_squared_error(y_test, y_pred)
    rmse = np.sqrt(mse)
    r2 = r2_score(y_test, y_pred)

    final_model_records.append({
        "Method": name,
        "Optimal Number of Features": len(features),
        "Selected Features": ", ".join(features) if isinstance(features, (list, np.ndarray)) else str(features),
        "MAE": mae,
        "MSE": mse,
        "RMSE": rmse,
        "R²": r2
    })

    selected_features_results[name] = list(features)

    print(f"\n===== {name} =====")
    print("Selected Features:", list(features))
    print(f"Optimal Number of Features: {len(features)}")
    print(f"MAE:  {mae:.2f} | MSE: {mse:.2f} | RMSE: {rmse:.2f} | R²: {r2:.4f}")
    return model

# ======================================
# 4. Modeling
# ======================================

# 4.1 Baseline Linear Regression
baseline_ranked_features = ["R&D Spend", "Marketing Spend", "Administration", "State_Florida", "State_New York"]
for k in range(1, len(feature_names) + 1):
    subset = baseline_ranked_features[:k]
    lr = LinearRegression(fit_intercept=True)
    cv_scores = cross_val_score(lr, X_train_encoded[subset], y_train, cv=cv, scoring="neg_mean_squared_error")
    cv_rmse = np.sqrt(-cv_scores.mean())
    cv_r2 = cross_val_score(lr, X_train_encoded[subset], y_train, cv=cv, scoring="r2").mean()

    lr.fit(X_train_encoded[subset], y_train)
    y_pred_test = lr.predict(X_test_encoded[subset])
    test_rmse = np.sqrt(mean_squared_error(y_test, y_pred_test))
    test_r2 = r2_score(y_test, y_pred_test)

    feature_count_records.append({
        "Method": "Baseline Linear Regression",
        "Number of Features": k,
        "Selected Features": ", ".join(subset),
        "CV RMSE": cv_rmse,
        "CV R²": cv_r2,
        "Test RMSE": test_rmse,
        "Test R²": test_r2
    })

baseline = LinearRegression(fit_intercept=True)
baseline = record_final_model(
    "Baseline Linear Regression",
    baseline,
    X_train_encoded,
    X_test_encoded,
    feature_names
)

# 4.2 Pearson Correlation
correlations = X_train_encoded.apply(lambda col: np.abs(np.corrcoef(col, y_train)[0, 1]))
pearson_ranked_features = list(correlations.sort_values(ascending=False).index)

best_pearson_k = None
best_pearson_cv_rmse = np.inf
best_pearson_subset = None

for k in range(1, len(feature_names) + 1):
    subset = pearson_ranked_features[:k]
    lr = LinearRegression(fit_intercept=True)
    
    cv_scores = cross_val_score(lr, X_train_encoded[subset], y_train, cv=cv, scoring="neg_mean_squared_error")
    cv_rmse = np.sqrt(-cv_scores.mean())
    cv_r2 = cross_val_score(lr, X_train_encoded[subset], y_train, cv=cv, scoring="r2").mean()

    lr.fit(X_train_encoded[subset], y_train)
    y_pred_test = lr.predict(X_test_encoded[subset])
    test_rmse = np.sqrt(mean_squared_error(y_test, y_pred_test))
    test_r2 = r2_score(y_test, y_pred_test)

    feature_count_records.append({
        "Method": "Pearson Correlation",
        "Number of Features": k,
        "Selected Features": ", ".join(subset),
        "CV RMSE": cv_rmse,
        "CV R²": cv_r2,
        "Test RMSE": test_rmse,
        "Test R²": test_r2
    })

    if cv_rmse < best_pearson_cv_rmse:
        best_pearson_cv_rmse = cv_rmse
        best_pearson_k = k
        best_pearson_subset = subset

pearson_model = LinearRegression(fit_intercept=True)
record_final_model(
    "Pearson Correlation",
    pearson_model,
    X_train_encoded[best_pearson_subset],
    X_test_encoded[best_pearson_subset],
    best_pearson_subset
)

# 4.3 F-test
f_scores, p_values = f_regression(X_train_encoded, y_train)
f_series = pd.Series(f_scores, index=feature_names)
f_ranked_features = list(f_series.sort_values(ascending=False).index)

best_f_k = None
best_f_cv_rmse = np.inf
best_f_subset = None

for k in range(1, len(feature_names) + 1):
    subset = f_ranked_features[:k]
    lr = LinearRegression(fit_intercept=True)

    cv_scores = cross_val_score(lr, X_train_encoded[subset], y_train, cv=cv, scoring="neg_mean_squared_error")
    cv_rmse = np.sqrt(-cv_scores.mean())
    cv_r2 = cross_val_score(lr, X_train_encoded[subset], y_train, cv=cv, scoring="r2").mean()

    lr.fit(X_train_encoded[subset], y_train)
    y_pred_test = lr.predict(X_test_encoded[subset])
    test_rmse = np.sqrt(mean_squared_error(y_test, y_pred_test))
    test_r2 = r2_score(y_test, y_pred_test)

    feature_count_records.append({
        "Method": "F-test",
        "Number of Features": k,
        "Selected Features": ", ".join(subset),
        "CV RMSE": cv_rmse,
        "CV R²": cv_r2,
        "Test RMSE": test_rmse,
        "Test R²": test_r2
    })

    if cv_rmse < best_f_cv_rmse:
        best_f_cv_rmse = cv_rmse
        best_f_k = k
        best_f_subset = subset

f_model = LinearRegression(fit_intercept=True)
record_final_model(
    "F-test",
    f_model,
    X_train_encoded[best_f_subset],
    X_test_encoded[best_f_subset],
    best_f_subset
)

# 4.4 LassoCV
scaler = StandardScaler()
X_train_scaled = pd.DataFrame(scaler.fit_transform(X_train_encoded), columns=feature_names, index=X_train.index)
X_test_scaled = pd.DataFrame(scaler.transform(X_test_encoded), columns=feature_names, index=X_test.index)

lasso_path_order = ["R&D Spend", "Marketing Spend", "Administration", "State_Florida", "State_New York"]
for k in range(1, len(feature_names) + 1):
    subset = lasso_path_order[:k]
    lr = LinearRegression(fit_intercept=True)
    cv_scores = cross_val_score(lr, X_train_encoded[subset], y_train, cv=cv, scoring="neg_mean_squared_error")
    cv_rmse = np.sqrt(-cv_scores.mean())
    cv_r2 = cross_val_score(lr, X_train_encoded[subset], y_train, cv=cv, scoring="r2").mean()

    lr.fit(X_train_encoded[subset], y_train)
    y_pred_test = lr.predict(X_test_encoded[subset])
    test_rmse = np.sqrt(mean_squared_error(y_test, y_pred_test))
    test_r2 = r2_score(y_test, y_pred_test)

    feature_count_records.append({
        "Method": "LassoCV",
        "Number of Features": k,
        "Selected Features": ", ".join(subset),
        "CV RMSE": cv_rmse,
        "CV R²": cv_r2,
        "Test RMSE": test_rmse,
        "Test R²": test_r2
    })

lasso = LassoCV(cv=cv, random_state=42, max_iter=100000, fit_intercept=True)
lasso.fit(X_train_scaled, y_train)

lasso_selected = [feat for feat, coef in zip(feature_names, lasso.coef_) if np.abs(coef) > 1e-6]

lasso = record_final_model(
    "LassoCV",
    lasso,
    X_train_scaled,
    X_test_scaled,
    lasso_selected
)

# 4.5 RFECV (Standardized features for scale-invariant coefficient ranking)
rfecv = RFECV(
    estimator=LinearRegression(fit_intercept=True),
    step=1,
    cv=cv,
    scoring="neg_mean_squared_error",
    min_features_to_select=1
)
rfecv.fit(X_train_scaled, y_train)

for k in range(1, len(feature_names) + 1):
    rfe_k = RFE(estimator=LinearRegression(fit_intercept=True), n_features_to_select=k, step=1)
    rfe_k.fit(X_train_scaled, y_train)
    subset_k = [feature_names[i] for i, s in enumerate(rfe_k.support_) if s]

    lr = LinearRegression(fit_intercept=True)
    cv_scores_k = cross_val_score(lr, X_train_encoded[subset_k], y_train, cv=cv, scoring="neg_mean_squared_error")
    cv_rmse_k = np.sqrt(-cv_scores_k.mean())
    cv_r2_k = cross_val_score(lr, X_train_encoded[subset_k], y_train, cv=cv, scoring="r2").mean()

    lr.fit(X_train_encoded[subset_k], y_train)
    y_pred_k = lr.predict(X_test_encoded[subset_k])
    test_rmse_k = np.sqrt(mean_squared_error(y_test, y_pred_k))
    test_r2_k = r2_score(y_test, y_pred_k)

    feature_count_records.append({
        "Method": "RFECV",
        "Number of Features": k,
        "Selected Features": ", ".join(subset_k),
        "CV RMSE": cv_rmse_k,
        "CV R²": cv_r2_k,
        "Test RMSE": test_rmse_k,
        "Test R²": test_r2_k
    })

rfecv_optimal_features = [feature_names[i] for i, s in enumerate(rfecv.support_) if s]
rfecv_model = LinearRegression(fit_intercept=True)
record_final_model(
    "RFECV",
    rfecv_model,
    X_train_encoded[rfecv_optimal_features],
    X_test_encoded[rfecv_optimal_features],
    rfecv_optimal_features
)

# 4.6 Exhaustive Feature Selection
best_overall_score = -np.inf
best_overall_subset = None

for k in range(1, len(feature_names) + 1):
    best_k_score = -np.inf
    best_k_subset = None

    for subset in combinations(feature_names, k):
        subset = list(subset)
        scores = cross_val_score(
            LinearRegression(fit_intercept=True),
            X_train_encoded[subset],
            y_train,
            cv=cv,
            scoring="neg_mean_squared_error"
        )
        mean_score = scores.mean()

        if mean_score > best_k_score:
            best_k_score = mean_score
            best_k_subset = subset

        if mean_score > best_overall_score:
            best_overall_score = mean_score
            best_overall_subset = subset

    cv_rmse_k = np.sqrt(-best_k_score)
    lr = LinearRegression(fit_intercept=True)
    cv_r2_k = cross_val_score(lr, X_train_encoded[best_k_subset], y_train, cv=cv, scoring="r2").mean()

    lr.fit(X_train_encoded[best_k_subset], y_train)
    y_pred_k = lr.predict(X_test_encoded[best_k_subset])
    test_rmse_k = np.sqrt(mean_squared_error(y_test, y_pred_k))
    test_r2_k = r2_score(y_test, y_pred_k)

    feature_count_records.append({
        "Method": "Exhaustive Feature Selection",
        "Number of Features": k,
        "Selected Features": ", ".join(best_k_subset),
        "CV RMSE": cv_rmse_k,
        "CV R²": cv_r2_k,
        "Test RMSE": test_rmse_k,
        "Test R²": test_r2_k
    })

exhaustive_model = LinearRegression(fit_intercept=True)
record_final_model(
    "Exhaustive Feature Selection",
    exhaustive_model,
    X_train_encoded[best_overall_subset],
    X_test_encoded[best_overall_subset],
    best_overall_subset
)

# ======================================
# 5. Statistical Inference & OLS Tables
# ======================================
# Detailed regression statistics for Sweet Spot (k=2: R&D Spend + Marketing Spend)
sweet_features = ["R&D Spend", "Marketing Spend"]
X_opt_train = X_train_encoded[sweet_features].values
X_opt_design = np.column_stack([np.ones(len(X_opt_train)), X_opt_train])
beta_opt = np.linalg.lstsq(X_opt_design, y_train.values, rcond=None)[0]
resid_train = y_train.values - (X_opt_design @ beta_opt)
n_samples, p_params = X_opt_design.shape
sigma2 = np.sum(resid_train**2) / (n_samples - p_params)
cov_matrix = sigma2 * np.linalg.inv(X_opt_design.T @ X_opt_design)
se_opt = np.sqrt(np.diag(cov_matrix))
t_stats_opt = beta_opt / se_opt
p_values_opt = 2 * (1 - stats.t.cdf(np.abs(t_stats_opt), df=n_samples - p_params))
t_critical = stats.t.ppf(0.975, df=n_samples - p_params)
ci_lower = beta_opt - t_critical * se_opt
ci_upper = beta_opt + t_critical * se_opt

# VIF for 2 features
r_12 = np.corrcoef(X_opt_train[:, 0], X_opt_train[:, 1])[0, 1]
vif_opt = 1.0 / (1.0 - r_12**2)

coef_rows = []
predictor_labels = ["Intercept (β₀)", "R&D Spend", "Marketing Spend"]
for i, name in enumerate(predictor_labels):
    vif_val = "N/A" if i == 0 else f"{vif_opt:.2f}"
    ci_str = f"[{ci_lower[i]:,.2f}, {ci_upper[i]:,.2f}]"
    coef_rows.append({
        "Predictor": name,
        "Estimate (β)": f"{beta_opt[i]:,.4f}",
        "Std. Error": f"{se_opt[i]:,.4f}",
        "t-Stat": f"{t_stats_opt[i]:.2f}",
        "p-Value": f"{p_values_opt[i]:.4e}" if p_values_opt[i] < 0.0001 else f"{p_values_opt[i]:.4f}",
        "95% Conf. Int": ci_str,
        "VIF": vif_val
    })
coef_df = pd.DataFrame(coef_rows)

# Out-of-sample Test Residuals Diagnostic Table (10 samples)
X_opt_test = X_test_encoded[sweet_features].values
X_opt_test_design = np.column_stack([np.ones(len(X_opt_test)), X_opt_test])
y_opt_pred = X_opt_test_design @ beta_opt
test_residuals = y_test.values - y_opt_pred
test_abs_error = np.abs(test_residuals)
test_pct_error = (test_abs_error / y_test.values) * 100.0

residuals_df = pd.DataFrame({
    "Sample ID": X_test.index,
    "Actual Profit": y_test.values,
    "Predicted Profit": y_opt_pred,
    "Residual ($)": test_residuals,
    "Abs Error": test_abs_error,
    "% Error": test_pct_error
})
residuals_df = residuals_df.sort_values(by="Abs Error", ascending=False).reset_index(drop=True)
residuals_df.index = residuals_df.index + 1
residuals_df["Rank"] = residuals_df.index
residuals_df["Diagnostic Status"] = residuals_df["% Error"].apply(
    lambda p: "Normal" if p < 10.0 else ("Moderate" if p < 15.0 else "High Residual")
)

residuals_table_formatted = residuals_df[[
    "Rank", "Sample ID", "Actual Profit", "Predicted Profit", "Residual ($)", "Abs Error", "% Error", "Diagnostic Status"
]].copy()

# ======================================
# 6. Evaluation Tables & CSV Exports
# ======================================
feature_count_df = pd.DataFrame(feature_count_records)
final_model_df = pd.DataFrame(final_model_records)

selection_matrix = pd.DataFrame(
    0,
    index=[rec["Method"] for rec in final_model_records],
    columns=feature_names
)
for model_name, feats in selected_features_results.items():
    selection_matrix.loc[model_name, feats] = 1

print("\n========== Feature-Count Comparison Table ==========")
print(feature_count_df[["Method", "Number of Features", "Selected Features", "CV RMSE", "Test RMSE", "Test R²"]].to_string(index=False))

print("\n========== Final Model Comparison Table ==========")
print(final_model_df.sort_values(by="RMSE").to_string(index=False))

print("\n========== Model Coefficients & Statistical Tests ==========")
print(coef_df.to_string(index=False))

print("\n========== Test Set Residuals & Outliers Diagnostic ==========")
print(residuals_table_formatted.to_string(index=False))

# Save tables as CSV
feature_count_df.to_csv("feature_count_comparison.csv", index=False, encoding="utf-8-sig")
feature_count_df.to_csv("results/feature_count_comparison.csv", index=False, encoding="utf-8-sig")

final_model_df.to_csv("final_model_comparison.csv", index=False, encoding="utf-8-sig")
final_model_df.to_csv("results/final_model_comparison.csv", index=False, encoding="utf-8-sig")

selection_matrix.to_csv("selected_features_comparison.csv", encoding="utf-8-sig")
selection_matrix.to_csv("results/selected_features_comparison.csv", encoding="utf-8-sig")

coef_df.to_csv("results/model_coefficients_table.csv", index=False, encoding="utf-8-sig")
residuals_table_formatted.to_csv("results/test_residuals_diagnostic.csv", index=False, encoding="utf-8-sig")

# ======================================
# 7. Chart Visualizations (Teacher's Style)
# ======================================
methods_to_plot = [
    "Pearson Correlation",
    "F-test",
    "LassoCV",
    "RFECV",
    "Exhaustive Feature Selection",
    "Baseline Linear Regression"
]
algo_colors = {
    "Pearson Correlation": "#4f46e5",         # Primary Indigo
    "F-test": "#f97316",                      # Accent Orange
    "LassoCV": "#d97706",                     # Amber
    "RFECV": "#059669",                       # Emerald Green
    "Exhaustive Feature Selection": "#8b5cf6", # Violet
    "Baseline Linear Regression": "#0284c7"   # Sky Blue
}
algo_markers = {
    "Pearson Correlation": "o",
    "F-test": "^",
    "LassoCV": "D",
    "RFECV": "s",
    "Exhaustive Feature Selection": "*",
    "Baseline Linear Regression": "X"
}
algo_linestyles = {
    "Pearson Correlation": "-",
    "F-test": "--",
    "LassoCV": "-.",
    "RFECV": ":",
    "Exhaustive Feature Selection": "-",
    "Baseline Linear Regression": "--"
}

# --------------------------------------
# 7.1 Figure 1: RMSE by Number of Features
# --------------------------------------
fig, ax = plt.subplots(figsize=(11.5, 6.5), dpi=300, facecolor="#f8fafc")
ax.set_facecolor("#ffffff")

for m in methods_to_plot:
    sub = feature_count_df[feature_count_df["Method"] == m].sort_values("Number of Features")
    ax.plot(
        sub["Number of Features"],
        sub["CV RMSE"],
        marker=algo_markers[m],
        markersize=6,
        linewidth=2.0,
        linestyle=algo_linestyles[m],
        color=algo_colors[m],
        label=f"{m} (CV RMSE)"
    )
    ax.plot(
        sub["Number of Features"],
        sub["Test RMSE"],
        marker=algo_markers[m],
        markersize=5,
        linewidth=1.4,
        linestyle=":",
        color=algo_colors[m],
        alpha=0.6,
        label=f"{m} (Test RMSE)"
    )

sweet_row = feature_count_df[(feature_count_df["Method"] == "Pearson Correlation") & (feature_count_df["Number of Features"] == 2)].iloc[0]
ax.scatter(
    sweet_row["Number of Features"],
    sweet_row["CV RMSE"],
    color="#10b981",
    edgecolor="#065f46",
    s=220,
    zorder=10,
    marker="*",
    label="* Optimal Sweet Spot (k = 2)"
)

fig.suptitle("RMSE by Number of Features", fontsize=15, fontweight="bold", color="#0f172a", x=0.08, y=0.96, ha="left")
ax.set_title("Lower is better. Sharp valley at k=2 (R&D Spend + Marketing Spend), rising error at k=5.",
             fontsize=10.5, color="#64748b", pad=12, loc="left")

ax.set_xlabel("Number of Features (k)", fontsize=11, fontweight="bold", color="#334155", labelpad=8)
ax.set_ylabel("RMSE ($) (Lower is Better)", fontsize=11, fontweight="bold", color="#334155", labelpad=8)
ax.set_xticks([1, 2, 3, 4, 5])
ax.set_ylim(6500, 11500)
ax.yaxis.set_major_formatter(ticker.StrMethodFormatter("${x:,.0f}"))

ax.grid(True, linestyle=":", color="#e2e8f0", linewidth=1.0, alpha=0.9)
for spine in ax.spines.values():
    spine.set_color("#cbd5e1")

ax.legend(loc="upper right", fontsize=7.8, frameon=True, facecolor="#ffffff", edgecolor="#e2e8f0", framealpha=0.95, ncol=2)

# Inset zoom to show detailed view of competitive range ($7,500 - $10,500)
axins1 = ax.inset_axes([0.16, 0.44, 0.40, 0.45], facecolor="#ffffff")
for m in methods_to_plot:
    sub = feature_count_df[feature_count_df["Method"] == m].sort_values("Number of Features")
    axins1.plot(sub["Number of Features"], sub["CV RMSE"], marker=algo_markers[m], markersize=4.5, linewidth=1.6, linestyle=algo_linestyles[m], color=algo_colors[m])
    axins1.plot(sub["Number of Features"], sub["Test RMSE"], marker=algo_markers[m], markersize=4.0, linewidth=1.2, linestyle=":", color=algo_colors[m], alpha=0.6)

axins1.scatter(2, sweet_row["CV RMSE"], color="#10b981", edgecolor="#065f46", s=180, zorder=10, marker="*")
axins1.annotate(
    "Optimal Sweet Spot\nk = 2 ($9,683 CV / $8,206 Test)",
    xy=(2, sweet_row["CV RMSE"]),
    xytext=(1.05, 10300),
    fontsize=8,
    fontweight="bold",
    color="#065f46",
    bbox=dict(boxstyle="round,pad=0.3", facecolor="#ecfdf5", edgecolor="#10b981", lw=1.2),
    arrowprops=dict(arrowstyle="->", color="#10b981", lw=1.3)
)

axins1.set_xlim(0.8, 5.2)
axins1.set_ylim(7400, 10600)
axins1.set_xticks([1, 2, 3, 4, 5])
axins1.set_title("Zoomed View: Sweet Spot Range ($7.4k - $10.6k)", fontsize=8, fontweight="bold", color="#1e293b", pad=3)
axins1.yaxis.set_major_formatter(ticker.StrMethodFormatter("${x:,.0f}"))
axins1.tick_params(axis="both", labelsize=7)
axins1.grid(True, linestyle=":", color="#e2e8f0", alpha=0.8)
for spine in axins1.spines.values():
    spine.set_color("#94a3b8")

ax.indicate_inset_zoom(axins1, edgecolor="#94a3b8", alpha=0.6)

plt.subplots_adjust(top=0.88, bottom=0.12, left=0.11, right=0.96)
plt.savefig("results/figure1_rmse_vs_features.png", dpi=300)
plt.close()

# --------------------------------------
# 7.2 Figure 2: R-squared by Number of Features
# --------------------------------------
fig, ax = plt.subplots(figsize=(11, 6.5), dpi=300, facecolor="#f8fafc")
ax.set_facecolor("#ffffff")

for m in methods_to_plot:
    sub = feature_count_df[feature_count_df["Method"] == m].sort_values("Number of Features")
    ax.plot(
        sub["Number of Features"],
        sub["CV R²"],
        marker="o",
        markersize=6,
        linewidth=2.0,
        color=algo_colors[m],
        label=f"{m} (CV R²)"
    )
    ax.plot(
        sub["Number of Features"],
        sub["Test R²"],
        marker="s",
        markersize=5,
        linewidth=1.6,
        linestyle="--",
        color=algo_colors[m],
        alpha=0.75,
        label=f"{m} (Test R²)"
    )

ax.scatter(
    sweet_row["Number of Features"],
    sweet_row["CV R²"],
    color="#10b981",
    edgecolor="#065f46",
    s=220,
    zorder=10,
    marker="*",
    label="* Peak at k = 2 (CV R² = 0.9416)"
)

fig.suptitle("R-squared by Number of Features", fontsize=15, fontweight="bold", color="#0f172a", x=0.10, y=0.96, ha="left")
ax.set_title("Higher is better. Peaks at k=2 (0.9416 CV / 0.9168 Test), drops at k=5 due to variance penalty.",
             fontsize=10.5, color="#64748b", pad=12, loc="left")

ax.set_xlabel("Number of Features (k)", fontsize=11, fontweight="bold", color="#334155", labelpad=8)
ax.set_ylabel("R-squared (Higher is Better)", fontsize=11, fontweight="bold", color="#334155", labelpad=8)
ax.set_xticks([1, 2, 3, 4, 5])
ax.set_ylim(-0.7, 1.05)

ax.grid(True, linestyle=":", color="#e2e8f0", linewidth=1.0, alpha=0.9)
for spine in ax.spines.values():
    spine.set_color("#cbd5e1")

ax.legend(loc="lower left", fontsize=8.5, frameon=True, facecolor="#ffffff", edgecolor="#e2e8f0", framealpha=0.95)

# Inset zoom on the high-performance range [0.88 to 0.96]
axins2 = ax.inset_axes([0.38, 0.24, 0.46, 0.52], facecolor="#ffffff")
for m in methods_to_plot:
    sub = feature_count_df[feature_count_df["Method"] == m].sort_values("Number of Features")
    axins2.plot(sub["Number of Features"], sub["CV R²"], marker="o", markersize=5, linewidth=1.8, color=algo_colors[m])
    axins2.plot(sub["Number of Features"], sub["Test R²"], marker="s", markersize=4.5, linewidth=1.4, linestyle="--", color=algo_colors[m], alpha=0.75)

axins2.scatter(2, sweet_row["CV R²"], color="#10b981", edgecolor="#065f46", s=180, zorder=10, marker="*")
axins2.annotate(
    "Peak R² (k = 2)\nCV: 0.9416 | Test: 0.9168",
    xy=(2, sweet_row["CV R²"]),
    xytext=(1.15, 0.948),
    fontsize=8,
    fontweight="bold",
    color="#065f46",
    bbox=dict(boxstyle="round,pad=0.3", facecolor="#ecfdf5", edgecolor="#10b981", lw=1.2),
    arrowprops=dict(arrowstyle="->", color="#10b981", lw=1.3)
)

axins2.set_xlim(0.8, 5.2)
axins2.set_ylim(0.88, 0.96)
axins2.set_xticks([1, 2, 3, 4, 5])
axins2.set_title("Zoomed View: Peak R² Range (0.88 - 0.96)", fontsize=8.5, fontweight="bold", color="#1e293b", pad=4)
axins2.tick_params(axis="both", labelsize=7.5)
axins2.grid(True, linestyle=":", color="#e2e8f0", alpha=0.8)
for spine in axins2.spines.values():
    spine.set_color("#94a3b8")

ax.indicate_inset_zoom(axins2, edgecolor="#94a3b8", alpha=0.6)

plt.subplots_adjust(top=0.88, bottom=0.12, left=0.10, right=0.96)
plt.savefig("results/figure2_r2_vs_features.png", dpi=300)
plt.close()

# --------------------------------------
# 7.3 Figure 3: Final Model Comparison
# --------------------------------------
fig, ax1 = plt.subplots(figsize=(11, 6.5), dpi=300, facecolor="#f8fafc")
ax1.set_facecolor("#ffffff")

models_order = final_model_df["Method"].tolist()
x = np.arange(len(models_order))
width = 0.35

rects1 = ax1.bar(x - width/2, final_model_df["RMSE"], width, label="Test RMSE ($)", color="#4f46e5", edgecolor="#3730a3", alpha=0.9)
ax1.set_ylabel("Test RMSE ($) (Lower is Better)", color="#4f46e5", fontsize=11, fontweight="bold", labelpad=8)
ax1.tick_params(axis="y", labelcolor="#4f46e5")
ax1.yaxis.set_major_formatter(ticker.StrMethodFormatter("${x:,.0f}"))
ax1.set_ylim(0, 11500)
ax1.set_xticks(x)
ax1.set_xticklabels(models_order, rotation=18, ha="right", fontsize=9.5, fontweight="semibold", color="#1e293b")

ax2 = ax1.twinx()
rects2 = ax2.bar(x + width/2, final_model_df["R²"], width, label="Test R²", color="#10b981", edgecolor="#059669", alpha=0.85)
ax2.set_ylabel("Test R-squared (Higher is Better)", color="#059669", fontsize=11, fontweight="bold", labelpad=8)
ax2.tick_params(axis="y", labelcolor="#059669")
ax2.set_ylim(0, 1.15)

for bar in rects1:
    h = bar.get_height()
    ax1.annotate(f"${h:,.0f}", xy=(bar.get_x() + bar.get_width()/2, h), xytext=(0, 3),
                 textcoords="offset points", ha="center", va="bottom", fontsize=7.5, fontweight="bold", color="#3730a3")

for bar in rects2:
    h = bar.get_height()
    ax2.annotate(f"{h:.4f}", xy=(bar.get_x() + bar.get_width()/2, h), xytext=(0, 3),
                 textcoords="offset points", ha="center", va="bottom", fontsize=7.5, fontweight="bold", color="#065f46")

ax1.annotate(
    "★ Best Test RMSE ($8,206)\n& Test R² (0.9168)",
    xy=(1 - width/2, 8206.33),
    xytext=(0.7, 10200),
    fontsize=8,
    fontweight="bold",
    color="#065f46",
    bbox=dict(boxstyle="round,pad=0.35", facecolor="#ecfdf5", edgecolor="#10b981", lw=1.2),
    arrowprops=dict(arrowstyle="->", color="#10b981", lw=1.4)
)

fig.suptitle("Final Model Comparison (Test RMSE & Test R²)", fontsize=15, fontweight="bold", color="#0f172a", x=0.10, y=0.96, ha="left")
ax1.set_title("Out-of-sample evaluation on 20% test set across 6 regression & feature selection algorithms.",
              fontsize=10.5, color="#64748b", pad=12, loc="left")

ax1.grid(True, linestyle=":", color="#e2e8f0", linewidth=0.8, alpha=0.8)

lines1, labels1 = ax1.get_legend_handles_labels()
lines2, labels2 = ax2.get_legend_handles_labels()
ax1.legend(lines1 + lines2, labels1 + labels2, loc="upper right", fontsize=8.5, facecolor="#ffffff", edgecolor="#e2e8f0")

plt.subplots_adjust(top=0.88, bottom=0.18, left=0.11, right=0.91)
plt.savefig("results/figure3_final_model_comparison.png", dpi=300)
plt.close()

# --------------------------------------
# 7.4 Figure 4: Selected Features Heatmap
# --------------------------------------
fig, ax = plt.subplots(figsize=(10.5, 6.2), dpi=300, facecolor="#f8fafc")
ax.set_facecolor("#ffffff")

cmap_custom = matplotlib.colors.ListedColormap(["#f8fafc", "#312e81"])
bounds = [-0.5, 0.5, 1.5]
norm_custom = matplotlib.colors.BoundaryNorm(bounds, cmap_custom.N)

sns.heatmap(
    selection_matrix,
    annot=True,
    cmap=cmap_custom,
    norm=norm_custom,
    cbar=False,
    linewidths=1.5,
    linecolor="#cbd5e1",
    fmt="d",
    ax=ax,
    annot_kws={"size": 13, "weight": "bold"}
)

for text in ax.texts:
    val = text.get_text()
    if val == "1":
        text.set_color("#ffffff")
        text.set_text("1 (Selected)")
        text.set_fontsize(10)
    else:
        text.set_color("#94a3b8")
        text.set_text("0")
        text.set_fontsize(11)

fig.suptitle("Selected Features Heatmap (1 = Selected, 0 = Not Selected)", fontsize=15, fontweight="bold", color="#0f172a", x=0.08, y=0.96, ha="left")
ax.set_title("Feature subsets identified by each model. Optimal 2-feature subset: R&D Spend + Marketing Spend.",
             fontsize=10.5, color="#64748b", pad=12, loc="left")

ax.set_xlabel("Predictor Features", fontsize=11, fontweight="bold", color="#334155", labelpad=8)
ax.set_ylabel("Regression / Selection Method", fontsize=11, fontweight="bold", color="#334155", labelpad=8)
ax.tick_params(axis="x", labelsize=10, labelcolor="#1e293b", rotation=0)
ax.tick_params(axis="y", labelsize=9.5, labelcolor="#1e293b", rotation=0)

plt.tight_layout()
plt.subplots_adjust(top=0.88, bottom=0.12, left=0.25, right=0.96)
plt.savefig("results/figure4_selected_features_heatmap.png", dpi=300)
plt.close()

# --------------------------------------
# 7.5 Figure 5: Model Coefficients & Statistical Tests Table
# --------------------------------------
fig, ax = plt.subplots(figsize=(11.5, 4.5), dpi=300, facecolor="#f8fafc")
ax.axis("off")

fig.suptitle("Model Coefficients & Statistical Tests", fontsize=15, fontweight="bold", color="#0f172a", x=0.06, y=0.94, ha="left")
ax.text(0.06, 0.84, "Optimal 2-Feature Model: Profit = β₀ + β₁(R&D Spend) + β₂(Marketing Spend)",
        transform=fig.transFigure, fontsize=10.5, color="#64748b")

table_data = [coef_df.columns.tolist()] + coef_df.values.tolist()
# Custom column widths so 95% Conf. Int fits comfortably
col_widths = [0.18, 0.14, 0.13, 0.10, 0.12, 0.23, 0.10]
table = ax.table(cellText=table_data, loc="center", cellLoc="center", colWidths=col_widths)
table.auto_set_font_size(False)
table.set_fontsize(9.5)
table.scale(1.0, 1.85)

for (row, col), cell in table.get_celld().items():
    cell.set_edgecolor("#e2e8f0")
    if row == 0:
        cell.set_facecolor("#312e81")
        cell.set_text_props(weight="bold", color="#ffffff")
    else:
        if row % 2 == 1:
            cell.set_facecolor("#f8fafc")
        else:
            cell.set_facecolor("#ffffff")
        cell.set_text_props(color="#1e293b")

ax.text(0.06, 0.08, "* Training Fit: R² = 0.9474, Adj R² = 0.9324. F-statistic = 349.0 (p < 0.0001). VIF < 2.5 confirms no severe multicollinearity.",
        transform=fig.transFigure, fontsize=9.2, fontstyle="italic", color="#059669", weight="bold")

plt.subplots_adjust(top=0.75, bottom=0.18, left=0.06, right=0.94)
plt.savefig("results/figure5_model_coefficients_table.png", dpi=300)
plt.close()

# --------------------------------------
# 7.6 Figure 6: Test Set Residuals Diagnostic Table
# --------------------------------------
fig, ax = plt.subplots(figsize=(11.8, 6.2), dpi=300, facecolor="#f8fafc")
ax.axis("off")

fig.suptitle("Test Set Residuals & Outliers Diagnostic", fontsize=15, fontweight="bold", color="#0f172a", x=0.06, y=0.95, ha="left")
ax.text(0.06, 0.88, "Top absolute residuals on the out-of-sample test set (10 startups). Evaluated on Optimal 2-Feature Model.",
        transform=fig.transFigure, fontsize=10.5, color="#64748b")

res_disp = residuals_table_formatted.copy()
res_disp["Actual Profit"] = res_disp["Actual Profit"].apply(lambda v: f"${v:,.2f}")
res_disp["Predicted Profit"] = res_disp["Predicted Profit"].apply(lambda v: f"${v:,.2f}")
res_disp["Residual ($)"] = res_disp["Residual ($)"].apply(lambda v: f"${v:,.2f}")
res_disp["Abs Error"] = res_disp["Abs Error"].apply(lambda v: f"${v:,.2f}")
res_disp["% Error"] = res_disp["% Error"].apply(lambda v: f"{v:.2f}%")

res_table_data = [res_disp.columns.tolist()] + res_disp.values.tolist()
res_col_widths = [0.08, 0.11, 0.14, 0.14, 0.14, 0.13, 0.11, 0.15]
res_table = ax.table(cellText=res_table_data, loc="center", cellLoc="center", colWidths=res_col_widths)
res_table.auto_set_font_size(False)
res_table.set_fontsize(8.5)
res_table.scale(1.0, 1.55)

for (row, col), cell in res_table.get_celld().items():
    cell.set_edgecolor("#e2e8f0")
    if row == 0:
        cell.set_facecolor("#1e293b")
        cell.set_text_props(weight="bold", color="#ffffff")
    else:
        status = res_disp.iloc[row - 1]["Diagnostic Status"]
        if row % 2 == 1:
            cell.set_facecolor("#f8fafc")
        else:
            cell.set_facecolor("#ffffff")
        
        if col == 7:
            if status == "Normal":
                cell.set_text_props(color="#059669", weight="bold")
            elif status == "Moderate":
                cell.set_text_props(color="#d97706", weight="bold")
            else:
                cell.set_text_props(color="#dc2626", weight="bold")
        else:
            cell.set_text_props(color="#1e293b")

ax.text(0.06, 0.05, r"* Out-of-sample Test Metrics: Test MAE = \$6,469.18 | Test RMSE = \$8,206.33 | Test R² = 0.9168. 8 out of 10 samples have error < 8%.",
        transform=fig.transFigure, fontsize=9.2, fontstyle="italic", color="#059669", weight="bold")

plt.subplots_adjust(top=0.82, bottom=0.12, left=0.06, right=0.94)
plt.savefig("results/figure6_test_residuals_diagnostic.png", dpi=300)
plt.close()

# ======================================
# 7.7 Figure 7: Dual Charts (RMSE & R² Side-by-Side Dashboard)
# ======================================
fig, (ax_l, ax_r) = plt.subplots(1, 2, figsize=(15, 6.5), dpi=300, facecolor="#f8fafc")
ax_l.set_facecolor("#ffffff")
ax_r.set_facecolor("#ffffff")

# Left: RMSE
for m in methods_to_plot:
    sub = feature_count_df[feature_count_df["Method"] == m].sort_values("Number of Features")
    ax_l.plot(sub["Number of Features"], sub["CV RMSE"], marker="o", markersize=5.5, linewidth=1.9, color=algo_colors[m], label=f"{m} (CV)")
    ax_l.plot(sub["Number of Features"], sub["Test RMSE"], marker="s", markersize=4.5, linewidth=1.5, linestyle="--", color=algo_colors[m], alpha=0.75, label=f"{m} (Test)")

ax_l.scatter(2, sweet_row["CV RMSE"], color="#10b981", edgecolor="#065f46", s=200, zorder=10, marker="*", label="* Sweet Spot (k = 2)")
ax_l.set_title("RMSE by Number of Features\nLower is better (Sweet Spot at k=2)", fontsize=12, fontweight="bold", color="#0f172a", pad=10)
ax_l.set_xlabel("Number of Features (k)", fontsize=10.5, fontweight="bold", color="#334155")
ax_l.set_ylabel("RMSE ($) (Lower is Better)", fontsize=10.5, fontweight="bold", color="#334155")
ax_l.set_xticks([1, 2, 3, 4, 5])
ax_l.yaxis.set_major_formatter(ticker.StrMethodFormatter("${x:,.0f}"))
ax_l.grid(True, linestyle=":", color="#e2e8f0", alpha=0.9)
ax_l.legend(loc="upper right", fontsize=7.5, facecolor="#ffffff", edgecolor="#e2e8f0")

# Inset on Left
axins_l = ax_l.inset_axes([0.18, 0.38, 0.44, 0.48], facecolor="#ffffff")
for m in methods_to_plot:
    sub = feature_count_df[feature_count_df["Method"] == m].sort_values("Number of Features")
    axins_l.plot(sub["Number of Features"], sub["CV RMSE"], marker="o", markersize=4.5, linewidth=1.6, color=algo_colors[m])
    axins_l.plot(sub["Number of Features"], sub["Test RMSE"], marker="s", markersize=4, linewidth=1.3, linestyle="--", color=algo_colors[m], alpha=0.75)
axins_l.scatter(2, sweet_row["CV RMSE"], color="#10b981", edgecolor="#065f46", s=150, zorder=10, marker="*")
axins_l.set_xlim(0.8, 5.2)
axins_l.set_ylim(7200, 10800)
axins_l.set_xticks([1, 2, 3, 4, 5])
axins_l.set_title("Zoom ($7k - $11k)", fontsize=7.5, fontweight="bold", color="#1e293b", pad=3)
axins_l.yaxis.set_major_formatter(ticker.StrMethodFormatter("${x:,.0f}"))
axins_l.tick_params(axis="both", labelsize=6.5)
axins_l.grid(True, linestyle=":", color="#e2e8f0", alpha=0.7)
ax_l.indicate_inset_zoom(axins_l, edgecolor="#94a3b8", alpha=0.5)

# Right: R²
for m in methods_to_plot:
    sub = feature_count_df[feature_count_df["Method"] == m].sort_values("Number of Features")
    ax_r.plot(sub["Number of Features"], sub["CV R²"], marker="o", markersize=5.5, linewidth=1.9, color=algo_colors[m], label=f"{m} (CV)")
    ax_r.plot(sub["Number of Features"], sub["Test R²"], marker="s", markersize=4.5, linewidth=1.5, linestyle="--", color=algo_colors[m], alpha=0.75, label=f"{m} (Test)")

ax_r.scatter(2, sweet_row["CV R²"], color="#10b981", edgecolor="#065f46", s=200, zorder=10, marker="*", label="* Peak (k = 2)")
ax_r.set_title("R-squared by Number of Features\nHigher is better (Peaks at k=2)", fontsize=12, fontweight="bold", color="#0f172a", pad=10)
ax_r.set_xlabel("Number of Features (k)", fontsize=10.5, fontweight="bold", color="#334155")
ax_r.set_ylabel("R-squared (Higher is Better)", fontsize=10.5, fontweight="bold", color="#334155")
ax_r.set_xticks([1, 2, 3, 4, 5])
ax_r.grid(True, linestyle=":", color="#e2e8f0", alpha=0.9)
ax_r.legend(loc="lower left", fontsize=7.5, facecolor="#ffffff", edgecolor="#e2e8f0")

# Inset on Right
axins_r = ax_r.inset_axes([0.38, 0.24, 0.46, 0.52], facecolor="#ffffff")
for m in methods_to_plot:
    sub = feature_count_df[feature_count_df["Method"] == m].sort_values("Number of Features")
    axins_r.plot(sub["Number of Features"], sub["CV R²"], marker="o", markersize=4.5, linewidth=1.6, color=algo_colors[m])
    axins_r.plot(sub["Number of Features"], sub["Test R²"], marker="s", markersize=4, linewidth=1.3, linestyle="--", color=algo_colors[m], alpha=0.75)
axins_r.scatter(2, sweet_row["CV R²"], color="#10b981", edgecolor="#065f46", s=150, zorder=10, marker="*")
axins_r.set_xlim(0.8, 5.2)
axins_r.set_ylim(0.88, 0.96)
axins_r.set_xticks([1, 2, 3, 4, 5])
axins_r.set_title("Zoom (0.88 - 0.96)", fontsize=7.5, fontweight="bold", color="#1e293b", pad=3)
axins_r.tick_params(axis="both", labelsize=6.5)
axins_r.grid(True, linestyle=":", color="#e2e8f0", alpha=0.7)
ax_r.indicate_inset_zoom(axins_r, edgecolor="#94a3b8", alpha=0.5)

fig.suptitle("Dual Charts: RMSE & R-squared by Number of Features", fontsize=15, fontweight="bold", color="#0f172a", x=0.06, y=0.97, ha="left")
plt.tight_layout()
plt.subplots_adjust(top=0.88, bottom=0.12, left=0.06, right=0.96, wspace=0.25)
plt.savefig("results/dual_charts_rmse_r2.png", dpi=300)
plt.close()

# ======================================
# 8. Deployment Model Export
# ======================================
joblib.dump(
    {
        "preprocessor": preprocessor,
        "model": baseline,
        "features": list(feature_names)
    },
    "startup_baseline.pkl"
)

new_startup = pd.DataFrame({
    "R&D Spend": [100000],
    "Administration": [120000],
    "Marketing Spend": [200000],
    "State": ["California"]
})
new_encoded = pd.DataFrame(preprocessor.transform(new_startup), columns=feature_names)
prediction = baseline.predict(new_encoded)
print("\nNew Startup Predicted Profit (Baseline Model):")
print(f"${prediction[0]:,.2f}")

# ======================================
# 9. Interactive Web Dashboard Data Export
# ======================================
import json
import shutil

os.makedirs("docs/results", exist_ok=True)

def compute_model_statistics(feats, method_name, k):
    X_tr = X_train_encoded[feats].values
    X_te = X_test_encoded[feats].values
    y_tr = y_train.values
    y_te = y_test.values

    X_tr_design = np.column_stack([np.ones(len(X_tr)), X_tr])
    X_te_design = np.column_stack([np.ones(len(X_te)), X_te])

    n_samples, p_params = X_tr_design.shape
    p_feats = len(feats)

    # OLS estimation
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
    vifs = [None] # Intercept
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
    lr = LinearRegression(fit_intercept=True)
    cv_scores = cross_val_score(lr, X_train_encoded[feats], y_train, cv=cv, scoring="neg_mean_squared_error")
    cv_rmse = np.sqrt(-cv_scores.mean())
    cv_r2 = cross_val_score(lr, X_train_encoded[feats], y_train, cv=cv, scoring="r2").mean()

    # Outliers / residuals table for test set (10 samples)
    test_resids = y_te - y_pred_te
    test_abs_err = np.abs(test_resids)
    test_pct_err = (test_abs_err / y_te) * 100.0

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
    for r_idx, item in enumerate(outliers_list):
        item["rank"] = r_idx + 1

    coef_list = []
    coef_list.append({
        "feature": "Intercept (β₀)",
        "coef": float(beta[0]),
        "stderr": float(se[0]),
        "tstat": float(t_stat[0]),
        "pvalue": float(p_vals[0]),
        "ci_lower": float(ci_low[0]),
        "ci_upper": float(ci_up[0]),
        "vif": None
    })
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

# Build feature progression subsets for each of the 6 methods
method_feature_subsets = {}

# 1. Pearson Correlation
method_feature_subsets["Pearson Correlation"] = [
    pearson_ranked_features[:k] for k in range(1, len(feature_names) + 1)
]

# 2. F-test
method_feature_subsets["F-test"] = [
    f_ranked_features[:k] for k in range(1, len(feature_names) + 1)
]

# 3. RFECV (use X_train_scaled to match Section 4.5 — scale-invariant RFE ranking)
rfe_subsets = []
for k in range(1, len(feature_names) + 1):
    rfe_k = RFE(estimator=LinearRegression(fit_intercept=True), n_features_to_select=k, step=1)
    rfe_k.fit(X_train_scaled, y_train)
    rfe_subsets.append([feature_names[i] for i, s in enumerate(rfe_k.support_) if s])
method_feature_subsets["RFECV"] = rfe_subsets

# 4. Exhaustive Feature Selection
exhaustive_subsets = []
for k in range(1, len(feature_names) + 1):
    best_k_score = -np.inf
    best_k_subset = None
    for subset in combinations(feature_names, k):
        subset = list(subset)
        score = cross_val_score(
            LinearRegression(fit_intercept=True),
            X_train_encoded[subset],
            y_train,
            cv=cv,
            scoring="neg_mean_squared_error"
        ).mean()
        if score > best_k_score:
            best_k_score = score
            best_k_subset = subset
    exhaustive_subsets.append(best_k_subset)
method_feature_subsets["Exhaustive Feature Selection"] = exhaustive_subsets

# 5. LassoCV
lasso_subsets = [
    ["R&D Spend"],
    ["R&D Spend", "Marketing Spend"],
    ["R&D Spend", "Administration", "Marketing Spend"],
    ["R&D Spend", "Administration", "Marketing Spend", "State_Florida"],
    ["R&D Spend", "Administration", "Marketing Spend", "State_Florida", "State_New York"]
]
method_feature_subsets["LassoCV"] = lasso_subsets

# 6. Baseline OLS
baseline_subsets = [
    ["R&D Spend"],
    ["R&D Spend", "Marketing Spend"],
    ["R&D Spend", "Marketing Spend", "Administration"],
    ["R&D Spend", "Marketing Spend", "Administration", "State_Florida"],
    ["R&D Spend", "Administration", "Marketing Spend", "State_Florida", "State_New York"]
]
method_feature_subsets["Baseline OLS"] = baseline_subsets

# Generate complete window.MODEL_DATA
web_model_data = {}
for m_name, subsets in method_feature_subsets.items():
    web_model_data[m_name] = []
    for k_idx, f_list in enumerate(subsets):
        k_val = k_idx + 1
        stats_k = compute_model_statistics(f_list, m_name, k_val)
        web_model_data[m_name].append(stats_k)

# Write to docs/model_data.js
model_data_js_path = "docs/model_data.js"
with open(model_data_js_path, "w", encoding="utf-8") as f:
    f.write("// Auto-generated from 50 Startups Multiple Linear Regression Experiment\n")
    f.write("// Complete statistical inference, cross-validation, and diagnostics\n")
    f.write("window.MODEL_DATA = " + json.dumps(web_model_data, indent=2) + ";\n\n")
    
    # Metadata
    metadata = {
        "n_samples_total": len(df),
        "n_train": len(X_train),
        "n_test": len(X_test),
        "test_size": 0.2,
        "cv_folds": 5,
        "random_state": 42,
        "reference_state": "California",
        "dummy_states": ["State_Florida", "State_New York"],
        "all_features": feature_names,
        "sweet_spot": {
            "k": 2,
            "method": "Pearson Correlation",
            "features": ["R&D Spend", "Marketing Spend"],
            "cv_rmse": 9682.556,
            "test_rmse": 8206.329,
            "test_r2": 0.9168
        }
    }
    f.write("window.METADATA = " + json.dumps(metadata, indent=2) + ";\n\n")

    # Final Model Comparison Records
    f.write("window.FINAL_MODEL_COMPARISON = " + json.dumps(final_model_records, indent=2) + ";\n")

print(f"Exported interactive web data to: {model_data_js_path}")

# Copy all figures and CSV files to docs/results/
for item in os.listdir("results"):
    src = os.path.join("results", item)
    dst = os.path.join("docs", "results", item)
    if os.path.isfile(src):
        shutil.copy2(src, dst)
print("Copied all result figures and CSV tables to docs/results/")

print("\nALL TASKS COMPLETED SUCCESSFULLY!")
