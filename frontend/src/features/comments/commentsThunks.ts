import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import { OneComment, OneCommentMutation} from "../../app/types";

export const fetchComments = createAsyncThunk<OneComment[], string>(
    'comments/fetchComments',
    async (newsId) => {
        const commentsResponse = await axiosApi<OneComment[]>(`/comments?newsId=${newsId}`);
        return commentsResponse.data || [];
    }
);

export const createComment = createAsyncThunk <void, OneCommentMutation>(
    'comments/createComment',
    async (comment) => {
        await axiosApi.post('/comments', {...comment});
    }
);

export const deleteOneComment = createAsyncThunk<void, string>(
    'comments/deleteOneComment',
    async (commentId) => {
        await axiosApi.delete(`comments/${commentId}`);
    }
);