import express from "express";
import cors from 'cors';
import newsRouter from "./routers/news";
import commentsRouter from "./routers/comments";
import fs = require("fs");
import fileDb from "./fileDb";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/news', newsRouter);
app.use('/comments', commentsRouter);

const run = async () => {
    if (fs.existsSync('./db.json')) {
        await fileDb.init();
    } else {
        const originalDb = {news: [], comments: []};
        fs.writeFileSync('./db.json', JSON.stringify(originalDb, null, 2));
    }
    app.listen(port, () => {
        console.log(`Server started on port http://localhost:${port}`);
    });
};

run().catch(err => console.log(err));