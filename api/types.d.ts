export interface News {
    id: string;
    title: string;
    content: string;
    image?: string | null;
    publicationDate: string;
}

export type NewsWithoutId = Omit<News, 'id'>

export interface OneComment {
    id: string;
    newsId: string;
    author?: string;
    text: string;
}

export type CommentWithoutId = Omit<OneComment, 'id'>
