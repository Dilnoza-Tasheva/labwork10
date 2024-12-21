import express from "express";
import fileDb from "../fileDb";
import {imagesUpload} from "../multer";
import {NewsWithoutId} from "../types";

const newsRouter = express.Router();

newsRouter.get('/', async (req, res) => {
    const news = await fileDb.getNews();
    res.send(news);
});

newsRouter.get('/:id', async (req, res) => {
    const news = await fileDb.getNewsById(req.params.id);
    res.send(news);
});

newsRouter.post('/', imagesUpload.single('image'), async (req, res) => {
    if (!req.body.title || !req.body.content) {
        res.status(400).send({error: 'Please provide the title and content for the news'});
        return;
    }
    const news: NewsWithoutId = {
        title: req.body.title,
        content: req.body.content,
        image: req.file ? 'images' + req.file.filename : null,
        publicationDate: new Date().toISOString(),
    };
    const savedNews = await fileDb.addNews(news);
    res.send(savedNews);
});

newsRouter.delete('/:id', async (req, res) => {
    const success = await fileDb.deleteNews(req.params.id);
    if (!success) res.status(404).send({ error: 'News not found' });
    res.send({ message: 'News deleted', id: req.params.id });
    return;
});

export default newsRouter;

