import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('docs/model_data.js', 'r', encoding='utf-8') as f:
    text = f.read()

prefix = 'window.MODEL_DATA = '
suffix = ';\n\nwindow.METADATA ='
raw_json = text.split(prefix)[1].split(suffix)[0].strip()
data = json.loads(raw_json)

print('Algorithms in model_data.js:', list(data.keys()))
for algo, list_k in data.items():
    print(f'\n=== {algo} (length={len(list_k)}) ===')
    for item in list_k:
        k = item['k']
        rmse = item['rmse']
        r2 = item['r2']
        feats = item['features']
        print(f"  k={k}: RMSE={rmse:.2f}, R2={r2:.4f}, feats={feats}")
