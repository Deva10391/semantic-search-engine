import express from 'express';
import cors from 'cors';
import { load_all, search } from './prediction/aiml_handler.js';

const corsHandler = cors({
    origin: "*",
    methods: ['GET', 'POST'],
})

const app = express();
app.use(corsHandler);
app.use(express.json());

app.get('/load_all/', (req, res) => {
    const search_opts = load_all();
    res.status(200).json({
        data: search_opts,
    });
});

app.post('/search/', async (req, res) => {
    const opt = req.body.search;
    const search_res = await search(opt);
    console.log(`searches: ${search_res}`);
    res.status(200).json({
        data: search_res,
    }); 
});

const port = 3000
app.listen(port, () => {
    console.log(`Running at ${port}`)
});