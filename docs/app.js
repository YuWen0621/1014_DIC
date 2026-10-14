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
  'Pearson Correlation': '#336640', // Deep Forest / Sage Green
  'F-test': '#EF4444',              // Red for F-test
  'RFECV': '#2A9D8F',               // Fresh Mint Teal
  'Exhaustive Feature Selection': '#7663A8', // Soft Lavender Purple
  'LassoCV': '#D97706',             // Warm Honey Amber
  'Baseline OLS': '#457B9D'          // Muted Slate Blue
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

  // Initialize Custom Dataset Import Handlers
  initCustomDatasetHandlers();
}

// Expose functions to window
window.switchDataset = switchDataset;
window.handleCsvTextLoaded = handleCsvTextLoaded;
window.runCustomRegression = runCustomRegression;
window.updateDashboard = updateDashboard;



// Switch Dataset Handler
function switchDataset(newDatasetKey) {
  const panel = document.getElementById('customDatasetPanel');
  const addSection = document.getElementById('additionalSection');
  if (newDatasetKey === 'custom_dataset') {
    if (panel) panel.style.display = 'block';
    if (addSection) addSection.style.display = 'none';
    if (!window.DATASETS || !window.DATASETS['custom_dataset']) {
      // Prompt user to fetch / run regression first
      showCustomStatus('Please click "Fetch & Preview" to load the dataset, then click "Run Regression Analysis".', 'info');
      currentDatasetKey = 'custom_dataset';
      return;
    }
  } else {
    if (panel) panel.style.display = 'none';
    if (addSection) addSection.style.display = 'block';
  }

  if (!window.DATASETS || !window.DATASETS[newDatasetKey]) return;
  currentDatasetKey = newDatasetKey;
  const ds = window.DATASETS[currentDatasetKey];
  if (addSection) {
    addSection.style.display = (currentDatasetKey === 'custom_dataset') ? 'none' : 'block';
  }

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
    } else if (currentDatasetKey === 'boston_housing') {
      quickSummary.innerHTML = `
        <span class="badge-tag badge-blue"><i class="fa-solid fa-layer-group"></i> 13 Features (k=1..13)</span>
        <span class="badge-tag badge-purple"><i class="fa-solid fa-rotate"></i> 5-Fold CV</span>
        <span class="badge-tag badge-green"><i class="fa-solid fa-award"></i> Optimal Sweet Spot: k=${ds.sweet_spot_k}</span>
      `;
    } else {
      quickSummary.innerHTML = `
        <span class="badge-tag badge-blue"><i class="fa-solid fa-layer-group"></i> ${ds.features.length} Features (k=1..${ds.k_labels.length})</span>
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
    } else if (currentDatasetKey === 'boston_housing') {
      heroDescription.innerHTML = `Explore 6 Machine Learning Feature Selection Algorithms across 13 socioeconomic, environmental, and structural predictors for Boston median house values (\\(k = 1 \\dots 13\\)). Pinpoint the <strong>parsimonious sweet spot at k = ${ds.sweet_spot_k}</strong> that minimizes cross-validation RMSE ($4.90k) and test error.`;
    } else {
      heroDescription.innerHTML = ds.description;
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
    } else if (currentDatasetKey === 'boston_housing') {
      heroTagsContainer.innerHTML = `
        <span class="hero-pill"><i class="fa-solid fa-database"></i> Boston Housing Dataset (506 Samples • 80/20 Split)</span>
        <span class="hero-pill"><i class="fa-solid fa-rotate"></i> 5-Fold Cross Validation</span>
        <span class="hero-pill"><i class="fa-solid fa-layer-group"></i> 13 Predictors & 6 Selection Strategies</span>
        <span class="hero-pill"><i class="fa-solid fa-star" style="color: #34d399;"></i> Global Sweet Spot: k=${ds.sweet_spot_k} ($4.90k Test RMSE)</span>
        <span class="hero-pill"><i class="fa-solid fa-triangle-exclamation" style="color: #fbbf24;"></i> Full Model: k=13</span>
      `;
    } else {
      heroTagsContainer.innerHTML = `
        <span class="hero-pill"><i class="fa-solid fa-database"></i> Custom Dataset (${ds.metadata.n_samples_total} Samples • 80/20 Split)</span>
        <span class="hero-pill"><i class="fa-solid fa-rotate"></i> 5-Fold Cross Validation</span>
        <span class="hero-pill"><i class="fa-solid fa-layer-group"></i> ${ds.features.length} Features (k=1..${ds.k_labels.length})</span>
        <span class="hero-pill"><i class="fa-solid fa-star" style="color: #34d399;"></i> Optimal Sweet Spot: k=${ds.sweet_spot_k}</span>
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

  const kLabelEl = document.getElementById('kControlLabel');
  if (kLabelEl) {
    kLabelEl.innerHTML = `<i class="fa-solid fa-list-ol"></i> 2. Number of Features (k = 1 to ${ds.k_labels.length})`;
  }

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

  const rmseSub = document.getElementById('rmseChartSubtitle');
  const r2Sub = document.getElementById('r2ChartSubtitle');

  // Y-axis tick formatting callback & Subtitles
  if (currentDatasetKey === '50_startups') {
    rmseChartInstance.options.scales.y.title.text = 'RMSE ($) (Lower is Better)';
    rmseChartInstance.options.scales.y.ticks.callback = (val) => '$' + Number(val).toLocaleString();
    if (rmseSub) rmseSub.textContent = 'Lower is better. Sharp valley at k=2 (R&D Spend + Marketing Spend), rising error at k=5.';
    if (r2Sub) r2Sub.textContent = 'Higher is better. Peaks at k=2 (0.9168), dropping at k=5 (0.8987) due to noise.';
  } else if (currentDatasetKey === 'boston_housing') {
    rmseChartInstance.options.scales.y.title.text = 'RMSE ($1,000s) (Lower is Better)';
    rmseChartInstance.options.scales.y.ticks.callback = (val) => '$' + Number(val).toFixed(2) + 'k';
    if (rmseSub) rmseSub.textContent = 'Lower is better. Optimal parsimonious sweet spot at k=7, leveling off towards full model.';
    if (r2Sub) r2Sub.textContent = 'Higher is better. Rises sharply from k=1 to k=7, plateaus around 0.72-0.74.';
  } else {
    rmseChartInstance.options.scales.y.title.text = `RMSE (${ds.target_name}) (Lower is Better)`;
    rmseChartInstance.options.scales.y.ticks.callback = (val) => Math.abs(val) >= 1000 ? Number(val).toLocaleString() : Number(val).toFixed(2);
    if (rmseSub) rmseSub.textContent = `Lower is better. Out-of-sample prediction error across k features for ${ds.name}.`;
    if (r2Sub) r2Sub.textContent = `Higher is better. Out-of-sample R² goodness of fit across k features for ${ds.name}.`;
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
  if (labelEl) {
    labelEl.textContent = currentDatasetKey === '50_startups' 
      ? 'Predicted Startup Profit' 
      : (currentDatasetKey === 'boston_housing' ? 'Predicted Median Home Value' : `Predicted ${ds.target_name}`);
  }

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
  const ds = getCurrentDataset();

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
  } else if (currentDatasetKey === 'boston_housing') {
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
  } else if (ds) {
    const nTotal = ds.metadata ? ds.metadata.n_samples_total : 'N/A';
    const nTrain = ds.metadata ? ds.metadata.n_train : 'N/A';
    const nTest = ds.metadata ? ds.metadata.n_test : 'N/A';
    const sweetK = ds.sweet_spot_k || 1;
    tbody.innerHTML = `
      <tr>
        <td><strong>Dataset Partition</strong></td>
        <td>80% Train (${nTrain} rows) / 20% Test (${nTest} rows)</td>
        <td>Deterministic pseudo-random partition (seed 42) across ${nTotal} complete samples.</td>
      </tr>
      <tr>
        <td><strong>Cross Validation</strong></td>
        <td>5-Fold K-Fold CV</td>
        <td>Evaluated across training folds to measure out-of-fold generalization error.</td>
      </tr>
      <tr>
        <td><strong>Feature Selection Methods</strong></td>
        <td>6 ML Selection Strategies</td>
        <td>Evaluated across Pearson Correlation, F-test, RFECV, Exhaustive Search, LassoCV, and Baseline OLS.</td>
      </tr>
      <tr>
        <td><strong>Optimal Sweet Spot</strong></td>
        <td>k = ${sweetK} (${ds.target_name})</td>
        <td>Parsimonious model that minimizes out-of-sample prediction error.</td>
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

  // Format currency / number helper
  const fmtCurrency = (val) => {
    if (val === undefined || val === null || isNaN(val)) return 'N/A';
    if (isStartups) {
      return '$' + val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    } else if (currentDatasetKey === 'boston_housing') {
      return '$' + val.toFixed(2) + 'k';
    } else {
      return (Math.abs(val) >= 1000 ? val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : val.toFixed(4));
    }
  };

  // 1. Update KPI Cards
  const valRMSE = document.getElementById('valRMSE');
  const valR2 = document.getElementById('valR2');
  const valAdjR2 = document.getElementById('valAdjR2');
  const valMAE = document.getElementById('valMAE');
  const valFStat = document.getElementById('valFStat');
  const valCVRMSE = document.getElementById('valCVRMSE');
  const r2Note = document.getElementById('r2MetricNote');

  if (valRMSE) valRMSE.textContent = fmtCurrency(data.rmse);
  if (valR2) valR2.textContent = data.r2.toFixed(4);
  if (valAdjR2) valAdjR2.textContent = data.adj_r2 ? data.adj_r2.toFixed(4) : 'N/A';
  if (valMAE) valMAE.textContent = fmtCurrency(data.mae);
  if (valFStat) valFStat.textContent = data.f_stat ? data.f_stat.toFixed(1) : '366.0';
  if (valCVRMSE) valCVRMSE.textContent = fmtCurrency(data.cv_rmse);

  if (r2Note) {
    if (isStartups) {
      r2Note.textContent = `Explains ${(data.r2 * 100).toFixed(2)}% of profit variance`;
    } else if (currentDatasetKey === 'boston_housing') {
      r2Note.textContent = `Explains ${(data.r2 * 100).toFixed(2)}% of housing price variance`;
    } else {
      r2Note.textContent = `Explains ${(data.r2 * 100).toFixed(2)}% of ${ds.target_name} variance`;
    }
  }

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
    } else if (currentDatasetKey === 'boston_housing') {
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
    } else {
      if (currentK === ds.sweet_spot_k) {
        notice.className = 'badge-tag badge-green';
        notice.innerHTML = `<i class="fa-solid fa-star"></i> Optimal Sweet Spot: k=${ds.sweet_spot_k} features minimize out-of-sample RMSE (${fmtCurrency(data.rmse)}) with R² = ${data.r2.toFixed(4)}.`;
      } else if (currentK === ds.overfitting_k) {
        notice.className = 'badge-tag badge-amber';
        notice.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Full Model: k=${ds.overfitting_k} includes all candidate features.`;
      } else {
        notice.className = 'badge-tag badge-blue';
        notice.innerHTML = `<i class="fa-solid fa-circle-info"></i> Evaluated with ${currentK} predictors for ${currentAlgo}.`;
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
  const ds = getCurrentDataset();
  if (!box || !coefficients || !ds) return;

  const isStartups = (currentDatasetKey === '50_startups');
  const targetLabel = ds.target_name || (isStartups ? 'Profit' : 'MEDV');
  const intercept = coefficients.find(c => c.feature.includes('Intercept'));
  let parts = [];

  if (intercept) {
    let formattedIntercept;
    if (isStartups) {
      formattedIntercept = intercept.coef.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    } else if (currentDatasetKey === 'boston_housing') {
      formattedIntercept = intercept.coef.toFixed(4);
    } else {
      formattedIntercept = Math.abs(intercept.coef) >= 1000 
        ? intercept.coef.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) 
        : intercept.coef.toFixed(4);
    }
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
  const ds = getCurrentDataset();

  if (!tbody || !outliers || !ds) return;
  tbody.innerHTML = '';

  const isStartups = (currentDatasetKey === '50_startups');
  if (thActual) thActual.textContent = isStartups ? 'Actual Profit' : (currentDatasetKey === 'boston_housing' ? 'Actual MEDV ($1k)' : `Actual ${ds.target_name}`);
  if (thPredicted) thPredicted.textContent = isStartups ? 'Predicted Profit' : (currentDatasetKey === 'boston_housing' ? 'Predicted MEDV ($1k)' : `Predicted ${ds.target_name}`);
  if (thResidual) thResidual.textContent = isStartups ? 'Residual ($)' : (currentDatasetKey === 'boston_housing' ? 'Residual ($1k)' : 'Residual');
  if (residualsSubtitle) {
    residualsSubtitle.textContent = isStartups 
      ? 'Out-of-sample test set residuals (10 startups), ranked by absolute error.'
      : (currentDatasetKey === 'boston_housing'
        ? 'Out-of-sample test set residuals (102 Boston homes), ranked by absolute error.'
        : `Out-of-sample test set residuals (${ds.metadata ? ds.metadata.n_test : 'test'} samples), ranked by absolute error.`);
  }

  const fmtVal = (v) => {
    if (v === undefined || v === null || isNaN(v)) return 'N/A';
    if (isStartups) {
      return '$' + v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    } else if (currentDatasetKey === 'boston_housing') {
      return '$' + v.toFixed(2) + 'k';
    } else {
      return Math.abs(v) >= 1000 ? v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : v.toFixed(4);
    }
  };

  outliers.forEach(o => {
    const tr = document.createElement('tr');
    const isHigh = isStartups ? (o.abs_error > 10000) : (currentDatasetKey === 'boston_housing' ? (o.abs_error > 6.0) : (o.pct_error > 25.0));
    const statusBadge = isHigh 
      ? `<span class="badge-tag badge-amber"><span class="status-dot dot-amber"></span> High Residual</span>`
      : `<span class="badge-tag badge-green"><span class="status-dot dot-green"></span> Normal</span>`;

    const sampleName = isStartups ? `Startup #${o.index}` : (currentDatasetKey === 'boston_housing' ? `House #${o.index}` : `Sample #${o.index}`);

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
  } else if (currentDatasetKey === 'boston_housing') {
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
  } else {
    // Custom Dataset Calculation
    data.coefficients.forEach(c => {
      if (c.feature.includes('Intercept')) {
        pred += c.coef;
        const fmtInt = Math.abs(c.coef) >= 1000 ? c.coef.toLocaleString('en-US', { maximumFractionDigits: 2 }) : c.coef.toFixed(4);
        breakdown.push(`Intercept: ${fmtInt}`);
      } else {
        const safeId = `num${c.feature.replace(/[^a-zA-Z0-9]/g, '')}`;
        const inputEl = document.getElementById(safeId);
        if (inputEl) {
          const val = parseFloat(inputEl.value) || 0;
          const contribution = c.coef * val;
          pred += contribution;
          const fmtCont = Math.abs(contribution) >= 1000 ? contribution.toLocaleString('en-US', { maximumFractionDigits: 2 }) : contribution.toFixed(4);
          breakdown.push(`${c.feature}: ${contribution >= 0 ? '+' : ''}${fmtCont}`);
        }
      }
    });

    const outputEl = document.getElementById('predProfitOutput');
    const noteEl = document.getElementById('predFormulaNote');

    if (outputEl) {
      outputEl.textContent = Math.abs(pred) >= 1000 
        ? pred.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) 
        : pred.toFixed(4);
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
          color: '#4a5e45'
        },
        grid: { color: '#eef4ea' },
        ticks: { font: { family: 'Inter', size: 11 }, color: '#657b5f' }
      },
      y: {
        grid: { color: '#eef4ea' },
        ticks: { font: { family: 'Inter', size: 11 }, color: '#657b5f' }
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
            color: '#4a5e45'
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
            color: '#4a5e45'
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
    const ptRadius = algoData.map(item => item.k === currentK ? 9 : (item.k === sweetK ? 7 : 4.5));
    const ptBorderWidth = algoData.map(item => item.k === currentK ? 3.5 : 2);
    const ptBorderColor = algoData.map(item => item.k === currentK ? '#1e293b' : '#ffffff');
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
      pointBorderColor: ptBorderColor,
      pointBorderWidth: ptBorderWidth
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
      pointBorderColor: ptBorderColor,
      pointBorderWidth: ptBorderWidth
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

/* ==========================================================================
   Custom Dataset Pure Client-Side Regression Module
   Supports URL fetching (e.g. raw GitHub) and local CSV file upload
   ========================================================================== */

let parsedCustomCsv = null;

function initCustomDatasetHandlers() {
  const btnFetch = document.getElementById('btnFetchCsv');
  const fileInput = document.getElementById('customCsvFile');
  const btnRun = document.getElementById('btnRunCustomRegression');

  if (btnFetch) {
    btnFetch.addEventListener('click', async () => {
      const urlInput = document.getElementById('customCsvUrl');
      const url = urlInput ? urlInput.value.trim() : '';
      if (!url) {
        showCustomStatus('Please enter a valid public CSV URL.', 'error');
        return;
      }
      showCustomStatus('<i class="fa-solid fa-spinner fa-spin"></i> Fetching dataset from URL...', 'info');
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status} ${response.statusText}`);
        }
        const text = await response.text();
        handleCsvTextLoaded(text, url.split('/').pop() || 'Remote_Dataset.csv');
      } catch (err) {
        showCustomStatus(`Failed to fetch CSV: ${err.message}. If blocked by CORS, please use a raw GitHub URL or use the "Upload File" button.`, 'error');
      }
    });
  }

  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      showCustomStatus('<i class="fa-solid fa-spinner fa-spin"></i> Reading local file...', 'info');
      const reader = new FileReader();
      reader.onload = (event) => {
        handleCsvTextLoaded(event.target.result, file.name);
      };
      reader.onerror = () => {
        showCustomStatus('Failed to read local file.', 'error');
      };
      reader.readAsText(file);
    });
  }

  if (btnRun) {
    btnRun.addEventListener('click', () => {
      runCustomRegression();
    });
  }
}

function showCustomStatus(msg, type = 'info') {
  const box = document.getElementById('customStatusMsg');
  if (!box) return;
  box.className = `custom-status-msg ${type}`;
  box.innerHTML = msg;
  box.style.display = 'flex';
}

function handleCsvTextLoaded(csvText, filename) {
  try {
    const rawLines = parseCustomCSV(csvText);
    if (rawLines.length < 5) {
      throw new Error('CSV must contain a header and at least 4 data rows.');
    }

    const headers = rawLines[0].map((h, idx) => {
      const cleaned = (h || '').trim().replace(/^["']|["']$/g, '');
      return cleaned !== '' ? cleaned : (idx === 0 ? 'Index' : `Col_${idx + 1}`);
    });
    const dataRows = rawLines.slice(1);

    parsedCustomCsv = {
      filename: filename,
      headers: headers,
      rows: dataRows
    };

    renderCustomPreview(headers, dataRows, filename);
    showCustomStatus(`<i class="fa-solid fa-circle-check"></i> Loaded "${filename}" successfully (${dataRows.length} rows, ${headers.length} columns). Select a Target column and click "Run Regression Analysis".`, 'success');
  } catch (err) {
    showCustomStatus(`CSV parse error: ${err.message}`, 'error');
  }
}

// Universal numeric checking and parsing helpers
function isNumericString(val) {
  if (val === null || val === undefined) return false;
  const s = String(val).trim();
  if (s === '' || s === '?' || s.toLowerCase() === 'nan' || s.toLowerCase() === 'na' || s.toLowerCase() === 'null') return false;
  const cleaned = s.replace(/^[$\s]+/, '').replace(/,/g, '');
  return !isNaN(Number(cleaned)) && !isNaN(parseFloat(cleaned));
}

function parseNumericValue(val) {
  if (val === null || val === undefined) return NaN;
  const s = String(val).trim();
  if (s === '' || s === '?' || s.toLowerCase() === 'nan' || s.toLowerCase() === 'na' || s.toLowerCase() === 'null') return NaN;
  const cleaned = s.replace(/^[$\s]+/, '').replace(/,/g, '');
  return parseFloat(cleaned);
}

function isColumnNumeric(rows, colIdx) {
  let numCount = 0;
  let validCount = 0;
  const sampleLimit = Math.min(rows.length, 200);
  for (let r = 0; r < sampleLimit; r++) {
    const row = rows[r];
    if (!row || colIdx >= row.length) continue;
    const val = row[colIdx];
    if (val !== undefined && val !== null && String(val).trim() !== '') {
      validCount++;
      if (isNumericString(val)) {
        numCount++;
      }
    }
  }
  return validCount > 0 && (numCount / validCount) >= 0.7;
}

// RFC 4180 CSV parser
function parseCustomCSV(text) {
  let lines = [];
  let row = [''];
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    let c = text[i];
    let next = text[i + 1];
    if (c === '"') {
      if (inQuotes && next === '"') {
        row[row.length - 1] += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (c === ',' && !inQuotes) {
      row.push('');
    } else if ((c === '\r' || c === '\n') && !inQuotes) {
      if (c === '\r' && next === '\n') i++;
      if (row.length > 1 || row[0] !== '') lines.push(row);
      row = [''];
    } else {
      row[row.length - 1] += c;
    }
  }
  if (row.length > 1 || row[0] !== '') lines.push(row);
  return lines;
}

function renderCustomPreview(headers, rows, filename) {
  const configSection = document.getElementById('customConfigSection');
  const theadRow = document.getElementById('customPreviewHeader');
  const tbody = document.getElementById('customPreviewBody');
  const metaSpan = document.getElementById('customDataMeta');
  const targetSelect = document.getElementById('customTargetSelect');

  if (!configSection || !theadRow || !tbody || !targetSelect) return;

  configSection.style.display = 'block';

  // Find numeric candidate columns
  const numericCols = [];
  headers.forEach((h, colIdx) => {
    if (isColumnNumeric(rows, colIdx)) {
      numericCols.push(h);
    }
  });

  if (metaSpan) {
    metaSpan.innerHTML = `<i class="fa-solid fa-table"></i> ${filename} • ${rows.length} rows • ${headers.length} columns (${numericCols.length} numeric)`;
  }

  // Populate Target Select
  targetSelect.innerHTML = '';
  numericCols.forEach(col => {
    const opt = document.createElement('option');
    opt.value = col;
    opt.textContent = col;
    targetSelect.appendChild(opt);
  });
  // Default to the last numeric column (commonly Target, e.g. Profit / Sales / MEDV)
  if (numericCols.length > 0) {
    targetSelect.value = numericCols[numericCols.length - 1];
  }

  // Render Table Header
  theadRow.innerHTML = '';
  headers.forEach(h => {
    const th = document.createElement('th');
    th.textContent = h;
    theadRow.appendChild(th);
  });

  // Render Preview Rows (first 5 rows)
  tbody.innerHTML = '';
  const previewRows = rows.slice(0, 5);
  previewRows.forEach(r => {
    const tr = document.createElement('tr');
    headers.forEach((_, colIdx) => {
      const td = document.createElement('td');
      td.textContent = r[colIdx] !== undefined ? r[colIdx] : '';
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
}

// Pure JS Linear Regression & Statistical Inference Engine
function runCustomRegression() {
  if (!parsedCustomCsv) {
    showCustomStatus('Please fetch or upload a CSV dataset first.', 'error');
    return;
  }

  const targetSelect = document.getElementById('customTargetSelect');
  const targetName = targetSelect ? targetSelect.value : '';
  if (!targetName) {
    showCustomStatus('Please select a valid numerical Target column.', 'error');
    return;
  }

  const { headers, rows, filename } = parsedCustomCsv;
  const targetColIdx = headers.indexOf(targetName);

  // 1. Identify valid numerical and categorical features
  let candidateFeatures = [];

  headers.forEach((h, colIdx) => {
    if (colIdx === targetColIdx) return;
    
    if (isColumnNumeric(rows, colIdx)) {
      candidateFeatures.push({ name: h, type: 'numeric', origIdx: colIdx });
    } else {
      // Check cardinality for categorical one-hot encoding
      const uniqueVals = [...new Set(rows.map(r => (r[colIdx] !== undefined && r[colIdx] !== null) ? String(r[colIdx]).trim() : ''))]
        .filter(v => v !== '' && v !== '?' && v.toLowerCase() !== 'nan');
      if (uniqueVals.length > 1 && uniqueVals.length <= 8) {
        // Drop first dummy to avoid dummy trap
        uniqueVals.slice(1).forEach(uv => {
          candidateFeatures.push({
            name: `${h}_${uv}`,
            type: 'dummy',
            origIdx: colIdx,
            matchVal: uv
          });
        });
      }
    }
  });

  if (candidateFeatures.length === 0) {
    showCustomStatus('No suitable numerical or categorical predictor features found.', 'error');
    return;
  }

  // 2. Build feature matrix and target vector
  let rawX = [];
  let rawY = [];

  for (let r = 0; r < rows.length; r++) {
    const row = rows[r];
    const yVal = parseNumericValue(row[targetColIdx]);
    if (isNaN(yVal)) continue;

    let rowX = [];
    let validRow = true;
    for (let f = 0; f < candidateFeatures.length; f++) {
      const feat = candidateFeatures[f];
      if (feat.type === 'numeric') {
        const xVal = parseNumericValue(row[feat.origIdx]);
        if (isNaN(xVal)) { validRow = false; break; }
        rowX.push(xVal);
      } else {
        const cellVal = (row[feat.origIdx] !== undefined && row[feat.origIdx] !== null) ? String(row[feat.origIdx]).trim() : '';
        rowX.push(cellVal === feat.matchVal ? 1.0 : 0.0);
      }
    }

    if (validRow) {
      rawX.push(rowX);
      rawY.push(yVal);
    }
  }

  const nTotal = rawX.length;
  if (nTotal < 8) {
    showCustomStatus('Insufficient valid data rows (minimum 8 complete rows required).', 'error');
    return;
  }

  // 3. Train/Test Split (80/20 with reproducible shuffle)
  // Deterministic pseudo-random based on LCG
  let indices = Array.from({ length: nTotal }, (_, i) => i);
  let seed = 42;
  function lcgRandom() {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  }
  for (let i = nTotal - 1; i > 0; i--) {
    let j = Math.floor(lcgRandom() * (i + 1));
    let tmp = indices[i]; indices[i] = indices[j]; indices[j] = tmp;
  }

  const nTrain = Math.max(Math.floor(nTotal * 0.8), 5);
  const trainIndices = indices.slice(0, nTrain);
  const testIndices = indices.slice(nTrain);

  const X_train = trainIndices.map(i => rawX[i]);
  const y_train = trainIndices.map(i => rawY[i]);
  const X_test = testIndices.map(i => rawX[i]);
  const y_test = testIndices.map(i => rawY[i]);

  // 4. Feature Names
  const featureNames = candidateFeatures.map(f => f.name);

  // 5. Precompute 5-Fold Cross Validation indices on train set
  const folds = [];
  const nFolds = 5;
  const foldSize = Math.floor(nTrain / nFolds);
  for (let f = 0; f < nFolds; f++) {
    const valStart = f * foldSize;
    const valEnd = (f === nFolds - 1) ? nTrain : (f + 1) * foldSize;
    const valFoldIdx = trainIndices.slice(valStart, valEnd);
    const trFoldIdx = [...trainIndices.slice(0, valStart), ...trainIndices.slice(valEnd)];
    folds.push({
      trX: trFoldIdx.map(i => rawX[i]),
      trY: trFoldIdx.map(i => rawY[i]),
      valX: valFoldIdx.map(i => rawX[i]),
      valY: valFoldIdx.map(i => rawY[i])
    });
  }

  // 6. Compute Feature Rankings for All 6 Selection Algorithms
  const maxK = Math.min(candidateFeatures.length, 12);
  const rankings = getAlgoFeatureRankings(X_train, y_train, featureNames);

  // 7. Compute Independent Progressive Feature Models (k = 1 .. maxK) for Each Method
  const modelDataDict = {};
  const finalComparisonRecords = [];

  ALL_ALGO_KEYS.forEach(algoName => {
    const algoRanking = rankings[algoName] || featureNames;
    const statsList = computeModelProgression(algoRanking, featureNames, X_train, y_train, X_test, y_test, trainIndices, testIndices, folds, maxK);
    modelDataDict[algoName] = statsList;

    // Find best model for this specific method
    let algoBest = statsList[0];
    for (let i = 1; i < statsList.length; i++) {
      if (statsList[i].rmse < algoBest.rmse) {
        algoBest = statsList[i];
      }
    }

    finalComparisonRecords.push({
      "Method": algoName,
      "Optimal Number of Features": algoBest.k,
      "Selected Features": algoBest.features.join(', '),
      "MAE": algoBest.mae,
      "MSE": algoBest.mse,
      "RMSE": algoBest.rmse,
      "R²": algoBest.r2
    });
  });

  // Global Sweet Spot (Lowest Test RMSE across methods, defaulting to Pearson)
  let bestModel = modelDataDict['Pearson Correlation'][0];
  ALL_ALGO_KEYS.forEach(algo => {
    modelDataDict[algo].forEach(m => {
      if (m.rmse < bestModel.rmse) {
        bestModel = m;
      }
    });
  });

  const primaryRanking = rankings['Pearson Correlation'] || featureNames;

  // Build live predictor config using primary ranked features
  const predictorInputs = primaryRanking.slice(0, Math.min(primaryRanking.length, 8)).map(featName => {
    const colIdx = featureNames.indexOf(featName);
    const vals = rawX.map(r => r[colIdx]);
    const minVal = Math.min(...vals);
    const maxVal = Math.max(...vals);
    const meanVal = vals.reduce((a, b) => a + b, 0) / vals.length;
    const stepVal = (maxVal - minVal) > 10 ? 1 : Number(((maxVal - minVal) / 100).toFixed(2)) || 0.1;

    return {
      id: `num${featName.replace(/[^a-zA-Z0-9]/g, '')}`,
      sliderId: `range${featName.replace(/[^a-zA-Z0-9]/g, '')}`,
      labelId: `label${featName.replace(/[^a-zA-Z0-9]/g, '')}`,
      name: featName,
      feature: featName,
      min: Number(minVal.toFixed(2)),
      max: Number(maxVal.toFixed(2)),
      step: stepVal,
      default: Number(meanVal.toFixed(2)),
      prefix: ""
    };
  });

  // Construct Custom Dataset Object
  window.DATASETS['custom_dataset'] = {
    key: 'custom_dataset',
    name: `Custom (${filename})`,
    target_name: targetName,
    target_unit: "",
    description: `Custom dataset (${filename}) with ${nTotal} rows evaluated via Multiple Linear Regression across ${featureNames.length} candidate predictors. Global sweet spot at k = ${bestModel.k} (${bestModel.features.join(', ')}) with Test RMSE = ${bestModel.rmse.toFixed(4)}, R² = ${bestModel.r2.toFixed(4)}.`,
    badge_optimal: `k = ${bestModel.k} ★ Optimal Sweet Spot`,
    badge_overfitting: `k = ${maxK} ⚠ Full Model`,
    k_labels: Array.from({ length: maxK }, (_, i) => String(i + 1)),
    default_k: bestModel.k,
    sweet_spot_k: bestModel.k,
    overfitting_k: maxK,
    features: primaryRanking,
    predictor_features: predictorInputs,
    categorical: null,
    images: null,
    image_descriptions: null,
    model_data: modelDataDict,
    metadata: {
      n_samples_total: nTotal,
      n_train: nTrain,
      n_test: y_test.length,
      test_size: 0.2,
      cv_folds: 5,
      random_state: 42,
      all_features: featureNames,
      sweet_spot: {
        k: bestModel.k,
        method: "Multiple Linear Regression",
        features: bestModel.features,
        cv_rmse: bestModel.cv_rmse,
        test_rmse: bestModel.rmse,
        test_r2: bestModel.r2
      }
    },
    final_model_comparison: finalComparisonRecords
  };

  // Switch Active Dataset to Custom Dataset
  const datasetSelect = document.getElementById('datasetSelect');
  if (datasetSelect) datasetSelect.value = 'custom_dataset';
  switchDataset('custom_dataset');

  showCustomStatus(`<i class="fa-solid fa-circle-check"></i> Linear regression complete! Analyzed ${featureNames.length} features across ${nTotal} rows. Optimal model at k = ${bestModel.k} (Test RMSE: ${bestModel.rmse.toFixed(4)}, R²: ${bestModel.r2.toFixed(4)}).`, 'success');
}

// 6 Selection Methods Ranking Implementations
function getAlgoFeatureRankings(X_train, y_train, candidateFeatureNames) {
  const p = candidateFeatureNames.length;
  const n = X_train.length;
  const rankings = {};

  // 1. Pearson Correlation
  const pearsonScores = candidateFeatureNames.map((name, idx) => {
    const col = X_train.map(r => r[idx]);
    const r = calcPearsonCorr(col, y_train);
    return { name, absR: Math.abs(r) };
  });
  pearsonScores.sort((a, b) => b.absR - a.absR);
  rankings['Pearson Correlation'] = pearsonScores.map(p => p.name);

  // 2. F-test
  const fScores = candidateFeatureNames.map((name, idx) => {
    const col = X_train.map(r => r[idx]);
    const r = calcPearsonCorr(col, y_train);
    const r2 = Math.min(Math.max(r * r, 0), 0.9999);
    const fStat = (r2 / (1.0 - r2)) * Math.max(n - 2, 1);
    return { name, fStat };
  });
  fScores.sort((a, b) => b.fStat - a.fStat);
  rankings['F-test'] = fScores.map(f => f.name);

  // 3. Baseline OLS
  rankings['Baseline OLS'] = [...candidateFeatureNames];

  // 4. RFECV
  let currentIndices = candidateFeatureNames.map((_, i) => i);
  const eliminatedOrder = [];
  while (currentIndices.length > 1) {
    const X_sub = X_train.map(row => [1.0, ...currentIndices.map(idx => row[idx])]);
    const y_col = y_train.map(y => [y]);
    const ols = solveMatrixOLS(X_sub, y_col);
    if (!ols) {
      eliminatedOrder.push(currentIndices.pop());
      continue;
    }
    const beta = ols.beta.map(b => b[0]);
    let rss = 0;
    for (let i = 0; i < n; i++) {
      let pred = beta[0];
      for (let j = 0; j < currentIndices.length; j++) pred += beta[j + 1] * X_sub[i][j + 1];
      rss += Math.pow(y_train[i] - pred, 2);
    }
    const sigma2 = (n > beta.length) ? (rss / (n - beta.length)) : 1.0;
    let minT = Infinity;
    let minFeatPos = 0;
    for (let j = 0; j < currentIndices.length; j++) {
      const se = Math.sqrt(Math.max(ols.invXTX[j + 1][j + 1] * sigma2, 1e-12));
      const t = Math.abs(beta[j + 1] / se);
      if (t < minT) {
        minT = t;
        minFeatPos = j;
      }
    }
    eliminatedOrder.push(currentIndices[minFeatPos]);
    currentIndices.splice(minFeatPos, 1);
  }
  eliminatedOrder.push(currentIndices[0]);
  rankings['RFECV'] = eliminatedOrder.reverse().map(idx => candidateFeatureNames[idx]);

  // 5. Exhaustive Feature Selection
  const exhaustiveRanking = [];
  const remainingIndices = candidateFeatureNames.map((_, i) => i);
  while (remainingIndices.length > 0) {
    let bestR2 = -Infinity;
    let bestIdx = -1;
    for (let i = 0; i < remainingIndices.length; i++) {
      const trialIndices = [...exhaustiveRanking.map(fn => candidateFeatureNames.indexOf(fn)), remainingIndices[i]];
      const X_sub = X_train.map(row => [1.0, ...trialIndices.map(idx => row[idx])]);
      const y_col = y_train.map(y => [y]);
      const ols = solveMatrixOLS(X_sub, y_col);
      if (ols) {
        let rss = 0, tss = 0;
        const meanY = y_train.reduce((a, b) => a + b, 0) / n;
        for (let r = 0; r < n; r++) {
          let pred = ols.beta[0][0];
          for (let j = 0; j < trialIndices.length; j++) pred += ols.beta[j + 1][0] * X_sub[r][j + 1];
          rss += Math.pow(y_train[r] - pred, 2);
          tss += Math.pow(y_train[r] - meanY, 2);
        }
        const r2 = tss > 0 ? (1.0 - rss / tss) : 0.0;
        if (r2 > bestR2) {
          bestR2 = r2;
          bestIdx = i;
        }
      }
    }
    if (bestIdx >= 0) {
      exhaustiveRanking.push(candidateFeatureNames[remainingIndices[bestIdx]]);
      remainingIndices.splice(bestIdx, 1);
    } else {
      exhaustiveRanking.push(candidateFeatureNames[remainingIndices.pop()]);
    }
  }
  rankings['Exhaustive Feature Selection'] = exhaustiveRanking;

  // 6. LassoCV
  const meanX = candidateFeatureNames.map((_, j) => X_train.reduce((a, b) => a + b[j], 0) / n);
  const stdX = candidateFeatureNames.map((_, j) => {
    const s = Math.sqrt(X_train.reduce((a, b) => a + Math.pow(b[j] - meanX[j], 2), 0) / n);
    return s > 1e-12 ? s : 1.0;
  });
  const meanY = y_train.reduce((a, b) => a + b, 0) / n;
  const stdY = Math.sqrt(y_train.reduce((a, b) => a + Math.pow(b - meanY, 2), 0) / n) || 1.0;

  const X_norm = X_train.map(row => row.map((v, j) => (v - meanX[j]) / stdX[j]));
  const y_norm = y_train.map(v => (v - meanY) / stdY);

  let maxLambda = 0;
  for (let j = 0; j < p; j++) {
    const dot = Math.abs(X_norm.reduce((a, r, i) => a + r[j] * y_norm[i], 0)) / n;
    if (dot > maxLambda) maxLambda = dot;
  }

  const lassoOrder = [];
  const inLasso = new Set();
  const betaLasso = new Float64Array(p);

  for (let step = 0; step < 40; step++) {
    const lambda = maxLambda * Math.pow(0.01, step / 39);
    for (let it = 0; it < 25; it++) {
      for (let j = 0; j < p; j++) {
        let rho = 0;
        for (let i = 0; i < n; i++) {
          let pred = 0;
          for (let k = 0; k < p; k++) {
            if (k !== j) pred += betaLasso[k] * X_norm[i][k];
          }
          rho += X_norm[i][j] * (y_norm[i] - pred);
        }
        rho /= n;
        if (rho > lambda) betaLasso[j] = rho - lambda;
        else if (rho < -lambda) betaLasso[j] = rho + lambda;
        else betaLasso[j] = 0;

        if (Math.abs(betaLasso[j]) > 1e-4 && !inLasso.has(j)) {
          inLasso.add(j);
          lassoOrder.push(candidateFeatureNames[j]);
        }
      }
    }
  }
  for (let j = 0; j < p; j++) {
    if (!inLasso.has(j)) {
      lassoOrder.push(candidateFeatureNames[j]);
    }
  }
  rankings['LassoCV'] = lassoOrder;

  return rankings;
}

function computeModelProgression(featureRanking, allFeatureNames, X_train, y_train, X_test, y_test, trainIndices, testIndices, folds, maxK) {
  const modelStatsList = [];
  const nTrain = X_train.length;
  const nTest = y_test.length || 1;
  const nFolds = folds.length;

  for (let k = 1; k <= maxK; k++) {
    const activeFeatNames = featureRanking.slice(0, k);
    const activeIndices = activeFeatNames.map(fn => allFeatureNames.indexOf(fn));

    // OLS on Train Set with Intercept
    const X_tr_sub = X_train.map(row => [1.0, ...activeIndices.map(idx => row[idx])]);
    const y_tr_col = y_train.map(y => [y]);

    const ols = solveMatrixOLS(X_tr_sub, y_tr_col);
    if (!ols) continue;

    const beta = ols.beta.map(b => b[0]);
    const pParams = beta.length;
    const pFeats = k;

    // Train Metrics
    let rss_tr = 0.0;
    let mean_y_tr = y_train.reduce((a, b) => a + b, 0) / nTrain;
    let tss_tr = 0.0;
    for (let i = 0; i < nTrain; i++) {
      let pred_tr = beta[0];
      for (let j = 0; j < pFeats; j++) pred_tr += beta[j + 1] * X_tr_sub[i][j + 1];
      rss_tr += Math.pow(y_train[i] - pred_tr, 2);
      tss_tr += Math.pow(y_train[i] - mean_y_tr, 2);
    }
    const r2_tr = tss_tr > 0 ? (1.0 - rss_tr / tss_tr) : 0.0;
    const sigma2 = (nTrain > pParams) ? (rss_tr / (nTrain - pParams)) : 1.0;

    // Standard Errors & t-stats
    const se = [];
    const tstat = [];
    const pvalues = [];
    const ci_lower = [];
    const ci_upper = [];

    for (let j = 0; j < pParams; j++) {
      const var_b = Math.max(ols.invXTX[j][j] * sigma2, 1e-12);
      const s = Math.sqrt(var_b);
      const t = beta[j] / s;
      const p = approxTwoTailedPValue(t, Math.max(nTrain - pParams, 1));
      se.push(s);
      tstat.push(t);
      pvalues.push(p);
      ci_lower.push(beta[j] - 1.96 * s);
      ci_upper.push(beta[j] + 1.96 * s);
    }

    // F-statistic
    let f_stat = 0.0;
    if (pFeats > 0 && (1.0 - r2_tr) > 1e-10 && (nTrain - pParams) > 0) {
      f_stat = (r2_tr / pFeats) / ((1.0 - r2_tr) / (nTrain - pParams));
    }

    // VIF calculation
    const vifs = [null];
    if (pFeats === 1) {
      vifs.push(1.0);
    } else {
      for (let j = 0; j < pFeats; j++) {
        const y_vif = X_train.map(row => [row[activeIndices[j]]]);
        const otherIndices = activeIndices.filter((_, idx) => idx !== j);
        const X_vif = X_train.map(row => [1.0, ...otherIndices.map(idx => row[idx])]);
        const ols_vif = solveMatrixOLS(X_vif, y_vif);
        if (ols_vif) {
          let rss_v = 0, tss_v = 0;
          let m_v = y_vif.reduce((a, b) => a + b[0], 0) / y_vif.length;
          for (let r = 0; r < y_vif.length; r++) {
            let p_v = ols_vif.beta[0][0];
            for (let c = 0; c < otherIndices.length; c++) p_v += ols_vif.beta[c + 1][0] * X_vif[r][c + 1];
            rss_v += Math.pow(y_vif[r][0] - p_v, 2);
            tss_v += Math.pow(y_vif[r][0] - m_v, 2);
          }
          const r2_v = tss_v > 0 ? (1.0 - rss_v / tss_v) : 0.0;
          vifs.push(r2_v < 0.999 ? 1.0 / (1.0 - r2_v) : 999.0);
        } else {
          vifs.push(1.0);
        }
      }
    }

    // Test Evaluation
    let test_sq_err = 0.0;
    let test_abs_err = 0.0;
    let mean_y_te = y_test.reduce((a, b) => a + b, 0) / nTest;
    let tss_te = 0.0;
    const outliers = [];

    for (let i = 0; i < y_test.length; i++) {
      let pred_te = beta[0];
      for (let j = 0; j < pFeats; j++) pred_te += beta[j + 1] * X_test[i][activeIndices[j]];
      const err = y_test[i] - pred_te;
      const absErr = Math.abs(err);
      test_sq_err += Math.pow(err, 2);
      test_abs_err += absErr;
      tss_te += Math.pow(y_test[i] - mean_y_te, 2);

      outliers.push({
        index: testIndices[i] + 1,
        actual: y_test[i],
        predicted: pred_te,
        residual: err,
        abs_error: absErr,
        pct_error: (absErr / (Math.abs(y_test[i]) || 1e-4)) * 100.0
      });
    }

    const test_mse = test_sq_err / nTest;
    const test_rmse = Math.sqrt(test_mse);
    const test_mae = test_abs_err / nTest;
    const test_r2 = tss_te > 0 ? (1.0 - test_sq_err / tss_te) : 0.0;
    const test_adj_r2 = (nTest > pFeats + 1) ? (1.0 - (1.0 - test_r2) * (nTest - 1) / (nTest - pFeats - 1)) : test_r2;

    outliers.sort((a, b) => b.abs_error - a.abs_error);
    const topOutliers = outliers.slice(0, 10);
    topOutliers.forEach((o, rIdx) => { o.rank = rIdx + 1; });

    // 5-Fold Cross Validation Evaluation
    let cv_mse_sum = 0.0;
    for (let f = 0; f < nFolds; f++) {
      const fold = folds[f];
      const fold_X_tr = fold.trX.map(row => [1.0, ...activeIndices.map(idx => row[idx])]);
      const fold_y_tr = fold.trY.map(y => [y]);
      const fold_ols = solveMatrixOLS(fold_X_tr, fold_y_tr);
      if (fold_ols) {
        let f_sq_err = 0.0;
        for (let i = 0; i < fold.valY.length; i++) {
          let pred_f = fold_ols.beta[0][0];
          for (let j = 0; j < pFeats; j++) pred_f += fold_ols.beta[j + 1][0] * fold.valX[i][activeIndices[j]];
          f_sq_err += Math.pow(fold.valY[i] - pred_f, 2);
        }
        cv_mse_sum += (f_sq_err / (fold.valY.length || 1));
      }
    }
    const cv_rmse = Math.sqrt(cv_mse_sum / nFolds);

    // Build Coefficients List
    const coefList = [{
      feature: "Intercept (β₀)",
      coef: beta[0],
      stderr: se[0],
      tstat: tstat[0],
      pvalue: pvalues[0],
      ci_lower: ci_lower[0],
      ci_upper: ci_upper[0],
      vif: null
    }];

    for (let j = 0; j < pFeats; j++) {
      coefList.push({
        feature: activeFeatNames[j],
        coef: beta[j + 1],
        stderr: se[j + 1],
        tstat: tstat[j + 1],
        pvalue: pvalues[j + 1],
        ci_lower: ci_lower[j + 1],
        ci_upper: ci_upper[j + 1],
        vif: vifs[j + 1]
      });
    }

    modelStatsList.push({
      k: k,
      features: activeFeatNames,
      rmse: test_rmse,
      mae: test_mae,
      mse: test_mse,
      r2: test_r2,
      adj_r2: test_adj_r2,
      cv_rmse: cv_rmse,
      cv_r2: 0.0,
      f_stat: f_stat,
      f_pvalue: 0.0,
      coefficients: coefList,
      outliers: topOutliers
    });
  }

  return modelStatsList;
}

// Matrix operations for OLS
function solveMatrixOLS(X, y) {
  const m = X.length;
  const n = X[0].length;
  // XT
  const XT = Array.from({ length: n }, () => new Float64Array(m));
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) XT[j][i] = X[i][j];
  }
  // XTX = XT * X
  const XTX = Array.from({ length: n }, () => new Float64Array(n));
  for (let i = 0; i < n; i++) {
    for (let k = 0; k < m; k++) {
      const a = XT[i][k];
      for (let j = 0; j < n; j++) XTX[i][j] += a * X[k][j];
    }
  }
  // Invert XTX with Gauss-Jordan
  const invXTX = invertMatrixGauss(XTX);
  if (!invXTX) return null;

  // XTy = XT * y
  const XTy = Array.from({ length: n }, () => new Float64Array(1));
  for (let i = 0; i < n; i++) {
    for (let k = 0; k < m; k++) {
      XTy[i][0] += XT[i][k] * y[k][0];
    }
  }
  // beta = invXTX * XTy
  const beta = Array.from({ length: n }, () => new Float64Array(1));
  for (let i = 0; i < n; i++) {
    for (let k = 0; k < n; k++) {
      beta[i][0] += invXTX[i][k] * XTy[k][0];
    }
  }
  return { beta, invXTX };
}

function invertMatrixGauss(A) {
  const n = A.length;
  const M = Array.from({ length: n }, (v, i) => {
    const row = new Float64Array(2 * n);
    for (let j = 0; j < n; j++) row[j] = A[i][j];
    row[n + i] = 1.0;
    return row;
  });

  // Tikhonov stabilization
  for (let i = 0; i < n; i++) M[i][i] += 1e-8;

  for (let i = 0; i < n; i++) {
    let maxRow = i;
    for (let k = i + 1; k < n; k++) {
      if (Math.abs(M[k][i]) > Math.abs(M[maxRow][i])) maxRow = k;
    }
    const temp = M[i]; M[i] = M[maxRow]; M[maxRow] = temp;

    let pivot = M[i][i];
    if (Math.abs(pivot) < 1e-12) pivot = 1e-12;
    for (let j = 0; j < 2 * n; j++) M[i][j] /= pivot;

    for (let k = 0; k < n; k++) {
      if (k !== i) {
        const factor = M[k][i];
        for (let j = 0; j < 2 * n; j++) {
          M[k][j] -= factor * M[i][j];
        }
      }
    }
  }

  const inv = Array.from({ length: n }, () => new Float64Array(n));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      inv[i][j] = M[i][n + j];
    }
  }
  return inv;
}

function calcPearsonCorr(x, y) {
  const n = x.length;
  if (n === 0) return 0;
  const meanX = x.reduce((a, b) => a + b, 0) / n;
  const meanY = y.reduce((a, b) => a + b, 0) / n;
  let num = 0, denX = 0, denY = 0;
  for (let i = 0; i < n; i++) {
    const dx = x[i] - meanX;
    const dy = y[i] - meanY;
    num += dx * dy;
    denX += dx * dx;
    denY += dy * dy;
  }
  const den = Math.sqrt(denX * denY);
  return den > 1e-12 ? (num / den) : 0;
}

function approxTwoTailedPValue(t, df) {
  // Gaussian / Student approximation for large/moderate df
  const x = Math.abs(t);
  const z = x / Math.sqrt(1 + x * x / (2 * df));
  // Standard normal cdf approximation (Abramowitz & Stegun)
  const b1 = 0.319381530;
  const b2 = -0.356563782;
  const b3 = 1.781477937;
  const b4 = -1.821255978;
  const b5 = 1.330274429;
  const p_const = 0.2316419;
  const t_norm = 1.0 / (1.0 + p_const * z);
  const phi = (1.0 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * z * z);
  const oneTail = phi * (b1 * t_norm + b2 * Math.pow(t_norm, 2) + b3 * Math.pow(t_norm, 3) + b4 * Math.pow(t_norm, 4) + b5 * Math.pow(t_norm, 5));
  return Math.min(Math.max(2.0 * oneTail, 0.0), 1.0);
}

