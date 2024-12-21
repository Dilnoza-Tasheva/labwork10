export interface News {
    id: string;
    title: string;
    content: string;
    image?: string | null;
    publicationDate: string;
}

export interface NewsMutation{
    title: string;
    content: string;
    image?: File | null;
    publicationDate: string;
}

export interface OneComment {
    id: string;
    newsId: string;
    author?: string | null;
    text: string;
}

export interface OneCommentMutation {
    newsId: string;
    author?: string | null;
    text: string;
}