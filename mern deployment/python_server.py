import faiss
import numpy as np
import pandas as pd
from sentence_transformers import SentenceTransformer
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_credentials = True,
    allow_methods = ['GET', 'POST'],
    allow_headers = ["*"]
)

open_from = './prediction'
model = SentenceTransformer(f"{open_from}/model.pkl")
embs = np.load(f"{open_from}/embs.npy")
data = pd.read_csv(f"{open_from}/data.csv")
indices = faiss.IndexFlatL2(embs.shape[1])
indices.add(embs)

def load_all():
    return data.head(101).to_dict(orient='records')

def find_match(state, n=5):
    emb = model.encode([state])
    _, idx = indices.search(emb, n)
    res = []
    for i in idx[0]:
        r = data.iloc[i]
        res.append({
            'Job Title': r['Job Title'],
            'Job Description': r['Job Description'],
        })
    return res

@app.get("/load_all/")
async def root_get():
    try:
        search_opts = load_all()
        return {"data": search_opts}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

class SearchReq(BaseModel):
    toSearch: str

@app.post('/search/')
async def get_post(req: SearchReq):
    try:
        search_res = find_match(req.toSearch)
        return {"data": search_res}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# uvicorn python_server:app --reload