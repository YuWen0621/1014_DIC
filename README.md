# Multiple Linear Regression & Feature Selection Explorer

> **Live Demo:** [https://yuwen0621.github.io/1014_DIC/](https://yuwen0621.github.io/1014_DIC/)

An interactive, browser-based machine learning explorer for **Multiple Linear Regression** and **Feature Selection**, following the **CRISP-DM** methodology. Compare 6 feature selection algorithms across 3 datasets, visualize bias-variance tradeoffs, and run regression on your own CSV data — all without installing anything.
<img width="1892" height="1001" alt="image" src="https://github.com/user-attachments/assets/f70c1e3f-6e0f-4a42-b72e-f25d437d38fe" />

---

## Project Overview

This project demonstrates how to apply multiple linear regression with systematic feature selection to real-world datasets. Starting from raw CSV data, it walks through data understanding, preprocessing, model building, evaluation, and web-based deployment.

**Core concepts covered:**
- Multiple Linear Regression (OLS — Ordinary Least Squares)
- Feature selection: filter, wrapper, embedded, and baseline methods
- Bias-variance tradeoff visualization (RMSE & R-squared vs. k features)
- Model parsimony (Occam's Razor — simplest model with lowest error)
- Cross-validation for generalizable performance estimation

---

## Website Features

| Feature | Description |
|---|---|
| **Dataset Switcher** | Dropdown to switch between 50 Startups, Boston Housing, or Custom Dataset |
| **Algorithm Tabs** | 6 selectable feature selection methods with per-method charts |
| **k-Feature Buttons** | Click k=1...n to instantly update all metrics, equation, and tables |
| **Dual Line Charts** | Interactive Chart.js plots — RMSE and R-squared curves across all k values |
| **Compare All 6** | Overlay all 6 method curves simultaneously with toggle chips |
| **KPI Metric Cards** | Test RMSE, Test R-squared, Adjusted R-squared, MAE, CV RMSE, F-Statistic |
| **OLS Equation Box** | Live-rendered fitted equation with current coefficients |
| **Coefficients Table** | Beta estimates, Std. Error, t-stat, p-value, 95% CI, VIF |
| **Residuals Diagnostic** | Top test-set residuals ranked by absolute error |
| **Live Predictor** | Real-time prediction calculator with sliders and inputs |
| **Custom CSV Import** | Fetch from URL or upload a local CSV, select Target, run regression in-browser |
| **Additional Figures** | Correlation heatmap, feature consensus matrix, model comparison bar chart |

---

## Dataset Selection

### 50 Startups — Predict Profit

- **Rows:** 50 startups across 3 US states
- **Target:** `Profit` (continuous, USD)
- **Features:** R&D Spend, Administration, Marketing Spend, State (categorical — dummy-encoded)
- **Sweet Spot:** k = 2 (R&D Spend + Marketing Spend) — Test RMSE: $8,206.33, R-squared = 0.9168
- **Key Finding:** R&D Spend alone (r = 0.97) dominates; Administration is nearly uncorrelated (r = 0.20)

### Boston Housing — Predict Median Home Value (MEDV)

- **Rows:** 506 Boston census tracts
- **Target:** `MEDV` — Median value of owner-occupied homes ($1,000s)
- **Features (13):** CRIM, ZN, INDUS, CHAS, NOX, RM, AGE, DIS, RAD, TAX, PTRATIO, B, LSTAT
- **Sweet Spot:** k = 7 — Test RMSE: $4.90k
- **Key Finding:** LSTAT (lower-status population %) and RM (avg rooms per dwelling) are strongest predictors

### Custom Dataset — Bring Your Own CSV

- Paste any **public CSV URL** (raw GitHub, etc.) or upload a local `.csv` file
- Auto-detects numeric columns; select any numeric column as the prediction **Target (Y)**
- Runs full multiple linear regression in the browser using pure JavaScript OLS
- Applies all 6 feature selection methods with k=1...n progression
- Displays RMSE, R-squared, MAE, Adjusted R-squared, CV RMSE, coefficients, and residuals
- **Limitation:** URL must be CORS-accessible (raw GitHub URLs recommended); categorical columns with more than 8 unique values are excluded

---

## Custom Dataset Example URLs

Copy and paste these URLs directly into the **Custom Dataset** input box:

| Dataset | URL | Suggested Target |
|---|---|---|
| 50 Startups | `https://raw.githubusercontent.com/Avik-Jain/100-Days-Of-ML-Code/master/datasets/50_Startups.csv` | `Profit` |
| Advertising | `https://raw.githubusercontent.com/JWarmenhoven/ISLR-python/master/Notebooks/Data/Advertising.csv` | `Sales` |
| Auto MPG | `https://raw.githubusercontent.com/mwaskom/seaborn-data/master/mpg.csv` | `mpg` |

> **Tip:** Use **raw GitHub URLs** (starting with `raw.githubusercontent.com`) to avoid CORS errors. Files from third-party domains may be blocked by the browser.

---

## CRISP-DM Methodology

This project follows the six-phase CRISP-DM process:

| Phase | What We Did |
|---|---|
| **1. Business Understanding** | Predict company profit / housing value; find the most parsimonious model |
| **2. Data Understanding** | EDA — correlation matrix, distribution checks, VIF analysis for multicollinearity |
| **3. Data Preparation** | OneHotEncoder for categorical State variable (drop-first); StandardScaler for RFECV/LassoCV; 80/20 train-test split with `random_state=42` |
| **4. Modeling** | OLS multiple linear regression; 6 feature selection strategies evaluated across k=1...n features |
| **5. Evaluation** | 5-Fold Cross-Validation RMSE; Test RMSE / R-squared / MAE; Adjusted R-squared; F-statistic; VIF diagnostics |
| **6. Deployment** | Static GitHub Pages site; pure JS custom dataset regression; no server required |

---

## Feature Selection Methods

| Method | Type | How It Works |
|---|---|---|
| **Baseline OLS** | Benchmark | Uses features in original dataset order; establishes full-model baseline |
| **Pearson Correlation** | Filter | Ranks features by absolute linear correlation with target; selects top-k |
| **F-test** | Filter | Ranks by univariate F-statistic from `f_regression`; related to Pearson but better suited for regression significance testing |
| **LassoCV** | Embedded | L1 regularization shrinks irrelevant coefficients to exactly zero; optimal lambda chosen via cross-validation |
| **RFECV** | Wrapper (Backward) | Recursively eliminates the least statistically significant feature (lowest absolute t-statistic) until one remains; cross-validated |
| **Exhaustive Feature Selection** | Wrapper (Forward) | Greedy forward selection — at each step adds the feature that maximizes in-sample R-squared |

All 6 methods are applied to both the pre-computed Python datasets (50 Startups, Boston Housing) and dynamically to any Custom Dataset loaded in the browser.

---

## Evaluation Metrics

| Metric | Formula | Interpretation |
|---|---|---|
| **Test RMSE** | sqrt(sum((y - y_hat)^2) / n) | Root Mean Squared Error on held-out test set; lower is better |
| **Test R-squared** | 1 - SS_res / SS_tot | Proportion of variance explained; higher is better (max 1.0) |
| **Adjusted R-squared** | 1 - (1 - R2)(n - 1)/(n - k - 1) | Penalizes for extra predictors; prevents overfitting illusion |
| **MAE** | sum(abs(y - y_hat)) / n | Mean Absolute Error; interpretable in target units |
| **5-Fold CV RMSE** | Mean RMSE over 5 validation folds | Measures generalization; primary criterion for sweet-spot selection |
| **F-Statistic** | (R2/k) / ((1 - R2)/(n - k - 1)) | Tests overall model significance; large F means model beats intercept-only |
| **VIF** | 1 / (1 - Rj-squared) | Variance Inflation Factor; VIF > 5 signals multicollinearity |

---

## Tech Stack & Architecture

```
+----------------------------------------------------------+
|  OFFLINE ANALYSIS (Python)                               |
|  main.py + run_boston.py                                 |
|  +-- pandas / numpy / scikit-learn / scipy               |
|  +-- matplotlib / seaborn  (publication figures)         |
|  +-- Output: docs/model_data.js  (pre-computed results)  |
+-------------------------+--------------------------------+
                          | static files only
+-------------------------v--------------------------------+
|  FRONTEND (Pure HTML / CSS / JavaScript)                 |
|  docs/index.html   -- page structure                     |
|  docs/style.css    -- responsive layout & design         |
|  docs/app.js       -- interactivity + Custom JS OLS      |
|  docs/model_data.js -- pre-computed Python results       |
|  docs/results/     -- publication figures (PNG)          |
+-------------------------+--------------------------------+
                          | GitHub Pages (static deploy)
+-------------------------v--------------------------------+
|  https://yuwen0621.github.io/1014_DIC/                   |
+----------------------------------------------------------+
```

**Custom Dataset mode** bypasses Python entirely — OLS, feature ranking (Pearson, F-test, RFECV, Exhaustive, LassoCV, Baseline), 5-fold CV, and all metrics are computed in the browser using pure JavaScript matrix algebra.

---

## Project Structure

```
1014-main/
+-- main.py                          # 50 Startups full analysis pipeline
+-- run_boston.py                    # Boston Housing analysis pipeline
+-- 50_Startups.csv                  # Raw 50 Startups dataset
+-- BostonHousing.csv                # Raw Boston Housing dataset
+-- feature_count_comparison.csv     # Per-method optimal k comparison table
+-- final_model_comparison.csv       # Best model metrics per method (50 Startups)
+-- selected_features_comparison.csv # Selected features per method
+-- startup_baseline.pkl             # Saved baseline model (joblib)
+-- verify_data.py                   # Quick sanity-check script
|
+-- results/                         # Publication-quality figures & CSVs
|   +-- correlation_heatmap.png          # 50 Startups Pearson heatmap
|   +-- correlation_heatmap_boston.png   # Boston Housing heatmap
|   +-- figure1_rmse_vs_features.png     # RMSE progression chart
|   +-- figure2_r2_vs_features.png       # R-squared progression chart
|   +-- figure3_final_model_comparison.png
|   +-- figure3_final_model_comparison_boston.png
|   +-- figure4_selected_features_heatmap.png    # Consensus matrix
|   +-- figure4_selected_features_heatmap_boston.png
|   +-- figure5_model_coefficients_table.png
|   +-- figure6_test_residuals_diagnostic.png
|   +-- (other CSVs)                     # Supporting data tables
|
+-- docs/                            # GitHub Pages website root
    +-- index.html                   # Main single-page application
    +-- style.css                    # All visual styles
    +-- app.js                       # Core JS: interactivity, charts, Custom OLS
    +-- model_data.js                # Pre-computed Python results (auto-generated)
    +-- results/                     # PNG figures served to the website
```

---

## How to Use

### Online (No Installation Required)

1. Open **[https://yuwen0621.github.io/1014_DIC/](https://yuwen0621.github.io/1014_DIC/)**
2. **Select a dataset** from the dropdown at the top of the page
3. **Select an algorithm** tab (e.g. Pearson Correlation, F-test, LassoCV...)
4. **Click a k-button** to set the number of features — all metrics, charts, and tables update instantly
5. **Use the Live Predictor** (right panel) to enter values and get a real-time prediction
6. **Custom Dataset:** select "Custom Dataset", paste a CSV URL, click **Fetch & Preview**, choose a numeric Target column, then click **Run Regression Analysis**

### Local Development

```bash
# Clone the repository
git clone https://github.com/yuwen0621/1014_DIC.git
cd 1014_DIC

# Install Python dependencies (for re-running the analysis)
pip install pandas numpy scikit-learn matplotlib seaborn scipy joblib

# Re-run the 50 Startups analysis (regenerates docs/model_data.js)
python main.py

# Re-run the Boston Housing analysis
python run_boston.py

# Serve the website locally (any static server works)
cd docs
python -m http.server 8000
# Then open http://localhost:8000 in your browser
```

> **Note:** The website works without running Python — `docs/model_data.js` contains all pre-computed results. Python only needs to be re-run if you modify the analysis scripts.

---

## Limitations

| Limitation | Details |
|---|---|
| **CORS restriction** | Custom Dataset URL fetch only works for CORS-enabled hosts (e.g. `raw.githubusercontent.com`). Most regular websites block cross-origin requests. |
| **Numeric Target required** | The Custom Dataset mode only supports numeric prediction targets. Classification targets are not supported. |
| **Categorical cardinality** | Categorical columns with more than 8 unique values are excluded from Custom Dataset feature candidates to avoid excessive one-hot expansion. |
| **Minimum data size** | Custom Dataset requires at least 8 complete rows after dropping any rows with missing values in selected features. |
| **No server-side compute** | The entire Custom Dataset pipeline runs in the browser. Performance may degrade for very large CSV files (> 10,000 rows). |
| **Pre-computed datasets** | 50 Startups and Boston Housing results are pre-computed by Python and embedded in `model_data.js`. To update them, re-run the Python scripts. |
| **Static deployment** | GitHub Pages serves static files only. No database, API, or server-side processing is available. |

---

## References

- Dataset: [50 Startups — 100 Days of ML Code](https://github.com/Avik-Jain/100-Days-Of-ML-Code)
- Dataset: [Boston Housing — UCI Machine Learning Repository](https://archive.ics.uci.edu/ml/machine-learning-databases/housing/)
- Methodology: [CRISP-DM Reference Guide](https://www.ibm.com/docs/en/spss-modeler/saas?topic=dm-crisp-help-overview)
- Design Reference: [AIoT-DIC2-MultipleLR](https://huanchen1107.github.io/AIoT-DIC2-MultipleLR/)
- Charts: [Chart.js 4.4](https://www.chartjs.org/)
- Icons: [Font Awesome 6](https://fontawesome.com/)

---

*Built with Python / scikit-learn / Chart.js / Vanilla JavaScript / Deployed on GitHub Pages*
