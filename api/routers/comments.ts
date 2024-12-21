import express from "express";
import fileDb from "../fileDb";
import {CommentWithoutId} from "../types";

const commentsRouter = express.Router();

commentsRouter.get('/', async (req, res) => {
    const newsId = req.query.newsId as string | undefined;
    const comments = await fileDb.getComments(newsId);
    res.send(comments);
});

commentsRouter.post('/', async (req, res) => {
    if (!req.body.newsId || !req.body.text) {
        res.status(400).send({error: "All required fields must be filled in"});
        return;
    }
    const comment: CommentWithoutId = {
        newsId: req.body.newsId,
        author: req.body.author || 'Anonymous',
        text: req.body.text,
    };
    const savedComment =  await fileDb.addComment(comment);
    res.send(savedComment);
});

commentsRouter.delete('/:id', async (req, res) => {
    await fileDb.deleteOneComment(req.params.id);
    res.send({message: 'Comment deleted'});
    return;
})

export default commentsRouter;