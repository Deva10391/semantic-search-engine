import sys
import json
import faiss
import numpy as np
import pandas as pd
from sentence_transformers import SentenceTransformer

open_from = './prediction'

model = SentenceTransformer(f"{open_from}/model.pkl")
embs = np.load(f"{open_from}/embs.npy")
data = pd.read_csv(f"{open_from}/data.csv")
indices = faiss.IndexFlatL2(embs.shape[1])
indices.add(embs)

def find_match(state, n=5):
    emb = model.encode([state])
    _, idx = indices.search(emb, 5)
    res = []
    for i in idx[0]:
        r = data.iloc[i]
        res.append({
            'Job Title': r['Job Title'],
            'Job Description': r['Job Description'],
        })
    return res

if __name__ == "__main__":
    for line in sys.stdin:
        search_val = line.strip()
        if not search_val: continue
        res = find_match(search_val)
        print(json.dumps(res), flush=True)