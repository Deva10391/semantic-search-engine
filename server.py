import re
import os
import kagglehub

import pandas as pd

from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
# from sentence_transformers import SentenceTransformer, util

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def removal(text):
    return re.sub(
        r"\s+", " ",
        re.sub(
            r"[^a-z\s]", " ",
            re.sub(
                r"http\S+|www\S+|<.*?>", " ",
                text.lower()
    ))).strip()
path = kagglehub.dataset_download("mantunes/semantic-corpus-from-web-search-snippets")

data_file = os.path.join(path, "dataset", "dataset", "xbox.csv")
lines = []
with open(data_file, "r") as f:
    lines = f.readlines()
allowed = set("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789")
filtered = [line.strip() for line in lines if any(ch in allowed for ch in line)]
df = pd.DataFrame(filtered, columns=['text'])
text = df['text'].apply(removal)

# model = SentenceTransformer('./hit_model')
# def get_hits(text, query, model=model):
#     text_embs = model.encode(
#         text,
#         convert_to_tensor=True
#     )
#     vec = model.encode(
#         query,
#         convert_to_tensor=True,
#     )
#     return util.semantic_search(
#         vec,
#         text_embs,
#         top_k=3,
#     )

class Req(BaseModel):
    search: str

@app.get('/get_initial_entities')
def read_root():
    result = {
        "message": text.to_list()
    }
    return result

@app.post('/get_search_results')
def semantic_search(search_req: Req):
    result = search_req.search
    return {
        "message": [f"Hello\n{result} !"]
    }

# cd "semantic search engine"

# uvicorn server:app --reload
