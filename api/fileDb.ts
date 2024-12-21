import {CommentWithoutId, News, NewsWithoutId, OneComment} from "./types";
import {promises as fs} from "fs";

const fileName = './db.json';
let data: {news: News[]; comments: OneComment[]} = {
    news: [],
    comments: [],
};

const fileDb = {
    async init() {
        try {
            const fileContent = await fs.readFile(fileName);
            data = await JSON.parse(fileContent.toString()) as typeof data;
        } catch (e) {
            console.error(e);
        }
    },
    async getNews() {
        return data.news.map(({id, title, image, publicationDate}) => ({id, title, image, publicationDate}));
    },
    async getNewsById(id: string) {
        return data.news.find(oneNews => oneNews.id === id) || null;
    },
    async addNews(news: NewsWithoutId) {
        const id = crypto.randomUUID();
        const oneNewNews = {id, ...news};
        data.news.push(oneNewNews);
        await this.save();
        return oneNewNews;
    },
    async deleteNews(id: string) {
        const originalLength = data.news.length;
        data.news = data.news.filter(oneNews => oneNews.id !==id);
        data.comments = data.comments.filter(oneComment => oneComment.newsId !== id);
        await this.save();
        return originalLength > data.news.length;
    },
    getComments(newsId?: string) {
        if (newsId) {
            return data.comments.filter(comment => comment.newsId === newsId).map(
                ({id, newsId, author, text}) => ({id, newsId, author, text})
            );
        }
        return data.comments.map(({id, newsId, author, text}) => ({id, newsId, author, text }));
    },
    async addComment(comment: CommentWithoutId) {
        const id = crypto.randomUUID();
        const newComment = { id, ...comment };
        data.comments.push(newComment);
        await this.save();
        return newComment;
    },
    async deleteOneComment(id: string) {
        const initialLength = data.comments.length;
        data.comments = data.comments.filter(oneComment => oneComment.id !== id);
        await this.save();
        return initialLength > data.comments.length;
    },
    async save() {
        await fs.writeFile(fileName, JSON.stringify(data, null, 2));
    }
 };

export default fileDb;
