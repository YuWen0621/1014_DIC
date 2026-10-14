/* ==========================================================================
   50 Startups: Multiple Linear Regression & Feature Selection Explorer
   Interactive Application Logic (Vanilla JavaScript + Chart.js)
   ========================================================================== */

// State management
let currentAlgo = 'Pearson Correlation';
let currentK = 2; // Default to the optimal sweet spot
let rmseChartInstance = null;
let r2ChartInstance = null;

const ALGO_COLORS = {
  'Pearson Correlation': '#4f46e5',
  'F-test': '#EF4444',
  'RFECV': '#059669',
  'Exhaustive Feature Selection': '#8b5cf6',
  'LassoCV': '#d97706',
  'Baseline OLS': '#3b82f6'
};

// Distinct dash patterns — key to separating perfectly overlapping curves
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

// Must come AFTER ALL_ALGO_KEYS is defined
let activeMethodsFilter = new Set(ALL_ALGO_KEYS);

// Initialize application on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initCharts();
  setupEventListeners();
  updateDashboard();
});

function setupEventListeners() {
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

  // Feature count (k) selector buttons
  const kBtns = document.querySelectorAll('#kSelectorGroup .k-btn');
  kBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      kBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentK = parseInt(btn.dataset.k, 10);
      updateDashboard();
    });
  });

  // Interactive Live Calculator Inputs (Synchronize sliders & numeric inputs)
  const syncInput = (sliderId, numId, labelId, prefix = '$') => {
    const slider = document.getElementById(sliderId);
    const num = document.getElementById(numId);
    const label = document.getElementById(labelId);

    if (!slider || !num) return;

    slider.addEventListener('input', (e) => {
      num.value = e.target.value;
      if (label) label.textContent = prefix + Number(e.target.value).toLocaleString();
      calculateLivePrediction();
    });

    num.addEventListener('input', (e) => {
      slider.value = e.target.value;
      if (label) label.textContent = prefix + Number(e.target.value).toLocaleString();
      calculateLivePrediction();
    });
  };

  syncInput('rangeRD', 'numRD', 'labelRD');
  syncInput('rangeMkt', 'numMkt', 'labelMkt');
  syncInput('rangeAdmin', 'numAdmin', 'labelAdmin');
  
  const stateSelect = document.getElementById('selectState');
  if (stateSelect) {
    stateSelect.addEventListener('change', calculateLivePrediction);
  }

  // Build method-filter chips (shown only in Compare-All mode)
  initMethodFilterChips();
}

function getActiveModelData() {
  if (!window.MODEL_DATA) return null;
  const algo = currentAlgo === 'ALL' ? 'Pearson Correlation' : currentAlgo;
  const models = window.MODEL_DATA[algo];
  if (!models || models.length === 0) return null;
  const idx = Math.min(Math.max(currentK - 1, 0), models.length - 1);
  return models[idx];
}

function updateDashboard() {
  const data = getActiveModelData();
  if (!data) return;

  // 1. Update KPI Cards
  const valRMSE = document.getElementById('valRMSE');
  const valR2 = document.getElementById('valR2');
  const valAdjR2 = document.getElementById('valAdjR2');
  const valMAE = document.getElementById('valMAE');
  const valFStat = document.getElementById('valFStat');
  const valCVRMSE = document.getElementById('valCVRMSE');

  if (valRMSE) valRMSE.textContent = '$' + data.rmse.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (valR2) valR2.textContent = data.r2.toFixed(4);
  if (valAdjR2) valAdjR2.textContent = data.adj_r2 ? data.adj_r2.toFixed(4) : 'N/A';
  if (valMAE) valMAE.textContent = '$' + data.mae.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (valFStat) valFStat.textContent = data.f_stat ? data.f_stat.toFixed(1) : '366.0';
  if (valCVRMSE) valCVRMSE.textContent = '$' + data.cv_rmse.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  // 2. Sweet spot & Overfitting badges
  const rmseBadge = document.getElementById('rmseBadge');
  if (rmseBadge) {
    if (currentK === 2) {
      rmseBadge.className = 'badge-tag badge-green';
      rmseBadge.innerHTML = '<i class="fa-solid fa-award"></i> Optimal Sweet Spot';
    } else if (currentK === 5) {
      rmseBadge.className = 'badge-tag badge-amber';
      rmseBadge.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Overfitting Cliff';
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
    if (currentK === 2) {
      notice.className = 'badge-tag badge-green';
      notice.innerHTML = '<i class="fa-solid fa-star"></i> Occam\'s Razor: 2 features (R&D Spend + Marketing Spend) produce the lowest CV RMSE ($9,682.56) and test RMSE ($8,206.33).';
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
  }

  // 5. Update Equation Box
  updateEquation(data.coefficients);

  // 6. Update Coefficients Table
  updateCoefficientsTable(data.coefficients);

  // 7. Update Outliers / Residuals Table
  updateOutliersTable(data.outliers);

  // 8. Show/hide method-filter panel and update charts
  updateMethodFilterVisibility();
  updateCharts();

  // 9. Recalculate Live Prediction
  calculateLivePrediction();
}

function updateEquation(coefficients) {
  const box = document.getElementById('equationBox');
  if (!box || !coefficients) return;

  const intercept = coefficients.find(c => c.feature.includes('Intercept'));
  let parts = [];

  if (intercept) {
    parts.push(`<span class="eq-intercept">${intercept.coef.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>`);
  }

  coefficients.forEach(c => {
    if (c.feature.includes('Intercept')) return;
    const sign = c.coef >= 0 ? '<span class="eq-pos">+</span>' : '<span class="eq-neg">-</span>';
    const absVal = Math.abs(c.coef).toFixed(4);
    parts.push(`${sign} ${absVal} × <span class="eq-var">(${c.feature})</span>`);
  });

  box.innerHTML = `<strong>Profit</strong> = ${parts.join(' ')}`;
}

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

function updateOutliersTable(outliers) {
  const tbody = document.getElementById('outliersTableBody');
  if (!tbody || !outliers) return;
  tbody.innerHTML = '';

  outliers.forEach(o => {
    const tr = document.createElement('tr');
    const isHigh = o.abs_error > 10000;
    const statusBadge = isHigh 
      ? `<span class="badge-tag badge-amber"><span class="status-dot dot-amber"></span> High Residual</span>`
      : `<span class="badge-tag badge-green"><span class="status-dot dot-green"></span> Normal</span>`;

    tr.innerHTML = `
      <td style="font-weight: 700;">#${o.rank}</td>
      <td>Startup #${o.index}</td>
      <td style="font-family: 'Fira Code', monospace;">$${o.actual.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
      <td style="font-family: 'Fira Code', monospace;">$${o.predicted.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
      <td style="color: ${o.residual >= 0 ? '#059669' : '#dc2626'}; font-weight: 600; font-family: 'Fira Code', monospace;">${o.residual >= 0 ? '+' : ''}$${o.residual.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
      <td style="font-family: 'Fira Code', monospace;">$${o.abs_error.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
      <td style="font-family: 'Fira Code', monospace; font-weight: 600;">${o.pct_error.toFixed(2)}%</td>
      <td>${statusBadge}</td>
    `;
    tbody.appendChild(tr);
  });
}

function calculateLivePrediction() {
  const data = getActiveModelData();
  if (!data) return;

  const numRD = document.getElementById('numRD');
  const numMkt = document.getElementById('numMkt');
  const numAdmin = document.getElementById('numAdmin');
  const selectState = document.getElementById('selectState');

  const rd = numRD ? parseFloat(numRD.value) || 0 : 0;
  const mkt = numMkt ? parseFloat(numMkt.value) || 0 : 0;
  const admin = numAdmin ? parseFloat(numAdmin.value) || 0 : 0;
  const state = selectState ? selectState.value : 'California';

  let pred = 0;
  let breakdown = [];

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
        enabled: false
      }
    },
    // 'index' mode: hover anywhere → tooltip shows ALL visible datasets at that x
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
        const index = elements[0].index; // same for all datasets at that x
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

  const isCompareAll = currentAlgo === 'ALL';
  const badgeRMSE = document.getElementById('rmseChartBadge');
  const badgeR2 = document.getElementById('r2ChartBadge');

  if (badgeRMSE) badgeRMSE.textContent = isCompareAll ? 'Comparing All 6 Methods' : currentAlgo;
  if (badgeR2) badgeR2.textContent = isCompareAll ? 'Comparing All 6 Methods' : `Active k = ${currentK}`;

  let datasetsRMSE = [];
  let datasetsR2 = [];

  // In Compare-All mode only show methods the user has toggled on
  const algosToRender = isCompareAll
    ? ALL_ALGO_KEYS.filter(a => activeMethodsFilter.has(a))
    : [currentAlgo];

  algosToRender.forEach((algo) => {
    const algoData = window.MODEL_DATA[algo];
    if (!algoData) return;

    const rmsePoints = algoData.map(item => item.rmse);
    const r2Points = algoData.map(item => item.r2);
    const color = ALGO_COLORS[algo] || '#4f46e5';

    // In Compare-All mode use dash + point style to separate overlapping curves.
    // Many methods share identical values at k=1 and k=2 (all select R&D Spend),
    // so visual separation relies entirely on dash pattern + point shape.
    const dash      = isCompareAll ? (ALGO_DASH[algo] || [])        : [];
    const ptStyle   = isCompareAll ? (ALGO_POINT_STYLE[algo] || 'circle') : 'circle';
    const bWidth    = isCompareAll ? 2.2 : 2.8;
    const ptRadius  = algoData.map(item => item.k === currentK ? 8 : (item.k === 2 ? 7 : 5));
    const ptColors  = algoData.map(item => item.k === 2 ? '#10b981' : color);

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

/* -----------------------------------------------------------------------
   Method Filter Chips (Compare-All mode only)
   ----------------------------------------------------------------------- */
function initMethodFilterChips() {
  const container = document.getElementById('methodFilterChips');
  if (!container) return;
  container.innerHTML = '';

  ALL_ALGO_KEYS.forEach(algo => {
    const color = ALGO_COLORS[algo] || '#4f46e5';
    const chip  = document.createElement('button');
    chip.dataset.algo = algo;
    chip.setAttribute('data-filter-chip', '');
    chip.title = algo;
    setChipActive(chip, color, true);
    chip.innerHTML =
      `<span style="display:inline-block;width:9px;height:9px;border-radius:50%;` +
      `background:${color};flex-shrink:0"></span>${algo}`;

    chip.addEventListener('click', () => {
      const isOn = activeMethodsFilter.has(algo);
      if (isOn && activeMethodsFilter.size === 1) return; // keep at least one
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

  // "All" button
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

  // "None" button — keeps the first method on so the chart always has data
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
