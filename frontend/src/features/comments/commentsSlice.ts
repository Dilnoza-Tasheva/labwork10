import {OneComment} from "../../app/types";
import {RootState} from "../../app/store.ts";
import {createSlice} from "@reduxjs/toolkit";
import {createComment, deleteOneComment, fetchComments} from "./commentsThunks.ts";

interface CommentsState {
    comments: OneComment[];
    fetchLoading: boolean;
    createLoading: boolean;
    deleteLoading: boolean;
}

const initialState: CommentsState = {
    comments: [],
    fetchLoading: false,
    createLoading: false,
    deleteLoading: false,
}

export const selectComments = (state: RootState) => state.comments.comments;
export const selectFetchLoading = (state: RootState) => state.comments.fetchLoading;

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchComments.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(fetchComments.fulfilled, (state, {payload: comments}) => {
                state.fetchLoading = false;
                state.comments = comments;
            })
            .addCase(fetchComments.rejected, (state) => {
                state.fetchLoading = false;
            })
            .addCase(createComment.pending, (state) => {
                state.createLoading = true;
            })
            .addCase(createComment.fulfilled, (state) => {
                state.createLoading = false;
            })
            .addCase(createComment.rejected, (state) => {
                state.createLoading = false;
            })
            .addCase(deleteOneComment.pending, (state) => {
                state.deleteLoading = true;
            })
            .addCase(deleteOneComment.fulfilled, (state) => {
                state.deleteLoading = false;
            })
            .addCase(deleteOneComment.rejected, (state) => {
                state.deleteLoading = false;
            });
    }
});

export const commentsReducer = commentsSlice.reducer;

