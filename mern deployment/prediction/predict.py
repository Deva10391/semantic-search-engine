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

def find_match(state):
    emb = model.encode([state])
    _, idx = indices.search(emb, 1)
    res = data.iloc[idx[0][0]]
    return {
        'Job Title': res['Job Title'],
        'Job Description': res['Job Description'],
    }

if __name__ == "__main__":
    res = find_match(sys.argv[1])
    print(json.dumps(res))
    sys.stdout.flush()