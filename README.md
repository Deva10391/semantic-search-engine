# Job Matcher

Semantic job search system. Model trained in a script, served via FastAPI, consumed by a React/Redux frontend.

## 1. Open-source Utilities

* FastAPI — serves the recommendation model through an API
* Uvicorn — runs the FastAPI application
* Pydantic — validates API request data
* CORS Middleware (`fastapi.middleware.cors`) — allows the frontend to call the API
* kagglehub — pulls the Jobs and Job Description dataset from Kaggle
* pandas — data loading and manipulation
* numpy — numerical operations, loading saved embeddings
* sentence-transformers — `all-MiniLM-L6-v2` model, encodes job descriptions into vector embeddings
* faiss — `IndexFlatL2`, indexes embeddings and performs nearest-neighbor search
* Express, cors (Node) — Node-side server
* React, Redux Toolkit, react-redux — frontend UI and state management
* react-scripts (CRA) — frontend development and build tooling

## 2. How They Work Together
Training step loads data → SentenceTransformer encodes job descriptions into embeddings → embeddings indexed with FAISS `IndexFlatL2` → model, embeddings, and data saved to disk → FastAPI (`python_server.py`) loads the saved model/embeddings/data at startup, exposes `/load_all/` and `/search/` endpoints → React/Redux frontend calls these and renders results.

## 3. Problem / Solution / Speciality

* Problem: match a free-text query (e.g. "part time") to relevant jobs without keyword-only search.
* Solution: embed job descriptions into a vector space and retrieve nearest neighbors by semantic similarity.
* Speciality: uses dense sentence embeddings + FAISS similarity search instead of keyword/TF-IDF matching — captures meaning, not just word overlap.

## 4. Simplified Working
Every job description is placed on a "map" based on its meaning. A search query is placed on the same map. The system returns the jobs closest to the query on that map.

## 5. Setup Process

### Backend

1. Install the required Python libraries:
```bash
pip install fastapi uvicorn pydantic kagglehub pandas numpy sentence-transformers faiss-cpu
```
2. Run the training script end-to-end — this downloads the dataset via `kagglehub`, encodes embeddings, builds the FAISS index, and saves output to `./prediction/`.
3. **Known issue:** the current code calls `SentenceTransformer(f"{open_from}/model.pkl")` and `model.save(f"{save_to}/model.pkl")`. `SentenceTransformer.save()` writes a directory, not a `.pkl` file — loading will fail as written. Save/load to a directory path instead (e.g. `./prediction/model`), without the `.pkl` extension.
4. The trained model is served through `python_server.py` using FastAPI.
5. Start the API:
```bash
   cd "mern deployment"
   npm run dev
   ```

   or

   ```bash
   cd "mern deployment"
   uvicorn python_server:app --reload
   ```

   The FastAPI backend runs on `http://127.0.0.1:8000`.

**Frontend**

   ```bash
   cd "mern deployment/my-app"
   npm install
   npm start
   ```
it runs on `localhost:3000`, calls the backend for job search.
4. In `my-app/src/Redux/Slice.js`, comment out the Node backend port and uncomment/use the Python FastAPI port (`8000`).

### Production

1. `npm run build` (frontend) → serve static build from the backend or a static host.
2. Deploy FastAPI service (e.g. Uvicorn + reverse proxy) with the saved model/embeddings/data bundled alongside it.