/* ==========================================================================
   Multi-Dataset Multiple Linear Regression & Feature Selection Explorer
   Supports: 50 Startups (Profit) & Boston Housing (MEDV)
   Pure Vanilla JavaScript + Chart.js 4.4
   ========================================================================== */

// Application State
let currentDatasetKey = '50_startups';
let currentAlgo = 'Pearson Correlation';
let currentK = 2; // Default for 50 startups
let rmseChartInstance = null;
let r2ChartInstance = null;

const ALGO_COLORS = {
  'Pearson Correlation': '#4f46e5',
  'F-test': '#EF4444', // Red color for F-test
  'RFECV': '#059669',
  'Exhaustive Feature Selection': '#8b5cf6',
  'LassoCV': '#d97706',
  'Baseline OLS': '#3b82f6'
};

// Distinct dash patterns — visually separate overlapping curves
const ALGO_DASH = {
  'Pearson Correlation':        [],           // solid
  'F-test':                     [8, 4],       // long dash
  'RFECV':                      [4, 4],       // short dash
  'Exhaustive Feature Selection': [10, 3, 3, 3], // dash-dot
  'LassoCV':                    [2, 3],       // dotted
  'Baseline OLS':               [6, 3, 1, 3] // dash-dot-dot
};

// Distinct point shapes for each method
const ALGO_POINT_STYLE = {
  'Pearson Correlation':        'circle',
  'F-test':                     'triangle',
  'RFECV':                      'rect',
  'Exhaustive Feature Selection': 'star',
  'LassoCV':                    'rectRot',
  'Baseline OLS':               'crossRot'
};

const ALL_ALGO_KEYS = [
  'Pearson Correlation',
  'F-test',
  'RFECV',
  'Exhaustive Feature Selection',
  'LassoCV',
  'Baseline OLS'
];

let activeMethodsFilter = new Set(ALL_ALGO_KEYS);

// Helper: Get Current Dataset Definition
function getCurrentDataset() {
  if (window.DATASETS && window.DATASETS[currentDatasetKey]) {
    return window.DATASETS[currentDatasetKey];
  }
  return null;
}

// DOM Initialization
document.addEventListener('DOMContentLoaded', () => {
  // Ensure default globals match dataset
  if (window.DATASETS && window.DATASETS[currentDatasetKey]) {
    const ds = window.DATASETS[currentDatasetKey];
    window.MODEL_DATA = ds.model_data;
    window.METADATA = ds.metadata;
    window.FINAL_MODEL_COMPARISON = ds.final_model_comparison;
    currentK = ds.sweet_spot_k || ds.default_k || 2;
  }

  initCharts();
  setupEventListeners();
  renderKButtons();
  renderLivePredictor();
  updateDashboard();
});

// Event Listeners Setup
function setupEventListeners() {
  // Dataset dropdown selector
  const datasetSelect = document.getElementById('datasetSelect');
  if (datasetSelect) {
    datasetSelect.addEventListener('change', (e) => {
      switchDataset(e.target.value);
    });
  }

  // Algorithm selection tabs
  const tabs = document.querySelectorAll('#algoTabs .tab-btn');
  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      tabs.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentAlgo = btn.dataset.algo;
      updateDashboard();
    });
  });

  // Build method-filter chips for Compare-All mode
  initMethodFilterChips();
}

// Expose switchDataset to window
window.switchDataset = switchDataset;


// Switch Dataset Handler
function switchDataset(newDatasetKey) {
  if (!window.DATASETS || !window.DATASETS[newDatasetKey]) return;
  currentDatasetKey = newDatasetKey;
  const ds = window.DATASETS[currentDatasetKey];

  // Point active global data
  window.MODEL_DATA = ds.model_data;
  window.METADATA = ds.metadata;
  window.FINAL_MODEL_COMPARISON = ds.final_model_comparison;
  currentK = ds.sweet_spot_k || ds.default_k || 1;

  // 1. Update Header & Breadcrumb
  const breadcrumb = document.getElementById('headerBreadcrumb');
  const headerTitle = document.getElementById('headerTitle');
  if (breadcrumb) breadcrumb.textContent = `${ds.name} Feature Progression`;
  if (headerTitle) {
    headerTitle.innerHTML = `<i class="fa-solid fa-chart-line" style="color: var(--primary);"></i> ${ds.name} Multiple Linear Regression Explorer <span class="brand-badge">CRISP-DM</span>`;
  }

  // 2. Update Quick Summary & Hero Card
  const quickSummary = document.getElementById('datasetQuickSummary');
  if (quickSummary) {
    if (currentDatasetKey === '50_startups') {
      quickSummary.innerHTML = `
        <span class="badge-tag badge-blue"><i class="fa-solid fa-layer-group"></i> 5 Features (k=1..5)</span>
        <span class="badge-tag badge-purple"><i class="fa-solid fa-rotate"></i> 5-Fold CV</span>
        <span class="badge-tag badge-green"><i class="fa-solid fa-award"></i> Optimal Sweet Spot: k=2</span>
      `;
    } else {
      quickSummary.innerHTML = `
        <span class="badge-tag badge-blue"><i class="fa-solid fa-layer-group"></i> 13 Features (k=1..13)</span>
        <span class="badge-tag badge-purple"><i class="fa-solid fa-rotate"></i> 5-Fold CV</span>
        <span class="badge-tag badge-green"><i class="fa-solid fa-award"></i> Optimal Sweet Spot: k=${ds.sweet_spot_k}</span>
      `;
    }
  }

  const heroTitle = document.getElementById('heroTitle');
  const heroDescription = document.getElementById('heroDescription');
  const heroTagsContainer = document.getElementById('heroTagsContainer');

  if (heroTitle) heroTitle.textContent = `${ds.name}: Feature Selection & Parsimony Analysis`;
  if (heroDescription) {
    if (currentDatasetKey === '50_startups') {
      heroDescription.innerHTML = `Compare 6 Machine Learning Feature Selection Algorithms (<strong>Pearson Correlation</strong>, <strong>F-test</strong>, <strong>LassoCV</strong>, <strong>RFECV</strong>, <strong>Exhaustive Search</strong>, and <strong>Baseline OLS</strong>). Explore the bias-variance tradeoff across feature counts \\(k = 1 \\dots 5\\), pinpointing the <strong>2-feature optimal sweet spot</strong> and the <strong>5-feature overfitting cliff</strong>.`;
    } else {
      heroDescription.innerHTML = `Explore 6 Machine Learning Feature Selection Algorithms across 13 socioeconomic, environmental, and structural predictors for Boston median house values (\\(k = 1 \\dots 13\\)). Pinpoint the <strong>parsimonious sweet spot at k = ${ds.sweet_spot_k}</strong> that minimizes cross-validation RMSE ($4.90k) and test error.`;
    }
  }

  if (heroTagsContainer) {
    if (currentDatasetKey === '50_startups') {
      heroTagsContainer.innerHTML = `
        <span class="hero-pill"><i class="fa-solid fa-database"></i> 50 Startups Dataset (80/20 Train-Test Split)</span>
        <span class="hero-pill"><i class="fa-solid fa-rotate"></i> 5-Fold Cross Validation</span>
        <span class="hero-pill"><i class="fa-solid fa-layer-group"></i> 6 Selection Strategies</span>
        <span class="hero-pill"><i class="fa-solid fa-star" style="color: #34d399;"></i> Global Sweet Spot: k=2 ($8,206.33 Test RMSE)</span>
        <span class="hero-pill"><i class="fa-solid fa-triangle-exclamation" style="color: #fbbf24;"></i> Overfitting Warning: k=5 ($9,055.96 Test RMSE)</span>
      `;
    } else {
      heroTagsContainer.innerHTML = `
        <span class="hero-pill"><i class="fa-solid fa-database"></i> Boston Housing Dataset (506 Samples • 80/20 Split)</span>
        <span class="hero-pill"><i class="fa-solid fa-rotate"></i> 5-Fold Cross Validation</span>
        <span class="hero-pill"><i class="fa-solid fa-layer-group"></i> 13 Predictors & 6 Selection Strategies</span>
        <span class="hero-pill"><i class="fa-solid fa-star" style="color: #34d399;"></i> Global Sweet Spot: k=${ds.sweet_spot_k} ($4.90k Test RMSE)</span>
        <span class="hero-pill"><i class="fa-solid fa-triangle-exclamation" style="color: #fbbf24;"></i> Full Model: k=13</span>
      `;
    }
  }

  // 3. Dynamic k-Buttons Render
  renderKButtons();

  // 4. Update Chart Axes and Labels
  updateChartAxes();

  // 5. Dynamic Predictor Input Fields Render
  renderLivePredictor();

  // 6. Update Additional Analysis Figures & Descriptions
  updateAdditionalAnalysisFigures(ds);

  // 7. Update Methodology Table
  updateMethodologyTable();

  // 8. Refresh Dashboard
  updateDashboard();
}

// Render k buttons dynamically based on active dataset
function renderKButtons() {
  const ds = getCurrentDataset();
  const group = document.getElementById('kSelectorGroup');
  if (!group || !ds) return;
  group.innerHTML = '';

  ds.k_labels.forEach((label, idx) => {
    const kVal = idx + 1;
    const btn = document.createElement('button');
    btn.className = 'k-btn';
    btn.dataset.k = kVal;

    const isSweet = (kVal === ds.sweet_spot_k);
    const isOverfit = (kVal === ds.overfitting_k);

    if (isSweet) {
      btn.classList.add('sweet-spot');
      btn.innerHTML = `k = ${kVal} ★ Sweet Spot`;
    } else if (isOverfit) {
      btn.classList.add('overfitting');
      btn.innerHTML = `k = ${kVal} ⚠ Full`;
    } else {
      btn.innerHTML = `k = ${kVal}`;
    }

    if (kVal === currentK) {
      btn.classList.add('active');
    }

    btn.addEventListener('click', () => {
      group.querySelectorAll('.k-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentK = kVal;
      updateDashboard();
    });

    group.appendChild(btn);
  });
}

// Update Chart X/Y Axes when dataset changes
function updateChartAxes() {
  const ds = getCurrentDataset();
  if (!ds || !rmseChartInstance || !r2ChartInstance) return;

  const labels = ds.k_labels;
  rmseChartInstance.data.labels = labels;
  r2ChartInstance.data.labels = labels;

  // Y-axis tick formatting callback
  if (currentDatasetKey === '50_startups') {
    rmseChartInstance.options.scales.y.title.text = 'RMSE ($) (Lower is Better)';
    rmseChartInstance.options.scales.y.ticks.callback = (val) => '$' + Number(val).toLocaleString();
  } else {
    rmseChartInstance.options.scales.y.title.text = 'RMSE ($1,000s) (Lower is Better)';
    rmseChartInstance.options.scales.y.ticks.callback = (val) => '$' + Number(val).toFixed(2) + 'k';
  }

  rmseChartInstance.update();
  r2ChartInstance.update();
}

// Render dynamic live predictor inputs based on dataset
function renderLivePredictor() {
  const ds = getCurrentDataset();
  const container = document.getElementById('livePredictorInputs');
  const titleEl = document.getElementById('livePredictorTitle');
  const subtitleEl = document.getElementById('livePredictorSubtitle');
  const labelEl = document.getElementById('predOutputLabel');

  if (!container || !ds) return;
  container.innerHTML = '';

  if (titleEl) titleEl.textContent = `Live ${ds.name} Predictor`;
  if (subtitleEl) subtitleEl.textContent = `Test predictions in real-time using active ${ds.name} coefficients.`;
  if (labelEl) labelEl.textContent = currentDatasetKey === '50_startups' ? 'Predicted Startup Profit' : 'Predicted Median Home Value';

  // Render numeric sliders for quantitative predictors
  ds.predictor_features.forEach(p => {
    const group = document.createElement('div');
    group.className = 'input-group';
    
    const formattedVal = p.prefix 
      ? p.prefix + Number(p.default).toLocaleString() 
      : Number(p.default).toString();

    group.innerHTML = `
      <div class="input-label-row">
        <span>${p.name}</span>
        <span id="${p.labelId}" style="color: var(--primary); font-family: 'Fira Code', monospace; font-weight: 600;">${formattedVal}</span>
      </div>
      <input type="number" id="${p.id}" class="input-field" value="${p.default}" min="${p.min}" max="${p.max}" step="${p.step}">
      <input type="range" id="${p.sliderId}" class="range-slider" value="${p.default}" min="${p.min}" max="${p.max}" step="${p.step}">
    `;
    container.appendChild(group);

    // Sync input and slider
    const numInput = group.querySelector(`#${p.id}`);
    const sliderInput = group.querySelector(`#${p.sliderId}`);
    const lbl = group.querySelector(`#${p.labelId}`);

    const sync = (val) => {
      numInput.value = val;
      sliderInput.value = val;
      if (lbl) {
        lbl.textContent = p.prefix ? p.prefix + Number(val).toLocaleString() : Number(val).toString();
      }
      calculateLivePrediction();
    };

    numInput.addEventListener('input', (e) => sync(e.target.value));
    sliderInput.addEventListener('input', (e) => sync(e.target.value));
  });

  // Render categorical select if exists (50 Startups)
  if (ds.categorical) {
    const catGroup = document.createElement('div');
    catGroup.className = 'input-group';
    catGroup.id = 'inputGroupState';
    
    let optionsHtml = '';
    ds.categorical.options.forEach(opt => {
      optionsHtml += `<option value="${opt.value}">${opt.label}</option>`;
    });

    catGroup.innerHTML = `
      <div class="input-label-row">
        <span>${ds.categorical.name}</span>
      </div>
      <select id="selectState" class="input-field">
        ${optionsHtml}
      </select>
    `;
    container.appendChild(catGroup);

    const sel = catGroup.querySelector('#selectState');
    if (sel) {
      sel.addEventListener('change', calculateLivePrediction);
    }
  }

  calculateLivePrediction();
}

// Update Additional Analysis Figures & Descriptions
function updateAdditionalAnalysisFigures(ds) {
  const imgCorr = document.getElementById('imgCorrelation');
  const descCorr = document.getElementById('descCorrelation');
  const imgCons = document.getElementById('imgConsensus');
  const descCons = document.getElementById('descConsensus');
  const imgComp = document.getElementById('imgComparison');
  const descComp = document.getElementById('descComparison');

  if (imgCorr && ds.images && ds.images.correlation) imgCorr.src = ds.images.correlation;
  if (descCorr && ds.image_descriptions && ds.image_descriptions.correlation) descCorr.innerHTML = ds.image_descriptions.correlation;

  if (imgCons && ds.images && ds.images.consensus) imgCons.src = ds.images.consensus;
  if (descCons && ds.image_descriptions && ds.image_descriptions.consensus) descCons.innerHTML = ds.image_descriptions.consensus;

  if (imgComp && ds.images && ds.images.comparison) imgComp.src = ds.images.comparison;
  if (descComp && ds.image_descriptions && ds.image_descriptions.comparison) descComp.innerHTML = ds.image_descriptions.comparison;
}

// Update Methodology Table
function updateMethodologyTable() {
  const tbody = document.getElementById('methodologyTableBody');
  if (!tbody) return;

  if (currentDatasetKey === '50_startups') {
    tbody.innerHTML = `
      <tr>
        <td><strong>Dataset Partition</strong></td>
        <td>80% Train (40 rows) / 20% Test (10 rows)</td>
        <td>Fixed <code>random_state=42</code> for exact reproducible evaluation.</td>
      </tr>
      <tr>
        <td><strong>Cross Validation</strong></td>
        <td>5-Fold K-Fold CV</td>
        <td><code>KFold(n_splits=5, shuffle=True, random_state=42)</code> prevents fold leakage.</td>
      </tr>
      <tr>
        <td><strong>Categorical Encoding</strong></td>
        <td>Two Dummies with Intercept</td>
        <td><code>OneHotEncoder(drop='first')</code> drops California as base level to avoid the dummy variable trap.</td>
      </tr>
      <tr>
        <td><strong>Optimal Sweet Spot</strong></td>
        <td>k = 2 (R&D Spend + Marketing Spend)</td>
        <td>Minimizes CV RMSE ($9,682.56) and Test RMSE ($8,206.33) with zero multicollinearity (VIF = 2.26).</td>
      </tr>
    `;
  } else {
    tbody.innerHTML = `
      <tr>
        <td><strong>Dataset Partition</strong></td>
        <td>80% Train (404 rows) / 20% Test (102 rows)</td>
        <td>Standard 80/20 partition with fixed <code>random_state=42</code> for benchmark stability.</td>
      </tr>
      <tr>
        <td><strong>Cross Validation</strong></td>
        <td>5-Fold K-Fold CV</td>
        <td><code>KFold(n_splits=5, shuffle=True, random_state=42)</code> ensures out-of-fold generalization.</td>
      </tr>
      <tr>
        <td><strong>Feature Standardization</strong></td>
        <td>StandardScaler() for Selection</td>
        <td>Applied to RFECV and LassoCV to prevent scale bias across diverse housing units.</td>
      </tr>
      <tr>
        <td><strong>Optimal Sweet Spot</strong></td>
        <td>k = 7 (CRIM, NOX, RM, DIS, RAD, TAX, PTRATIO)</td>
        <td>Minimizes Cross-Validation RMSE ($4.90k) and Test RMSE ($4.90k) while preserving key structural effects.</td>
      </tr>
    `;
  }
}

// Active Model Data Retrieval
function getActiveModelData() {
  if (!window.MODEL_DATA) return null;
  const algo = currentAlgo === 'ALL' ? 'Pearson Correlation' : currentAlgo;
  const models = window.MODEL_DATA[algo];
  if (!models || models.length === 0) return null;
  const idx = Math.min(Math.max(currentK - 1, 0), models.length - 1);
  return models[idx];
}

// Update Full Dashboard
function updateDashboard() {
  const data = getActiveModelData();
  const ds = getCurrentDataset();
  if (!data || !ds) return;

  const isStartups = (currentDatasetKey === '50_startups');

  // Format currency helper
  const fmtCurrency = (val) => {
    if (isStartups) {
      return '$' + val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    } else {
      return '$' + val.toFixed(2) + 'k';
    }
  };

  // 1. Update KPI Cards
  const valRMSE = document.getElementById('valRMSE');
  const valR2 = document.getElementById('valR2');
  const valAdjR2 = document.getElementById('valAdjR2');
  const valMAE = document.getElementById('valMAE');
  const valFStat = document.getElementById('valFStat');
  const valCVRMSE = document.getElementById('valCVRMSE');

  if (valRMSE) valRMSE.textContent = fmtCurrency(data.rmse);
  if (valR2) valR2.textContent = data.r2.toFixed(4);
  if (valAdjR2) valAdjR2.textContent = data.adj_r2 ? data.adj_r2.toFixed(4) : 'N/A';
  if (valMAE) valMAE.textContent = fmtCurrency(data.mae);
  if (valFStat) valFStat.textContent = data.f_stat ? data.f_stat.toFixed(1) : '366.0';
  if (valCVRMSE) valCVRMSE.textContent = fmtCurrency(data.cv_rmse);

  // 2. Sweet spot & Overfitting badges
  const rmseBadge = document.getElementById('rmseBadge');
  if (rmseBadge) {
    if (currentK === ds.sweet_spot_k) {
      rmseBadge.className = 'badge-tag badge-green';
      rmseBadge.innerHTML = '<i class="fa-solid fa-award"></i> Optimal Sweet Spot';
    } else if (currentK === ds.overfitting_k) {
      rmseBadge.className = 'badge-tag badge-amber';
      rmseBadge.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Full Model';
    } else {
      rmseBadge.className = 'badge-tag badge-blue';
      rmseBadge.innerHTML = `k = ${currentK}`;
    }
  }

  // 3. Active Feature Chips
  const countEl = document.getElementById('featuresCount');
  if (countEl) countEl.textContent = data.features.length;

  const chipsContainer = document.getElementById('featuresListChips');
  if (chipsContainer) {
    chipsContainer.innerHTML = '';
    data.features.forEach(feat => {
      const chip = document.createElement('span');
      chip.className = 'feature-chip';
      chip.innerHTML = `<i class="fa-solid fa-check" style="color: #10b981; font-size: 10px;"></i> ${feat}`;
      chipsContainer.appendChild(chip);
    });
  }

  // 4. Parsimony Explanation Notice
  const notice = document.getElementById('parsimonyNotice');
  if (notice) {
    if (isStartups) {
      if (currentK === 2) {
        notice.className = 'badge-tag badge-green';
        notice.innerHTML = '<i class="fa-solid fa-star"></i> Occam\'s Razor: 2 features (R&D Spend + Marketing Spend) produce lowest CV RMSE ($9,682.56) and test RMSE ($8,206.33).';
      } else if (currentK === 5) {
        notice.className = 'badge-tag badge-amber';
        notice.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Overfitting Warning: Adding noisy State dummies and Administration inflates test error to $9,055.96!';
      } else if (currentK === 1) {
        notice.className = 'badge-tag badge-blue';
        notice.innerHTML = '<i class="fa-solid fa-circle-info"></i> Parsimonious 1-feature model (R&D Spend alone) explains 92.65% test variance.';
      } else {
        notice.className = 'badge-tag badge-purple';
        notice.innerHTML = `<i class="fa-solid fa-circle-info"></i> Model evaluated with ${currentK} predictors for ${currentAlgo}.`;
      }
    } else {
      if (currentK === ds.sweet_spot_k) {
        notice.className = 'badge-tag badge-green';
        notice.innerHTML = `<i class="fa-solid fa-star"></i> Optimal Subset: k=${ds.sweet_spot_k} features minimize CV RMSE ($${data.cv_rmse.toFixed(2)}k) and test RMSE ($${data.rmse.toFixed(2)}k).`;
      } else if (currentK === 13) {
        notice.className = 'badge-tag badge-amber';
        notice.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Full Model: 13 features include redundant attributes with high collinearity.';
      } else {
        notice.className = 'badge-tag badge-blue';
        notice.innerHTML = `<i class="fa-solid fa-circle-info"></i> Boston Housing evaluated with ${currentK} predictors for ${currentAlgo}.`;
      }
    }
  }

  // 5. Update Equation Box
  updateEquation(data.coefficients);

  // 6. Update Coefficients Table
  updateCoefficientsTable(data.coefficients);

  // 7. Update Outliers / Residuals Table
  updateOutliersTable(data.outliers);

  // 8. Update Method Filter Visibility & Charts
  updateMethodFilterVisibility();
  updateCharts();

  // 9. Recalculate Live Prediction
  calculateLivePrediction();
}

// Regression Equation Box
function updateEquation(coefficients) {
  const box = document.getElementById('equationBox');
  if (!box || !coefficients) return;

  const isStartups = (currentDatasetKey === '50_startups');
  const targetLabel = isStartups ? 'Profit' : 'MEDV';
  const intercept = coefficients.find(c => c.feature.includes('Intercept'));
  let parts = [];

  if (intercept) {
    const formattedIntercept = isStartups 
      ? intercept.coef.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      : intercept.coef.toFixed(4);
    parts.push(`<span class="eq-intercept">${formattedIntercept}</span>`);
  }

  coefficients.forEach(c => {
    if (c.feature.includes('Intercept')) return;
    const sign = c.coef >= 0 ? '<span class="eq-pos">+</span>' : '<span class="eq-neg">-</span>';
    const absVal = Math.abs(c.coef).toFixed(4);
    parts.push(`${sign} ${absVal} × <span class="eq-var">(${c.feature})</span>`);
  });

  box.innerHTML = `<strong>${targetLabel}</strong> = ${parts.join(' ')}`;
}

// Coefficients & Statistical Tests Table
function updateCoefficientsTable(coefficients) {
  const tbody = document.getElementById('coefTableBody');
  if (!tbody || !coefficients) return;
  tbody.innerHTML = '';

  coefficients.forEach(c => {
    const tr = document.createElement('tr');
    const isIntercept = c.feature.includes('Intercept');
    
    let pBadge = '';
    if (c.pvalue < 0.05) {
      const pText = c.pvalue < 0.0001 ? '< 0.0001' : c.pvalue.toFixed(4);
      pBadge = `<span class="badge-tag badge-green">${pText} <i class="fa-solid fa-check"></i></span>`;
    } else {
      pBadge = `<span class="badge-tag badge-amber">${c.pvalue.toFixed(4)} (n.s.)</span>`;
    }

    let vifDisplay = '<span style="color: var(--slate-400);">N/A</span>';
    if (!isIntercept && c.vif !== null && c.vif !== undefined) {
      if (c.vif < 5.0) {
        vifDisplay = `<span class="badge-tag badge-green">${c.vif.toFixed(2)} (Safe)</span>`;
      } else {
        vifDisplay = `<span class="badge-tag badge-amber">${c.vif.toFixed(2)} (Collinear)</span>`;
      }
    }

    const ciStr = `[${c.ci_lower.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}, ${c.ci_upper.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}]`;

    tr.innerHTML = `
      <td style="font-weight: 600; color: var(--slate-900);">${c.feature}</td>
      <td style="font-family: 'Fira Code', monospace; font-weight: 600;">${c.coef.toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 })}</td>
      <td style="font-family: 'Fira Code', monospace; color: var(--slate-600);">${c.stderr.toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 })}</td>
      <td style="font-family: 'Fira Code', monospace; font-weight: 600;">${c.tstat.toFixed(2)}</td>
      <td>${pBadge}</td>
      <td style="font-family: 'Fira Code', monospace; font-size: 12px; color: var(--slate-600);">${ciStr}</td>
      <td>${vifDisplay}</td>
    `;
    tbody.appendChild(tr);
  });
}

// Residuals & Outliers Table
function updateOutliersTable(outliers) {
  const tbody = document.getElementById('outliersTableBody');
  const thActual = document.getElementById('thActual');
  const thPredicted = document.getElementById('thPredicted');
  const thResidual = document.getElementById('thResidual');
  const residualsSubtitle = document.getElementById('residualsSubtitle');

  if (!tbody || !outliers) return;
  tbody.innerHTML = '';

  const isStartups = (currentDatasetKey === '50_startups');
  if (thActual) thActual.textContent = isStartups ? 'Actual Profit' : 'Actual MEDV ($1k)';
  if (thPredicted) thPredicted.textContent = isStartups ? 'Predicted Profit' : 'Predicted MEDV ($1k)';
  if (thResidual) thResidual.textContent = isStartups ? 'Residual ($)' : 'Residual ($1k)';
  if (residualsSubtitle) {
    residualsSubtitle.textContent = isStartups 
      ? 'Out-of-sample test set residuals (10 startups), ranked by absolute error.'
      : 'Out-of-sample test set residuals (102 Boston homes), ranked by absolute error.';
  }

  const fmtVal = (v) => isStartups 
    ? '$' + v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : '$' + v.toFixed(2) + 'k';

  outliers.forEach(o => {
    const tr = document.createElement('tr');
    const isHigh = isStartups ? (o.abs_error > 10000) : (o.abs_error > 6.0);
    const statusBadge = isHigh 
      ? `<span class="badge-tag badge-amber"><span class="status-dot dot-amber"></span> High Residual</span>`
      : `<span class="badge-tag badge-green"><span class="status-dot dot-green"></span> Normal</span>`;

    const sampleName = isStartups ? `Startup #${o.index}` : `House #${o.index}`;

    tr.innerHTML = `
      <td style="font-weight: 700;">#${o.rank}</td>
      <td>${sampleName}</td>
      <td style="font-family: 'Fira Code', monospace;">${fmtVal(o.actual)}</td>
      <td style="font-family: 'Fira Code', monospace;">${fmtVal(o.predicted)}</td>
      <td style="color: ${o.residual >= 0 ? '#059669' : '#dc2626'}; font-weight: 600; font-family: 'Fira Code', monospace;">${o.residual >= 0 ? '+' : ''}${fmtVal(o.residual)}</td>
      <td style="font-family: 'Fira Code', monospace;">${fmtVal(o.abs_error)}</td>
      <td style="font-family: 'Fira Code', monospace; font-weight: 600;">${o.pct_error.toFixed(2)}%</td>
      <td>${statusBadge}</td>
    `;
    tbody.appendChild(tr);
  });
}

// Live Interactive Predictor Calculation
function calculateLivePrediction() {
  const data = getActiveModelData();
  const ds = getCurrentDataset();
  if (!data || !ds) return;

  const isStartups = (currentDatasetKey === '50_startups');
  let pred = 0;
  let breakdown = [];

  if (isStartups) {
    const numRD = document.getElementById('numRD');
    const numMkt = document.getElementById('numMkt');
    const numAdmin = document.getElementById('numAdmin');
    const selectState = document.getElementById('selectState');

    const rd = numRD ? parseFloat(numRD.value) || 0 : 0;
    const mkt = numMkt ? parseFloat(numMkt.value) || 0 : 0;
    const admin = numAdmin ? parseFloat(numAdmin.value) || 0 : 0;
    const state = selectState ? selectState.value : 'California';

    data.coefficients.forEach(c => {
      if (c.feature.includes('Intercept')) {
        pred += c.coef;
        breakdown.push(`Base Intercept: $${c.coef.toLocaleString('en-US', { maximumFractionDigits: 0 })}`);
      } else if (c.feature === 'R&D Spend') {
        const val = c.coef * rd;
        pred += val;
        breakdown.push(`R&D: ${val >= 0 ? '+' : ''}$${val.toLocaleString('en-US', { maximumFractionDigits: 0 })}`);
      } else if (c.feature === 'Marketing Spend') {
        const val = c.coef * mkt;
        pred += val;
        breakdown.push(`Marketing: ${val >= 0 ? '+' : ''}$${val.toLocaleString('en-US', { maximumFractionDigits: 0 })}`);
      } else if (c.feature === 'Administration') {
        const val = c.coef * admin;
        pred += val;
        breakdown.push(`Admin: ${val >= 0 ? '+' : ''}$${val.toLocaleString('en-US', { maximumFractionDigits: 0 })}`);
      } else if (c.feature === 'State_Florida' && state === 'Florida') {
        pred += c.coef;
        breakdown.push(`Florida dummy: ${c.coef >= 0 ? '+' : ''}$${c.coef.toLocaleString('en-US', { maximumFractionDigits: 0 })}`);
      } else if (c.feature === 'State_New York' && state === 'New York') {
        pred += c.coef;
        breakdown.push(`NY dummy: ${c.coef >= 0 ? '+' : ''}$${c.coef.toLocaleString('en-US', { maximumFractionDigits: 0 })}`);
      }
    });

    const outputEl = document.getElementById('predProfitOutput');
    const noteEl = document.getElementById('predFormulaNote');

    if (outputEl) {
      outputEl.textContent = '$' + pred.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    if (noteEl) {
      noteEl.innerHTML = `<strong>Active Model:</strong> ${currentAlgo} (k = ${currentK})<br>` +
                         `<span style="color: #cbd5e1; font-size: 11.5px;">Breakdown: ${breakdown.join(' | ')}</span>`;
    }
  } else {
    // Boston Housing Calculation
    data.coefficients.forEach(c => {
      if (c.feature.includes('Intercept')) {
        pred += c.coef;
        breakdown.push(`Intercept: ${c.coef.toFixed(2)}`);
      } else {
        const inputEl = document.getElementById(`num${c.feature}`);
        if (inputEl) {
          const val = parseFloat(inputEl.value) || 0;
          const contribution = c.coef * val;
          pred += contribution;
          breakdown.push(`${c.feature}: ${contribution >= 0 ? '+' : ''}${contribution.toFixed(2)}`);
        }
      }
    });

    const outputEl = document.getElementById('predProfitOutput');
    const noteEl = document.getElementById('predFormulaNote');

    if (outputEl) {
      outputEl.textContent = '$' + (pred * 1000).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + ` ($${pred.toFixed(2)}k)`;
    }

    if (noteEl) {
      noteEl.innerHTML = `<strong>Active Model:</strong> ${currentAlgo} (k = ${currentK})<br>` +
                         `<span style="color: #cbd5e1; font-size: 11.5px;">Breakdown: ${breakdown.join(' | ')}</span>`;
    }
  }
}

// Chart.js Setup
function initCharts() {
  const ctxRMSE = document.getElementById('rmseChart');
  const ctxR2 = document.getElementById('r2Chart');

  if (!ctxRMSE || !ctxR2) return;

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        position: 'bottom',
        labels: {
          font: { family: 'Inter', size: 11 },
          usePointStyle: true,
          pointStyleWidth: 16,
          boxHeight: 10,
          padding: 14
        }
      },
      tooltip: {
        enabled: false // Disabled large hover tooltip as requested
      }
    },
    interaction: {
      mode: 'index',
      intersect: false
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Number of Features (k)',
          font: { family: 'Inter', weight: 600, size: 12 },
          color: '#334155'
        },
        grid: { color: '#f1f5f9' },
        ticks: { font: { family: 'Inter', size: 11 } }
      },
      y: {
        grid: { color: '#f1f5f9' },
        ticks: { font: { family: 'Inter', size: 11 } }
      }
    },
    onClick: (e, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        const newK = index + 1;
        const kBtns = document.querySelectorAll('#kSelectorGroup .k-btn');
        kBtns.forEach(b => {
          if (parseInt(b.dataset.k, 10) === newK) b.click();
        });
      }
    }
  };

  // RMSE Chart
  rmseChartInstance = new Chart(ctxRMSE.getContext('2d'), {
    type: 'line',
    data: { labels: ['1', '2', '3', '4', '5'], datasets: [] },
    options: {
      ...commonOptions,
      scales: {
        ...commonOptions.scales,
        y: {
          ...commonOptions.scales.y,
          title: {
            display: true,
            text: 'RMSE ($) (Lower is Better)',
            font: { family: 'Inter', weight: 600, size: 12 },
            color: '#334155'
          },
          ticks: {
            ...commonOptions.scales.y.ticks,
            callback: (val) => '$' + Number(val).toLocaleString()
          }
        }
      }
    }
  });

  // R2 Chart
  r2ChartInstance = new Chart(ctxR2.getContext('2d'), {
    type: 'line',
    data: { labels: ['1', '2', '3', '4', '5'], datasets: [] },
    options: {
      ...commonOptions,
      scales: {
        ...commonOptions.scales,
        y: {
          ...commonOptions.scales.y,
          title: {
            display: true,
            text: 'R-squared (Higher is Better)',
            font: { family: 'Inter', weight: 600, size: 12 },
            color: '#334155'
          },
          ticks: {
            ...commonOptions.scales.y.ticks,
            callback: (val) => Number(val).toFixed(2)
          }
        }
      }
    }
  });
}

function updateCharts() {
  if (!rmseChartInstance || !r2ChartInstance || !window.MODEL_DATA) return;

  const ds = getCurrentDataset();
  const isCompareAll = currentAlgo === 'ALL';
  const badgeRMSE = document.getElementById('rmseChartBadge');
  const badgeR2 = document.getElementById('r2ChartBadge');

  if (badgeRMSE) badgeRMSE.textContent = isCompareAll ? 'Comparing All 6 Methods' : currentAlgo;
  if (badgeR2) badgeR2.textContent = isCompareAll ? 'Comparing All 6 Methods' : `Active k = ${currentK}`;

  let datasetsRMSE = [];
  let datasetsR2 = [];

  const algosToRender = isCompareAll
    ? ALL_ALGO_KEYS.filter(a => activeMethodsFilter.has(a))
    : [currentAlgo];

  const sweetK = ds ? ds.sweet_spot_k : 2;

  algosToRender.forEach((algo) => {
    const algoData = window.MODEL_DATA[algo];
    if (!algoData) return;

    const rmsePoints = algoData.map(item => item.rmse);
    const r2Points = algoData.map(item => item.r2);
    const color = ALGO_COLORS[algo] || '#4f46e5';

    const dash = isCompareAll ? (ALGO_DASH[algo] || []) : [];
    const ptStyle = isCompareAll ? (ALGO_POINT_STYLE[algo] || 'circle') : 'circle';
    const bWidth = isCompareAll ? 2.2 : 2.8;
    const ptRadius = algoData.map(item => item.k === currentK ? 8 : (item.k === sweetK ? 7 : 5));
    const ptColors = algoData.map(item => item.k === sweetK ? '#10b981' : color);

    datasetsRMSE.push({
      label: algo,
      data: rmsePoints,
      borderColor: color,
      backgroundColor: color,
      borderWidth: bWidth,
      borderDash: dash,
      tension: 0.15,
      pointStyle: ptStyle,
      pointRadius: ptRadius,
      pointBackgroundColor: ptColors,
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2
    });

    datasetsR2.push({
      label: algo,
      data: r2Points,
      borderColor: color,
      backgroundColor: color,
      borderWidth: bWidth,
      borderDash: dash,
      tension: 0.15,
      pointStyle: ptStyle,
      pointRadius: ptRadius,
      pointBackgroundColor: ptColors,
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2
    });
  });

  rmseChartInstance.data.datasets = datasetsRMSE;
  rmseChartInstance.options.plugins.legend.display = isCompareAll;
  rmseChartInstance.update();

  r2ChartInstance.data.datasets = datasetsR2;
  r2ChartInstance.options.plugins.legend.display = isCompareAll;
  r2ChartInstance.update();
}

// Method Filter Chips for Compare All Mode
function initMethodFilterChips() {
  const container = document.getElementById('methodFilterChips');
  if (!container) return;
  container.innerHTML = '';

  ALL_ALGO_KEYS.forEach(algo => {
    const color = ALGO_COLORS[algo] || '#4f46e5';
    const chip = document.createElement('button');
    chip.dataset.algo = algo;
    chip.setAttribute('data-filter-chip', '');
    chip.title = algo;
    setChipActive(chip, color, true);
    chip.innerHTML =
      `<span style="display:inline-block;width:9px;height:9px;border-radius:50%;` +
      `background:${color};flex-shrink:0"></span>${algo}`;

    chip.addEventListener('click', () => {
      const isOn = activeMethodsFilter.has(algo);
      if (isOn && activeMethodsFilter.size === 1) return;
      if (isOn) {
        activeMethodsFilter.delete(algo);
        setChipActive(chip, color, false);
      } else {
        activeMethodsFilter.add(algo);
        setChipActive(chip, color, true);
      }
      updateCharts();
    });

    container.appendChild(chip);
  });

  const btnAll = document.getElementById('filterSelectAll');
  if (btnAll) {
    btnAll.addEventListener('click', () => {
      ALL_ALGO_KEYS.forEach(a => activeMethodsFilter.add(a));
      container.querySelectorAll('[data-filter-chip]').forEach(c => {
        setChipActive(c, ALGO_COLORS[c.dataset.algo], true);
      });
      updateCharts();
    });
  }

  const btnNone = document.getElementById('filterClearAll');
  if (btnNone) {
    btnNone.addEventListener('click', () => {
      activeMethodsFilter.clear();
      activeMethodsFilter.add(ALL_ALGO_KEYS[0]);
      container.querySelectorAll('[data-filter-chip]').forEach(c => {
        const keep = c.dataset.algo === ALL_ALGO_KEYS[0];
        setChipActive(c, ALGO_COLORS[c.dataset.algo], keep);
      });
      updateCharts();
    });
  }
}

function setChipActive(chip, color, active) {
  chip.style.cssText =
    `display:inline-flex;align-items:center;gap:6px;` +
    `padding:5px 13px;border-radius:20px;cursor:pointer;` +
    `font-size:12px;font-weight:600;font-family:Inter,sans-serif;` +
    `transition:all 0.15s ease;` +
    (active
      ? `border:2px solid ${color};background:${color}18;color:${color};opacity:1;`
      : `border:2px solid #cbd5e1;background:transparent;color:#94a3b8;opacity:0.55;`);
}

function updateMethodFilterVisibility() {
  const panel = document.getElementById('methodFilterPanel');
  if (!panel) return;
  panel.style.display = (currentAlgo === 'ALL') ? 'block' : 'none';
}
