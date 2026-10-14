// Unified Multiple Linear Regression & Feature Selection Datasets Repository
// Contains complete precomputed data for 50 Startups and Boston Housing
window.DATASETS = {
  "50_startups": {
    "key": "50_startups",
    "name": "50 Startups",
    "target_name": "Profit",
    "target_unit": "$",
    "description": "50 Startups dataset evaluating R&D, Administration, and Marketing expenditures across California, Florida, and New York. Global sweet spot at k=2 (R&D + Marketing).",
    "badge_optimal": "k = 2 \u2605 Optimal Sweet Spot",
    "badge_overfitting": "k = 5 \u26a0 Overfitting Cliff",
    "k_labels": [
      "1",
      "2",
      "3",
      "4",
      "5"
    ],
    "default_k": 2,
    "sweet_spot_k": 2,
    "overfitting_k": 5,
    "features": [
      "R&D Spend",
      "Administration",
      "Marketing Spend",
      "State_Florida",
      "State_New York"
    ],
    "predictor_features": [
      {
        "id": "numRD",
        "sliderId": "rangeRD",
        "labelId": "labelRD",
        "name": "R&D Spend ($)",
        "feature": "R&D Spend",
        "min": 0,
        "max": 250000,
        "step": 5000,
        "default": 100000,
        "prefix": "$"
      },
      {
        "id": "numMkt",
        "sliderId": "rangeMkt",
        "labelId": "labelMkt",
        "name": "Marketing Spend ($)",
        "feature": "Marketing Spend",
        "min": 0,
        "max": 500000,
        "step": 5000,
        "default": 150000,
        "prefix": "$"
      },
      {
        "id": "numAdmin",
        "sliderId": "rangeAdmin",
        "labelId": "labelAdmin",
        "name": "Administration ($)",
        "feature": "Administration",
        "min": 0,
        "max": 250000,
        "step": 5000,
        "default": 120000,
        "prefix": "$"
      }
    ],
    "categorical": {
      "name": "State Location",
      "options": [
        {
          "label": "California (Reference Level, Dummies = 0)",
          "value": "California",
          "features": []
        },
        {
          "label": "Florida",
          "value": "Florida",
          "features": [
            "State_Florida"
          ]
        },
        {
          "label": "New York",
          "value": "New York",
          "features": [
            "State_New York"
          ]
        }
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
      "comparison": "Dual-bar visualization contrasting Test RMSE ($) (indigo) and Test R\u00b2 (emerald). Pearson Correlation and F-test tie for the lowest test error ($8,206.33), outperforming the full Baseline OLS ($9,055.96) by over $849 per startup."
    },
    "model_data": {
      "Pearson Correlation": [
        {
          "k": 1,
          "features": [
            "R&D Spend"
          ],
          "rmse": 7714.33489083019,
          "mae": 6077.363300620408,
          "mse": 59510962.80788003,
          "r2": 0.926510810934195,
          "adj_r2": 0.9173246623009693,
          "cv_rmse": 9943.871028684298,
          "cv_r2": 0.93837368355318,
          "f_stat": 676.1034669260162,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 49336.66803799112,
              "stderr": 2985.818740249927,
              "tstat": 16.52366480688021,
              "pvalue": 0.0,
              "ci_lower": 43292.19400573018,
              "ci_upper": 55381.142070252055,
              "vif": null
            },
            {
              "feature": "R&D Spend",
              "coef": 0.8536091075148804,
              "stderr": 0.03282860728228894,
              "tstat": 26.001989672446545,
              "pvalue": 0.0,
              "ci_lower": 0.7871510665232567,
              "ci_upper": 0.9200671485065041,
              "vif": 1.0
            }
          ],
          "outliers": [
            {
              "index": 45,
              "actual": 64926.08,
              "predicted": 50190.47347560073,
              "residual": 14735.60652439927,
              "abs_error": 14735.60652439927,
              "pct_error": 22.695974444166765,
              "rank": 1
            },
            {
              "index": 48,
              "actual": 35673.41,
              "predicted": 49799.36685471956,
              "residual": -14125.95685471956,
              "abs_error": 14125.95685471956,
              "pct_error": 39.597999896055796,
              "rank": 2
            },
            {
              "index": 26,
              "actual": 105733.54,
              "predicted": 113638.07752879556,
              "residual": -7904.5375287955685,
              "abs_error": 7904.5375287955685,
              "pct_error": 7.47590360522836,
              "rank": 3
            },
            {
              "index": 13,
              "actual": 134307.35,
              "predicted": 127862.20996405193,
              "residual": 6445.140035948076,
              "abs_error": 6445.140035948076,
              "pct_error": 4.798799198962734,
              "rank": 4
            },
            {
              "index": 32,
              "actual": 97427.84,
              "predicted": 103463.04843112713,
              "residual": -6035.208431127132,
              "abs_error": 6035.208431127132,
              "pct_error": 6.194541961647854,
              "rank": 5
            },
            {
              "index": 17,
              "actual": 125370.37,
              "predicted": 130136.88190548436,
              "residual": -4766.511905484367,
              "abs_error": 4766.511905484367,
              "pct_error": 3.8019445148677216,
              "rank": 6
            },
            {
              "index": 25,
              "actual": 107404.34,
              "predicted": 104535.05342879967,
              "residual": 2869.286571200326,
              "abs_error": 2869.286571200326,
              "pct_error": 2.671481032517239,
              "rank": 7
            },
            {
              "index": 30,
              "actual": 99937.59,
              "predicted": 102255.72078164022,
              "residual": -2318.130781640226,
              "abs_error": 2318.130781640226,
              "pct_error": 2.319578430538725,
              "rank": 8
            },
            {
              "index": 39,
              "actual": 81005.76,
              "predicted": 82250.56334619471,
              "residual": -1244.8033461947198,
              "abs_error": 1244.8033461947198,
              "pct_error": 1.536684979185085,
              "rank": 9
            },
            {
              "index": 19,
              "actual": 122776.86,
              "predicted": 123105.31102669484,
              "residual": -328.4510266948346,
              "abs_error": 328.4510266948346,
              "pct_error": 0.26751867305845306,
              "rank": 10
            }
          ]
        },
        {
          "k": 2,
          "features": [
            "R&D Spend",
            "Marketing Spend"
          ],
          "rmse": 8206.328813165856,
          "mae": 6469.1817214685925,
          "mse": 67343832.58979611,
          "r2": 0.9168381183550247,
          "adj_r2": 0.8930775807421746,
          "cv_rmse": 9682.556146428222,
          "cv_r2": 0.9415997343689557,
          "f_stat": 365.9781290116033,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 45542.392477514295,
              "stderr": 3457.2769574739023,
              "tstat": 13.172908343099694,
              "pvalue": 1.5543122344752192e-15,
              "ci_lower": 38537.28396367646,
              "ci_upper": 52547.50099135213,
              "vif": null
            },
            {
              "feature": "R&D Spend",
              "coef": 0.7833743148902914,
              "stderr": 0.04753512334490658,
              "tstat": 16.47990495798788,
              "pvalue": 0.0,
              "ci_lower": 0.6870590062396826,
              "ci_upper": 0.8796896235409002,
              "vif": 2.2576926919130162
            },
            {
              "feature": "Marketing Spend",
              "coef": 0.03923978714553167,
              "stderr": 0.01982183326614713,
              "tstat": 1.9796245190169994,
              "pvalue": 0.05522150412415483,
              "ci_lower": -0.0009230620217553151,
              "ci_upper": 0.07940263631281866,
              "vif": 2.2576926919130162
            }
          ],
          "outliers": [
            {
              "index": 45,
              "actual": 64926.08,
              "predicted": 46400.656776437005,
              "residual": 18525.423223562997,
              "abs_error": 18525.423223562997,
              "pct_error": 28.533099832244602,
              "rank": 1
            },
            {
              "index": 48,
              "actual": 35673.41,
              "predicted": 45967.020524900574,
              "residual": -10293.61052490057,
              "abs_error": 10293.61052490057,
              "pct_error": 28.855134748543996,
              "rank": 2
            },
            {
              "index": 19,
              "actual": 122776.86,
              "predicted": 113241.36575803881,
              "residual": 9535.49424196119,
              "abs_error": 9535.49424196119,
              "pct_error": 7.766523954075052,
              "rank": 3
            },
            {
              "index": 13,
              "actual": 134307.35,
              "predicted": 127521.38604122544,
              "residual": 6785.963958774562,
              "abs_error": 6785.963958774562,
              "pct_error": 5.0525633621499955,
              "rank": 4
            },
            {
              "index": 25,
              "actual": 107404.34,
              "predicted": 101612.68921418353,
              "residual": 5791.65078581647,
              "abs_error": 5791.65078581647,
              "pct_error": 5.392380592643155,
              "rank": 5
            },
            {
              "index": 17,
              "actual": 125370.37,
              "predicted": 130782.53611917047,
              "residual": -5412.166119170477,
              "abs_error": 5412.166119170477,
              "pct_error": 4.316941968960032,
              "rank": 6
            },
            {
              "index": 26,
              "actual": 105733.54,
              "predicted": 109813.19061886772,
              "residual": -4079.6506188677304,
              "abs_error": 4079.6506188677304,
              "pct_error": 3.8584262088148478,
              "rank": 7
            },
            {
              "index": 30,
              "actual": 99937.59,
              "predicted": 97683.24623440253,
              "residual": 2254.3437655974703,
              "abs_error": 2254.3437655974703,
              "pct_error": 2.2557515801586474,
              "rank": 8
            },
            {
              "index": 39,
              "actual": 81005.76,
              "predicted": 82615.07411457178,
              "residual": -1609.3141145717818,
              "abs_error": 1609.3141145717818,
              "pct_error": 1.9866662748078432,
              "rank": 9
            },
            {
              "index": 32,
              "actual": 97427.84,
              "predicted": 97023.64013853732,
              "residual": 404.1998614626791,
              "abs_error": 404.1998614626791,
              "pct_error": 0.41487100757101786,
              "rank": 10
            }
          ]
        },
        {
          "k": 3,
          "features": [
            "R&D Spend",
            "Marketing Spend",
            "State_New York"
          ],
          "rmse": 8242.782649482138,
          "mae": 6430.578356772721,
          "mse": 67943465.80660377,
          "r2": 0.9160976403529736,
          "adj_r2": 0.8741464605294604,
          "cv_rmse": 9957.52846409359,
          "cv_r2": 0.9386952383562994,
          "f_stat": 237.56097025076727,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 45671.89297469167,
              "stderr": 3600.114726233649,
              "tstat": 12.68623264750023,
              "pvalue": 7.549516567451064e-15,
              "ci_lower": 38370.52189557583,
              "ci_upper": 52973.26405380751,
              "vif": null
            },
            {
              "feature": "R&D Spend",
              "coef": 0.7841298340179023,
              "stderr": 0.04841558906628422,
              "tstat": 16.195813149032958,
              "pvalue": 0.0,
              "ci_lower": 0.6859384682786366,
              "ci_upper": 0.8823211997571679,
              "vif": 2.280354157748023
            },
            {
              "feature": "Marketing Spend",
              "coef": 0.039145209097632416,
              "stderr": 0.02009749911281954,
              "tstat": 1.9477651860008276,
              "pvalue": 0.059273969151788064,
              "ci_lower": -0.001614408287786813,
              "ci_upper": 0.07990482648305164,
              "vif": 2.259734991150614
            },
            {
              "feature": "State_New York",
              "coef": -510.45738989726954,
              "stderr": 3260.934684351133,
              "tstat": -0.15653714020918555,
              "pvalue": 0.876484226842654,
              "ci_lower": -7123.93946081888,
              "ci_upper": 6103.024681024342,
              "vif": 1.0145485637497746
            }
          ],
          "outliers": [
            {
              "index": 45,
              "actual": 64926.08,
              "predicted": 46020.275506631384,
              "residual": 18905.804493368618,
              "abs_error": 18905.804493368618,
              "pct_error": 29.11896805315925,
              "rank": 1
            },
            {
              "index": 48,
              "actual": 35673.41,
              "predicted": 45586.473161323804,
              "residual": -9913.0631613238,
              "abs_error": 9913.0631613238,
              "pct_error": 27.788381209768843,
              "rank": 2
            },
            {
              "index": 19,
              "actual": 122776.86,
              "predicted": 112925.7006016713,
              "residual": 9851.159398328702,
              "abs_error": 9851.159398328702,
              "pct_error": 8.023628718252528,
              "rank": 3
            },
            {
              "index": 13,
              "actual": 134307.35,
              "predicted": 127696.49199279046,
              "residual": 6610.85800720955,
              "abs_error": 6610.85800720955,
              "pct_error": 4.9221863190730435,
              "rank": 4
            },
            {
              "index": 25,
              "actual": 107404.34,
              "predicted": 101777.99690136466,
              "residual": 5626.343098635334,
              "abs_error": 5626.343098635334,
              "pct_error": 5.238469040110795,
              "rank": 5
            },
            {
              "index": 17,
              "actual": 125370.37,
              "predicted": 130446.36919476962,
              "residual": -5075.999194769625,
              "abs_error": 5075.999194769625,
              "pct_error": 4.048802914731468,
              "rank": 6
            },
            {
              "index": 26,
              "actual": 105733.54,
              "predicted": 109986.92532425007,
              "residual": -4253.385324250077,
              "abs_error": 4253.385324250077,
              "pct_error": 4.022739921741084,
              "rank": 7
            },
            {
              "index": 30,
              "actual": 99937.59,
              "predicted": 97850.96573224435,
              "residual": 2086.624267755644,
              "abs_error": 2086.624267755644,
              "pct_error": 2.0879273432105414,
              "rank": 8
            },
            {
              "index": 39,
              "actual": 81005.76,
              "predicted": 82757.1552114086,
              "residual": -1751.3952114085987,
              "abs_error": 1751.3952114085987,
              "pct_error": 2.1620625637097888,
              "rank": 9
            },
            {
              "index": 32,
              "actual": 97427.84,
              "predicted": 97196.68858932273,
              "residual": 231.15141067726654,
              "abs_error": 231.15141067726654,
              "pct_error": 0.23725396219116276,
              "rank": 10
            }
          ]
        },
        {
          "k": 4,
          "features": [
            "R&D Spend",
            "Marketing Spend",
            "State_New York",
            "State_Florida"
          ],
          "rmse": 8254.686589379773,
          "mae": 6454.510107266863,
          "mse": 68139850.68888628,
          "r2": 0.915855127628212,
          "adj_r2": 0.8485392297307816,
          "cv_rmse": 10147.991193700167,
          "cv_r2": 0.9363685209524929,
          "f_stat": 173.37239144669914,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 45476.726283377655,
              "stderr": 3825.296931912897,
              "tstat": 11.888417315786343,
              "pvalue": 7.638334409421077e-14,
              "ci_lower": 37710.96065398957,
              "ci_upper": 53242.49191276574,
              "vif": null
            },
            {
              "feature": "R&D Spend",
              "coef": 0.7847451770125881,
              "stderr": 0.04921479444631877,
              "tstat": 15.945310466927824,
              "pvalue": 0.0,
              "ci_lower": 0.6848338326199054,
              "ci_upper": 0.8846565214052707,
              "vif": 2.292707374813337
            },
            {
              "feature": "Marketing Spend",
              "coef": 0.0382996642340262,
              "stderr": 0.020970140962916734,
              "tstat": 1.8263904044209678,
              "pvalue": 0.07633141029962887,
              "ci_lower": -0.004271985191318342,
              "ci_upper": 0.08087131365937074,
              "vif": 2.393875662475561
            },
            {
              "feature": "State_New York",
              "coef": -159.40852909993365,
              "stderr": 3895.620339818114,
              "tstat": -0.040919934489143876,
              "pvalue": 0.9675922662192178,
              "ci_lower": -8067.938266417982,
              "ci_upper": 7749.121208218115,
              "vif": 1.4088582685778517
            },
            {
              "feature": "State_Florida",
              "coef": 664.5882100113133,
              "stderr": 3901.636178439085,
              "tstat": 0.1703357718702498,
              "pvalue": 0.8657269223882245,
              "ci_lower": -7256.154328986243,
              "ci_upper": 8585.33074900887,
              "vif": 1.4655541253122102
            }
          ],
          "outliers": [
            {
              "index": 45,
              "actual": 64926.08,
              "predicted": 46175.16330240611,
              "residual": 18750.916697593893,
              "abs_error": 18750.916697593893,
              "pct_error": 28.880407838566402,
              "rank": 1
            },
            {
              "index": 48,
              "actual": 35673.41,
              "predicted": 45742.6888774774,
              "residual": -10069.278877477394,
              "abs_error": 10069.278877477394,
              "pct_error": 28.226286406254385,
              "rank": 2
            },
            {
              "index": 19,
              "actual": 122776.86,
              "predicted": 113134.76052815246,
              "residual": 9642.099471847541,
              "abs_error": 9642.099471847541,
              "pct_error": 7.853352392175156,
              "rank": 3
            },
            {
              "index": 13,
              "actual": 134307.35,
              "predicted": 127344.29264045242,
              "residual": 6963.057359547587,
              "abs_error": 6963.057359547587,
              "pct_error": 5.1844201821773614,
              "rank": 4
            },
            {
              "index": 25,
              "actual": 107404.34,
              "predicted": 101505.96760164187,
              "residual": 5898.372398358129,
              "abs_error": 5898.372398358129,
              "pct_error": 5.491744931683514,
              "rank": 5
            },
            {
              "index": 17,
              "actual": 125370.37,
              "predicted": 130421.56872814822,
              "residual": -5051.198728148229,
              "abs_error": 5051.198728148229,
              "pct_error": 4.0290211540001275,
              "rank": 6
            },
            {
              "index": 26,
              "actual": 105733.54,
              "predicted": 110389.3545872449,
              "residual": -4655.8145872449095,
              "abs_error": 4655.8145872449095,
              "pct_error": 4.403346929692234,
              "rank": 7
            },
            {
              "index": 30,
              "actual": 99937.59,
              "predicted": 98281.47956802277,
              "residual": 1656.1104319772276,
              "abs_error": 1656.1104319772276,
              "pct_error": 1.6571446559570107,
              "rank": 8
            },
            {
              "index": 39,
              "actual": 81005.76,
              "predicted": 82437.74546985893,
              "residual": -1431.9854698589334,
              "abs_error": 1431.9854698589334,
              "pct_error": 1.7677575889158172,
              "rank": 9
            },
            {
              "index": 32,
              "actual": 97427.84,
              "predicted": 97001.57294938521,
              "residual": 426.26705061478424,
              "abs_error": 426.26705061478424,
              "pct_error": 0.4375207852445299,
              "rank": 10
            }
          ]
        },
        {
          "k": 5,
          "features": [
            "R&D Spend",
            "Marketing Spend",
            "State_New York",
            "State_Florida",
            "Administration"
          ],
          "rmse": 9055.957323204324,
          "mae": 6961.477813004763,
          "mse": 82010363.03969802,
          "r2": 0.8987266414385479,
          "adj_r2": 0.7721349432367327,
          "cv_rmse": 9991.808176840408,
          "cv_r2": 0.9340039511035675,
          "f_stat": 140.07459350755786,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 54028.03959405877,
              "stderr": 8457.293252904412,
              "tstat": 6.388337022073157,
              "pvalue": 2.7088901877192484e-07,
              "ci_lower": 36840.751817154,
              "ci_upper": 71215.32737096354,
              "vif": null
            },
            {
              "feature": "R&D Spend",
              "coef": 0.8056300637569407,
              "stderr": 0.05237124875768663,
              "tstat": 15.383060035181932,
              "pvalue": 0.0,
              "ci_lower": 0.6991988810230196,
              "ci_upper": 0.9120612464908617,
              "vif": 2.6171974116238235
            },
            {
              "feature": "Marketing Spend",
              "coef": 0.029855442910386443,
              "stderr": 0.022176901348608606,
              "tstat": 1.3462405067811511,
              "pvalue": 0.18713248438625651,
              "ci_lower": -0.015213443089004096,
              "ci_upper": 0.07492432890977699,
              "vif": 2.698944569752321
            },
            {
              "feature": "State_New York",
              "coef": 6.987759966986744,
              "stderr": 3882.7648769979496,
              "tstat": 0.0017996866120797645,
              "pvalue": 0.9985745767960617,
              "ci_lower": -7883.739842283781,
              "ci_upper": 7897.715362217756,
              "vif": 1.4108784071978522
            },
            {
              "feature": "State_Florida",
              "coef": 938.7930061484359,
              "stderr": 3893.5108846071817,
              "tstat": 0.241117344723476,
              "pvalue": 0.8109123470733581,
              "ci_lower": -6973.773111063281,
              "ci_upper": 8851.359123360153,
              "vif": 1.4712431557724688
            },
            {
              "feature": "Administration",
              "coef": -0.06878788228413268,
              "stderr": 0.060737258811491245,
              "tstat": -1.1325483505541132,
              "pvalue": 0.26532799225056714,
              "ci_lower": -0.19222084301479497,
              "ci_upper": 0.05464507844652959,
              "vif": 1.1565116160578504
            }
          ],
          "outliers": [
            {
              "index": 45,
              "actual": 64926.08,
              "predicted": 46357.46068538052,
              "residual": 18568.61931461948,
              "abs_error": 18568.61931461948,
              "pct_error": 28.59963101825873,
              "rank": 1
            },
            {
              "index": 48,
              "actual": 35673.41,
              "predicted": 50912.41741887499,
              "residual": -15239.007418874986,
              "abs_error": 15239.007418874986,
              "pct_error": 42.71811250697644,
              "rank": 2
            },
            {
              "index": 19,
              "actual": 122776.86,
              "predicted": 113097.42524724804,
              "residual": 9679.434752751957,
              "abs_error": 9679.434752751957,
              "pct_error": 7.883761445562263,
              "rank": 3
            },
            {
              "index": 13,
              "actual": 134307.35,
              "predicted": 126362.8790827436,
              "residual": 7944.4709172564035,
              "abs_error": 7944.4709172564035,
              "pct_error": 5.915142333801093,
              "rank": 4
            },
            {
              "index": 25,
              "actual": 107404.34,
              "predicted": 100643.24281690145,
              "residual": 6761.097183098551,
              "abs_error": 6761.097183098551,
              "pct_error": 6.2949943951041005,
              "rank": 5
            },
            {
              "index": 26,
              "actual": 105733.54,
              "predicted": 109741.3503279157,
              "residual": -4007.8103279157076,
              "abs_error": 4007.8103279157076,
              "pct_error": 3.7904815519424657,
              "rank": 6
            },
            {
              "index": 39,
              "actual": 81005.76,
              "predicted": 84608.45383562769,
              "residual": -3602.693835627695,
              "abs_error": 3602.693835627695,
              "pct_error": 4.447453904052867,
              "rank": 7
            },
            {
              "index": 17,
              "actual": 125370.37,
              "predicted": 128750.4828849167,
              "residual": -3380.1128849167,
              "abs_error": 3380.1128849167,
              "pct_error": 2.696101865948629,
              "rank": 8
            },
            {
              "index": 30,
              "actual": 99937.59,
              "predicted": 99677.4942525319,
              "residual": 260.09574746809085,
              "abs_error": 260.09574746809085,
              "pct_error": 0.2602581745948555,
              "rank": 9
            },
            {
              "index": 32,
              "actual": 97427.84,
              "predicted": 97599.27574751806,
              "residual": -171.43574751805863,
              "abs_error": 171.43574751805863,
              "pct_error": 0.1759617656699139,
              "rank": 10
            }
          ]
        }
      ],
      "F-test": [
        {
          "k": 1,
          "features": [
            "R&D Spend"
          ],
          "rmse": 7714.33489083019,
          "mae": 6077.363300620408,
          "mse": 59510962.80788003,
          "r2": 0.926510810934195,
          "adj_r2": 0.9173246623009693,
          "cv_rmse": 9943.871028684298,
          "cv_r2": 0.93837368355318,
          "f_stat": 676.1034669260162,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 49336.66803799112,
              "stderr": 2985.818740249927,
              "tstat": 16.52366480688021,
              "pvalue": 0.0,
              "ci_lower": 43292.19400573018,
              "ci_upper": 55381.142070252055,
              "vif": null
            },
            {
              "feature": "R&D Spend",
              "coef": 0.8536091075148804,
              "stderr": 0.03282860728228894,
              "tstat": 26.001989672446545,
              "pvalue": 0.0,
              "ci_lower": 0.7871510665232567,
              "ci_upper": 0.9200671485065041,
              "vif": 1.0
            }
          ],
          "outliers": [
            {
              "index": 45,
              "actual": 64926.08,
              "predicted": 50190.47347560073,
              "residual": 14735.60652439927,
              "abs_error": 14735.60652439927,
              "pct_error": 22.695974444166765,
              "rank": 1
            },
            {
              "index": 48,
              "actual": 35673.41,
              "predicted": 49799.36685471956,
              "residual": -14125.95685471956,
              "abs_error": 14125.95685471956,
              "pct_error": 39.597999896055796,
              "rank": 2
            },
            {
              "index": 26,
              "actual": 105733.54,
              "predicted": 113638.07752879556,
              "residual": -7904.5375287955685,
              "abs_error": 7904.5375287955685,
              "pct_error": 7.47590360522836,
              "rank": 3
            },
            {
              "index": 13,
              "actual": 134307.35,
              "predicted": 127862.20996405193,
              "residual": 6445.140035948076,
              "abs_error": 6445.140035948076,
              "pct_error": 4.798799198962734,
              "rank": 4
            },
            {
              "index": 32,
              "actual": 97427.84,
              "predicted": 103463.04843112713,
              "residual": -6035.208431127132,
              "abs_error": 6035.208431127132,
              "pct_error": 6.194541961647854,
              "rank": 5
            },
            {
              "index": 17,
              "actual": 125370.37,
              "predicted": 130136.88190548436,
              "residual": -4766.511905484367,
              "abs_error": 4766.511905484367,
              "pct_error": 3.8019445148677216,
              "rank": 6
            },
            {
              "index": 25,
              "actual": 107404.34,
              "predicted": 104535.05342879967,
              "residual": 2869.286571200326,
              "abs_error": 2869.286571200326,
              "pct_error": 2.671481032517239,
              "rank": 7
            },
            {
              "index": 30,
              "actual": 99937.59,
              "predicted": 102255.72078164022,
              "residual": -2318.130781640226,
              "abs_error": 2318.130781640226,
              "pct_error": 2.319578430538725,
              "rank": 8
            },
            {
              "index": 39,
              "actual": 81005.76,
              "predicted": 82250.56334619471,
              "residual": -1244.8033461947198,
              "abs_error": 1244.8033461947198,
              "pct_error": 1.536684979185085,
              "rank": 9
            },
            {
              "index": 19,
              "actual": 122776.86,
              "predicted": 123105.31102669484,
              "residual": -328.4510266948346,
              "abs_error": 328.4510266948346,
              "pct_error": 0.26751867305845306,
              "rank": 10
            }
          ]
        },
        {
          "k": 2,
          "features": [
            "R&D Spend",
            "Marketing Spend"
          ],
          "rmse": 8206.328813165856,
          "mae": 6469.1817214685925,
          "mse": 67343832.58979611,
          "r2": 0.9168381183550247,
          "adj_r2": 0.8930775807421746,
          "cv_rmse": 9682.556146428222,
          "cv_r2": 0.9415997343689557,
          "f_stat": 365.9781290116033,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 45542.392477514295,
              "stderr": 3457.2769574739023,
              "tstat": 13.172908343099694,
              "pvalue": 1.5543122344752192e-15,
              "ci_lower": 38537.28396367646,
              "ci_upper": 52547.50099135213,
              "vif": null
            },
            {
              "feature": "R&D Spend",
              "coef": 0.7833743148902914,
              "stderr": 0.04753512334490658,
              "tstat": 16.47990495798788,
              "pvalue": 0.0,
              "ci_lower": 0.6870590062396826,
              "ci_upper": 0.8796896235409002,
              "vif": 2.2576926919130162
            },
            {
              "feature": "Marketing Spend",
              "coef": 0.03923978714553167,
              "stderr": 0.01982183326614713,
              "tstat": 1.9796245190169994,
              "pvalue": 0.05522150412415483,
              "ci_lower": -0.0009230620217553151,
              "ci_upper": 0.07940263631281866,
              "vif": 2.2576926919130162
            }
          ],
          "outliers": [
            {
              "index": 45,
              "actual": 64926.08,
              "predicted": 46400.656776437005,
              "residual": 18525.423223562997,
              "abs_error": 18525.423223562997,
              "pct_error": 28.533099832244602,
              "rank": 1
            },
            {
              "index": 48,
              "actual": 35673.41,
              "predicted": 45967.020524900574,
              "residual": -10293.61052490057,
              "abs_error": 10293.61052490057,
              "pct_error": 28.855134748543996,
              "rank": 2
            },
            {
              "index": 19,
              "actual": 122776.86,
              "predicted": 113241.36575803881,
              "residual": 9535.49424196119,
              "abs_error": 9535.49424196119,
              "pct_error": 7.766523954075052,
              "rank": 3
            },
            {
              "index": 13,
              "actual": 134307.35,
              "predicted": 127521.38604122544,
              "residual": 6785.963958774562,
              "abs_error": 6785.963958774562,
              "pct_error": 5.0525633621499955,
              "rank": 4
            },
            {
              "index": 25,
              "actual": 107404.34,
              "predicted": 101612.68921418353,
              "residual": 5791.65078581647,
              "abs_error": 5791.65078581647,
              "pct_error": 5.392380592643155,
              "rank": 5
            },
            {
              "index": 17,
              "actual": 125370.37,
              "predicted": 130782.53611917047,
              "residual": -5412.166119170477,
              "abs_error": 5412.166119170477,
              "pct_error": 4.316941968960032,
              "rank": 6
            },
            {
              "index": 26,
              "actual": 105733.54,
              "predicted": 109813.19061886772,
              "residual": -4079.6506188677304,
              "abs_error": 4079.6506188677304,
              "pct_error": 3.8584262088148478,
              "rank": 7
            },
            {
              "index": 30,
              "actual": 99937.59,
              "predicted": 97683.24623440253,
              "residual": 2254.3437655974703,
              "abs_error": 2254.3437655974703,
              "pct_error": 2.2557515801586474,
              "rank": 8
            },
            {
              "index": 39,
              "actual": 81005.76,
              "predicted": 82615.07411457178,
              "residual": -1609.3141145717818,
              "abs_error": 1609.3141145717818,
              "pct_error": 1.9866662748078432,
              "rank": 9
            },
            {
              "index": 32,
              "actual": 97427.84,
              "predicted": 97023.64013853732,
              "residual": 404.1998614626791,
              "abs_error": 404.1998614626791,
              "pct_error": 0.41487100757101786,
              "rank": 10
            }
          ]
        },
        {
          "k": 3,
          "features": [
            "R&D Spend",
            "Marketing Spend",
            "State_New York"
          ],
          "rmse": 8242.782649482138,
          "mae": 6430.578356772721,
          "mse": 67943465.80660377,
          "r2": 0.9160976403529736,
          "adj_r2": 0.8741464605294604,
          "cv_rmse": 9957.52846409359,
          "cv_r2": 0.9386952383562994,
          "f_stat": 237.56097025076727,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 45671.89297469167,
              "stderr": 3600.114726233649,
              "tstat": 12.68623264750023,
              "pvalue": 7.549516567451064e-15,
              "ci_lower": 38370.52189557583,
              "ci_upper": 52973.26405380751,
              "vif": null
            },
            {
              "feature": "R&D Spend",
              "coef": 0.7841298340179023,
              "stderr": 0.04841558906628422,
              "tstat": 16.195813149032958,
              "pvalue": 0.0,
              "ci_lower": 0.6859384682786366,
              "ci_upper": 0.8823211997571679,
              "vif": 2.280354157748023
            },
            {
              "feature": "Marketing Spend",
              "coef": 0.039145209097632416,
              "stderr": 0.02009749911281954,
              "tstat": 1.9477651860008276,
              "pvalue": 0.059273969151788064,
              "ci_lower": -0.001614408287786813,
              "ci_upper": 0.07990482648305164,
              "vif": 2.259734991150614
            },
            {
              "feature": "State_New York",
              "coef": -510.45738989726954,
              "stderr": 3260.934684351133,
              "tstat": -0.15653714020918555,
              "pvalue": 0.876484226842654,
              "ci_lower": -7123.93946081888,
              "ci_upper": 6103.024681024342,
              "vif": 1.0145485637497746
            }
          ],
          "outliers": [
            {
              "index": 45,
              "actual": 64926.08,
              "predicted": 46020.275506631384,
              "residual": 18905.804493368618,
              "abs_error": 18905.804493368618,
              "pct_error": 29.11896805315925,
              "rank": 1
            },
            {
              "index": 48,
              "actual": 35673.41,
              "predicted": 45586.473161323804,
              "residual": -9913.0631613238,
              "abs_error": 9913.0631613238,
              "pct_error": 27.788381209768843,
              "rank": 2
            },
            {
              "index": 19,
              "actual": 122776.86,
              "predicted": 112925.7006016713,
              "residual": 9851.159398328702,
              "abs_error": 9851.159398328702,
              "pct_error": 8.023628718252528,
              "rank": 3
            },
            {
              "index": 13,
              "actual": 134307.35,
              "predicted": 127696.49199279046,
              "residual": 6610.85800720955,
              "abs_error": 6610.85800720955,
              "pct_error": 4.9221863190730435,
              "rank": 4
            },
            {
              "index": 25,
              "actual": 107404.34,
              "predicted": 101777.99690136466,
              "residual": 5626.343098635334,
              "abs_error": 5626.343098635334,
              "pct_error": 5.238469040110795,
              "rank": 5
            },
            {
              "index": 17,
              "actual": 125370.37,
              "predicted": 130446.36919476962,
              "residual": -5075.999194769625,
              "abs_error": 5075.999194769625,
              "pct_error": 4.048802914731468,
              "rank": 6
            },
            {
              "index": 26,
              "actual": 105733.54,
              "predicted": 109986.92532425007,
              "residual": -4253.385324250077,
              "abs_error": 4253.385324250077,
              "pct_error": 4.022739921741084,
              "rank": 7
            },
            {
              "index": 30,
              "actual": 99937.59,
              "predicted": 97850.96573224435,
              "residual": 2086.624267755644,
              "abs_error": 2086.624267755644,
              "pct_error": 2.0879273432105414,
              "rank": 8
            },
            {
              "index": 39,
              "actual": 81005.76,
              "predicted": 82757.1552114086,
              "residual": -1751.3952114085987,
              "abs_error": 1751.3952114085987,
              "pct_error": 2.1620625637097888,
              "rank": 9
            },
            {
              "index": 32,
              "actual": 97427.84,
              "predicted": 97196.68858932273,
              "residual": 231.15141067726654,
              "abs_error": 231.15141067726654,
              "pct_error": 0.23725396219116276,
              "rank": 10
            }
          ]
        },
        {
          "k": 4,
          "features": [
            "R&D Spend",
            "Marketing Spend",
            "State_New York",
            "State_Florida"
          ],
          "rmse": 8254.686589379773,
          "mae": 6454.510107266863,
          "mse": 68139850.68888628,
          "r2": 0.915855127628212,
          "adj_r2": 0.8485392297307816,
          "cv_rmse": 10147.991193700167,
          "cv_r2": 0.9363685209524929,
          "f_stat": 173.37239144669914,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 45476.726283377655,
              "stderr": 3825.296931912897,
              "tstat": 11.888417315786343,
              "pvalue": 7.638334409421077e-14,
              "ci_lower": 37710.96065398957,
              "ci_upper": 53242.49191276574,
              "vif": null
            },
            {
              "feature": "R&D Spend",
              "coef": 0.7847451770125881,
              "stderr": 0.04921479444631877,
              "tstat": 15.945310466927824,
              "pvalue": 0.0,
              "ci_lower": 0.6848338326199054,
              "ci_upper": 0.8846565214052707,
              "vif": 2.292707374813337
            },
            {
              "feature": "Marketing Spend",
              "coef": 0.0382996642340262,
              "stderr": 0.020970140962916734,
              "tstat": 1.8263904044209678,
              "pvalue": 0.07633141029962887,
              "ci_lower": -0.004271985191318342,
              "ci_upper": 0.08087131365937074,
              "vif": 2.393875662475561
            },
            {
              "feature": "State_New York",
              "coef": -159.40852909993365,
              "stderr": 3895.620339818114,
              "tstat": -0.040919934489143876,
              "pvalue": 0.9675922662192178,
              "ci_lower": -8067.938266417982,
              "ci_upper": 7749.121208218115,
              "vif": 1.4088582685778517
            },
            {
              "feature": "State_Florida",
              "coef": 664.5882100113133,
              "stderr": 3901.636178439085,
              "tstat": 0.1703357718702498,
              "pvalue": 0.8657269223882245,
              "ci_lower": -7256.154328986243,
              "ci_upper": 8585.33074900887,
              "vif": 1.4655541253122102
            }
          ],
          "outliers": [
            {
              "index": 45,
              "actual": 64926.08,
              "predicted": 46175.16330240611,
              "residual": 18750.916697593893,
              "abs_error": 18750.916697593893,
              "pct_error": 28.880407838566402,
              "rank": 1
            },
            {
              "index": 48,
              "actual": 35673.41,
              "predicted": 45742.6888774774,
              "residual": -10069.278877477394,
              "abs_error": 10069.278877477394,
              "pct_error": 28.226286406254385,
              "rank": 2
            },
            {
              "index": 19,
              "actual": 122776.86,
              "predicted": 113134.76052815246,
              "residual": 9642.099471847541,
              "abs_error": 9642.099471847541,
              "pct_error": 7.853352392175156,
              "rank": 3
            },
            {
              "index": 13,
              "actual": 134307.35,
              "predicted": 127344.29264045242,
              "residual": 6963.057359547587,
              "abs_error": 6963.057359547587,
              "pct_error": 5.1844201821773614,
              "rank": 4
            },
            {
              "index": 25,
              "actual": 107404.34,
              "predicted": 101505.96760164187,
              "residual": 5898.372398358129,
              "abs_error": 5898.372398358129,
              "pct_error": 5.491744931683514,
              "rank": 5
            },
            {
              "index": 17,
              "actual": 125370.37,
              "predicted": 130421.56872814822,
              "residual": -5051.198728148229,
              "abs_error": 5051.198728148229,
              "pct_error": 4.0290211540001275,
              "rank": 6
            },
            {
              "index": 26,
              "actual": 105733.54,
              "predicted": 110389.3545872449,
              "residual": -4655.8145872449095,
              "abs_error": 4655.8145872449095,
              "pct_error": 4.403346929692234,
              "rank": 7
            },
            {
              "index": 30,
              "actual": 99937.59,
              "predicted": 98281.47956802277,
              "residual": 1656.1104319772276,
              "abs_error": 1656.1104319772276,
              "pct_error": 1.6571446559570107,
              "rank": 8
            },
            {
              "index": 39,
              "actual": 81005.76,
              "predicted": 82437.74546985893,
              "residual": -1431.9854698589334,
              "abs_error": 1431.9854698589334,
              "pct_error": 1.7677575889158172,
              "rank": 9
            },
            {
              "index": 32,
              "actual": 97427.84,
              "predicted": 97001.57294938521,
              "residual": 426.26705061478424,
              "abs_error": 426.26705061478424,
              "pct_error": 0.4375207852445299,
              "rank": 10
            }
          ]
        },
        {
          "k": 5,
          "features": [
            "R&D Spend",
            "Marketing Spend",
            "State_New York",
            "State_Florida",
            "Administration"
          ],
          "rmse": 9055.957323204324,
          "mae": 6961.477813004763,
          "mse": 82010363.03969802,
          "r2": 0.8987266414385479,
          "adj_r2": 0.7721349432367327,
          "cv_rmse": 9991.808176840408,
          "cv_r2": 0.9340039511035675,
          "f_stat": 140.07459350755786,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 54028.03959405877,
              "stderr": 8457.293252904412,
              "tstat": 6.388337022073157,
              "pvalue": 2.7088901877192484e-07,
              "ci_lower": 36840.751817154,
              "ci_upper": 71215.32737096354,
              "vif": null
            },
            {
              "feature": "R&D Spend",
              "coef": 0.8056300637569407,
              "stderr": 0.05237124875768663,
              "tstat": 15.383060035181932,
              "pvalue": 0.0,
              "ci_lower": 0.6991988810230196,
              "ci_upper": 0.9120612464908617,
              "vif": 2.6171974116238235
            },
            {
              "feature": "Marketing Spend",
              "coef": 0.029855442910386443,
              "stderr": 0.022176901348608606,
              "tstat": 1.3462405067811511,
              "pvalue": 0.18713248438625651,
              "ci_lower": -0.015213443089004096,
              "ci_upper": 0.07492432890977699,
              "vif": 2.698944569752321
            },
            {
              "feature": "State_New York",
              "coef": 6.987759966986744,
              "stderr": 3882.7648769979496,
              "tstat": 0.0017996866120797645,
              "pvalue": 0.9985745767960617,
              "ci_lower": -7883.739842283781,
              "ci_upper": 7897.715362217756,
              "vif": 1.4108784071978522
            },
            {
              "feature": "State_Florida",
              "coef": 938.7930061484359,
              "stderr": 3893.5108846071817,
              "tstat": 0.241117344723476,
              "pvalue": 0.8109123470733581,
              "ci_lower": -6973.773111063281,
              "ci_upper": 8851.359123360153,
              "vif": 1.4712431557724688
            },
            {
              "feature": "Administration",
              "coef": -0.06878788228413268,
              "stderr": 0.060737258811491245,
              "tstat": -1.1325483505541132,
              "pvalue": 0.26532799225056714,
              "ci_lower": -0.19222084301479497,
              "ci_upper": 0.05464507844652959,
              "vif": 1.1565116160578504
            }
          ],
          "outliers": [
            {
              "index": 45,
              "actual": 64926.08,
              "predicted": 46357.46068538052,
              "residual": 18568.61931461948,
              "abs_error": 18568.61931461948,
              "pct_error": 28.59963101825873,
              "rank": 1
            },
            {
              "index": 48,
              "actual": 35673.41,
              "predicted": 50912.41741887499,
              "residual": -15239.007418874986,
              "abs_error": 15239.007418874986,
              "pct_error": 42.71811250697644,
              "rank": 2
            },
            {
              "index": 19,
              "actual": 122776.86,
              "predicted": 113097.42524724804,
              "residual": 9679.434752751957,
              "abs_error": 9679.434752751957,
              "pct_error": 7.883761445562263,
              "rank": 3
            },
            {
              "index": 13,
              "actual": 134307.35,
              "predicted": 126362.8790827436,
              "residual": 7944.4709172564035,
              "abs_error": 7944.4709172564035,
              "pct_error": 5.915142333801093,
              "rank": 4
            },
            {
              "index": 25,
              "actual": 107404.34,
              "predicted": 100643.24281690145,
              "residual": 6761.097183098551,
              "abs_error": 6761.097183098551,
              "pct_error": 6.2949943951041005,
              "rank": 5
            },
            {
              "index": 26,
              "actual": 105733.54,
              "predicted": 109741.3503279157,
              "residual": -4007.8103279157076,
              "abs_error": 4007.8103279157076,
              "pct_error": 3.7904815519424657,
              "rank": 6
            },
            {
              "index": 39,
              "actual": 81005.76,
              "predicted": 84608.45383562769,
              "residual": -3602.693835627695,
              "abs_error": 3602.693835627695,
              "pct_error": 4.447453904052867,
              "rank": 7
            },
            {
              "index": 17,
              "actual": 125370.37,
              "predicted": 128750.4828849167,
              "residual": -3380.1128849167,
              "abs_error": 3380.1128849167,
              "pct_error": 2.696101865948629,
              "rank": 8
            },
            {
              "index": 30,
              "actual": 99937.59,
              "predicted": 99677.4942525319,
              "residual": 260.09574746809085,
              "abs_error": 260.09574746809085,
              "pct_error": 0.2602581745948555,
              "rank": 9
            },
            {
              "index": 32,
              "actual": 97427.84,
              "predicted": 97599.27574751806,
              "residual": -171.43574751805863,
              "abs_error": 171.43574751805863,
              "pct_error": 0.1759617656699139,
              "rank": 10
            }
          ]
        }
      ],
      "RFECV": [
        {
          "k": 1,
          "features": [
            "R&D Spend"
          ],
          "rmse": 7714.33489083019,
          "mae": 6077.363300620408,
          "mse": 59510962.80788003,
          "r2": 0.926510810934195,
          "adj_r2": 0.9173246623009693,
          "cv_rmse": 9943.871028684298,
          "cv_r2": 0.93837368355318,
          "f_stat": 676.1034669260162,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 49336.66803799112,
              "stderr": 2985.818740249927,
              "tstat": 16.52366480688021,
              "pvalue": 0.0,
              "ci_lower": 43292.19400573018,
              "ci_upper": 55381.142070252055,
              "vif": null
            },
            {
              "feature": "R&D Spend",
              "coef": 0.8536091075148804,
              "stderr": 0.03282860728228894,
              "tstat": 26.001989672446545,
              "pvalue": 0.0,
              "ci_lower": 0.7871510665232567,
              "ci_upper": 0.9200671485065041,
              "vif": 1.0
            }
          ],
          "outliers": [
            {
              "index": 45,
              "actual": 64926.08,
              "predicted": 50190.47347560073,
              "residual": 14735.60652439927,
              "abs_error": 14735.60652439927,
              "pct_error": 22.695974444166765,
              "rank": 1
            },
            {
              "index": 48,
              "actual": 35673.41,
              "predicted": 49799.36685471956,
              "residual": -14125.95685471956,
              "abs_error": 14125.95685471956,
              "pct_error": 39.597999896055796,
              "rank": 2
            },
            {
              "index": 26,
              "actual": 105733.54,
              "predicted": 113638.07752879556,
              "residual": -7904.5375287955685,
              "abs_error": 7904.5375287955685,
              "pct_error": 7.47590360522836,
              "rank": 3
            },
            {
              "index": 13,
              "actual": 134307.35,
              "predicted": 127862.20996405193,
              "residual": 6445.140035948076,
              "abs_error": 6445.140035948076,
              "pct_error": 4.798799198962734,
              "rank": 4
            },
            {
              "index": 32,
              "actual": 97427.84,
              "predicted": 103463.04843112713,
              "residual": -6035.208431127132,
              "abs_error": 6035.208431127132,
              "pct_error": 6.194541961647854,
              "rank": 5
            },
            {
              "index": 17,
              "actual": 125370.37,
              "predicted": 130136.88190548436,
              "residual": -4766.511905484367,
              "abs_error": 4766.511905484367,
              "pct_error": 3.8019445148677216,
              "rank": 6
            },
            {
              "index": 25,
              "actual": 107404.34,
              "predicted": 104535.05342879967,
              "residual": 2869.286571200326,
              "abs_error": 2869.286571200326,
              "pct_error": 2.671481032517239,
              "rank": 7
            },
            {
              "index": 30,
              "actual": 99937.59,
              "predicted": 102255.72078164022,
              "residual": -2318.130781640226,
              "abs_error": 2318.130781640226,
              "pct_error": 2.319578430538725,
              "rank": 8
            },
            {
              "index": 39,
              "actual": 81005.76,
              "predicted": 82250.56334619471,
              "residual": -1244.8033461947198,
              "abs_error": 1244.8033461947198,
              "pct_error": 1.536684979185085,
              "rank": 9
            },
            {
              "index": 19,
              "actual": 122776.86,
              "predicted": 123105.31102669484,
              "residual": -328.4510266948346,
              "abs_error": 328.4510266948346,
              "pct_error": 0.26751867305845306,
              "rank": 10
            }
          ]
        },
        {
          "k": 2,
          "features": [
            "R&D Spend",
            "Marketing Spend"
          ],
          "rmse": 8206.328813165856,
          "mae": 6469.1817214685925,
          "mse": 67343832.58979611,
          "r2": 0.9168381183550247,
          "adj_r2": 0.8930775807421746,
          "cv_rmse": 9682.556146428222,
          "cv_r2": 0.9415997343689557,
          "f_stat": 365.9781290116033,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 45542.392477514295,
              "stderr": 3457.2769574739023,
              "tstat": 13.172908343099694,
              "pvalue": 1.5543122344752192e-15,
              "ci_lower": 38537.28396367646,
              "ci_upper": 52547.50099135213,
              "vif": null
            },
            {
              "feature": "R&D Spend",
              "coef": 0.7833743148902914,
              "stderr": 0.04753512334490658,
              "tstat": 16.47990495798788,
              "pvalue": 0.0,
              "ci_lower": 0.6870590062396826,
              "ci_upper": 0.8796896235409002,
              "vif": 2.2576926919130162
            },
            {
              "feature": "Marketing Spend",
              "coef": 0.03923978714553167,
              "stderr": 0.01982183326614713,
              "tstat": 1.9796245190169994,
              "pvalue": 0.05522150412415483,
              "ci_lower": -0.0009230620217553151,
              "ci_upper": 0.07940263631281866,
              "vif": 2.2576926919130162
            }
          ],
          "outliers": [
            {
              "index": 45,
              "actual": 64926.08,
              "predicted": 46400.656776437005,
              "residual": 18525.423223562997,
              "abs_error": 18525.423223562997,
              "pct_error": 28.533099832244602,
              "rank": 1
            },
            {
              "index": 48,
              "actual": 35673.41,
              "predicted": 45967.020524900574,
              "residual": -10293.61052490057,
              "abs_error": 10293.61052490057,
              "pct_error": 28.855134748543996,
              "rank": 2
            },
            {
              "index": 19,
              "actual": 122776.86,
              "predicted": 113241.36575803881,
              "residual": 9535.49424196119,
              "abs_error": 9535.49424196119,
              "pct_error": 7.766523954075052,
              "rank": 3
            },
            {
              "index": 13,
              "actual": 134307.35,
              "predicted": 127521.38604122544,
              "residual": 6785.963958774562,
              "abs_error": 6785.963958774562,
              "pct_error": 5.0525633621499955,
              "rank": 4
            },
            {
              "index": 25,
              "actual": 107404.34,
              "predicted": 101612.68921418353,
              "residual": 5791.65078581647,
              "abs_error": 5791.65078581647,
              "pct_error": 5.392380592643155,
              "rank": 5
            },
            {
              "index": 17,
              "actual": 125370.37,
              "predicted": 130782.53611917047,
              "residual": -5412.166119170477,
              "abs_error": 5412.166119170477,
              "pct_error": 4.316941968960032,
              "rank": 6
            },
            {
              "index": 26,
              "actual": 105733.54,
              "predicted": 109813.19061886772,
              "residual": -4079.6506188677304,
              "abs_error": 4079.6506188677304,
              "pct_error": 3.8584262088148478,
              "rank": 7
            },
            {
              "index": 30,
              "actual": 99937.59,
              "predicted": 97683.24623440253,
              "residual": 2254.3437655974703,
              "abs_error": 2254.3437655974703,
              "pct_error": 2.2557515801586474,
              "rank": 8
            },
            {
              "index": 39,
              "actual": 81005.76,
              "predicted": 82615.07411457178,
              "residual": -1609.3141145717818,
              "abs_error": 1609.3141145717818,
              "pct_error": 1.9866662748078432,
              "rank": 9
            },
            {
              "index": 32,
              "actual": 97427.84,
              "predicted": 97023.64013853732,
              "residual": 404.1998614626791,
              "abs_error": 404.1998614626791,
              "pct_error": 0.41487100757101786,
              "rank": 10
            }
          ]
        },
        {
          "k": 3,
          "features": [
            "R&D Spend",
            "Administration",
            "Marketing Spend"
          ],
          "rmse": 8995.90580336141,
          "mae": 6979.15225237041,
          "mse": 80926321.22295149,
          "r2": 0.9000653083037322,
          "adj_r2": 0.8500979624555983,
          "cv_rmse": 9583.678887745895,
          "cv_r2": 0.9399392913746605,
          "f_stat": 246.5804298288131,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 54071.87574599093,
              "stderr": 8166.659947816364,
              "tstat": 6.6210514569605525,
              "pvalue": 1.0366753810941987e-07,
              "ci_lower": 37509.12169777724,
              "ci_upper": 70634.62979420462,
              "vif": null
            },
            {
              "feature": "R&D Spend",
              "coef": 0.8037792756297519,
              "stderr": 0.05053425022285619,
              "tstat": 15.905633745134894,
              "pvalue": 0.0,
              "ci_lower": 0.7012910659087324,
              "ci_upper": 0.9062674853507715,
              "vif": 2.574082735664086
            },
            {
              "feature": "Administration",
              "coef": -0.0679291740015,
              "stderr": 0.05898024198614502,
              "tstat": -1.1517276246078672,
              "pvalue": 0.2570246502646012,
              "ci_lower": -0.187546648949976,
              "ci_upper": 0.05168830094697599,
              "vif": 1.1520012494139669
            },
            {
              "feature": "Marketing Spend",
              "coef": 0.031241545897733203,
              "stderr": 0.020921171908633924,
              "tstat": 1.4932980826394424,
              "pvalue": 0.14407259551234275,
              "ci_lower": -0.011188557343647973,
              "ci_upper": 0.07367164913911438,
              "vif": 2.5372571088188756
            }
          ],
          "outliers": [
            {
              "index": 45,
              "actual": 64926.08,
              "predicted": 46501.70815035996,
              "residual": 18424.37184964004,
              "abs_error": 18424.37184964004,
              "pct_error": 28.37745918071758,
              "rank": 1
            },
            {
              "index": 48,
              "actual": 35673.41,
              "predicted": 50992.69486261032,
              "residual": -15319.284862610315,
              "abs_error": 15319.284862610315,
              "pct_error": 42.94314690580551,
              "rank": 2
            },
            {
              "index": 19,
              "actual": 122776.86,
              "predicted": 113106.15292225599,
              "residual": 9670.70707774401,
              "abs_error": 9670.70707774401,
              "pct_error": 7.87665287884379,
              "rank": 3
            },
            {
              "index": 13,
              "actual": 134307.35,
              "predicted": 126703.02716460769,
              "residual": 7604.322835392319,
              "abs_error": 7604.322835392319,
              "pct_error": 5.6618813753620465,
              "rank": 4
            },
            {
              "index": 25,
              "actual": 107404.34,
              "predicted": 100878.46414540126,
              "residual": 6525.875854598737,
              "abs_error": 6525.875854598737,
              "pct_error": 6.075988972697693,
              "rank": 5
            },
            {
              "index": 39,
              "actual": 81005.76,
              "predicted": 84894.75081555653,
              "residual": -3888.9908155565354,
              "abs_error": 3888.9908155565354,
              "pct_error": 4.800881833040682,
              "rank": 6
            },
            {
              "index": 17,
              "actual": 125370.37,
              "predicted": 129128.39734380922,
              "residual": -3758.0273438092263,
              "abs_error": 3758.0273438092263,
              "pct_error": 2.9975402830901965,
              "rank": 7
            },
            {
              "index": 26,
              "actual": 105733.54,
              "predicted": 109016.5536578013,
              "residual": -3283.0136578013044,
              "abs_error": 3283.0136578013044,
              "pct_error": 3.1049879326856025,
              "rank": 8
            },
            {
              "index": 30,
              "actual": 99937.59,
              "predicted": 98893.41815973523,
              "residual": 1044.1718402647675,
              "abs_error": 1044.1718402647675,
              "pct_error": 1.044823914870038,
              "rank": 9
            },
            {
              "index": 32,
              "actual": 97427.84,
              "predicted": 97700.59638628684,
              "residual": -272.756386286841,
              "abs_error": 272.756386286841,
              "pct_error": 0.2799573369242724,
              "rank": 10
            }
          ]
        },
        {
          "k": 4,
          "features": [
            "R&D Spend",
            "Administration",
            "Marketing Spend",
            "State_Florida"
          ],
          "rmse": 9055.957751980764,
          "mae": 6961.486845471396,
          "mse": 82010370.80566052,
          "r2": 0.8987266318484781,
          "adj_r2": 0.8177079373272607,
          "cv_rmse": 9786.25485264407,
          "cv_r2": 0.9376825880163018,
          "f_stat": 180.2430251126896,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 54029.885919142034,
              "stderr": 8274.043236367406,
              "tstat": 6.530046360123087,
              "pvalue": 1.55706110227527e-07,
              "ci_lower": 37232.68514630644,
              "ci_upper": 70827.08669197763,
              "vif": null
            },
            {
              "feature": "R&D Spend",
              "coef": 0.8056328218977674,
              "stderr": 0.051595562526277054,
              "tstat": 15.614381982703792,
              "pvalue": 0.0,
              "ci_lower": 0.7008882613506361,
              "ci_upper": 0.9103773824448987,
              "vif": 2.614956161907153
            },
            {
              "feature": "Administration",
              "coef": -0.06878374611887866,
              "stderr": 0.05982042630781345,
              "tstat": -1.1498371102362817,
              "pvalue": 0.2580073988885432,
              "ci_lower": -0.19022566783768613,
              "ci_upper": 0.052658175599928816,
              "vif": 1.1548556875468186
            },
            {
              "feature": "Marketing Spend",
              "coef": 0.029859723516622694,
              "stderr": 0.021731713809319115,
              "tstat": 1.3740160476353265,
              "pvalue": 0.17817276461084508,
              "ci_lower": -0.014258000982143505,
              "ci_upper": 0.07397744801538889,
              "vif": 2.667898335816746
            },
            {
              "feature": "State_Florida",
              "coef": 935.0793356301068,
              "stderr": 3254.2109708155003,
              "tstat": 0.28734441129235616,
              "pvalue": 0.7755430897333069,
              "ci_lower": -5671.320156421686,
              "ci_upper": 7541.478827681899,
              "vif": 1.0579914667760217
            }
          ],
          "outliers": [
            {
              "index": 45,
              "actual": 64926.08,
              "predicted": 46352.843676736855,
              "residual": 18573.236323263147,
              "abs_error": 18573.236323263147,
              "pct_error": 28.606742195529357,
              "rank": 1
            },
            {
              "index": 48,
              "actual": 35673.41,
              "predicted": 50907.49149726066,
              "residual": -15234.081497260653,
              "abs_error": 15234.081497260653,
              "pct_error": 42.70430412248409,
              "rank": 2
            },
            {
              "index": 19,
              "actual": 122776.86,
              "predicted": 113093.15712979491,
              "residual": 9683.702870205088,
              "abs_error": 9683.702870205088,
              "pct_error": 7.887237766306361,
              "rank": 3
            },
            {
              "index": 13,
              "actual": 134307.35,
              "predicted": 126366.62112486914,
              "residual": 7940.728875130866,
              "abs_error": 7940.728875130866,
              "pct_error": 5.912356155587066,
              "rank": 4
            },
            {
              "index": 25,
              "actual": 107404.34,
              "predicted": 100646.43527494444,
              "residual": 6757.9047250555595,
              "abs_error": 6757.9047250555595,
              "pct_error": 6.2920220216944305,
              "rank": 5
            },
            {
              "index": 26,
              "actual": 105733.54,
              "predicted": 109740.86073591035,
              "residual": -4007.3207359103544,
              "abs_error": 4007.3207359103544,
              "pct_error": 3.790018508706277,
              "rank": 6
            },
            {
              "index": 39,
              "actual": 81005.76,
              "predicted": 84611.49884124388,
              "residual": -3605.7388412438886,
              "abs_error": 3605.7388412438886,
              "pct_error": 4.45121290293911,
              "rank": 7
            },
            {
              "index": 17,
              "actual": 125370.37,
              "predicted": 128747.41218200963,
              "residual": -3377.042182009638,
              "abs_error": 3377.042182009638,
              "pct_error": 2.693652560816115,
              "rank": 8
            },
            {
              "index": 30,
              "actual": 99937.59,
              "predicted": 99676.66630500167,
              "residual": 260.9236949983315,
              "abs_error": 260.9236949983315,
              "pct_error": 0.2610866391698374,
              "rank": 9
            },
            {
              "index": 32,
              "actual": 97427.84,
              "predicted": 97602.02870963642,
              "residual": -174.18870963642257,
              "abs_error": 174.18870963642257,
              "pct_error": 0.1787874078255482,
              "rank": 10
            }
          ]
        },
        {
          "k": 5,
          "features": [
            "R&D Spend",
            "Administration",
            "Marketing Spend",
            "State_Florida",
            "State_New York"
          ],
          "rmse": 9055.957323204313,
          "mae": 6961.477813004758,
          "mse": 82010363.03969781,
          "r2": 0.8987266414385482,
          "adj_r2": 0.7721349432367335,
          "cv_rmse": 9991.808176840539,
          "cv_r2": 0.9340039511035654,
          "f_stat": 140.07459350755786,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 54028.03959405874,
              "stderr": 8457.293252904401,
              "tstat": 6.388337022073161,
              "pvalue": 2.7088901877192484e-07,
              "ci_lower": 36840.751817153985,
              "ci_upper": 71215.3273709635,
              "vif": null
            },
            {
              "feature": "R&D Spend",
              "coef": 0.8056300637569414,
              "stderr": 0.052371248757686596,
              "tstat": 15.383060035181956,
              "pvalue": 0.0,
              "ci_lower": 0.6991988810230204,
              "ci_upper": 0.9120612464908623,
              "vif": 2.6171974116238235
            },
            {
              "feature": "Administration",
              "coef": -0.06878788228413235,
              "stderr": 0.06073725881149117,
              "tstat": -1.1325483505541092,
              "pvalue": 0.26532799225056847,
              "ci_lower": -0.19222084301479447,
              "ci_upper": 0.05464507844652977,
              "vif": 1.1565116160578504
            },
            {
              "feature": "Marketing Spend",
              "coef": 0.02985544291038633,
              "stderr": 0.02217690134860859,
              "tstat": 1.3462405067811472,
              "pvalue": 0.18713248438625785,
              "ci_lower": -0.015213443089004172,
              "ci_upper": 0.07492432890977684,
              "vif": 2.698944569752321
            },
            {
              "feature": "State_Florida",
              "coef": 938.7930061484324,
              "stderr": 3893.5108846071807,
              "tstat": 0.24111734472347518,
              "pvalue": 0.8109123470733586,
              "ci_lower": -6973.773111063283,
              "ci_upper": 8851.359123360147,
              "vif": 1.4712431557724688
            },
            {
              "feature": "State_New York",
              "coef": 6.98775996697481,
              "stderr": 3882.7648769979482,
              "tstat": 0.0017996866120766916,
              "pvalue": 0.9985745767960641,
              "ci_lower": -7883.739842283791,
              "ci_upper": 7897.71536221774,
              "vif": 1.4108784071978522
            }
          ],
          "outliers": [
            {
              "index": 45,
              "actual": 64926.08,
              "predicted": 46357.460685380516,
              "residual": 18568.619314619486,
              "abs_error": 18568.619314619486,
              "pct_error": 28.59963101825874,
              "rank": 1
            },
            {
              "index": 48,
              "actual": 35673.41,
              "predicted": 50912.41741887497,
              "residual": -15239.007418874964,
              "abs_error": 15239.007418874964,
              "pct_error": 42.71811250697638,
              "rank": 2
            },
            {
              "index": 19,
              "actual": 122776.86,
              "predicted": 113097.4252472481,
              "residual": 9679.434752751898,
              "abs_error": 9679.434752751898,
              "pct_error": 7.883761445562216,
              "rank": 3
            },
            {
              "index": 13,
              "actual": 134307.35,
              "predicted": 126362.87908274363,
              "residual": 7944.470917256374,
              "abs_error": 7944.470917256374,
              "pct_error": 5.915142333801072,
              "rank": 4
            },
            {
              "index": 25,
              "actual": 107404.34,
              "predicted": 100643.2428169015,
              "residual": 6761.097183098493,
              "abs_error": 6761.097183098493,
              "pct_error": 6.294994395104046,
              "rank": 5
            },
            {
              "index": 26,
              "actual": 105733.54,
              "predicted": 109741.35032791576,
              "residual": -4007.810327915766,
              "abs_error": 4007.810327915766,
              "pct_error": 3.790481551942521,
              "rank": 6
            },
            {
              "index": 39,
              "actual": 81005.76,
              "predicted": 84608.45383562769,
              "residual": -3602.693835627695,
              "abs_error": 3602.693835627695,
              "pct_error": 4.447453904052867,
              "rank": 7
            },
            {
              "index": 17,
              "actual": 125370.37,
              "predicted": 128750.48288491672,
              "residual": -3380.112884916729,
              "abs_error": 3380.112884916729,
              "pct_error": 2.696101865948652,
              "rank": 8
            },
            {
              "index": 30,
              "actual": 99937.59,
              "predicted": 99677.49425253192,
              "residual": 260.0957474680763,
              "abs_error": 260.0957474680763,
              "pct_error": 0.26025817459484096,
              "rank": 9
            },
            {
              "index": 32,
              "actual": 97427.84,
              "predicted": 97599.2757475181,
              "residual": -171.4357475181023,
              "abs_error": 171.4357475181023,
              "pct_error": 0.17596176566995872,
              "rank": 10
            }
          ]
        }
      ],
      "Exhaustive Feature Selection": [
        {
          "k": 1,
          "features": [
            "R&D Spend"
          ],
          "rmse": 7714.33489083019,
          "mae": 6077.363300620408,
          "mse": 59510962.80788003,
          "r2": 0.926510810934195,
          "adj_r2": 0.9173246623009693,
          "cv_rmse": 9943.871028684298,
          "cv_r2": 0.93837368355318,
          "f_stat": 676.1034669260162,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 49336.66803799112,
              "stderr": 2985.818740249927,
              "tstat": 16.52366480688021,
              "pvalue": 0.0,
              "ci_lower": 43292.19400573018,
              "ci_upper": 55381.142070252055,
              "vif": null
            },
            {
              "feature": "R&D Spend",
              "coef": 0.8536091075148804,
              "stderr": 0.03282860728228894,
              "tstat": 26.001989672446545,
              "pvalue": 0.0,
              "ci_lower": 0.7871510665232567,
              "ci_upper": 0.9200671485065041,
              "vif": 1.0
            }
          ],
          "outliers": [
            {
              "index": 45,
              "actual": 64926.08,
              "predicted": 50190.47347560073,
              "residual": 14735.60652439927,
              "abs_error": 14735.60652439927,
              "pct_error": 22.695974444166765,
              "rank": 1
            },
            {
              "index": 48,
              "actual": 35673.41,
              "predicted": 49799.36685471956,
              "residual": -14125.95685471956,
              "abs_error": 14125.95685471956,
              "pct_error": 39.597999896055796,
              "rank": 2
            },
            {
              "index": 26,
              "actual": 105733.54,
              "predicted": 113638.07752879556,
              "residual": -7904.5375287955685,
              "abs_error": 7904.5375287955685,
              "pct_error": 7.47590360522836,
              "rank": 3
            },
            {
              "index": 13,
              "actual": 134307.35,
              "predicted": 127862.20996405193,
              "residual": 6445.140035948076,
              "abs_error": 6445.140035948076,
              "pct_error": 4.798799198962734,
              "rank": 4
            },
            {
              "index": 32,
              "actual": 97427.84,
              "predicted": 103463.04843112713,
              "residual": -6035.208431127132,
              "abs_error": 6035.208431127132,
              "pct_error": 6.194541961647854,
              "rank": 5
            },
            {
              "index": 17,
              "actual": 125370.37,
              "predicted": 130136.88190548436,
              "residual": -4766.511905484367,
              "abs_error": 4766.511905484367,
              "pct_error": 3.8019445148677216,
              "rank": 6
            },
            {
              "index": 25,
              "actual": 107404.34,
              "predicted": 104535.05342879967,
              "residual": 2869.286571200326,
              "abs_error": 2869.286571200326,
              "pct_error": 2.671481032517239,
              "rank": 7
            },
            {
              "index": 30,
              "actual": 99937.59,
              "predicted": 102255.72078164022,
              "residual": -2318.130781640226,
              "abs_error": 2318.130781640226,
              "pct_error": 2.319578430538725,
              "rank": 8
            },
            {
              "index": 39,
              "actual": 81005.76,
              "predicted": 82250.56334619471,
              "residual": -1244.8033461947198,
              "abs_error": 1244.8033461947198,
              "pct_error": 1.536684979185085,
              "rank": 9
            },
            {
              "index": 19,
              "actual": 122776.86,
              "predicted": 123105.31102669484,
              "residual": -328.4510266948346,
              "abs_error": 328.4510266948346,
              "pct_error": 0.26751867305845306,
              "rank": 10
            }
          ]
        },
        {
          "k": 2,
          "features": [
            "R&D Spend",
            "Marketing Spend"
          ],
          "rmse": 8206.328813165856,
          "mae": 6469.1817214685925,
          "mse": 67343832.58979611,
          "r2": 0.9168381183550247,
          "adj_r2": 0.8930775807421746,
          "cv_rmse": 9682.556146428222,
          "cv_r2": 0.9415997343689557,
          "f_stat": 365.9781290116033,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 45542.392477514295,
              "stderr": 3457.2769574739023,
              "tstat": 13.172908343099694,
              "pvalue": 1.5543122344752192e-15,
              "ci_lower": 38537.28396367646,
              "ci_upper": 52547.50099135213,
              "vif": null
            },
            {
              "feature": "R&D Spend",
              "coef": 0.7833743148902914,
              "stderr": 0.04753512334490658,
              "tstat": 16.47990495798788,
              "pvalue": 0.0,
              "ci_lower": 0.6870590062396826,
              "ci_upper": 0.8796896235409002,
              "vif": 2.2576926919130162
            },
            {
              "feature": "Marketing Spend",
              "coef": 0.03923978714553167,
              "stderr": 0.01982183326614713,
              "tstat": 1.9796245190169994,
              "pvalue": 0.05522150412415483,
              "ci_lower": -0.0009230620217553151,
              "ci_upper": 0.07940263631281866,
              "vif": 2.2576926919130162
            }
          ],
          "outliers": [
            {
              "index": 45,
              "actual": 64926.08,
              "predicted": 46400.656776437005,
              "residual": 18525.423223562997,
              "abs_error": 18525.423223562997,
              "pct_error": 28.533099832244602,
              "rank": 1
            },
            {
              "index": 48,
              "actual": 35673.41,
              "predicted": 45967.020524900574,
              "residual": -10293.61052490057,
              "abs_error": 10293.61052490057,
              "pct_error": 28.855134748543996,
              "rank": 2
            },
            {
              "index": 19,
              "actual": 122776.86,
              "predicted": 113241.36575803881,
              "residual": 9535.49424196119,
              "abs_error": 9535.49424196119,
              "pct_error": 7.766523954075052,
              "rank": 3
            },
            {
              "index": 13,
              "actual": 134307.35,
              "predicted": 127521.38604122544,
              "residual": 6785.963958774562,
              "abs_error": 6785.963958774562,
              "pct_error": 5.0525633621499955,
              "rank": 4
            },
            {
              "index": 25,
              "actual": 107404.34,
              "predicted": 101612.68921418353,
              "residual": 5791.65078581647,
              "abs_error": 5791.65078581647,
              "pct_error": 5.392380592643155,
              "rank": 5
            },
            {
              "index": 17,
              "actual": 125370.37,
              "predicted": 130782.53611917047,
              "residual": -5412.166119170477,
              "abs_error": 5412.166119170477,
              "pct_error": 4.316941968960032,
              "rank": 6
            },
            {
              "index": 26,
              "actual": 105733.54,
              "predicted": 109813.19061886772,
              "residual": -4079.6506188677304,
              "abs_error": 4079.6506188677304,
              "pct_error": 3.8584262088148478,
              "rank": 7
            },
            {
              "index": 30,
              "actual": 99937.59,
              "predicted": 97683.24623440253,
              "residual": 2254.3437655974703,
              "abs_error": 2254.3437655974703,
              "pct_error": 2.2557515801586474,
              "rank": 8
            },
            {
              "index": 39,
              "actual": 81005.76,
              "predicted": 82615.07411457178,
              "residual": -1609.3141145717818,
              "abs_error": 1609.3141145717818,
              "pct_error": 1.9866662748078432,
              "rank": 9
            },
            {
              "index": 32,
              "actual": 97427.84,
              "predicted": 97023.64013853732,
              "residual": 404.1998614626791,
              "abs_error": 404.1998614626791,
              "pct_error": 0.41487100757101786,
              "rank": 10
            }
          ]
        },
        {
          "k": 3,
          "features": [
            "R&D Spend",
            "Administration",
            "Marketing Spend"
          ],
          "rmse": 8995.90580336141,
          "mae": 6979.15225237041,
          "mse": 80926321.22295149,
          "r2": 0.9000653083037322,
          "adj_r2": 0.8500979624555983,
          "cv_rmse": 9583.678887745895,
          "cv_r2": 0.9399392913746605,
          "f_stat": 246.5804298288131,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 54071.87574599093,
              "stderr": 8166.659947816364,
              "tstat": 6.6210514569605525,
              "pvalue": 1.0366753810941987e-07,
              "ci_lower": 37509.12169777724,
              "ci_upper": 70634.62979420462,
              "vif": null
            },
            {
              "feature": "R&D Spend",
              "coef": 0.8037792756297519,
              "stderr": 0.05053425022285619,
              "tstat": 15.905633745134894,
              "pvalue": 0.0,
              "ci_lower": 0.7012910659087324,
              "ci_upper": 0.9062674853507715,
              "vif": 2.574082735664086
            },
            {
              "feature": "Administration",
              "coef": -0.0679291740015,
              "stderr": 0.05898024198614502,
              "tstat": -1.1517276246078672,
              "pvalue": 0.2570246502646012,
              "ci_lower": -0.187546648949976,
              "ci_upper": 0.05168830094697599,
              "vif": 1.1520012494139669
            },
            {
              "feature": "Marketing Spend",
              "coef": 0.031241545897733203,
              "stderr": 0.020921171908633924,
              "tstat": 1.4932980826394424,
              "pvalue": 0.14407259551234275,
              "ci_lower": -0.011188557343647973,
              "ci_upper": 0.07367164913911438,
              "vif": 2.5372571088188756
            }
          ],
          "outliers": [
            {
              "index": 45,
              "actual": 64926.08,
              "predicted": 46501.70815035996,
              "residual": 18424.37184964004,
              "abs_error": 18424.37184964004,
              "pct_error": 28.37745918071758,
              "rank": 1
            },
            {
              "index": 48,
              "actual": 35673.41,
              "predicted": 50992.69486261032,
              "residual": -15319.284862610315,
              "abs_error": 15319.284862610315,
              "pct_error": 42.94314690580551,
              "rank": 2
            },
            {
              "index": 19,
              "actual": 122776.86,
              "predicted": 113106.15292225599,
              "residual": 9670.70707774401,
              "abs_error": 9670.70707774401,
              "pct_error": 7.87665287884379,
              "rank": 3
            },
            {
              "index": 13,
              "actual": 134307.35,
              "predicted": 126703.02716460769,
              "residual": 7604.322835392319,
              "abs_error": 7604.322835392319,
              "pct_error": 5.6618813753620465,
              "rank": 4
            },
            {
              "index": 25,
              "actual": 107404.34,
              "predicted": 100878.46414540126,
              "residual": 6525.875854598737,
              "abs_error": 6525.875854598737,
              "pct_error": 6.075988972697693,
              "rank": 5
            },
            {
              "index": 39,
              "actual": 81005.76,
              "predicted": 84894.75081555653,
              "residual": -3888.9908155565354,
              "abs_error": 3888.9908155565354,
              "pct_error": 4.800881833040682,
              "rank": 6
            },
            {
              "index": 17,
              "actual": 125370.37,
              "predicted": 129128.39734380922,
              "residual": -3758.0273438092263,
              "abs_error": 3758.0273438092263,
              "pct_error": 2.9975402830901965,
              "rank": 7
            },
            {
              "index": 26,
              "actual": 105733.54,
              "predicted": 109016.5536578013,
              "residual": -3283.0136578013044,
              "abs_error": 3283.0136578013044,
              "pct_error": 3.1049879326856025,
              "rank": 8
            },
            {
              "index": 30,
              "actual": 99937.59,
              "predicted": 98893.41815973523,
              "residual": 1044.1718402647675,
              "abs_error": 1044.1718402647675,
              "pct_error": 1.044823914870038,
              "rank": 9
            },
            {
              "index": 32,
              "actual": 97427.84,
              "predicted": 97700.59638628684,
              "residual": -272.756386286841,
              "abs_error": 272.756386286841,
              "pct_error": 0.2799573369242724,
              "rank": 10
            }
          ]
        },
        {
          "k": 4,
          "features": [
            "R&D Spend",
            "Administration",
            "Marketing Spend",
            "State_New York"
          ],
          "rmse": 9015.112541293833,
          "mae": 6974.873065885222,
          "mse": 81272254.13219336,
          "r2": 0.8996381209793827,
          "adj_r2": 0.8193486177628888,
          "cv_rmse": 9772.405940714545,
          "cv_r2": 0.9377008721431686,
          "f_stat": 179.92043014339552,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 54189.45563005146,
              "stderr": 8316.545016918644,
              "tstat": 6.515861516989557,
              "pvalue": 1.6249122003486605e-07,
              "ci_lower": 37305.971655554036,
              "ci_upper": 71072.93960454888,
              "vif": null
            },
            {
              "feature": "R&D Spend",
              "coef": 0.8044877045500851,
              "stderr": 0.05144994590628121,
              "tstat": 15.636317791577506,
              "pvalue": 0.0,
              "ci_lower": 0.7000387614576924,
              "ci_upper": 0.9089366476424778,
              "vif": 2.595778416564302
            },
            {
              "feature": "Administration",
              "coef": -0.06787721330801966,
              "stderr": 0.05979850361143893,
              "tstat": -1.135098860484451,
              "pvalue": 0.26404778062894363,
              "ci_lower": -0.1892746295871086,
              "ci_upper": 0.05352020297106928,
              "vif": 1.1520395953822868
            },
            {
              "feature": "Marketing Spend",
              "coef": 0.03115702689555011,
              "stderr": 0.021218490536226983,
              "tstat": 1.4683903570970216,
              "pvalue": 0.15092895003408535,
              "ci_lower": -0.01191879896754916,
              "ci_upper": 0.07423285275864938,
              "vif": 2.5390330598447517
            },
            {
              "feature": "State_New York",
              "coef": -489.18696272511005,
              "stderr": 3248.002633039482,
              "tstat": -0.1506116275119299,
              "pvalue": 0.8811467646036706,
              "ci_lower": -7082.982859036551,
              "ci_upper": 6104.608933586332,
              "vif": 1.0145823344137426
            }
          ],
          "outliers": [
            {
              "index": 45,
              "actual": 64926.08,
              "predicted": 46137.09982334663,
              "residual": 18788.98017665337,
              "abs_error": 18788.98017665337,
              "pct_error": 28.939033708262336,
              "rank": 1
            },
            {
              "index": 48,
              "actual": 35673.41,
              "predicted": 50624.16039779886,
              "residual": -14950.75039779886,
              "abs_error": 14950.75039779886,
              "pct_error": 41.91006802489265,
              "rank": 2
            },
            {
              "index": 19,
              "actual": 122776.86,
              "predicted": 112803.74475797254,
              "residual": 9973.11524202746,
              "abs_error": 9973.11524202746,
              "pct_error": 8.12296001219404,
              "rank": 3
            },
            {
              "index": 13,
              "actual": 134307.35,
              "predicted": 126871.4625482249,
              "residual": 7435.88745177511,
              "abs_error": 7435.88745177511,
              "pct_error": 5.536470976290657,
              "rank": 4
            },
            {
              "index": 25,
              "actual": 107404.34,
              "predicted": 101037.44519614076,
              "residual": 6366.894803859235,
              "abs_error": 6366.894803859235,
              "pct_error": 5.927967905076494,
              "rank": 5
            },
            {
              "index": 39,
              "actual": 81005.76,
              "predicted": 85029.16770395012,
              "residual": -4023.407703950128,
              "abs_error": 4023.407703950128,
              "pct_error": 4.966816809014727,
              "rank": 6
            },
            {
              "index": 26,
              "actual": 105733.54,
              "predicted": 109183.65831922315,
              "residual": -3450.1183192231547,
              "abs_error": 3450.1183192231547,
              "pct_error": 3.2630311244881756,
              "rank": 7
            },
            {
              "index": 17,
              "actual": 125370.37,
              "predicted": 128807.50356774671,
              "residual": -3437.133567746714,
              "abs_error": 3437.133567746714,
              "pct_error": 2.741583651501319,
              "rank": 8
            },
            {
              "index": 30,
              "actual": 99937.59,
              "predicted": 99053.22320596004,
              "residual": 884.366794039961,
              "abs_error": 884.366794039961,
              "pct_error": 0.8849190720328167,
              "rank": 9
            },
            {
              "index": 32,
              "actual": 97427.84,
              "predicted": 97865.91620177822,
              "residual": -438.07620177822537,
              "abs_error": 438.07620177822537,
              "pct_error": 0.44964170588019337,
              "rank": 10
            }
          ]
        },
        {
          "k": 5,
          "features": [
            "R&D Spend",
            "Administration",
            "Marketing Spend",
            "State_Florida",
            "State_New York"
          ],
          "rmse": 9055.957323204313,
          "mae": 6961.477813004758,
          "mse": 82010363.03969781,
          "r2": 0.8987266414385482,
          "adj_r2": 0.7721349432367335,
          "cv_rmse": 9991.808176840539,
          "cv_r2": 0.9340039511035654,
          "f_stat": 140.07459350755786,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 54028.03959405874,
              "stderr": 8457.293252904401,
              "tstat": 6.388337022073161,
              "pvalue": 2.7088901877192484e-07,
              "ci_lower": 36840.751817153985,
              "ci_upper": 71215.3273709635,
              "vif": null
            },
            {
              "feature": "R&D Spend",
              "coef": 0.8056300637569414,
              "stderr": 0.052371248757686596,
              "tstat": 15.383060035181956,
              "pvalue": 0.0,
              "ci_lower": 0.6991988810230204,
              "ci_upper": 0.9120612464908623,
              "vif": 2.6171974116238235
            },
            {
              "feature": "Administration",
              "coef": -0.06878788228413235,
              "stderr": 0.06073725881149117,
              "tstat": -1.1325483505541092,
              "pvalue": 0.26532799225056847,
              "ci_lower": -0.19222084301479447,
              "ci_upper": 0.05464507844652977,
              "vif": 1.1565116160578504
            },
            {
              "feature": "Marketing Spend",
              "coef": 0.02985544291038633,
              "stderr": 0.02217690134860859,
              "tstat": 1.3462405067811472,
              "pvalue": 0.18713248438625785,
              "ci_lower": -0.015213443089004172,
              "ci_upper": 0.07492432890977684,
              "vif": 2.698944569752321
            },
            {
              "feature": "State_Florida",
              "coef": 938.7930061484324,
              "stderr": 3893.5108846071807,
              "tstat": 0.24111734472347518,
              "pvalue": 0.8109123470733586,
              "ci_lower": -6973.773111063283,
              "ci_upper": 8851.359123360147,
              "vif": 1.4712431557724688
            },
            {
              "feature": "State_New York",
              "coef": 6.98775996697481,
              "stderr": 3882.7648769979482,
              "tstat": 0.0017996866120766916,
              "pvalue": 0.9985745767960641,
              "ci_lower": -7883.739842283791,
              "ci_upper": 7897.71536221774,
              "vif": 1.4108784071978522
            }
          ],
          "outliers": [
            {
              "index": 45,
              "actual": 64926.08,
              "predicted": 46357.460685380516,
              "residual": 18568.619314619486,
              "abs_error": 18568.619314619486,
              "pct_error": 28.59963101825874,
              "rank": 1
            },
            {
              "index": 48,
              "actual": 35673.41,
              "predicted": 50912.41741887497,
              "residual": -15239.007418874964,
              "abs_error": 15239.007418874964,
              "pct_error": 42.71811250697638,
              "rank": 2
            },
            {
              "index": 19,
              "actual": 122776.86,
              "predicted": 113097.4252472481,
              "residual": 9679.434752751898,
              "abs_error": 9679.434752751898,
              "pct_error": 7.883761445562216,
              "rank": 3
            },
            {
              "index": 13,
              "actual": 134307.35,
              "predicted": 126362.87908274363,
              "residual": 7944.470917256374,
              "abs_error": 7944.470917256374,
              "pct_error": 5.915142333801072,
              "rank": 4
            },
            {
              "index": 25,
              "actual": 107404.34,
              "predicted": 100643.2428169015,
              "residual": 6761.097183098493,
              "abs_error": 6761.097183098493,
              "pct_error": 6.294994395104046,
              "rank": 5
            },
            {
              "index": 26,
              "actual": 105733.54,
              "predicted": 109741.35032791576,
              "residual": -4007.810327915766,
              "abs_error": 4007.810327915766,
              "pct_error": 3.790481551942521,
              "rank": 6
            },
            {
              "index": 39,
              "actual": 81005.76,
              "predicted": 84608.45383562769,
              "residual": -3602.693835627695,
              "abs_error": 3602.693835627695,
              "pct_error": 4.447453904052867,
              "rank": 7
            },
            {
              "index": 17,
              "actual": 125370.37,
              "predicted": 128750.48288491672,
              "residual": -3380.112884916729,
              "abs_error": 3380.112884916729,
              "pct_error": 2.696101865948652,
              "rank": 8
            },
            {
              "index": 30,
              "actual": 99937.59,
              "predicted": 99677.49425253192,
              "residual": 260.0957474680763,
              "abs_error": 260.0957474680763,
              "pct_error": 0.26025817459484096,
              "rank": 9
            },
            {
              "index": 32,
              "actual": 97427.84,
              "predicted": 97599.2757475181,
              "residual": -171.4357475181023,
              "abs_error": 171.4357475181023,
              "pct_error": 0.17596176566995872,
              "rank": 10
            }
          ]
        }
      ],
      "LassoCV": [
        {
          "k": 1,
          "features": [
            "R&D Spend"
          ],
          "rmse": 7714.33489083019,
          "mae": 6077.363300620408,
          "mse": 59510962.80788003,
          "r2": 0.926510810934195,
          "adj_r2": 0.9173246623009693,
          "cv_rmse": 9943.871028684298,
          "cv_r2": 0.93837368355318,
          "f_stat": 676.1034669260162,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 49336.66803799112,
              "stderr": 2985.818740249927,
              "tstat": 16.52366480688021,
              "pvalue": 0.0,
              "ci_lower": 43292.19400573018,
              "ci_upper": 55381.142070252055,
              "vif": null
            },
            {
              "feature": "R&D Spend",
              "coef": 0.8536091075148804,
              "stderr": 0.03282860728228894,
              "tstat": 26.001989672446545,
              "pvalue": 0.0,
              "ci_lower": 0.7871510665232567,
              "ci_upper": 0.9200671485065041,
              "vif": 1.0
            }
          ],
          "outliers": [
            {
              "index": 45,
              "actual": 64926.08,
              "predicted": 50190.47347560073,
              "residual": 14735.60652439927,
              "abs_error": 14735.60652439927,
              "pct_error": 22.695974444166765,
              "rank": 1
            },
            {
              "index": 48,
              "actual": 35673.41,
              "predicted": 49799.36685471956,
              "residual": -14125.95685471956,
              "abs_error": 14125.95685471956,
              "pct_error": 39.597999896055796,
              "rank": 2
            },
            {
              "index": 26,
              "actual": 105733.54,
              "predicted": 113638.07752879556,
              "residual": -7904.5375287955685,
              "abs_error": 7904.5375287955685,
              "pct_error": 7.47590360522836,
              "rank": 3
            },
            {
              "index": 13,
              "actual": 134307.35,
              "predicted": 127862.20996405193,
              "residual": 6445.140035948076,
              "abs_error": 6445.140035948076,
              "pct_error": 4.798799198962734,
              "rank": 4
            },
            {
              "index": 32,
              "actual": 97427.84,
              "predicted": 103463.04843112713,
              "residual": -6035.208431127132,
              "abs_error": 6035.208431127132,
              "pct_error": 6.194541961647854,
              "rank": 5
            },
            {
              "index": 17,
              "actual": 125370.37,
              "predicted": 130136.88190548436,
              "residual": -4766.511905484367,
              "abs_error": 4766.511905484367,
              "pct_error": 3.8019445148677216,
              "rank": 6
            },
            {
              "index": 25,
              "actual": 107404.34,
              "predicted": 104535.05342879967,
              "residual": 2869.286571200326,
              "abs_error": 2869.286571200326,
              "pct_error": 2.671481032517239,
              "rank": 7
            },
            {
              "index": 30,
              "actual": 99937.59,
              "predicted": 102255.72078164022,
              "residual": -2318.130781640226,
              "abs_error": 2318.130781640226,
              "pct_error": 2.319578430538725,
              "rank": 8
            },
            {
              "index": 39,
              "actual": 81005.76,
              "predicted": 82250.56334619471,
              "residual": -1244.8033461947198,
              "abs_error": 1244.8033461947198,
              "pct_error": 1.536684979185085,
              "rank": 9
            },
            {
              "index": 19,
              "actual": 122776.86,
              "predicted": 123105.31102669484,
              "residual": -328.4510266948346,
              "abs_error": 328.4510266948346,
              "pct_error": 0.26751867305845306,
              "rank": 10
            }
          ]
        },
        {
          "k": 2,
          "features": [
            "R&D Spend",
            "Marketing Spend"
          ],
          "rmse": 8206.328813165856,
          "mae": 6469.1817214685925,
          "mse": 67343832.58979611,
          "r2": 0.9168381183550247,
          "adj_r2": 0.8930775807421746,
          "cv_rmse": 9682.556146428222,
          "cv_r2": 0.9415997343689557,
          "f_stat": 365.9781290116033,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 45542.392477514295,
              "stderr": 3457.2769574739023,
              "tstat": 13.172908343099694,
              "pvalue": 1.5543122344752192e-15,
              "ci_lower": 38537.28396367646,
              "ci_upper": 52547.50099135213,
              "vif": null
            },
            {
              "feature": "R&D Spend",
              "coef": 0.7833743148902914,
              "stderr": 0.04753512334490658,
              "tstat": 16.47990495798788,
              "pvalue": 0.0,
              "ci_lower": 0.6870590062396826,
              "ci_upper": 0.8796896235409002,
              "vif": 2.2576926919130162
            },
            {
              "feature": "Marketing Spend",
              "coef": 0.03923978714553167,
              "stderr": 0.01982183326614713,
              "tstat": 1.9796245190169994,
              "pvalue": 0.05522150412415483,
              "ci_lower": -0.0009230620217553151,
              "ci_upper": 0.07940263631281866,
              "vif": 2.2576926919130162
            }
          ],
          "outliers": [
            {
              "index": 45,
              "actual": 64926.08,
              "predicted": 46400.656776437005,
              "residual": 18525.423223562997,
              "abs_error": 18525.423223562997,
              "pct_error": 28.533099832244602,
              "rank": 1
            },
            {
              "index": 48,
              "actual": 35673.41,
              "predicted": 45967.020524900574,
              "residual": -10293.61052490057,
              "abs_error": 10293.61052490057,
              "pct_error": 28.855134748543996,
              "rank": 2
            },
            {
              "index": 19,
              "actual": 122776.86,
              "predicted": 113241.36575803881,
              "residual": 9535.49424196119,
              "abs_error": 9535.49424196119,
              "pct_error": 7.766523954075052,
              "rank": 3
            },
            {
              "index": 13,
              "actual": 134307.35,
              "predicted": 127521.38604122544,
              "residual": 6785.963958774562,
              "abs_error": 6785.963958774562,
              "pct_error": 5.0525633621499955,
              "rank": 4
            },
            {
              "index": 25,
              "actual": 107404.34,
              "predicted": 101612.68921418353,
              "residual": 5791.65078581647,
              "abs_error": 5791.65078581647,
              "pct_error": 5.392380592643155,
              "rank": 5
            },
            {
              "index": 17,
              "actual": 125370.37,
              "predicted": 130782.53611917047,
              "residual": -5412.166119170477,
              "abs_error": 5412.166119170477,
              "pct_error": 4.316941968960032,
              "rank": 6
            },
            {
              "index": 26,
              "actual": 105733.54,
              "predicted": 109813.19061886772,
              "residual": -4079.6506188677304,
              "abs_error": 4079.6506188677304,
              "pct_error": 3.8584262088148478,
              "rank": 7
            },
            {
              "index": 30,
              "actual": 99937.59,
              "predicted": 97683.24623440253,
              "residual": 2254.3437655974703,
              "abs_error": 2254.3437655974703,
              "pct_error": 2.2557515801586474,
              "rank": 8
            },
            {
              "index": 39,
              "actual": 81005.76,
              "predicted": 82615.07411457178,
              "residual": -1609.3141145717818,
              "abs_error": 1609.3141145717818,
              "pct_error": 1.9866662748078432,
              "rank": 9
            },
            {
              "index": 32,
              "actual": 97427.84,
              "predicted": 97023.64013853732,
              "residual": 404.1998614626791,
              "abs_error": 404.1998614626791,
              "pct_error": 0.41487100757101786,
              "rank": 10
            }
          ]
        },
        {
          "k": 3,
          "features": [
            "R&D Spend",
            "Administration",
            "Marketing Spend"
          ],
          "rmse": 8995.90580336141,
          "mae": 6979.15225237041,
          "mse": 80926321.22295149,
          "r2": 0.9000653083037322,
          "adj_r2": 0.8500979624555983,
          "cv_rmse": 9583.678887745895,
          "cv_r2": 0.9399392913746605,
          "f_stat": 246.5804298288131,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 54071.87574599093,
              "stderr": 8166.659947816364,
              "tstat": 6.6210514569605525,
              "pvalue": 1.0366753810941987e-07,
              "ci_lower": 37509.12169777724,
              "ci_upper": 70634.62979420462,
              "vif": null
            },
            {
              "feature": "R&D Spend",
              "coef": 0.8037792756297519,
              "stderr": 0.05053425022285619,
              "tstat": 15.905633745134894,
              "pvalue": 0.0,
              "ci_lower": 0.7012910659087324,
              "ci_upper": 0.9062674853507715,
              "vif": 2.574082735664086
            },
            {
              "feature": "Administration",
              "coef": -0.0679291740015,
              "stderr": 0.05898024198614502,
              "tstat": -1.1517276246078672,
              "pvalue": 0.2570246502646012,
              "ci_lower": -0.187546648949976,
              "ci_upper": 0.05168830094697599,
              "vif": 1.1520012494139669
            },
            {
              "feature": "Marketing Spend",
              "coef": 0.031241545897733203,
              "stderr": 0.020921171908633924,
              "tstat": 1.4932980826394424,
              "pvalue": 0.14407259551234275,
              "ci_lower": -0.011188557343647973,
              "ci_upper": 0.07367164913911438,
              "vif": 2.5372571088188756
            }
          ],
          "outliers": [
            {
              "index": 45,
              "actual": 64926.08,
              "predicted": 46501.70815035996,
              "residual": 18424.37184964004,
              "abs_error": 18424.37184964004,
              "pct_error": 28.37745918071758,
              "rank": 1
            },
            {
              "index": 48,
              "actual": 35673.41,
              "predicted": 50992.69486261032,
              "residual": -15319.284862610315,
              "abs_error": 15319.284862610315,
              "pct_error": 42.94314690580551,
              "rank": 2
            },
            {
              "index": 19,
              "actual": 122776.86,
              "predicted": 113106.15292225599,
              "residual": 9670.70707774401,
              "abs_error": 9670.70707774401,
              "pct_error": 7.87665287884379,
              "rank": 3
            },
            {
              "index": 13,
              "actual": 134307.35,
              "predicted": 126703.02716460769,
              "residual": 7604.322835392319,
              "abs_error": 7604.322835392319,
              "pct_error": 5.6618813753620465,
              "rank": 4
            },
            {
              "index": 25,
              "actual": 107404.34,
              "predicted": 100878.46414540126,
              "residual": 6525.875854598737,
              "abs_error": 6525.875854598737,
              "pct_error": 6.075988972697693,
              "rank": 5
            },
            {
              "index": 39,
              "actual": 81005.76,
              "predicted": 84894.75081555653,
              "residual": -3888.9908155565354,
              "abs_error": 3888.9908155565354,
              "pct_error": 4.800881833040682,
              "rank": 6
            },
            {
              "index": 17,
              "actual": 125370.37,
              "predicted": 129128.39734380922,
              "residual": -3758.0273438092263,
              "abs_error": 3758.0273438092263,
              "pct_error": 2.9975402830901965,
              "rank": 7
            },
            {
              "index": 26,
              "actual": 105733.54,
              "predicted": 109016.5536578013,
              "residual": -3283.0136578013044,
              "abs_error": 3283.0136578013044,
              "pct_error": 3.1049879326856025,
              "rank": 8
            },
            {
              "index": 30,
              "actual": 99937.59,
              "predicted": 98893.41815973523,
              "residual": 1044.1718402647675,
              "abs_error": 1044.1718402647675,
              "pct_error": 1.044823914870038,
              "rank": 9
            },
            {
              "index": 32,
              "actual": 97427.84,
              "predicted": 97700.59638628684,
              "residual": -272.756386286841,
              "abs_error": 272.756386286841,
              "pct_error": 0.2799573369242724,
              "rank": 10
            }
          ]
        },
        {
          "k": 4,
          "features": [
            "R&D Spend",
            "Administration",
            "Marketing Spend",
            "State_Florida"
          ],
          "rmse": 9055.957751980764,
          "mae": 6961.486845471396,
          "mse": 82010370.80566052,
          "r2": 0.8987266318484781,
          "adj_r2": 0.8177079373272607,
          "cv_rmse": 9786.25485264407,
          "cv_r2": 0.9376825880163018,
          "f_stat": 180.2430251126896,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 54029.885919142034,
              "stderr": 8274.043236367406,
              "tstat": 6.530046360123087,
              "pvalue": 1.55706110227527e-07,
              "ci_lower": 37232.68514630644,
              "ci_upper": 70827.08669197763,
              "vif": null
            },
            {
              "feature": "R&D Spend",
              "coef": 0.8056328218977674,
              "stderr": 0.051595562526277054,
              "tstat": 15.614381982703792,
              "pvalue": 0.0,
              "ci_lower": 0.7008882613506361,
              "ci_upper": 0.9103773824448987,
              "vif": 2.614956161907153
            },
            {
              "feature": "Administration",
              "coef": -0.06878374611887866,
              "stderr": 0.05982042630781345,
              "tstat": -1.1498371102362817,
              "pvalue": 0.2580073988885432,
              "ci_lower": -0.19022566783768613,
              "ci_upper": 0.052658175599928816,
              "vif": 1.1548556875468186
            },
            {
              "feature": "Marketing Spend",
              "coef": 0.029859723516622694,
              "stderr": 0.021731713809319115,
              "tstat": 1.3740160476353265,
              "pvalue": 0.17817276461084508,
              "ci_lower": -0.014258000982143505,
              "ci_upper": 0.07397744801538889,
              "vif": 2.667898335816746
            },
            {
              "feature": "State_Florida",
              "coef": 935.0793356301068,
              "stderr": 3254.2109708155003,
              "tstat": 0.28734441129235616,
              "pvalue": 0.7755430897333069,
              "ci_lower": -5671.320156421686,
              "ci_upper": 7541.478827681899,
              "vif": 1.0579914667760217
            }
          ],
          "outliers": [
            {
              "index": 45,
              "actual": 64926.08,
              "predicted": 46352.843676736855,
              "residual": 18573.236323263147,
              "abs_error": 18573.236323263147,
              "pct_error": 28.606742195529357,
              "rank": 1
            },
            {
              "index": 48,
              "actual": 35673.41,
              "predicted": 50907.49149726066,
              "residual": -15234.081497260653,
              "abs_error": 15234.081497260653,
              "pct_error": 42.70430412248409,
              "rank": 2
            },
            {
              "index": 19,
              "actual": 122776.86,
              "predicted": 113093.15712979491,
              "residual": 9683.702870205088,
              "abs_error": 9683.702870205088,
              "pct_error": 7.887237766306361,
              "rank": 3
            },
            {
              "index": 13,
              "actual": 134307.35,
              "predicted": 126366.62112486914,
              "residual": 7940.728875130866,
              "abs_error": 7940.728875130866,
              "pct_error": 5.912356155587066,
              "rank": 4
            },
            {
              "index": 25,
              "actual": 107404.34,
              "predicted": 100646.43527494444,
              "residual": 6757.9047250555595,
              "abs_error": 6757.9047250555595,
              "pct_error": 6.2920220216944305,
              "rank": 5
            },
            {
              "index": 26,
              "actual": 105733.54,
              "predicted": 109740.86073591035,
              "residual": -4007.3207359103544,
              "abs_error": 4007.3207359103544,
              "pct_error": 3.790018508706277,
              "rank": 6
            },
            {
              "index": 39,
              "actual": 81005.76,
              "predicted": 84611.49884124388,
              "residual": -3605.7388412438886,
              "abs_error": 3605.7388412438886,
              "pct_error": 4.45121290293911,
              "rank": 7
            },
            {
              "index": 17,
              "actual": 125370.37,
              "predicted": 128747.41218200963,
              "residual": -3377.042182009638,
              "abs_error": 3377.042182009638,
              "pct_error": 2.693652560816115,
              "rank": 8
            },
            {
              "index": 30,
              "actual": 99937.59,
              "predicted": 99676.66630500167,
              "residual": 260.9236949983315,
              "abs_error": 260.9236949983315,
              "pct_error": 0.2610866391698374,
              "rank": 9
            },
            {
              "index": 32,
              "actual": 97427.84,
              "predicted": 97602.02870963642,
              "residual": -174.18870963642257,
              "abs_error": 174.18870963642257,
              "pct_error": 0.1787874078255482,
              "rank": 10
            }
          ]
        },
        {
          "k": 5,
          "features": [
            "R&D Spend",
            "Administration",
            "Marketing Spend",
            "State_Florida",
            "State_New York"
          ],
          "rmse": 9055.957323204313,
          "mae": 6961.477813004758,
          "mse": 82010363.03969781,
          "r2": 0.8987266414385482,
          "adj_r2": 0.7721349432367335,
          "cv_rmse": 9991.808176840539,
          "cv_r2": 0.9340039511035654,
          "f_stat": 140.07459350755786,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 54028.03959405874,
              "stderr": 8457.293252904401,
              "tstat": 6.388337022073161,
              "pvalue": 2.7088901877192484e-07,
              "ci_lower": 36840.751817153985,
              "ci_upper": 71215.3273709635,
              "vif": null
            },
            {
              "feature": "R&D Spend",
              "coef": 0.8056300637569414,
              "stderr": 0.052371248757686596,
              "tstat": 15.383060035181956,
              "pvalue": 0.0,
              "ci_lower": 0.6991988810230204,
              "ci_upper": 0.9120612464908623,
              "vif": 2.6171974116238235
            },
            {
              "feature": "Administration",
              "coef": -0.06878788228413235,
              "stderr": 0.06073725881149117,
              "tstat": -1.1325483505541092,
              "pvalue": 0.26532799225056847,
              "ci_lower": -0.19222084301479447,
              "ci_upper": 0.05464507844652977,
              "vif": 1.1565116160578504
            },
            {
              "feature": "Marketing Spend",
              "coef": 0.02985544291038633,
              "stderr": 0.02217690134860859,
              "tstat": 1.3462405067811472,
              "pvalue": 0.18713248438625785,
              "ci_lower": -0.015213443089004172,
              "ci_upper": 0.07492432890977684,
              "vif": 2.698944569752321
            },
            {
              "feature": "State_Florida",
              "coef": 938.7930061484324,
              "stderr": 3893.5108846071807,
              "tstat": 0.24111734472347518,
              "pvalue": 0.8109123470733586,
              "ci_lower": -6973.773111063283,
              "ci_upper": 8851.359123360147,
              "vif": 1.4712431557724688
            },
            {
              "feature": "State_New York",
              "coef": 6.98775996697481,
              "stderr": 3882.7648769979482,
              "tstat": 0.0017996866120766916,
              "pvalue": 0.9985745767960641,
              "ci_lower": -7883.739842283791,
              "ci_upper": 7897.71536221774,
              "vif": 1.4108784071978522
            }
          ],
          "outliers": [
            {
              "index": 45,
              "actual": 64926.08,
              "predicted": 46357.460685380516,
              "residual": 18568.619314619486,
              "abs_error": 18568.619314619486,
              "pct_error": 28.59963101825874,
              "rank": 1
            },
            {
              "index": 48,
              "actual": 35673.41,
              "predicted": 50912.41741887497,
              "residual": -15239.007418874964,
              "abs_error": 15239.007418874964,
              "pct_error": 42.71811250697638,
              "rank": 2
            },
            {
              "index": 19,
              "actual": 122776.86,
              "predicted": 113097.4252472481,
              "residual": 9679.434752751898,
              "abs_error": 9679.434752751898,
              "pct_error": 7.883761445562216,
              "rank": 3
            },
            {
              "index": 13,
              "actual": 134307.35,
              "predicted": 126362.87908274363,
              "residual": 7944.470917256374,
              "abs_error": 7944.470917256374,
              "pct_error": 5.915142333801072,
              "rank": 4
            },
            {
              "index": 25,
              "actual": 107404.34,
              "predicted": 100643.2428169015,
              "residual": 6761.097183098493,
              "abs_error": 6761.097183098493,
              "pct_error": 6.294994395104046,
              "rank": 5
            },
            {
              "index": 26,
              "actual": 105733.54,
              "predicted": 109741.35032791576,
              "residual": -4007.810327915766,
              "abs_error": 4007.810327915766,
              "pct_error": 3.790481551942521,
              "rank": 6
            },
            {
              "index": 39,
              "actual": 81005.76,
              "predicted": 84608.45383562769,
              "residual": -3602.693835627695,
              "abs_error": 3602.693835627695,
              "pct_error": 4.447453904052867,
              "rank": 7
            },
            {
              "index": 17,
              "actual": 125370.37,
              "predicted": 128750.48288491672,
              "residual": -3380.112884916729,
              "abs_error": 3380.112884916729,
              "pct_error": 2.696101865948652,
              "rank": 8
            },
            {
              "index": 30,
              "actual": 99937.59,
              "predicted": 99677.49425253192,
              "residual": 260.0957474680763,
              "abs_error": 260.0957474680763,
              "pct_error": 0.26025817459484096,
              "rank": 9
            },
            {
              "index": 32,
              "actual": 97427.84,
              "predicted": 97599.2757475181,
              "residual": -171.4357475181023,
              "abs_error": 171.4357475181023,
              "pct_error": 0.17596176566995872,
              "rank": 10
            }
          ]
        }
      ],
      "Baseline OLS": [
        {
          "k": 1,
          "features": [
            "R&D Spend"
          ],
          "rmse": 7714.33489083019,
          "mae": 6077.363300620408,
          "mse": 59510962.80788003,
          "r2": 0.926510810934195,
          "adj_r2": 0.9173246623009693,
          "cv_rmse": 9943.871028684298,
          "cv_r2": 0.93837368355318,
          "f_stat": 676.1034669260162,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 49336.66803799112,
              "stderr": 2985.818740249927,
              "tstat": 16.52366480688021,
              "pvalue": 0.0,
              "ci_lower": 43292.19400573018,
              "ci_upper": 55381.142070252055,
              "vif": null
            },
            {
              "feature": "R&D Spend",
              "coef": 0.8536091075148804,
              "stderr": 0.03282860728228894,
              "tstat": 26.001989672446545,
              "pvalue": 0.0,
              "ci_lower": 0.7871510665232567,
              "ci_upper": 0.9200671485065041,
              "vif": 1.0
            }
          ],
          "outliers": [
            {
              "index": 45,
              "actual": 64926.08,
              "predicted": 50190.47347560073,
              "residual": 14735.60652439927,
              "abs_error": 14735.60652439927,
              "pct_error": 22.695974444166765,
              "rank": 1
            },
            {
              "index": 48,
              "actual": 35673.41,
              "predicted": 49799.36685471956,
              "residual": -14125.95685471956,
              "abs_error": 14125.95685471956,
              "pct_error": 39.597999896055796,
              "rank": 2
            },
            {
              "index": 26,
              "actual": 105733.54,
              "predicted": 113638.07752879556,
              "residual": -7904.5375287955685,
              "abs_error": 7904.5375287955685,
              "pct_error": 7.47590360522836,
              "rank": 3
            },
            {
              "index": 13,
              "actual": 134307.35,
              "predicted": 127862.20996405193,
              "residual": 6445.140035948076,
              "abs_error": 6445.140035948076,
              "pct_error": 4.798799198962734,
              "rank": 4
            },
            {
              "index": 32,
              "actual": 97427.84,
              "predicted": 103463.04843112713,
              "residual": -6035.208431127132,
              "abs_error": 6035.208431127132,
              "pct_error": 6.194541961647854,
              "rank": 5
            },
            {
              "index": 17,
              "actual": 125370.37,
              "predicted": 130136.88190548436,
              "residual": -4766.511905484367,
              "abs_error": 4766.511905484367,
              "pct_error": 3.8019445148677216,
              "rank": 6
            },
            {
              "index": 25,
              "actual": 107404.34,
              "predicted": 104535.05342879967,
              "residual": 2869.286571200326,
              "abs_error": 2869.286571200326,
              "pct_error": 2.671481032517239,
              "rank": 7
            },
            {
              "index": 30,
              "actual": 99937.59,
              "predicted": 102255.72078164022,
              "residual": -2318.130781640226,
              "abs_error": 2318.130781640226,
              "pct_error": 2.319578430538725,
              "rank": 8
            },
            {
              "index": 39,
              "actual": 81005.76,
              "predicted": 82250.56334619471,
              "residual": -1244.8033461947198,
              "abs_error": 1244.8033461947198,
              "pct_error": 1.536684979185085,
              "rank": 9
            },
            {
              "index": 19,
              "actual": 122776.86,
              "predicted": 123105.31102669484,
              "residual": -328.4510266948346,
              "abs_error": 328.4510266948346,
              "pct_error": 0.26751867305845306,
              "rank": 10
            }
          ]
        },
        {
          "k": 2,
          "features": [
            "R&D Spend",
            "Marketing Spend"
          ],
          "rmse": 8206.328813165856,
          "mae": 6469.1817214685925,
          "mse": 67343832.58979611,
          "r2": 0.9168381183550247,
          "adj_r2": 0.8930775807421746,
          "cv_rmse": 9682.556146428222,
          "cv_r2": 0.9415997343689557,
          "f_stat": 365.9781290116033,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 45542.392477514295,
              "stderr": 3457.2769574739023,
              "tstat": 13.172908343099694,
              "pvalue": 1.5543122344752192e-15,
              "ci_lower": 38537.28396367646,
              "ci_upper": 52547.50099135213,
              "vif": null
            },
            {
              "feature": "R&D Spend",
              "coef": 0.7833743148902914,
              "stderr": 0.04753512334490658,
              "tstat": 16.47990495798788,
              "pvalue": 0.0,
              "ci_lower": 0.6870590062396826,
              "ci_upper": 0.8796896235409002,
              "vif": 2.2576926919130162
            },
            {
              "feature": "Marketing Spend",
              "coef": 0.03923978714553167,
              "stderr": 0.01982183326614713,
              "tstat": 1.9796245190169994,
              "pvalue": 0.05522150412415483,
              "ci_lower": -0.0009230620217553151,
              "ci_upper": 0.07940263631281866,
              "vif": 2.2576926919130162
            }
          ],
          "outliers": [
            {
              "index": 45,
              "actual": 64926.08,
              "predicted": 46400.656776437005,
              "residual": 18525.423223562997,
              "abs_error": 18525.423223562997,
              "pct_error": 28.533099832244602,
              "rank": 1
            },
            {
              "index": 48,
              "actual": 35673.41,
              "predicted": 45967.020524900574,
              "residual": -10293.61052490057,
              "abs_error": 10293.61052490057,
              "pct_error": 28.855134748543996,
              "rank": 2
            },
            {
              "index": 19,
              "actual": 122776.86,
              "predicted": 113241.36575803881,
              "residual": 9535.49424196119,
              "abs_error": 9535.49424196119,
              "pct_error": 7.766523954075052,
              "rank": 3
            },
            {
              "index": 13,
              "actual": 134307.35,
              "predicted": 127521.38604122544,
              "residual": 6785.963958774562,
              "abs_error": 6785.963958774562,
              "pct_error": 5.0525633621499955,
              "rank": 4
            },
            {
              "index": 25,
              "actual": 107404.34,
              "predicted": 101612.68921418353,
              "residual": 5791.65078581647,
              "abs_error": 5791.65078581647,
              "pct_error": 5.392380592643155,
              "rank": 5
            },
            {
              "index": 17,
              "actual": 125370.37,
              "predicted": 130782.53611917047,
              "residual": -5412.166119170477,
              "abs_error": 5412.166119170477,
              "pct_error": 4.316941968960032,
              "rank": 6
            },
            {
              "index": 26,
              "actual": 105733.54,
              "predicted": 109813.19061886772,
              "residual": -4079.6506188677304,
              "abs_error": 4079.6506188677304,
              "pct_error": 3.8584262088148478,
              "rank": 7
            },
            {
              "index": 30,
              "actual": 99937.59,
              "predicted": 97683.24623440253,
              "residual": 2254.3437655974703,
              "abs_error": 2254.3437655974703,
              "pct_error": 2.2557515801586474,
              "rank": 8
            },
            {
              "index": 39,
              "actual": 81005.76,
              "predicted": 82615.07411457178,
              "residual": -1609.3141145717818,
              "abs_error": 1609.3141145717818,
              "pct_error": 1.9866662748078432,
              "rank": 9
            },
            {
              "index": 32,
              "actual": 97427.84,
              "predicted": 97023.64013853732,
              "residual": 404.1998614626791,
              "abs_error": 404.1998614626791,
              "pct_error": 0.41487100757101786,
              "rank": 10
            }
          ]
        },
        {
          "k": 3,
          "features": [
            "R&D Spend",
            "Marketing Spend",
            "Administration"
          ],
          "rmse": 8995.905803361398,
          "mae": 6979.152252370399,
          "mse": 80926321.2229513,
          "r2": 0.9000653083037324,
          "adj_r2": 0.8500979624555987,
          "cv_rmse": 9583.67888774589,
          "cv_r2": 0.9399392913746605,
          "f_stat": 246.5804298288131,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 54071.875745990925,
              "stderr": 8166.659947816376,
              "tstat": 6.621051456960543,
              "pvalue": 1.0366753810941987e-07,
              "ci_lower": 37509.12169777721,
              "ci_upper": 70634.62979420464,
              "vif": null
            },
            {
              "feature": "R&D Spend",
              "coef": 0.8037792756297519,
              "stderr": 0.050534250222856215,
              "tstat": 15.905633745134885,
              "pvalue": 0.0,
              "ci_lower": 0.7012910659087322,
              "ci_upper": 0.9062674853507716,
              "vif": 2.574082735664086
            },
            {
              "feature": "Marketing Spend",
              "coef": 0.03124154589773298,
              "stderr": 0.020921171908633938,
              "tstat": 1.4932980826394309,
              "pvalue": 0.14407259551234564,
              "ci_lower": -0.011188557343648223,
              "ci_upper": 0.07367164913911418,
              "vif": 2.5372571088188756
            },
            {
              "feature": "Administration",
              "coef": -0.06792917400149967,
              "stderr": 0.0589802419861451,
              "tstat": -1.15172762460786,
              "pvalue": 0.25702465026460386,
              "ci_lower": -0.1875466489499758,
              "ci_upper": 0.051688300946976476,
              "vif": 1.1520012494139669
            }
          ],
          "outliers": [
            {
              "index": 45,
              "actual": 64926.08,
              "predicted": 46501.70815036,
              "residual": 18424.371849640003,
              "abs_error": 18424.371849640003,
              "pct_error": 28.377459180717523,
              "rank": 1
            },
            {
              "index": 48,
              "actual": 35673.41,
              "predicted": 50992.69486261033,
              "residual": -15319.28486261033,
              "abs_error": 15319.28486261033,
              "pct_error": 42.94314690580555,
              "rank": 2
            },
            {
              "index": 19,
              "actual": 122776.86,
              "predicted": 113106.15292225603,
              "residual": 9670.707077743966,
              "abs_error": 9670.707077743966,
              "pct_error": 7.876652878843754,
              "rank": 3
            },
            {
              "index": 13,
              "actual": 134307.35,
              "predicted": 126703.02716460767,
              "residual": 7604.322835392333,
              "abs_error": 7604.322835392333,
              "pct_error": 5.661881375362058,
              "rank": 4
            },
            {
              "index": 25,
              "actual": 107404.34,
              "predicted": 100878.46414540126,
              "residual": 6525.875854598737,
              "abs_error": 6525.875854598737,
              "pct_error": 6.075988972697693,
              "rank": 5
            },
            {
              "index": 39,
              "actual": 81005.76,
              "predicted": 84894.7508155565,
              "residual": -3888.9908155565063,
              "abs_error": 3888.9908155565063,
              "pct_error": 4.800881833040646,
              "rank": 6
            },
            {
              "index": 17,
              "actual": 125370.37,
              "predicted": 129128.39734380919,
              "residual": -3758.027343809197,
              "abs_error": 3758.027343809197,
              "pct_error": 2.997540283090173,
              "rank": 7
            },
            {
              "index": 26,
              "actual": 105733.54,
              "predicted": 109016.55365780131,
              "residual": -3283.013657801319,
              "abs_error": 3283.013657801319,
              "pct_error": 3.1049879326856162,
              "rank": 8
            },
            {
              "index": 30,
              "actual": 99937.59,
              "predicted": 98893.41815973524,
              "residual": 1044.171840264753,
              "abs_error": 1044.171840264753,
              "pct_error": 1.0448239148700234,
              "rank": 9
            },
            {
              "index": 32,
              "actual": 97427.84,
              "predicted": 97700.59638628684,
              "residual": -272.756386286841,
              "abs_error": 272.756386286841,
              "pct_error": 0.2799573369242724,
              "rank": 10
            }
          ]
        },
        {
          "k": 4,
          "features": [
            "R&D Spend",
            "Marketing Spend",
            "Administration",
            "State_Florida"
          ],
          "rmse": 9055.957751980764,
          "mae": 6961.486845471396,
          "mse": 82010370.80566052,
          "r2": 0.8987266318484781,
          "adj_r2": 0.8177079373272607,
          "cv_rmse": 9786.254852644071,
          "cv_r2": 0.9376825880163018,
          "f_stat": 180.2430251126896,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 54029.88591914198,
              "stderr": 8274.043236367414,
              "tstat": 6.530046360123076,
              "pvalue": 1.55706110227527e-07,
              "ci_lower": 37232.68514630637,
              "ci_upper": 70827.0866919776,
              "vif": null
            },
            {
              "feature": "R&D Spend",
              "coef": 0.8056328218977681,
              "stderr": 0.05159556252627707,
              "tstat": 15.6143819827038,
              "pvalue": 0.0,
              "ci_lower": 0.7008882613506368,
              "ci_upper": 0.9103773824448994,
              "vif": 2.614956161907153
            },
            {
              "feature": "Marketing Spend",
              "coef": 0.029859723516622694,
              "stderr": 0.021731713809319125,
              "tstat": 1.3740160476353258,
              "pvalue": 0.1781727646108453,
              "ci_lower": -0.014258000982143526,
              "ci_upper": 0.07397744801538891,
              "vif": 2.667898335816746
            },
            {
              "feature": "Administration",
              "coef": -0.06878374611887855,
              "stderr": 0.059820426307813514,
              "tstat": -1.1498371102362788,
              "pvalue": 0.2580073988885445,
              "ci_lower": -0.19022566783768616,
              "ci_upper": 0.05265817559992905,
              "vif": 1.1548556875468186
            },
            {
              "feature": "State_Florida",
              "coef": 935.0793356301035,
              "stderr": 3254.2109708155003,
              "tstat": 0.28734441129235516,
              "pvalue": 0.7755430897333075,
              "ci_lower": -5671.320156421689,
              "ci_upper": 7541.478827681896,
              "vif": 1.0579914667760217
            }
          ],
          "outliers": [
            {
              "index": 45,
              "actual": 64926.08,
              "predicted": 46352.84367673682,
              "residual": 18573.236323263183,
              "abs_error": 18573.236323263183,
              "pct_error": 28.60674219552941,
              "rank": 1
            },
            {
              "index": 48,
              "actual": 35673.41,
              "predicted": 50907.49149726062,
              "residual": -15234.081497260617,
              "abs_error": 15234.081497260617,
              "pct_error": 42.70430412248399,
              "rank": 2
            },
            {
              "index": 19,
              "actual": 122776.86,
              "predicted": 113093.15712979494,
              "residual": 9683.70287020506,
              "abs_error": 9683.70287020506,
              "pct_error": 7.887237766306337,
              "rank": 3
            },
            {
              "index": 13,
              "actual": 134307.35,
              "predicted": 126366.62112486915,
              "residual": 7940.7288751308515,
              "abs_error": 7940.7288751308515,
              "pct_error": 5.912356155587055,
              "rank": 4
            },
            {
              "index": 25,
              "actual": 107404.34,
              "predicted": 100646.43527494444,
              "residual": 6757.9047250555595,
              "abs_error": 6757.9047250555595,
              "pct_error": 6.2920220216944305,
              "rank": 5
            },
            {
              "index": 26,
              "actual": 105733.54,
              "predicted": 109740.86073591036,
              "residual": -4007.320735910369,
              "abs_error": 4007.320735910369,
              "pct_error": 3.7900185087062908,
              "rank": 6
            },
            {
              "index": 39,
              "actual": 81005.76,
              "predicted": 84611.49884124387,
              "residual": -3605.738841243874,
              "abs_error": 3605.738841243874,
              "pct_error": 4.451212902939092,
              "rank": 7
            },
            {
              "index": 17,
              "actual": 125370.37,
              "predicted": 128747.41218200968,
              "residual": -3377.0421820096817,
              "abs_error": 3377.0421820096817,
              "pct_error": 2.6936525608161497,
              "rank": 8
            },
            {
              "index": 30,
              "actual": 99937.59,
              "predicted": 99676.66630500167,
              "residual": 260.9236949983315,
              "abs_error": 260.9236949983315,
              "pct_error": 0.2610866391698374,
              "rank": 9
            },
            {
              "index": 32,
              "actual": 97427.84,
              "predicted": 97602.02870963643,
              "residual": -174.18870963643712,
              "abs_error": 174.18870963643712,
              "pct_error": 0.17878740782556315,
              "rank": 10
            }
          ]
        },
        {
          "k": 5,
          "features": [
            "R&D Spend",
            "Administration",
            "Marketing Spend",
            "State_Florida",
            "State_New York"
          ],
          "rmse": 9055.957323204313,
          "mae": 6961.477813004758,
          "mse": 82010363.03969781,
          "r2": 0.8987266414385482,
          "adj_r2": 0.7721349432367335,
          "cv_rmse": 9991.808176840539,
          "cv_r2": 0.9340039511035654,
          "f_stat": 140.07459350755786,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 54028.03959405874,
              "stderr": 8457.293252904401,
              "tstat": 6.388337022073161,
              "pvalue": 2.7088901877192484e-07,
              "ci_lower": 36840.751817153985,
              "ci_upper": 71215.3273709635,
              "vif": null
            },
            {
              "feature": "R&D Spend",
              "coef": 0.8056300637569414,
              "stderr": 0.052371248757686596,
              "tstat": 15.383060035181956,
              "pvalue": 0.0,
              "ci_lower": 0.6991988810230204,
              "ci_upper": 0.9120612464908623,
              "vif": 2.6171974116238235
            },
            {
              "feature": "Administration",
              "coef": -0.06878788228413235,
              "stderr": 0.06073725881149117,
              "tstat": -1.1325483505541092,
              "pvalue": 0.26532799225056847,
              "ci_lower": -0.19222084301479447,
              "ci_upper": 0.05464507844652977,
              "vif": 1.1565116160578504
            },
            {
              "feature": "Marketing Spend",
              "coef": 0.02985544291038633,
              "stderr": 0.02217690134860859,
              "tstat": 1.3462405067811472,
              "pvalue": 0.18713248438625785,
              "ci_lower": -0.015213443089004172,
              "ci_upper": 0.07492432890977684,
              "vif": 2.698944569752321
            },
            {
              "feature": "State_Florida",
              "coef": 938.7930061484324,
              "stderr": 3893.5108846071807,
              "tstat": 0.24111734472347518,
              "pvalue": 0.8109123470733586,
              "ci_lower": -6973.773111063283,
              "ci_upper": 8851.359123360147,
              "vif": 1.4712431557724688
            },
            {
              "feature": "State_New York",
              "coef": 6.98775996697481,
              "stderr": 3882.7648769979482,
              "tstat": 0.0017996866120766916,
              "pvalue": 0.9985745767960641,
              "ci_lower": -7883.739842283791,
              "ci_upper": 7897.71536221774,
              "vif": 1.4108784071978522
            }
          ],
          "outliers": [
            {
              "index": 45,
              "actual": 64926.08,
              "predicted": 46357.460685380516,
              "residual": 18568.619314619486,
              "abs_error": 18568.619314619486,
              "pct_error": 28.59963101825874,
              "rank": 1
            },
            {
              "index": 48,
              "actual": 35673.41,
              "predicted": 50912.41741887497,
              "residual": -15239.007418874964,
              "abs_error": 15239.007418874964,
              "pct_error": 42.71811250697638,
              "rank": 2
            },
            {
              "index": 19,
              "actual": 122776.86,
              "predicted": 113097.4252472481,
              "residual": 9679.434752751898,
              "abs_error": 9679.434752751898,
              "pct_error": 7.883761445562216,
              "rank": 3
            },
            {
              "index": 13,
              "actual": 134307.35,
              "predicted": 126362.87908274363,
              "residual": 7944.470917256374,
              "abs_error": 7944.470917256374,
              "pct_error": 5.915142333801072,
              "rank": 4
            },
            {
              "index": 25,
              "actual": 107404.34,
              "predicted": 100643.2428169015,
              "residual": 6761.097183098493,
              "abs_error": 6761.097183098493,
              "pct_error": 6.294994395104046,
              "rank": 5
            },
            {
              "index": 26,
              "actual": 105733.54,
              "predicted": 109741.35032791576,
              "residual": -4007.810327915766,
              "abs_error": 4007.810327915766,
              "pct_error": 3.790481551942521,
              "rank": 6
            },
            {
              "index": 39,
              "actual": 81005.76,
              "predicted": 84608.45383562769,
              "residual": -3602.693835627695,
              "abs_error": 3602.693835627695,
              "pct_error": 4.447453904052867,
              "rank": 7
            },
            {
              "index": 17,
              "actual": 125370.37,
              "predicted": 128750.48288491672,
              "residual": -3380.112884916729,
              "abs_error": 3380.112884916729,
              "pct_error": 2.696101865948652,
              "rank": 8
            },
            {
              "index": 30,
              "actual": 99937.59,
              "predicted": 99677.49425253192,
              "residual": 260.0957474680763,
              "abs_error": 260.0957474680763,
              "pct_error": 0.26025817459484096,
              "rank": 9
            },
            {
              "index": 32,
              "actual": 97427.84,
              "predicted": 97599.2757475181,
              "residual": -171.4357475181023,
              "abs_error": 171.4357475181023,
              "pct_error": 0.17596176566995872,
              "rank": 10
            }
          ]
        }
      ]
    },
    "metadata": {
      "n_samples_total": 50,
      "n_train": 40,
      "n_test": 10,
      "test_size": 0.2,
      "cv_folds": 5,
      "random_state": 42,
      "reference_state": "California",
      "dummy_states": [
        "State_Florida",
        "State_New York"
      ],
      "all_features": [
        "R&D Spend",
        "Administration",
        "Marketing Spend",
        "State_Florida",
        "State_New York"
      ],
      "sweet_spot": {
        "k": 2,
        "method": "Pearson Correlation",
        "features": [
          "R&D Spend",
          "Marketing Spend"
        ],
        "cv_rmse": 9682.556,
        "test_rmse": 8206.329,
        "test_r2": 0.9168
      }
    },
    "final_model_comparison": [
      {
        "Method": "Baseline Linear Regression",
        "Optimal Number of Features": 5,
        "Selected Features": "R&D Spend, Administration, Marketing Spend, State_Florida, State_New York",
        "MAE": 6961.477813252383,
        "MSE": 82010363.04430108,
        "RMSE": 9055.95732345847,
        "R\u00b2": 0.8987266414328636
      },
      {
        "Method": "Pearson Correlation",
        "Optimal Number of Features": 2,
        "Selected Features": "R&D Spend, Marketing Spend",
        "MAE": 6469.181721468586,
        "MSE": 67343832.58979604,
        "RMSE": 8206.32881316585,
        "R\u00b2": 0.9168381183550247
      },
      {
        "Method": "F-test",
        "Optimal Number of Features": 2,
        "Selected Features": "R&D Spend, Marketing Spend",
        "MAE": 6469.181721468586,
        "MSE": 67343832.58979604,
        "RMSE": 8206.32881316585,
        "R\u00b2": 0.9168381183550247
      },
      {
        "Method": "LassoCV",
        "Optimal Number of Features": 3,
        "Selected Features": "R&D Spend, Administration, Marketing Spend",
        "MAE": 6703.602639833637,
        "MSE": 71864209.00964227,
        "RMSE": 8477.276037126683,
        "R\u00b2": 0.9112559737938768
      },
      {
        "Method": "RFECV",
        "Optimal Number of Features": 3,
        "Selected Features": "R&D Spend, Administration, Marketing Spend",
        "MAE": 6979.152252370404,
        "MSE": 80926321.22295167,
        "RMSE": 8995.90580336142,
        "R\u00b2": 0.900065308303732
      },
      {
        "Method": "Exhaustive Feature Selection",
        "Optimal Number of Features": 3,
        "Selected Features": "R&D Spend, Administration, Marketing Spend",
        "MAE": 6979.152252370404,
        "MSE": 80926321.22295167,
        "RMSE": 8995.90580336142,
        "R\u00b2": 0.900065308303732
      }
    ]
  },
  "boston_housing": {
    "key": "boston_housing",
    "name": "Boston Housing",
    "target_name": "MEDV (Median Value in $1,000s)",
    "target_unit": "$1k",
    "description": "Boston Housing dataset predicting median home values across 13 socioeconomic, environmental, and structural predictors. Optimal subset balances RM, LSTAT, and PTRATIO.",
    "badge_optimal": "k = 7 \u2605 Optimal Sweet Spot",
    "badge_overfitting": "k = 13 \u26a0 Full Model",
    "k_labels": [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13"
    ],
    "default_k": 7,
    "sweet_spot_k": 7,
    "overfitting_k": 13,
    "features": [
      "CRIM",
      "ZN",
      "INDUS",
      "CHAS",
      "NOX",
      "RM",
      "AGE",
      "DIS",
      "RAD",
      "TAX",
      "PTRATIO",
      "B",
      "LSTAT"
    ],
    "predictor_features": [
      {
        "id": "numRM",
        "sliderId": "rangeRM",
        "labelId": "labelRM",
        "name": "RM (Average Rooms per Dwelling)",
        "feature": "RM",
        "min": 3.0,
        "max": 9.0,
        "step": 0.1,
        "default": 6.28,
        "prefix": ""
      },
      {
        "id": "numLSTAT",
        "sliderId": "rangeLSTAT",
        "labelId": "labelLSTAT",
        "name": "LSTAT (% Lower Status Population)",
        "feature": "LSTAT",
        "min": 1.0,
        "max": 40.0,
        "step": 0.5,
        "default": 12.65,
        "prefix": ""
      },
      {
        "id": "numPTRATIO",
        "sliderId": "rangePTRATIO",
        "labelId": "labelPTRATIO",
        "name": "PTRATIO (Pupil-Teacher Ratio)",
        "feature": "PTRATIO",
        "min": 12.0,
        "max": 23.0,
        "step": 0.1,
        "default": 18.45,
        "prefix": ""
      },
      {
        "id": "numCRIM",
        "sliderId": "rangeCRIM",
        "labelId": "labelCRIM",
        "name": "CRIM (Per Capita Crime Rate)",
        "feature": "CRIM",
        "min": 0.0,
        "max": 90.0,
        "step": 0.1,
        "default": 3.61,
        "prefix": ""
      },
      {
        "id": "numDIS",
        "sliderId": "rangeDIS",
        "labelId": "labelDIS",
        "name": "DIS (Weighted Distance to Employment)",
        "feature": "DIS",
        "min": 1.0,
        "max": 13.0,
        "step": 0.1,
        "default": 3.79,
        "prefix": ""
      },
      {
        "id": "numNOX",
        "sliderId": "rangeNOX",
        "labelId": "labelNOX",
        "name": "NOX (Nitric Oxides Concentration)",
        "feature": "NOX",
        "min": 0.3,
        "max": 0.9,
        "step": 0.01,
        "default": 0.55,
        "prefix": ""
      },
      {
        "id": "numTAX",
        "sliderId": "rangeTAX",
        "labelId": "labelTAX",
        "name": "TAX (Property-Tax Rate per $10k)",
        "feature": "TAX",
        "min": 180,
        "max": 720,
        "step": 10,
        "default": 408,
        "prefix": ""
      }
    ],
    "categorical": null,
    "images": {
      "correlation": "results/correlation_heatmap_boston.png",
      "consensus": "results/figure4_selected_features_heatmap_boston.png",
      "comparison": "results/figure3_final_model_comparison_boston.png"
    },
    "image_descriptions": {
      "correlation": "Shows strong negative correlation between <strong>LSTAT and MEDV (r = -0.74)</strong> and strong positive correlation with RM (r = 0.70). PTRATIO, INDUS, and TAX also exhibit strong negative associations with housing prices.",
      "consensus": "Compares feature selection consensus on Boston Housing across all 6 methods. Notice that <strong>RM, LSTAT, and PTRATIO are unanimously selected</strong> by all parsimonious models as core housing price determinants.",
      "comparison": "Dual-bar visualization contrasting Test RMSE ($1,000s) (indigo) and Test R\u00b2 (emerald). Parsimonious feature selection achieves Test RMSE of $4.90k and R\u00b2 of 0.6727."
    },
    "model_data": {
      "Pearson Correlation": [
        {
          "k": 1,
          "features": [
            "LSTAT"
          ],
          "rmse": 5.789606996393182,
          "mae": 4.184807930623362,
          "mse": 33.51954917268489,
          "r2": 0.5429180422970386,
          "adj_r2": 0.538347222720009,
          "cv_rmse": 6.332558301047439,
          "cv_r2": 0.5428147541494676,
          "f_stat": 476.33924982804336,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 34.83694982031851,
              "stderr": 0.6350210267842641,
              "tstat": 54.859521733842804,
              "pvalue": 0.0,
              "ci_lower": 33.588572993959744,
              "ci_upper": 36.085326646677274,
              "vif": null
            },
            {
              "feature": "LSTAT",
              "coef": -0.9665309019503531,
              "stderr": 0.044285092860186184,
              "tstat": -21.825197589667866,
              "pvalue": 0.0,
              "ci_lower": -1.0535901981751759,
              "ci_upper": -0.8794716057255303,
              "vif": 1.0
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 25.625910324731645,
              "residual": 24.374089675268355,
              "abs_error": 24.374089675268355,
              "pct_error": 48.74817935053671,
              "rank": 1
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 31.96635304152596,
              "residual": 18.03364695847404,
              "abs_error": 18.03364695847404,
              "pct_error": 36.06729391694808,
              "rank": 2
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 32.05334082270149,
              "residual": 17.946659177298507,
              "abs_error": 17.946659177298507,
              "pct_error": 35.893318354597014,
              "rank": 3
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 31.154467083887663,
              "residual": 17.345532916112337,
              "abs_error": 17.345532916112337,
              "pct_error": 35.76398539404605,
              "rank": 4
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": 1.6172827202848765,
              "residual": 16.282717279715122,
              "abs_error": 16.282717279715122,
              "pct_error": 90.9649010039951,
              "rank": 5
            },
            {
              "index": 268,
              "actual": 43.5,
              "predicted": 31.782712170155392,
              "residual": 11.717287829844608,
              "abs_error": 11.717287829844608,
              "pct_error": 26.93629386171174,
              "rank": 6
            },
            {
              "index": 355,
              "actual": 20.6,
              "predicted": 29.45337269645504,
              "residual": -8.85337269645504,
              "abs_error": 8.85337269645504,
              "pct_error": 42.977537361432226,
              "rank": 7
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -0.9053629338055416,
              "residual": 7.905362933805542,
              "abs_error": 7.905362933805542,
              "pct_error": 112.93375619722201,
              "rank": 8
            },
            {
              "index": 408,
              "actual": 17.2,
              "predicted": 9.320534008829188,
              "residual": 7.879465991170811,
              "abs_error": 7.879465991170811,
              "pct_error": 45.810848785876814,
              "rank": 9
            },
            {
              "index": 436,
              "actual": 9.6,
              "predicted": 17.391067040114635,
              "residual": -7.791067040114635,
              "abs_error": 7.791067040114635,
              "pct_error": 81.15694833452746,
              "rank": 10
            }
          ]
        },
        {
          "k": 2,
          "features": [
            "LSTAT",
            "RM"
          ],
          "rmse": 5.589569804715173,
          "mae": 3.898759721382362,
          "mse": 31.243290601783617,
          "r2": 0.573957741502586,
          "adj_r2": 0.5653508271895069,
          "cv_rmse": 5.583527948544508,
          "cv_r2": 0.6359466638068296,
          "f_stat": 372.61794090137715,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": -3.8411770790048383,
              "stderr": 3.5229849736559067,
              "tstat": -1.0903188937018753,
              "pvalue": 0.2762274312067523,
              "ci_lower": -10.76700430913337,
              "ci_upper": 3.084650151123692,
              "vif": null
            },
            {
              "feature": "LSTAT",
              "coef": -0.6324985627075881,
              "stderr": 0.04904544343244726,
              "tstat": -12.89617380213434,
              "pvalue": 0.0,
              "ci_lower": -0.7289168756377382,
              "ci_upper": -0.536080249777438,
              "vif": 1.600640940207779
            },
            {
              "feature": "RM",
              "coef": 5.4650987730758604,
              "stderr": 0.4915510985577764,
              "tstat": 11.118068475710055,
              "pvalue": 0.0,
              "ci_lower": 4.498759714337782,
              "ci_upper": 6.4314378318139385,
              "vif": 1.6006409402077786
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 24.1021655918314,
              "residual": 25.8978344081686,
              "abs_error": 25.8978344081686,
              "pct_error": 51.79566881633719,
              "rank": 1
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": -0.28767555746955153,
              "residual": 18.18767555746955,
              "abs_error": 18.18767555746955,
              "pct_error": 101.60712601938297,
              "rank": 2
            },
            {
              "index": 365,
              "actual": 27.5,
              "predicted": 11.116649885440271,
              "residual": 16.38335011455973,
              "abs_error": 16.38335011455973,
              "pct_error": 59.57581859839901,
              "rank": 3
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 37.31795502772603,
              "residual": 12.682044972273971,
              "abs_error": 12.682044972273971,
              "pct_error": 25.364089944547942,
              "rank": 4
            },
            {
              "index": 375,
              "actual": 15.0,
              "predicted": 27.62430956570894,
              "residual": -12.624309565708941,
              "abs_error": 12.624309565708941,
              "pct_error": 84.16206377139294,
              "rank": 5
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 36.66642406204398,
              "residual": 11.83357593795602,
              "abs_error": 11.83357593795602,
              "pct_error": 24.399125645270146,
              "rank": 6
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 38.24383060328878,
              "residual": 11.756169396711222,
              "abs_error": 11.756169396711222,
              "pct_error": 23.512338793422444,
              "rank": 7
            },
            {
              "index": 436,
              "actual": 9.6,
              "predicted": 20.052227036966336,
              "residual": -10.452227036966336,
              "abs_error": 10.452227036966336,
              "pct_error": 108.87736496839935,
              "rank": 8
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -2.534192572401629,
              "residual": 9.53419257240163,
              "abs_error": 9.53419257240163,
              "pct_error": 136.202751034309,
              "rank": 9
            },
            {
              "index": 209,
              "actual": 20.0,
              "predicted": 10.759918951394354,
              "residual": 9.240081048605646,
              "abs_error": 9.240081048605646,
              "pct_error": 46.20040524302823,
              "rank": 10
            }
          ]
        },
        {
          "k": 3,
          "features": [
            "LSTAT",
            "RM",
            "PTRATIO"
          ],
          "rmse": 5.207202455789533,
          "mae": 3.3325380783241023,
          "mse": 27.114957415580545,
          "r2": 0.6302528487272832,
          "adj_r2": 0.6189340583822001,
          "cv_rmse": 5.335324974716855,
          "cv_r2": 0.6677558712662522,
          "f_stat": 291.91356322846076,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 14.588099261571113,
              "stderr": 4.29955072031452,
              "tstat": 3.392935729922955,
              "pvalue": 0.0007604665622396034,
              "ci_lower": 6.13555943016398,
              "ci_upper": 23.040639092978246,
              "vif": null
            },
            {
              "feature": "LSTAT",
              "coef": -0.567125882738386,
              "stderr": 0.04747167069939089,
              "tstat": -11.946617306343567,
              "pvalue": 0.0,
              "ci_lower": -0.6604510261200396,
              "ci_upper": -0.4738007393567325,
              "vif": 1.6689911381361469
            },
            {
              "feature": "RM",
              "coef": 4.933118359418629,
              "stderr": 0.47244696667464253,
              "tstat": 10.44163410369802,
              "pvalue": 0.0,
              "ci_lower": 4.004329036111665,
              "ci_upper": 5.861907682725594,
              "vif": 1.6457016960613688
            },
            {
              "feature": "PTRATIO",
              "coef": -0.867094754623303,
              "stderr": 0.1274229510720028,
              "tstat": -6.804855383810208,
              "pvalue": 3.708500173615903e-11,
              "ci_lower": -1.117597106946468,
              "ci_upper": -0.6165924023001379,
              "vif": 1.1814032369705776
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 22.332339277829774,
              "residual": 27.667660722170226,
              "abs_error": 27.667660722170226,
              "pct_error": 55.335321444340444,
              "rank": 1
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": 0.41114039585148277,
              "residual": 17.488859604148516,
              "abs_error": 17.488859604148516,
              "pct_error": 97.70312628015931,
              "rank": 2
            },
            {
              "index": 365,
              "actual": 27.5,
              "predicted": 10.601683410972822,
              "residual": 16.89831658902718,
              "abs_error": 16.89831658902718,
              "pct_error": 61.44842396009883,
              "rank": 3
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 39.26587800368425,
              "residual": 10.73412199631575,
              "abs_error": 10.73412199631575,
              "pct_error": 21.4682439926315,
              "rank": 4
            },
            {
              "index": 375,
              "actual": 15.0,
              "predicted": 25.52650791660492,
              "residual": -10.52650791660492,
              "abs_error": 10.52650791660492,
              "pct_error": 70.1767194440328,
              "rank": 5
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 39.84115672589128,
              "residual": 10.158843274108719,
              "abs_error": 10.158843274108719,
              "pct_error": 20.317686548217438,
              "rank": 6
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 38.42083523188981,
              "residual": 10.07916476811019,
              "abs_error": 10.07916476811019,
              "pct_error": 20.781783027031317,
              "rank": 7
            },
            {
              "index": 436,
              "actual": 9.6,
              "predicted": 18.709040754956288,
              "residual": -9.109040754956288,
              "abs_error": 9.109040754956288,
              "pct_error": 94.88584119746135,
              "rank": 8
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -1.6067680592723335,
              "residual": 8.606768059272333,
              "abs_error": 8.606768059272333,
              "pct_error": 122.95382941817618,
              "rank": 9
            },
            {
              "index": 209,
              "actual": 20.0,
              "predicted": 11.727784705881497,
              "residual": 8.272215294118503,
              "abs_error": 8.272215294118503,
              "pct_error": 41.361076470592515,
              "rank": 10
            }
          ]
        },
        {
          "k": 4,
          "features": [
            "LSTAT",
            "RM",
            "PTRATIO",
            "INDUS"
          ],
          "rmse": 5.220087893560874,
          "mae": 3.3529287079256807,
          "mse": 27.249317616500797,
          "r2": 0.628420675407839,
          "adj_r2": 0.6130978166617704,
          "cv_rmse": 5.348008593136223,
          "cv_r2": 0.6662209378796847,
          "f_stat": 218.62285742621341,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 14.662952701432605,
              "stderr": 4.305554056843028,
              "tstat": 3.4055901999716056,
              "pvalue": 0.0007272055333440441,
              "ci_lower": 6.1985464570223225,
              "ci_upper": 23.127358945842886,
              "vif": null
            },
            {
              "feature": "LSTAT",
              "coef": -0.5808593684928822,
              "stderr": 0.05382762045924027,
              "tstat": -10.791102477448815,
              "pvalue": 0.0,
              "ci_lower": -0.6866805568281681,
              "ci_upper": -0.47503818015759636,
              "vif": 2.1420469226866263
            },
            {
              "feature": "RM",
              "coef": 4.937550991977018,
              "stderr": 0.4729344826902573,
              "tstat": 10.440243147190447,
              "pvalue": 0.0,
              "ci_lower": 4.007796183274054,
              "ci_upper": 5.867305800679982,
              "vif": 1.6461923036344361
            },
            {
              "feature": "PTRATIO",
              "coef": -0.8791069373339562,
              "stderr": 0.1294403805359135,
              "tstat": -6.791597287448071,
              "pvalue": 4.0394354527961696e-11,
              "ci_lower": -1.133577314623885,
              "ci_upper": -0.6246365600440272,
              "vif": 1.2169592039375405
            },
            {
              "feature": "INDUS",
              "coef": 0.02624260941433143,
              "stderr": 0.0483362668389717,
              "tstat": 0.5429175881901788,
              "pvalue": 0.5874896891262384,
              "ci_lower": -0.06878297694731487,
              "ci_upper": 0.12126819577597774,
              "vif": 1.6240501857298506
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 22.536210982078067,
              "residual": 27.463789017921933,
              "abs_error": 27.463789017921933,
              "pct_error": 54.92757803584386,
              "rank": 1
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": 0.26683329345537266,
              "residual": 17.633166706544625,
              "abs_error": 17.633166706544625,
              "pct_error": 98.50931120974651,
              "rank": 2
            },
            {
              "index": 365,
              "actual": 27.5,
              "predicted": 10.826884176446926,
              "residual": 16.673115823553076,
              "abs_error": 16.673115823553076,
              "pct_error": 60.629512085647555,
              "rank": 3
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 39.173946141549386,
              "residual": 10.826053858450614,
              "abs_error": 10.826053858450614,
              "pct_error": 21.652107716901227,
              "rank": 4
            },
            {
              "index": 375,
              "actual": 15.0,
              "predicted": 25.68154428946968,
              "residual": -10.68154428946968,
              "abs_error": 10.68154428946968,
              "pct_error": 71.2102952631312,
              "rank": 5
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 39.80582060413773,
              "residual": 10.194179395862271,
              "abs_error": 10.194179395862271,
              "pct_error": 20.388358791724542,
              "rank": 6
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 38.3719246618915,
              "residual": 10.128075338108502,
              "abs_error": 10.128075338108502,
              "pct_error": 20.882629563110314,
              "rank": 7
            },
            {
              "index": 436,
              "actual": 9.6,
              "predicted": 18.796989155553078,
              "residual": -9.196989155553078,
              "abs_error": 9.196989155553078,
              "pct_error": 95.80197037034456,
              "rank": 8
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -1.7874027164365507,
              "residual": 8.787402716436551,
              "abs_error": 8.787402716436551,
              "pct_error": 125.53432452052216,
              "rank": 9
            },
            {
              "index": 209,
              "actual": 20.0,
              "predicted": 11.563702583343325,
              "residual": 8.436297416656675,
              "abs_error": 8.436297416656675,
              "pct_error": 42.18148708328337,
              "rank": 10
            }
          ]
        },
        {
          "k": 5,
          "features": [
            "LSTAT",
            "RM",
            "PTRATIO",
            "INDUS",
            "TAX"
          ],
          "rmse": 5.281208043853675,
          "mae": 3.335726555181209,
          "mse": 27.891158402464757,
          "r2": 0.6196683547405585,
          "adj_r2": 0.5998594148832959,
          "cv_rmse": 5.375306617082264,
          "cv_r2": 0.663401592129236,
          "f_stat": 177.38793852339606,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 13.047503432914723,
              "stderr": 4.352192087952413,
              "tstat": 2.997915342255313,
              "pvalue": 0.002888830018208166,
              "ci_lower": 4.491344805134759,
              "ci_upper": 21.60366206069469,
              "vif": null
            },
            {
              "feature": "LSTAT",
              "coef": -0.5576371678497601,
              "stderr": 0.0546732673443534,
              "tstat": -10.199448376434967,
              "pvalue": 0.0,
              "ci_lower": -0.6651216581120899,
              "ci_upper": -0.4501526775874303,
              "vif": 2.229745995788575
            },
            {
              "feature": "RM",
              "coef": 5.104018340759618,
              "stderr": 0.4771956574595221,
              "tstat": 10.695860829774135,
              "pvalue": 0.0,
              "ci_lower": 4.165879200942298,
              "ci_upper": 6.042157480576938,
              "vif": 1.6910571692927077
            },
            {
              "feature": "PTRATIO",
              "coef": -0.7935699141213154,
              "stderr": 0.1349097695508426,
              "tstat": -5.882227186091573,
              "pvalue": 8.588588285007859e-09,
              "ci_lower": -1.0587947399991915,
              "ci_upper": -0.5283450882434393,
              "vif": 1.3338591638186919
            },
            {
              "feature": "INDUS",
              "coef": 0.09456812231003495,
              "stderr": 0.0577351388019278,
              "tstat": 1.637964752011253,
              "pvalue": 0.102219350151739,
              "ci_lower": -0.018935830641315043,
              "ci_upper": 0.20807207526138494,
              "vif": 2.3378701260015844
            },
            {
              "feature": "TAX",
              "coef": -0.005055738220219652,
              "stderr": 0.0023606197673384025,
              "tstat": -2.1416995189869117,
              "pvalue": 0.03282417587611919,
              "ci_lower": -0.00969658053164505,
              "ci_upper": -0.00041489590879425445,
              "vif": 2.2703393954584774
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 21.77424832336307,
              "residual": 28.22575167663693,
              "abs_error": 28.22575167663693,
              "pct_error": 56.45150335327386,
              "rank": 1
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": -0.18264005115124693,
              "residual": 18.082640051151245,
              "abs_error": 18.082640051151245,
              "pct_error": 101.02033548129188,
              "rank": 2
            },
            {
              "index": 365,
              "actual": 27.5,
              "predicted": 9.566985203164204,
              "residual": 17.933014796835796,
              "abs_error": 17.933014796835796,
              "pct_error": 65.21096289758471,
              "rank": 3
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 38.91234680464259,
              "residual": 11.087653195357412,
              "abs_error": 11.087653195357412,
              "pct_error": 22.175306390714823,
              "rank": 4
            },
            {
              "index": 375,
              "actual": 15.0,
              "predicted": 25.192995116883804,
              "residual": -10.192995116883804,
              "abs_error": 10.192995116883804,
              "pct_error": 67.95330077922536,
              "rank": 5
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 39.90267120804854,
              "residual": 10.097328791951462,
              "abs_error": 10.097328791951462,
              "pct_error": 20.194657583902924,
              "rank": 6
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 38.46024132227077,
              "residual": 10.039758677729232,
              "abs_error": 10.039758677729232,
              "pct_error": 20.70053335614275,
              "rank": 7
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -2.1944110583819176,
              "residual": 9.194411058381917,
              "abs_error": 9.194411058381917,
              "pct_error": 131.34872940545594,
              "rank": 8
            },
            {
              "index": 436,
              "actual": 9.6,
              "predicted": 18.27366414676922,
              "residual": -8.673664146769221,
              "abs_error": 8.673664146769221,
              "pct_error": 90.35066819551272,
              "rank": 9
            },
            {
              "index": 408,
              "actual": 17.2,
              "predicted": 9.309602315622602,
              "residual": 7.8903976843773975,
              "abs_error": 7.8903976843773975,
              "pct_error": 45.874405141729056,
              "rank": 10
            }
          ]
        },
        {
          "k": 6,
          "features": [
            "LSTAT",
            "RM",
            "PTRATIO",
            "INDUS",
            "TAX",
            "NOX"
          ],
          "rmse": 5.272268556515522,
          "mae": 3.354337919292546,
          "mse": 27.796815732022267,
          "r2": 0.6209548378098451,
          "adj_r2": 0.59701514335573,
          "cv_rmse": 5.373710160910537,
          "cv_r2": 0.6634716107290112,
          "f_stat": 147.75618074574936,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 14.375979303531295,
              "stderr": 4.699238745501472,
              "tstat": 3.0592144987937155,
              "pvalue": 0.002369705028056446,
              "ci_lower": 5.137475986023526,
              "ci_upper": 23.614482621039066,
              "vif": null
            },
            {
              "feature": "LSTAT",
              "coef": -0.5454902562517367,
              "stderr": 0.05703790995017731,
              "tstat": -9.563643841932905,
              "pvalue": 0.0,
              "ci_lower": -0.6576243589939864,
              "ci_upper": -0.4333561535094871,
              "vif": 2.4241429027416705
            },
            {
              "feature": "RM",
              "coef": 5.138564776230125,
              "stderr": 0.479661111509737,
              "tstat": 10.712906785493727,
              "pvalue": 0.0,
              "ci_lower": 4.19557145115077,
              "ci_upper": 6.08155810130948,
              "vif": 1.7067111244038464
            },
            {
              "feature": "PTRATIO",
              "coef": -0.824986063762524,
              "stderr": 0.14129997875625894,
              "tstat": -5.838543438039838,
              "pvalue": 1.096083424023675e-08,
              "ci_lower": -1.1027758065699351,
              "ci_upper": -0.547196320955113,
              "vif": 1.4616151807583198
            },
            {
              "feature": "INDUS",
              "coef": 0.12191805136576862,
              "stderr": 0.06826141490734532,
              "tstat": 1.786046356221215,
              "pvalue": 0.0748548451366291,
              "ci_lower": -0.012280984314847102,
              "ci_upper": 0.25611708704638436,
              "vif": 3.2644964524486415
            },
            {
              "feature": "TAX",
              "coef": -0.0045542083672655,
              "stderr": 0.0024542553827071687,
              "tstat": -1.8556375181469404,
              "pvalue": 0.06424615858717253,
              "ci_lower": -0.009379169967026035,
              "ci_upper": 0.0002707532324950357,
              "vif": 2.451341888944441
            },
            {
              "feature": "NOX",
              "coef": -2.9211420631155423,
              "stderr": 3.8843287312177845,
              "tstat": -0.7520326587291,
              "pvalue": 0.45247704080238615,
              "ci_lower": -10.557566984917806,
              "ci_upper": 4.71528285868672,
              "vif": 3.080797575462576
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 21.7844306377914,
              "residual": 28.2155693622086,
              "abs_error": 28.2155693622086,
              "pct_error": 56.43113872441721,
              "rank": 1
            },
            {
              "index": 365,
              "actual": 27.5,
              "predicted": 9.202033314976045,
              "residual": 18.297966685023955,
              "abs_error": 18.297966685023955,
              "pct_error": 66.53806067281438,
              "rank": 2
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": 0.17373063799074817,
              "residual": 17.72626936200925,
              "abs_error": 17.72626936200925,
              "pct_error": 99.029437776588,
              "rank": 3
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 39.004308756436316,
              "residual": 10.995691243563684,
              "abs_error": 10.995691243563684,
              "pct_error": 21.991382487127368,
              "rank": 4
            },
            {
              "index": 375,
              "actual": 15.0,
              "predicted": 25.171723612846936,
              "residual": -10.171723612846936,
              "abs_error": 10.171723612846936,
              "pct_error": 67.8114907523129,
              "rank": 5
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 40.05201213138043,
              "residual": 9.94798786861957,
              "abs_error": 9.94798786861957,
              "pct_error": 19.89597573723914,
              "rank": 6
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 38.61462596856865,
              "residual": 9.885374031431347,
              "abs_error": 9.885374031431347,
              "pct_error": 20.382214497796593,
              "rank": 7
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -2.0905321294944605,
              "residual": 9.090532129494461,
              "abs_error": 9.090532129494461,
              "pct_error": 129.86474470706372,
              "rank": 8
            },
            {
              "index": 436,
              "actual": 9.6,
              "predicted": 18.07739753982339,
              "residual": -8.477397539823391,
              "abs_error": 8.477397539823391,
              "pct_error": 88.30622437316032,
              "rank": 9
            },
            {
              "index": 408,
              "actual": 17.2,
              "predicted": 9.603328544008683,
              "residual": 7.596671455991316,
              "abs_error": 7.596671455991316,
              "pct_error": 44.166694511577425,
              "rank": 10
            }
          ]
        },
        {
          "k": 7,
          "features": [
            "LSTAT",
            "RM",
            "PTRATIO",
            "INDUS",
            "TAX",
            "NOX",
            "RAD"
          ],
          "rmse": 5.088104895731692,
          "mae": 3.1923143043106914,
          "mse": 25.888811429968808,
          "r2": 0.6469729186973695,
          "adj_r2": 0.6206836679620673,
          "cv_rmse": 5.361643984508168,
          "cv_r2": 0.6642117833623179,
          "f_stat": 129.0856801899993,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 19.832891320904942,
              "stderr": 5.176806319127194,
              "tstat": 3.831105530764526,
              "pvalue": 0.0001482915238917304,
              "ci_lower": 9.65543189814919,
              "ci_upper": 30.010350743660695,
              "vif": null
            },
            {
              "feature": "LSTAT",
              "coef": -0.556834710591386,
              "stderr": 0.05687421848726111,
              "tstat": -9.790634937974714,
              "pvalue": 0.0,
              "ci_lower": -0.6686478662654496,
              "ci_upper": -0.4450215549173224,
              "vif": 2.440411694018235
            },
            {
              "feature": "RM",
              "coef": 4.919891779378107,
              "stderr": 0.48501878372768387,
              "tstat": 10.143713902306109,
              "pvalue": 0.0,
              "ci_lower": 3.9663581359763,
              "ci_upper": 5.873425422779913,
              "vif": 1.7668892099003894
            },
            {
              "feature": "PTRATIO",
              "coef": -0.9177530120582013,
              "stderr": 0.14546765272996576,
              "tstat": -6.308983439513132,
              "pvalue": 7.522849010399568e-10,
              "ci_lower": -1.2037384327436638,
              "ci_upper": -0.6317675913727387,
              "vif": 1.5684941963618608
            },
            {
              "feature": "INDUS",
              "coef": 0.16095700198257568,
              "stderr": 0.06969496941183682,
              "tstat": 2.3094493525272877,
              "pvalue": 0.021432458529937692,
              "ci_lower": 0.023938601170786583,
              "ci_upper": 0.29797540279436474,
              "vif": 3.4456383664311
            },
            {
              "feature": "TAX",
              "coef": -0.013544129805668215,
              "stderr": 0.00441479892053946,
              "tstat": -3.0678927963525933,
              "pvalue": 0.002303901455184887,
              "ci_lower": -0.022223503555349397,
              "ci_upper": -0.004864756055987031,
              "vif": 8.031329417473545
            },
            {
              "feature": "NOX",
              "coef": -4.422095867553622,
              "stderr": 3.908836561817402,
              "tstat": -1.131307435759755,
              "pvalue": 0.25861035753815886,
              "ci_lower": -12.106761479070634,
              "ci_upper": 3.2625697439633887,
              "vif": 3.1588385913976533
            },
            {
              "feature": "RAD",
              "coef": 0.19275382628424015,
              "stderr": 0.07890071401125469,
              "tstat": 2.4429921667976924,
              "pvalue": 0.015002127292318201,
              "ci_lower": 0.03763718374942973,
              "ci_upper": 0.3478704688190506,
              "vif": 6.854352845417977
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 22.298373609712698,
              "residual": 27.701626390287302,
              "abs_error": 27.701626390287302,
              "pct_error": 55.403252780574604,
              "rank": 1
            },
            {
              "index": 365,
              "actual": 27.5,
              "predicted": 10.193310247511903,
              "residual": 17.306689752488097,
              "abs_error": 17.306689752488097,
              "pct_error": 62.933417281774894,
              "rank": 2
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": 0.8041625124670597,
              "residual": 17.09583748753294,
              "abs_error": 17.09583748753294,
              "pct_error": 95.50747199739074,
              "rank": 3
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 39.23277458890893,
              "residual": 10.767225411091069,
              "abs_error": 10.767225411091069,
              "pct_error": 21.534450822182137,
              "rank": 4
            },
            {
              "index": 375,
              "actual": 15.0,
              "predicted": 25.34138733857602,
              "residual": -10.34138733857602,
              "abs_error": 10.34138733857602,
              "pct_error": 68.94258225717347,
              "rank": 5
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 40.59310953616142,
              "residual": 9.406890463838579,
              "abs_error": 9.406890463838579,
              "pct_error": 18.813780927677158,
              "rank": 6
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 39.18475284324399,
              "residual": 9.315247156756008,
              "abs_error": 9.315247156756008,
              "pct_error": 19.20669516856909,
              "rank": 7
            },
            {
              "index": 436,
              "actual": 9.6,
              "predicted": 18.27750691185838,
              "residual": -8.677506911858382,
              "abs_error": 8.677506911858382,
              "pct_error": 90.39069699852482,
              "rank": 8
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -1.6099654894138178,
              "residual": 8.609965489413817,
              "abs_error": 8.609965489413817,
              "pct_error": 122.99950699162596,
              "rank": 9
            },
            {
              "index": 496,
              "actual": 19.7,
              "predicted": 11.79227986871503,
              "residual": 7.90772013128497,
              "abs_error": 7.90772013128497,
              "pct_error": 40.140711326319646,
              "rank": 10
            }
          ]
        },
        {
          "k": 8,
          "features": [
            "LSTAT",
            "RM",
            "PTRATIO",
            "INDUS",
            "TAX",
            "NOX",
            "RAD",
            "CRIM"
          ],
          "rmse": 5.107992004694622,
          "mae": 3.228325631182805,
          "mse": 26.091582320024184,
          "r2": 0.6442078780664766,
          "adj_r2": 0.6136021041367112,
          "cv_rmse": 5.298919757844759,
          "cv_r2": 0.6736663041057946,
          "f_stat": 116.11236964192621,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 19.82644009989499,
              "stderr": 5.12907853891385,
              "tstat": 3.865497466937502,
              "pvalue": 0.00012957954301850982,
              "ci_lower": 9.742733928284549,
              "ci_upper": 29.910146271505432,
              "vif": null
            },
            {
              "feature": "LSTAT",
              "coef": -0.5334357054693936,
              "stderr": 0.0569249883035203,
              "tstat": -9.370853141420941,
              "pvalue": 0.0,
              "ci_lower": -0.6453495417501331,
              "ci_upper": -0.4215218691886539,
              "vif": 2.490481560512486
            },
            {
              "feature": "RM",
              "coef": 4.914528673534718,
              "stderr": 0.48055064871817144,
              "tstat": 10.226869293889855,
              "pvalue": 0.0,
              "ci_lower": 3.969771929124059,
              "ci_upper": 5.859285417945376,
              "vif": 1.7669153962145208
            },
            {
              "feature": "PTRATIO",
              "coef": -0.934726730225087,
              "stderr": 0.1442453731606683,
              "tstat": -6.480115859133574,
              "pvalue": 2.733429038670465e-10,
              "ci_lower": -1.2183113835953,
              "ci_upper": -0.6511420768548741,
              "vif": 1.571082727911685
            },
            {
              "feature": "INDUS",
              "coef": 0.16009959144414848,
              "stderr": 0.06905304064609996,
              "tstat": 2.318501690094522,
              "pvalue": 0.02093187534203711,
              "ci_lower": 0.024342151418869057,
              "ci_upper": 0.2958570314694279,
              "vif": 3.445701577611484
            },
            {
              "feature": "TAX",
              "coef": -0.013389341252164177,
              "stderr": 0.00437442195967472,
              "tstat": -3.060825264593314,
              "pvalue": 0.0023580634648578958,
              "ci_lower": -0.021989401745942688,
              "ci_upper": -0.004789280758385665,
              "vif": 8.032526137897005
            },
            {
              "feature": "NOX",
              "coef": -4.74780698904569,
              "stderr": 3.874427899644464,
              "tstat": -1.2254214330537347,
              "pvalue": 0.22114663860578654,
              "ci_lower": -12.36488522769903,
              "ci_upper": 2.8692712496076505,
              "vif": 3.1614971548020745
            },
            {
              "feature": "RAD",
              "coef": 0.25452545528602993,
              "stderr": 0.08102523748167212,
              "tstat": 3.14131082113278,
              "pvalue": 0.0018086224656863603,
              "ci_lower": 0.0952308215518472,
              "ci_upper": 0.41382008902021267,
              "vif": 7.36360413132879
            },
            {
              "feature": "CRIM",
              "coef": -0.1080776537178384,
              "stderr": 0.03728103981771686,
              "tstat": -2.8989978349927155,
              "pvalue": 0.003952455387008724,
              "ci_lower": -0.18137172563383883,
              "ci_upper": -0.034783581801837965,
              "vif": 1.6642177072565008
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 22.50546883647215,
              "residual": 27.49453116352785,
              "abs_error": 27.49453116352785,
              "pct_error": 54.98906232705569,
              "rank": 1
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": 0.5768363949997797,
              "residual": 17.323163605000218,
              "abs_error": 17.323163605000218,
              "pct_error": 96.77745030726379,
              "rank": 2
            },
            {
              "index": 365,
              "actual": 27.5,
              "predicted": 10.835333632547451,
              "residual": 16.664666367452547,
              "abs_error": 16.664666367452547,
              "pct_error": 60.59878679073654,
              "rank": 3
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -4.717986303294353,
              "residual": 11.717986303294353,
              "abs_error": 11.717986303294353,
              "pct_error": 167.39980433277648,
              "rank": 4
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 39.15638295562698,
              "residual": 10.843617044373019,
              "abs_error": 10.843617044373019,
              "pct_error": 21.687234088746038,
              "rank": 5
            },
            {
              "index": 375,
              "actual": 15.0,
              "predicted": 24.499560706293316,
              "residual": -9.499560706293316,
              "abs_error": 9.499560706293316,
              "pct_error": 63.33040470862211,
              "rank": 6
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 40.50320821453684,
              "residual": 9.49679178546316,
              "abs_error": 9.49679178546316,
              "pct_error": 18.99358357092632,
              "rank": 7
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 39.11596107295821,
              "residual": 9.384038927041793,
              "abs_error": 9.384038927041793,
              "pct_error": 19.348533870189264,
              "rank": 8
            },
            {
              "index": 436,
              "actual": 9.6,
              "predicted": 18.08638428276794,
              "residual": -8.486384282767942,
              "abs_error": 8.486384282767942,
              "pct_error": 88.39983627883274,
              "rank": 9
            },
            {
              "index": 496,
              "actual": 19.7,
              "predicted": 12.12668458240784,
              "residual": 7.573315417592159,
              "abs_error": 7.573315417592159,
              "pct_error": 38.44322547001096,
              "rank": 10
            }
          ]
        },
        {
          "k": 9,
          "features": [
            "LSTAT",
            "RM",
            "PTRATIO",
            "INDUS",
            "TAX",
            "NOX",
            "RAD",
            "CRIM",
            "AGE"
          ],
          "rmse": 5.058180952149092,
          "mae": 3.2092030291756464,
          "mse": 25.585194544683894,
          "r2": 0.6511131235552199,
          "adj_r2": 0.6169828856421435,
          "cv_rmse": 5.276156572863555,
          "cv_r2": 0.6758647827133828,
          "f_stat": 104.7572762937947,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 23.053709287611795,
              "stderr": 5.31027875007999,
              "tstat": 4.341336937776483,
              "pvalue": 1.802795812944069e-05,
              "ci_lower": 12.613684264900083,
              "ci_upper": 33.493734310323504,
              "vif": null
            },
            {
              "feature": "LSTAT",
              "coef": -0.571265931226261,
              "stderr": 0.05919452325284217,
              "tstat": -9.65065515919722,
              "pvalue": 0.0,
              "ci_lower": -0.6876425534436641,
              "ci_upper": -0.45488930900885793,
              "vif": 2.7192999380158254
            },
            {
              "feature": "RM",
              "coef": 4.642770036896621,
              "stderr": 0.4938756260875451,
              "tstat": 9.400686714743111,
              "pvalue": 0.0,
              "ci_lower": 3.6718089749403697,
              "ci_upper": 5.613731098852873,
              "vif": 1.8844700251076745
            },
            {
              "feature": "PTRATIO",
              "coef": -0.9882472896127336,
              "stderr": 0.14558790046423759,
              "tstat": -6.787976792449782,
              "pvalue": 4.194666836099259e-11,
              "ci_lower": -1.2744735680030737,
              "ci_upper": -0.7020210112223935,
              "vif": 1.61607854723617
            },
            {
              "feature": "INDUS",
              "coef": 0.1355909838687969,
              "stderr": 0.06961324055192765,
              "tstat": 1.9477757793455037,
              "pvalue": 0.052151662113906205,
              "ci_lower": -0.0012688699125562863,
              "ci_upper": 0.2724508376501501,
              "vif": 3.536000991106032
            },
            {
              "feature": "TAX",
              "coef": -0.012627072272538009,
              "stderr": 0.004366965524590591,
              "tstat": -2.891498043992874,
              "pvalue": 0.00404653637275465,
              "ci_lower": -0.02121254047406291,
              "ci_upper": -0.004041604071013109,
              "vif": 8.083267590965477
            },
            {
              "feature": "NOX",
              "coef": -8.915977507618464,
              "stderr": 4.2948281084474225,
              "tstat": -2.07598005845258,
              "pvalue": 0.038543790933704525,
              "ci_lower": -17.359623318068863,
              "ci_upper": -0.4723316971680642,
              "vif": 3.922706635776552
            },
            {
              "feature": "RAD",
              "coef": 0.2617566980674275,
              "stderr": 0.08069962422166228,
              "tstat": 3.243592527128074,
              "pvalue": 0.001280978214902806,
              "ci_lower": 0.10310097849999511,
              "ci_upper": 0.4204124176348599,
              "vif": 7.375805577220143
            },
            {
              "feature": "CRIM",
              "coef": -0.11235138793629235,
              "stderr": 0.03715117386841813,
              "tstat": -3.024167912815299,
              "pvalue": 0.002656400773251466,
              "ci_lower": -0.18539071469546792,
              "ci_upper": -0.03931206117711679,
              "vif": 1.6687674278878661
            },
            {
              "feature": "AGE",
              "coef": 0.031643031649805684,
              "stderr": 0.014362749110792394,
              "tstat": 2.20313196350611,
              "pvalue": 0.028163608916329963,
              "ci_lower": 0.0034058209178183495,
              "ci_upper": 0.059880242381793014,
              "vif": 2.4816583243176007
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 23.334195329159964,
              "residual": 26.665804670840036,
              "abs_error": 26.665804670840036,
              "pct_error": 53.33160934168008,
              "rank": 1
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": 0.9981937745414688,
              "residual": 16.90180622545853,
              "abs_error": 16.90180622545853,
              "pct_error": 94.42349846624877,
              "rank": 2
            },
            {
              "index": 365,
              "actual": 27.5,
              "predicted": 11.751224450416181,
              "residual": 15.748775549583819,
              "abs_error": 15.748775549583819,
              "pct_error": 57.26827472575934,
              "rank": 3
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -4.8810019499149995,
              "residual": 11.881001949915,
              "abs_error": 11.881001949915,
              "pct_error": 169.72859928449998,
              "rank": 4
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 38.82608068927088,
              "residual": 11.173919310729119,
              "abs_error": 11.173919310729119,
              "pct_error": 22.347838621458237,
              "rank": 5
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 40.06040649411513,
              "residual": 9.939593505884872,
              "abs_error": 9.939593505884872,
              "pct_error": 19.879187011769744,
              "rank": 6
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 38.72823734820824,
              "residual": 9.77176265179176,
              "abs_error": 9.77176265179176,
              "pct_error": 20.147964230498474,
              "rank": 7
            },
            {
              "index": 375,
              "actual": 15.0,
              "predicted": 24.604726919434228,
              "residual": -9.604726919434228,
              "abs_error": 9.604726919434228,
              "pct_error": 64.03151279622818,
              "rank": 8
            },
            {
              "index": 436,
              "actual": 9.6,
              "predicted": 17.83770321746033,
              "residual": -8.23770321746033,
              "abs_error": 8.23770321746033,
              "pct_error": 85.80940851521179,
              "rank": 9
            },
            {
              "index": 496,
              "actual": 19.7,
              "predicted": 12.03295480669547,
              "residual": 7.66704519330453,
              "abs_error": 7.66704519330453,
              "pct_error": 38.91901113352553,
              "rank": 10
            }
          ]
        },
        {
          "k": 10,
          "features": [
            "LSTAT",
            "RM",
            "PTRATIO",
            "INDUS",
            "TAX",
            "NOX",
            "RAD",
            "CRIM",
            "AGE",
            "B"
          ],
          "rmse": 5.217335910904537,
          "mae": 3.2832737872524964,
          "mse": 27.22059400721407,
          "r2": 0.6288123585864352,
          "adj_r2": 0.5880225078816479,
          "cv_rmse": 5.162774661654903,
          "cv_r2": 0.6895377809044225,
          "f_stat": 100.15715969156352,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 15.948939693745709,
              "stderr": 5.461869664313204,
              "tstat": 2.920051314653842,
              "pvalue": 0.003701352110771161,
              "ci_lower": 5.2108022614993335,
              "ci_upper": 26.687077125992083,
              "vif": null
            },
            {
              "feature": "LSTAT",
              "coef": -0.5379567144412811,
              "stderr": 0.05848449533952632,
              "tstat": -9.198279156180169,
              "pvalue": 0.0,
              "ci_lower": -0.6529383209623469,
              "ci_upper": -0.42297510792021537,
              "vif": 2.769139914650868
            },
            {
              "feature": "RM",
              "coef": 4.845675342335188,
              "stderr": 0.485896990630598,
              "tstat": 9.972639130871055,
              "pvalue": 0.0,
              "ci_lower": 3.890392813827182,
              "ci_upper": 5.8009578708431935,
              "vif": 1.9028818053432552
            },
            {
              "feature": "PTRATIO",
              "coef": -1.0051070944631288,
              "stderr": 0.14259657928704944,
              "tstat": -7.048605930720333,
              "pvalue": 8.166356479932801e-12,
              "ci_lower": -1.2854546237638111,
              "ci_upper": -0.7247595651624466,
              "vif": 1.6173330508461397
            },
            {
              "feature": "INDUS",
              "coef": 0.14911542496422037,
              "stderr": 0.068230897031489,
              "tstat": 2.1854530931258696,
              "pvalue": 0.02944535466258147,
              "ci_lower": 0.01497221128837567,
              "ci_upper": 0.28325863864006506,
              "vif": 3.5437264139412785
            },
            {
              "feature": "TAX",
              "coef": -0.011855672118407268,
              "stderr": 0.004279439955453556,
              "tstat": -2.7703793584716263,
              "pvalue": 0.005864832788947227,
              "ci_lower": -0.02026913073221418,
              "ci_upper": -0.003442213504600356,
              "vif": 8.097867219347314
            },
            {
              "feature": "NOX",
              "coef": -8.044857866318035,
              "stderr": 4.209956386691704,
              "tstat": -1.9109124008384084,
              "pvalue": 0.056743125425364305,
              "ci_lower": -16.321710490508835,
              "ci_upper": 0.23199475787276747,
              "vif": 3.9320478815327435
            },
            {
              "feature": "RAD",
              "coef": 0.2840495242969284,
              "stderr": 0.07918517820041927,
              "tstat": 3.587155206975646,
              "pvalue": 0.00037647935801587984,
              "ci_lower": 0.12836998993002002,
              "ci_upper": 0.4397290586638368,
              "vif": 7.4083856182201036
            },
            {
              "feature": "CRIM",
              "coef": -0.09677431219929751,
              "stderr": 0.036558335431171526,
              "tstat": -2.647120309443376,
              "pvalue": 0.008444520198551242,
              "ci_lower": -0.16864868018706694,
              "ci_upper": -0.02489994421152808,
              "vif": 1.6857489855936905
            },
            {
              "feature": "AGE",
              "coef": 0.02824752717683733,
              "stderr": 0.014084915982027785,
              "tstat": 2.0055161999461624,
              "pvalue": 0.04559297817037167,
              "ci_lower": 0.0005563201667418242,
              "ci_upper": 0.055938734186932834,
              "vif": 2.489686749827253
            },
            {
              "feature": "B",
              "coef": 0.013304546244111704,
              "stderr": 0.0031339557367302973,
              "tstat": 4.245288498551845,
              "pvalue": 2.7271389672955948e-05,
              "ci_lower": 0.007143130927399178,
              "ci_upper": 0.019465961560824228,
              "vif": 1.3186723937921012
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 23.98652449784104,
              "residual": 26.01347550215896,
              "abs_error": 26.01347550215896,
              "pct_error": 52.02695100431792,
              "rank": 1
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": -2.2131213902307842,
              "residual": 20.113121390230784,
              "abs_error": 20.113121390230784,
              "pct_error": 112.36380664933401,
              "rank": 2
            },
            {
              "index": 365,
              "actual": 27.5,
              "predicted": 11.676255674838277,
              "residual": 15.823744325161723,
              "abs_error": 15.823744325161723,
              "pct_error": 57.54088845513354,
              "rank": 3
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -6.732944748323132,
              "residual": 13.732944748323131,
              "abs_error": 13.732944748323131,
              "pct_error": 196.18492497604473,
              "rank": 4
            },
            {
              "index": 375,
              "actual": 15.0,
              "predicted": 26.222612587370016,
              "residual": -11.222612587370016,
              "abs_error": 11.222612587370016,
              "pct_error": 74.81741724913343,
              "rank": 5
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 38.97165987759033,
              "residual": 11.028340122409674,
              "abs_error": 11.028340122409674,
              "pct_error": 22.056680244819347,
              "rank": 6
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 40.182639747908254,
              "residual": 9.817360252091746,
              "abs_error": 9.817360252091746,
              "pct_error": 19.63472050418349,
              "rank": 7
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 38.87021110754333,
              "residual": 9.629788892456673,
              "abs_error": 9.629788892456673,
              "pct_error": 19.855234829807575,
              "rank": 8
            },
            {
              "index": 395,
              "actual": 13.1,
              "predicted": 20.99995045334301,
              "residual": -7.899950453343012,
              "abs_error": 7.899950453343012,
              "pct_error": 60.304965292694746,
              "rank": 9
            },
            {
              "index": 381,
              "actual": 10.9,
              "predicted": 18.786464682508118,
              "residual": -7.886464682508118,
              "abs_error": 7.886464682508118,
              "pct_error": 72.35288699548732,
              "rank": 10
            }
          ]
        },
        {
          "k": 11,
          "features": [
            "LSTAT",
            "RM",
            "PTRATIO",
            "INDUS",
            "TAX",
            "NOX",
            "RAD",
            "CRIM",
            "AGE",
            "B",
            "ZN"
          ],
          "rmse": 5.271005771775807,
          "mae": 3.3356989051132886,
          "mse": 27.783501846093873,
          "r2": 0.6211363896861377,
          "adj_r2": 0.5748308373144434,
          "cv_rmse": 5.176956144188025,
          "cv_r2": 0.6884440790595535,
          "f_stat": 91.03052316730056,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 17.02214055118454,
              "stderr": 5.6236742711277365,
              "tstat": 3.0268717088714,
              "pvalue": 0.00263413973490656,
              "ci_lower": 5.965805125528293,
              "ci_upper": 28.078475976840785,
              "vif": null
            },
            {
              "feature": "LSTAT",
              "coef": -0.5340488501332981,
              "stderr": 0.05871032336521643,
              "tstat": -9.096336377014424,
              "pvalue": 0.0,
              "ci_lower": -0.6494753483227825,
              "ci_upper": -0.4186223519438136,
              "vif": 2.788093391395626
            },
            {
              "feature": "RM",
              "coef": 4.874944785463624,
              "stderr": 0.4874626081147905,
              "tstat": 10.000653802590012,
              "pvalue": 0.0,
              "ci_lower": 3.9165766718528126,
              "ci_upper": 5.833312899074436,
              "vif": 1.9134669998883853
            },
            {
              "feature": "PTRATIO",
              "coef": -1.0459411661830955,
              "stderr": 0.15136138818782402,
              "tstat": -6.910224454899881,
              "pvalue": 1.9678925156085825e-11,
              "ci_lower": -1.3435228178959981,
              "ci_upper": -0.7483595144701929,
              "vif": 1.820649797128843
            },
            {
              "feature": "INDUS",
              "coef": 0.13688741968029278,
              "stderr": 0.06992146043970522,
              "tstat": 1.9577311288904462,
              "pvalue": 0.05097064241650062,
              "ci_lower": -0.0005805563797977309,
              "ci_upper": 0.27435539574038326,
              "vif": 3.71821048635099
            },
            {
              "feature": "TAX",
              "coef": -0.010815372728151196,
              "stderr": 0.004471060916524703,
              "tstat": -2.418972349085738,
              "pvalue": 0.016018975155985604,
              "ci_lower": -0.01960563098607232,
              "ci_upper": -0.00202511447023007,
              "vif": 8.831468354501007
            },
            {
              "feature": "NOX",
              "coef": -8.772808168848774,
              "stderr": 4.307265536848588,
              "tstat": -2.0367465376345018,
              "pvalue": 0.04234690733923463,
              "ci_lower": -17.241039123700535,
              "ci_upper": -0.304577213997014,
              "vif": 4.112272284598637
            },
            {
              "feature": "RAD",
              "coef": 0.2745840243177474,
              "stderr": 0.08008325285679321,
              "tstat": 3.4287321571310936,
              "pvalue": 0.0006707359024964443,
              "ci_lower": 0.11713761777386494,
              "ci_upper": 0.4320304308616299,
              "vif": 7.570667274192644
            },
            {
              "feature": "CRIM",
              "coef": -0.09564671026564713,
              "stderr": 0.036601205819642574,
              "tstat": -2.6132120000898142,
              "pvalue": 0.009314752318896113,
              "ci_lower": -0.16760592927715268,
              "ci_upper": -0.02368749125414156,
              "vif": 1.6882075310033067
            },
            {
              "feature": "AGE",
              "coef": 0.02509133318430168,
              "stderr": 0.014623460264698808,
              "tstat": 1.7158273575558878,
              "pvalue": 0.08698376540018304,
              "ci_lower": -0.0036588884635540414,
              "ci_upper": 0.0538415548321574,
              "vif": 2.6813373104969975
            },
            {
              "feature": "B",
              "coef": 0.013316467960616418,
              "stderr": 0.0031353800624229315,
              "tstat": 4.2471622883019275,
              "pvalue": 2.7069288528247526e-05,
              "ci_lower": 0.007152203818391964,
              "ci_upper": 0.019480732102840872,
              "vif": 1.3187016471219444
            },
            {
              "feature": "ZN",
              "coef": -0.01236084206590572,
              "stderr": 0.015311362525651611,
              "tstat": -0.8072986349318821,
              "pvalue": 0.41998401586521394,
              "ci_lower": -0.04246350302131691,
              "ci_upper": 0.01774181888950547,
              "vif": 2.0105522765193045
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 23.93821786632887,
              "residual": 26.06178213367113,
              "abs_error": 26.06178213367113,
              "pct_error": 52.12356426734226,
              "rank": 1
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": -2.1793071873727454,
              "residual": 20.079307187372745,
              "abs_error": 20.079307187372745,
              "pct_error": 112.1749004881159,
              "rank": 2
            },
            {
              "index": 365,
              "actual": 27.5,
              "predicted": 11.510269334662821,
              "residual": 15.989730665337179,
              "abs_error": 15.989730665337179,
              "pct_error": 58.144475146680655,
              "rank": 3
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -6.730923443424441,
              "residual": 13.730923443424441,
              "abs_error": 13.730923443424441,
              "pct_error": 196.15604919177773,
              "rank": 4
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 38.52839765583953,
              "residual": 11.471602344160473,
              "abs_error": 11.471602344160473,
              "pct_error": 22.943204688320947,
              "rank": 5
            },
            {
              "index": 375,
              "actual": 15.0,
              "predicted": 26.211271772224663,
              "residual": -11.211271772224663,
              "abs_error": 11.211271772224663,
              "pct_error": 74.74181181483108,
              "rank": 6
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 39.49119509010192,
              "residual": 10.508804909898082,
              "abs_error": 10.508804909898082,
              "pct_error": 21.017609819796164,
              "rank": 7
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 38.17304345287971,
              "residual": 10.32695654712029,
              "abs_error": 10.32695654712029,
              "pct_error": 21.292693911588227,
              "rank": 8
            },
            {
              "index": 381,
              "actual": 10.9,
              "predicted": 18.774502330620482,
              "residual": -7.874502330620482,
              "abs_error": 7.874502330620482,
              "pct_error": 72.24314064789432,
              "rank": 9
            },
            {
              "index": 395,
              "actual": 13.1,
              "predicted": 20.947149336720745,
              "residual": -7.847149336720745,
              "abs_error": 7.847149336720745,
              "pct_error": 59.901903333746155,
              "rank": 10
            }
          ]
        },
        {
          "k": 12,
          "features": [
            "LSTAT",
            "RM",
            "PTRATIO",
            "INDUS",
            "TAX",
            "NOX",
            "RAD",
            "CRIM",
            "AGE",
            "B",
            "ZN",
            "DIS"
          ],
          "rmse": 4.963405499893667,
          "mae": 3.2372423618145576,
          "mse": 24.6353941563747,
          "r2": 0.6640648675861085,
          "adj_r2": 0.618770242990977,
          "cv_rmse": 4.907617088082696,
          "cv_r2": 0.7193435342641527,
          "f_stat": 95.42707811156261,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 30.101279866903287,
              "stderr": 5.730690271885741,
              "tstat": 5.2526446970232366,
              "pvalue": 2.468391644416812e-07,
              "ci_lower": 18.834458095838478,
              "ci_upper": 41.368101637968095,
              "vif": null
            },
            {
              "feature": "LSTAT",
              "coef": -0.5247680884790776,
              "stderr": 0.05593380227456814,
              "tstat": -9.381949145940292,
              "pvalue": 0.0,
              "ci_lower": -0.6347367225016186,
              "ci_upper": -0.4147994544565367,
              "vif": 2.7899589646985365
            },
            {
              "feature": "RM",
              "coef": 4.498770639599276,
              "stderr": 0.4679412399644157,
              "tstat": 9.61396486435216,
              "pvalue": 0.0,
              "ci_lower": 3.578774914847733,
              "ci_upper": 5.4187663643508195,
              "vif": 1.943979862624545
            },
            {
              "feature": "PTRATIO",
              "coef": -0.9446561644216998,
              "stderr": 0.14501665349779955,
              "tstat": -6.514121941422636,
              "pvalue": 2.25262031250395e-10,
              "ci_lower": -1.2297661095205694,
              "ci_upper": -0.6595462193228301,
              "vif": 1.842479770198469
            },
            {
              "feature": "INDUS",
              "coef": 0.060571477923613976,
              "stderr": 0.06764624516302116,
              "tstat": 0.895415226338762,
              "pvalue": 0.3711160591558238,
              "ci_lower": -0.07242440068329575,
              "ci_upper": 0.1935673565305237,
              "vif": 3.8368174622127325
            },
            {
              "feature": "TAX",
              "coef": -0.011934790071862988,
              "stderr": 0.004261763947721464,
              "tstat": -2.8004343314800155,
              "pvalue": 0.005356663377073634,
              "ci_lower": -0.02031362971442615,
              "ci_upper": -0.0035559504292998288,
              "vif": 8.846292255742288
            },
            {
              "feature": "NOX",
              "coef": -16.19905017758469,
              "stderr": 4.262332082094708,
              "tstat": -3.8005133963245132,
              "pvalue": 0.00016741760910710113,
              "ci_lower": -24.579006800550154,
              "ci_upper": -7.819093554619229,
              "vif": 4.439600523245743
            },
            {
              "feature": "RAD",
              "coef": 0.28559099793400305,
              "stderr": 0.07628974123870892,
              "tstat": 3.7435046088358734,
              "pvalue": 0.00020871057313653907,
              "ci_lower": 0.13560157663967345,
              "ci_upper": 0.4355804192283327,
              "vif": 7.574496873248376
            },
            {
              "feature": "CRIM",
              "coef": -0.11918976453198063,
              "stderr": 0.03505117369185193,
              "tstat": -3.4004500271466727,
              "pvalue": 0.0007420501710735383,
              "ci_lower": -0.1881021133270553,
              "ci_upper": -0.05027741573690597,
              "vif": 1.706911223815323
            },
            {
              "feature": "AGE",
              "coef": -0.005111766389221298,
              "stderr": 0.014701161336414715,
              "tstat": -0.3477117400622952,
              "pvalue": 0.7282437832192055,
              "ci_lower": -0.034014979919648164,
              "ci_upper": 0.023791447141205565,
              "vif": 2.98761889747562
            },
            {
              "feature": "B",
              "coef": 0.012926483770760555,
              "stderr": 0.0029867216622529984,
              "tstat": 4.327984068327818,
              "pvalue": 1.9136973508526722e-05,
              "ci_lower": 0.00705444060460462,
              "ci_upper": 0.018798526936916492,
              "vif": 1.3192479416781695
            },
            {
              "feature": "ZN",
              "coef": 0.03196398388456158,
              "stderr": 0.0161358207454664,
              "tstat": 1.9809332533358948,
              "pvalue": 0.04829903042754591,
              "ci_lower": 0.00024015868309991417,
              "ci_upper": 0.06368780908602324,
              "vif": 2.461730859635983
            },
            {
              "feature": "DIS",
              "coef": -1.4632422122421536,
              "stderr": 0.22804166124719064,
              "tstat": -6.41655653725501,
              "pvalue": 4.0347702956466946e-10,
              "ci_lower": -1.9115834471985105,
              "ci_upper": -1.0149009772857966,
              "vif": 4.1663040460703415
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 25.17368386936618,
              "residual": 24.82631613063382,
              "abs_error": 24.82631613063382,
              "pct_error": 49.65263226126764,
              "rank": 1
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": -0.5204526837969223,
              "residual": 18.42045268379692,
              "abs_error": 18.42045268379692,
              "pct_error": 102.90755689272024,
              "rank": 2
            },
            {
              "index": 365,
              "actual": 27.5,
              "predicted": 12.906222407242728,
              "residual": 14.593777592757272,
              "abs_error": 14.593777592757272,
              "pct_error": 53.068282155480986,
              "rank": 3
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -6.529709346189142,
              "residual": 13.529709346189142,
              "abs_error": 13.529709346189142,
              "pct_error": 193.2815620884163,
              "rank": 4
            },
            {
              "index": 375,
              "actual": 15.0,
              "predicted": 26.365056511080752,
              "residual": -11.365056511080752,
              "abs_error": 11.365056511080752,
              "pct_error": 75.76704340720501,
              "rank": 5
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 40.88127145258733,
              "residual": 9.118728547412672,
              "abs_error": 9.118728547412672,
              "pct_error": 18.237457094825345,
              "rank": 6
            },
            {
              "index": 381,
              "actual": 10.9,
              "predicted": 19.042884512954952,
              "residual": -8.142884512954952,
              "abs_error": 8.142884512954952,
              "pct_error": 74.70536250417386,
              "rank": 7
            },
            {
              "index": 395,
              "actual": 13.1,
              "predicted": 20.920572343133838,
              "residual": -7.820572343133838,
              "abs_error": 7.820572343133838,
              "pct_error": 59.69902552010563,
              "rank": 8
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 43.16818646446907,
              "residual": 6.831813535530927,
              "abs_error": 6.831813535530927,
              "pct_error": 13.663627071061853,
              "rank": 9
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 41.886266380553245,
              "residual": 6.613733619446755,
              "abs_error": 6.613733619446755,
              "pct_error": 13.636564163807744,
              "rank": 10
            }
          ]
        },
        {
          "k": 13,
          "features": [
            "LSTAT",
            "RM",
            "PTRATIO",
            "INDUS",
            "TAX",
            "NOX",
            "RAD",
            "CRIM",
            "AGE",
            "B",
            "ZN",
            "DIS",
            "CHAS"
          ],
          "rmse": 4.928602182665343,
          "mae": 3.189091965887835,
          "mse": 24.29111947497358,
          "r2": 0.6687594935356311,
          "adj_r2": 0.6198262368988494,
          "cv_rmse": 4.931367360873801,
          "cv_r2": 0.7184784187192015,
          "f_stat": 90.4266165387097,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 30.246750993925044,
              "stderr": 5.676806440074125,
              "tstat": 5.328127938343111,
              "pvalue": 1.6816101244820914e-07,
              "ci_lower": 19.085778659588925,
              "ci_upper": 41.40772332826116,
              "vif": null
            },
            {
              "feature": "LSTAT",
              "coef": -0.5085714244487942,
              "stderr": 0.0556839169989473,
              "tstat": -9.133183365286762,
              "pvalue": 0.0,
              "ci_lower": -0.6180496431714683,
              "ci_upper": -0.39909320572612017,
              "vif": 2.818045379538575
            },
            {
              "feature": "RM",
              "coef": 4.438835199513015,
              "stderr": 0.4639796661053513,
              "tstat": 9.566874420968984,
              "pvalue": 0.0,
              "ci_lower": 3.526620863554659,
              "ci_upper": 5.351049535471371,
              "vif": 1.9478087495837584
            },
            {
              "feature": "PTRATIO",
              "coef": -0.915456240468064,
              "stderr": 0.1439967443589442,
              "tstat": -6.357478737061471,
              "pvalue": 5.737761377133666e-10,
              "ci_lower": -1.1985632473724004,
              "ci_upper": -0.6323492335637275,
              "vif": 1.8514484070670416
            },
            {
              "feature": "INDUS",
              "coef": 0.04038072041333875,
              "stderr": 0.06736499472046818,
              "tstat": 0.5994318055081724,
              "pvalue": 0.5492330385284343,
              "ci_lower": -0.09206326024985022,
              "ci_upper": 0.1728247010765277,
              "vif": 3.8778553502602815
            },
            {
              "feature": "TAX",
              "coef": -0.010646786275310016,
              "stderr": 0.004244612368584221,
              "tstat": -2.5083059065912354,
              "pvalue": 0.012536260644874897,
              "ci_lower": -0.018991971497994975,
              "ci_upper": -0.0023016010526250574,
              "vif": 8.943301431814218
            },
            {
              "feature": "NOX",
              "coef": -17.202633391781248,
              "stderr": 4.2361190871668795,
              "tstat": -4.060941875759774,
              "pvalue": 5.909342124965633e-05,
              "ci_lower": -25.53112026832259,
              "ci_upper": -8.874146515239907,
              "vif": 4.469150159170634
            },
            {
              "feature": "RAD",
              "coef": 0.26242973558508365,
              "stderr": 0.07598646354966766,
              "tstat": 3.453637968209292,
              "pvalue": 0.0006137380080795118,
              "ci_lower": 0.11303538395191315,
              "ci_upper": 0.41182408721825414,
              "vif": 7.658315779148448
            },
            {
              "feature": "CRIM",
              "coef": -0.11305592398537724,
              "stderr": 0.0347840248791694,
              "tstat": -3.250225480751694,
              "pvalue": 0.0012532800108635556,
              "ci_lower": -0.18144358938342448,
              "ci_upper": -0.044668258587330006,
              "vif": 1.7131869906128505
            },
            {
              "feature": "AGE",
              "coef": -0.006296362210984396,
              "stderr": 0.014568042572182157,
              "tstat": -0.43220372124717504,
              "pvalue": 0.6658322215807408,
              "ci_lower": -0.03493808565706912,
              "ci_upper": 0.02234536123510033,
              "vif": 2.9899478376482787
            },
            {
              "feature": "B",
              "coef": 0.012351334729968133,
              "stderr": 0.0029651025885100903,
              "tstat": 4.165567416732941,
              "pvalue": 3.8269380584043944e-05,
              "ci_lower": 0.00652174932694752,
              "ci_upper": 0.018180920132988748,
              "vif": 1.3251213980906684
            },
            {
              "feature": "ZN",
              "coef": 0.03011046414564792,
              "stderr": 0.015996138029708083,
              "tstat": 1.8823583598570268,
              "pvalue": 0.06053163638411507,
              "ci_lower": -0.0013389882692670038,
              "ci_upper": 0.061559916560562845,
              "vif": 2.465630718663123
            },
            {
              "feature": "DIS",
              "coef": -1.4478653685307938,
              "stderr": 0.22595036782635275,
              "tstat": -6.407891177426658,
              "pvalue": 4.258553509828289e-10,
              "ci_lower": -1.8920985533089,
              "ci_upper": -1.0036321837526876,
              "vif": 4.168578373544288
            },
            {
              "feature": "CHAS",
              "coef": 2.784438203507962,
              "stderr": 0.9556875964881927,
              "tstat": 2.913544356691212,
              "pvalue": 0.0037792729194365826,
              "ci_lower": 0.9054939524981245,
              "ci_upper": 4.663382454517799,
              "vif": 1.0966737120634569
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 24.739571606518894,
              "residual": 25.260428393481106,
              "abs_error": 25.260428393481106,
              "pct_error": 50.52085678696221,
              "rank": 1
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": -0.1642369956866978,
              "residual": 18.064236995686695,
              "abs_error": 18.064236995686695,
              "pct_error": 100.91752511556813,
              "rank": 2
            },
            {
              "index": 365,
              "actual": 27.5,
              "predicted": 12.503956484181654,
              "residual": 14.996043515818346,
              "abs_error": 14.996043515818346,
              "pct_error": 54.531067330248526,
              "rank": 3
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -6.088421842193753,
              "residual": 13.088421842193753,
              "abs_error": 13.088421842193753,
              "pct_error": 186.97745488848219,
              "rank": 4
            },
            {
              "index": 375,
              "actual": 15.0,
              "predicted": 25.939095624449017,
              "residual": -10.939095624449017,
              "abs_error": 10.939095624449017,
              "pct_error": 72.92730416299345,
              "rank": 5
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 40.50033966050782,
              "residual": 9.49966033949218,
              "abs_error": 9.49966033949218,
              "pct_error": 18.99932067898436,
              "rank": 6
            },
            {
              "index": 381,
              "actual": 10.9,
              "predicted": 18.765486949814353,
              "residual": -7.865486949814352,
              "abs_error": 7.865486949814352,
              "pct_error": 72.16043073224176,
              "rank": 7
            },
            {
              "index": 395,
              "actual": 13.1,
              "predicted": 20.523848928752603,
              "residual": -7.423848928752603,
              "abs_error": 7.423848928752603,
              "pct_error": 56.67060250956186,
              "rank": 8
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 42.67251161101974,
              "residual": 7.327488388980257,
              "abs_error": 7.327488388980257,
              "pct_error": 14.654976777960513,
              "rank": 9
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 41.41377225132502,
              "residual": 7.086227748674979,
              "abs_error": 7.086227748674979,
              "pct_error": 14.61077886324738,
              "rank": 10
            }
          ]
        }
      ],
      "F-test": [
        {
          "k": 1,
          "features": [
            "LSTAT"
          ],
          "rmse": 5.789606996393182,
          "mae": 4.184807930623362,
          "mse": 33.51954917268489,
          "r2": 0.5429180422970386,
          "adj_r2": 0.538347222720009,
          "cv_rmse": 6.332558301047439,
          "cv_r2": 0.5428147541494676,
          "f_stat": 476.33924982804336,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 34.83694982031851,
              "stderr": 0.6350210267842641,
              "tstat": 54.859521733842804,
              "pvalue": 0.0,
              "ci_lower": 33.588572993959744,
              "ci_upper": 36.085326646677274,
              "vif": null
            },
            {
              "feature": "LSTAT",
              "coef": -0.9665309019503531,
              "stderr": 0.044285092860186184,
              "tstat": -21.825197589667866,
              "pvalue": 0.0,
              "ci_lower": -1.0535901981751759,
              "ci_upper": -0.8794716057255303,
              "vif": 1.0
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 25.625910324731645,
              "residual": 24.374089675268355,
              "abs_error": 24.374089675268355,
              "pct_error": 48.74817935053671,
              "rank": 1
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 31.96635304152596,
              "residual": 18.03364695847404,
              "abs_error": 18.03364695847404,
              "pct_error": 36.06729391694808,
              "rank": 2
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 32.05334082270149,
              "residual": 17.946659177298507,
              "abs_error": 17.946659177298507,
              "pct_error": 35.893318354597014,
              "rank": 3
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 31.154467083887663,
              "residual": 17.345532916112337,
              "abs_error": 17.345532916112337,
              "pct_error": 35.76398539404605,
              "rank": 4
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": 1.6172827202848765,
              "residual": 16.282717279715122,
              "abs_error": 16.282717279715122,
              "pct_error": 90.9649010039951,
              "rank": 5
            },
            {
              "index": 268,
              "actual": 43.5,
              "predicted": 31.782712170155392,
              "residual": 11.717287829844608,
              "abs_error": 11.717287829844608,
              "pct_error": 26.93629386171174,
              "rank": 6
            },
            {
              "index": 355,
              "actual": 20.6,
              "predicted": 29.45337269645504,
              "residual": -8.85337269645504,
              "abs_error": 8.85337269645504,
              "pct_error": 42.977537361432226,
              "rank": 7
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -0.9053629338055416,
              "residual": 7.905362933805542,
              "abs_error": 7.905362933805542,
              "pct_error": 112.93375619722201,
              "rank": 8
            },
            {
              "index": 408,
              "actual": 17.2,
              "predicted": 9.320534008829188,
              "residual": 7.879465991170811,
              "abs_error": 7.879465991170811,
              "pct_error": 45.810848785876814,
              "rank": 9
            },
            {
              "index": 436,
              "actual": 9.6,
              "predicted": 17.391067040114635,
              "residual": -7.791067040114635,
              "abs_error": 7.791067040114635,
              "pct_error": 81.15694833452746,
              "rank": 10
            }
          ]
        },
        {
          "k": 2,
          "features": [
            "LSTAT",
            "RM"
          ],
          "rmse": 5.589569804715173,
          "mae": 3.898759721382362,
          "mse": 31.243290601783617,
          "r2": 0.573957741502586,
          "adj_r2": 0.5653508271895069,
          "cv_rmse": 5.583527948544508,
          "cv_r2": 0.6359466638068296,
          "f_stat": 372.61794090137715,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": -3.8411770790048383,
              "stderr": 3.5229849736559067,
              "tstat": -1.0903188937018753,
              "pvalue": 0.2762274312067523,
              "ci_lower": -10.76700430913337,
              "ci_upper": 3.084650151123692,
              "vif": null
            },
            {
              "feature": "LSTAT",
              "coef": -0.6324985627075881,
              "stderr": 0.04904544343244726,
              "tstat": -12.89617380213434,
              "pvalue": 0.0,
              "ci_lower": -0.7289168756377382,
              "ci_upper": -0.536080249777438,
              "vif": 1.600640940207779
            },
            {
              "feature": "RM",
              "coef": 5.4650987730758604,
              "stderr": 0.4915510985577764,
              "tstat": 11.118068475710055,
              "pvalue": 0.0,
              "ci_lower": 4.498759714337782,
              "ci_upper": 6.4314378318139385,
              "vif": 1.6006409402077786
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 24.1021655918314,
              "residual": 25.8978344081686,
              "abs_error": 25.8978344081686,
              "pct_error": 51.79566881633719,
              "rank": 1
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": -0.28767555746955153,
              "residual": 18.18767555746955,
              "abs_error": 18.18767555746955,
              "pct_error": 101.60712601938297,
              "rank": 2
            },
            {
              "index": 365,
              "actual": 27.5,
              "predicted": 11.116649885440271,
              "residual": 16.38335011455973,
              "abs_error": 16.38335011455973,
              "pct_error": 59.57581859839901,
              "rank": 3
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 37.31795502772603,
              "residual": 12.682044972273971,
              "abs_error": 12.682044972273971,
              "pct_error": 25.364089944547942,
              "rank": 4
            },
            {
              "index": 375,
              "actual": 15.0,
              "predicted": 27.62430956570894,
              "residual": -12.624309565708941,
              "abs_error": 12.624309565708941,
              "pct_error": 84.16206377139294,
              "rank": 5
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 36.66642406204398,
              "residual": 11.83357593795602,
              "abs_error": 11.83357593795602,
              "pct_error": 24.399125645270146,
              "rank": 6
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 38.24383060328878,
              "residual": 11.756169396711222,
              "abs_error": 11.756169396711222,
              "pct_error": 23.512338793422444,
              "rank": 7
            },
            {
              "index": 436,
              "actual": 9.6,
              "predicted": 20.052227036966336,
              "residual": -10.452227036966336,
              "abs_error": 10.452227036966336,
              "pct_error": 108.87736496839935,
              "rank": 8
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -2.534192572401629,
              "residual": 9.53419257240163,
              "abs_error": 9.53419257240163,
              "pct_error": 136.202751034309,
              "rank": 9
            },
            {
              "index": 209,
              "actual": 20.0,
              "predicted": 10.759918951394354,
              "residual": 9.240081048605646,
              "abs_error": 9.240081048605646,
              "pct_error": 46.20040524302823,
              "rank": 10
            }
          ]
        },
        {
          "k": 3,
          "features": [
            "LSTAT",
            "RM",
            "PTRATIO"
          ],
          "rmse": 5.207202455789533,
          "mae": 3.3325380783241023,
          "mse": 27.114957415580545,
          "r2": 0.6302528487272832,
          "adj_r2": 0.6189340583822001,
          "cv_rmse": 5.335324974716855,
          "cv_r2": 0.6677558712662522,
          "f_stat": 291.91356322846076,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 14.588099261571113,
              "stderr": 4.29955072031452,
              "tstat": 3.392935729922955,
              "pvalue": 0.0007604665622396034,
              "ci_lower": 6.13555943016398,
              "ci_upper": 23.040639092978246,
              "vif": null
            },
            {
              "feature": "LSTAT",
              "coef": -0.567125882738386,
              "stderr": 0.04747167069939089,
              "tstat": -11.946617306343567,
              "pvalue": 0.0,
              "ci_lower": -0.6604510261200396,
              "ci_upper": -0.4738007393567325,
              "vif": 1.6689911381361469
            },
            {
              "feature": "RM",
              "coef": 4.933118359418629,
              "stderr": 0.47244696667464253,
              "tstat": 10.44163410369802,
              "pvalue": 0.0,
              "ci_lower": 4.004329036111665,
              "ci_upper": 5.861907682725594,
              "vif": 1.6457016960613688
            },
            {
              "feature": "PTRATIO",
              "coef": -0.867094754623303,
              "stderr": 0.1274229510720028,
              "tstat": -6.804855383810208,
              "pvalue": 3.708500173615903e-11,
              "ci_lower": -1.117597106946468,
              "ci_upper": -0.6165924023001379,
              "vif": 1.1814032369705776
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 22.332339277829774,
              "residual": 27.667660722170226,
              "abs_error": 27.667660722170226,
              "pct_error": 55.335321444340444,
              "rank": 1
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": 0.41114039585148277,
              "residual": 17.488859604148516,
              "abs_error": 17.488859604148516,
              "pct_error": 97.70312628015931,
              "rank": 2
            },
            {
              "index": 365,
              "actual": 27.5,
              "predicted": 10.601683410972822,
              "residual": 16.89831658902718,
              "abs_error": 16.89831658902718,
              "pct_error": 61.44842396009883,
              "rank": 3
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 39.26587800368425,
              "residual": 10.73412199631575,
              "abs_error": 10.73412199631575,
              "pct_error": 21.4682439926315,
              "rank": 4
            },
            {
              "index": 375,
              "actual": 15.0,
              "predicted": 25.52650791660492,
              "residual": -10.52650791660492,
              "abs_error": 10.52650791660492,
              "pct_error": 70.1767194440328,
              "rank": 5
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 39.84115672589128,
              "residual": 10.158843274108719,
              "abs_error": 10.158843274108719,
              "pct_error": 20.317686548217438,
              "rank": 6
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 38.42083523188981,
              "residual": 10.07916476811019,
              "abs_error": 10.07916476811019,
              "pct_error": 20.781783027031317,
              "rank": 7
            },
            {
              "index": 436,
              "actual": 9.6,
              "predicted": 18.709040754956288,
              "residual": -9.109040754956288,
              "abs_error": 9.109040754956288,
              "pct_error": 94.88584119746135,
              "rank": 8
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -1.6067680592723335,
              "residual": 8.606768059272333,
              "abs_error": 8.606768059272333,
              "pct_error": 122.95382941817618,
              "rank": 9
            },
            {
              "index": 209,
              "actual": 20.0,
              "predicted": 11.727784705881497,
              "residual": 8.272215294118503,
              "abs_error": 8.272215294118503,
              "pct_error": 41.361076470592515,
              "rank": 10
            }
          ]
        },
        {
          "k": 4,
          "features": [
            "LSTAT",
            "RM",
            "PTRATIO",
            "INDUS"
          ],
          "rmse": 5.220087893560874,
          "mae": 3.3529287079256807,
          "mse": 27.249317616500797,
          "r2": 0.628420675407839,
          "adj_r2": 0.6130978166617704,
          "cv_rmse": 5.348008593136223,
          "cv_r2": 0.6662209378796847,
          "f_stat": 218.62285742621341,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 14.662952701432605,
              "stderr": 4.305554056843028,
              "tstat": 3.4055901999716056,
              "pvalue": 0.0007272055333440441,
              "ci_lower": 6.1985464570223225,
              "ci_upper": 23.127358945842886,
              "vif": null
            },
            {
              "feature": "LSTAT",
              "coef": -0.5808593684928822,
              "stderr": 0.05382762045924027,
              "tstat": -10.791102477448815,
              "pvalue": 0.0,
              "ci_lower": -0.6866805568281681,
              "ci_upper": -0.47503818015759636,
              "vif": 2.1420469226866263
            },
            {
              "feature": "RM",
              "coef": 4.937550991977018,
              "stderr": 0.4729344826902573,
              "tstat": 10.440243147190447,
              "pvalue": 0.0,
              "ci_lower": 4.007796183274054,
              "ci_upper": 5.867305800679982,
              "vif": 1.6461923036344361
            },
            {
              "feature": "PTRATIO",
              "coef": -0.8791069373339562,
              "stderr": 0.1294403805359135,
              "tstat": -6.791597287448071,
              "pvalue": 4.0394354527961696e-11,
              "ci_lower": -1.133577314623885,
              "ci_upper": -0.6246365600440272,
              "vif": 1.2169592039375405
            },
            {
              "feature": "INDUS",
              "coef": 0.02624260941433143,
              "stderr": 0.0483362668389717,
              "tstat": 0.5429175881901788,
              "pvalue": 0.5874896891262384,
              "ci_lower": -0.06878297694731487,
              "ci_upper": 0.12126819577597774,
              "vif": 1.6240501857298506
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 22.536210982078067,
              "residual": 27.463789017921933,
              "abs_error": 27.463789017921933,
              "pct_error": 54.92757803584386,
              "rank": 1
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": 0.26683329345537266,
              "residual": 17.633166706544625,
              "abs_error": 17.633166706544625,
              "pct_error": 98.50931120974651,
              "rank": 2
            },
            {
              "index": 365,
              "actual": 27.5,
              "predicted": 10.826884176446926,
              "residual": 16.673115823553076,
              "abs_error": 16.673115823553076,
              "pct_error": 60.629512085647555,
              "rank": 3
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 39.173946141549386,
              "residual": 10.826053858450614,
              "abs_error": 10.826053858450614,
              "pct_error": 21.652107716901227,
              "rank": 4
            },
            {
              "index": 375,
              "actual": 15.0,
              "predicted": 25.68154428946968,
              "residual": -10.68154428946968,
              "abs_error": 10.68154428946968,
              "pct_error": 71.2102952631312,
              "rank": 5
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 39.80582060413773,
              "residual": 10.194179395862271,
              "abs_error": 10.194179395862271,
              "pct_error": 20.388358791724542,
              "rank": 6
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 38.3719246618915,
              "residual": 10.128075338108502,
              "abs_error": 10.128075338108502,
              "pct_error": 20.882629563110314,
              "rank": 7
            },
            {
              "index": 436,
              "actual": 9.6,
              "predicted": 18.796989155553078,
              "residual": -9.196989155553078,
              "abs_error": 9.196989155553078,
              "pct_error": 95.80197037034456,
              "rank": 8
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -1.7874027164365507,
              "residual": 8.787402716436551,
              "abs_error": 8.787402716436551,
              "pct_error": 125.53432452052216,
              "rank": 9
            },
            {
              "index": 209,
              "actual": 20.0,
              "predicted": 11.563702583343325,
              "residual": 8.436297416656675,
              "abs_error": 8.436297416656675,
              "pct_error": 42.18148708328337,
              "rank": 10
            }
          ]
        },
        {
          "k": 5,
          "features": [
            "LSTAT",
            "RM",
            "PTRATIO",
            "INDUS",
            "TAX"
          ],
          "rmse": 5.281208043853675,
          "mae": 3.335726555181209,
          "mse": 27.891158402464757,
          "r2": 0.6196683547405585,
          "adj_r2": 0.5998594148832959,
          "cv_rmse": 5.375306617082264,
          "cv_r2": 0.663401592129236,
          "f_stat": 177.38793852339606,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 13.047503432914723,
              "stderr": 4.352192087952413,
              "tstat": 2.997915342255313,
              "pvalue": 0.002888830018208166,
              "ci_lower": 4.491344805134759,
              "ci_upper": 21.60366206069469,
              "vif": null
            },
            {
              "feature": "LSTAT",
              "coef": -0.5576371678497601,
              "stderr": 0.0546732673443534,
              "tstat": -10.199448376434967,
              "pvalue": 0.0,
              "ci_lower": -0.6651216581120899,
              "ci_upper": -0.4501526775874303,
              "vif": 2.229745995788575
            },
            {
              "feature": "RM",
              "coef": 5.104018340759618,
              "stderr": 0.4771956574595221,
              "tstat": 10.695860829774135,
              "pvalue": 0.0,
              "ci_lower": 4.165879200942298,
              "ci_upper": 6.042157480576938,
              "vif": 1.6910571692927077
            },
            {
              "feature": "PTRATIO",
              "coef": -0.7935699141213154,
              "stderr": 0.1349097695508426,
              "tstat": -5.882227186091573,
              "pvalue": 8.588588285007859e-09,
              "ci_lower": -1.0587947399991915,
              "ci_upper": -0.5283450882434393,
              "vif": 1.3338591638186919
            },
            {
              "feature": "INDUS",
              "coef": 0.09456812231003495,
              "stderr": 0.0577351388019278,
              "tstat": 1.637964752011253,
              "pvalue": 0.102219350151739,
              "ci_lower": -0.018935830641315043,
              "ci_upper": 0.20807207526138494,
              "vif": 2.3378701260015844
            },
            {
              "feature": "TAX",
              "coef": -0.005055738220219652,
              "stderr": 0.0023606197673384025,
              "tstat": -2.1416995189869117,
              "pvalue": 0.03282417587611919,
              "ci_lower": -0.00969658053164505,
              "ci_upper": -0.00041489590879425445,
              "vif": 2.2703393954584774
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 21.77424832336307,
              "residual": 28.22575167663693,
              "abs_error": 28.22575167663693,
              "pct_error": 56.45150335327386,
              "rank": 1
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": -0.18264005115124693,
              "residual": 18.082640051151245,
              "abs_error": 18.082640051151245,
              "pct_error": 101.02033548129188,
              "rank": 2
            },
            {
              "index": 365,
              "actual": 27.5,
              "predicted": 9.566985203164204,
              "residual": 17.933014796835796,
              "abs_error": 17.933014796835796,
              "pct_error": 65.21096289758471,
              "rank": 3
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 38.91234680464259,
              "residual": 11.087653195357412,
              "abs_error": 11.087653195357412,
              "pct_error": 22.175306390714823,
              "rank": 4
            },
            {
              "index": 375,
              "actual": 15.0,
              "predicted": 25.192995116883804,
              "residual": -10.192995116883804,
              "abs_error": 10.192995116883804,
              "pct_error": 67.95330077922536,
              "rank": 5
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 39.90267120804854,
              "residual": 10.097328791951462,
              "abs_error": 10.097328791951462,
              "pct_error": 20.194657583902924,
              "rank": 6
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 38.46024132227077,
              "residual": 10.039758677729232,
              "abs_error": 10.039758677729232,
              "pct_error": 20.70053335614275,
              "rank": 7
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -2.1944110583819176,
              "residual": 9.194411058381917,
              "abs_error": 9.194411058381917,
              "pct_error": 131.34872940545594,
              "rank": 8
            },
            {
              "index": 436,
              "actual": 9.6,
              "predicted": 18.27366414676922,
              "residual": -8.673664146769221,
              "abs_error": 8.673664146769221,
              "pct_error": 90.35066819551272,
              "rank": 9
            },
            {
              "index": 408,
              "actual": 17.2,
              "predicted": 9.309602315622602,
              "residual": 7.8903976843773975,
              "abs_error": 7.8903976843773975,
              "pct_error": 45.874405141729056,
              "rank": 10
            }
          ]
        },
        {
          "k": 6,
          "features": [
            "LSTAT",
            "RM",
            "PTRATIO",
            "INDUS",
            "TAX",
            "NOX"
          ],
          "rmse": 5.272268556515522,
          "mae": 3.354337919292546,
          "mse": 27.796815732022267,
          "r2": 0.6209548378098451,
          "adj_r2": 0.59701514335573,
          "cv_rmse": 5.373710160910537,
          "cv_r2": 0.6634716107290112,
          "f_stat": 147.75618074574936,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 14.375979303531295,
              "stderr": 4.699238745501472,
              "tstat": 3.0592144987937155,
              "pvalue": 0.002369705028056446,
              "ci_lower": 5.137475986023526,
              "ci_upper": 23.614482621039066,
              "vif": null
            },
            {
              "feature": "LSTAT",
              "coef": -0.5454902562517367,
              "stderr": 0.05703790995017731,
              "tstat": -9.563643841932905,
              "pvalue": 0.0,
              "ci_lower": -0.6576243589939864,
              "ci_upper": -0.4333561535094871,
              "vif": 2.4241429027416705
            },
            {
              "feature": "RM",
              "coef": 5.138564776230125,
              "stderr": 0.479661111509737,
              "tstat": 10.712906785493727,
              "pvalue": 0.0,
              "ci_lower": 4.19557145115077,
              "ci_upper": 6.08155810130948,
              "vif": 1.7067111244038464
            },
            {
              "feature": "PTRATIO",
              "coef": -0.824986063762524,
              "stderr": 0.14129997875625894,
              "tstat": -5.838543438039838,
              "pvalue": 1.096083424023675e-08,
              "ci_lower": -1.1027758065699351,
              "ci_upper": -0.547196320955113,
              "vif": 1.4616151807583198
            },
            {
              "feature": "INDUS",
              "coef": 0.12191805136576862,
              "stderr": 0.06826141490734532,
              "tstat": 1.786046356221215,
              "pvalue": 0.0748548451366291,
              "ci_lower": -0.012280984314847102,
              "ci_upper": 0.25611708704638436,
              "vif": 3.2644964524486415
            },
            {
              "feature": "TAX",
              "coef": -0.0045542083672655,
              "stderr": 0.0024542553827071687,
              "tstat": -1.8556375181469404,
              "pvalue": 0.06424615858717253,
              "ci_lower": -0.009379169967026035,
              "ci_upper": 0.0002707532324950357,
              "vif": 2.451341888944441
            },
            {
              "feature": "NOX",
              "coef": -2.9211420631155423,
              "stderr": 3.8843287312177845,
              "tstat": -0.7520326587291,
              "pvalue": 0.45247704080238615,
              "ci_lower": -10.557566984917806,
              "ci_upper": 4.71528285868672,
              "vif": 3.080797575462576
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 21.7844306377914,
              "residual": 28.2155693622086,
              "abs_error": 28.2155693622086,
              "pct_error": 56.43113872441721,
              "rank": 1
            },
            {
              "index": 365,
              "actual": 27.5,
              "predicted": 9.202033314976045,
              "residual": 18.297966685023955,
              "abs_error": 18.297966685023955,
              "pct_error": 66.53806067281438,
              "rank": 2
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": 0.17373063799074817,
              "residual": 17.72626936200925,
              "abs_error": 17.72626936200925,
              "pct_error": 99.029437776588,
              "rank": 3
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 39.004308756436316,
              "residual": 10.995691243563684,
              "abs_error": 10.995691243563684,
              "pct_error": 21.991382487127368,
              "rank": 4
            },
            {
              "index": 375,
              "actual": 15.0,
              "predicted": 25.171723612846936,
              "residual": -10.171723612846936,
              "abs_error": 10.171723612846936,
              "pct_error": 67.8114907523129,
              "rank": 5
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 40.05201213138043,
              "residual": 9.94798786861957,
              "abs_error": 9.94798786861957,
              "pct_error": 19.89597573723914,
              "rank": 6
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 38.61462596856865,
              "residual": 9.885374031431347,
              "abs_error": 9.885374031431347,
              "pct_error": 20.382214497796593,
              "rank": 7
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -2.0905321294944605,
              "residual": 9.090532129494461,
              "abs_error": 9.090532129494461,
              "pct_error": 129.86474470706372,
              "rank": 8
            },
            {
              "index": 436,
              "actual": 9.6,
              "predicted": 18.07739753982339,
              "residual": -8.477397539823391,
              "abs_error": 8.477397539823391,
              "pct_error": 88.30622437316032,
              "rank": 9
            },
            {
              "index": 408,
              "actual": 17.2,
              "predicted": 9.603328544008683,
              "residual": 7.596671455991316,
              "abs_error": 7.596671455991316,
              "pct_error": 44.166694511577425,
              "rank": 10
            }
          ]
        },
        {
          "k": 7,
          "features": [
            "LSTAT",
            "RM",
            "PTRATIO",
            "INDUS",
            "TAX",
            "NOX",
            "RAD"
          ],
          "rmse": 5.088104895731692,
          "mae": 3.1923143043106914,
          "mse": 25.888811429968808,
          "r2": 0.6469729186973695,
          "adj_r2": 0.6206836679620673,
          "cv_rmse": 5.361643984508168,
          "cv_r2": 0.6642117833623179,
          "f_stat": 129.0856801899993,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 19.832891320904942,
              "stderr": 5.176806319127194,
              "tstat": 3.831105530764526,
              "pvalue": 0.0001482915238917304,
              "ci_lower": 9.65543189814919,
              "ci_upper": 30.010350743660695,
              "vif": null
            },
            {
              "feature": "LSTAT",
              "coef": -0.556834710591386,
              "stderr": 0.05687421848726111,
              "tstat": -9.790634937974714,
              "pvalue": 0.0,
              "ci_lower": -0.6686478662654496,
              "ci_upper": -0.4450215549173224,
              "vif": 2.440411694018235
            },
            {
              "feature": "RM",
              "coef": 4.919891779378107,
              "stderr": 0.48501878372768387,
              "tstat": 10.143713902306109,
              "pvalue": 0.0,
              "ci_lower": 3.9663581359763,
              "ci_upper": 5.873425422779913,
              "vif": 1.7668892099003894
            },
            {
              "feature": "PTRATIO",
              "coef": -0.9177530120582013,
              "stderr": 0.14546765272996576,
              "tstat": -6.308983439513132,
              "pvalue": 7.522849010399568e-10,
              "ci_lower": -1.2037384327436638,
              "ci_upper": -0.6317675913727387,
              "vif": 1.5684941963618608
            },
            {
              "feature": "INDUS",
              "coef": 0.16095700198257568,
              "stderr": 0.06969496941183682,
              "tstat": 2.3094493525272877,
              "pvalue": 0.021432458529937692,
              "ci_lower": 0.023938601170786583,
              "ci_upper": 0.29797540279436474,
              "vif": 3.4456383664311
            },
            {
              "feature": "TAX",
              "coef": -0.013544129805668215,
              "stderr": 0.00441479892053946,
              "tstat": -3.0678927963525933,
              "pvalue": 0.002303901455184887,
              "ci_lower": -0.022223503555349397,
              "ci_upper": -0.004864756055987031,
              "vif": 8.031329417473545
            },
            {
              "feature": "NOX",
              "coef": -4.422095867553622,
              "stderr": 3.908836561817402,
              "tstat": -1.131307435759755,
              "pvalue": 0.25861035753815886,
              "ci_lower": -12.106761479070634,
              "ci_upper": 3.2625697439633887,
              "vif": 3.1588385913976533
            },
            {
              "feature": "RAD",
              "coef": 0.19275382628424015,
              "stderr": 0.07890071401125469,
              "tstat": 2.4429921667976924,
              "pvalue": 0.015002127292318201,
              "ci_lower": 0.03763718374942973,
              "ci_upper": 0.3478704688190506,
              "vif": 6.854352845417977
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 22.298373609712698,
              "residual": 27.701626390287302,
              "abs_error": 27.701626390287302,
              "pct_error": 55.403252780574604,
              "rank": 1
            },
            {
              "index": 365,
              "actual": 27.5,
              "predicted": 10.193310247511903,
              "residual": 17.306689752488097,
              "abs_error": 17.306689752488097,
              "pct_error": 62.933417281774894,
              "rank": 2
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": 0.8041625124670597,
              "residual": 17.09583748753294,
              "abs_error": 17.09583748753294,
              "pct_error": 95.50747199739074,
              "rank": 3
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 39.23277458890893,
              "residual": 10.767225411091069,
              "abs_error": 10.767225411091069,
              "pct_error": 21.534450822182137,
              "rank": 4
            },
            {
              "index": 375,
              "actual": 15.0,
              "predicted": 25.34138733857602,
              "residual": -10.34138733857602,
              "abs_error": 10.34138733857602,
              "pct_error": 68.94258225717347,
              "rank": 5
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 40.59310953616142,
              "residual": 9.406890463838579,
              "abs_error": 9.406890463838579,
              "pct_error": 18.813780927677158,
              "rank": 6
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 39.18475284324399,
              "residual": 9.315247156756008,
              "abs_error": 9.315247156756008,
              "pct_error": 19.20669516856909,
              "rank": 7
            },
            {
              "index": 436,
              "actual": 9.6,
              "predicted": 18.27750691185838,
              "residual": -8.677506911858382,
              "abs_error": 8.677506911858382,
              "pct_error": 90.39069699852482,
              "rank": 8
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -1.6099654894138178,
              "residual": 8.609965489413817,
              "abs_error": 8.609965489413817,
              "pct_error": 122.99950699162596,
              "rank": 9
            },
            {
              "index": 496,
              "actual": 19.7,
              "predicted": 11.79227986871503,
              "residual": 7.90772013128497,
              "abs_error": 7.90772013128497,
              "pct_error": 40.140711326319646,
              "rank": 10
            }
          ]
        },
        {
          "k": 8,
          "features": [
            "LSTAT",
            "RM",
            "PTRATIO",
            "INDUS",
            "TAX",
            "NOX",
            "RAD",
            "CRIM"
          ],
          "rmse": 5.107992004694622,
          "mae": 3.228325631182805,
          "mse": 26.091582320024184,
          "r2": 0.6442078780664766,
          "adj_r2": 0.6136021041367112,
          "cv_rmse": 5.298919757844759,
          "cv_r2": 0.6736663041057946,
          "f_stat": 116.11236964192621,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 19.82644009989499,
              "stderr": 5.12907853891385,
              "tstat": 3.865497466937502,
              "pvalue": 0.00012957954301850982,
              "ci_lower": 9.742733928284549,
              "ci_upper": 29.910146271505432,
              "vif": null
            },
            {
              "feature": "LSTAT",
              "coef": -0.5334357054693936,
              "stderr": 0.0569249883035203,
              "tstat": -9.370853141420941,
              "pvalue": 0.0,
              "ci_lower": -0.6453495417501331,
              "ci_upper": -0.4215218691886539,
              "vif": 2.490481560512486
            },
            {
              "feature": "RM",
              "coef": 4.914528673534718,
              "stderr": 0.48055064871817144,
              "tstat": 10.226869293889855,
              "pvalue": 0.0,
              "ci_lower": 3.969771929124059,
              "ci_upper": 5.859285417945376,
              "vif": 1.7669153962145208
            },
            {
              "feature": "PTRATIO",
              "coef": -0.934726730225087,
              "stderr": 0.1442453731606683,
              "tstat": -6.480115859133574,
              "pvalue": 2.733429038670465e-10,
              "ci_lower": -1.2183113835953,
              "ci_upper": -0.6511420768548741,
              "vif": 1.571082727911685
            },
            {
              "feature": "INDUS",
              "coef": 0.16009959144414848,
              "stderr": 0.06905304064609996,
              "tstat": 2.318501690094522,
              "pvalue": 0.02093187534203711,
              "ci_lower": 0.024342151418869057,
              "ci_upper": 0.2958570314694279,
              "vif": 3.445701577611484
            },
            {
              "feature": "TAX",
              "coef": -0.013389341252164177,
              "stderr": 0.00437442195967472,
              "tstat": -3.060825264593314,
              "pvalue": 0.0023580634648578958,
              "ci_lower": -0.021989401745942688,
              "ci_upper": -0.004789280758385665,
              "vif": 8.032526137897005
            },
            {
              "feature": "NOX",
              "coef": -4.74780698904569,
              "stderr": 3.874427899644464,
              "tstat": -1.2254214330537347,
              "pvalue": 0.22114663860578654,
              "ci_lower": -12.36488522769903,
              "ci_upper": 2.8692712496076505,
              "vif": 3.1614971548020745
            },
            {
              "feature": "RAD",
              "coef": 0.25452545528602993,
              "stderr": 0.08102523748167212,
              "tstat": 3.14131082113278,
              "pvalue": 0.0018086224656863603,
              "ci_lower": 0.0952308215518472,
              "ci_upper": 0.41382008902021267,
              "vif": 7.36360413132879
            },
            {
              "feature": "CRIM",
              "coef": -0.1080776537178384,
              "stderr": 0.03728103981771686,
              "tstat": -2.8989978349927155,
              "pvalue": 0.003952455387008724,
              "ci_lower": -0.18137172563383883,
              "ci_upper": -0.034783581801837965,
              "vif": 1.6642177072565008
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 22.50546883647215,
              "residual": 27.49453116352785,
              "abs_error": 27.49453116352785,
              "pct_error": 54.98906232705569,
              "rank": 1
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": 0.5768363949997797,
              "residual": 17.323163605000218,
              "abs_error": 17.323163605000218,
              "pct_error": 96.77745030726379,
              "rank": 2
            },
            {
              "index": 365,
              "actual": 27.5,
              "predicted": 10.835333632547451,
              "residual": 16.664666367452547,
              "abs_error": 16.664666367452547,
              "pct_error": 60.59878679073654,
              "rank": 3
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -4.717986303294353,
              "residual": 11.717986303294353,
              "abs_error": 11.717986303294353,
              "pct_error": 167.39980433277648,
              "rank": 4
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 39.15638295562698,
              "residual": 10.843617044373019,
              "abs_error": 10.843617044373019,
              "pct_error": 21.687234088746038,
              "rank": 5
            },
            {
              "index": 375,
              "actual": 15.0,
              "predicted": 24.499560706293316,
              "residual": -9.499560706293316,
              "abs_error": 9.499560706293316,
              "pct_error": 63.33040470862211,
              "rank": 6
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 40.50320821453684,
              "residual": 9.49679178546316,
              "abs_error": 9.49679178546316,
              "pct_error": 18.99358357092632,
              "rank": 7
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 39.11596107295821,
              "residual": 9.384038927041793,
              "abs_error": 9.384038927041793,
              "pct_error": 19.348533870189264,
              "rank": 8
            },
            {
              "index": 436,
              "actual": 9.6,
              "predicted": 18.08638428276794,
              "residual": -8.486384282767942,
              "abs_error": 8.486384282767942,
              "pct_error": 88.39983627883274,
              "rank": 9
            },
            {
              "index": 496,
              "actual": 19.7,
              "predicted": 12.12668458240784,
              "residual": 7.573315417592159,
              "abs_error": 7.573315417592159,
              "pct_error": 38.44322547001096,
              "rank": 10
            }
          ]
        },
        {
          "k": 9,
          "features": [
            "LSTAT",
            "RM",
            "PTRATIO",
            "INDUS",
            "TAX",
            "NOX",
            "RAD",
            "CRIM",
            "AGE"
          ],
          "rmse": 5.058180952149092,
          "mae": 3.2092030291756464,
          "mse": 25.585194544683894,
          "r2": 0.6511131235552199,
          "adj_r2": 0.6169828856421435,
          "cv_rmse": 5.276156572863555,
          "cv_r2": 0.6758647827133828,
          "f_stat": 104.7572762937947,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 23.053709287611795,
              "stderr": 5.31027875007999,
              "tstat": 4.341336937776483,
              "pvalue": 1.802795812944069e-05,
              "ci_lower": 12.613684264900083,
              "ci_upper": 33.493734310323504,
              "vif": null
            },
            {
              "feature": "LSTAT",
              "coef": -0.571265931226261,
              "stderr": 0.05919452325284217,
              "tstat": -9.65065515919722,
              "pvalue": 0.0,
              "ci_lower": -0.6876425534436641,
              "ci_upper": -0.45488930900885793,
              "vif": 2.7192999380158254
            },
            {
              "feature": "RM",
              "coef": 4.642770036896621,
              "stderr": 0.4938756260875451,
              "tstat": 9.400686714743111,
              "pvalue": 0.0,
              "ci_lower": 3.6718089749403697,
              "ci_upper": 5.613731098852873,
              "vif": 1.8844700251076745
            },
            {
              "feature": "PTRATIO",
              "coef": -0.9882472896127336,
              "stderr": 0.14558790046423759,
              "tstat": -6.787976792449782,
              "pvalue": 4.194666836099259e-11,
              "ci_lower": -1.2744735680030737,
              "ci_upper": -0.7020210112223935,
              "vif": 1.61607854723617
            },
            {
              "feature": "INDUS",
              "coef": 0.1355909838687969,
              "stderr": 0.06961324055192765,
              "tstat": 1.9477757793455037,
              "pvalue": 0.052151662113906205,
              "ci_lower": -0.0012688699125562863,
              "ci_upper": 0.2724508376501501,
              "vif": 3.536000991106032
            },
            {
              "feature": "TAX",
              "coef": -0.012627072272538009,
              "stderr": 0.004366965524590591,
              "tstat": -2.891498043992874,
              "pvalue": 0.00404653637275465,
              "ci_lower": -0.02121254047406291,
              "ci_upper": -0.004041604071013109,
              "vif": 8.083267590965477
            },
            {
              "feature": "NOX",
              "coef": -8.915977507618464,
              "stderr": 4.2948281084474225,
              "tstat": -2.07598005845258,
              "pvalue": 0.038543790933704525,
              "ci_lower": -17.359623318068863,
              "ci_upper": -0.4723316971680642,
              "vif": 3.922706635776552
            },
            {
              "feature": "RAD",
              "coef": 0.2617566980674275,
              "stderr": 0.08069962422166228,
              "tstat": 3.243592527128074,
              "pvalue": 0.001280978214902806,
              "ci_lower": 0.10310097849999511,
              "ci_upper": 0.4204124176348599,
              "vif": 7.375805577220143
            },
            {
              "feature": "CRIM",
              "coef": -0.11235138793629235,
              "stderr": 0.03715117386841813,
              "tstat": -3.024167912815299,
              "pvalue": 0.002656400773251466,
              "ci_lower": -0.18539071469546792,
              "ci_upper": -0.03931206117711679,
              "vif": 1.6687674278878661
            },
            {
              "feature": "AGE",
              "coef": 0.031643031649805684,
              "stderr": 0.014362749110792394,
              "tstat": 2.20313196350611,
              "pvalue": 0.028163608916329963,
              "ci_lower": 0.0034058209178183495,
              "ci_upper": 0.059880242381793014,
              "vif": 2.4816583243176007
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 23.334195329159964,
              "residual": 26.665804670840036,
              "abs_error": 26.665804670840036,
              "pct_error": 53.33160934168008,
              "rank": 1
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": 0.9981937745414688,
              "residual": 16.90180622545853,
              "abs_error": 16.90180622545853,
              "pct_error": 94.42349846624877,
              "rank": 2
            },
            {
              "index": 365,
              "actual": 27.5,
              "predicted": 11.751224450416181,
              "residual": 15.748775549583819,
              "abs_error": 15.748775549583819,
              "pct_error": 57.26827472575934,
              "rank": 3
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -4.8810019499149995,
              "residual": 11.881001949915,
              "abs_error": 11.881001949915,
              "pct_error": 169.72859928449998,
              "rank": 4
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 38.82608068927088,
              "residual": 11.173919310729119,
              "abs_error": 11.173919310729119,
              "pct_error": 22.347838621458237,
              "rank": 5
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 40.06040649411513,
              "residual": 9.939593505884872,
              "abs_error": 9.939593505884872,
              "pct_error": 19.879187011769744,
              "rank": 6
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 38.72823734820824,
              "residual": 9.77176265179176,
              "abs_error": 9.77176265179176,
              "pct_error": 20.147964230498474,
              "rank": 7
            },
            {
              "index": 375,
              "actual": 15.0,
              "predicted": 24.604726919434228,
              "residual": -9.604726919434228,
              "abs_error": 9.604726919434228,
              "pct_error": 64.03151279622818,
              "rank": 8
            },
            {
              "index": 436,
              "actual": 9.6,
              "predicted": 17.83770321746033,
              "residual": -8.23770321746033,
              "abs_error": 8.23770321746033,
              "pct_error": 85.80940851521179,
              "rank": 9
            },
            {
              "index": 496,
              "actual": 19.7,
              "predicted": 12.03295480669547,
              "residual": 7.66704519330453,
              "abs_error": 7.66704519330453,
              "pct_error": 38.91901113352553,
              "rank": 10
            }
          ]
        },
        {
          "k": 10,
          "features": [
            "LSTAT",
            "RM",
            "PTRATIO",
            "INDUS",
            "TAX",
            "NOX",
            "RAD",
            "CRIM",
            "AGE",
            "B"
          ],
          "rmse": 5.217335910904537,
          "mae": 3.2832737872524964,
          "mse": 27.22059400721407,
          "r2": 0.6288123585864352,
          "adj_r2": 0.5880225078816479,
          "cv_rmse": 5.162774661654903,
          "cv_r2": 0.6895377809044225,
          "f_stat": 100.15715969156352,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 15.948939693745709,
              "stderr": 5.461869664313204,
              "tstat": 2.920051314653842,
              "pvalue": 0.003701352110771161,
              "ci_lower": 5.2108022614993335,
              "ci_upper": 26.687077125992083,
              "vif": null
            },
            {
              "feature": "LSTAT",
              "coef": -0.5379567144412811,
              "stderr": 0.05848449533952632,
              "tstat": -9.198279156180169,
              "pvalue": 0.0,
              "ci_lower": -0.6529383209623469,
              "ci_upper": -0.42297510792021537,
              "vif": 2.769139914650868
            },
            {
              "feature": "RM",
              "coef": 4.845675342335188,
              "stderr": 0.485896990630598,
              "tstat": 9.972639130871055,
              "pvalue": 0.0,
              "ci_lower": 3.890392813827182,
              "ci_upper": 5.8009578708431935,
              "vif": 1.9028818053432552
            },
            {
              "feature": "PTRATIO",
              "coef": -1.0051070944631288,
              "stderr": 0.14259657928704944,
              "tstat": -7.048605930720333,
              "pvalue": 8.166356479932801e-12,
              "ci_lower": -1.2854546237638111,
              "ci_upper": -0.7247595651624466,
              "vif": 1.6173330508461397
            },
            {
              "feature": "INDUS",
              "coef": 0.14911542496422037,
              "stderr": 0.068230897031489,
              "tstat": 2.1854530931258696,
              "pvalue": 0.02944535466258147,
              "ci_lower": 0.01497221128837567,
              "ci_upper": 0.28325863864006506,
              "vif": 3.5437264139412785
            },
            {
              "feature": "TAX",
              "coef": -0.011855672118407268,
              "stderr": 0.004279439955453556,
              "tstat": -2.7703793584716263,
              "pvalue": 0.005864832788947227,
              "ci_lower": -0.02026913073221418,
              "ci_upper": -0.003442213504600356,
              "vif": 8.097867219347314
            },
            {
              "feature": "NOX",
              "coef": -8.044857866318035,
              "stderr": 4.209956386691704,
              "tstat": -1.9109124008384084,
              "pvalue": 0.056743125425364305,
              "ci_lower": -16.321710490508835,
              "ci_upper": 0.23199475787276747,
              "vif": 3.9320478815327435
            },
            {
              "feature": "RAD",
              "coef": 0.2840495242969284,
              "stderr": 0.07918517820041927,
              "tstat": 3.587155206975646,
              "pvalue": 0.00037647935801587984,
              "ci_lower": 0.12836998993002002,
              "ci_upper": 0.4397290586638368,
              "vif": 7.4083856182201036
            },
            {
              "feature": "CRIM",
              "coef": -0.09677431219929751,
              "stderr": 0.036558335431171526,
              "tstat": -2.647120309443376,
              "pvalue": 0.008444520198551242,
              "ci_lower": -0.16864868018706694,
              "ci_upper": -0.02489994421152808,
              "vif": 1.6857489855936905
            },
            {
              "feature": "AGE",
              "coef": 0.02824752717683733,
              "stderr": 0.014084915982027785,
              "tstat": 2.0055161999461624,
              "pvalue": 0.04559297817037167,
              "ci_lower": 0.0005563201667418242,
              "ci_upper": 0.055938734186932834,
              "vif": 2.489686749827253
            },
            {
              "feature": "B",
              "coef": 0.013304546244111704,
              "stderr": 0.0031339557367302973,
              "tstat": 4.245288498551845,
              "pvalue": 2.7271389672955948e-05,
              "ci_lower": 0.007143130927399178,
              "ci_upper": 0.019465961560824228,
              "vif": 1.3186723937921012
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 23.98652449784104,
              "residual": 26.01347550215896,
              "abs_error": 26.01347550215896,
              "pct_error": 52.02695100431792,
              "rank": 1
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": -2.2131213902307842,
              "residual": 20.113121390230784,
              "abs_error": 20.113121390230784,
              "pct_error": 112.36380664933401,
              "rank": 2
            },
            {
              "index": 365,
              "actual": 27.5,
              "predicted": 11.676255674838277,
              "residual": 15.823744325161723,
              "abs_error": 15.823744325161723,
              "pct_error": 57.54088845513354,
              "rank": 3
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -6.732944748323132,
              "residual": 13.732944748323131,
              "abs_error": 13.732944748323131,
              "pct_error": 196.18492497604473,
              "rank": 4
            },
            {
              "index": 375,
              "actual": 15.0,
              "predicted": 26.222612587370016,
              "residual": -11.222612587370016,
              "abs_error": 11.222612587370016,
              "pct_error": 74.81741724913343,
              "rank": 5
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 38.97165987759033,
              "residual": 11.028340122409674,
              "abs_error": 11.028340122409674,
              "pct_error": 22.056680244819347,
              "rank": 6
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 40.182639747908254,
              "residual": 9.817360252091746,
              "abs_error": 9.817360252091746,
              "pct_error": 19.63472050418349,
              "rank": 7
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 38.87021110754333,
              "residual": 9.629788892456673,
              "abs_error": 9.629788892456673,
              "pct_error": 19.855234829807575,
              "rank": 8
            },
            {
              "index": 395,
              "actual": 13.1,
              "predicted": 20.99995045334301,
              "residual": -7.899950453343012,
              "abs_error": 7.899950453343012,
              "pct_error": 60.304965292694746,
              "rank": 9
            },
            {
              "index": 381,
              "actual": 10.9,
              "predicted": 18.786464682508118,
              "residual": -7.886464682508118,
              "abs_error": 7.886464682508118,
              "pct_error": 72.35288699548732,
              "rank": 10
            }
          ]
        },
        {
          "k": 11,
          "features": [
            "LSTAT",
            "RM",
            "PTRATIO",
            "INDUS",
            "TAX",
            "NOX",
            "RAD",
            "CRIM",
            "AGE",
            "B",
            "ZN"
          ],
          "rmse": 5.271005771775807,
          "mae": 3.3356989051132886,
          "mse": 27.783501846093873,
          "r2": 0.6211363896861377,
          "adj_r2": 0.5748308373144434,
          "cv_rmse": 5.176956144188025,
          "cv_r2": 0.6884440790595535,
          "f_stat": 91.03052316730056,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 17.02214055118454,
              "stderr": 5.6236742711277365,
              "tstat": 3.0268717088714,
              "pvalue": 0.00263413973490656,
              "ci_lower": 5.965805125528293,
              "ci_upper": 28.078475976840785,
              "vif": null
            },
            {
              "feature": "LSTAT",
              "coef": -0.5340488501332981,
              "stderr": 0.05871032336521643,
              "tstat": -9.096336377014424,
              "pvalue": 0.0,
              "ci_lower": -0.6494753483227825,
              "ci_upper": -0.4186223519438136,
              "vif": 2.788093391395626
            },
            {
              "feature": "RM",
              "coef": 4.874944785463624,
              "stderr": 0.4874626081147905,
              "tstat": 10.000653802590012,
              "pvalue": 0.0,
              "ci_lower": 3.9165766718528126,
              "ci_upper": 5.833312899074436,
              "vif": 1.9134669998883853
            },
            {
              "feature": "PTRATIO",
              "coef": -1.0459411661830955,
              "stderr": 0.15136138818782402,
              "tstat": -6.910224454899881,
              "pvalue": 1.9678925156085825e-11,
              "ci_lower": -1.3435228178959981,
              "ci_upper": -0.7483595144701929,
              "vif": 1.820649797128843
            },
            {
              "feature": "INDUS",
              "coef": 0.13688741968029278,
              "stderr": 0.06992146043970522,
              "tstat": 1.9577311288904462,
              "pvalue": 0.05097064241650062,
              "ci_lower": -0.0005805563797977309,
              "ci_upper": 0.27435539574038326,
              "vif": 3.71821048635099
            },
            {
              "feature": "TAX",
              "coef": -0.010815372728151196,
              "stderr": 0.004471060916524703,
              "tstat": -2.418972349085738,
              "pvalue": 0.016018975155985604,
              "ci_lower": -0.01960563098607232,
              "ci_upper": -0.00202511447023007,
              "vif": 8.831468354501007
            },
            {
              "feature": "NOX",
              "coef": -8.772808168848774,
              "stderr": 4.307265536848588,
              "tstat": -2.0367465376345018,
              "pvalue": 0.04234690733923463,
              "ci_lower": -17.241039123700535,
              "ci_upper": -0.304577213997014,
              "vif": 4.112272284598637
            },
            {
              "feature": "RAD",
              "coef": 0.2745840243177474,
              "stderr": 0.08008325285679321,
              "tstat": 3.4287321571310936,
              "pvalue": 0.0006707359024964443,
              "ci_lower": 0.11713761777386494,
              "ci_upper": 0.4320304308616299,
              "vif": 7.570667274192644
            },
            {
              "feature": "CRIM",
              "coef": -0.09564671026564713,
              "stderr": 0.036601205819642574,
              "tstat": -2.6132120000898142,
              "pvalue": 0.009314752318896113,
              "ci_lower": -0.16760592927715268,
              "ci_upper": -0.02368749125414156,
              "vif": 1.6882075310033067
            },
            {
              "feature": "AGE",
              "coef": 0.02509133318430168,
              "stderr": 0.014623460264698808,
              "tstat": 1.7158273575558878,
              "pvalue": 0.08698376540018304,
              "ci_lower": -0.0036588884635540414,
              "ci_upper": 0.0538415548321574,
              "vif": 2.6813373104969975
            },
            {
              "feature": "B",
              "coef": 0.013316467960616418,
              "stderr": 0.0031353800624229315,
              "tstat": 4.2471622883019275,
              "pvalue": 2.7069288528247526e-05,
              "ci_lower": 0.007152203818391964,
              "ci_upper": 0.019480732102840872,
              "vif": 1.3187016471219444
            },
            {
              "feature": "ZN",
              "coef": -0.01236084206590572,
              "stderr": 0.015311362525651611,
              "tstat": -0.8072986349318821,
              "pvalue": 0.41998401586521394,
              "ci_lower": -0.04246350302131691,
              "ci_upper": 0.01774181888950547,
              "vif": 2.0105522765193045
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 23.93821786632887,
              "residual": 26.06178213367113,
              "abs_error": 26.06178213367113,
              "pct_error": 52.12356426734226,
              "rank": 1
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": -2.1793071873727454,
              "residual": 20.079307187372745,
              "abs_error": 20.079307187372745,
              "pct_error": 112.1749004881159,
              "rank": 2
            },
            {
              "index": 365,
              "actual": 27.5,
              "predicted": 11.510269334662821,
              "residual": 15.989730665337179,
              "abs_error": 15.989730665337179,
              "pct_error": 58.144475146680655,
              "rank": 3
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -6.730923443424441,
              "residual": 13.730923443424441,
              "abs_error": 13.730923443424441,
              "pct_error": 196.15604919177773,
              "rank": 4
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 38.52839765583953,
              "residual": 11.471602344160473,
              "abs_error": 11.471602344160473,
              "pct_error": 22.943204688320947,
              "rank": 5
            },
            {
              "index": 375,
              "actual": 15.0,
              "predicted": 26.211271772224663,
              "residual": -11.211271772224663,
              "abs_error": 11.211271772224663,
              "pct_error": 74.74181181483108,
              "rank": 6
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 39.49119509010192,
              "residual": 10.508804909898082,
              "abs_error": 10.508804909898082,
              "pct_error": 21.017609819796164,
              "rank": 7
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 38.17304345287971,
              "residual": 10.32695654712029,
              "abs_error": 10.32695654712029,
              "pct_error": 21.292693911588227,
              "rank": 8
            },
            {
              "index": 381,
              "actual": 10.9,
              "predicted": 18.774502330620482,
              "residual": -7.874502330620482,
              "abs_error": 7.874502330620482,
              "pct_error": 72.24314064789432,
              "rank": 9
            },
            {
              "index": 395,
              "actual": 13.1,
              "predicted": 20.947149336720745,
              "residual": -7.847149336720745,
              "abs_error": 7.847149336720745,
              "pct_error": 59.901903333746155,
              "rank": 10
            }
          ]
        },
        {
          "k": 12,
          "features": [
            "LSTAT",
            "RM",
            "PTRATIO",
            "INDUS",
            "TAX",
            "NOX",
            "RAD",
            "CRIM",
            "AGE",
            "B",
            "ZN",
            "DIS"
          ],
          "rmse": 4.963405499893667,
          "mae": 3.2372423618145576,
          "mse": 24.6353941563747,
          "r2": 0.6640648675861085,
          "adj_r2": 0.618770242990977,
          "cv_rmse": 4.907617088082696,
          "cv_r2": 0.7193435342641527,
          "f_stat": 95.42707811156261,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 30.101279866903287,
              "stderr": 5.730690271885741,
              "tstat": 5.2526446970232366,
              "pvalue": 2.468391644416812e-07,
              "ci_lower": 18.834458095838478,
              "ci_upper": 41.368101637968095,
              "vif": null
            },
            {
              "feature": "LSTAT",
              "coef": -0.5247680884790776,
              "stderr": 0.05593380227456814,
              "tstat": -9.381949145940292,
              "pvalue": 0.0,
              "ci_lower": -0.6347367225016186,
              "ci_upper": -0.4147994544565367,
              "vif": 2.7899589646985365
            },
            {
              "feature": "RM",
              "coef": 4.498770639599276,
              "stderr": 0.4679412399644157,
              "tstat": 9.61396486435216,
              "pvalue": 0.0,
              "ci_lower": 3.578774914847733,
              "ci_upper": 5.4187663643508195,
              "vif": 1.943979862624545
            },
            {
              "feature": "PTRATIO",
              "coef": -0.9446561644216998,
              "stderr": 0.14501665349779955,
              "tstat": -6.514121941422636,
              "pvalue": 2.25262031250395e-10,
              "ci_lower": -1.2297661095205694,
              "ci_upper": -0.6595462193228301,
              "vif": 1.842479770198469
            },
            {
              "feature": "INDUS",
              "coef": 0.060571477923613976,
              "stderr": 0.06764624516302116,
              "tstat": 0.895415226338762,
              "pvalue": 0.3711160591558238,
              "ci_lower": -0.07242440068329575,
              "ci_upper": 0.1935673565305237,
              "vif": 3.8368174622127325
            },
            {
              "feature": "TAX",
              "coef": -0.011934790071862988,
              "stderr": 0.004261763947721464,
              "tstat": -2.8004343314800155,
              "pvalue": 0.005356663377073634,
              "ci_lower": -0.02031362971442615,
              "ci_upper": -0.0035559504292998288,
              "vif": 8.846292255742288
            },
            {
              "feature": "NOX",
              "coef": -16.19905017758469,
              "stderr": 4.262332082094708,
              "tstat": -3.8005133963245132,
              "pvalue": 0.00016741760910710113,
              "ci_lower": -24.579006800550154,
              "ci_upper": -7.819093554619229,
              "vif": 4.439600523245743
            },
            {
              "feature": "RAD",
              "coef": 0.28559099793400305,
              "stderr": 0.07628974123870892,
              "tstat": 3.7435046088358734,
              "pvalue": 0.00020871057313653907,
              "ci_lower": 0.13560157663967345,
              "ci_upper": 0.4355804192283327,
              "vif": 7.574496873248376
            },
            {
              "feature": "CRIM",
              "coef": -0.11918976453198063,
              "stderr": 0.03505117369185193,
              "tstat": -3.4004500271466727,
              "pvalue": 0.0007420501710735383,
              "ci_lower": -0.1881021133270553,
              "ci_upper": -0.05027741573690597,
              "vif": 1.706911223815323
            },
            {
              "feature": "AGE",
              "coef": -0.005111766389221298,
              "stderr": 0.014701161336414715,
              "tstat": -0.3477117400622952,
              "pvalue": 0.7282437832192055,
              "ci_lower": -0.034014979919648164,
              "ci_upper": 0.023791447141205565,
              "vif": 2.98761889747562
            },
            {
              "feature": "B",
              "coef": 0.012926483770760555,
              "stderr": 0.0029867216622529984,
              "tstat": 4.327984068327818,
              "pvalue": 1.9136973508526722e-05,
              "ci_lower": 0.00705444060460462,
              "ci_upper": 0.018798526936916492,
              "vif": 1.3192479416781695
            },
            {
              "feature": "ZN",
              "coef": 0.03196398388456158,
              "stderr": 0.0161358207454664,
              "tstat": 1.9809332533358948,
              "pvalue": 0.04829903042754591,
              "ci_lower": 0.00024015868309991417,
              "ci_upper": 0.06368780908602324,
              "vif": 2.461730859635983
            },
            {
              "feature": "DIS",
              "coef": -1.4632422122421536,
              "stderr": 0.22804166124719064,
              "tstat": -6.41655653725501,
              "pvalue": 4.0347702956466946e-10,
              "ci_lower": -1.9115834471985105,
              "ci_upper": -1.0149009772857966,
              "vif": 4.1663040460703415
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 25.17368386936618,
              "residual": 24.82631613063382,
              "abs_error": 24.82631613063382,
              "pct_error": 49.65263226126764,
              "rank": 1
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": -0.5204526837969223,
              "residual": 18.42045268379692,
              "abs_error": 18.42045268379692,
              "pct_error": 102.90755689272024,
              "rank": 2
            },
            {
              "index": 365,
              "actual": 27.5,
              "predicted": 12.906222407242728,
              "residual": 14.593777592757272,
              "abs_error": 14.593777592757272,
              "pct_error": 53.068282155480986,
              "rank": 3
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -6.529709346189142,
              "residual": 13.529709346189142,
              "abs_error": 13.529709346189142,
              "pct_error": 193.2815620884163,
              "rank": 4
            },
            {
              "index": 375,
              "actual": 15.0,
              "predicted": 26.365056511080752,
              "residual": -11.365056511080752,
              "abs_error": 11.365056511080752,
              "pct_error": 75.76704340720501,
              "rank": 5
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 40.88127145258733,
              "residual": 9.118728547412672,
              "abs_error": 9.118728547412672,
              "pct_error": 18.237457094825345,
              "rank": 6
            },
            {
              "index": 381,
              "actual": 10.9,
              "predicted": 19.042884512954952,
              "residual": -8.142884512954952,
              "abs_error": 8.142884512954952,
              "pct_error": 74.70536250417386,
              "rank": 7
            },
            {
              "index": 395,
              "actual": 13.1,
              "predicted": 20.920572343133838,
              "residual": -7.820572343133838,
              "abs_error": 7.820572343133838,
              "pct_error": 59.69902552010563,
              "rank": 8
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 43.16818646446907,
              "residual": 6.831813535530927,
              "abs_error": 6.831813535530927,
              "pct_error": 13.663627071061853,
              "rank": 9
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 41.886266380553245,
              "residual": 6.613733619446755,
              "abs_error": 6.613733619446755,
              "pct_error": 13.636564163807744,
              "rank": 10
            }
          ]
        },
        {
          "k": 13,
          "features": [
            "LSTAT",
            "RM",
            "PTRATIO",
            "INDUS",
            "TAX",
            "NOX",
            "RAD",
            "CRIM",
            "AGE",
            "B",
            "ZN",
            "DIS",
            "CHAS"
          ],
          "rmse": 4.928602182665343,
          "mae": 3.189091965887835,
          "mse": 24.29111947497358,
          "r2": 0.6687594935356311,
          "adj_r2": 0.6198262368988494,
          "cv_rmse": 4.931367360873801,
          "cv_r2": 0.7184784187192015,
          "f_stat": 90.4266165387097,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 30.246750993925044,
              "stderr": 5.676806440074125,
              "tstat": 5.328127938343111,
              "pvalue": 1.6816101244820914e-07,
              "ci_lower": 19.085778659588925,
              "ci_upper": 41.40772332826116,
              "vif": null
            },
            {
              "feature": "LSTAT",
              "coef": -0.5085714244487942,
              "stderr": 0.0556839169989473,
              "tstat": -9.133183365286762,
              "pvalue": 0.0,
              "ci_lower": -0.6180496431714683,
              "ci_upper": -0.39909320572612017,
              "vif": 2.818045379538575
            },
            {
              "feature": "RM",
              "coef": 4.438835199513015,
              "stderr": 0.4639796661053513,
              "tstat": 9.566874420968984,
              "pvalue": 0.0,
              "ci_lower": 3.526620863554659,
              "ci_upper": 5.351049535471371,
              "vif": 1.9478087495837584
            },
            {
              "feature": "PTRATIO",
              "coef": -0.915456240468064,
              "stderr": 0.1439967443589442,
              "tstat": -6.357478737061471,
              "pvalue": 5.737761377133666e-10,
              "ci_lower": -1.1985632473724004,
              "ci_upper": -0.6323492335637275,
              "vif": 1.8514484070670416
            },
            {
              "feature": "INDUS",
              "coef": 0.04038072041333875,
              "stderr": 0.06736499472046818,
              "tstat": 0.5994318055081724,
              "pvalue": 0.5492330385284343,
              "ci_lower": -0.09206326024985022,
              "ci_upper": 0.1728247010765277,
              "vif": 3.8778553502602815
            },
            {
              "feature": "TAX",
              "coef": -0.010646786275310016,
              "stderr": 0.004244612368584221,
              "tstat": -2.5083059065912354,
              "pvalue": 0.012536260644874897,
              "ci_lower": -0.018991971497994975,
              "ci_upper": -0.0023016010526250574,
              "vif": 8.943301431814218
            },
            {
              "feature": "NOX",
              "coef": -17.202633391781248,
              "stderr": 4.2361190871668795,
              "tstat": -4.060941875759774,
              "pvalue": 5.909342124965633e-05,
              "ci_lower": -25.53112026832259,
              "ci_upper": -8.874146515239907,
              "vif": 4.469150159170634
            },
            {
              "feature": "RAD",
              "coef": 0.26242973558508365,
              "stderr": 0.07598646354966766,
              "tstat": 3.453637968209292,
              "pvalue": 0.0006137380080795118,
              "ci_lower": 0.11303538395191315,
              "ci_upper": 0.41182408721825414,
              "vif": 7.658315779148448
            },
            {
              "feature": "CRIM",
              "coef": -0.11305592398537724,
              "stderr": 0.0347840248791694,
              "tstat": -3.250225480751694,
              "pvalue": 0.0012532800108635556,
              "ci_lower": -0.18144358938342448,
              "ci_upper": -0.044668258587330006,
              "vif": 1.7131869906128505
            },
            {
              "feature": "AGE",
              "coef": -0.006296362210984396,
              "stderr": 0.014568042572182157,
              "tstat": -0.43220372124717504,
              "pvalue": 0.6658322215807408,
              "ci_lower": -0.03493808565706912,
              "ci_upper": 0.02234536123510033,
              "vif": 2.9899478376482787
            },
            {
              "feature": "B",
              "coef": 0.012351334729968133,
              "stderr": 0.0029651025885100903,
              "tstat": 4.165567416732941,
              "pvalue": 3.8269380584043944e-05,
              "ci_lower": 0.00652174932694752,
              "ci_upper": 0.018180920132988748,
              "vif": 1.3251213980906684
            },
            {
              "feature": "ZN",
              "coef": 0.03011046414564792,
              "stderr": 0.015996138029708083,
              "tstat": 1.8823583598570268,
              "pvalue": 0.06053163638411507,
              "ci_lower": -0.0013389882692670038,
              "ci_upper": 0.061559916560562845,
              "vif": 2.465630718663123
            },
            {
              "feature": "DIS",
              "coef": -1.4478653685307938,
              "stderr": 0.22595036782635275,
              "tstat": -6.407891177426658,
              "pvalue": 4.258553509828289e-10,
              "ci_lower": -1.8920985533089,
              "ci_upper": -1.0036321837526876,
              "vif": 4.168578373544288
            },
            {
              "feature": "CHAS",
              "coef": 2.784438203507962,
              "stderr": 0.9556875964881927,
              "tstat": 2.913544356691212,
              "pvalue": 0.0037792729194365826,
              "ci_lower": 0.9054939524981245,
              "ci_upper": 4.663382454517799,
              "vif": 1.0966737120634569
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 24.739571606518894,
              "residual": 25.260428393481106,
              "abs_error": 25.260428393481106,
              "pct_error": 50.52085678696221,
              "rank": 1
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": -0.1642369956866978,
              "residual": 18.064236995686695,
              "abs_error": 18.064236995686695,
              "pct_error": 100.91752511556813,
              "rank": 2
            },
            {
              "index": 365,
              "actual": 27.5,
              "predicted": 12.503956484181654,
              "residual": 14.996043515818346,
              "abs_error": 14.996043515818346,
              "pct_error": 54.531067330248526,
              "rank": 3
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -6.088421842193753,
              "residual": 13.088421842193753,
              "abs_error": 13.088421842193753,
              "pct_error": 186.97745488848219,
              "rank": 4
            },
            {
              "index": 375,
              "actual": 15.0,
              "predicted": 25.939095624449017,
              "residual": -10.939095624449017,
              "abs_error": 10.939095624449017,
              "pct_error": 72.92730416299345,
              "rank": 5
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 40.50033966050782,
              "residual": 9.49966033949218,
              "abs_error": 9.49966033949218,
              "pct_error": 18.99932067898436,
              "rank": 6
            },
            {
              "index": 381,
              "actual": 10.9,
              "predicted": 18.765486949814353,
              "residual": -7.865486949814352,
              "abs_error": 7.865486949814352,
              "pct_error": 72.16043073224176,
              "rank": 7
            },
            {
              "index": 395,
              "actual": 13.1,
              "predicted": 20.523848928752603,
              "residual": -7.423848928752603,
              "abs_error": 7.423848928752603,
              "pct_error": 56.67060250956186,
              "rank": 8
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 42.67251161101974,
              "residual": 7.327488388980257,
              "abs_error": 7.327488388980257,
              "pct_error": 14.654976777960513,
              "rank": 9
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 41.41377225132502,
              "residual": 7.086227748674979,
              "abs_error": 7.086227748674979,
              "pct_error": 14.61077886324738,
              "rank": 10
            }
          ]
        }
      ],
      "RFECV": [
        {
          "k": 1,
          "features": [
            "LSTAT"
          ],
          "rmse": 5.789606996393182,
          "mae": 4.184807930623362,
          "mse": 33.51954917268489,
          "r2": 0.5429180422970386,
          "adj_r2": 0.538347222720009,
          "cv_rmse": 6.332558301047439,
          "cv_r2": 0.5428147541494676,
          "f_stat": 476.33924982804336,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 34.83694982031851,
              "stderr": 0.6350210267842641,
              "tstat": 54.859521733842804,
              "pvalue": 0.0,
              "ci_lower": 33.588572993959744,
              "ci_upper": 36.085326646677274,
              "vif": null
            },
            {
              "feature": "LSTAT",
              "coef": -0.9665309019503531,
              "stderr": 0.044285092860186184,
              "tstat": -21.825197589667866,
              "pvalue": 0.0,
              "ci_lower": -1.0535901981751759,
              "ci_upper": -0.8794716057255303,
              "vif": 1.0
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 25.625910324731645,
              "residual": 24.374089675268355,
              "abs_error": 24.374089675268355,
              "pct_error": 48.74817935053671,
              "rank": 1
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 31.96635304152596,
              "residual": 18.03364695847404,
              "abs_error": 18.03364695847404,
              "pct_error": 36.06729391694808,
              "rank": 2
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 32.05334082270149,
              "residual": 17.946659177298507,
              "abs_error": 17.946659177298507,
              "pct_error": 35.893318354597014,
              "rank": 3
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 31.154467083887663,
              "residual": 17.345532916112337,
              "abs_error": 17.345532916112337,
              "pct_error": 35.76398539404605,
              "rank": 4
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": 1.6172827202848765,
              "residual": 16.282717279715122,
              "abs_error": 16.282717279715122,
              "pct_error": 90.9649010039951,
              "rank": 5
            },
            {
              "index": 268,
              "actual": 43.5,
              "predicted": 31.782712170155392,
              "residual": 11.717287829844608,
              "abs_error": 11.717287829844608,
              "pct_error": 26.93629386171174,
              "rank": 6
            },
            {
              "index": 355,
              "actual": 20.6,
              "predicted": 29.45337269645504,
              "residual": -8.85337269645504,
              "abs_error": 8.85337269645504,
              "pct_error": 42.977537361432226,
              "rank": 7
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -0.9053629338055416,
              "residual": 7.905362933805542,
              "abs_error": 7.905362933805542,
              "pct_error": 112.93375619722201,
              "rank": 8
            },
            {
              "index": 408,
              "actual": 17.2,
              "predicted": 9.320534008829188,
              "residual": 7.879465991170811,
              "abs_error": 7.879465991170811,
              "pct_error": 45.810848785876814,
              "rank": 9
            },
            {
              "index": 436,
              "actual": 9.6,
              "predicted": 17.391067040114635,
              "residual": -7.791067040114635,
              "abs_error": 7.791067040114635,
              "pct_error": 81.15694833452746,
              "rank": 10
            }
          ]
        },
        {
          "k": 2,
          "features": [
            "LSTAT",
            "RM"
          ],
          "rmse": 5.589569804715173,
          "mae": 3.898759721382362,
          "mse": 31.243290601783617,
          "r2": 0.573957741502586,
          "adj_r2": 0.5653508271895069,
          "cv_rmse": 5.583527948544508,
          "cv_r2": 0.6359466638068296,
          "f_stat": 372.61794090137715,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": -3.8411770790048383,
              "stderr": 3.5229849736559067,
              "tstat": -1.0903188937018753,
              "pvalue": 0.2762274312067523,
              "ci_lower": -10.76700430913337,
              "ci_upper": 3.084650151123692,
              "vif": null
            },
            {
              "feature": "LSTAT",
              "coef": -0.6324985627075881,
              "stderr": 0.04904544343244726,
              "tstat": -12.89617380213434,
              "pvalue": 0.0,
              "ci_lower": -0.7289168756377382,
              "ci_upper": -0.536080249777438,
              "vif": 1.600640940207779
            },
            {
              "feature": "RM",
              "coef": 5.4650987730758604,
              "stderr": 0.4915510985577764,
              "tstat": 11.118068475710055,
              "pvalue": 0.0,
              "ci_lower": 4.498759714337782,
              "ci_upper": 6.4314378318139385,
              "vif": 1.6006409402077786
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 24.1021655918314,
              "residual": 25.8978344081686,
              "abs_error": 25.8978344081686,
              "pct_error": 51.79566881633719,
              "rank": 1
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": -0.28767555746955153,
              "residual": 18.18767555746955,
              "abs_error": 18.18767555746955,
              "pct_error": 101.60712601938297,
              "rank": 2
            },
            {
              "index": 365,
              "actual": 27.5,
              "predicted": 11.116649885440271,
              "residual": 16.38335011455973,
              "abs_error": 16.38335011455973,
              "pct_error": 59.57581859839901,
              "rank": 3
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 37.31795502772603,
              "residual": 12.682044972273971,
              "abs_error": 12.682044972273971,
              "pct_error": 25.364089944547942,
              "rank": 4
            },
            {
              "index": 375,
              "actual": 15.0,
              "predicted": 27.62430956570894,
              "residual": -12.624309565708941,
              "abs_error": 12.624309565708941,
              "pct_error": 84.16206377139294,
              "rank": 5
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 36.66642406204398,
              "residual": 11.83357593795602,
              "abs_error": 11.83357593795602,
              "pct_error": 24.399125645270146,
              "rank": 6
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 38.24383060328878,
              "residual": 11.756169396711222,
              "abs_error": 11.756169396711222,
              "pct_error": 23.512338793422444,
              "rank": 7
            },
            {
              "index": 436,
              "actual": 9.6,
              "predicted": 20.052227036966336,
              "residual": -10.452227036966336,
              "abs_error": 10.452227036966336,
              "pct_error": 108.87736496839935,
              "rank": 8
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -2.534192572401629,
              "residual": 9.53419257240163,
              "abs_error": 9.53419257240163,
              "pct_error": 136.202751034309,
              "rank": 9
            },
            {
              "index": 209,
              "actual": 20.0,
              "predicted": 10.759918951394354,
              "residual": 9.240081048605646,
              "abs_error": 9.240081048605646,
              "pct_error": 46.20040524302823,
              "rank": 10
            }
          ]
        },
        {
          "k": 3,
          "features": [
            "LSTAT",
            "RM",
            "PTRATIO"
          ],
          "rmse": 5.207202455789533,
          "mae": 3.3325380783241023,
          "mse": 27.114957415580545,
          "r2": 0.6302528487272832,
          "adj_r2": 0.6189340583822001,
          "cv_rmse": 5.335324974716855,
          "cv_r2": 0.6677558712662522,
          "f_stat": 291.91356322846076,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 14.588099261571113,
              "stderr": 4.29955072031452,
              "tstat": 3.392935729922955,
              "pvalue": 0.0007604665622396034,
              "ci_lower": 6.13555943016398,
              "ci_upper": 23.040639092978246,
              "vif": null
            },
            {
              "feature": "LSTAT",
              "coef": -0.567125882738386,
              "stderr": 0.04747167069939089,
              "tstat": -11.946617306343567,
              "pvalue": 0.0,
              "ci_lower": -0.6604510261200396,
              "ci_upper": -0.4738007393567325,
              "vif": 1.6689911381361469
            },
            {
              "feature": "RM",
              "coef": 4.933118359418629,
              "stderr": 0.47244696667464253,
              "tstat": 10.44163410369802,
              "pvalue": 0.0,
              "ci_lower": 4.004329036111665,
              "ci_upper": 5.861907682725594,
              "vif": 1.6457016960613688
            },
            {
              "feature": "PTRATIO",
              "coef": -0.867094754623303,
              "stderr": 0.1274229510720028,
              "tstat": -6.804855383810208,
              "pvalue": 3.708500173615903e-11,
              "ci_lower": -1.117597106946468,
              "ci_upper": -0.6165924023001379,
              "vif": 1.1814032369705776
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 22.332339277829774,
              "residual": 27.667660722170226,
              "abs_error": 27.667660722170226,
              "pct_error": 55.335321444340444,
              "rank": 1
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": 0.41114039585148277,
              "residual": 17.488859604148516,
              "abs_error": 17.488859604148516,
              "pct_error": 97.70312628015931,
              "rank": 2
            },
            {
              "index": 365,
              "actual": 27.5,
              "predicted": 10.601683410972822,
              "residual": 16.89831658902718,
              "abs_error": 16.89831658902718,
              "pct_error": 61.44842396009883,
              "rank": 3
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 39.26587800368425,
              "residual": 10.73412199631575,
              "abs_error": 10.73412199631575,
              "pct_error": 21.4682439926315,
              "rank": 4
            },
            {
              "index": 375,
              "actual": 15.0,
              "predicted": 25.52650791660492,
              "residual": -10.52650791660492,
              "abs_error": 10.52650791660492,
              "pct_error": 70.1767194440328,
              "rank": 5
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 39.84115672589128,
              "residual": 10.158843274108719,
              "abs_error": 10.158843274108719,
              "pct_error": 20.317686548217438,
              "rank": 6
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 38.42083523188981,
              "residual": 10.07916476811019,
              "abs_error": 10.07916476811019,
              "pct_error": 20.781783027031317,
              "rank": 7
            },
            {
              "index": 436,
              "actual": 9.6,
              "predicted": 18.709040754956288,
              "residual": -9.109040754956288,
              "abs_error": 9.109040754956288,
              "pct_error": 94.88584119746135,
              "rank": 8
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -1.6067680592723335,
              "residual": 8.606768059272333,
              "abs_error": 8.606768059272333,
              "pct_error": 122.95382941817618,
              "rank": 9
            },
            {
              "index": 209,
              "actual": 20.0,
              "predicted": 11.727784705881497,
              "residual": 8.272215294118503,
              "abs_error": 8.272215294118503,
              "pct_error": 41.361076470592515,
              "rank": 10
            }
          ]
        },
        {
          "k": 4,
          "features": [
            "LSTAT",
            "RM",
            "PTRATIO",
            "DIS"
          ],
          "rmse": 5.1751385474965685,
          "mae": 3.339626156735149,
          "mse": 26.782058985784897,
          "r2": 0.6347923449246614,
          "adj_r2": 0.6197322354370186,
          "cv_rmse": 5.223715617961389,
          "cv_r2": 0.6813858371869639,
          "f_stat": 232.30795592710797,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 20.83862215219699,
              "stderr": 4.471401153626384,
              "tstat": 4.6604233071990215,
              "pvalue": 4.308084175619342e-06,
              "ci_lower": 12.048172573271088,
              "ci_upper": 29.62907173112289,
              "vif": null
            },
            {
              "feature": "LSTAT",
              "coef": -0.6691799762470724,
              "stderr": 0.052545868190363415,
              "tstat": -12.735158810636909,
              "pvalue": 0.0,
              "ci_lower": -0.7724813328103648,
              "ci_upper": -0.56587861968378,
              "vif": 2.1289899730460884
            },
            {
              "feature": "RM",
              "coef": 4.613158367506603,
              "stderr": 0.4693070266585936,
              "tstat": 9.829723625388064,
              "pvalue": 0.0,
              "ci_lower": 3.6905348736310395,
              "ci_upper": 5.535781861382167,
              "vif": 1.6907156555653593
            },
            {
              "feature": "PTRATIO",
              "coef": -0.9067126479593434,
              "stderr": 0.12523916930320206,
              "tstat": -7.2398487869574275,
              "pvalue": 2.3279156380340282e-12,
              "ci_lower": -1.1529237494109559,
              "ci_upper": -0.660501546507731,
              "vif": 1.1882140109813928
            },
            {
              "feature": "DIS",
              "coef": -0.5862708091746142,
              "stderr": 0.14031301973060398,
              "tstat": -4.178306548460245,
              "pvalue": 3.610730965886155e-05,
              "ci_lower": -0.8621160046360836,
              "ci_upper": -0.31042561371314475,
              "vif": 1.3638476285793222
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 24.13572469919866,
              "residual": 25.86427530080134,
              "abs_error": 25.86427530080134,
              "pct_error": 51.72855060160268,
              "rank": 1
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": -0.03799840574948887,
              "residual": 17.937998405749486,
              "abs_error": 17.937998405749486,
              "pct_error": 100.21228159636586,
              "rank": 2
            },
            {
              "index": 365,
              "actual": 27.5,
              "predicted": 13.240150109869628,
              "residual": 14.259849890130372,
              "abs_error": 14.259849890130372,
              "pct_error": 51.853999600474076,
              "rank": 3
            },
            {
              "index": 375,
              "actual": 15.0,
              "predicted": 26.493566658116848,
              "residual": -11.493566658116848,
              "abs_error": 11.493566658116848,
              "pct_error": 76.62377772077899,
              "rank": 4
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 38.811625597701244,
              "residual": 11.188374402298756,
              "abs_error": 11.188374402298756,
              "pct_error": 22.37674880459751,
              "rank": 5
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 39.64428821879545,
              "residual": 10.355711781204548,
              "abs_error": 10.355711781204548,
              "pct_error": 20.711423562409095,
              "rank": 6
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 38.18696917636698,
              "residual": 10.31303082363302,
              "abs_error": 10.31303082363302,
              "pct_error": 21.263981079655714,
              "rank": 7
            },
            {
              "index": 436,
              "actual": 9.6,
              "predicted": 19.07587838216568,
              "residual": -9.47587838216568,
              "abs_error": 9.47587838216568,
              "pct_error": 98.70706648089251,
              "rank": 8
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -2.3485404512094856,
              "residual": 9.348540451209486,
              "abs_error": 9.348540451209486,
              "pct_error": 133.5505778744212,
              "rank": 9
            },
            {
              "index": 209,
              "actual": 20.0,
              "predicted": 10.903320179011965,
              "residual": 9.096679820988035,
              "abs_error": 9.096679820988035,
              "pct_error": 45.483399104940176,
              "rank": 10
            }
          ]
        },
        {
          "k": 5,
          "features": [
            "LSTAT",
            "RM",
            "PTRATIO",
            "DIS",
            "NOX"
          ],
          "rmse": 5.019723085624434,
          "mae": 3.272135228363105,
          "mse": 25.19761985635089,
          "r2": 0.6563982005228937,
          "adj_r2": 0.6385022734667944,
          "cv_rmse": 5.09486538548323,
          "cv_r2": 0.6962728716581946,
          "f_stat": 201.59273631881987,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 34.21962769924477,
              "stderr": 5.122606931267673,
              "tstat": 6.680119743401152,
              "pvalue": 8.063727463536452e-11,
              "ci_lower": 24.148877923971845,
              "ci_upper": 44.29037747451769,
              "vif": null
            },
            {
              "feature": "LSTAT",
              "coef": -0.5812426313084704,
              "stderr": 0.054092371111571794,
              "tstat": -10.745371655267062,
              "pvalue": 0.0,
              "ci_lower": -0.6875851130809365,
              "ci_upper": -0.4749001495360043,
              "vif": 2.388189202906746
            },
            {
              "feature": "RM",
              "coef": 4.5442363352100985,
              "stderr": 0.45636301056470663,
              "tstat": 9.957503632003457,
              "pvalue": 0.0,
              "ci_lower": 3.6470529776437473,
              "ci_upper": 5.441419692776449,
              "vif": 1.6923007792224016
            },
            {
              "feature": "PTRATIO",
              "coef": -0.9947365129471859,
              "stderr": 0.1230279270264646,
              "tstat": -8.08545292918093,
              "pvalue": 7.549516567451064e-15,
              "ci_lower": -1.2366023217195672,
              "ci_upper": -0.7528707041748046,
              "vif": 1.2137296069763286
            },
            {
              "feature": "DIS",
              "coef": -1.2232723498319815,
              "stderr": 0.18778433482059614,
              "tstat": -6.51424066336876,
              "pvalue": 2.2097235152784833e-10,
              "ci_lower": -1.5924455214355078,
              "ci_upper": -0.8540991782284553,
              "vif": 2.585763800315968
            },
            {
              "feature": "NOX",
              "coef": -17.975161735447045,
              "stderr": 3.642654363852277,
              "tstat": -4.934632808927135,
              "pvalue": 1.1826656878266562e-06,
              "ci_lower": -25.13641012096081,
              "ci_upper": -10.81391334993328,
              "vif": 2.9677876303444695
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 24.061226161752213,
              "residual": 25.938773838247787,
              "abs_error": 25.938773838247787,
              "pct_error": 51.877547676495574,
              "rank": 1
            },
            {
              "index": 365,
              "actual": 27.5,
              "predicted": 11.289979111678536,
              "residual": 16.210020888321466,
              "abs_error": 16.210020888321466,
              "pct_error": 58.945530502987154,
              "rank": 2
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": 2.5473521985260223,
              "residual": 15.352647801473976,
              "abs_error": 15.352647801473976,
              "pct_error": 85.76898213113954,
              "rank": 3
            },
            {
              "index": 375,
              "actual": 15.0,
              "predicted": 25.87452257374841,
              "residual": -10.874522573748411,
              "abs_error": 10.874522573748411,
              "pct_error": 72.49681715832274,
              "rank": 4
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 39.45994264444904,
              "residual": 10.540057355550957,
              "abs_error": 10.540057355550957,
              "pct_error": 21.080114711101913,
              "rank": 5
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 40.69124421327108,
              "residual": 9.308755786728923,
              "abs_error": 9.308755786728923,
              "pct_error": 18.617511573457847,
              "rank": 6
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 39.328181789481164,
              "residual": 9.171818210518836,
              "abs_error": 9.171818210518836,
              "pct_error": 18.910965382513066,
              "rank": 7
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -1.3182156624173764,
              "residual": 8.318215662417376,
              "abs_error": 8.318215662417376,
              "pct_error": 118.83165232024824,
              "rank": 8
            },
            {
              "index": 436,
              "actual": 9.6,
              "predicted": 17.24348671238183,
              "residual": -7.643486712381831,
              "abs_error": 7.643486712381831,
              "pct_error": 79.6196532539774,
              "rank": 9
            },
            {
              "index": 0,
              "actual": 24.0,
              "predicted": 31.310103726759728,
              "residual": -7.310103726759728,
              "abs_error": 7.310103726759728,
              "pct_error": 30.458765528165532,
              "rank": 10
            }
          ]
        },
        {
          "k": 6,
          "features": [
            "LSTAT",
            "RM",
            "PTRATIO",
            "DIS",
            "NOX",
            "TAX"
          ],
          "rmse": 5.053149053584511,
          "mae": 3.275246566732862,
          "mse": 25.53431535774204,
          "r2": 0.6518069263940918,
          "adj_r2": 0.6298157849031922,
          "cv_rmse": 5.1281995701208585,
          "cv_r2": 0.6926755791027219,
          "f_stat": 168.37385972800303,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 32.41757134013921,
              "stderr": 5.348008643024863,
              "tstat": 6.061615360779158,
              "pvalue": 3.136710002848986e-09,
              "ci_lower": 21.903614023554105,
              "ci_upper": 42.93152865672432,
              "vif": null
            },
            {
              "feature": "LSTAT",
              "coef": -0.5724432873287058,
              "stderr": 0.05459088997863494,
              "tstat": -10.486058892843495,
              "pvalue": 0.0,
              "ci_lower": -0.6797666529815187,
              "ci_upper": -0.46511992167589283,
              "vif": 2.434625045528647
            },
            {
              "feature": "RM",
              "coef": 4.596620927900903,
              "stderr": 0.4583583131819122,
              "tstat": 10.028444550271757,
              "pvalue": 0.0,
              "ci_lower": 3.6955079974306133,
              "ci_upper": 5.497733858371193,
              "vif": 1.7086847766788216
            },
            {
              "feature": "PTRATIO",
              "coef": -0.9286136583039267,
              "stderr": 0.13539500482222797,
              "tstat": -6.858551831533116,
              "pvalue": 2.6772362105020875e-11,
              "ci_lower": -1.1947944737437797,
              "ci_upper": -0.6624328428640738,
              "vif": 1.4713461628905984
            },
            {
              "feature": "DIS",
              "coef": -1.2140260042017506,
              "stderr": 0.18786606316176233,
              "tstat": -6.462188985971414,
              "pvalue": 3.027482708972684e-10,
              "ci_lower": -1.5833626865374877,
              "ci_upper": -0.8446893218660134,
              "vif": 2.590370250991798
            },
            {
              "feature": "NOX",
              "coef": -15.875218090584186,
              "stderr": 4.061294981297499,
              "tstat": -3.908905451017592,
              "pvalue": 0.0001090011351800868,
              "ci_lower": -23.859551126230084,
              "ci_upper": -7.890885054938287,
              "vif": 3.692504245173598
            },
            {
              "feature": "TAX",
              "coef": -0.0026073967902167094,
              "stderr": 0.002234022940573398,
              "tstat": -1.1671307142206333,
              "pvalue": 0.24385812786497985,
              "ci_lower": -0.0069993907844851004,
              "ci_upper": 0.0017845972040516815,
              "vif": 2.2268981991465293
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 23.60367992303413,
              "residual": 26.39632007696587,
              "abs_error": 26.39632007696587,
              "pct_error": 52.79264015393175,
              "rank": 1
            },
            {
              "index": 365,
              "actual": 27.5,
              "predicted": 10.858946759572584,
              "residual": 16.641053240427418,
              "abs_error": 16.641053240427418,
              "pct_error": 60.51292087428152,
              "rank": 2
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": 2.157354840945468,
              "residual": 15.74264515905453,
              "abs_error": 15.74264515905453,
              "pct_error": 87.94773831874039,
              "rank": 3
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 39.32223520655108,
              "residual": 10.677764793448922,
              "abs_error": 10.677764793448922,
              "pct_error": 21.355529586897845,
              "rank": 4
            },
            {
              "index": 375,
              "actual": 15.0,
              "predicted": 25.594206476044306,
              "residual": -10.594206476044306,
              "abs_error": 10.594206476044306,
              "pct_error": 70.62804317362871,
              "rank": 5
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 40.6444462123155,
              "residual": 9.3555537876845,
              "abs_error": 9.3555537876845,
              "pct_error": 18.711107575369,
              "rank": 6
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 39.280085567149726,
              "residual": 9.219914432850274,
              "abs_error": 9.219914432850274,
              "pct_error": 19.010132851237678,
              "rank": 7
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -1.4883976690579668,
              "residual": 8.488397669057967,
              "abs_error": 8.488397669057967,
              "pct_error": 121.26282384368525,
              "rank": 8
            },
            {
              "index": 436,
              "actual": 9.6,
              "predicted": 17.110345795953442,
              "residual": -7.510345795953443,
              "abs_error": 7.510345795953443,
              "pct_error": 78.23276870784836,
              "rank": 9
            },
            {
              "index": 0,
              "actual": 24.0,
              "predicted": 31.30377425831702,
              "residual": -7.30377425831702,
              "abs_error": 7.30377425831702,
              "pct_error": 30.432392742987584,
              "rank": 10
            }
          ]
        },
        {
          "k": 7,
          "features": [
            "LSTAT",
            "RM",
            "PTRATIO",
            "DIS",
            "NOX",
            "TAX",
            "RAD"
          ],
          "rmse": 4.899540050044226,
          "mae": 3.1652297220458636,
          "mse": 24.00549270198737,
          "r2": 0.6726543801851004,
          "adj_r2": 0.6482775787095227,
          "cv_rmse": 5.124861990818531,
          "cv_r2": 0.6929153335093451,
          "f_stat": 146.4001545784498,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 36.79922716593765,
              "stderr": 5.6839635729755535,
              "tstat": 6.474219388192395,
              "pvalue": 2.8243918315240535e-10,
              "ci_lower": 25.624710473929426,
              "ci_upper": 47.97374385794588,
              "vif": null
            },
            {
              "feature": "LSTAT",
              "coef": -0.5802320360866389,
              "stderr": 0.054445390558526215,
              "tstat": -10.65713791625605,
              "pvalue": 0.0,
              "ci_lower": -0.6872701825821239,
              "ci_upper": -0.47319388959115377,
              "vif": 2.4449957279293857
            },
            {
              "feature": "RM",
              "coef": 4.378570586226548,
              "stderr": 0.46684251585864195,
              "tstat": 9.379117020165236,
              "pvalue": 0.0,
              "ci_lower": 3.4607709875794814,
              "ci_upper": 5.296370184873615,
              "vif": 1.7896028393122791
            },
            {
              "feature": "PTRATIO",
              "coef": -0.9981357450567863,
              "stderr": 0.13841471138294717,
              "tstat": -7.211196953590278,
              "pvalue": 2.8368418725222e-12,
              "ci_lower": -1.2702552762448684,
              "ci_upper": -0.7260162138687041,
              "vif": 1.5525236088873011
            },
            {
              "feature": "DIS",
              "coef": -1.2229190116582265,
              "stderr": 0.18701139273808015,
              "tstat": -6.539275462062316,
              "pvalue": 1.9103119086594234e-10,
              "ci_lower": -1.5905782872530194,
              "ci_upper": -0.8552597360634336,
              "vif": 2.591584877333682
            },
            {
              "feature": "NOX",
              "coef": -16.262925848222576,
              "stderr": 4.045723351990504,
              "tstat": -4.01978198539482,
              "pvalue": 6.974486003663571e-05,
              "ci_lower": -24.216707139681215,
              "ci_upper": -8.309144556763936,
              "vif": 3.6995460036322507
            },
            {
              "feature": "TAX",
              "coef": -0.00977067182268132,
              "stderr": 0.003946932778747994,
              "tstat": -2.475510065763186,
              "pvalue": 0.013722065542436823,
              "ci_lower": -0.01753023355317019,
              "ci_upper": -0.0020111100921924533,
              "vif": 7.017924637063682
            },
            {
              "feature": "RAD",
              "coef": 0.16137494888618695,
              "stderr": 0.07346731280816307,
              "tstat": 2.1965543956611997,
              "pvalue": 0.028631249650242774,
              "ci_lower": 0.016940224287479738,
              "ci_upper": 0.3058096734848942,
              "vif": 6.4970552023385055
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 23.998579088473775,
              "residual": 26.001420911526225,
              "abs_error": 26.001420911526225,
              "pct_error": 52.00284182305245,
              "rank": 1
            },
            {
              "index": 365,
              "actual": 27.5,
              "predicted": 11.813860507138305,
              "residual": 15.686139492861695,
              "abs_error": 15.686139492861695,
              "pct_error": 57.0405072467698,
              "rank": 2
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": 2.714805464307398,
              "residual": 15.1851945356926,
              "abs_error": 15.1851945356926,
              "pct_error": 84.83348902621564,
              "rank": 3
            },
            {
              "index": 375,
              "actual": 15.0,
              "predicted": 25.702633048020537,
              "residual": -10.702633048020537,
              "abs_error": 10.702633048020537,
              "pct_error": 71.35088698680359,
              "rank": 4
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 39.56751468383743,
              "residual": 10.43248531616257,
              "abs_error": 10.43248531616257,
              "pct_error": 20.86497063232514,
              "rank": 5
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 41.06396589956938,
              "residual": 8.936034100430618,
              "abs_error": 8.936034100430618,
              "pct_error": 17.872068200861236,
              "rank": 6
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 39.731828829901794,
              "residual": 8.768171170098206,
              "abs_error": 8.768171170098206,
              "pct_error": 18.078703443501457,
              "rank": 7
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -0.9656556781227508,
              "residual": 7.965655678122751,
              "abs_error": 7.965655678122751,
              "pct_error": 113.79508111603928,
              "rank": 8
            },
            {
              "index": 436,
              "actual": 9.6,
              "predicted": 17.335790020967725,
              "residual": -7.735790020967725,
              "abs_error": 7.735790020967725,
              "pct_error": 80.58114605174714,
              "rank": 9
            },
            {
              "index": 0,
              "actual": 24.0,
              "predicted": 30.945359556643538,
              "residual": -6.945359556643538,
              "abs_error": 6.945359556643538,
              "pct_error": 28.93899815268141,
              "rank": 10
            }
          ]
        },
        {
          "k": 8,
          "features": [
            "LSTAT",
            "RM",
            "PTRATIO",
            "DIS",
            "NOX",
            "TAX",
            "RAD",
            "B"
          ],
          "rmse": 5.052261115674069,
          "mae": 3.2684722874007304,
          "mse": 25.52534238095219,
          "r2": 0.6519292844179543,
          "adj_r2": 0.6219877174861654,
          "cv_rmse": 4.995886406271942,
          "cv_r2": 0.7083270616239391,
          "f_stat": 137.2299201722602,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 29.374600494914535,
              "stderr": 5.776130216685085,
              "tstat": 5.085515629488801,
              "pvalue": 5.675308796249112e-07,
              "ci_lower": 18.018798576087406,
              "ci_upper": 40.730402413741665,
              "vif": null
            },
            {
              "feature": "LSTAT",
              "coef": -0.5452755363140077,
              "stderr": 0.053658439243966176,
              "tstat": -10.161971611489301,
              "pvalue": 0.0,
              "ci_lower": -0.6507673767797506,
              "ci_upper": -0.4397836958482648,
              "vif": 2.495236648304988
            },
            {
              "feature": "RM",
              "coef": 4.556012857752986,
              "stderr": 0.4570762653484386,
              "tstat": 9.967730121098816,
              "pvalue": 0.0,
              "ci_lower": 3.6574064662106323,
              "ci_upper": 5.454619249295339,
              "vif": 1.802490552809832
            },
            {
              "feature": "PTRATIO",
              "coef": -1.0180992549993915,
              "stderr": 0.13510375044885364,
              "tstat": -7.535684624719684,
              "pvalue": 3.348432642269472e-13,
              "ci_lower": -1.283711589042012,
              "ci_upper": -0.7524869209567708,
              "vif": 1.554133488306956
            },
            {
              "feature": "DIS",
              "coef": -1.2092633042200875,
              "stderr": 0.1824676476592709,
              "tstat": -6.627275134703293,
              "pvalue": 1.1234435604023929e-10,
              "ci_lower": -1.5679924854680438,
              "ci_upper": -0.8505341229721313,
              "vif": 2.5922736938516633
            },
            {
              "feature": "NOX",
              "coef": -15.338930495054136,
              "stderr": 3.95202932739842,
              "tstat": -3.881279521058513,
              "pvalue": 0.00012174072033577232,
              "ci_lower": -23.108572199061246,
              "ci_upper": -7.569288791047025,
              "vif": 3.7091652595553617
            },
            {
              "feature": "TAX",
              "coef": -0.008612564166483594,
              "stderr": 0.0038587776685974537,
              "tstat": -2.231941020228303,
              "pvalue": 0.026179048787880133,
              "ci_lower": -0.016198874240797363,
              "ci_upper": -0.0010262540921698237,
              "vif": 7.048043109643308
            },
            {
              "feature": "RAD",
              "coef": 0.19127097657321282,
              "stderr": 0.07196798027979659,
              "tstat": 2.6577232795694825,
              "pvalue": 0.008186397937503642,
              "ci_lower": 0.04978280059776738,
              "ci_upper": 0.3327591525486583,
              "vif": 6.55068437019462
            },
            {
              "feature": "B",
              "coef": 0.013810347526250433,
              "stderr": 0.0030080678431083463,
              "tstat": 4.591102410768667,
              "pvalue": 5.934527203654838e-06,
              "ci_lower": 0.007896522646392415,
              "ci_upper": 0.01972417240610845,
              "vif": 1.3004651353706411
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 24.751275184919656,
              "residual": 25.248724815080344,
              "abs_error": 25.248724815080344,
              "pct_error": 50.49744963016069,
              "rank": 1
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": -0.6311772793199242,
              "residual": 18.531177279319923,
              "abs_error": 18.531177279319923,
              "pct_error": 103.5261300520666,
              "rank": 2
            },
            {
              "index": 365,
              "actual": 27.5,
              "predicted": 11.939525824452828,
              "residual": 15.560474175547172,
              "abs_error": 15.560474175547172,
              "pct_error": 56.58354245653518,
              "rank": 3
            },
            {
              "index": 375,
              "actual": 15.0,
              "predicted": 27.250301351135754,
              "residual": -12.250301351135754,
              "abs_error": 12.250301351135754,
              "pct_error": 81.66867567423836,
              "rank": 4
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -3.3281758498885363,
              "residual": 10.328175849888536,
              "abs_error": 10.328175849888536,
              "pct_error": 147.54536928412193,
              "rank": 5
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 39.683005967519115,
              "residual": 10.316994032480885,
              "abs_error": 10.316994032480885,
              "pct_error": 20.63398806496177,
              "rank": 6
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 41.099117390413824,
              "residual": 8.900882609586176,
              "abs_error": 8.900882609586176,
              "pct_error": 17.801765219172353,
              "rank": 7
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 39.79816988937203,
              "residual": 8.701830110627967,
              "abs_error": 8.701830110627967,
              "pct_error": 17.941917753872097,
              "rank": 8
            },
            {
              "index": 381,
              "actual": 10.9,
              "predicted": 19.340018854516185,
              "residual": -8.440018854516184,
              "abs_error": 8.440018854516184,
              "pct_error": 77.43136563776316,
              "rank": 9
            },
            {
              "index": 395,
              "actual": 13.1,
              "predicted": 20.507048773804147,
              "residual": -7.4070487738041475,
              "abs_error": 7.4070487738041475,
              "pct_error": 56.54235705194006,
              "rank": 10
            }
          ]
        },
        {
          "k": 9,
          "features": [
            "LSTAT",
            "RM",
            "PTRATIO",
            "DIS",
            "NOX",
            "TAX",
            "RAD",
            "B",
            "CRIM"
          ],
          "rmse": 5.076343986769132,
          "mae": 3.302180203400086,
          "mse": 25.769268272007125,
          "r2": 0.6486030426703866,
          "adj_r2": 0.6142272533664026,
          "cv_rmse": 4.921139231137742,
          "cv_r2": 0.7185837298807888,
          "f_stat": 126.20255457643273,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 30.736233851552385,
              "stderr": 5.720927173482536,
              "tstat": 5.372596594835191,
              "pvalue": 1.330529340037856e-07,
              "ci_lower": 19.488872713802433,
              "ci_upper": 41.98359498930233,
              "vif": null
            },
            {
              "feature": "LSTAT",
              "coef": -0.5244026431772666,
              "stderr": 0.05338554423601369,
              "tstat": -9.822933355496385,
              "pvalue": 0.0,
              "ci_lower": -0.6293587940510169,
              "ci_upper": -0.4194464923035162,
              "vif": 2.5311106014162896
            },
            {
              "feature": "RM",
              "coef": 4.51982842581868,
              "stderr": 0.45165193874351217,
              "tstat": 10.007326523146926,
              "pvalue": 0.0,
              "ci_lower": 3.631879268353548,
              "ci_upper": 5.407777583283813,
              "vif": 1.8035638437010197
            },
            {
              "feature": "PTRATIO",
              "coef": -1.0411438258766206,
              "stderr": 0.1336450192681199,
              "tstat": -7.790367584053904,
              "pvalue": 5.995204332975845e-14,
              "ci_lower": -1.303890361602065,
              "ci_upper": -0.7783972901511762,
              "vif": 1.5584295353475528
            },
            {
              "feature": "DIS",
              "coef": -1.2618785348522206,
              "stderr": 0.18095915190815887,
              "tstat": -6.973278342355707,
              "pvalue": 1.3133716336710677e-11,
              "ci_lower": -1.6176448068170228,
              "ci_upper": -0.9061122628874183,
              "vif": 2.612752768639046
            },
            {
              "feature": "NOX",
              "coef": -16.48731544291727,
              "stderr": 3.9195953301020467,
              "tstat": -4.2063820507940095,
              "pvalue": 3.215477708207182e-05,
              "ci_lower": -24.193252409889663,
              "ci_upper": -8.78137847594488,
              "vif": 3.7389222576963537
            },
            {
              "feature": "TAX",
              "coef": -0.008543541087833284,
              "stderr": 0.0038119070710764176,
              "tstat": -2.2412773786273688,
              "pvalue": 0.025564327178864366,
              "ci_lower": -0.01603776259281361,
              "ci_upper": -0.0010493195828529577,
              "vif": 7.048257367107363
            },
            {
              "feature": "RAD",
              "coef": 0.2555112032880711,
              "stderr": 0.07373462495034849,
              "tstat": 3.465281113996681,
              "pvalue": 0.0005879160599722155,
              "ci_lower": 0.1105486945854336,
              "ci_upper": 0.4004737119907086,
              "vif": 7.0465916045066495
            },
            {
              "feature": "B",
              "coef": 0.012839633476149082,
              "stderr": 0.002986149435520832,
              "tstat": 4.299729050200612,
              "pvalue": 2.158347230629687e-05,
              "ci_lower": 0.006968854126209244,
              "ci_upper": 0.01871041282608892,
              "vif": 1.3133323445072724
            },
            {
              "feature": "CRIM",
              "coef": -0.11489080916303444,
              "stderr": 0.034983267394782566,
              "tstat": -3.2841646226609855,
              "pvalue": 0.0011143129870765378,
              "ci_lower": -0.1836680248548177,
              "ci_upper": -0.04611359347125117,
              "vif": 1.69332838111364
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 25.006862528950528,
              "residual": 24.993137471049472,
              "abs_error": 24.993137471049472,
              "pct_error": 49.986274942098945,
              "rank": 1
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": -0.5538721461683944,
              "residual": 18.453872146168393,
              "abs_error": 18.453872146168393,
              "pct_error": 103.09425779982344,
              "rank": 2
            },
            {
              "index": 365,
              "actual": 27.5,
              "predicted": 12.665996750989851,
              "residual": 14.834003249010149,
              "abs_error": 14.834003249010149,
              "pct_error": 53.941829996400536,
              "rank": 3
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -6.4605145917063425,
              "residual": 13.460514591706342,
              "abs_error": 13.460514591706342,
              "pct_error": 192.2930655958049,
              "rank": 4
            },
            {
              "index": 375,
              "actual": 15.0,
              "predicted": 26.27207862007218,
              "residual": -11.272078620072179,
              "abs_error": 11.272078620072179,
              "pct_error": 75.14719080048118,
              "rank": 5
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 39.59831782782681,
              "residual": 10.401682172173189,
              "abs_error": 10.401682172173189,
              "pct_error": 20.803364344346377,
              "rank": 6
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 41.03527758190284,
              "residual": 8.96472241809716,
              "abs_error": 8.96472241809716,
              "pct_error": 17.92944483619432,
              "rank": 7
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 39.756402050281075,
              "residual": 8.743597949718925,
              "abs_error": 8.743597949718925,
              "pct_error": 18.02803700972974,
              "rank": 8
            },
            {
              "index": 381,
              "actual": 10.9,
              "predicted": 18.967461745428782,
              "residual": -8.067461745428782,
              "abs_error": 8.067461745428782,
              "pct_error": 74.01341050852093,
              "rank": 9
            },
            {
              "index": 395,
              "actual": 13.1,
              "predicted": 20.845507255212155,
              "residual": -7.745507255212155,
              "abs_error": 7.745507255212155,
              "pct_error": 59.12600958177217,
              "rank": 10
            }
          ]
        },
        {
          "k": 10,
          "features": [
            "LSTAT",
            "RM",
            "PTRATIO",
            "DIS",
            "NOX",
            "TAX",
            "RAD",
            "B",
            "CRIM",
            "CHAS"
          ],
          "rmse": 5.049773519493389,
          "mae": 3.2656420568051856,
          "mse": 25.50021259817665,
          "r2": 0.6522719611720036,
          "adj_r2": 0.6140600887733227,
          "cv_rmse": 4.934740600383505,
          "cv_r2": 0.7185898301569111,
          "f_stat": 116.84236158735513,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 30.931096918951216,
              "stderr": 5.663107093622504,
              "tstat": 5.461859789616941,
              "pvalue": 8.374116866605164e-08,
              "ci_lower": 19.797322954666328,
              "ci_upper": 42.064870883236104,
              "vif": null
            },
            {
              "feature": "LSTAT",
              "coef": -0.5102347064892929,
              "stderr": 0.0530499934222754,
              "tstat": -9.61799754484132,
              "pvalue": 0.0,
              "ci_lower": -0.6145319810782849,
              "ci_upper": -0.40593743190030096,
              "vif": 2.551020818165935
            },
            {
              "feature": "RM",
              "coef": 4.46374611294431,
              "stderr": 0.4474429949351556,
              "tstat": 9.97612246358043,
              "pvalue": 0.0,
              "ci_lower": 3.5840648557911736,
              "ci_upper": 5.343427370097447,
              "vif": 1.8066696516255718
            },
            {
              "feature": "PTRATIO",
              "coef": -1.0122419941039413,
              "stderr": 0.13263076332301535,
              "tstat": -7.632030222420408,
              "pvalue": 1.7674750552032492e-13,
              "ci_lower": -1.2729965437065756,
              "ci_upper": -0.7514874445013071,
              "vif": 1.5665696655442758
            },
            {
              "feature": "DIS",
              "coef": -1.2349600579587174,
              "stderr": 0.17933983366848386,
              "tstat": -6.886144771616023,
              "pvalue": 2.2814194977627267e-11,
              "ci_lower": -1.5875455093456354,
              "ci_upper": -0.8823746065717994,
              "vif": 2.619209863656011
            },
            {
              "feature": "NOX",
              "coef": -17.953928704282553,
              "stderr": 3.9099451476110536,
              "tstat": -4.5918620406356,
              "pvalue": 5.922710846872903e-06,
              "ci_lower": -25.64095364775889,
              "ci_upper": -10.266903760806215,
              "vif": 3.7973870197322683
            },
            {
              "feature": "TAX",
              "coef": -0.0077954947956833665,
              "stderr": 0.0037812420263352497,
              "tstat": -2.061622805784453,
              "pvalue": 0.03990076416049071,
              "ci_lower": -0.015229487006934588,
              "ci_upper": -0.0003615025844321447,
              "vif": 7.078572054426567
            },
            {
              "feature": "RAD",
              "coef": 0.23811625755890808,
              "stderr": 0.0732111582499448,
              "tstat": 3.2524585493644698,
              "pvalue": 0.001242955393102152,
              "ci_lower": 0.09418175762047007,
              "ci_upper": 0.38205075749734607,
              "vif": 7.090392330230745
            },
            {
              "feature": "B",
              "coef": 0.012273681069629061,
              "stderr": 0.002961700636640535,
              "tstat": 4.1441329072175,
              "pvalue": 4.179931929404468e-05,
              "ci_lower": 0.006450922486206017,
              "ci_upper": 0.018096439653052104,
              "vif": 1.318601128410779
            },
            {
              "feature": "CRIM",
              "coef": -0.10856796441009343,
              "stderr": 0.034690566295373336,
              "tstat": -3.129610611879031,
              "pvalue": 0.0018810563107500844,
              "ci_lower": -0.1767702635085312,
              "ci_upper": -0.04036566531165568,
              "vif": 1.6995063324698798
            },
            {
              "feature": "CHAS",
              "coef": 2.8752490217552347,
              "stderr": 0.9511197149026643,
              "tstat": 3.023014849449821,
              "pvalue": 0.0026667332859007242,
              "ci_lower": 1.0053299572496823,
              "ci_upper": 4.745168086260787,
              "vif": 1.0833550411756299
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 24.60986386041869,
              "residual": 25.39013613958131,
              "abs_error": 25.39013613958131,
              "pct_error": 50.78027227916262,
              "rank": 1
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": -0.1981631368328347,
              "residual": 18.098163136832834,
              "abs_error": 18.098163136832834,
              "pct_error": 101.10705663035104,
              "rank": 2
            },
            {
              "index": 365,
              "actual": 27.5,
              "predicted": 12.245022851737737,
              "residual": 15.254977148262263,
              "abs_error": 15.254977148262263,
              "pct_error": 55.47264417549914,
              "rank": 3
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -6.063057964897812,
              "residual": 13.063057964897812,
              "abs_error": 13.063057964897812,
              "pct_error": 186.61511378425445,
              "rank": 4
            },
            {
              "index": 375,
              "actual": 15.0,
              "predicted": 25.862460015043073,
              "residual": -10.862460015043073,
              "abs_error": 10.862460015043073,
              "pct_error": 72.41640010028715,
              "rank": 5
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 39.241077282264186,
              "residual": 10.758922717735814,
              "abs_error": 10.758922717735814,
              "pct_error": 21.517845435471628,
              "rank": 6
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 40.6498238191852,
              "residual": 9.350176180814799,
              "abs_error": 9.350176180814799,
              "pct_error": 18.700352361629598,
              "rank": 7
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 39.39310819934673,
              "residual": 9.106891800653273,
              "abs_error": 9.106891800653273,
              "pct_error": 18.777096496192314,
              "rank": 8
            },
            {
              "index": 381,
              "actual": 10.9,
              "predicted": 18.6910052236462,
              "residual": -7.7910052236462,
              "abs_error": 7.7910052236462,
              "pct_error": 71.47711214354312,
              "rank": 9
            },
            {
              "index": 395,
              "actual": 13.1,
              "predicted": 20.447916745120555,
              "residual": -7.347916745120555,
              "abs_error": 7.347916745120555,
              "pct_error": 56.09096752000424,
              "rank": 10
            }
          ]
        },
        {
          "k": 11,
          "features": [
            "LSTAT",
            "RM",
            "PTRATIO",
            "DIS",
            "NOX",
            "TAX",
            "RAD",
            "B",
            "CRIM",
            "CHAS",
            "ZN"
          ],
          "rmse": 4.907998359203117,
          "mae": 3.149694285529631,
          "mse": 24.088447893940494,
          "r2": 0.6715231799608903,
          "adj_r2": 0.6313760130672212,
          "cv_rmse": 4.919476390862642,
          "cv_r2": 0.7198457918911447,
          "f_stat": 107.22111805286995,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 30.328797720050545,
              "stderr": 5.6541668069624125,
              "tstat": 5.363972934562941,
              "pvalue": 1.3947658827895282e-07,
              "ci_lower": 19.212512928923775,
              "ci_upper": 41.44508251117732,
              "vif": null
            },
            {
              "feature": "LSTAT",
              "coef": -0.5134809376946148,
              "stderr": 0.05290908811723864,
              "tstat": -9.704966688460358,
              "pvalue": 0.0,
              "ci_lower": -0.6175020095218217,
              "ci_upper": -0.4094598658674079,
              "vif": 2.553752582163273
            },
            {
              "feature": "RM",
              "coef": 4.362608488929952,
              "stderr": 0.4492624388783734,
              "tstat": 9.710601446721478,
              "pvalue": 0.0,
              "ci_lower": 3.4793432109444273,
              "ci_upper": 5.245873766915477,
              "vif": 1.833067574938138
            },
            {
              "feature": "PTRATIO",
              "coef": -0.9129851823807961,
              "stderr": 0.14240231776245224,
              "tstat": -6.411308444457962,
              "pvalue": 4.1519587767879784e-10,
              "ci_lower": -1.1929529960672791,
              "ci_upper": -0.633017368694313,
              "vif": 1.8174824344111316
            },
            {
              "feature": "DIS",
              "coef": -1.4407913663875969,
              "stderr": 0.2097543422549703,
              "tstat": -6.868946553851169,
              "pvalue": 2.5491164734603444e-11,
              "ci_lower": -1.8531755574253528,
              "ci_upper": -1.028407175349841,
              "vif": 3.605899549660099
            },
            {
              "feature": "NOX",
              "coef": -16.947997767582034,
              "stderr": 3.934189158861916,
              "tstat": -4.307875672273155,
              "pvalue": 2.0862579873881515e-05,
              "ci_lower": -24.682747838665897,
              "ci_upper": -9.213247696498172,
              "vif": 3.8692691283231064
            },
            {
              "feature": "TAX",
              "coef": -0.009663409900027842,
              "stderr": 0.003898486647710835,
              "tstat": -2.4787592656504622,
              "pvalue": 0.013603907847139718,
              "ci_lower": -0.017327967616470683,
              "ci_upper": -0.0019988521835850002,
              "vif": 7.572577708122083
            },
            {
              "feature": "RAD",
              "coef": 0.25387646131037284,
              "stderr": 0.07345962955091499,
              "tstat": 3.4559997492828445,
              "pvalue": 0.0006082275285890226,
              "ci_lower": 0.10945232410007644,
              "ci_upper": 0.39830059852066924,
              "vif": 7.184360401599101
            },
            {
              "feature": "B",
              "coef": 0.012202567953640164,
              "stderr": 0.0029524971859819157,
              "tstat": 4.132965142719328,
              "pvalue": 4.3816254131856525e-05,
              "ci_lower": 0.006397857784148778,
              "ci_upper": 0.01800727812313155,
              "vif": 1.3188185343927656
            },
            {
              "feature": "CRIM",
              "coef": -0.11390331530657917,
              "stderr": 0.034696678233703176,
              "tstat": -3.2828305505031703,
              "pvalue": 0.00111993704619473,
              "ci_lower": -0.18211816812574147,
              "ci_upper": -0.04568846248741687,
              "vif": 1.7110028665184176
            },
            {
              "feature": "CHAS",
              "coef": 2.831118181911506,
              "stderr": 0.9483777799510575,
              "tstat": 2.985221967197091,
              "pvalue": 0.0030113927706527654,
              "ci_lower": 0.9665751198761245,
              "ci_upper": 4.695661243946887,
              "vif": 1.0840220410811772
            },
            {
              "feature": "ZN",
              "coef": 0.029591622898598784,
              "stderr": 0.015774361576326668,
              "tstat": 1.8759315713295386,
              "pvalue": 0.06140758327682594,
              "ci_lower": -0.0014213099821096184,
              "ci_upper": 0.060604555779307186,
              "vif": 2.4067510346005188
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 24.805967045480195,
              "residual": 25.194032954519805,
              "abs_error": 25.194032954519805,
              "pct_error": 50.38806590903961,
              "rank": 1
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": -0.06261033213014011,
              "residual": 17.96261033213014,
              "abs_error": 17.96261033213014,
              "pct_error": 100.34977839178849,
              "rank": 2
            },
            {
              "index": 365,
              "actual": 27.5,
              "predicted": 12.739340793352788,
              "residual": 14.760659206647212,
              "abs_error": 14.760659206647212,
              "pct_error": 53.67512438780804,
              "rank": 3
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -5.997790676240276,
              "residual": 12.997790676240276,
              "abs_error": 12.997790676240276,
              "pct_error": 185.68272394628966,
              "rank": 4
            },
            {
              "index": 375,
              "actual": 15.0,
              "predicted": 25.88731073391599,
              "residual": -10.887310733915989,
              "abs_error": 10.887310733915989,
              "pct_error": 72.58207155943992,
              "rank": 5
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 40.449805059515604,
              "residual": 9.550194940484396,
              "abs_error": 9.550194940484396,
              "pct_error": 19.10038988096879,
              "rank": 6
            },
            {
              "index": 381,
              "actual": 10.9,
              "predicted": 18.746891193866368,
              "residual": -7.846891193866368,
              "abs_error": 7.846891193866368,
              "pct_error": 71.98982746666393,
              "rank": 7
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 42.47778575398478,
              "residual": 7.522214246015217,
              "abs_error": 7.522214246015217,
              "pct_error": 15.044428492030434,
              "rank": 8
            },
            {
              "index": 395,
              "actual": 13.1,
              "predicted": 20.54230674138261,
              "residual": -7.442306741382611,
              "abs_error": 7.442306741382611,
              "pct_error": 56.81150184261535,
              "rank": 9
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 41.23611838320633,
              "residual": 7.263881616793668,
              "abs_error": 7.263881616793668,
              "pct_error": 14.977075498543647,
              "rank": 10
            }
          ]
        },
        {
          "k": 12,
          "features": [
            "LSTAT",
            "RM",
            "PTRATIO",
            "DIS",
            "NOX",
            "TAX",
            "RAD",
            "B",
            "CRIM",
            "CHAS",
            "ZN",
            "INDUS"
          ],
          "rmse": 4.917703495184449,
          "mae": 3.1765879707630122,
          "mse": 24.183807666549352,
          "r2": 0.6702228274016833,
          "adj_r2": 0.6257584895232585,
          "cv_rmse": 4.928822658974384,
          "cv_r2": 0.7187013739482547,
          "f_stat": 98.1507346774615,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 30.397987924641487,
              "stderr": 5.6601164232358085,
              "tstat": 5.370558775054911,
              "pvalue": 1.34992450773197e-07,
              "ci_lower": 19.269917846080073,
              "ci_upper": 41.526058003202905,
              "vif": null
            },
            {
              "feature": "LSTAT",
              "coef": -0.5157500490258918,
              "stderr": 0.05309381235592379,
              "tstat": -9.713938896843006,
              "pvalue": 0.0,
              "ci_lower": -0.6201351217797381,
              "ci_upper": -0.4113649762720456,
              "vif": 2.567322534751777
            },
            {
              "feature": "RM",
              "coef": 4.397481338859628,
              "stderr": 0.4535344603500374,
              "tstat": 9.696024719854048,
              "pvalue": 0.0,
              "ci_lower": 3.5058100585483176,
              "ci_upper": 5.289152619170939,
              "vif": 1.864975722496639
            },
            {
              "feature": "PTRATIO",
              "coef": -0.9212737597564822,
              "stderr": 0.14321710563391724,
              "tstat": -6.432707571338479,
              "pvalue": 3.6653657886631663e-10,
              "ci_lower": -1.202845704354726,
              "ci_upper": -0.6397018151582382,
              "vif": 1.8352711484569852
            },
            {
              "feature": "DIS",
              "coef": -1.4166817889337966,
              "stderr": 0.21389849194515753,
              "tstat": -6.6231499626328665,
              "pvalue": 1.1651479780994123e-10,
              "ci_lower": -1.8372168504199606,
              "ci_upper": -0.9961467274476326,
              "vif": 3.7435315295558693
            },
            {
              "feature": "NOX",
              "coef": -17.639537561256923,
              "stderr": 4.109457328307893,
              "tstat": -4.2924250459415685,
              "pvalue": 2.231148361264701e-05,
              "ci_lower": -25.718934823570585,
              "ci_upper": -9.56014029894326,
              "vif": 4.214652377893952
            },
            {
              "feature": "TAX",
              "coef": -0.010639186966194758,
              "stderr": 0.004240159729651385,
              "tstat": -2.5091476841768614,
              "pvalue": 0.012505867758063172,
              "ci_lower": -0.018975551642750256,
              "ci_upper": -0.0023028222896392617,
              "vif": 8.943147972583946
            },
            {
              "feature": "RAD",
              "coef": 0.264584211331337,
              "stderr": 0.07574388991422193,
              "tstat": 3.493142636732442,
              "pvalue": 0.0005319472877212128,
              "ci_lower": 0.11566796085844688,
              "ci_upper": 0.41350046180422717,
              "vif": 7.6253573108873045
            },
            {
              "feature": "B",
              "coef": 0.012294274646031556,
              "stderr": 0.002959080056632531,
              "tstat": 4.1547624297879215,
              "pvalue": 4.002187465457219e-05,
              "ci_lower": 0.006476576249740384,
              "ci_upper": 0.018111973042322725,
              "vif": 1.3224943741667357
            },
            {
              "feature": "CRIM",
              "coef": -0.11350613527468911,
              "stderr": 0.03473224978583961,
              "tstat": -3.2680329081638053,
              "pvalue": 0.0011787588002962757,
              "ci_lower": -0.18179146382663514,
              "ci_upper": -0.045220806722743076,
              "vif": 1.7116506027766853
            },
            {
              "feature": "CHAS",
              "coef": 2.7729102607435174,
              "stderr": 0.9543213730863702,
              "tstat": 2.9056357103012895,
              "pvalue": 0.0038734573596348465,
              "ci_lower": 0.896667031261867,
              "ci_upper": 4.649153490225168,
              "vif": 1.0958194873067029
            },
            {
              "feature": "ZN",
              "coef": 0.030752185082847428,
              "stderr": 0.015910509711543386,
              "tstat": 1.9328221182339693,
              "pvalue": 0.05397993253888678,
              "ci_lower": -0.0005286674326327977,
              "ci_upper": 0.06203303759832765,
              "vif": 2.444387850159095
            },
            {
              "feature": "INDUS",
              "coef": 0.03954259048361362,
              "stderr": 0.06726701743500078,
              "tstat": 0.5878451578713608,
              "pvalue": 0.556975577669429,
              "ci_lower": -0.09270770757024949,
              "ci_upper": 0.1717928885374767,
              "vif": 3.8746419210235126
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 24.85478254126736,
              "residual": 25.14521745873264,
              "abs_error": 25.14521745873264,
              "pct_error": 50.29043491746528,
              "rank": 1
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": -0.11988163048474054,
              "residual": 18.01988163048474,
              "abs_error": 18.01988163048474,
              "pct_error": 100.66972977924435,
              "rank": 2
            },
            {
              "index": 365,
              "actual": 27.5,
              "predicted": 12.648673105938146,
              "residual": 14.851326894061854,
              "abs_error": 14.851326894061854,
              "pct_error": 54.00482506931583,
              "rank": 3
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -6.112505889135795,
              "residual": 13.112505889135795,
              "abs_error": 13.112505889135795,
              "pct_error": 187.32151270193992,
              "rank": 4
            },
            {
              "index": 375,
              "actual": 15.0,
              "predicted": 25.94833829737087,
              "residual": -10.94833829737087,
              "abs_error": 10.94833829737087,
              "pct_error": 72.98892198247248,
              "rank": 5
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 40.453076355769554,
              "residual": 9.546923644230446,
              "abs_error": 9.546923644230446,
              "pct_error": 19.093847288460893,
              "rank": 6
            },
            {
              "index": 381,
              "actual": 10.9,
              "predicted": 18.767208883004585,
              "residual": -7.867208883004585,
              "abs_error": 7.867208883004585,
              "pct_error": 72.17622828444573,
              "rank": 7
            },
            {
              "index": 395,
              "actual": 13.1,
              "predicted": 20.555500200199425,
              "residual": -7.455500200199426,
              "abs_error": 7.455500200199426,
              "pct_error": 56.912215268697906,
              "rank": 8
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 42.61071893143698,
              "residual": 7.389281068563022,
              "abs_error": 7.389281068563022,
              "pct_error": 14.778562137126045,
              "rank": 9
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 41.36083976887949,
              "residual": 7.139160231120513,
              "abs_error": 7.139160231120513,
              "pct_error": 14.719918002310337,
              "rank": 10
            }
          ]
        },
        {
          "k": 13,
          "features": [
            "LSTAT",
            "RM",
            "PTRATIO",
            "DIS",
            "NOX",
            "TAX",
            "RAD",
            "B",
            "CRIM",
            "CHAS",
            "ZN",
            "INDUS",
            "AGE"
          ],
          "rmse": 4.928602182665356,
          "mae": 3.189091965887795,
          "mse": 24.291119474973712,
          "r2": 0.6687594935356294,
          "adj_r2": 0.6198262368988473,
          "cv_rmse": 4.9313673608738045,
          "cv_r2": 0.7184784187192006,
          "f_stat": 90.42661653870964,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 30.24675099392451,
              "stderr": 5.676806440074126,
              "tstat": 5.328127938343017,
              "pvalue": 1.6816101244820914e-07,
              "ci_lower": 19.085778659588392,
              "ci_upper": 41.40772332826063,
              "vif": null
            },
            {
              "feature": "LSTAT",
              "coef": -0.5085714244487933,
              "stderr": 0.055683916998947335,
              "tstat": -9.13318336528674,
              "pvalue": 0.0,
              "ci_lower": -0.6180496431714674,
              "ci_upper": -0.3990932057261192,
              "vif": 2.818045379538576
            },
            {
              "feature": "RM",
              "coef": 4.438835199513037,
              "stderr": 0.4639796661053519,
              "tstat": 9.566874420969018,
              "pvalue": 0.0,
              "ci_lower": 3.5266208635546805,
              "ci_upper": 5.351049535471394,
              "vif": 1.947808749583758
            },
            {
              "feature": "PTRATIO",
              "coef": -0.9154562404680742,
              "stderr": 0.14399674435894416,
              "tstat": -6.357478737061543,
              "pvalue": 5.737761377133666e-10,
              "ci_lower": -1.1985632473724106,
              "ci_upper": -0.6323492335637378,
              "vif": 1.8514484070670425
            },
            {
              "feature": "DIS",
              "coef": -1.4478653685307876,
              "stderr": 0.22595036782635283,
              "tstat": -6.407891177426627,
              "pvalue": 4.258553509828289e-10,
              "ci_lower": -1.892098553308894,
              "ci_upper": -1.0036321837526812,
              "vif": 4.16857837354429
            },
            {
              "feature": "NOX",
              "coef": -17.202633391781276,
              "stderr": 4.2361190871668875,
              "tstat": -4.060941875759773,
              "pvalue": 5.909342124965633e-05,
              "ci_lower": -25.53112026832263,
              "ci_upper": -8.874146515239921,
              "vif": 4.469150159170636
            },
            {
              "feature": "TAX",
              "coef": -0.010646786275309683,
              "stderr": 0.004244612368584224,
              "tstat": -2.5083059065911555,
              "pvalue": 0.012536260644877562,
              "ci_lower": -0.01899197149799465,
              "ci_upper": -0.002301601052624719,
              "vif": 8.943301431814218
            },
            {
              "feature": "RAD",
              "coef": 0.26242973558508237,
              "stderr": 0.0759864635496677,
              "tstat": 3.4536379682092733,
              "pvalue": 0.0006137380080795118,
              "ci_lower": 0.11303538395191179,
              "ci_upper": 0.4118240872182529,
              "vif": 7.658315779148448
            },
            {
              "feature": "B",
              "coef": 0.012351334729968744,
              "stderr": 0.0029651025885100903,
              "tstat": 4.165567416733147,
              "pvalue": 3.8269380584043944e-05,
              "ci_lower": 0.00652174932694813,
              "ci_upper": 0.01818092013298936,
              "vif": 1.3251213980906684
            },
            {
              "feature": "CRIM",
              "coef": -0.1130559239853782,
              "stderr": 0.03478402487916941,
              "tstat": -3.2502254807517206,
              "pvalue": 0.0012532800108635556,
              "ci_lower": -0.18144358938342545,
              "ci_upper": -0.04466825858733095,
              "vif": 1.7131869906128505
            },
            {
              "feature": "CHAS",
              "coef": 2.7844382035079565,
              "stderr": 0.9556875964881927,
              "tstat": 2.9135443566912063,
              "pvalue": 0.0037792729194365826,
              "ci_lower": 0.9054939524981191,
              "ci_upper": 4.6633824545177935,
              "vif": 1.0966737120634569
            },
            {
              "feature": "ZN",
              "coef": 0.03011046414565001,
              "stderr": 0.015996138029708083,
              "tstat": 1.8823583598571574,
              "pvalue": 0.06053163638409709,
              "ci_lower": -0.0013389882692649152,
              "ci_upper": 0.061559916560564934,
              "vif": 2.465630718663123
            },
            {
              "feature": "INDUS",
              "coef": 0.04038072041333331,
              "stderr": 0.06736499472046818,
              "tstat": 0.5994318055080917,
              "pvalue": 0.549233038528488,
              "ci_lower": -0.09206326024985566,
              "ci_upper": 0.17282470107652226,
              "vif": 3.8778553502602815
            },
            {
              "feature": "AGE",
              "coef": -0.006296362210983147,
              "stderr": 0.01456804257218217,
              "tstat": -0.43220372124708895,
              "pvalue": 0.6658322215808035,
              "ci_lower": -0.034938085657067894,
              "ci_upper": 0.022345361235101602,
              "vif": 2.9899478376482787
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 24.73957160651872,
              "residual": 25.26042839348128,
              "abs_error": 25.26042839348128,
              "pct_error": 50.52085678696257,
              "rank": 1
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": -0.16423699568709216,
              "residual": 18.06423699568709,
              "abs_error": 18.06423699568709,
              "pct_error": 100.91752511557036,
              "rank": 2
            },
            {
              "index": 365,
              "actual": 27.5,
              "predicted": 12.5039564841814,
              "residual": 14.9960435158186,
              "abs_error": 14.9960435158186,
              "pct_error": 54.53106733024946,
              "rank": 3
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -6.088421842194145,
              "residual": 13.088421842194144,
              "abs_error": 13.088421842194144,
              "pct_error": 186.97745488848778,
              "rank": 4
            },
            {
              "index": 375,
              "actual": 15.0,
              "predicted": 25.93909562444889,
              "residual": -10.939095624448889,
              "abs_error": 10.939095624448889,
              "pct_error": 72.92730416299258,
              "rank": 5
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 40.50033966050786,
              "residual": 9.499660339492138,
              "abs_error": 9.499660339492138,
              "pct_error": 18.999320678984276,
              "rank": 6
            },
            {
              "index": 381,
              "actual": 10.9,
              "predicted": 18.765486949814207,
              "residual": -7.865486949814207,
              "abs_error": 7.865486949814207,
              "pct_error": 72.16043073224043,
              "rank": 7
            },
            {
              "index": 395,
              "actual": 13.1,
              "predicted": 20.523848928752464,
              "residual": -7.423848928752465,
              "abs_error": 7.423848928752465,
              "pct_error": 56.670602509560794,
              "rank": 8
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 42.67251161101979,
              "residual": 7.327488388980207,
              "abs_error": 7.327488388980207,
              "pct_error": 14.654976777960412,
              "rank": 9
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 41.41377225132508,
              "residual": 7.086227748674922,
              "abs_error": 7.086227748674922,
              "pct_error": 14.610778863247262,
              "rank": 10
            }
          ]
        }
      ],
      "LassoCV": [
        {
          "k": 1,
          "features": [
            "LSTAT"
          ],
          "rmse": 5.789606996393182,
          "mae": 4.184807930623362,
          "mse": 33.51954917268489,
          "r2": 0.5429180422970386,
          "adj_r2": 0.538347222720009,
          "cv_rmse": 6.332558301047439,
          "cv_r2": 0.5428147541494676,
          "f_stat": 476.33924982804336,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 34.83694982031851,
              "stderr": 0.6350210267842641,
              "tstat": 54.859521733842804,
              "pvalue": 0.0,
              "ci_lower": 33.588572993959744,
              "ci_upper": 36.085326646677274,
              "vif": null
            },
            {
              "feature": "LSTAT",
              "coef": -0.9665309019503531,
              "stderr": 0.044285092860186184,
              "tstat": -21.825197589667866,
              "pvalue": 0.0,
              "ci_lower": -1.0535901981751759,
              "ci_upper": -0.8794716057255303,
              "vif": 1.0
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 25.625910324731645,
              "residual": 24.374089675268355,
              "abs_error": 24.374089675268355,
              "pct_error": 48.74817935053671,
              "rank": 1
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 31.96635304152596,
              "residual": 18.03364695847404,
              "abs_error": 18.03364695847404,
              "pct_error": 36.06729391694808,
              "rank": 2
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 32.05334082270149,
              "residual": 17.946659177298507,
              "abs_error": 17.946659177298507,
              "pct_error": 35.893318354597014,
              "rank": 3
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 31.154467083887663,
              "residual": 17.345532916112337,
              "abs_error": 17.345532916112337,
              "pct_error": 35.76398539404605,
              "rank": 4
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": 1.6172827202848765,
              "residual": 16.282717279715122,
              "abs_error": 16.282717279715122,
              "pct_error": 90.9649010039951,
              "rank": 5
            },
            {
              "index": 268,
              "actual": 43.5,
              "predicted": 31.782712170155392,
              "residual": 11.717287829844608,
              "abs_error": 11.717287829844608,
              "pct_error": 26.93629386171174,
              "rank": 6
            },
            {
              "index": 355,
              "actual": 20.6,
              "predicted": 29.45337269645504,
              "residual": -8.85337269645504,
              "abs_error": 8.85337269645504,
              "pct_error": 42.977537361432226,
              "rank": 7
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -0.9053629338055416,
              "residual": 7.905362933805542,
              "abs_error": 7.905362933805542,
              "pct_error": 112.93375619722201,
              "rank": 8
            },
            {
              "index": 408,
              "actual": 17.2,
              "predicted": 9.320534008829188,
              "residual": 7.879465991170811,
              "abs_error": 7.879465991170811,
              "pct_error": 45.810848785876814,
              "rank": 9
            },
            {
              "index": 436,
              "actual": 9.6,
              "predicted": 17.391067040114635,
              "residual": -7.791067040114635,
              "abs_error": 7.791067040114635,
              "pct_error": 81.15694833452746,
              "rank": 10
            }
          ]
        },
        {
          "k": 2,
          "features": [
            "LSTAT",
            "RM"
          ],
          "rmse": 5.589569804715173,
          "mae": 3.898759721382362,
          "mse": 31.243290601783617,
          "r2": 0.573957741502586,
          "adj_r2": 0.5653508271895069,
          "cv_rmse": 5.583527948544508,
          "cv_r2": 0.6359466638068296,
          "f_stat": 372.61794090137715,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": -3.8411770790048383,
              "stderr": 3.5229849736559067,
              "tstat": -1.0903188937018753,
              "pvalue": 0.2762274312067523,
              "ci_lower": -10.76700430913337,
              "ci_upper": 3.084650151123692,
              "vif": null
            },
            {
              "feature": "LSTAT",
              "coef": -0.6324985627075881,
              "stderr": 0.04904544343244726,
              "tstat": -12.89617380213434,
              "pvalue": 0.0,
              "ci_lower": -0.7289168756377382,
              "ci_upper": -0.536080249777438,
              "vif": 1.600640940207779
            },
            {
              "feature": "RM",
              "coef": 5.4650987730758604,
              "stderr": 0.4915510985577764,
              "tstat": 11.118068475710055,
              "pvalue": 0.0,
              "ci_lower": 4.498759714337782,
              "ci_upper": 6.4314378318139385,
              "vif": 1.6006409402077786
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 24.1021655918314,
              "residual": 25.8978344081686,
              "abs_error": 25.8978344081686,
              "pct_error": 51.79566881633719,
              "rank": 1
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": -0.28767555746955153,
              "residual": 18.18767555746955,
              "abs_error": 18.18767555746955,
              "pct_error": 101.60712601938297,
              "rank": 2
            },
            {
              "index": 365,
              "actual": 27.5,
              "predicted": 11.116649885440271,
              "residual": 16.38335011455973,
              "abs_error": 16.38335011455973,
              "pct_error": 59.57581859839901,
              "rank": 3
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 37.31795502772603,
              "residual": 12.682044972273971,
              "abs_error": 12.682044972273971,
              "pct_error": 25.364089944547942,
              "rank": 4
            },
            {
              "index": 375,
              "actual": 15.0,
              "predicted": 27.62430956570894,
              "residual": -12.624309565708941,
              "abs_error": 12.624309565708941,
              "pct_error": 84.16206377139294,
              "rank": 5
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 36.66642406204398,
              "residual": 11.83357593795602,
              "abs_error": 11.83357593795602,
              "pct_error": 24.399125645270146,
              "rank": 6
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 38.24383060328878,
              "residual": 11.756169396711222,
              "abs_error": 11.756169396711222,
              "pct_error": 23.512338793422444,
              "rank": 7
            },
            {
              "index": 436,
              "actual": 9.6,
              "predicted": 20.052227036966336,
              "residual": -10.452227036966336,
              "abs_error": 10.452227036966336,
              "pct_error": 108.87736496839935,
              "rank": 8
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -2.534192572401629,
              "residual": 9.53419257240163,
              "abs_error": 9.53419257240163,
              "pct_error": 136.202751034309,
              "rank": 9
            },
            {
              "index": 209,
              "actual": 20.0,
              "predicted": 10.759918951394354,
              "residual": 9.240081048605646,
              "abs_error": 9.240081048605646,
              "pct_error": 46.20040524302823,
              "rank": 10
            }
          ]
        },
        {
          "k": 3,
          "features": [
            "LSTAT",
            "RM",
            "DIS"
          ],
          "rmse": 5.591613093092336,
          "mae": 3.907781681759715,
          "mse": 31.266136982841648,
          "r2": 0.5736462018536894,
          "adj_r2": 0.5605945549716596,
          "cv_rmse": 5.510867831293079,
          "cv_r2": 0.645073102212319,
          "f_stat": 258.9828623294865,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 0.8578000158654394,
              "stderr": 3.737324917723059,
              "tstat": 0.22952246185435987,
              "pvalue": 0.8185801815206288,
              "ci_lower": -6.48945317054509,
              "ci_upper": 8.20505320227597,
              "vif": null
            },
            {
              "feature": "LSTAT",
              "coef": -0.7237598855816972,
              "stderr": 0.055243395858208685,
              "tstat": -13.101292459271452,
              "pvalue": 0.0,
              "ci_lower": -0.8323635593812571,
              "ci_upper": -0.6151562117821374,
              "vif": 2.0851668725608863
            },
            {
              "feature": "RM",
              "coef": 5.208230124293044,
              "stderr": 0.49085165433716416,
              "tstat": 10.610599105194275,
              "pvalue": 0.0,
              "ci_lower": 4.243258798337046,
              "ci_upper": 6.173201450249041,
              "vif": 1.6388552216311458
            },
            {
              "feature": "DIS",
              "coef": -0.5093615961611994,
              "stderr": 0.14863049009784565,
              "tstat": -3.427033012041332,
              "pvalue": 0.0006734911290611212,
              "ci_lower": -0.801556111224788,
              "ci_upper": -0.2171670810976108,
              "vif": 1.356030132827216
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 25.73923211680537,
              "residual": 24.26076788319463,
              "abs_error": 24.26076788319463,
              "pct_error": 48.52153576638926,
              "rank": 1
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": -0.705635220624174,
              "residual": 18.605635220624173,
              "abs_error": 18.605635220624173,
              "pct_error": 103.94209620460433,
              "rank": 2
            },
            {
              "index": 365,
              "actual": 27.5,
              "predicted": 13.429434976204035,
              "residual": 14.070565023795965,
              "abs_error": 14.070565023795965,
              "pct_error": 51.165690995621695,
              "rank": 3
            },
            {
              "index": 375,
              "actual": 15.0,
              "predicted": 28.54778138357547,
              "residual": -13.547781383575469,
              "abs_error": 13.547781383575469,
              "pct_error": 90.31854255716979,
              "rank": 4
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 36.8459673447386,
              "residual": 13.154032655261403,
              "abs_error": 13.154032655261403,
              "pct_error": 26.308065310522803,
              "rank": 5
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 36.39359336871943,
              "residual": 12.10640663128057,
              "abs_error": 12.10640663128057,
              "pct_error": 24.961663157279528,
              "rank": 6
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 38.00937971480745,
              "residual": 11.990620285192549,
              "abs_error": 11.990620285192549,
              "pct_error": 23.981240570385097,
              "rank": 7
            },
            {
              "index": 436,
              "actual": 9.6,
              "predicted": 20.424261381700745,
              "residual": -10.824261381700746,
              "abs_error": 10.824261381700746,
              "pct_error": 112.75272272604944,
              "rank": 8
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -3.2154720200199556,
              "residual": 10.215472020019956,
              "abs_error": 10.215472020019956,
              "pct_error": 145.93531457171366,
              "rank": 9
            },
            {
              "index": 209,
              "actual": 20.0,
              "predicted": 10.00518985688143,
              "residual": 9.99481014311857,
              "abs_error": 9.99481014311857,
              "pct_error": 49.97405071559285,
              "rank": 10
            }
          ]
        },
        {
          "k": 4,
          "features": [
            "LSTAT",
            "RM",
            "DIS",
            "RAD"
          ],
          "rmse": 5.692898136862036,
          "mae": 3.8961262381818584,
          "mse": 32.40908919668724,
          "r2": 0.5580605854489437,
          "adj_r2": 0.539836279694261,
          "cv_rmse": 5.4686597880853,
          "cv_r2": 0.6518213227513984,
          "f_stat": 206.88538000409045,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 0.9772755497635455,
              "stderr": 3.6610986187310757,
              "tstat": 0.266935051889497,
              "pvalue": 0.7896570757765966,
              "ci_lower": -6.220178157857847,
              "ci_upper": 8.174729257384937,
              "vif": null
            },
            {
              "feature": "LSTAT",
              "coef": -0.6496874027519467,
              "stderr": 0.05688352844137954,
              "tstat": -11.421362572848698,
              "pvalue": 0.0,
              "ci_lower": -0.7615162840031424,
              "ci_upper": -0.537858521500751,
              "vif": 2.3039757284590405
            },
            {
              "feature": "RM",
              "coef": 5.398153126334463,
              "stderr": 0.482922152122082,
              "tstat": 11.178102107376134,
              "pvalue": 0.0,
              "ci_lower": 4.4487632856728405,
              "ci_upper": 6.347542966996085,
              "vif": 1.6531759864611468
            },
            {
              "feature": "DIS",
              "coef": -0.7084632861292363,
              "stderr": 0.15302951902102685,
              "tstat": -4.629585786203057,
              "pvalue": 4.963831469861901e-06,
              "ci_lower": -1.0093081946543054,
              "ci_upper": -0.40761837760416697,
              "vif": 1.4980582802643605
            },
            {
              "feature": "RAD",
              "coef": -0.15855796700020103,
              "stderr": 0.03752417840467306,
              "tstat": -4.225488038412457,
              "pvalue": 2.9574155793854473e-05,
              "ci_lower": -0.23232777358294993,
              "ci_upper": -0.08478816041745212,
              "vif": 1.463186231701705
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 23.707018799013998,
              "residual": 26.292981200986002,
              "abs_error": 26.292981200986002,
              "pct_error": 52.58596240197201,
              "rank": 1
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": -1.276100122466009,
              "residual": 19.176100122466007,
              "abs_error": 19.176100122466007,
              "pct_error": 107.12905096349725,
              "rank": 2
            },
            {
              "index": 365,
              "actual": 27.5,
              "predicted": 10.626040343858199,
              "residual": 16.8739596561418,
              "abs_error": 16.8739596561418,
              "pct_error": 61.35985329506109,
              "rank": 3
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 36.92224394010098,
              "residual": 13.077756059899023,
              "abs_error": 13.077756059899023,
              "pct_error": 26.155512119798047,
              "rank": 4
            },
            {
              "index": 375,
              "actual": 15.0,
              "predicted": 26.984229238124566,
              "residual": -11.984229238124566,
              "abs_error": 11.984229238124566,
              "pct_error": 79.89486158749712,
              "rank": 5
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 36.63351607997293,
              "residual": 11.866483920027072,
              "abs_error": 11.866483920027072,
              "pct_error": 24.466977154694995,
              "rank": 6
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 38.21479108039878,
              "residual": 11.785208919601217,
              "abs_error": 11.785208919601217,
              "pct_error": 23.570417839202435,
              "rank": 7
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -3.6340756551623277,
              "residual": 10.634075655162327,
              "abs_error": 10.634075655162327,
              "pct_error": 151.91536650231896,
              "rank": 8
            },
            {
              "index": 436,
              "actual": 9.6,
              "predicted": 18.90372549453064,
              "residual": -9.30372549453064,
              "abs_error": 9.30372549453064,
              "pct_error": 96.91380723469418,
              "rank": 9
            },
            {
              "index": 209,
              "actual": 20.0,
              "predicted": 11.44419662560087,
              "residual": 8.55580337439913,
              "abs_error": 8.55580337439913,
              "pct_error": 42.779016871995644,
              "rank": 10
            }
          ]
        },
        {
          "k": 5,
          "features": [
            "LSTAT",
            "RM",
            "DIS",
            "RAD",
            "PTRATIO"
          ],
          "rmse": 5.248519448289311,
          "mae": 3.358904844225236,
          "mse": 27.54695639907114,
          "r2": 0.6243619896324216,
          "adj_r2": 0.604797509925777,
          "cv_rmse": 5.272580468589639,
          "cv_r2": 0.6759973981680367,
          "f_stat": 187.26393938038052,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 18.90082390795961,
              "stderr": 4.607564513628837,
              "tstat": 4.102128977695778,
              "pvalue": 4.966570810127635e-05,
              "ci_lower": 9.842617820165897,
              "ci_upper": 27.95902999575332,
              "vif": null
            },
            {
              "feature": "LSTAT",
              "coef": -0.6438480783458208,
              "stderr": 0.05454647962776268,
              "tstat": -11.803659608091731,
              "pvalue": 0.0,
              "ci_lower": -0.7510833112699447,
              "ci_upper": -0.536612845421697,
              "vif": 2.3047081695049845
            },
            {
              "feature": "RM",
              "coef": 4.751218854532473,
              "stderr": 0.47537595068325283,
              "tstat": 9.994655488363676,
              "pvalue": 0.0,
              "ci_lower": 3.816657153283847,
              "ci_upper": 5.685780555781099,
              "vif": 1.7426769630068124
            },
            {
              "feature": "DIS",
              "coef": -0.6613037040089976,
              "stderr": 0.14692903960411746,
              "tstat": -4.500837314330785,
              "pvalue": 8.899689682317913e-06,
              "ci_lower": -0.9501577215879063,
              "ci_upper": -0.3724496864300889,
              "vif": 1.502350291024964
            },
            {
              "feature": "RAD",
              "coef": -0.06584579522745271,
              "stderr": 0.03914961025849329,
              "tstat": -1.6819016790382435,
              "pvalue": 0.09337229547353076,
              "ci_lower": -0.1428116710017972,
              "ci_upper": 0.011120080546891786,
              "vif": 1.7326456410640996
            },
            {
              "feature": "PTRATIO",
              "coef": -0.8165255009733945,
              "stderr": 0.13597286324657848,
              "tstat": -6.005062197540662,
              "pvalue": 4.314225865442722e-09,
              "ci_lower": -1.08384030774207,
              "ci_upper": -0.549210694204719,
              "vif": 1.4070347179140978
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 23.451283755619436,
              "residual": 26.548716244380564,
              "abs_error": 26.548716244380564,
              "pct_error": 53.09743248876113,
              "rank": 1
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": -0.3413077167909826,
              "residual": 18.24130771679098,
              "abs_error": 18.24130771679098,
              "pct_error": 101.90674702117867,
              "rank": 2
            },
            {
              "index": 365,
              "actual": 27.5,
              "predicted": 12.094786590698753,
              "residual": 15.405213409301247,
              "abs_error": 15.405213409301247,
              "pct_error": 56.01895785200453,
              "rank": 3
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 38.64778535806463,
              "residual": 11.352214641935369,
              "abs_error": 11.352214641935369,
              "pct_error": 22.704429283870738,
              "rank": 4
            },
            {
              "index": 375,
              "actual": 15.0,
              "predicted": 26.048580947479273,
              "residual": -11.048580947479273,
              "abs_error": 11.048580947479273,
              "pct_error": 73.65720631652849,
              "rank": 5
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 39.56697331730078,
              "residual": 10.433026682699222,
              "abs_error": 10.433026682699222,
              "pct_error": 20.866053365398443,
              "rank": 6
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 38.10822399176878,
              "residual": 10.391776008231218,
              "abs_error": 10.391776008231218,
              "pct_error": 21.426342285012822,
              "rank": 7
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -2.6086080327457495,
              "residual": 9.60860803274575,
              "abs_error": 9.60860803274575,
              "pct_error": 137.265829039225,
              "rank": 8
            },
            {
              "index": 436,
              "actual": 9.6,
              "predicted": 18.578550110182,
              "residual": -8.978550110182,
              "abs_error": 8.978550110182,
              "pct_error": 93.52656364772918,
              "rank": 9
            },
            {
              "index": 209,
              "actual": 20.0,
              "predicted": 11.411575985526328,
              "residual": 8.588424014473672,
              "abs_error": 8.588424014473672,
              "pct_error": 42.94212007236836,
              "rank": 10
            }
          ]
        },
        {
          "k": 6,
          "features": [
            "LSTAT",
            "RM",
            "DIS",
            "RAD",
            "PTRATIO",
            "NOX"
          ],
          "rmse": 5.001957349727503,
          "mae": 3.2689105750132583,
          "mse": 25.019577328492986,
          "r2": 0.6588260382831339,
          "adj_r2": 0.6372782091220687,
          "cv_rmse": 5.15078846097652,
          "cv_r2": 0.6897033401245001,
          "f_stat": 167.61371298482402,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 34.86190478762092,
              "stderr": 5.6660743739722665,
              "tstat": 6.152743943454555,
              "pvalue": 1.8617196673176295e-09,
              "ci_lower": 23.722643784698096,
              "ci_upper": 46.00116579054375,
              "vif": null
            },
            {
              "feature": "LSTAT",
              "coef": -0.5834423983397383,
              "stderr": 0.054780358129858917,
              "tstat": -10.65057656170604,
              "pvalue": 0.0,
              "ci_lower": -0.6911382503118132,
              "ci_upper": -0.47574654636766345,
              "vif": 2.4436085423761185
            },
            {
              "feature": "RM",
              "coef": 4.519325080187195,
              "stderr": 0.4663501519291643,
              "tstat": 9.690840801685109,
              "pvalue": 0.0,
              "ci_lower": 3.602500534968632,
              "ci_upper": 5.436149625405758,
              "vif": 1.7630561110217582
            },
            {
              "feature": "DIS",
              "coef": -1.2256326307372176,
              "stderr": 0.1882121207210409,
              "tstat": -6.511975031373204,
              "pvalue": 2.2458990223128694e-10,
              "ci_lower": -1.5956496475021225,
              "ci_upper": -0.8556156139723128,
              "vif": 2.5914958347644093
            },
            {
              "feature": "RAD",
              "coef": 0.011106160312532198,
              "stderr": 0.04165114757662469,
              "tstat": 0.2666471624125228,
              "pvalue": 0.7898792830935488,
              "ci_lower": -0.07077822264907238,
              "ci_upper": 0.09299054327413678,
              "vif": 2.0616181104926743
            },
            {
              "feature": "PTRATIO",
              "coef": -1.0120232950880403,
              "stderr": 0.13919134638392042,
              "tstat": -7.270734290454071,
              "pvalue": 1.9175772081325704e-12,
              "ci_lower": -1.2856675564202014,
              "ci_upper": -0.7383790337558793,
              "vif": 1.549973283523682
            },
            {
              "feature": "NOX",
              "coef": -18.398889800288856,
              "stderr": 3.9780899248883594,
              "tstat": -4.6250562827096475,
              "pvalue": 5.075355162809103e-06,
              "ci_lower": -26.219645237242815,
              "ci_upper": -10.578134363334897,
              "vif": 3.5312729745804647
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 24.17491414403203,
              "residual": 25.82508585596797,
              "abs_error": 25.82508585596797,
              "pct_error": 51.65017171193595,
              "rank": 1
            },
            {
              "index": 365,
              "actual": 27.5,
              "predicted": 11.437195372198266,
              "residual": 16.062804627801732,
              "abs_error": 16.062804627801732,
              "pct_error": 58.410198646551756,
              "rank": 2
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": 2.659455558837804,
              "residual": 15.240544441162195,
              "abs_error": 15.240544441162195,
              "pct_error": 85.1427063752078,
              "rank": 3
            },
            {
              "index": 375,
              "actual": 15.0,
              "predicted": 25.934985264232935,
              "residual": -10.934985264232935,
              "abs_error": 10.934985264232935,
              "pct_error": 72.8999017615529,
              "rank": 4
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 39.50286021583042,
              "residual": 10.497139784169583,
              "abs_error": 10.497139784169583,
              "pct_error": 20.994279568339167,
              "rank": 5
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 40.72896472806907,
              "residual": 9.271035271930927,
              "abs_error": 9.271035271930927,
              "pct_error": 18.542070543861854,
              "rank": 6
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 39.36836545809922,
              "residual": 9.13163454190078,
              "abs_error": 9.13163454190078,
              "pct_error": 18.828112457527382,
              "rank": 7
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -1.250062438782935,
              "residual": 8.250062438782935,
              "abs_error": 8.250062438782935,
              "pct_error": 117.85803483975621,
              "rank": 8
            },
            {
              "index": 436,
              "actual": 9.6,
              "predicted": 17.28417576887236,
              "residual": -7.684175768872359,
              "abs_error": 7.684175768872359,
              "pct_error": 80.04349759242041,
              "rank": 9
            },
            {
              "index": 0,
              "actual": 24.0,
              "predicted": 31.286633619314717,
              "residual": -7.286633619314717,
              "abs_error": 7.286633619314717,
              "pct_error": 30.360973413811323,
              "rank": 10
            }
          ]
        },
        {
          "k": 7,
          "features": [
            "LSTAT",
            "RM",
            "DIS",
            "RAD",
            "PTRATIO",
            "NOX",
            "TAX"
          ],
          "rmse": 4.899540050044219,
          "mae": 3.1652297220458623,
          "mse": 24.00549270198731,
          "r2": 0.6726543801851012,
          "adj_r2": 0.6482775787095236,
          "cv_rmse": 5.124861990818536,
          "cv_r2": 0.6929153335093445,
          "f_stat": 146.4001545784498,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 36.79922716593778,
              "stderr": 5.683963572975594,
              "tstat": 6.474219388192371,
              "pvalue": 2.8243918315240535e-10,
              "ci_lower": 25.624710473929476,
              "ci_upper": 47.97374385794608,
              "vif": null
            },
            {
              "feature": "LSTAT",
              "coef": -0.5802320360866366,
              "stderr": 0.05444539055852624,
              "tstat": -10.657137916256003,
              "pvalue": 0.0,
              "ci_lower": -0.6872701825821218,
              "ci_upper": -0.4731938895911515,
              "vif": 2.4449957279293857
            },
            {
              "feature": "RM",
              "coef": 4.378570586226547,
              "stderr": 0.4668425158586433,
              "tstat": 9.379117020165207,
              "pvalue": 0.0,
              "ci_lower": 3.460770987579478,
              "ci_upper": 5.296370184873616,
              "vif": 1.7896028393122791
            },
            {
              "feature": "DIS",
              "coef": -1.2229190116582207,
              "stderr": 0.18701139273808015,
              "tstat": -6.539275462062286,
              "pvalue": 1.9103119086594234e-10,
              "ci_lower": -1.5905782872530136,
              "ci_upper": -0.8552597360634279,
              "vif": 2.591584877333681
            },
            {
              "feature": "RAD",
              "coef": 0.16137494888618856,
              "stderr": 0.0734673128081634,
              "tstat": 2.1965543956612117,
              "pvalue": 0.028631249650241886,
              "ci_lower": 0.016940224287480682,
              "ci_upper": 0.3058096734848964,
              "vif": 6.4970552023385055
            },
            {
              "feature": "PTRATIO",
              "coef": -0.9981357450567933,
              "stderr": 0.13841471138294834,
              "tstat": -7.211196953590268,
              "pvalue": 2.8368418725222e-12,
              "ci_lower": -1.2702552762448778,
              "ci_upper": -0.7260162138687087,
              "vif": 1.552523608887302
            },
            {
              "feature": "NOX",
              "coef": -16.262925848222736,
              "stderr": 4.0457233519905,
              "tstat": -4.019781985394864,
              "pvalue": 6.974486003663571e-05,
              "ci_lower": -24.216707139681365,
              "ci_upper": -8.309144556764107,
              "vif": 3.6995460036322507
            },
            {
              "feature": "TAX",
              "coef": -0.00977067182268121,
              "stderr": 0.003946932778747998,
              "tstat": -2.4755100657631552,
              "pvalue": 0.013722065542437933,
              "ci_lower": -0.017530233553170085,
              "ci_upper": -0.0020111100921923353,
              "vif": 7.017924637063682
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 23.998579088473797,
              "residual": 26.001420911526203,
              "abs_error": 26.001420911526203,
              "pct_error": 52.00284182305241,
              "rank": 1
            },
            {
              "index": 365,
              "actual": 27.5,
              "predicted": 11.813860507138315,
              "residual": 15.686139492861685,
              "abs_error": 15.686139492861685,
              "pct_error": 57.040507246769764,
              "rank": 2
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": 2.7148054643074744,
              "residual": 15.185194535692524,
              "abs_error": 15.185194535692524,
              "pct_error": 84.83348902621522,
              "rank": 3
            },
            {
              "index": 375,
              "actual": 15.0,
              "predicted": 25.702633048020573,
              "residual": -10.702633048020573,
              "abs_error": 10.702633048020573,
              "pct_error": 71.35088698680381,
              "rank": 4
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 39.567514683837466,
              "residual": 10.432485316162534,
              "abs_error": 10.432485316162534,
              "pct_error": 20.86497063232507,
              "rank": 5
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 41.06396589956939,
              "residual": 8.93603410043061,
              "abs_error": 8.93603410043061,
              "pct_error": 17.87206820086122,
              "rank": 6
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 39.73182882990181,
              "residual": 8.768171170098192,
              "abs_error": 8.768171170098192,
              "pct_error": 18.078703443501425,
              "rank": 7
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -0.9656556781226726,
              "residual": 7.965655678122673,
              "abs_error": 7.965655678122673,
              "pct_error": 113.79508111603818,
              "rank": 8
            },
            {
              "index": 436,
              "actual": 9.6,
              "predicted": 17.335790020967757,
              "residual": -7.735790020967757,
              "abs_error": 7.735790020967757,
              "pct_error": 80.58114605174748,
              "rank": 9
            },
            {
              "index": 0,
              "actual": 24.0,
              "predicted": 30.945359556643538,
              "residual": -6.945359556643538,
              "abs_error": 6.945359556643538,
              "pct_error": 28.93899815268141,
              "rank": 10
            }
          ]
        },
        {
          "k": 8,
          "features": [
            "LSTAT",
            "RM",
            "DIS",
            "RAD",
            "PTRATIO",
            "NOX",
            "TAX",
            "B"
          ],
          "rmse": 5.05226111567406,
          "mae": 3.2684722874007375,
          "mse": 25.5253423809521,
          "r2": 0.6519292844179554,
          "adj_r2": 0.6219877174861667,
          "cv_rmse": 4.99588640627193,
          "cv_r2": 0.7083270616239405,
          "f_stat": 137.22992017226014,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 29.37460049491394,
              "stderr": 5.776130216685108,
              "tstat": 5.085515629488677,
              "pvalue": 5.675308796249112e-07,
              "ci_lower": 18.018798576086763,
              "ci_upper": 40.73040241374112,
              "vif": null
            },
            {
              "feature": "LSTAT",
              "coef": -0.5452755363140085,
              "stderr": 0.05365843924396617,
              "tstat": -10.161971611489317,
              "pvalue": 0.0,
              "ci_lower": -0.6507673767797514,
              "ci_upper": -0.4397836958482656,
              "vif": 2.4952366483049877
            },
            {
              "feature": "RM",
              "coef": 4.556012857752966,
              "stderr": 0.4570762653484388,
              "tstat": 9.967730121098768,
              "pvalue": 0.0,
              "ci_lower": 3.6574064662106123,
              "ci_upper": 5.4546192492953205,
              "vif": 1.8024905528098316
            },
            {
              "feature": "DIS",
              "coef": -1.2092633042200691,
              "stderr": 0.1824676476592714,
              "tstat": -6.627275134703174,
              "pvalue": 1.1234435604023929e-10,
              "ci_lower": -1.5679924854680265,
              "ci_upper": -0.8505341229721118,
              "vif": 2.5922736938516637
            },
            {
              "feature": "RAD",
              "coef": 0.19127097657321843,
              "stderr": 0.07196798027979659,
              "tstat": 2.6577232795695602,
              "pvalue": 0.008186397937501866,
              "ci_lower": 0.049782800597772986,
              "ci_upper": 0.33275915254866384,
              "vif": 6.55068437019462
            },
            {
              "feature": "PTRATIO",
              "coef": -1.018099254999393,
              "stderr": 0.13510375044885284,
              "tstat": -7.53568462471974,
              "pvalue": 3.348432642269472e-13,
              "ci_lower": -1.283711589042012,
              "ci_upper": -0.7524869209567739,
              "vif": 1.554133488306956
            },
            {
              "feature": "NOX",
              "coef": -15.338930495053829,
              "stderr": 3.952029327398428,
              "tstat": -3.881279521058427,
              "pvalue": 0.00012174072033577232,
              "ci_lower": -23.108572199060955,
              "ci_upper": -7.569288791046702,
              "vif": 3.7091652595553604
            },
            {
              "feature": "TAX",
              "coef": -0.008612564166482928,
              "stderr": 0.0038587776685974555,
              "tstat": -2.2319410202281293,
              "pvalue": 0.02617904878789168,
              "ci_lower": -0.0161988742407967,
              "ci_upper": -0.0010262540921691541,
              "vif": 7.048043109643308
            },
            {
              "feature": "B",
              "coef": 0.013810347526251099,
              "stderr": 0.003008067843108351,
              "tstat": 4.591102410768881,
              "pvalue": 5.934527203654838e-06,
              "ci_lower": 0.00789652264639307,
              "ci_upper": 0.019724172406109127,
              "vif": 1.3004651353706413
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 24.751275184919937,
              "residual": 25.248724815080063,
              "abs_error": 25.248724815080063,
              "pct_error": 50.497449630160126,
              "rank": 1
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": -0.6311772793198589,
              "residual": 18.531177279319856,
              "abs_error": 18.531177279319856,
              "pct_error": 103.52613005206624,
              "rank": 2
            },
            {
              "index": 365,
              "actual": 27.5,
              "predicted": 11.939525824453193,
              "residual": 15.560474175546807,
              "abs_error": 15.560474175546807,
              "pct_error": 56.58354245653384,
              "rank": 3
            },
            {
              "index": 375,
              "actual": 15.0,
              "predicted": 27.25030135113605,
              "residual": -12.250301351136049,
              "abs_error": 12.250301351136049,
              "pct_error": 81.66867567424032,
              "rank": 4
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -3.3281758498883995,
              "residual": 10.3281758498884,
              "abs_error": 10.3281758498884,
              "pct_error": 147.54536928412,
              "rank": 5
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 39.68300596751902,
              "residual": 10.316994032480977,
              "abs_error": 10.316994032480977,
              "pct_error": 20.633988064961954,
              "rank": 6
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 41.09911739041371,
              "residual": 8.90088260958629,
              "abs_error": 8.90088260958629,
              "pct_error": 17.80176521917258,
              "rank": 7
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 39.79816988937192,
              "residual": 8.70183011062808,
              "abs_error": 8.70183011062808,
              "pct_error": 17.941917753872332,
              "rank": 8
            },
            {
              "index": 381,
              "actual": 10.9,
              "predicted": 19.34001885451649,
              "residual": -8.44001885451649,
              "abs_error": 8.44001885451649,
              "pct_error": 77.43136563776596,
              "rank": 9
            },
            {
              "index": 395,
              "actual": 13.1,
              "predicted": 20.507048773804456,
              "residual": -7.407048773804457,
              "abs_error": 7.407048773804457,
              "pct_error": 56.54235705194242,
              "rank": 10
            }
          ]
        },
        {
          "k": 9,
          "features": [
            "LSTAT",
            "RM",
            "DIS",
            "RAD",
            "PTRATIO",
            "NOX",
            "TAX",
            "B",
            "CRIM"
          ],
          "rmse": 5.076343986769138,
          "mae": 3.302180203400075,
          "mse": 25.76926827200719,
          "r2": 0.6486030426703857,
          "adj_r2": 0.6142272533664017,
          "cv_rmse": 4.921139231137719,
          "cv_r2": 0.7185837298807914,
          "f_stat": 126.20255457643273,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 30.736233851552235,
              "stderr": 5.720927173482524,
              "tstat": 5.3725965948351755,
              "pvalue": 1.330529340037856e-07,
              "ci_lower": 19.48887271380231,
              "ci_upper": 41.98359498930216,
              "vif": null
            },
            {
              "feature": "LSTAT",
              "coef": -0.5244026431772728,
              "stderr": 0.05338554423601372,
              "tstat": -9.822933355496493,
              "pvalue": 0.0,
              "ci_lower": -0.6293587940510232,
              "ci_upper": -0.4194464923035224,
              "vif": 2.5311106014162896
            },
            {
              "feature": "RM",
              "coef": 4.519828425818692,
              "stderr": 0.45165193874351117,
              "tstat": 10.007326523146974,
              "pvalue": 0.0,
              "ci_lower": 3.6318792683535612,
              "ci_upper": 5.407777583283822,
              "vif": 1.8035638437010204
            },
            {
              "feature": "DIS",
              "coef": -1.2618785348522175,
              "stderr": 0.1809591519081595,
              "tstat": -6.973278342355665,
              "pvalue": 1.3133716336710677e-11,
              "ci_lower": -1.617644806817021,
              "ci_upper": -0.9061122628874139,
              "vif": 2.612752768639046
            },
            {
              "feature": "RAD",
              "coef": 0.2555112032880736,
              "stderr": 0.0737346249503483,
              "tstat": 3.465281113996724,
              "pvalue": 0.0005879160599719935,
              "ci_lower": 0.11054869458543645,
              "ci_upper": 0.4004737119907107,
              "vif": 7.0465916045066495
            },
            {
              "feature": "PTRATIO",
              "coef": -1.0411438258766175,
              "stderr": 0.13364501926811898,
              "tstat": -7.790367584053934,
              "pvalue": 5.995204332975845e-14,
              "ci_lower": -1.30389036160206,
              "ci_upper": -0.7783972901511749,
              "vif": 1.5584295353475532
            },
            {
              "feature": "NOX",
              "coef": -16.48731544291712,
              "stderr": 3.919595330102078,
              "tstat": -4.206382050793938,
              "pvalue": 3.215477708207182e-05,
              "ci_lower": -24.19325240988957,
              "ci_upper": -8.781378475944667,
              "vif": 3.7389222576963537
            },
            {
              "feature": "TAX",
              "coef": -0.008543541087833173,
              "stderr": 0.0038119070710764154,
              "tstat": -2.2412773786273408,
              "pvalue": 0.025564327178866142,
              "ci_lower": -0.016037762592813497,
              "ci_upper": -0.001049319582852851,
              "vif": 7.048257367107363
            },
            {
              "feature": "B",
              "coef": 0.012839633476148804,
              "stderr": 0.0029861494355208308,
              "tstat": 4.299729050200521,
              "pvalue": 2.158347230629687e-05,
              "ci_lower": 0.006968854126208969,
              "ci_upper": 0.018710412826088638,
              "vif": 1.3133323445072724
            },
            {
              "feature": "CRIM",
              "coef": -0.11489080916303782,
              "stderr": 0.03498326739478257,
              "tstat": -3.2841646226610814,
              "pvalue": 0.0011143129870763158,
              "ci_lower": -0.1836680248548211,
              "ci_upper": -0.04611359347125453,
              "vif": 1.69332838111364
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 25.006862528950553,
              "residual": 24.993137471049447,
              "abs_error": 24.993137471049447,
              "pct_error": 49.986274942098895,
              "rank": 1
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": -0.5538721461684855,
              "residual": 18.453872146168486,
              "abs_error": 18.453872146168486,
              "pct_error": 103.09425779982395,
              "rank": 2
            },
            {
              "index": 365,
              "actual": 27.5,
              "predicted": 12.665996750989894,
              "residual": 14.834003249010106,
              "abs_error": 14.834003249010106,
              "pct_error": 53.94182999640038,
              "rank": 3
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -6.460514591706537,
              "residual": 13.460514591706538,
              "abs_error": 13.460514591706538,
              "pct_error": 192.2930655958077,
              "rank": 4
            },
            {
              "index": 375,
              "actual": 15.0,
              "predicted": 26.272078620072154,
              "residual": -11.272078620072154,
              "abs_error": 11.272078620072154,
              "pct_error": 75.14719080048103,
              "rank": 5
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 39.59831782782679,
              "residual": 10.40168217217321,
              "abs_error": 10.40168217217321,
              "pct_error": 20.80336434434642,
              "rank": 6
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 41.03527758190282,
              "residual": 8.964722418097182,
              "abs_error": 8.964722418097182,
              "pct_error": 17.929444836194364,
              "rank": 7
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 39.75640205028105,
              "residual": 8.743597949718954,
              "abs_error": 8.743597949718954,
              "pct_error": 18.0280370097298,
              "rank": 8
            },
            {
              "index": 381,
              "actual": 10.9,
              "predicted": 18.967461745428718,
              "residual": -8.067461745428718,
              "abs_error": 8.067461745428718,
              "pct_error": 74.01341050852034,
              "rank": 9
            },
            {
              "index": 395,
              "actual": 13.1,
              "predicted": 20.84550725521215,
              "residual": -7.745507255212152,
              "abs_error": 7.745507255212152,
              "pct_error": 59.12600958177215,
              "rank": 10
            }
          ]
        },
        {
          "k": 10,
          "features": [
            "LSTAT",
            "RM",
            "DIS",
            "RAD",
            "PTRATIO",
            "NOX",
            "TAX",
            "B",
            "CRIM",
            "CHAS"
          ],
          "rmse": 5.0497735194933595,
          "mae": 3.2656420568051443,
          "mse": 25.500212598176354,
          "r2": 0.6522719611720076,
          "adj_r2": 0.6140600887733272,
          "cv_rmse": 4.934740600383493,
          "cv_r2": 0.7185898301569125,
          "f_stat": 116.84236158735513,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 30.931096918952516,
              "stderr": 5.663107093622554,
              "tstat": 5.461859789617122,
              "pvalue": 8.374116866605164e-08,
              "ci_lower": 19.79732295466753,
              "ci_upper": 42.064870883237504,
              "vif": null
            },
            {
              "feature": "LSTAT",
              "coef": -0.5102347064892856,
              "stderr": 0.05304999342227543,
              "tstat": -9.617997544841176,
              "pvalue": 0.0,
              "ci_lower": -0.6145319810782776,
              "ci_upper": -0.4059374319002936,
              "vif": 2.551020818165934
            },
            {
              "feature": "RM",
              "coef": 4.463746112944273,
              "stderr": 0.447442994935156,
              "tstat": 9.976122463580339,
              "pvalue": 0.0,
              "ci_lower": 3.5840648557911354,
              "ci_upper": 5.343427370097411,
              "vif": 1.8066696516255711
            },
            {
              "feature": "DIS",
              "coef": -1.2349600579587305,
              "stderr": 0.17933983366848527,
              "tstat": -6.886144771616042,
              "pvalue": 2.2814194977627267e-11,
              "ci_lower": -1.5875455093456514,
              "ci_upper": -0.8823746065718097,
              "vif": 2.619209863656011
            },
            {
              "feature": "RAD",
              "coef": 0.23811625755890653,
              "stderr": 0.0732111582499446,
              "tstat": 3.252458549364457,
              "pvalue": 0.001242955393102152,
              "ci_lower": 0.0941817576204689,
              "ci_upper": 0.3820507574973442,
              "vif": 7.090392330230745
            },
            {
              "feature": "PTRATIO",
              "coef": -1.0122419941039542,
              "stderr": 0.1326307633230146,
              "tstat": -7.632030222420548,
              "pvalue": 1.7674750552032492e-13,
              "ci_lower": -1.272996543706587,
              "ci_upper": -0.7514874445013213,
              "vif": 1.5665696655442762
            },
            {
              "feature": "NOX",
              "coef": -17.953928704282824,
              "stderr": 3.9099451476111104,
              "tstat": -4.591862040635602,
              "pvalue": 5.922710846872903e-06,
              "ci_lower": -25.640953647759275,
              "ci_upper": -10.266903760806372,
              "vif": 3.79738701973227
            },
            {
              "feature": "TAX",
              "coef": -0.007795494795684144,
              "stderr": 0.0037812420263352445,
              "tstat": -2.061622805784661,
              "pvalue": 0.039900764160470725,
              "ci_lower": -0.015229487006935355,
              "ci_upper": -0.00036150258443293226,
              "vif": 7.078572054426567
            },
            {
              "feature": "B",
              "coef": 0.01227368106962784,
              "stderr": 0.0029617006366405418,
              "tstat": 4.144132907217078,
              "pvalue": 4.179931929404468e-05,
              "ci_lower": 0.006450922486204782,
              "ci_upper": 0.018096439653050897,
              "vif": 1.3186011284107795
            },
            {
              "feature": "CRIM",
              "coef": -0.10856796441008978,
              "stderr": 0.03469056629537333,
              "tstat": -3.129610611878926,
              "pvalue": 0.0018810563107507505,
              "ci_lower": -0.17677026350852754,
              "ci_upper": -0.040365665311652046,
              "vif": 1.6995063324698794
            },
            {
              "feature": "CHAS",
              "coef": 2.8752490217552387,
              "stderr": 0.9511197149026644,
              "tstat": 3.023014849449825,
              "pvalue": 0.0026667332859007242,
              "ci_lower": 1.005329957249686,
              "ci_upper": 4.745168086260791,
              "vif": 1.0833550411756299
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 24.609863860418415,
              "residual": 25.390136139581585,
              "abs_error": 25.390136139581585,
              "pct_error": 50.78027227916317,
              "rank": 1
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": -0.1981631368324137,
              "residual": 18.09816313683241,
              "abs_error": 18.09816313683241,
              "pct_error": 101.10705663034867,
              "rank": 2
            },
            {
              "index": 365,
              "actual": 27.5,
              "predicted": 12.245022851737513,
              "residual": 15.254977148262487,
              "abs_error": 15.254977148262487,
              "pct_error": 55.47264417549995,
              "rank": 3
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -6.063057964897368,
              "residual": 13.063057964897368,
              "abs_error": 13.063057964897368,
              "pct_error": 186.6151137842481,
              "rank": 4
            },
            {
              "index": 375,
              "actual": 15.0,
              "predicted": 25.862460015042775,
              "residual": -10.862460015042775,
              "abs_error": 10.862460015042775,
              "pct_error": 72.41640010028516,
              "rank": 5
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 39.24107728226416,
              "residual": 10.758922717735842,
              "abs_error": 10.758922717735842,
              "pct_error": 21.517845435471685,
              "rank": 6
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 40.64982381918521,
              "residual": 9.350176180814792,
              "abs_error": 9.350176180814792,
              "pct_error": 18.700352361629584,
              "rank": 7
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 39.39310819934672,
              "residual": 9.10689180065328,
              "abs_error": 9.10689180065328,
              "pct_error": 18.777096496192332,
              "rank": 8
            },
            {
              "index": 381,
              "actual": 10.9,
              "predicted": 18.691005223645963,
              "residual": -7.791005223645962,
              "abs_error": 7.791005223645962,
              "pct_error": 71.47711214354094,
              "rank": 9
            },
            {
              "index": 395,
              "actual": 13.1,
              "predicted": 20.447916745120274,
              "residual": -7.3479167451202745,
              "abs_error": 7.3479167451202745,
              "pct_error": 56.0909675200021,
              "rank": 10
            }
          ]
        },
        {
          "k": 11,
          "features": [
            "LSTAT",
            "RM",
            "DIS",
            "RAD",
            "PTRATIO",
            "NOX",
            "TAX",
            "B",
            "CRIM",
            "CHAS",
            "ZN"
          ],
          "rmse": 4.907998359203158,
          "mae": 3.1496942855297037,
          "mse": 24.08844789394089,
          "r2": 0.671523179960885,
          "adj_r2": 0.6313760130672152,
          "cv_rmse": 4.9194763908626395,
          "cv_r2": 0.7198457918911448,
          "f_stat": 107.22111805286995,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 30.32879772004939,
              "stderr": 5.654166806962422,
              "tstat": 5.363972934562727,
              "pvalue": 1.3947658827895282e-07,
              "ci_lower": 19.2125129289226,
              "ci_upper": 41.44508251117618,
              "vif": null
            },
            {
              "feature": "LSTAT",
              "coef": -0.5134809376946151,
              "stderr": 0.05290908811723856,
              "tstat": -9.70496668846038,
              "pvalue": 0.0,
              "ci_lower": -0.6175020095218218,
              "ci_upper": -0.4094598658674084,
              "vif": 2.553752582163273
            },
            {
              "feature": "RM",
              "coef": 4.362608488929966,
              "stderr": 0.44926243887837447,
              "tstat": 9.710601446721485,
              "pvalue": 0.0,
              "ci_lower": 3.479343210944439,
              "ci_upper": 5.2458737669154925,
              "vif": 1.8330675749381375
            },
            {
              "feature": "DIS",
              "coef": -1.4407913663875924,
              "stderr": 0.2097543422549701,
              "tstat": -6.868946553851154,
              "pvalue": 2.5491164734603444e-11,
              "ci_lower": -1.853175557425348,
              "ci_upper": -1.028407175349837,
              "vif": 3.605899549660099
            },
            {
              "feature": "RAD",
              "coef": 0.25387646131037594,
              "stderr": 0.07345962955091524,
              "tstat": 3.4559997492828747,
              "pvalue": 0.0006082275285890226,
              "ci_lower": 0.10945232410007905,
              "ci_upper": 0.39830059852067284,
              "vif": 7.184360401599101
            },
            {
              "feature": "PTRATIO",
              "coef": -0.9129851823807902,
              "stderr": 0.14240231776245313,
              "tstat": -6.41130844445788,
              "pvalue": 4.1519587767879784e-10,
              "ci_lower": -1.192952996067275,
              "ci_upper": -0.6330173686943055,
              "vif": 1.8174824344111304
            },
            {
              "feature": "NOX",
              "coef": -16.947997767581718,
              "stderr": 3.934189158861904,
              "tstat": -4.307875672273088,
              "pvalue": 2.0862579873881515e-05,
              "ci_lower": -24.682747838665556,
              "ci_upper": -9.213247696497879,
              "vif": 3.8692691283231064
            },
            {
              "feature": "TAX",
              "coef": -0.009663409900027453,
              "stderr": 0.0038984866477108407,
              "tstat": -2.4787592656503588,
              "pvalue": 0.013603907847143493,
              "ci_lower": -0.017327967616470305,
              "ci_upper": -0.0019988521835846004,
              "vif": 7.572577708122083
            },
            {
              "feature": "B",
              "coef": 0.012202567953642218,
              "stderr": 0.002952497185981907,
              "tstat": 4.132965142720036,
              "pvalue": 4.381625413163448e-05,
              "ci_lower": 0.006397857784150849,
              "ci_upper": 0.018007278123133588,
              "vif": 1.3188185343927659
            },
            {
              "feature": "CRIM",
              "coef": -0.113903315306583,
              "stderr": 0.034696678233703176,
              "tstat": -3.282830550503281,
              "pvalue": 0.001119937046194286,
              "ci_lower": -0.1821181681257453,
              "ci_upper": -0.0456884624874207,
              "vif": 1.7110028665184176
            },
            {
              "feature": "CHAS",
              "coef": 2.8311181819115045,
              "stderr": 0.9483777799510577,
              "tstat": 2.985221967197089,
              "pvalue": 0.0030113927706529875,
              "ci_lower": 0.966575119876123,
              "ci_upper": 4.695661243946886,
              "vif": 1.084022041081177
            },
            {
              "feature": "ZN",
              "coef": 0.029591622898598544,
              "stderr": 0.015774361576326675,
              "tstat": 1.8759315713295226,
              "pvalue": 0.06140758327682794,
              "ci_lower": -0.0014213099821098717,
              "ci_upper": 0.06060455577930696,
              "vif": 2.4067510346005188
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 24.805967045480493,
              "residual": 25.194032954519507,
              "abs_error": 25.194032954519507,
              "pct_error": 50.388065909039014,
              "rank": 1
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": -0.06261033213060418,
              "residual": 17.962610332130602,
              "abs_error": 17.962610332130602,
              "pct_error": 100.34977839179109,
              "rank": 2
            },
            {
              "index": 365,
              "actual": 27.5,
              "predicted": 12.739340793353072,
              "residual": 14.760659206646928,
              "abs_error": 14.760659206646928,
              "pct_error": 53.675124387807,
              "rank": 3
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -5.9977906762406965,
              "residual": 12.997790676240697,
              "abs_error": 12.997790676240697,
              "pct_error": 185.68272394629568,
              "rank": 4
            },
            {
              "index": 375,
              "actual": 15.0,
              "predicted": 25.887310733916333,
              "residual": -10.887310733916333,
              "abs_error": 10.887310733916333,
              "pct_error": 72.58207155944221,
              "rank": 5
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 40.4498050595157,
              "residual": 9.550194940484303,
              "abs_error": 9.550194940484303,
              "pct_error": 19.100389880968606,
              "rank": 6
            },
            {
              "index": 381,
              "actual": 10.9,
              "predicted": 18.74689119386672,
              "residual": -7.846891193866719,
              "abs_error": 7.846891193866719,
              "pct_error": 71.98982746666715,
              "rank": 7
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 42.477785753984854,
              "residual": 7.522214246015146,
              "abs_error": 7.522214246015146,
              "pct_error": 15.044428492030292,
              "rank": 8
            },
            {
              "index": 395,
              "actual": 13.1,
              "predicted": 20.542306741382987,
              "residual": -7.442306741382987,
              "abs_error": 7.442306741382987,
              "pct_error": 56.81150184261823,
              "rank": 9
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 41.2361183832064,
              "residual": 7.263881616793597,
              "abs_error": 7.263881616793597,
              "pct_error": 14.977075498543499,
              "rank": 10
            }
          ]
        },
        {
          "k": 12,
          "features": [
            "LSTAT",
            "RM",
            "DIS",
            "RAD",
            "PTRATIO",
            "NOX",
            "TAX",
            "B",
            "CRIM",
            "CHAS",
            "ZN",
            "INDUS"
          ],
          "rmse": 4.917703495184508,
          "mae": 3.176587970763045,
          "mse": 24.183807666549924,
          "r2": 0.6702228274016755,
          "adj_r2": 0.6257584895232498,
          "cv_rmse": 4.92882265897438,
          "cv_r2": 0.718701373948255,
          "f_stat": 98.1507346774615,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 30.397987924641896,
              "stderr": 5.660116423235797,
              "tstat": 5.370558775054994,
              "pvalue": 1.34992450773197e-07,
              "ci_lower": 19.269917846080503,
              "ci_upper": 41.52605800320329,
              "vif": null
            },
            {
              "feature": "LSTAT",
              "coef": -0.5157500490258979,
              "stderr": 0.05309381235592372,
              "tstat": -9.713938896843132,
              "pvalue": 0.0,
              "ci_lower": -0.6201351217797441,
              "ci_upper": -0.4113649762720518,
              "vif": 2.567322534751777
            },
            {
              "feature": "RM",
              "coef": 4.397481338859634,
              "stderr": 0.453534460350038,
              "tstat": 9.696024719854046,
              "pvalue": 0.0,
              "ci_lower": 3.505810058548322,
              "ci_upper": 5.289152619170945,
              "vif": 1.8649757224966386
            },
            {
              "feature": "DIS",
              "coef": -1.416681788933789,
              "stderr": 0.21389849194515742,
              "tstat": -6.6231499626328345,
              "pvalue": 1.1651479780994123e-10,
              "ci_lower": -1.8372168504199529,
              "ci_upper": -0.9961467274476252,
              "vif": 3.7435315295558693
            },
            {
              "feature": "RAD",
              "coef": 0.26458421133133286,
              "stderr": 0.07574388991422214,
              "tstat": 3.4931426367323777,
              "pvalue": 0.0005319472877212128,
              "ci_lower": 0.1156679608584423,
              "ci_upper": 0.4135004618042234,
              "vif": 7.6253573108873045
            },
            {
              "feature": "PTRATIO",
              "coef": -0.9212737597564905,
              "stderr": 0.143217105633918,
              "tstat": -6.4327075713385025,
              "pvalue": 3.6653657886631663e-10,
              "ci_lower": -1.202845704354736,
              "ci_upper": -0.639701815158245,
              "vif": 1.8352711484569852
            },
            {
              "feature": "NOX",
              "coef": -17.63953756125711,
              "stderr": 4.1094573283078715,
              "tstat": -4.292425045941637,
              "pvalue": 2.231148361264701e-05,
              "ci_lower": -25.718934823570734,
              "ci_upper": -9.56014029894349,
              "vif": 4.21465237789395
            },
            {
              "feature": "TAX",
              "coef": -0.010639186966195813,
              "stderr": 0.004240159729651396,
              "tstat": -2.5091476841771034,
              "pvalue": 0.012505867758054734,
              "ci_lower": -0.01897555164275133,
              "ci_upper": -0.002302822289640294,
              "vif": 8.943147972583946
            },
            {
              "feature": "B",
              "coef": 0.012294274646032444,
              "stderr": 0.0029590800566325205,
              "tstat": 4.154762429788237,
              "pvalue": 4.002187465457219e-05,
              "ci_lower": 0.006476576249741293,
              "ci_upper": 0.018111973042323593,
              "vif": 1.3224943741667357
            },
            {
              "feature": "CRIM",
              "coef": -0.11350613527469174,
              "stderr": 0.034732249785839615,
              "tstat": -3.26803290816388,
              "pvalue": 0.0011787588002960536,
              "ci_lower": -0.1817914638266378,
              "ci_upper": -0.045220806722745685,
              "vif": 1.711650602776685
            },
            {
              "feature": "CHAS",
              "coef": 2.7729102607435103,
              "stderr": 0.9543213730863704,
              "tstat": 2.9056357103012815,
              "pvalue": 0.0038734573596348465,
              "ci_lower": 0.8966670312618596,
              "ci_upper": 4.649153490225161,
              "vif": 1.0958194873067029
            },
            {
              "feature": "ZN",
              "coef": 0.030752185082846842,
              "stderr": 0.015910509711543397,
              "tstat": 1.9328221182339311,
              "pvalue": 0.05397993253889144,
              "ci_lower": -0.0005286674326334048,
              "ci_upper": 0.06203303759832709,
              "vif": 2.444387850159094
            },
            {
              "feature": "INDUS",
              "coef": 0.03954259048361967,
              "stderr": 0.06726701743500073,
              "tstat": 0.5878451578714513,
              "pvalue": 0.5569755776693683,
              "ci_lower": -0.09270770757024333,
              "ci_upper": 0.17179288853748265,
              "vif": 3.8746419210235126
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 24.85478254126707,
              "residual": 25.14521745873293,
              "abs_error": 25.14521745873293,
              "pct_error": 50.29043491746585,
              "rank": 1
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": -0.11988163048550249,
              "residual": 18.0198816304855,
              "abs_error": 18.0198816304855,
              "pct_error": 100.66972977924861,
              "rank": 2
            },
            {
              "index": 365,
              "actual": 27.5,
              "predicted": 12.648673105937853,
              "residual": 14.851326894062147,
              "abs_error": 14.851326894062147,
              "pct_error": 54.004825069316894,
              "rank": 3
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -6.112505889136609,
              "residual": 13.11250588913661,
              "abs_error": 13.11250588913661,
              "pct_error": 187.32151270195158,
              "rank": 4
            },
            {
              "index": 375,
              "actual": 15.0,
              "predicted": 25.948338297370572,
              "residual": -10.948338297370572,
              "abs_error": 10.948338297370572,
              "pct_error": 72.98892198247047,
              "rank": 5
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 40.45307635576985,
              "residual": 9.546923644230148,
              "abs_error": 9.546923644230148,
              "pct_error": 19.093847288460296,
              "rank": 6
            },
            {
              "index": 381,
              "actual": 10.9,
              "predicted": 18.767208883004233,
              "residual": -7.867208883004233,
              "abs_error": 7.867208883004233,
              "pct_error": 72.1762282844425,
              "rank": 7
            },
            {
              "index": 395,
              "actual": 13.1,
              "predicted": 20.555500200199116,
              "residual": -7.455500200199117,
              "abs_error": 7.455500200199117,
              "pct_error": 56.91221526869554,
              "rank": 8
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 42.61071893143731,
              "residual": 7.389281068562688,
              "abs_error": 7.389281068562688,
              "pct_error": 14.778562137125375,
              "rank": 9
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 41.36083976887979,
              "residual": 7.139160231120208,
              "abs_error": 7.139160231120208,
              "pct_error": 14.719918002309706,
              "rank": 10
            }
          ]
        },
        {
          "k": 13,
          "features": [
            "LSTAT",
            "RM",
            "DIS",
            "RAD",
            "PTRATIO",
            "NOX",
            "TAX",
            "B",
            "CRIM",
            "CHAS",
            "ZN",
            "INDUS",
            "AGE"
          ],
          "rmse": 4.92860218266529,
          "mae": 3.1890919658878016,
          "mse": 24.291119474973062,
          "r2": 0.6687594935356382,
          "adj_r2": 0.6198262368988576,
          "cv_rmse": 4.93136736087381,
          "cv_r2": 0.7184784187192005,
          "f_stat": 90.4266165387097,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 30.246750993925748,
              "stderr": 5.676806440074027,
              "tstat": 5.328127938343327,
              "pvalue": 1.6816101244820914e-07,
              "ci_lower": 19.08577865958982,
              "ci_upper": 41.407723328261675,
              "vif": null
            },
            {
              "feature": "LSTAT",
              "coef": -0.5085714244487917,
              "stderr": 0.05568391699894732,
              "tstat": -9.133183365286712,
              "pvalue": 0.0,
              "ci_lower": -0.6180496431714657,
              "ci_upper": -0.3990932057261176,
              "vif": 2.818045379538575
            },
            {
              "feature": "RM",
              "coef": 4.43883519951302,
              "stderr": 0.4639796661053502,
              "tstat": 9.566874420969018,
              "pvalue": 0.0,
              "ci_lower": 3.5266208635546668,
              "ci_upper": 5.351049535471374,
              "vif": 1.9478087495837577
            },
            {
              "feature": "DIS",
              "coef": -1.4478653685307905,
              "stderr": 0.2259503678263528,
              "tstat": -6.407891177426641,
              "pvalue": 4.258553509828289e-10,
              "ci_lower": -1.892098553308897,
              "ci_upper": -1.003632183752684,
              "vif": 4.16857837354429
            },
            {
              "feature": "RAD",
              "coef": 0.26242973558508864,
              "stderr": 0.07598646354966782,
              "tstat": 3.4536379682093505,
              "pvalue": 0.0006137380080792898,
              "ci_lower": 0.11303538395191784,
              "ci_upper": 0.41182408721825947,
              "vif": 7.658315779148448
            },
            {
              "feature": "PTRATIO",
              "coef": -0.915456240468084,
              "stderr": 0.14399674435894108,
              "tstat": -6.357478737061747,
              "pvalue": 5.737761377133666e-10,
              "ci_lower": -1.1985632473724144,
              "ci_upper": -0.6323492335637537,
              "vif": 1.8514484070670416
            },
            {
              "feature": "NOX",
              "coef": -17.20263339178146,
              "stderr": 4.2361190871668315,
              "tstat": -4.06094187575987,
              "pvalue": 5.909342124965633e-05,
              "ci_lower": -25.531120268322706,
              "ci_upper": -8.874146515240216,
              "vif": 4.469150159170634
            },
            {
              "feature": "TAX",
              "coef": -0.010646786275309572,
              "stderr": 0.004244612368584231,
              "tstat": -2.5083059065911253,
              "pvalue": 0.012536260644878672,
              "ci_lower": -0.01899197149799455,
              "ci_upper": -0.0023016010526245943,
              "vif": 8.943301431814218
            },
            {
              "feature": "B",
              "coef": 0.01235133472996669,
              "stderr": 0.0029651025885100804,
              "tstat": 4.165567416732468,
              "pvalue": 3.826938058426599e-05,
              "ci_lower": 0.006521749326946096,
              "ci_upper": 0.018180920132987284,
              "vif": 1.3251213980906684
            },
            {
              "feature": "CRIM",
              "coef": -0.11305592398537526,
              "stderr": 0.034784024879169394,
              "tstat": -3.2502254807516375,
              "pvalue": 0.0012532800108639996,
              "ci_lower": -0.18144358938342248,
              "ci_upper": -0.044668258587328036,
              "vif": 1.7131869906128505
            },
            {
              "feature": "CHAS",
              "coef": 2.7844382035079485,
              "stderr": 0.9556875964881923,
              "tstat": 2.9135443566911987,
              "pvalue": 0.0037792729194365826,
              "ci_lower": 0.9054939524981118,
              "ci_upper": 4.6633824545177855,
              "vif": 1.096673712063457
            },
            {
              "feature": "ZN",
              "coef": 0.030110464145646942,
              "stderr": 0.01599613802970804,
              "tstat": 1.8823583598569706,
              "pvalue": 0.06053163638412262,
              "ci_lower": -0.001338988269267899,
              "ci_upper": 0.061559916560561784,
              "vif": 2.465630718663123
            },
            {
              "feature": "INDUS",
              "coef": 0.04038072041333766,
              "stderr": 0.06736499472046811,
              "tstat": 0.5994318055081569,
              "pvalue": 0.5492330385284445,
              "ci_lower": -0.09206326024985118,
              "ci_upper": 0.17282470107652648,
              "vif": 3.8778553502602815
            },
            {
              "feature": "AGE",
              "coef": -0.006296362210983661,
              "stderr": 0.014568042572182135,
              "tstat": -0.43220372124712525,
              "pvalue": 0.6658322215807768,
              "ci_lower": -0.034938085657068345,
              "ci_upper": 0.022345361235101023,
              "vif": 2.9899478376482787
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 24.739571606519075,
              "residual": 25.260428393480925,
              "abs_error": 25.260428393480925,
              "pct_error": 50.52085678696186,
              "rank": 1
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": -0.16423699568594397,
              "residual": 18.064236995685942,
              "abs_error": 18.064236995685942,
              "pct_error": 100.91752511556393,
              "rank": 2
            },
            {
              "index": 365,
              "actual": 27.5,
              "predicted": 12.503956484181789,
              "residual": 14.996043515818211,
              "abs_error": 14.996043515818211,
              "pct_error": 54.53106733024804,
              "rank": 3
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -6.0884218421930525,
              "residual": 13.088421842193053,
              "abs_error": 13.088421842193053,
              "pct_error": 186.97745488847218,
              "rank": 4
            },
            {
              "index": 375,
              "actual": 15.0,
              "predicted": 25.939095624449187,
              "residual": -10.939095624449187,
              "abs_error": 10.939095624449187,
              "pct_error": 72.92730416299459,
              "rank": 5
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 40.500339660507734,
              "residual": 9.499660339492266,
              "abs_error": 9.499660339492266,
              "pct_error": 18.99932067898453,
              "rank": 6
            },
            {
              "index": 381,
              "actual": 10.9,
              "predicted": 18.76548694981453,
              "residual": -7.86548694981453,
              "abs_error": 7.86548694981453,
              "pct_error": 72.16043073224338,
              "rank": 7
            },
            {
              "index": 395,
              "actual": 13.1,
              "predicted": 20.52384892875276,
              "residual": -7.42384892875276,
              "abs_error": 7.42384892875276,
              "pct_error": 56.670602509563054,
              "rank": 8
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 42.67251161101961,
              "residual": 7.327488388980392,
              "abs_error": 7.327488388980392,
              "pct_error": 14.654976777960782,
              "rank": 9
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 41.41377225132489,
              "residual": 7.086227748675107,
              "abs_error": 7.086227748675107,
              "pct_error": 14.610778863247642,
              "rank": 10
            }
          ]
        }
      ],
      "Exhaustive Feature Selection": [
        {
          "k": 1,
          "features": [
            "LSTAT"
          ],
          "rmse": 5.789606996393182,
          "mae": 4.184807930623362,
          "mse": 33.51954917268489,
          "r2": 0.5429180422970386,
          "adj_r2": 0.538347222720009,
          "cv_rmse": 6.332558301047439,
          "cv_r2": 0.5428147541494676,
          "f_stat": 476.33924982804336,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 34.83694982031851,
              "stderr": 0.6350210267842641,
              "tstat": 54.859521733842804,
              "pvalue": 0.0,
              "ci_lower": 33.588572993959744,
              "ci_upper": 36.085326646677274,
              "vif": null
            },
            {
              "feature": "LSTAT",
              "coef": -0.9665309019503531,
              "stderr": 0.044285092860186184,
              "tstat": -21.825197589667866,
              "pvalue": 0.0,
              "ci_lower": -1.0535901981751759,
              "ci_upper": -0.8794716057255303,
              "vif": 1.0
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 25.625910324731645,
              "residual": 24.374089675268355,
              "abs_error": 24.374089675268355,
              "pct_error": 48.74817935053671,
              "rank": 1
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 31.96635304152596,
              "residual": 18.03364695847404,
              "abs_error": 18.03364695847404,
              "pct_error": 36.06729391694808,
              "rank": 2
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 32.05334082270149,
              "residual": 17.946659177298507,
              "abs_error": 17.946659177298507,
              "pct_error": 35.893318354597014,
              "rank": 3
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 31.154467083887663,
              "residual": 17.345532916112337,
              "abs_error": 17.345532916112337,
              "pct_error": 35.76398539404605,
              "rank": 4
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": 1.6172827202848765,
              "residual": 16.282717279715122,
              "abs_error": 16.282717279715122,
              "pct_error": 90.9649010039951,
              "rank": 5
            },
            {
              "index": 268,
              "actual": 43.5,
              "predicted": 31.782712170155392,
              "residual": 11.717287829844608,
              "abs_error": 11.717287829844608,
              "pct_error": 26.93629386171174,
              "rank": 6
            },
            {
              "index": 355,
              "actual": 20.6,
              "predicted": 29.45337269645504,
              "residual": -8.85337269645504,
              "abs_error": 8.85337269645504,
              "pct_error": 42.977537361432226,
              "rank": 7
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -0.9053629338055416,
              "residual": 7.905362933805542,
              "abs_error": 7.905362933805542,
              "pct_error": 112.93375619722201,
              "rank": 8
            },
            {
              "index": 408,
              "actual": 17.2,
              "predicted": 9.320534008829188,
              "residual": 7.879465991170811,
              "abs_error": 7.879465991170811,
              "pct_error": 45.810848785876814,
              "rank": 9
            },
            {
              "index": 436,
              "actual": 9.6,
              "predicted": 17.391067040114635,
              "residual": -7.791067040114635,
              "abs_error": 7.791067040114635,
              "pct_error": 81.15694833452746,
              "rank": 10
            }
          ]
        },
        {
          "k": 2,
          "features": [
            "RM",
            "LSTAT"
          ],
          "rmse": 5.589569804715172,
          "mae": 3.898759721382368,
          "mse": 31.243290601783606,
          "r2": 0.5739577415025862,
          "adj_r2": 0.5653508271895071,
          "cv_rmse": 5.583527948544505,
          "cv_r2": 0.63594666380683,
          "f_stat": 372.61794090137715,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": -3.8411770790047806,
              "stderr": 3.522984973655918,
              "tstat": -1.0903188937018555,
              "pvalue": 0.2762274312067612,
              "ci_lower": -10.767004309133334,
              "ci_upper": 3.084650151123772,
              "vif": null
            },
            {
              "feature": "RM",
              "coef": 5.465098773075856,
              "stderr": 0.491551098557778,
              "tstat": 11.118068475710011,
              "pvalue": 0.0,
              "ci_lower": 4.498759714337775,
              "ci_upper": 6.431437831813937,
              "vif": 1.6006409402077786
            },
            {
              "feature": "LSTAT",
              "coef": -0.6324985627075881,
              "stderr": 0.04904544343244731,
              "tstat": -12.896173802134328,
              "pvalue": 0.0,
              "ci_lower": -0.7289168756377382,
              "ci_upper": -0.536080249777438,
              "vif": 1.600640940207779
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 24.10216559183143,
              "residual": 25.89783440816857,
              "abs_error": 25.89783440816857,
              "pct_error": 51.795668816337134,
              "rank": 1
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": -0.287675557469516,
              "residual": 18.187675557469515,
              "abs_error": 18.187675557469515,
              "pct_error": 101.60712601938278,
              "rank": 2
            },
            {
              "index": 365,
              "actual": 27.5,
              "predicted": 11.116649885440317,
              "residual": 16.383350114559683,
              "abs_error": 16.383350114559683,
              "pct_error": 59.57581859839885,
              "rank": 3
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 37.31795502772605,
              "residual": 12.68204497227395,
              "abs_error": 12.68204497227395,
              "pct_error": 25.364089944547903,
              "rank": 4
            },
            {
              "index": 375,
              "actual": 15.0,
              "predicted": 27.624309565708973,
              "residual": -12.624309565708973,
              "abs_error": 12.624309565708973,
              "pct_error": 84.16206377139316,
              "rank": 5
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 36.666424062044,
              "residual": 11.833575937955999,
              "abs_error": 11.833575937955999,
              "pct_error": 24.3991256452701,
              "rank": 6
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 38.2438306032888,
              "residual": 11.7561693967112,
              "abs_error": 11.7561693967112,
              "pct_error": 23.5123387934224,
              "rank": 7
            },
            {
              "index": 436,
              "actual": 9.6,
              "predicted": 20.052227036966364,
              "residual": -10.452227036966365,
              "abs_error": 10.452227036966365,
              "pct_error": 108.87736496839963,
              "rank": 8
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -2.53419257240159,
              "residual": 9.53419257240159,
              "abs_error": 9.53419257240159,
              "pct_error": 136.20275103430842,
              "rank": 9
            },
            {
              "index": 209,
              "actual": 20.0,
              "predicted": 10.759918951394386,
              "residual": 9.240081048605614,
              "abs_error": 9.240081048605614,
              "pct_error": 46.20040524302807,
              "rank": 10
            }
          ]
        },
        {
          "k": 3,
          "features": [
            "RM",
            "PTRATIO",
            "LSTAT"
          ],
          "rmse": 5.207202455789535,
          "mae": 3.332538078324095,
          "mse": 27.114957415580562,
          "r2": 0.6302528487272829,
          "adj_r2": 0.6189340583821997,
          "cv_rmse": 5.335324974716854,
          "cv_r2": 0.6677558712662521,
          "f_stat": 291.91356322846076,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 14.5880992615711,
              "stderr": 4.299550720314552,
              "tstat": 3.392935729922927,
              "pvalue": 0.0007604665622398254,
              "ci_lower": 6.135559430163903,
              "ci_upper": 23.040639092978296,
              "vif": null
            },
            {
              "feature": "RM",
              "coef": 4.933118359418622,
              "stderr": 0.4724469666746465,
              "tstat": 10.441634103697918,
              "pvalue": 0.0,
              "ci_lower": 4.00432903611165,
              "ci_upper": 5.861907682725595,
              "vif": 1.6457016960613688
            },
            {
              "feature": "PTRATIO",
              "coef": -0.8670947546233032,
              "stderr": 0.12742295107200285,
              "tstat": -6.804855383810207,
              "pvalue": 3.708500173615903e-11,
              "ci_lower": -1.1175971069464685,
              "ci_upper": -0.616592402300138,
              "vif": 1.1814032369705776
            },
            {
              "feature": "LSTAT",
              "coef": -0.5671258827383845,
              "stderr": 0.04747167069939101,
              "tstat": -11.946617306343503,
              "pvalue": 0.0,
              "ci_lower": -0.6604510261200383,
              "ci_upper": -0.47380073935673067,
              "vif": 1.6689911381361469
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 22.33233927782973,
              "residual": 27.66766072217027,
              "abs_error": 27.66766072217027,
              "pct_error": 55.33532144434054,
              "rank": 1
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": 0.4111403958514859,
              "residual": 17.488859604148512,
              "abs_error": 17.488859604148512,
              "pct_error": 97.7031262801593,
              "rank": 2
            },
            {
              "index": 365,
              "actual": 27.5,
              "predicted": 10.601683410972793,
              "residual": 16.898316589027207,
              "abs_error": 16.898316589027207,
              "pct_error": 61.44842396009893,
              "rank": 3
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 39.26587800368418,
              "residual": 10.734121996315821,
              "abs_error": 10.734121996315821,
              "pct_error": 21.468243992631642,
              "rank": 4
            },
            {
              "index": 375,
              "actual": 15.0,
              "predicted": 25.526507916604867,
              "residual": -10.526507916604867,
              "abs_error": 10.526507916604867,
              "pct_error": 70.17671944403244,
              "rank": 5
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 39.84115672589121,
              "residual": 10.15884327410879,
              "abs_error": 10.15884327410879,
              "pct_error": 20.31768654821758,
              "rank": 6
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 38.42083523188974,
              "residual": 10.07916476811026,
              "abs_error": 10.07916476811026,
              "pct_error": 20.781783027031466,
              "rank": 7
            },
            {
              "index": 436,
              "actual": 9.6,
              "predicted": 18.709040754956256,
              "residual": -9.109040754956256,
              "abs_error": 9.109040754956256,
              "pct_error": 94.885841197461,
              "rank": 8
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -1.606768059272327,
              "residual": 8.606768059272326,
              "abs_error": 8.606768059272326,
              "pct_error": 122.9538294181761,
              "rank": 9
            },
            {
              "index": 209,
              "actual": 20.0,
              "predicted": 11.727784705881481,
              "residual": 8.272215294118519,
              "abs_error": 8.272215294118519,
              "pct_error": 41.36107647059259,
              "rank": 10
            }
          ]
        },
        {
          "k": 4,
          "features": [
            "RM",
            "DIS",
            "PTRATIO",
            "LSTAT"
          ],
          "rmse": 5.175138547496567,
          "mae": 3.339626156735154,
          "mse": 26.78205898578487,
          "r2": 0.6347923449246617,
          "adj_r2": 0.6197322354370189,
          "cv_rmse": 5.223715617961391,
          "cv_r2": 0.6813858371869637,
          "f_stat": 232.30795592710797,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 20.838622152196933,
              "stderr": 4.471401153626403,
              "tstat": 4.660423307198988,
              "pvalue": 4.308084175619342e-06,
              "ci_lower": 12.048172573270993,
              "ci_upper": 29.629071731122874,
              "vif": null
            },
            {
              "feature": "RM",
              "coef": 4.6131583675066095,
              "stderr": 0.4693070266585969,
              "tstat": 9.829723625388008,
              "pvalue": 0.0,
              "ci_lower": 3.690534873631039,
              "ci_upper": 5.53578186138218,
              "vif": 1.69071565556536
            },
            {
              "feature": "DIS",
              "coef": -0.5862708091746119,
              "stderr": 0.1403130197306041,
              "tstat": -4.178306548460226,
              "pvalue": 3.610730965886155e-05,
              "ci_lower": -0.8621160046360816,
              "ci_upper": -0.3104256137131423,
              "vif": 1.363847628579322
            },
            {
              "feature": "PTRATIO",
              "coef": -0.9067126479593406,
              "stderr": 0.12523916930320195,
              "tstat": -7.239848786957412,
              "pvalue": 2.3279156380340282e-12,
              "ci_lower": -1.1529237494109528,
              "ci_upper": -0.6605015465077284,
              "vif": 1.1882140109813926
            },
            {
              "feature": "LSTAT",
              "coef": -0.6691799762470734,
              "stderr": 0.052545868190363575,
              "tstat": -12.73515881063689,
              "pvalue": 0.0,
              "ci_lower": -0.7724813328103661,
              "ci_upper": -0.5658786196837806,
              "vif": 2.128989973046088
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 24.135724699198693,
              "residual": 25.864275300801307,
              "abs_error": 25.864275300801307,
              "pct_error": 51.72855060160262,
              "rank": 1
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": -0.03799840574949798,
              "residual": 17.937998405749497,
              "abs_error": 17.937998405749497,
              "pct_error": 100.2122815963659,
              "rank": 2
            },
            {
              "index": 365,
              "actual": 27.5,
              "predicted": 13.240150109869642,
              "residual": 14.259849890130358,
              "abs_error": 14.259849890130358,
              "pct_error": 51.85399960047403,
              "rank": 3
            },
            {
              "index": 375,
              "actual": 15.0,
              "predicted": 26.493566658116883,
              "residual": -11.493566658116883,
              "abs_error": 11.493566658116883,
              "pct_error": 76.62377772077922,
              "rank": 4
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 38.81162559770129,
              "residual": 11.188374402298713,
              "abs_error": 11.188374402298713,
              "pct_error": 22.376748804597426,
              "rank": 5
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 39.644288218795495,
              "residual": 10.355711781204505,
              "abs_error": 10.355711781204505,
              "pct_error": 20.71142356240901,
              "rank": 6
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 38.18696917636702,
              "residual": 10.313030823632978,
              "abs_error": 10.313030823632978,
              "pct_error": 21.263981079655625,
              "rank": 7
            },
            {
              "index": 436,
              "actual": 9.6,
              "predicted": 19.075878382165705,
              "residual": -9.475878382165705,
              "abs_error": 9.475878382165705,
              "pct_error": 98.70706648089276,
              "rank": 8
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -2.3485404512094874,
              "residual": 9.348540451209487,
              "abs_error": 9.348540451209487,
              "pct_error": 133.55057787442124,
              "rank": 9
            },
            {
              "index": 209,
              "actual": 20.0,
              "predicted": 10.903320179011976,
              "residual": 9.096679820988024,
              "abs_error": 9.096679820988024,
              "pct_error": 45.48339910494012,
              "rank": 10
            }
          ]
        },
        {
          "k": 5,
          "features": [
            "RM",
            "DIS",
            "PTRATIO",
            "B",
            "LSTAT"
          ],
          "rmse": 5.374532960326969,
          "mae": 3.4317494502126653,
          "mse": 28.885604541640976,
          "r2": 0.6061078087504225,
          "adj_r2": 0.5855925904561736,
          "cv_rmse": 5.072134413401203,
          "cv_r2": 0.7000689352393176,
          "f_stat": 203.46434873280924,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 12.272211715357196,
              "stderr": 4.633020271027082,
              "tstat": 2.64885776393044,
              "pvalue": 0.008397879241271777,
              "ci_lower": 3.163961076705405,
              "ci_upper": 21.380462354008987,
              "vif": null
            },
            {
              "feature": "RM",
              "coef": 4.897431094273681,
              "stderr": 0.45789903816125954,
              "tstat": 10.695438701814743,
              "pvalue": 0.0,
              "ci_lower": 3.9972279950444713,
              "ci_upper": 5.797634193502891,
              "vif": 1.7150517168821258
            },
            {
              "feature": "DIS",
              "coef": -0.6773433109041578,
              "stderr": 0.13704615234493953,
              "tstat": -4.942446754720355,
              "pvalue": 1.138859637261902e-06,
              "ci_lower": -0.9467681421371635,
              "ci_upper": -0.407918479671152,
              "vif": 1.3863883537105328
            },
            {
              "feature": "PTRATIO",
              "coef": -0.8609434766096729,
              "stderr": 0.12164220967982554,
              "tstat": -7.077670480302538,
              "pvalue": 6.6631145045903395e-12,
              "ci_lower": -1.1000850450012285,
              "ci_upper": -0.6218019082181173,
              "vif": 1.1944396487942048
            },
            {
              "feature": "B",
              "coef": 0.0153191650020581,
              "stderr": 0.0029393829120325536,
              "tstat": 5.211694243491758,
              "pvalue": 3.0116311022787556e-07,
              "ci_lower": 0.009540507728920913,
              "ci_upper": 0.021097822275195285,
              "vif": 1.1772749170482628
            },
            {
              "feature": "LSTAT",
              "coef": -0.6032353151453693,
              "stderr": 0.052452582034401375,
              "tstat": -11.500583798710489,
              "pvalue": 0.0,
              "ci_lower": -0.7063540661686323,
              "ci_upper": -0.5001165641221064,
              "vif": 2.2605364413626257
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 24.39198281723716,
              "residual": 25.60801718276284,
              "abs_error": 25.60801718276284,
              "pct_error": 51.21603436552567,
              "rank": 1
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": -3.7982181998106554,
              "residual": 21.698218199810654,
              "abs_error": 21.698218199810654,
              "pct_error": 121.21909608832769,
              "rank": 2
            },
            {
              "index": 365,
              "actual": 27.5,
              "predicted": 12.366887767794775,
              "residual": 15.133112232205225,
              "abs_error": 15.133112232205225,
              "pct_error": 55.02949902620081,
              "rank": 3
            },
            {
              "index": 375,
              "actual": 15.0,
              "predicted": 27.777174033885185,
              "residual": -12.777174033885185,
              "abs_error": 12.777174033885185,
              "pct_error": 85.18116022590124,
              "rank": 4
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -5.065945334620791,
              "residual": 12.06594533462079,
              "abs_error": 12.06594533462079,
              "pct_error": 172.37064763743987,
              "rank": 5
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 38.863655095051726,
              "residual": 11.136344904948274,
              "abs_error": 11.136344904948274,
              "pct_error": 22.272689809896548,
              "rank": 6
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 39.74124313931742,
              "residual": 10.258756860682581,
              "abs_error": 10.258756860682581,
              "pct_error": 20.517513721365162,
              "rank": 7
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 38.32796100612327,
              "residual": 10.172038993876733,
              "abs_error": 10.172038993876733,
              "pct_error": 20.9732762760345,
              "rank": 8
            },
            {
              "index": 381,
              "actual": 10.9,
              "predicted": 19.26979618798993,
              "residual": -8.369796187989929,
              "abs_error": 8.369796187989929,
              "pct_error": 76.78712099073329,
              "rank": 9
            },
            {
              "index": 209,
              "actual": 20.0,
              "predicted": 11.957302651072503,
              "residual": 8.042697348927497,
              "abs_error": 8.042697348927497,
              "pct_error": 40.213486744637486,
              "rank": 10
            }
          ]
        },
        {
          "k": 6,
          "features": [
            "NOX",
            "RM",
            "DIS",
            "PTRATIO",
            "B",
            "LSTAT"
          ],
          "rmse": 5.228983954832566,
          "mae": 3.412903400878953,
          "mse": 27.342273199896425,
          "r2": 0.6271531070458958,
          "adj_r2": 0.6036048822277418,
          "cv_rmse": 4.983765987569998,
          "cv_r2": 0.7098780912174594,
          "f_stat": 179.49868984236664,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 24.728242203878892,
              "stderr": 5.429279485028764,
              "tstat": 4.554608447044771,
              "pvalue": 6.992435328090352e-06,
              "ci_lower": 14.054509871779105,
              "ci_upper": 35.40197453597868,
              "vif": null
            },
            {
              "feature": "NOX",
              "coef": -15.117125542977098,
              "stderr": 3.6138294703023184,
              "tstat": -4.18313195661456,
              "pvalue": 3.54166939395828e-05,
              "ci_lower": -22.221760433523084,
              "ci_upper": -8.012490652431111,
              "vif": 3.0623390065291236
            },
            {
              "feature": "RM",
              "coef": 4.799560033026468,
              "stderr": 0.4493030376059647,
              "tstat": 10.68223366260801,
              "pvalue": 0.0,
              "ci_lower": 3.9162493888369982,
              "ci_upper": 5.682870677215938,
              "vif": 1.7197149079725438
            },
            {
              "feature": "DIS",
              "coef": -1.2002769242526732,
              "stderr": 0.18347093879277002,
              "tstat": -6.542054737117703,
              "pvalue": 1.873547983421986e-10,
              "ci_lower": -1.5609729791883522,
              "ci_upper": -0.8395808693169942,
              "vif": 2.5877705284958292
            },
            {
              "feature": "PTRATIO",
              "coef": -0.9413969151990391,
              "stderr": 0.1207383934739779,
              "tstat": -7.796997194615923,
              "pvalue": 5.639932965095795e-14,
              "ci_lower": -1.178763456689978,
              "ci_upper": -0.7040303737081002,
              "vif": 1.2255368776967586
            },
            {
              "feature": "B",
              "coef": 0.013168586736474808,
              "stderr": 0.0029258118445337337,
              "tstat": 4.500831713111543,
              "pvalue": 8.905854915752798e-06,
              "ci_lower": 0.007416565207880618,
              "ci_upper": 0.018920608265068996,
              "vif": 1.2147819685692187
            },
            {
              "feature": "LSTAT",
              "coef": -0.5385375665699662,
              "stderr": 0.053674669343043505,
              "tstat": -10.03336533156982,
              "pvalue": 0.0,
              "ci_lower": -0.6440596814585817,
              "ci_upper": -0.4330154516813507,
              "vif": 2.465224715578532
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 24.293354736536955,
              "residual": 25.706645263463045,
              "abs_error": 25.706645263463045,
              "pct_error": 51.41329052692609,
              "rank": 1
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": -1.09605846291538,
              "residual": 18.99605846291538,
              "abs_error": 18.99605846291538,
              "pct_error": 106.12323163639876,
              "rank": 2
            },
            {
              "index": 365,
              "actual": 27.5,
              "predicted": 10.849385161853041,
              "residual": 16.650614838146957,
              "abs_error": 16.650614838146957,
              "pct_error": 60.547690320534386,
              "rank": 3
            },
            {
              "index": 375,
              "actual": 15.0,
              "predicted": 27.07635846465595,
              "residual": -12.07635846465595,
              "abs_error": 12.07635846465595,
              "pct_error": 80.50905643103967,
              "rank": 4
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -3.817958951502714,
              "residual": 10.817958951502714,
              "abs_error": 10.817958951502714,
              "pct_error": 154.54227073575305,
              "rank": 5
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 39.401586103418694,
              "residual": 10.598413896581306,
              "abs_error": 10.598413896581306,
              "pct_error": 21.196827793162612,
              "rank": 6
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 40.60812297723845,
              "residual": 9.391877022761548,
              "abs_error": 9.391877022761548,
              "pct_error": 18.783754045523096,
              "rank": 7
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 39.26792862277293,
              "residual": 9.232071377227072,
              "abs_error": 9.232071377227072,
              "pct_error": 19.035198715932108,
              "rank": 8
            },
            {
              "index": 381,
              "actual": 10.9,
              "predicted": 19.032333162766207,
              "residual": -8.132333162766207,
              "abs_error": 8.132333162766207,
              "pct_error": 74.60856112629547,
              "rank": 9
            },
            {
              "index": 0,
              "actual": 24.0,
              "predicted": 31.384525450355927,
              "residual": -7.384525450355927,
              "abs_error": 7.384525450355927,
              "pct_error": 30.768856043149697,
              "rank": 10
            }
          ]
        },
        {
          "k": 7,
          "features": [
            "CRIM",
            "NOX",
            "RM",
            "DIS",
            "PTRATIO",
            "B",
            "LSTAT"
          ],
          "rmse": 5.296185717159341,
          "mae": 3.454799395165566,
          "mse": 28.0495831506426,
          "r2": 0.6175080305168443,
          "adj_r2": 0.5890245859808647,
          "cv_rmse": 4.957822285036371,
          "cv_r2": 0.7139330947295572,
          "f_stat": 156.2770243167592,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 23.733608212584677,
              "stderr": 5.417417301960839,
              "tstat": 4.380982097132203,
              "pvalue": 1.514788295930991e-05,
              "ci_lower": 13.083114188281062,
              "ci_upper": 34.384102236888296,
              "vif": null
            },
            {
              "feature": "CRIM",
              "coef": -0.0734567306115738,
              "stderr": 0.031922268061649696,
              "tstat": -2.301112517121619,
              "pvalue": 0.02190393760968168,
              "ci_lower": -0.13621503522099707,
              "ci_upper": -0.01069842600215054,
              "vif": 1.3732047054506762
            },
            {
              "feature": "NOX",
              "coef": -14.411559957631383,
              "stderr": 3.607491974701082,
              "tstat": -3.994897302252635,
              "pvalue": 7.717258198325361e-05,
              "ci_lower": -21.503790365167166,
              "ci_upper": -7.3193295500956,
              "vif": 3.0846228652127636
            },
            {
              "feature": "RM",
              "coef": 4.854897104977769,
              "stderr": 0.44753865349386973,
              "tstat": 10.847995066071471,
              "pvalue": 0.0,
              "ci_lower": 3.9750483709775093,
              "ci_upper": 5.734745838978029,
              "vif": 1.724694660476373
            },
            {
              "feature": "DIS",
              "coef": -1.2263414338636625,
              "stderr": 0.1828376320086919,
              "tstat": -6.707270381872827,
              "pvalue": 6.864464552336358e-11,
              "ci_lower": -1.5857952101901724,
              "ci_upper": -0.8668876575371525,
              "vif": 2.5977403635589735
            },
            {
              "feature": "PTRATIO",
              "coef": -0.8941195452399404,
              "stderr": 0.12183532714198499,
              "tstat": -7.338754417246711,
              "pvalue": 1.2327916465437738e-12,
              "ci_lower": -1.1336444611450005,
              "ci_upper": -0.6545946293348803,
              "vif": 1.2614075797466893
            },
            {
              "feature": "B",
              "coef": 0.01179797099377801,
              "stderr": 0.0029704426023051786,
              "tstat": 3.9717889127439547,
              "pvalue": 8.473734562164381e-05,
              "ci_lower": 0.005958162202615243,
              "ci_upper": 0.017637779784940775,
              "vif": 1.2656722252955361
            },
            {
              "feature": "LSTAT",
              "coef": -0.5193403002073064,
              "stderr": 0.054034560301796694,
              "tstat": -9.611261705594703,
              "pvalue": 0.0,
              "ci_lower": -0.6255707656713307,
              "ci_upper": -0.413109834743282,
              "vif": 2.525424397997115
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 24.01536314405524,
              "residual": 25.98463685594476,
              "abs_error": 25.98463685594476,
              "pct_error": 51.96927371188952,
              "rank": 1
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": -1.2603131409602426,
              "residual": 19.16031314096024,
              "abs_error": 19.16031314096024,
              "pct_error": 107.04085553609075,
              "rank": 2
            },
            {
              "index": 365,
              "actual": 27.5,
              "predicted": 10.787225997601212,
              "residual": 16.71277400239879,
              "abs_error": 16.71277400239879,
              "pct_error": 60.773723645086505,
              "rank": 3
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -5.9332133464143695,
              "residual": 12.93321334641437,
              "abs_error": 12.93321334641437,
              "pct_error": 184.76019066306242,
              "rank": 4
            },
            {
              "index": 375,
              "actual": 15.0,
              "predicted": 26.154126642883792,
              "residual": -11.154126642883792,
              "abs_error": 11.154126642883792,
              "pct_error": 74.36084428589194,
              "rank": 5
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 39.18971518148517,
              "residual": 10.81028481851483,
              "abs_error": 10.81028481851483,
              "pct_error": 21.62056963702966,
              "rank": 6
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 40.431750443369275,
              "residual": 9.568249556630725,
              "abs_error": 9.568249556630725,
              "pct_error": 19.13649911326145,
              "rank": 7
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 39.09523447796515,
              "residual": 9.40476552203485,
              "abs_error": 9.40476552203485,
              "pct_error": 19.391269117597627,
              "rank": 8
            },
            {
              "index": 381,
              "actual": 10.9,
              "predicted": 18.48331994756115,
              "residual": -7.583319947561149,
              "abs_error": 7.583319947561149,
              "pct_error": 69.57174263817568,
              "rank": 9
            },
            {
              "index": 0,
              "actual": 24.0,
              "predicted": 31.301207659795,
              "residual": -7.301207659795001,
              "abs_error": 7.301207659795001,
              "pct_error": 30.421698582479166,
              "rank": 10
            }
          ]
        },
        {
          "k": 8,
          "features": [
            "CRIM",
            "NOX",
            "RM",
            "DIS",
            "RAD",
            "PTRATIO",
            "B",
            "LSTAT"
          ],
          "rmse": 5.183312248055207,
          "mae": 3.400709310997486,
          "mse": 26.866725860839125,
          "r2": 0.6336378037104283,
          "adj_r2": 0.6021227760726158,
          "cv_rmse": 4.9386670552375955,
          "cv_r2": 0.7166113245340815,
          "f_stat": 139.92473661237366,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 28.82058652813664,
              "stderr": 5.685455063773439,
              "tstat": 5.069178492285612,
              "pvalue": 6.152152920435583e-07,
              "ci_lower": 17.643050859687598,
              "ci_upper": 39.99812219658568,
              "vif": null
            },
            {
              "feature": "CRIM",
              "coef": -0.11532310701797917,
              "stderr": 0.03516044491541225,
              "tstat": -3.2799103451455007,
              "pvalue": 0.0011305540240706957,
              "ci_lower": -0.1844481150872047,
              "ci_upper": -0.04619809894875361,
              "vif": 1.6932769062276005
            },
            {
              "feature": "NOX",
              "coef": -18.322171932027672,
              "stderr": 3.8526188440758364,
              "tstat": -4.755770729876804,
              "pvalue": 2.7754670255397684e-06,
              "ci_lower": -25.896373832062707,
              "ci_upper": -10.747970031992638,
              "vif": 3.575813619918011
            },
            {
              "feature": "RM",
              "coef": 4.647832955631089,
              "stderr": 0.4503023380159602,
              "tstat": 10.321582997124821,
              "pvalue": 0.0,
              "ci_lower": 3.762544023030009,
              "ci_upper": 5.533121888232169,
              "vif": 1.7747246426597798
            },
            {
              "feature": "DIS",
              "coef": -1.264008623172002,
              "stderr": 0.18187590021826633,
              "tstat": -6.9498411920165655,
              "pvalue": 1.518030146030469e-11,
              "ci_lower": -1.621574436131167,
              "ci_upper": -0.906442810212837,
              "vif": 2.612680700846697
            },
            {
              "feature": "RAD",
              "coef": 0.12586479371839251,
              "stderr": 0.045957166250744155,
              "tstat": 2.738741397406209,
              "pvalue": 0.006446724194699716,
              "ci_lower": 0.035513562510595315,
              "ci_upper": 0.21621602492618971,
              "vif": 2.7098262661137107
            },
            {
              "feature": "PTRATIO",
              "coef": -1.0539509704632801,
              "stderr": 0.13420108712760231,
              "tstat": -7.853520362775845,
              "pvalue": 3.863576125695545e-14,
              "ci_lower": -1.3177886793691767,
              "ci_upper": -0.7901132615573835,
              "vif": 1.555580518457176
            },
            {
              "feature": "B",
              "coef": 0.013271337228413616,
              "stderr": 0.002995068642798135,
              "tstat": 4.431062793944817,
              "pvalue": 1.2161339302707574e-05,
              "ci_lower": 0.00738306861863405,
              "ci_upper": 0.01915960583819318,
              "vif": 1.3078680764401407
            },
            {
              "feature": "LSTAT",
              "coef": -0.5260172207660601,
              "stderr": 0.053651852821968854,
              "tstat": -9.804269435233213,
              "pvalue": 0.0,
              "ci_lower": -0.6314961124060754,
              "ci_upper": -0.42053832912604466,
              "vif": 2.530649718725036
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 25.185077147123806,
              "residual": 24.814922852876194,
              "abs_error": 24.814922852876194,
              "pct_error": 49.62984570575239,
              "rank": 1
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": -0.7072497953256693,
              "residual": 18.607249795325668,
              "abs_error": 18.607249795325668,
              "pct_error": 103.95111617500375,
              "rank": 2
            },
            {
              "index": 365,
              "actual": 27.5,
              "predicted": 12.344750590419128,
              "residual": 15.155249409580872,
              "abs_error": 15.155249409580872,
              "pct_error": 55.109997853021355,
              "rank": 3
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -6.7943934200543055,
              "residual": 13.794393420054305,
              "abs_error": 13.794393420054305,
              "pct_error": 197.06276314363294,
              "rank": 4
            },
            {
              "index": 375,
              "actual": 15.0,
              "predicted": 26.519482422513345,
              "residual": -11.519482422513345,
              "abs_error": 11.519482422513345,
              "pct_error": 76.79654948342231,
              "rank": 5
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 39.54534890926777,
              "residual": 10.454651090732227,
              "abs_error": 10.454651090732227,
              "pct_error": 20.909302181464454,
              "rank": 6
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 40.74447884595985,
              "residual": 9.255521154040153,
              "abs_error": 9.255521154040153,
              "pct_error": 18.511042308080306,
              "rank": 7
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 39.4418891478612,
              "residual": 9.058110852138803,
              "abs_error": 9.058110852138803,
              "pct_error": 18.67651722090475,
              "rank": 8
            },
            {
              "index": 381,
              "actual": 10.9,
              "predicted": 19.10540500407442,
              "residual": -8.20540500407442,
              "abs_error": 8.20540500407442,
              "pct_error": 75.27894499150844,
              "rank": 9
            },
            {
              "index": 395,
              "actual": 13.1,
              "predicted": 20.94053545418513,
              "residual": -7.840535454185131,
              "abs_error": 7.840535454185131,
              "pct_error": 59.85141568080253,
              "rank": 10
            }
          ]
        },
        {
          "k": 9,
          "features": [
            "CRIM",
            "NOX",
            "RM",
            "DIS",
            "RAD",
            "TAX",
            "PTRATIO",
            "B",
            "LSTAT"
          ],
          "rmse": 5.076343986769116,
          "mae": 3.3021802034000673,
          "mse": 25.769268272006965,
          "r2": 0.6486030426703888,
          "adj_r2": 0.6142272533664052,
          "cv_rmse": 4.921139231137759,
          "cv_r2": 0.7185837298807873,
          "f_stat": 126.20255457643273,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 30.736233851553138,
              "stderr": 5.720927173482533,
              "tstat": 5.372596594835326,
              "pvalue": 1.330529340037856e-07,
              "ci_lower": 19.488872713803193,
              "ci_upper": 41.983594989303086,
              "vif": null
            },
            {
              "feature": "CRIM",
              "coef": -0.11489080916303515,
              "stderr": 0.03498326739478256,
              "tstat": -3.2841646226610064,
              "pvalue": 0.0011143129870765378,
              "ci_lower": -0.18366802485481842,
              "ci_upper": -0.04611359347125189,
              "vif": 1.6933283811136404
            },
            {
              "feature": "NOX",
              "coef": -16.487315442917332,
              "stderr": 3.919595330102058,
              "tstat": -4.206382050794013,
              "pvalue": 3.215477708207182e-05,
              "ci_lower": -24.193252409889745,
              "ci_upper": -8.78137847594492,
              "vif": 3.738922257696352
            },
            {
              "feature": "RM",
              "coef": 4.519828425818677,
              "stderr": 0.4516519387435119,
              "tstat": 10.007326523146924,
              "pvalue": 0.0,
              "ci_lower": 3.631879268353545,
              "ci_upper": 5.407777583283809,
              "vif": 1.8035638437010204
            },
            {
              "feature": "DIS",
              "coef": -1.2618785348522277,
              "stderr": 0.18095915190815925,
              "tstat": -6.973278342355731,
              "pvalue": 1.3133716336710677e-11,
              "ci_lower": -1.6176448068170308,
              "ci_upper": -0.9061122628874245,
              "vif": 2.612752768639046
            },
            {
              "feature": "RAD",
              "coef": 0.2555112032880752,
              "stderr": 0.07373462495034816,
              "tstat": 3.465281113996752,
              "pvalue": 0.0005879160599719935,
              "ci_lower": 0.11054869458543834,
              "ci_upper": 0.400473711990712,
              "vif": 7.0465916045066495
            },
            {
              "feature": "TAX",
              "coef": -0.008543541087834006,
              "stderr": 0.003811907071076413,
              "tstat": -2.2412773786275606,
              "pvalue": 0.02556432717885171,
              "ci_lower": -0.016037762592814322,
              "ci_upper": -0.001049319582853688,
              "vif": 7.048257367107363
            },
            {
              "feature": "PTRATIO",
              "coef": -1.0411438258766181,
              "stderr": 0.1336450192681186,
              "tstat": -7.7903675840539615,
              "pvalue": 5.995204332975845e-14,
              "ci_lower": -1.30389036160206,
              "ci_upper": -0.7783972901511762,
              "vif": 1.5584295353475521
            },
            {
              "feature": "B",
              "coef": 0.012839633476147999,
              "stderr": 0.002986149435520832,
              "tstat": 4.299729050200249,
              "pvalue": 2.158347230629687e-05,
              "ci_lower": 0.006968854126208161,
              "ci_upper": 0.018710412826087836,
              "vif": 1.3133323445072724
            },
            {
              "feature": "LSTAT",
              "coef": -0.5244026431772718,
              "stderr": 0.05338554423601345,
              "tstat": -9.822933355496525,
              "pvalue": 0.0,
              "ci_lower": -0.6293587940510217,
              "ci_upper": -0.41944649230352193,
              "vif": 2.5311106014162896
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 25.006862528950425,
              "residual": 24.993137471049575,
              "abs_error": 24.993137471049575,
              "pct_error": 49.98627494209915,
              "rank": 1
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": -0.5538721461682599,
              "residual": 18.45387214616826,
              "abs_error": 18.45387214616826,
              "pct_error": 103.09425779982269,
              "rank": 2
            },
            {
              "index": 365,
              "actual": 27.5,
              "predicted": 12.66599675098978,
              "residual": 14.83400324901022,
              "abs_error": 14.83400324901022,
              "pct_error": 53.941829996400806,
              "rank": 3
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -6.4605145917063105,
              "residual": 13.46051459170631,
              "abs_error": 13.46051459170631,
              "pct_error": 192.29306559580442,
              "rank": 4
            },
            {
              "index": 375,
              "actual": 15.0,
              "predicted": 26.272078620072005,
              "residual": -11.272078620072005,
              "abs_error": 11.272078620072005,
              "pct_error": 75.14719080048003,
              "rank": 5
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 39.59831782782689,
              "residual": 10.40168217217311,
              "abs_error": 10.40168217217311,
              "pct_error": 20.80336434434622,
              "rank": 6
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 41.03527758190296,
              "residual": 8.96472241809704,
              "abs_error": 8.96472241809704,
              "pct_error": 17.92944483619408,
              "rank": 7
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 39.75640205028118,
              "residual": 8.743597949718819,
              "abs_error": 8.743597949718819,
              "pct_error": 18.028037009729523,
              "rank": 8
            },
            {
              "index": 381,
              "actual": 10.9,
              "predicted": 18.967461745428587,
              "residual": -8.067461745428586,
              "abs_error": 8.067461745428586,
              "pct_error": 74.01341050851914,
              "rank": 9
            },
            {
              "index": 395,
              "actual": 13.1,
              "predicted": 20.845507255211977,
              "residual": -7.745507255211978,
              "abs_error": 7.745507255211978,
              "pct_error": 59.12600958177082,
              "rank": 10
            }
          ]
        },
        {
          "k": 10,
          "features": [
            "CRIM",
            "ZN",
            "NOX",
            "RM",
            "DIS",
            "RAD",
            "TAX",
            "PTRATIO",
            "B",
            "LSTAT"
          ],
          "rmse": 4.939218460752907,
          "mae": 3.185480705738659,
          "mse": 24.39587900304232,
          "r2": 0.6673309632791229,
          "adj_r2": 0.6307739262768287,
          "cv_rmse": 4.9045390341389234,
          "cv_r2": 0.7198745630137227,
          "f_stat": 114.74218038731583,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 30.113268834391757,
              "stderr": 5.7103301335589585,
              "tstat": 5.2734724840897576,
              "pvalue": 2.215075394218502e-07,
              "ci_lower": 18.88665349453921,
              "ci_upper": 41.339884174244304,
              "vif": null
            },
            {
              "feature": "CRIM",
              "coef": -0.12033588688158242,
              "stderr": 0.03497653389963993,
              "tstat": -3.440474897451781,
              "pvalue": 0.0006429516795414258,
              "ci_lower": -0.1891004036132692,
              "ci_upper": -0.05157137014989563,
              "vif": 1.7044036718921023
            },
            {
              "feature": "ZN",
              "coef": 0.030759701989789324,
              "stderr": 0.01592744625750653,
              "tstat": 1.9312387869645091,
              "pvalue": 0.054172345332294425,
              "ci_lower": -0.0005539538404307522,
              "ci_upper": 0.0620733578200094,
              "vif": 2.4052701581497473
            },
            {
              "feature": "NOX",
              "coef": -15.465076002360268,
              "stderr": 3.941788806758621,
              "tstat": -3.9233649392488332,
              "pvalue": 0.00010305722032577513,
              "ci_lower": -23.214706172487542,
              "ci_upper": -7.715445832232995,
              "vif": 3.807580986998369
            },
            {
              "feature": "RM",
              "coef": 4.413803806935584,
              "stderr": 0.4534312735990183,
              "tstat": 9.734228898465506,
              "pvalue": 0.0,
              "ci_lower": 3.522349482458031,
              "ci_upper": 5.305258131413137,
              "vif": 1.830396503601566
            },
            {
              "feature": "DIS",
              "coef": -1.4754052171018253,
              "stderr": 0.21153118150629777,
              "tstat": -6.974882882965881,
              "pvalue": 1.3045342583950514e-11,
              "ci_lower": -1.891279457576895,
              "ci_upper": -1.0595309766267555,
              "vif": 3.5948806487160465
            },
            {
              "feature": "RAD",
              "coef": 0.27161598867338305,
              "stderr": 0.07395219928536116,
              "tstat": 3.6728588371698287,
              "pvalue": 0.00027305757597373415,
              "ci_lower": 0.12622458826490504,
              "ci_upper": 0.4170073890818611,
              "vif": 7.137347021731836
            },
            {
              "feature": "TAX",
              "coef": -0.0104732543521691,
              "stderr": 0.003927986612499509,
              "tstat": -2.6663162035332446,
              "pvalue": 0.007985334476276806,
              "ci_lower": -0.01819574915145637,
              "ci_upper": -0.0027507595528818317,
              "vif": 7.535908494065836
            },
            {
              "feature": "PTRATIO",
              "coef": -0.9375079090176047,
              "stderr": 0.14358902652866534,
              "tstat": -6.52910554296742,
              "pvalue": 2.0474422157690242e-10,
              "ci_lower": -1.219806608069619,
              "ci_upper": -0.6552092099655904,
              "vif": 1.811434314924644
            },
            {
              "feature": "B",
              "coef": 0.012756683868017468,
              "stderr": 0.0029761686108826613,
              "tstat": 4.2862772698332225,
              "pvalue": 2.288280271445231e-05,
              "ci_lower": 0.00690548097791438,
              "ci_upper": 0.018607886758120556,
              "vif": 1.313605938631551
            },
            {
              "feature": "LSTAT",
              "coef": -0.5275509731334427,
              "stderr": 0.053226539428397224,
              "tstat": -9.91142724661122,
              "pvalue": 0.0,
              "ci_lower": -0.632195340456858,
              "ci_upper": -0.42290660581002737,
              "vif": 2.533487172346233
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 25.204372684817287,
              "residual": 24.795627315182713,
              "abs_error": 24.795627315182713,
              "pct_error": 49.59125463036543,
              "rank": 1
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": -0.407293506078652,
              "residual": 18.30729350607865,
              "abs_error": 18.30729350607865,
              "pct_error": 102.2753827155232,
              "rank": 2
            },
            {
              "index": 365,
              "actual": 27.5,
              "predicted": 13.173110674735483,
              "residual": 14.326889325264517,
              "abs_error": 14.326889325264517,
              "pct_error": 52.09777936459824,
              "rank": 3
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -6.386329811557655,
              "residual": 13.386329811557655,
              "abs_error": 13.386329811557655,
              "pct_error": 191.2332830222522,
              "rank": 4
            },
            {
              "index": 375,
              "actual": 15.0,
              "predicted": 26.291375065970797,
              "residual": -11.291375065970797,
              "abs_error": 11.291375065970797,
              "pct_error": 75.27583377313864,
              "rank": 5
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 40.84905852943992,
              "residual": 9.150941470560078,
              "abs_error": 9.150941470560078,
              "pct_error": 18.301882941120155,
              "rank": 6
            },
            {
              "index": 381,
              "actual": 10.9,
              "predicted": 19.02114302569144,
              "residual": -8.12114302569144,
              "abs_error": 8.12114302569144,
              "pct_error": 74.50589931827008,
              "rank": 7
            },
            {
              "index": 395,
              "actual": 13.1,
              "predicted": 20.937279824310504,
              "residual": -7.837279824310505,
              "abs_error": 7.837279824310505,
              "pct_error": 59.826563544355004,
              "rank": 8
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 42.929245533944304,
              "residual": 7.070754466055696,
              "abs_error": 7.070754466055696,
              "pct_error": 14.141508932111394,
              "rank": 9
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 41.666365803238435,
              "residual": 6.833634196761565,
              "abs_error": 6.833634196761565,
              "pct_error": 14.089967416003226,
              "rank": 10
            }
          ]
        },
        {
          "k": 11,
          "features": [
            "CRIM",
            "ZN",
            "INDUS",
            "NOX",
            "RM",
            "DIS",
            "RAD",
            "TAX",
            "PTRATIO",
            "B",
            "LSTAT"
          ],
          "rmse": 4.953214698824785,
          "mae": 3.2222114199033545,
          "mse": 24.534335852653903,
          "r2": 0.6654429269110974,
          "adj_r2": 0.6245526179780093,
          "cv_rmse": 4.9050629226995275,
          "cv_r2": 0.7196092396174705,
          "f_stat": 104.3252348730433,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 30.224648177185014,
              "stderr": 5.713279382269116,
              "tstat": 5.29024508603338,
              "pvalue": 2.0361075536712292e-07,
              "ci_lower": 18.992146046832048,
              "ci_upper": 41.45715030753798,
              "vif": null
            },
            {
              "feature": "CRIM",
              "coef": -0.11953492492872651,
              "stderr": 0.03499780553529944,
              "tstat": -3.4154977176543646,
              "pvalue": 0.0007031901006351315,
              "ci_lower": -0.18834180429348094,
              "ci_upper": -0.05072804556397209,
              "vif": 1.7055422062684618
            },
            {
              "feature": "ZN",
              "coef": 0.03247914282652299,
              "stderr": 0.016049632233405883,
              "tstat": 2.023668975973203,
              "pvalue": 0.04368219729671541,
              "ci_lower": 0.000925018445244577,
              "ci_upper": 0.0640332672078014,
              "vif": 2.4409768399136054
            },
            {
              "feature": "INDUS",
              "coef": 0.05982258483712695,
              "stderr": 0.06753609404415273,
              "tstat": 0.8857868623260481,
              "pvalue": 0.3762754377648605,
              "ci_lower": -0.07295567953078401,
              "ci_upper": 0.1926008492050379,
              "vif": 3.8329280436596482
            },
            {
              "feature": "NOX",
              "coef": -16.557407705071515,
              "stderr": 4.131215771244019,
              "tstat": -4.007877734279089,
              "pvalue": 7.333886989502325e-05,
              "ci_lower": -24.67951881615396,
              "ci_upper": -8.435296593989074,
              "vif": 4.180036987024228
            },
            {
              "feature": "RM",
              "coef": 4.464969298503103,
              "stderr": 0.45721898011696555,
              "tstat": 9.765494200089586,
              "pvalue": 0.0,
              "ci_lower": 3.56606118906598,
              "ci_upper": 5.363877407940226,
              "vif": 1.860084438623609
            },
            {
              "feature": "DIS",
              "coef": -1.4378540423468325,
              "stderr": 0.21579421755912997,
              "tstat": -6.66307957002066,
              "pvalue": 9.106693177329817e-11,
              "ci_lower": -1.862112834236699,
              "ci_upper": -1.0135952504569659,
              "vif": 3.7391872487625983
            },
            {
              "feature": "RAD",
              "coef": 0.2872635841893957,
              "stderr": 0.07605251915413483,
              "tstat": 3.777173818623965,
              "pvalue": 0.00018322562612227422,
              "ci_lower": 0.13774173758257935,
              "ci_upper": 0.436785430796212,
              "vif": 7.544383469607433
            },
            {
              "feature": "TAX",
              "coef": -0.011924283060484389,
              "stderr": 0.004256875555562424,
              "tstat": -2.80118197134117,
              "pvalue": 0.005343863207692756,
              "ci_lower": -0.020293445593458893,
              "ci_upper": -0.0035551205275098866,
              "vif": 8.84584751983283
            },
            {
              "feature": "PTRATIO",
              "coef": -0.9492846354375477,
              "stderr": 0.14424242424067793,
              "tstat": -6.581174993659315,
              "pvalue": 1.4990808594461669e-10,
              "ci_lower": -1.2328701612213757,
              "ci_upper": -0.6656991096537197,
              "vif": 1.8269557800417415
            },
            {
              "feature": "B",
              "coef": 0.012878188140276192,
              "stderr": 0.002980143033039652,
              "tstat": 4.321332230534199,
              "pvalue": 1.968428423437807e-05,
              "ci_lower": 0.0070191252925427515,
              "ci_upper": 0.018737250988009633,
              "vif": 1.3163948620494017
            },
            {
              "feature": "LSTAT",
              "coef": -0.530546188964014,
              "stderr": 0.05334840191159884,
              "tstat": -9.944931243547977,
              "pvalue": 0.0,
              "ci_lower": -0.6354309666947617,
              "ci_upper": -0.4256614112332662,
              "vif": 2.5437064910861227
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 25.265831685164517,
              "residual": 24.734168314835483,
              "abs_error": 24.734168314835483,
              "pct_error": 49.468336629670965,
              "rank": 1
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": -0.48321600466551473,
              "residual": 18.383216004665513,
              "abs_error": 18.383216004665513,
              "pct_error": 102.69953075232132,
              "rank": 2
            },
            {
              "index": 365,
              "actual": 27.5,
              "predicted": 13.022450517272883,
              "residual": 14.477549482727117,
              "abs_error": 14.477549482727117,
              "pct_error": 52.64563448264406,
              "rank": 3
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -6.547793053566188,
              "residual": 13.547793053566188,
              "abs_error": 13.547793053566188,
              "pct_error": 193.53990076523127,
              "rank": 4
            },
            {
              "index": 375,
              "actual": 15.0,
              "predicted": 26.371133259849888,
              "residual": -11.371133259849888,
              "abs_error": 11.371133259849888,
              "pct_error": 75.80755506566592,
              "rank": 5
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 40.84158895174991,
              "residual": 9.158411048250088,
              "abs_error": 9.158411048250088,
              "pct_error": 18.316822096500175,
              "rank": 6
            },
            {
              "index": 381,
              "actual": 10.9,
              "predicted": 19.043350453853584,
              "residual": -8.143350453853584,
              "abs_error": 8.143350453853584,
              "pct_error": 74.70963719131728,
              "rank": 7
            },
            {
              "index": 395,
              "actual": 13.1,
              "predicted": 20.944954274571597,
              "residual": -7.844954274571597,
              "abs_error": 7.844954274571597,
              "pct_error": 59.88514713413433,
              "rank": 8
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 43.1163129700346,
              "residual": 6.883687029965401,
              "abs_error": 6.883687029965401,
              "pct_error": 13.7673740599308,
              "rank": 9
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 41.841669711598634,
              "residual": 6.658330288401366,
              "abs_error": 6.658330288401366,
              "pct_error": 13.728516058559517,
              "rank": 10
            }
          ]
        },
        {
          "k": 12,
          "features": [
            "CRIM",
            "ZN",
            "INDUS",
            "NOX",
            "RM",
            "AGE",
            "DIS",
            "RAD",
            "TAX",
            "PTRATIO",
            "B",
            "LSTAT"
          ],
          "rmse": 4.963405499893624,
          "mae": 3.237242361814503,
          "mse": 24.63539415637428,
          "r2": 0.6640648675861143,
          "adj_r2": 0.6187702429909836,
          "cv_rmse": 4.907617088082697,
          "cv_r2": 0.7193435342641527,
          "f_stat": 95.42707811156261,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 30.10127986690421,
              "stderr": 5.7306902718857735,
              "tstat": 5.252644697023368,
              "pvalue": 2.468391644416812e-07,
              "ci_lower": 18.834458095839338,
              "ci_upper": 41.36810163796908,
              "vif": null
            },
            {
              "feature": "CRIM",
              "coef": -0.11918976453197799,
              "stderr": 0.03505117369185192,
              "tstat": -3.400450027146598,
              "pvalue": 0.0007420501710737604,
              "ci_lower": -0.18810211332705262,
              "ci_upper": -0.05027741573690335,
              "vif": 1.706911223815323
            },
            {
              "feature": "ZN",
              "coef": 0.031963983884564985,
              "stderr": 0.01613582074546638,
              "tstat": 1.9809332533361081,
              "pvalue": 0.04829903042752193,
              "ci_lower": 0.00024015868310335586,
              "ci_upper": 0.06368780908602661,
              "vif": 2.461730859635983
            },
            {
              "feature": "INDUS",
              "coef": 0.060571477923613656,
              "stderr": 0.06764624516302094,
              "tstat": 0.8954152263387603,
              "pvalue": 0.3711160591558247,
              "ci_lower": -0.07242440068329563,
              "ci_upper": 0.19356735653052293,
              "vif": 3.836817462212731
            },
            {
              "feature": "NOX",
              "coef": -16.199050177585256,
              "stderr": 4.262332082094671,
              "tstat": -3.8005133963246784,
              "pvalue": 0.00016741760910687908,
              "ci_lower": -24.579006800550644,
              "ci_upper": -7.819093554619867,
              "vif": 4.439600523245743
            },
            {
              "feature": "RM",
              "coef": 4.498770639599272,
              "stderr": 0.46794123996442183,
              "tstat": 9.613964864352026,
              "pvalue": 0.0,
              "ci_lower": 3.5787749148477164,
              "ci_upper": 5.4187663643508275,
              "vif": 1.943979862624545
            },
            {
              "feature": "AGE",
              "coef": -0.0051117663892234315,
              "stderr": 0.014701161336414678,
              "tstat": -0.3477117400624412,
              "pvalue": 0.7282437832190958,
              "ci_lower": -0.034014979919650225,
              "ci_upper": 0.023791447141203362,
              "vif": 2.98761889747562
            },
            {
              "feature": "DIS",
              "coef": -1.4632422122421629,
              "stderr": 0.2280416612471909,
              "tstat": -6.416556537255043,
              "pvalue": 4.0347702956466946e-10,
              "ci_lower": -1.9115834471985202,
              "ci_upper": -1.0149009772858055,
              "vif": 4.1663040460703415
            },
            {
              "feature": "RAD",
              "coef": 0.2855909979339909,
              "stderr": 0.07628974123870898,
              "tstat": 3.7435046088357113,
              "pvalue": 0.00020871057313653907,
              "ci_lower": 0.13560157663966121,
              "ci_upper": 0.4355804192283206,
              "vif": 7.574496873248369
            },
            {
              "feature": "TAX",
              "coef": -0.01193479007186303,
              "stderr": 0.00426176394772147,
              "tstat": -2.8004343314800213,
              "pvalue": 0.005356663377073412,
              "ci_lower": -0.020313629714426202,
              "ci_upper": -0.0035559504292998582,
              "vif": 8.846292255742288
            },
            {
              "feature": "PTRATIO",
              "coef": -0.9446561644216953,
              "stderr": 0.14501665349779796,
              "tstat": -6.514121941422677,
              "pvalue": 2.25262031250395e-10,
              "ci_lower": -1.2297661095205619,
              "ci_upper": -0.6595462193228288,
              "vif": 1.8424797701984694
            },
            {
              "feature": "B",
              "coef": 0.01292648377075914,
              "stderr": 0.0029867216622530062,
              "tstat": 4.327984068327333,
              "pvalue": 1.9136973508748767e-05,
              "ci_lower": 0.007054440604603189,
              "ci_upper": 0.01879852693691509,
              "vif": 1.3192479416781697
            },
            {
              "feature": "LSTAT",
              "coef": -0.5247680884790719,
              "stderr": 0.05593380227456814,
              "tstat": -9.381949145940188,
              "pvalue": 0.0,
              "ci_lower": -0.6347367225016128,
              "ci_upper": -0.41479945445653094,
              "vif": 2.7899589646985365
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 25.17368386936582,
              "residual": 24.82631613063418,
              "abs_error": 24.82631613063418,
              "pct_error": 49.65263226126836,
              "rank": 1
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": -0.5204526837966128,
              "residual": 18.42045268379661,
              "abs_error": 18.42045268379661,
              "pct_error": 102.9075568927185,
              "rank": 2
            },
            {
              "index": 365,
              "actual": 27.5,
              "predicted": 12.906222407242351,
              "residual": 14.593777592757649,
              "abs_error": 14.593777592757649,
              "pct_error": 53.06828215548236,
              "rank": 3
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -6.529709346188881,
              "residual": 13.52970934618888,
              "abs_error": 13.52970934618888,
              "pct_error": 193.28156208841258,
              "rank": 4
            },
            {
              "index": 375,
              "actual": 15.0,
              "predicted": 26.365056511080372,
              "residual": -11.365056511080372,
              "abs_error": 11.365056511080372,
              "pct_error": 75.76704340720248,
              "rank": 5
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 40.8812714525876,
              "residual": 9.118728547412402,
              "abs_error": 9.118728547412402,
              "pct_error": 18.237457094824805,
              "rank": 6
            },
            {
              "index": 381,
              "actual": 10.9,
              "predicted": 19.042884512954608,
              "residual": -8.142884512954607,
              "abs_error": 8.142884512954607,
              "pct_error": 74.70536250417071,
              "rank": 7
            },
            {
              "index": 395,
              "actual": 13.1,
              "predicted": 20.920572343133447,
              "residual": -7.820572343133447,
              "abs_error": 7.820572343133447,
              "pct_error": 59.69902552010266,
              "rank": 8
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 43.1681864644694,
              "residual": 6.8318135355306,
              "abs_error": 6.8318135355306,
              "pct_error": 13.6636270710612,
              "rank": 9
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 41.88626638055358,
              "residual": 6.613733619446421,
              "abs_error": 6.613733619446421,
              "pct_error": 13.636564163807055,
              "rank": 10
            }
          ]
        },
        {
          "k": 13,
          "features": [
            "CRIM",
            "ZN",
            "INDUS",
            "CHAS",
            "NOX",
            "RM",
            "AGE",
            "DIS",
            "RAD",
            "TAX",
            "PTRATIO",
            "B",
            "LSTAT"
          ],
          "rmse": 4.928602182665344,
          "mae": 3.189091965887852,
          "mse": 24.291119474973595,
          "r2": 0.6687594935356309,
          "adj_r2": 0.6198262368988492,
          "cv_rmse": 4.931367360873818,
          "cv_r2": 0.7184784187191997,
          "f_stat": 90.4266165387097,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 30.24675099392359,
              "stderr": 5.6768064400742615,
              "tstat": 5.328127938342727,
              "pvalue": 1.6816101244820914e-07,
              "ci_lower": 19.085778659587206,
              "ci_upper": 41.407723328259976,
              "vif": null
            },
            {
              "feature": "CRIM",
              "coef": -0.11305592398538086,
              "stderr": 0.0347840248791694,
              "tstat": -3.250225480751798,
              "pvalue": 0.0012532800108631115,
              "ci_lower": -0.18144358938342808,
              "ci_upper": -0.04466825858733363,
              "vif": 1.713186990612851
            },
            {
              "feature": "ZN",
              "coef": 0.030110464145648233,
              "stderr": 0.015996138029708066,
              "tstat": 1.8823583598570484,
              "pvalue": 0.060531636384111964,
              "ci_lower": -0.0013389882692666569,
              "ci_upper": 0.06155991656056312,
              "vif": 2.465630718663123
            },
            {
              "feature": "INDUS",
              "coef": 0.04038072041333485,
              "stderr": 0.06736499472046806,
              "tstat": 0.5994318055081157,
              "pvalue": 0.549233038528472,
              "ci_lower": -0.09206326024985387,
              "ci_upper": 0.17282470107652356,
              "vif": 3.877855350260283
            },
            {
              "feature": "CHAS",
              "coef": 2.784438203507941,
              "stderr": 0.9556875964881927,
              "tstat": 2.91354435669119,
              "pvalue": 0.0037792729194365826,
              "ci_lower": 0.9054939524981036,
              "ci_upper": 4.663382454517778,
              "vif": 1.0966737120634573
            },
            {
              "feature": "NOX",
              "coef": -17.202633391781255,
              "stderr": 4.236119087166876,
              "tstat": -4.060941875759779,
              "pvalue": 5.909342124965633e-05,
              "ci_lower": -25.53112026832259,
              "ci_upper": -8.874146515239921,
              "vif": 4.469150159170634
            },
            {
              "feature": "RM",
              "coef": 4.438835199513052,
              "stderr": 0.46397966610535885,
              "tstat": 9.566874420968908,
              "pvalue": 0.0,
              "ci_lower": 3.526620863554682,
              "ci_upper": 5.351049535471423,
              "vif": 1.947808749583758
            },
            {
              "feature": "AGE",
              "coef": -0.006296362210983732,
              "stderr": 0.014568042572182133,
              "tstat": -0.4322037212471302,
              "pvalue": 0.6658322215807733,
              "ci_lower": -0.034938085657068414,
              "ci_upper": 0.022345361235100947,
              "vif": 2.9899478376482787
            },
            {
              "feature": "DIS",
              "coef": -1.4478653685307963,
              "stderr": 0.22595036782635305,
              "tstat": -6.407891177426659,
              "pvalue": 4.258553509828289e-10,
              "ci_lower": -1.8920985533089032,
              "ci_upper": -1.0036321837526894,
              "vif": 4.168578373544288
            },
            {
              "feature": "RAD",
              "coef": 0.26242973558508403,
              "stderr": 0.07598646354966802,
              "tstat": 3.453637968209281,
              "pvalue": 0.0006137380080795118,
              "ci_lower": 0.11303538395191282,
              "ci_upper": 0.41182408721825525,
              "vif": 7.658315779148448
            },
            {
              "feature": "TAX",
              "coef": -0.010646786275308198,
              "stderr": 0.004244612368584239,
              "tstat": -2.5083059065907967,
              "pvalue": 0.012536260644890218,
              "ci_lower": -0.01899197149799319,
              "ci_upper": -0.0023016010526232047,
              "vif": 8.943301431814218
            },
            {
              "feature": "PTRATIO",
              "coef": -0.9154562404680633,
              "stderr": 0.14399674435894544,
              "tstat": -6.3574787370614105,
              "pvalue": 5.737761377133666e-10,
              "ci_lower": -1.1985632473724022,
              "ci_upper": -0.6323492335637244,
              "vif": 1.851448407067042
            },
            {
              "feature": "B",
              "coef": 0.012351334729969202,
              "stderr": 0.002965102588510086,
              "tstat": 4.165567416733308,
              "pvalue": 3.8269380584043944e-05,
              "ci_lower": 0.006521749326948597,
              "ci_upper": 0.018180920132989806,
              "vif": 1.3251213980906684
            },
            {
              "feature": "LSTAT",
              "coef": -0.5085714244487904,
              "stderr": 0.05568391699894719,
              "tstat": -9.133183365286712,
              "pvalue": 0.0,
              "ci_lower": -0.6180496431714643,
              "ci_upper": -0.3990932057261166,
              "vif": 2.818045379538575
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 24.73957160651928,
              "residual": 25.26042839348072,
              "abs_error": 25.26042839348072,
              "pct_error": 50.520856786961446,
              "rank": 1
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": -0.1642369956866574,
              "residual": 18.064236995686656,
              "abs_error": 18.064236995686656,
              "pct_error": 100.91752511556791,
              "rank": 2
            },
            {
              "index": 365,
              "actual": 27.5,
              "predicted": 12.503956484181929,
              "residual": 14.996043515818071,
              "abs_error": 14.996043515818071,
              "pct_error": 54.53106733024753,
              "rank": 3
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -6.088421842193746,
              "residual": 13.088421842193746,
              "abs_error": 13.088421842193746,
              "pct_error": 186.9774548884821,
              "rank": 4
            },
            {
              "index": 375,
              "actual": 15.0,
              "predicted": 25.93909562444947,
              "residual": -10.939095624449472,
              "abs_error": 10.939095624449472,
              "pct_error": 72.92730416299648,
              "rank": 5
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 40.5003396605076,
              "residual": 9.4996603394924,
              "abs_error": 9.4996603394924,
              "pct_error": 18.9993206789848,
              "rank": 6
            },
            {
              "index": 381,
              "actual": 10.9,
              "predicted": 18.76548694981481,
              "residual": -7.865486949814811,
              "abs_error": 7.865486949814811,
              "pct_error": 72.16043073224596,
              "rank": 7
            },
            {
              "index": 395,
              "actual": 13.1,
              "predicted": 20.52384892875306,
              "residual": -7.423848928753062,
              "abs_error": 7.423848928753062,
              "pct_error": 56.67060250956536,
              "rank": 8
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 42.67251161101945,
              "residual": 7.327488388980548,
              "abs_error": 7.327488388980548,
              "pct_error": 14.654976777961096,
              "rank": 9
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 41.41377225132475,
              "residual": 7.086227748675249,
              "abs_error": 7.086227748675249,
              "pct_error": 14.610778863247937,
              "rank": 10
            }
          ]
        }
      ],
      "Baseline OLS": [
        {
          "k": 1,
          "features": [
            "RM"
          ],
          "rmse": 6.792994578778733,
          "mae": 4.478335832064147,
          "mse": 46.14477534731725,
          "r2": 0.37075692322547793,
          "adj_r2": 0.3644644924577327,
          "cv_rmse": 6.578635183107427,
          "cv_r2": 0.4792386265509257,
          "f_stat": 410.2292390655606,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": -36.24631889813789,
              "stderr": 2.9333917729530676,
              "tstat": -12.356453451714856,
              "pvalue": 0.0,
              "ci_lower": -42.01302292450731,
              "ci_upper": -30.47961487176848,
              "vif": null
            },
            {
              "feature": "RM",
              "coef": 9.348301406497722,
              "stderr": 0.4615506858767707,
              "tstat": 20.254116595535994,
              "pvalue": 0.0,
              "ci_lower": 8.440946915645087,
              "ci_upper": 10.255655897350357,
              "vif": 1.0
            }
          ],
          "outliers": [
            {
              "index": 365,
              "actual": 27.5,
              "predicted": -2.957017589599509,
              "residual": 30.45701758959951,
              "abs_error": 30.45701758959951,
              "pct_error": 110.7527912349073,
              "rank": 1
            },
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 21.862722644651946,
              "residual": 28.137277355348054,
              "abs_error": 28.137277355348054,
              "pct_error": 56.27455471069611,
              "rank": 2
            },
            {
              "index": 375,
              "actual": 15.0,
              "predicted": 32.11780928757994,
              "residual": -17.117809287579938,
              "abs_error": 17.117809287579938,
              "pct_error": 114.11872858386624,
              "rank": 3
            },
            {
              "index": 436,
              "actual": 9.6,
              "predicted": 24.153056489243887,
              "residual": -14.553056489243888,
              "abs_error": 14.553056489243888,
              "pct_error": 151.59433842962383,
              "rank": 4
            },
            {
              "index": 381,
              "actual": 10.9,
              "predicted": 24.938313807389697,
              "residual": -14.038313807389697,
              "abs_error": 14.038313807389697,
              "pct_error": 128.79186979256602,
              "rank": 5
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 37.371554678031664,
              "residual": 12.628445321968336,
              "abs_error": 12.628445321968336,
              "pct_error": 25.256890643936668,
              "rank": 6
            },
            {
              "index": 454,
              "actual": 14.9,
              "predicted": 26.649052964778775,
              "residual": -11.749052964778775,
              "abs_error": 11.749052964778775,
              "pct_error": 78.85270446160251,
              "rank": 7
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 37.16589204708871,
              "residual": 11.334107952911289,
              "abs_error": 11.334107952911289,
              "pct_error": 23.3692947482707,
              "rank": 8
            },
            {
              "index": 395,
              "actual": 13.1,
              "predicted": 24.246539503308867,
              "residual": -11.146539503308867,
              "abs_error": 11.146539503308867,
              "pct_error": 85.08808781151808,
              "rank": 9
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 38.857934601664816,
              "residual": 11.142065398335184,
              "abs_error": 11.142065398335184,
              "pct_error": 22.284130796670368,
              "rank": 10
            }
          ]
        },
        {
          "k": 2,
          "features": [
            "RM",
            "LSTAT"
          ],
          "rmse": 5.589569804715172,
          "mae": 3.898759721382368,
          "mse": 31.243290601783606,
          "r2": 0.5739577415025862,
          "adj_r2": 0.5653508271895071,
          "cv_rmse": 5.583527948544505,
          "cv_r2": 0.63594666380683,
          "f_stat": 372.61794090137715,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": -3.8411770790047806,
              "stderr": 3.522984973655918,
              "tstat": -1.0903188937018555,
              "pvalue": 0.2762274312067612,
              "ci_lower": -10.767004309133334,
              "ci_upper": 3.084650151123772,
              "vif": null
            },
            {
              "feature": "RM",
              "coef": 5.465098773075856,
              "stderr": 0.491551098557778,
              "tstat": 11.118068475710011,
              "pvalue": 0.0,
              "ci_lower": 4.498759714337775,
              "ci_upper": 6.431437831813937,
              "vif": 1.6006409402077786
            },
            {
              "feature": "LSTAT",
              "coef": -0.6324985627075881,
              "stderr": 0.04904544343244731,
              "tstat": -12.896173802134328,
              "pvalue": 0.0,
              "ci_lower": -0.7289168756377382,
              "ci_upper": -0.536080249777438,
              "vif": 1.600640940207779
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 24.10216559183143,
              "residual": 25.89783440816857,
              "abs_error": 25.89783440816857,
              "pct_error": 51.795668816337134,
              "rank": 1
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": -0.287675557469516,
              "residual": 18.187675557469515,
              "abs_error": 18.187675557469515,
              "pct_error": 101.60712601938278,
              "rank": 2
            },
            {
              "index": 365,
              "actual": 27.5,
              "predicted": 11.116649885440317,
              "residual": 16.383350114559683,
              "abs_error": 16.383350114559683,
              "pct_error": 59.57581859839885,
              "rank": 3
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 37.31795502772605,
              "residual": 12.68204497227395,
              "abs_error": 12.68204497227395,
              "pct_error": 25.364089944547903,
              "rank": 4
            },
            {
              "index": 375,
              "actual": 15.0,
              "predicted": 27.624309565708973,
              "residual": -12.624309565708973,
              "abs_error": 12.624309565708973,
              "pct_error": 84.16206377139316,
              "rank": 5
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 36.666424062044,
              "residual": 11.833575937955999,
              "abs_error": 11.833575937955999,
              "pct_error": 24.3991256452701,
              "rank": 6
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 38.2438306032888,
              "residual": 11.7561693967112,
              "abs_error": 11.7561693967112,
              "pct_error": 23.5123387934224,
              "rank": 7
            },
            {
              "index": 436,
              "actual": 9.6,
              "predicted": 20.052227036966364,
              "residual": -10.452227036966365,
              "abs_error": 10.452227036966365,
              "pct_error": 108.87736496839963,
              "rank": 8
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -2.53419257240159,
              "residual": 9.53419257240159,
              "abs_error": 9.53419257240159,
              "pct_error": 136.20275103430842,
              "rank": 9
            },
            {
              "index": 209,
              "actual": 20.0,
              "predicted": 10.759918951394386,
              "residual": 9.240081048605614,
              "abs_error": 9.240081048605614,
              "pct_error": 46.20040524302807,
              "rank": 10
            }
          ]
        },
        {
          "k": 3,
          "features": [
            "RM",
            "LSTAT",
            "DIS"
          ],
          "rmse": 5.591613093092338,
          "mae": 3.907781681759715,
          "mse": 31.26613698284166,
          "r2": 0.5736462018536892,
          "adj_r2": 0.5605945549716593,
          "cv_rmse": 5.510867831293079,
          "cv_r2": 0.645073102212319,
          "f_stat": 258.98286232948635,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 0.8578000158653969,
              "stderr": 3.7373249177230696,
              "tstat": 0.22952246185434783,
              "pvalue": 0.8185801815206382,
              "ci_lower": -6.489453170545153,
              "ci_upper": 8.205053202275947,
              "vif": null
            },
            {
              "feature": "RM",
              "coef": 5.208230124293049,
              "stderr": 0.4908516543371657,
              "tstat": 10.610599105194252,
              "pvalue": 0.0,
              "ci_lower": 4.243258798337049,
              "ci_upper": 6.173201450249049,
              "vif": 1.6388552216311458
            },
            {
              "feature": "LSTAT",
              "coef": -0.7237598855816971,
              "stderr": 0.05524339585820873,
              "tstat": -13.101292459271441,
              "pvalue": 0.0,
              "ci_lower": -0.8323635593812571,
              "ci_upper": -0.6151562117821372,
              "vif": 2.0851668725608863
            },
            {
              "feature": "DIS",
              "coef": -0.5093615961612004,
              "stderr": 0.14863049009784565,
              "tstat": -3.427033012041339,
              "pvalue": 0.0006734911290613432,
              "ci_lower": -0.8015561112247889,
              "ci_upper": -0.2171670810976118,
              "vif": 1.356030132827216
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 25.739232116805358,
              "residual": 24.260767883194642,
              "abs_error": 24.260767883194642,
              "pct_error": 48.521535766389285,
              "rank": 1
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": -0.7056352206241918,
              "residual": 18.60563522062419,
              "abs_error": 18.60563522062419,
              "pct_error": 103.94209620460441,
              "rank": 2
            },
            {
              "index": 365,
              "actual": 27.5,
              "predicted": 13.42943497620401,
              "residual": 14.07056502379599,
              "abs_error": 14.07056502379599,
              "pct_error": 51.16569099562178,
              "rank": 3
            },
            {
              "index": 375,
              "actual": 15.0,
              "predicted": 28.54778138357547,
              "residual": -13.547781383575469,
              "abs_error": 13.547781383575469,
              "pct_error": 90.31854255716979,
              "rank": 4
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 36.8459673447386,
              "residual": 13.154032655261403,
              "abs_error": 13.154032655261403,
              "pct_error": 26.308065310522803,
              "rank": 5
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 36.393593368719415,
              "residual": 12.106406631280585,
              "abs_error": 12.106406631280585,
              "pct_error": 24.961663157279556,
              "rank": 6
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 38.00937971480745,
              "residual": 11.990620285192549,
              "abs_error": 11.990620285192549,
              "pct_error": 23.981240570385097,
              "rank": 7
            },
            {
              "index": 436,
              "actual": 9.6,
              "predicted": 20.424261381700738,
              "residual": -10.824261381700738,
              "abs_error": 10.824261381700738,
              "pct_error": 112.75272272604937,
              "rank": 8
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -3.2154720200199733,
              "residual": 10.215472020019973,
              "abs_error": 10.215472020019973,
              "pct_error": 145.93531457171392,
              "rank": 9
            },
            {
              "index": 209,
              "actual": 20.0,
              "predicted": 10.005189856881415,
              "residual": 9.994810143118585,
              "abs_error": 9.994810143118585,
              "pct_error": 49.974050715592924,
              "rank": 10
            }
          ]
        },
        {
          "k": 4,
          "features": [
            "RM",
            "LSTAT",
            "DIS",
            "PTRATIO"
          ],
          "rmse": 5.17513854749657,
          "mae": 3.339626156735151,
          "mse": 26.782058985784914,
          "r2": 0.6347923449246612,
          "adj_r2": 0.6197322354370184,
          "cv_rmse": 5.223715617961389,
          "cv_r2": 0.6813858371869639,
          "f_stat": 232.30795592710783,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 20.838622152196997,
              "stderr": 4.47140115362642,
              "tstat": 4.660423307198985,
              "pvalue": 4.308084175619342e-06,
              "ci_lower": 12.048172573271023,
              "ci_upper": 29.62907173112297,
              "vif": null
            },
            {
              "feature": "RM",
              "coef": 4.613158367506603,
              "stderr": 0.4693070266585977,
              "tstat": 9.829723625387977,
              "pvalue": 0.0,
              "ci_lower": 3.690534873631031,
              "ci_upper": 5.535781861382175,
              "vif": 1.6907156555653593
            },
            {
              "feature": "LSTAT",
              "coef": -0.6691799762470754,
              "stderr": 0.052545868190363595,
              "tstat": -12.735158810636923,
              "pvalue": 0.0,
              "ci_lower": -0.7724813328103681,
              "ci_upper": -0.5658786196837826,
              "vif": 2.128989973046088
            },
            {
              "feature": "DIS",
              "coef": -0.5862708091746127,
              "stderr": 0.14031301973060412,
              "tstat": -4.17830654846023,
              "pvalue": 3.610730965886155e-05,
              "ci_lower": -0.8621160046360824,
              "ci_upper": -0.31042561371314303,
              "vif": 1.3638476285793222
            },
            {
              "feature": "PTRATIO",
              "coef": -0.9067126479593419,
              "stderr": 0.12523916930320214,
              "tstat": -7.2398487869574115,
              "pvalue": 2.3279156380340282e-12,
              "ci_lower": -1.1529237494109545,
              "ci_upper": -0.6605015465077293,
              "vif": 1.1882140109813928
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 24.135724699198676,
              "residual": 25.864275300801324,
              "abs_error": 25.864275300801324,
              "pct_error": 51.72855060160265,
              "rank": 1
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": -0.03799840574955837,
              "residual": 17.937998405749557,
              "abs_error": 17.937998405749557,
              "pct_error": 100.21228159636624,
              "rank": 2
            },
            {
              "index": 365,
              "actual": 27.5,
              "predicted": 13.240150109869646,
              "residual": 14.259849890130354,
              "abs_error": 14.259849890130354,
              "pct_error": 51.85399960047402,
              "rank": 3
            },
            {
              "index": 375,
              "actual": 15.0,
              "predicted": 26.493566658116848,
              "residual": -11.493566658116848,
              "abs_error": 11.493566658116848,
              "pct_error": 76.62377772077899,
              "rank": 4
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 38.811625597701266,
              "residual": 11.188374402298734,
              "abs_error": 11.188374402298734,
              "pct_error": 22.37674880459747,
              "rank": 5
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 39.64428821879548,
              "residual": 10.35571178120452,
              "abs_error": 10.35571178120452,
              "pct_error": 20.71142356240904,
              "rank": 6
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 38.186969176367,
              "residual": 10.313030823633,
              "abs_error": 10.313030823633,
              "pct_error": 21.263981079655668,
              "rank": 7
            },
            {
              "index": 436,
              "actual": 9.6,
              "predicted": 19.07587838216567,
              "residual": -9.47587838216567,
              "abs_error": 9.47587838216567,
              "pct_error": 98.7070664808924,
              "rank": 8
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -2.348540451209555,
              "residual": 9.348540451209555,
              "abs_error": 9.348540451209555,
              "pct_error": 133.5505778744222,
              "rank": 9
            },
            {
              "index": 209,
              "actual": 20.0,
              "predicted": 10.903320179011935,
              "residual": 9.096679820988065,
              "abs_error": 9.096679820988065,
              "pct_error": 45.483399104940325,
              "rank": 10
            }
          ]
        },
        {
          "k": 5,
          "features": [
            "RM",
            "LSTAT",
            "DIS",
            "PTRATIO",
            "B"
          ],
          "rmse": 5.374532960326982,
          "mae": 3.4317494502126062,
          "mse": 28.88560454164111,
          "r2": 0.6061078087504206,
          "adj_r2": 0.5855925904561716,
          "cv_rmse": 5.072134413401196,
          "cv_r2": 0.7000689352393185,
          "f_stat": 203.46434873280924,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 12.272211715357253,
              "stderr": 4.633020271027113,
              "tstat": 2.6488577639304345,
              "pvalue": 0.008397879241271777,
              "ci_lower": 3.1639610767054016,
              "ci_upper": 21.380462354009104,
              "vif": null
            },
            {
              "feature": "RM",
              "coef": 4.897431094273662,
              "stderr": 0.4578990381612607,
              "tstat": 10.695438701814673,
              "pvalue": 0.0,
              "ci_lower": 3.9972279950444496,
              "ci_upper": 5.797634193502874,
              "vif": 1.7150517168821258
            },
            {
              "feature": "LSTAT",
              "coef": -0.6032353151453709,
              "stderr": 0.05245258203440145,
              "tstat": -11.500583798710503,
              "pvalue": 0.0,
              "ci_lower": -0.7063540661686339,
              "ci_upper": -0.5001165641221078,
              "vif": 2.2605364413626257
            },
            {
              "feature": "DIS",
              "coef": -0.6773433109041491,
              "stderr": 0.13704615234493958,
              "tstat": -4.94244675472029,
              "pvalue": 1.138859637261902e-06,
              "ci_lower": -0.946768142137155,
              "ci_upper": -0.40791847967114325,
              "vif": 1.3863883537105328
            },
            {
              "feature": "PTRATIO",
              "coef": -0.860943476609671,
              "stderr": 0.12164220967982631,
              "tstat": -7.077670480302478,
              "pvalue": 6.6631145045903395e-12,
              "ci_lower": -1.100085045001228,
              "ci_upper": -0.6218019082181139,
              "vif": 1.1944396487942048
            },
            {
              "feature": "B",
              "coef": 0.015319165002057211,
              "stderr": 0.0029393829120325553,
              "tstat": 5.211694243491452,
              "pvalue": 3.0116311022787556e-07,
              "ci_lower": 0.009540507728920022,
              "ci_upper": 0.0210978222751944,
              "vif": 1.177274917048263
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 24.39198281723681,
              "residual": 25.60801718276319,
              "abs_error": 25.60801718276319,
              "pct_error": 51.21603436552638,
              "rank": 1
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": -3.798218199810716,
              "residual": 21.698218199810714,
              "abs_error": 21.698218199810714,
              "pct_error": 121.21909608832802,
              "rank": 2
            },
            {
              "index": 365,
              "actual": 27.5,
              "predicted": 12.366887767794488,
              "residual": 15.133112232205512,
              "abs_error": 15.133112232205512,
              "pct_error": 55.02949902620187,
              "rank": 3
            },
            {
              "index": 375,
              "actual": 15.0,
              "predicted": 27.777174033884783,
              "residual": -12.777174033884783,
              "abs_error": 12.777174033884783,
              "pct_error": 85.18116022589855,
              "rank": 4
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -5.065945334620901,
              "residual": 12.065945334620901,
              "abs_error": 12.065945334620901,
              "pct_error": 172.37064763744144,
              "rank": 5
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 38.86365509505135,
              "residual": 11.13634490494865,
              "abs_error": 11.13634490494865,
              "pct_error": 22.2726898098973,
              "rank": 6
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 39.741243139317035,
              "residual": 10.258756860682965,
              "abs_error": 10.258756860682965,
              "pct_error": 20.51751372136593,
              "rank": 7
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 38.32796100612289,
              "residual": 10.17203899387711,
              "abs_error": 10.17203899387711,
              "pct_error": 20.97327627603528,
              "rank": 8
            },
            {
              "index": 381,
              "actual": 10.9,
              "predicted": 19.26979618798952,
              "residual": -8.36979618798952,
              "abs_error": 8.36979618798952,
              "pct_error": 76.78712099072953,
              "rank": 9
            },
            {
              "index": 209,
              "actual": 20.0,
              "predicted": 11.957302651072135,
              "residual": 8.042697348927865,
              "abs_error": 8.042697348927865,
              "pct_error": 40.213486744639326,
              "rank": 10
            }
          ]
        },
        {
          "k": 6,
          "features": [
            "RM",
            "LSTAT",
            "DIS",
            "PTRATIO",
            "B",
            "NOX"
          ],
          "rmse": 5.228983954832513,
          "mae": 3.4129034008791073,
          "mse": 27.34227319989587,
          "r2": 0.6271531070459033,
          "adj_r2": 0.6036048822277498,
          "cv_rmse": 4.983765987569918,
          "cv_r2": 0.7098780912174703,
          "f_stat": 179.49868984236664,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 24.72824220387983,
              "stderr": 5.429279485028771,
              "tstat": 4.554608447044938,
              "pvalue": 6.992435328090352e-06,
              "ci_lower": 14.05450987178003,
              "ci_upper": 35.40197453597963,
              "vif": null
            },
            {
              "feature": "RM",
              "coef": 4.799560033026462,
              "stderr": 0.4493030376059636,
              "tstat": 10.682233662608022,
              "pvalue": 0.0,
              "ci_lower": 3.9162493888369942,
              "ci_upper": 5.68287067721593,
              "vif": 1.7197149079725438
            },
            {
              "feature": "LSTAT",
              "coef": -0.5385375665699679,
              "stderr": 0.053674669343043414,
              "tstat": -10.033365331569868,
              "pvalue": 0.0,
              "ci_lower": -0.6440596814585833,
              "ci_upper": -0.4330154516813525,
              "vif": 2.465224715578532
            },
            {
              "feature": "DIS",
              "coef": -1.2002769242526714,
              "stderr": 0.1834709387927692,
              "tstat": -6.542054737117722,
              "pvalue": 1.873547983421986e-10,
              "ci_lower": -1.5609729791883489,
              "ci_upper": -0.8395808693169939,
              "vif": 2.5877705284958292
            },
            {
              "feature": "PTRATIO",
              "coef": -0.9413969151990369,
              "stderr": 0.1207383934739794,
              "tstat": -7.796997194615808,
              "pvalue": 5.639932965095795e-14,
              "ci_lower": -1.1787634566899787,
              "ci_upper": -0.7040303737080951,
              "vif": 1.2255368776967586
            },
            {
              "feature": "B",
              "coef": 0.013168586736475696,
              "stderr": 0.002925811844533744,
              "tstat": 4.500831713111831,
              "pvalue": 8.905854915752798e-06,
              "ci_lower": 0.007416565207881485,
              "ci_upper": 0.018920608265069905,
              "vif": 1.2147819685692185
            },
            {
              "feature": "NOX",
              "coef": -15.11712554297738,
              "stderr": 3.6138294703023015,
              "tstat": -4.183131956614658,
              "pvalue": 3.54166939395828e-05,
              "ci_lower": -22.221760433523333,
              "ci_upper": -8.012490652431428,
              "vif": 3.0623390065291214
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 24.29335473653803,
              "residual": 25.70664526346197,
              "abs_error": 25.70664526346197,
              "pct_error": 51.41329052692394,
              "rank": 1
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": -1.0960584629146286,
              "residual": 18.996058462914625,
              "abs_error": 18.996058462914625,
              "pct_error": 106.12323163639456,
              "rank": 2
            },
            {
              "index": 365,
              "actual": 27.5,
              "predicted": 10.849385161854102,
              "residual": 16.6506148381459,
              "abs_error": 16.6506148381459,
              "pct_error": 60.54769032053054,
              "rank": 3
            },
            {
              "index": 375,
              "actual": 15.0,
              "predicted": 27.07635846465702,
              "residual": -12.07635846465702,
              "abs_error": 12.07635846465702,
              "pct_error": 80.5090564310468,
              "rank": 4
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -3.817958951501936,
              "residual": 10.817958951501936,
              "abs_error": 10.817958951501936,
              "pct_error": 154.54227073574194,
              "rank": 5
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 39.401586103419845,
              "residual": 10.598413896580155,
              "abs_error": 10.598413896580155,
              "pct_error": 21.19682779316031,
              "rank": 6
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 40.6081229772396,
              "residual": 9.391877022760397,
              "abs_error": 9.391877022760397,
              "pct_error": 18.783754045520794,
              "rank": 7
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 39.26792862277408,
              "residual": 9.232071377225921,
              "abs_error": 9.232071377225921,
              "pct_error": 19.035198715929734,
              "rank": 8
            },
            {
              "index": 381,
              "actual": 10.9,
              "predicted": 19.03233316276728,
              "residual": -8.13233316276728,
              "abs_error": 8.13233316276728,
              "pct_error": 74.60856112630532,
              "rank": 9
            },
            {
              "index": 0,
              "actual": 24.0,
              "predicted": 31.384525450357067,
              "residual": -7.384525450357067,
              "abs_error": 7.384525450357067,
              "pct_error": 30.768856043154447,
              "rank": 10
            }
          ]
        },
        {
          "k": 7,
          "features": [
            "RM",
            "LSTAT",
            "DIS",
            "PTRATIO",
            "B",
            "NOX",
            "RAD"
          ],
          "rmse": 5.155030891556992,
          "mae": 3.365629052411153,
          "mse": 26.574343492906873,
          "r2": 0.63762481154409,
          "adj_r2": 0.6106394251697137,
          "cv_rmse": 5.014749824259021,
          "cv_r2": 0.7061119954694067,
          "f_stat": 154.56844284980824,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 27.43825304860207,
              "stderr": 5.739242283375115,
              "tstat": 4.780814555970665,
              "pvalue": 2.465701662401898e-06,
              "ci_lower": 16.15505992611679,
              "ci_upper": 38.72144617108735,
              "vif": null
            },
            {
              "feature": "RM",
              "coef": 4.6851927107654525,
              "stderr": 0.45567066276162155,
              "tstat": 10.28197137461196,
              "pvalue": 0.0,
              "ci_lower": 3.7893566692929728,
              "ci_upper": 5.581028752237932,
              "vif": 1.773589091584569
            },
            {
              "feature": "LSTAT",
              "coef": -0.5469823825420348,
              "stderr": 0.05392204043532353,
              "tstat": -10.143948154152467,
              "pvalue": 0.0,
              "ci_lower": -0.6529916370306643,
              "ci_upper": -0.44097312805340527,
              "vif": 2.494729822133047
            },
            {
              "feature": "DIS",
              "coef": -1.2112110867470403,
              "stderr": 0.18338056163968217,
              "tstat": -6.604904445253609,
              "pvalue": 1.283737560697773e-10,
              "ci_lower": -1.5717322478564035,
              "ci_upper": -0.850689925637677,
              "vif": 2.5922143979593013
            },
            {
              "feature": "PTRATIO",
              "coef": -1.0309228480715347,
              "stderr": 0.13565841248463617,
              "tstat": -7.599402272146525,
              "pvalue": 2.1715962361668062e-13,
              "ci_lower": -1.2976235711247828,
              "ci_upper": -0.7642221250182866,
              "vif": 1.5513228333306126
            },
            {
              "feature": "B",
              "coef": 0.014249234344104522,
              "stderr": 0.003016685901000233,
              "tstat": 4.723472980524737,
              "pvalue": 3.224574974369787e-06,
              "ci_lower": 0.008318512494382006,
              "ci_upper": 0.020179956193827037,
              "vif": 1.2949078447991862
            },
            {
              "feature": "NOX",
              "coef": -17.184310926570426,
              "stderr": 3.883953065379359,
              "tstat": -4.42443835888423,
              "pvalue": 1.2514346517056296e-05,
              "ci_lower": -24.820056265687295,
              "ci_upper": -9.548565587453556,
              "vif": 3.546819010109519
            },
            {
              "feature": "RAD",
              "coef": 0.06032950758328477,
              "stderr": 0.0418931235678837,
              "tstat": 1.440081389145565,
              "pvalue": 0.15063446285785442,
              "ci_lower": -0.02203122583440159,
              "ci_upper": 0.14269024100097114,
              "vif": 2.197600502254183
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 24.92996556296034,
              "residual": 25.07003443703966,
              "abs_error": 25.07003443703966,
              "pct_error": 50.14006887407931,
              "rank": 1
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": -0.7860919970833145,
              "residual": 18.686091997083313,
              "abs_error": 18.686091997083313,
              "pct_error": 104.39157540270007,
              "rank": 2
            },
            {
              "index": 365,
              "actual": 27.5,
              "predicted": 11.612918830328379,
              "residual": 15.887081169671621,
              "abs_error": 15.887081169671621,
              "pct_error": 57.77120425335135,
              "rank": 3
            },
            {
              "index": 375,
              "actual": 15.0,
              "predicted": 27.503422097979907,
              "residual": -12.503422097979907,
              "abs_error": 12.503422097979907,
              "pct_error": 83.35614731986605,
              "rank": 4
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -3.6528807275025947,
              "residual": 10.652880727502595,
              "abs_error": 10.652880727502595,
              "pct_error": 152.1840103928942,
              "rank": 5
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 39.62992872991482,
              "residual": 10.370071270085177,
              "abs_error": 10.370071270085177,
              "pct_error": 20.740142540170353,
              "rank": 6
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 40.80620254342496,
              "residual": 9.19379745657504,
              "abs_error": 9.19379745657504,
              "pct_error": 18.38759491315008,
              "rank": 7
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 39.48126483959966,
              "residual": 9.01873516040034,
              "abs_error": 9.01873516040034,
              "pct_error": 18.595330227629567,
              "rank": 8
            },
            {
              "index": 381,
              "actual": 10.9,
              "predicted": 19.48049396398992,
              "residual": -8.580493963989921,
              "abs_error": 8.580493963989921,
              "pct_error": 78.72012810999928,
              "rank": 9
            },
            {
              "index": 395,
              "actual": 13.1,
              "predicted": 20.60156377548893,
              "residual": -7.501563775488931,
              "abs_error": 7.501563775488931,
              "pct_error": 57.26384561441932,
              "rank": 10
            }
          ]
        },
        {
          "k": 8,
          "features": [
            "RM",
            "LSTAT",
            "DIS",
            "PTRATIO",
            "B",
            "NOX",
            "RAD",
            "CRIM"
          ],
          "rmse": 5.1833122480552065,
          "mae": 3.4007093109974953,
          "mse": 26.866725860839114,
          "r2": 0.6336378037104284,
          "adj_r2": 0.6021227760726158,
          "cv_rmse": 4.93866705523759,
          "cv_r2": 0.7166113245340827,
          "f_stat": 139.92473661237366,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 28.820586528136378,
              "stderr": 5.685455063773418,
              "tstat": 5.069178492285585,
              "pvalue": 6.152152920435583e-07,
              "ci_lower": 17.643050859687378,
              "ci_upper": 39.99812219658538,
              "vif": null
            },
            {
              "feature": "RM",
              "coef": 4.647832955631119,
              "stderr": 0.4503023380159583,
              "tstat": 10.321582997124931,
              "pvalue": 0.0,
              "ci_lower": 3.762544023030043,
              "ci_upper": 5.533121888232196,
              "vif": 1.774724642659779
            },
            {
              "feature": "LSTAT",
              "coef": -0.5260172207660545,
              "stderr": 0.053651852821968736,
              "tstat": -9.804269435233131,
              "pvalue": 0.0,
              "ci_lower": -0.6314961124060696,
              "ci_upper": -0.4205383291260394,
              "vif": 2.5306497187250354
            },
            {
              "feature": "DIS",
              "coef": -1.2640086231720054,
              "stderr": 0.18187590021826625,
              "tstat": -6.949841192016587,
              "pvalue": 1.518030146030469e-11,
              "ci_lower": -1.6215744361311701,
              "ci_upper": -0.9064428102128406,
              "vif": 2.6126807008466963
            },
            {
              "feature": "PTRATIO",
              "coef": -1.0539509704632788,
              "stderr": 0.1342010871276021,
              "tstat": -7.853520362775848,
              "pvalue": 3.863576125695545e-14,
              "ci_lower": -1.3177886793691749,
              "ci_upper": -0.7901132615573826,
              "vif": 1.5555805184571763
            },
            {
              "feature": "B",
              "coef": 0.013271337228413671,
              "stderr": 0.0029950686427981338,
              "tstat": 4.431062793944838,
              "pvalue": 1.2161339302707574e-05,
              "ci_lower": 0.007383068618634108,
              "ci_upper": 0.019159605838193233,
              "vif": 1.3078680764401407
            },
            {
              "feature": "NOX",
              "coef": -18.32217193202766,
              "stderr": 3.852618844075832,
              "tstat": -4.755770729876807,
              "pvalue": 2.7754670255397684e-06,
              "ci_lower": -25.896373832062686,
              "ci_upper": -10.747970031992637,
              "vif": 3.575813619918011
            },
            {
              "feature": "RAD",
              "coef": 0.12586479371839338,
              "stderr": 0.04595716625074405,
              "tstat": 2.738741397406234,
              "pvalue": 0.0064467241946990494,
              "ci_lower": 0.03551356251059638,
              "ci_upper": 0.21621602492619035,
              "vif": 2.70982626611371
            },
            {
              "feature": "CRIM",
              "coef": -0.11532310701797943,
              "stderr": 0.03516044491541225,
              "tstat": -3.2799103451455083,
              "pvalue": 0.0011305540240706957,
              "ci_lower": -0.184448115087205,
              "ci_upper": -0.046198098948753874,
              "vif": 1.6932769062276003
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 25.185077147123852,
              "residual": 24.814922852876148,
              "abs_error": 24.814922852876148,
              "pct_error": 49.629845705752295,
              "rank": 1
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": -0.7072497953255574,
              "residual": 18.607249795325558,
              "abs_error": 18.607249795325558,
              "pct_error": 103.95111617500312,
              "rank": 2
            },
            {
              "index": 365,
              "actual": 27.5,
              "predicted": 12.344750590419086,
              "residual": 15.155249409580914,
              "abs_error": 15.155249409580914,
              "pct_error": 55.10999785302151,
              "rank": 3
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -6.79439342005418,
              "residual": 13.794393420054181,
              "abs_error": 13.794393420054181,
              "pct_error": 197.06276314363117,
              "rank": 4
            },
            {
              "index": 375,
              "actual": 15.0,
              "predicted": 26.51948242251344,
              "residual": -11.519482422513441,
              "abs_error": 11.519482422513441,
              "pct_error": 76.79654948342294,
              "rank": 5
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 39.545348909267794,
              "residual": 10.454651090732206,
              "abs_error": 10.454651090732206,
              "pct_error": 20.90930218146441,
              "rank": 6
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 40.74447884595986,
              "residual": 9.255521154040139,
              "abs_error": 9.255521154040139,
              "pct_error": 18.511042308080278,
              "rank": 7
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 39.44188914786122,
              "residual": 9.058110852138782,
              "abs_error": 9.058110852138782,
              "pct_error": 18.676517220904703,
              "rank": 8
            },
            {
              "index": 381,
              "actual": 10.9,
              "predicted": 19.10540500407454,
              "residual": -8.20540500407454,
              "abs_error": 8.20540500407454,
              "pct_error": 75.27894499150955,
              "rank": 9
            },
            {
              "index": 395,
              "actual": 13.1,
              "predicted": 20.94053545418523,
              "residual": -7.840535454185231,
              "abs_error": 7.840535454185231,
              "pct_error": 59.851415680803285,
              "rank": 10
            }
          ]
        },
        {
          "k": 9,
          "features": [
            "RM",
            "LSTAT",
            "DIS",
            "PTRATIO",
            "B",
            "NOX",
            "RAD",
            "CRIM",
            "CHAS"
          ],
          "rmse": 5.139565462221301,
          "mae": 3.357449036704515,
          "mse": 26.415133140458064,
          "r2": 0.6397958484876054,
          "adj_r2": 0.6045584858396538,
          "cv_rmse": 4.946816213930602,
          "cv_r2": 0.7172835180053093,
          "f_stat": 128.29423333323976,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 29.19936009916026,
              "stderr": 5.623517539249356,
              "tstat": 5.192365791582092,
              "pvalue": 3.334874258964504e-07,
              "ci_lower": 18.143506614154955,
              "ci_upper": 40.25521358416556,
              "vif": null
            },
            {
              "feature": "RM",
              "coef": 4.57753983488346,
              "stderr": 0.44585319021202385,
              "tstat": 10.266921792589681,
              "pvalue": 0.0,
              "ci_lower": 3.70099103559505,
              "ci_upper": 5.45408863417187,
              "vif": 1.7791766911168596
            },
            {
              "feature": "LSTAT",
              "coef": -0.5110692985990074,
              "stderr": 0.053266810007773994,
              "tstat": -9.59451670795416,
              "pvalue": 0.0,
              "ci_lower": -0.6157920175999289,
              "ci_upper": -0.40634657959808596,
              "vif": 2.5508722678897477
            },
            {
              "feature": "DIS",
              "coef": -1.2356939587803069,
              "stderr": 0.18007768827832682,
              "tstat": -6.862004785792379,
              "pvalue": 2.645128560629928e-11,
              "ci_lower": -1.589727270426987,
              "ci_upper": -0.8816606471336268,
              "vif": 2.619199543812766
            },
            {
              "feature": "PTRATIO",
              "coef": -1.0225878626174694,
              "stderr": 0.13308134283391976,
              "tstat": -7.683931051805049,
              "pvalue": 1.2367884494324244e-13,
              "ci_lower": -1.2842262086687515,
              "ci_upper": -0.7609495165661873,
              "vif": 1.5643269372389152
            },
            {
              "feature": "B",
              "coef": 0.012640641016499643,
              "stderr": 0.0029685161972190905,
              "tstat": 4.258235487595254,
              "pvalue": 2.579069910169096e-05,
              "ci_lower": 0.006804528669511175,
              "ci_upper": 0.018476753363488113,
              "vif": 1.3138384634130909
            },
            {
              "feature": "NOX",
              "coef": -19.686415152990502,
              "stderr": 3.834288842559993,
              "tstat": -5.134306767522165,
              "pvalue": 4.459471130147108e-07,
              "ci_lower": -27.224639292359395,
              "ci_upper": -12.14819101362161,
              "vif": 3.621972796304968
            },
            {
              "feature": "RAD",
              "coef": 0.11955157164215065,
              "stderr": 0.045490248840137665,
              "tstat": 2.6280702939717937,
              "pvalue": 0.008922651734255549,
              "ci_lower": 0.030117596792286913,
              "ci_upper": 0.2089855464920144,
              "vif": 2.715090664584471
            },
            {
              "feature": "CRIM",
              "coef": -0.10867853652305492,
              "stderr": 0.034833320052114126,
              "tstat": -3.1199591758827747,
              "pvalue": 0.001941884655006998,
              "ci_lower": -0.1771609552591183,
              "ci_upper": -0.040196117786991545,
              "vif": 1.6995022701622697
            },
            {
              "feature": "CHAS",
              "coef": 3.0035701329002666,
              "stderr": 0.9529875610741191,
              "tstat": 3.151741172271883,
              "pvalue": 0.001747111224561504,
              "ci_lower": 1.129993536982973,
              "ci_upper": 4.877146728817561,
              "vif": 1.0787154656967892
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 24.75406027838852,
              "residual": 25.24593972161148,
              "abs_error": 25.24593972161148,
              "pct_error": 50.49187944322296,
              "rank": 1
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": -0.3216370278624501,
              "residual": 18.22163702786245,
              "abs_error": 18.22163702786245,
              "pct_error": 101.79685490425949,
              "rank": 2
            },
            {
              "index": 365,
              "actual": 27.5,
              "predicted": 11.934371449905624,
              "residual": 15.565628550094376,
              "abs_error": 15.565628550094376,
              "pct_error": 56.60228563670682,
              "rank": 3
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -6.348660395236762,
              "residual": 13.348660395236763,
              "abs_error": 13.348660395236763,
              "pct_error": 190.69514850338234,
              "rank": 4
            },
            {
              "index": 375,
              "actual": 15.0,
              "predicted": 26.068954036346405,
              "residual": -11.068954036346405,
              "abs_error": 11.068954036346405,
              "pct_error": 73.79302690897603,
              "rank": 5
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 39.177009652914094,
              "residual": 10.822990347085906,
              "abs_error": 10.822990347085906,
              "pct_error": 21.64598069417181,
              "rank": 6
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 40.368420229738874,
              "residual": 9.631579770261126,
              "abs_error": 9.631579770261126,
              "pct_error": 19.263159540522253,
              "rank": 7
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 39.09114843656147,
              "residual": 9.408851563438532,
              "abs_error": 9.408851563438532,
              "pct_error": 19.399693945234088,
              "rank": 8
            },
            {
              "index": 381,
              "actual": 10.9,
              "predicted": 18.80399342797562,
              "residual": -7.903993427975619,
              "abs_error": 7.903993427975619,
              "pct_error": 72.51370117408825,
              "rank": 9
            },
            {
              "index": 395,
              "actual": 13.1,
              "predicted": 20.516508939935456,
              "residual": -7.416508939935456,
              "abs_error": 7.416508939935456,
              "pct_error": 56.614572060575995,
              "rank": 10
            }
          ]
        },
        {
          "k": 10,
          "features": [
            "RM",
            "LSTAT",
            "DIS",
            "PTRATIO",
            "B",
            "NOX",
            "RAD",
            "CRIM",
            "CHAS",
            "TAX"
          ],
          "rmse": 5.049773519493306,
          "mae": 3.265642056805367,
          "mse": 25.500212598175814,
          "r2": 0.6522719611720149,
          "adj_r2": 0.6140600887733352,
          "cv_rmse": 4.93474060038346,
          "cv_r2": 0.7185898301569174,
          "f_stat": 116.84236158735513,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 30.931096918952978,
              "stderr": 5.66310709362251,
              "tstat": 5.461859789617247,
              "pvalue": 8.374116866605164e-08,
              "ci_lower": 19.797322954668076,
              "ci_upper": 42.06487088323788,
              "vif": null
            },
            {
              "feature": "RM",
              "coef": 4.463746112944348,
              "stderr": 0.4474429949351567,
              "tstat": 9.976122463580488,
              "pvalue": 0.0,
              "ci_lower": 3.5840648557912087,
              "ci_upper": 5.343427370097486,
              "vif": 1.8066696516255714
            },
            {
              "feature": "LSTAT",
              "coef": -0.5102347064892861,
              "stderr": 0.05304999342227541,
              "tstat": -9.61799754484119,
              "pvalue": 0.0,
              "ci_lower": -0.6145319810782781,
              "ci_upper": -0.4059374319002942,
              "vif": 2.551020818165935
            },
            {
              "feature": "DIS",
              "coef": -1.234960057958716,
              "stderr": 0.17933983366848438,
              "tstat": -6.886144771615996,
              "pvalue": 2.2814194977627267e-11,
              "ci_lower": -1.5875455093456352,
              "ci_upper": -0.882374606571797,
              "vif": 2.619209863656011
            },
            {
              "feature": "PTRATIO",
              "coef": -1.0122419941039538,
              "stderr": 0.1326307633230138,
              "tstat": -7.632030222420592,
              "pvalue": 1.7674750552032492e-13,
              "ci_lower": -1.272996543706585,
              "ci_upper": -0.7514874445013225,
              "vif": 1.5665696655442762
            },
            {
              "feature": "B",
              "coef": 0.012273681069627784,
              "stderr": 0.002961700636640548,
              "tstat": 4.144132907217051,
              "pvalue": 4.179931929404468e-05,
              "ci_lower": 0.006450922486204714,
              "ci_upper": 0.018096439653050855,
              "vif": 1.3186011284107795
            },
            {
              "feature": "NOX",
              "coef": -17.953928704282898,
              "stderr": 3.9099451476110687,
              "tstat": -4.59186204063567,
              "pvalue": 5.922710846872903e-06,
              "ci_lower": -25.640953647759268,
              "ci_upper": -10.26690376080653,
              "vif": 3.7973870197322683
            },
            {
              "feature": "RAD",
              "coef": 0.23811625755891536,
              "stderr": 0.07321115824994434,
              "tstat": 3.2524585493645892,
              "pvalue": 0.0012429553931014858,
              "ci_lower": 0.09418175762047823,
              "ci_upper": 0.3820507574973525,
              "vif": 7.090392330230745
            },
            {
              "feature": "CRIM",
              "coef": -0.1085679644100916,
              "stderr": 0.034690566295373336,
              "tstat": -3.129610611878978,
              "pvalue": 0.0018810563107505285,
              "ci_lower": -0.17677026350852937,
              "ci_upper": -0.04036566531165385,
              "vif": 1.6995063324698794
            },
            {
              "feature": "CHAS",
              "coef": 2.875249021755245,
              "stderr": 0.9511197149026643,
              "tstat": 3.023014849449832,
              "pvalue": 0.0026667332859007242,
              "ci_lower": 1.0053299572496925,
              "ci_upper": 4.745168086260797,
              "vif": 1.0833550411756299
            },
            {
              "feature": "TAX",
              "coef": -0.007795494795684199,
              "stderr": 0.0037812420263352384,
              "tstat": -2.061622805784679,
              "pvalue": 0.03990076416046895,
              "ci_lower": -0.015229487006935398,
              "ci_upper": -0.0003615025844329999,
              "vif": 7.078572054426567
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 24.60986386041946,
              "residual": 25.39013613958054,
              "abs_error": 25.39013613958054,
              "pct_error": 50.78027227916109,
              "rank": 1
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": -0.19816313683150533,
              "residual": 18.098163136831502,
              "abs_error": 18.098163136831502,
              "pct_error": 101.1070566303436,
              "rank": 2
            },
            {
              "index": 365,
              "actual": 27.5,
              "predicted": 12.245022851738357,
              "residual": 15.254977148261643,
              "abs_error": 15.254977148261643,
              "pct_error": 55.47264417549689,
              "rank": 3
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -6.063057964896529,
              "residual": 13.06305796489653,
              "abs_error": 13.06305796489653,
              "pct_error": 186.61511378423614,
              "rank": 4
            },
            {
              "index": 375,
              "actual": 15.0,
              "predicted": 25.862460015043872,
              "residual": -10.862460015043872,
              "abs_error": 10.862460015043872,
              "pct_error": 72.41640010029248,
              "rank": 5
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 39.24107728226526,
              "residual": 10.758922717734741,
              "abs_error": 10.758922717734741,
              "pct_error": 21.517845435469482,
              "rank": 6
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 40.64982381918632,
              "residual": 9.350176180813683,
              "abs_error": 9.350176180813683,
              "pct_error": 18.700352361627367,
              "rank": 7
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 39.39310819934783,
              "residual": 9.106891800652171,
              "abs_error": 9.106891800652171,
              "pct_error": 18.777096496190044,
              "rank": 8
            },
            {
              "index": 381,
              "actual": 10.9,
              "predicted": 18.69100522364701,
              "residual": -7.79100522364701,
              "abs_error": 7.79100522364701,
              "pct_error": 71.47711214355054,
              "rank": 9
            },
            {
              "index": 395,
              "actual": 13.1,
              "predicted": 20.447916745121326,
              "residual": -7.347916745121326,
              "abs_error": 7.347916745121326,
              "pct_error": 56.090967520010125,
              "rank": 10
            }
          ]
        },
        {
          "k": 11,
          "features": [
            "RM",
            "LSTAT",
            "DIS",
            "PTRATIO",
            "B",
            "NOX",
            "RAD",
            "CRIM",
            "CHAS",
            "TAX",
            "ZN"
          ],
          "rmse": 4.90799835920307,
          "mae": 3.1496942855295664,
          "mse": 24.088447893940028,
          "r2": 0.6715231799608967,
          "adj_r2": 0.6313760130672286,
          "cv_rmse": 4.919476390862625,
          "cv_r2": 0.7198457918911461,
          "f_stat": 107.22111805286998,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 30.328797720051277,
              "stderr": 5.654166806962448,
              "tstat": 5.363972934563036,
              "pvalue": 1.3947658827895282e-07,
              "ci_lower": 19.21251292892444,
              "ci_upper": 41.445082511178114,
              "vif": null
            },
            {
              "feature": "RM",
              "coef": 4.362608488929881,
              "stderr": 0.4492624388783761,
              "tstat": 9.710601446721261,
              "pvalue": 0.0,
              "ci_lower": 3.4793432109443514,
              "ci_upper": 5.245873766915412,
              "vif": 1.8330675749381369
            },
            {
              "feature": "LSTAT",
              "coef": -0.5134809376946169,
              "stderr": 0.05290908811723856,
              "tstat": -9.704966688460413,
              "pvalue": 0.0,
              "ci_lower": -0.6175020095218235,
              "ci_upper": -0.4094598658674102,
              "vif": 2.553752582163273
            },
            {
              "feature": "DIS",
              "coef": -1.4407913663875993,
              "stderr": 0.20975434225497167,
              "tstat": -6.868946553851136,
              "pvalue": 2.5491164734603444e-11,
              "ci_lower": -1.8531755574253579,
              "ci_upper": -1.0284071753498407,
              "vif": 3.605899549660099
            },
            {
              "feature": "PTRATIO",
              "coef": -0.9129851823807827,
              "stderr": 0.14240231776245033,
              "tstat": -6.411308444457955,
              "pvalue": 4.1519587767879784e-10,
              "ci_lower": -1.192952996067262,
              "ci_upper": -0.6330173686943035,
              "vif": 1.8174824344111313
            },
            {
              "feature": "B",
              "coef": 0.012202567953638166,
              "stderr": 0.002952497185981916,
              "tstat": 4.132965142718651,
              "pvalue": 4.3816254131856525e-05,
              "ci_lower": 0.006397857784146779,
              "ci_upper": 0.018007278123129553,
              "vif": 1.3188185343927656
            },
            {
              "feature": "NOX",
              "coef": -16.947997767582184,
              "stderr": 3.934189158861934,
              "tstat": -4.307875672273173,
              "pvalue": 2.0862579873881515e-05,
              "ci_lower": -24.68274783866608,
              "ci_upper": -9.213247696498286,
              "vif": 3.8692691283231064
            },
            {
              "feature": "RAD",
              "coef": 0.2538764613103705,
              "stderr": 0.07345962955091564,
              "tstat": 3.455999749282782,
              "pvalue": 0.0006082275285892447,
              "ci_lower": 0.10945232410007283,
              "ci_upper": 0.3983005985206682,
              "vif": 7.184360401599096
            },
            {
              "feature": "CRIM",
              "coef": -0.11390331530658143,
              "stderr": 0.03469667823370319,
              "tstat": -3.2828305505032342,
              "pvalue": 0.001119937046194508,
              "ci_lower": -0.18211816812574377,
              "ci_upper": -0.045688462487419104,
              "vif": 1.7110028665184172
            },
            {
              "feature": "CHAS",
              "coef": 2.8311181819115077,
              "stderr": 0.9483777799510575,
              "tstat": 2.9852219671970928,
              "pvalue": 0.0030113927706529875,
              "ci_lower": 0.9665751198761263,
              "ci_upper": 4.695661243946889,
              "vif": 1.084022041081177
            },
            {
              "feature": "TAX",
              "coef": -0.009663409900027453,
              "stderr": 0.003898486647710848,
              "tstat": -2.4787592656503543,
              "pvalue": 0.013603907847143493,
              "ci_lower": -0.01732796761647032,
              "ci_upper": -0.0019988521835845856,
              "vif": 7.572577708122083
            },
            {
              "feature": "ZN",
              "coef": 0.029591622898598388,
              "stderr": 0.01577436157632665,
              "tstat": 1.8759315713295157,
              "pvalue": 0.06140758327682905,
              "ci_lower": -0.0014213099821099792,
              "ci_upper": 0.060604555779306755,
              "vif": 2.4067510346005188
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 24.80596704548008,
              "residual": 25.19403295451992,
              "abs_error": 25.19403295451992,
              "pct_error": 50.38806590903984,
              "rank": 1
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": -0.06261033212953393,
              "residual": 17.962610332129533,
              "abs_error": 17.962610332129533,
              "pct_error": 100.34977839178512,
              "rank": 2
            },
            {
              "index": 365,
              "actual": 27.5,
              "predicted": 12.739340793352888,
              "residual": 14.760659206647112,
              "abs_error": 14.760659206647112,
              "pct_error": 53.675124387807685,
              "rank": 3
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -5.997790676239859,
              "residual": 12.997790676239859,
              "abs_error": 12.997790676239859,
              "pct_error": 185.6827239462837,
              "rank": 4
            },
            {
              "index": 375,
              "actual": 15.0,
              "predicted": 25.887310733915704,
              "residual": -10.887310733915704,
              "abs_error": 10.887310733915704,
              "pct_error": 72.58207155943803,
              "rank": 5
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 40.44980505951515,
              "residual": 9.55019494048485,
              "abs_error": 9.55019494048485,
              "pct_error": 19.1003898809697,
              "rank": 6
            },
            {
              "index": 381,
              "actual": 10.9,
              "predicted": 18.74689119386612,
              "residual": -7.846891193866119,
              "abs_error": 7.846891193866119,
              "pct_error": 71.98982746666164,
              "rank": 7
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 42.47778575398432,
              "residual": 7.522214246015679,
              "abs_error": 7.522214246015679,
              "pct_error": 15.044428492031358,
              "rank": 8
            },
            {
              "index": 395,
              "actual": 13.1,
              "predicted": 20.54230674138241,
              "residual": -7.442306741382412,
              "abs_error": 7.442306741382412,
              "pct_error": 56.81150184261383,
              "rank": 9
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 41.23611838320587,
              "residual": 7.26388161679413,
              "abs_error": 7.26388161679413,
              "pct_error": 14.977075498544599,
              "rank": 10
            }
          ]
        },
        {
          "k": 12,
          "features": [
            "RM",
            "LSTAT",
            "DIS",
            "PTRATIO",
            "B",
            "NOX",
            "RAD",
            "CRIM",
            "CHAS",
            "TAX",
            "ZN",
            "INDUS"
          ],
          "rmse": 4.917703495184462,
          "mae": 3.176587970762938,
          "mse": 24.183807666549473,
          "r2": 0.6702228274016817,
          "adj_r2": 0.6257584895232569,
          "cv_rmse": 4.928822658974351,
          "cv_r2": 0.7187013739482595,
          "f_stat": 98.1507346774615,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 30.397987924641384,
              "stderr": 5.660116423235814,
              "tstat": 5.370558775054888,
              "pvalue": 1.34992450773197e-07,
              "ci_lower": 19.26991784607996,
              "ci_upper": 41.526058003202806,
              "vif": null
            },
            {
              "feature": "RM",
              "coef": 4.397481338859621,
              "stderr": 0.45353446035003897,
              "tstat": 9.696024719853998,
              "pvalue": 0.0,
              "ci_lower": 3.5058100585483074,
              "ci_upper": 5.289152619170935,
              "vif": 1.8649757224966386
            },
            {
              "feature": "LSTAT",
              "coef": -0.5157500490258942,
              "stderr": 0.05309381235592373,
              "tstat": -9.71393889684306,
              "pvalue": 0.0,
              "ci_lower": -0.6201351217797403,
              "ci_upper": -0.41136497627204804,
              "vif": 2.567322534751777
            },
            {
              "feature": "DIS",
              "coef": -1.4166817889337995,
              "stderr": 0.21389849194515848,
              "tstat": -6.6231499626328505,
              "pvalue": 1.1651479780994123e-10,
              "ci_lower": -1.8372168504199653,
              "ci_upper": -0.9961467274476337,
              "vif": 3.7435315295558693
            },
            {
              "feature": "PTRATIO",
              "coef": -0.921273759756497,
              "stderr": 0.14321710563391538,
              "tstat": -6.432707571338666,
              "pvalue": 3.6653657886631663e-10,
              "ci_lower": -1.2028457043547371,
              "ci_upper": -0.6397018151582566,
              "vif": 1.8352711484569857
            },
            {
              "feature": "B",
              "coef": 0.012294274646031056,
              "stderr": 0.0029590800566325305,
              "tstat": 4.154762429787754,
              "pvalue": 4.002187465457219e-05,
              "ci_lower": 0.006476576249739885,
              "ci_upper": 0.018111973042322226,
              "vif": 1.3224943741667357
            },
            {
              "feature": "NOX",
              "coef": -17.639537561256795,
              "stderr": 4.109457328307918,
              "tstat": -4.292425045941512,
              "pvalue": 2.231148361264701e-05,
              "ci_lower": -25.718934823570507,
              "ci_upper": -9.560140298943082,
              "vif": 4.21465237789395
            },
            {
              "feature": "RAD",
              "coef": 0.26458421133133325,
              "stderr": 0.07574388991422229,
              "tstat": 3.493142636732376,
              "pvalue": 0.0005319472877212128,
              "ci_lower": 0.11566796085844239,
              "ci_upper": 0.4135004618042241,
              "vif": 7.6253573108873045
            },
            {
              "feature": "CRIM",
              "coef": -0.11350613527469158,
              "stderr": 0.034732249785839615,
              "tstat": -3.2680329081638755,
              "pvalue": 0.0011787588002960536,
              "ci_lower": -0.18179146382663763,
              "ci_upper": -0.04522080672274553,
              "vif": 1.7116506027766853
            },
            {
              "feature": "CHAS",
              "coef": 2.77291026074352,
              "stderr": 0.9543213730863706,
              "tstat": 2.9056357103012913,
              "pvalue": 0.0038734573596348465,
              "ci_lower": 0.8966670312618692,
              "ci_upper": 4.649153490225171,
              "vif": 1.0958194873067029
            },
            {
              "feature": "TAX",
              "coef": -0.01063918696619437,
              "stderr": 0.004240159729651397,
              "tstat": -2.5091476841767624,
              "pvalue": 0.012505867758066502,
              "ci_lower": -0.018975551642749888,
              "ci_upper": -0.002302822289638849,
              "vif": 8.943147972583946
            },
            {
              "feature": "ZN",
              "coef": 0.030752185082847112,
              "stderr": 0.01591050971154337,
              "tstat": 1.9328221182339516,
              "pvalue": 0.053979932538889,
              "ci_lower": -0.0005286674326330787,
              "ci_upper": 0.062033037598327304,
              "vif": 2.444387850159094
            },
            {
              "feature": "INDUS",
              "coef": 0.03954259048361561,
              "stderr": 0.0672670174350008,
              "tstat": 0.5878451578713904,
              "pvalue": 0.5569755776694092,
              "ci_lower": -0.09270770757024752,
              "ci_upper": 0.17179288853747873,
              "vif": 3.8746419210235126
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 24.85478254126697,
              "residual": 25.14521745873303,
              "abs_error": 25.14521745873303,
              "pct_error": 50.29043491746605,
              "rank": 1
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": -0.11988163048504397,
              "residual": 18.01988163048504,
              "abs_error": 18.01988163048504,
              "pct_error": 100.66972977924604,
              "rank": 2
            },
            {
              "index": 365,
              "actual": 27.5,
              "predicted": 12.64867310593781,
              "residual": 14.85132689406219,
              "abs_error": 14.85132689406219,
              "pct_error": 54.00482506931705,
              "rank": 3
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -6.112505889136194,
              "residual": 13.112505889136195,
              "abs_error": 13.112505889136195,
              "pct_error": 187.32151270194564,
              "rank": 4
            },
            {
              "index": 375,
              "actual": 15.0,
              "predicted": 25.94833829737043,
              "residual": -10.94833829737043,
              "abs_error": 10.94833829737043,
              "pct_error": 72.98892198246953,
              "rank": 5
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 40.453076355769085,
              "residual": 9.546923644230915,
              "abs_error": 9.546923644230915,
              "pct_error": 19.09384728846183,
              "rank": 6
            },
            {
              "index": 381,
              "actual": 10.9,
              "predicted": 18.76720888300413,
              "residual": -7.86720888300413,
              "abs_error": 7.86720888300413,
              "pct_error": 72.17622828444156,
              "rank": 7
            },
            {
              "index": 395,
              "actual": 13.1,
              "predicted": 20.555500200199006,
              "residual": -7.4555002001990065,
              "abs_error": 7.4555002001990065,
              "pct_error": 56.91221526869471,
              "rank": 8
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 42.61071893143647,
              "residual": 7.389281068563527,
              "abs_error": 7.389281068563527,
              "pct_error": 14.778562137127055,
              "rank": 9
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 41.360839768878975,
              "residual": 7.139160231121025,
              "abs_error": 7.139160231121025,
              "pct_error": 14.719918002311392,
              "rank": 10
            }
          ]
        },
        {
          "k": 13,
          "features": [
            "RM",
            "LSTAT",
            "DIS",
            "PTRATIO",
            "B",
            "NOX",
            "RAD",
            "CRIM",
            "CHAS",
            "TAX",
            "ZN",
            "INDUS",
            "AGE"
          ],
          "rmse": 4.928602182665311,
          "mae": 3.1890919658879437,
          "mse": 24.291119474973268,
          "r2": 0.6687594935356354,
          "adj_r2": 0.6198262368988543,
          "cv_rmse": 4.931367360873696,
          "cv_r2": 0.718478418719215,
          "f_stat": 90.4266165387097,
          "f_pvalue": 1.1102230246251565e-16,
          "coefficients": [
            {
              "feature": "Intercept (\u03b2\u2080)",
              "coef": 30.246750993924326,
              "stderr": 5.676806440074056,
              "tstat": 5.328127938343049,
              "pvalue": 1.6816101244820914e-07,
              "ci_lower": 19.085778659588343,
              "ci_upper": 41.40772332826031,
              "vif": null
            },
            {
              "feature": "RM",
              "coef": 4.438835199513065,
              "stderr": 0.46397966610535124,
              "tstat": 9.566874420969093,
              "pvalue": 0.0,
              "ci_lower": 3.526620863554709,
              "ci_upper": 5.351049535471421,
              "vif": 1.947808749583758
            },
            {
              "feature": "LSTAT",
              "coef": -0.5085714244487916,
              "stderr": 0.05568391699894731,
              "tstat": -9.133183365286714,
              "pvalue": 0.0,
              "ci_lower": -0.6180496431714656,
              "ci_upper": -0.3990932057261175,
              "vif": 2.818045379538575
            },
            {
              "feature": "DIS",
              "coef": -1.4478653685308065,
              "stderr": 0.22595036782635355,
              "tstat": -6.4078911774266905,
              "pvalue": 4.258553509828289e-10,
              "ci_lower": -1.8920985533089145,
              "ci_upper": -1.0036321837526985,
              "vif": 4.16857837354429
            },
            {
              "feature": "PTRATIO",
              "coef": -0.9154562404680776,
              "stderr": 0.14399674435894216,
              "tstat": -6.357478737061655,
              "pvalue": 5.737761377133666e-10,
              "ci_lower": -1.19856324737241,
              "ci_upper": -0.6323492335637453,
              "vif": 1.8514484070670412
            },
            {
              "feature": "B",
              "coef": 0.012351334729968855,
              "stderr": 0.0029651025885100817,
              "tstat": 4.165567416733197,
              "pvalue": 3.8269380584043944e-05,
              "ci_lower": 0.006521749326948259,
              "ci_upper": 0.01818092013298945,
              "vif": 1.3251213980906684
            },
            {
              "feature": "NOX",
              "coef": -17.20263339178167,
              "stderr": 4.236119087166878,
              "tstat": -4.060941875759875,
              "pvalue": 5.909342124965633e-05,
              "ci_lower": -25.531120268323008,
              "ci_upper": -8.874146515240334,
              "vif": 4.469150159170634
            },
            {
              "feature": "RAD",
              "coef": 0.26242973558507887,
              "stderr": 0.0759864635496675,
              "tstat": 3.453637968209237,
              "pvalue": 0.0006137380080797339,
              "ci_lower": 0.11303538395190871,
              "ci_upper": 0.41182408721824904,
              "vif": 7.658315779148448
            },
            {
              "feature": "CRIM",
              "coef": -0.11305592398537732,
              "stderr": 0.0347840248791694,
              "tstat": -3.250225480751696,
              "pvalue": 0.0012532800108635556,
              "ci_lower": -0.18144358938342456,
              "ci_upper": -0.04466825858733009,
              "vif": 1.713186990612851
            },
            {
              "feature": "CHAS",
              "coef": 2.784438203507954,
              "stderr": 0.9556875964881927,
              "tstat": 2.9135443566912036,
              "pvalue": 0.0037792729194365826,
              "ci_lower": 0.9054939524981165,
              "ci_upper": 4.663382454517791,
              "vif": 1.0966737120634569
            },
            {
              "feature": "TAX",
              "coef": -0.010646786275307463,
              "stderr": 0.004244612368584216,
              "tstat": -2.508305906590637,
              "pvalue": 0.01253626064489577,
              "ci_lower": -0.01899197149799241,
              "ci_upper": -0.0023016010526225143,
              "vif": 8.943301431814218
            },
            {
              "feature": "ZN",
              "coef": 0.030110464145647067,
              "stderr": 0.015996138029708062,
              "tstat": 1.882358359856976,
              "pvalue": 0.060531636384121734,
              "ci_lower": -0.0013389882692678157,
              "ci_upper": 0.06155991656056195,
              "vif": 2.465630718663123
            },
            {
              "feature": "INDUS",
              "coef": 0.040380720413338275,
              "stderr": 0.06736499472046824,
              "tstat": 0.599431805508165,
              "pvalue": 0.5492330385284392,
              "ci_lower": -0.0920632602498508,
              "ci_upper": 0.17282470107652737,
              "vif": 3.877855350260283
            },
            {
              "feature": "AGE",
              "coef": -0.006296362210982953,
              "stderr": 0.014568042572182121,
              "tstat": -0.43220372124707707,
              "pvalue": 0.6658322215808119,
              "ci_lower": -0.03493808565706761,
              "ci_upper": 0.022345361235101703,
              "vif": 2.9899478376482787
            }
          ],
          "outliers": [
            {
              "index": 371,
              "actual": 50.0,
              "predicted": 24.739571606519934,
              "residual": 25.260428393480066,
              "abs_error": 25.260428393480066,
              "pct_error": 50.52085678696013,
              "rank": 1
            },
            {
              "index": 412,
              "actual": 17.9,
              "predicted": -0.16423699568589523,
              "residual": 18.064236995685892,
              "abs_error": 18.064236995685892,
              "pct_error": 100.91752511556365,
              "rank": 2
            },
            {
              "index": 365,
              "actual": 27.5,
              "predicted": 12.503956484182483,
              "residual": 14.996043515817517,
              "abs_error": 14.996043515817517,
              "pct_error": 54.53106733024552,
              "rank": 3
            },
            {
              "index": 414,
              "actual": 7.0,
              "predicted": -6.088421842192963,
              "residual": 13.088421842192963,
              "abs_error": 13.088421842192963,
              "pct_error": 186.9774548884709,
              "rank": 4
            },
            {
              "index": 375,
              "actual": 15.0,
              "predicted": 25.939095624450136,
              "residual": -10.939095624450136,
              "abs_error": 10.939095624450136,
              "pct_error": 72.92730416300091,
              "rank": 5
            },
            {
              "index": 195,
              "actual": 50.0,
              "predicted": 40.500339660507954,
              "residual": 9.499660339492046,
              "abs_error": 9.499660339492046,
              "pct_error": 18.99932067898409,
              "rank": 6
            },
            {
              "index": 381,
              "actual": 10.9,
              "predicted": 18.76548694981544,
              "residual": -7.865486949815439,
              "abs_error": 7.865486949815439,
              "pct_error": 72.16043073225174,
              "rank": 7
            },
            {
              "index": 395,
              "actual": 13.1,
              "predicted": 20.523848928753658,
              "residual": -7.423848928753658,
              "abs_error": 7.423848928753658,
              "pct_error": 56.67060250956991,
              "rank": 8
            },
            {
              "index": 204,
              "actual": 50.0,
              "predicted": 42.672511611019786,
              "residual": 7.327488388980214,
              "abs_error": 7.327488388980214,
              "pct_error": 14.654976777960426,
              "rank": 9
            },
            {
              "index": 203,
              "actual": 48.5,
              "predicted": 41.41377225132507,
              "residual": 7.086227748674929,
              "abs_error": 7.086227748674929,
              "pct_error": 14.610778863247276,
              "rank": 10
            }
          ]
        }
      ]
    },
    "metadata": {
      "n_samples_total": 506,
      "n_train": 404,
      "n_test": 102,
      "test_size": 0.2,
      "cv_folds": 5,
      "random_state": 42,
      "all_features": [
        "CRIM",
        "ZN",
        "INDUS",
        "CHAS",
        "NOX",
        "RM",
        "AGE",
        "DIS",
        "RAD",
        "TAX",
        "PTRATIO",
        "B",
        "LSTAT"
      ],
      "sweet_spot": {
        "k": 7,
        "method": "Exhaustive Feature Selection",
        "features": [
          "LSTAT",
          "RM",
          "DIS",
          "RAD",
          "PTRATIO",
          "NOX",
          "TAX"
        ],
        "cv_rmse": 5.124861990818536,
        "test_rmse": 4.899540050044219,
        "test_r2": 0.6726543801851012
      }
    },
    "final_model_comparison": [
      {
        "Method": "Baseline OLS",
        "Optimal Number of Features": 11,
        "Selected Features": "RM, LSTAT, DIS, PTRATIO, B, NOX, RAD, CRIM, CHAS, TAX, ZN",
        "MAE": 3.1496942855295664,
        "MSE": 24.088447893940028,
        "RMSE": 4.90799835920307,
        "R\u00b2": 0.6715231799608967
      },
      {
        "Method": "Pearson Correlation",
        "Optimal Number of Features": 13,
        "Selected Features": "LSTAT, RM, PTRATIO, INDUS, TAX, NOX, RAD, CRIM, AGE, B, ZN, DIS, CHAS",
        "MAE": 3.189091965887835,
        "MSE": 24.29111947497358,
        "RMSE": 4.928602182665343,
        "R\u00b2": 0.6687594935356311
      },
      {
        "Method": "F-test",
        "Optimal Number of Features": 13,
        "Selected Features": "LSTAT, RM, PTRATIO, INDUS, TAX, NOX, RAD, CRIM, AGE, B, ZN, DIS, CHAS",
        "MAE": 3.189091965887835,
        "MSE": 24.29111947497358,
        "RMSE": 4.928602182665343,
        "R\u00b2": 0.6687594935356311
      },
      {
        "Method": "LassoCV",
        "Optimal Number of Features": 7,
        "Selected Features": "LSTAT, RM, DIS, RAD, PTRATIO, NOX, TAX",
        "MAE": 3.1652297220458623,
        "MSE": 24.00549270198731,
        "RMSE": 4.899540050044219,
        "R\u00b2": 0.6726543801851012
      },
      {
        "Method": "RFECV",
        "Optimal Number of Features": 7,
        "Selected Features": "LSTAT, RM, PTRATIO, DIS, NOX, TAX, RAD",
        "MAE": 3.1652297220458636,
        "MSE": 24.00549270198737,
        "RMSE": 4.899540050044226,
        "R\u00b2": 0.6726543801851004
      },
      {
        "Method": "Exhaustive Feature Selection",
        "Optimal Number of Features": 13,
        "Selected Features": "CRIM, ZN, INDUS, CHAS, NOX, RM, AGE, DIS, RAD, TAX, PTRATIO, B, LSTAT",
        "MAE": 3.189091965887852,
        "MSE": 24.291119474973595,
        "RMSE": 4.928602182665344,
        "R\u00b2": 0.6687594935356309
      }
    ]
  }
};

// Backward compatibility default pointers (Defaults to 50 Startups)
window.CURRENT_DATASET_KEY = '50_startups';
window.MODEL_DATA = window.DATASETS['50_startups'].model_data;
window.METADATA = window.DATASETS['50_startups'].metadata;
window.FINAL_MODEL_COMPARISON = window.DATASETS['50_startups'].final_model_comparison;
