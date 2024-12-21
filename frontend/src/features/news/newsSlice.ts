import {News} from "../../app/types";
import {RootState} from "../../app/store.ts";
import {createSlice} from "@reduxjs/toolkit";
import {createNews, deleteOneNews, fetchNews, fetchOneNewsPost} from "./newsThunks.ts";

interface NewsState {
    news: News[];
    fetchLoading: boolean;
    createLoading: boolean;
    currentNews?: News | null;
    deleteLoading: boolean;
}

const initialState: NewsState = {
    news: [],
    fetchLoading: false,
    createLoading: false,
    currentNews: null,
    deleteLoading: false,
};

export const selectNews = (state: RootState) => state.news.news;
export const selectFetchLoading = (state: RootState) => state.news.fetchLoading;

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNews.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(fetchNews.fulfilled, (state, {payload: news}) => {
                state.fetchLoading = false;
                state.news = news;
            })
            .addCase(fetchNews.rejected, (state) => {
                state.fetchLoading = false;
            })
            .addCase(fetchOneNewsPost.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(fetchOneNewsPost.fulfilled, (state, { payload: news }) => {
                state.fetchLoading = false;
                state.currentNews = news;
            })
            .addCase(fetchOneNewsPost.rejected, (state) => {
                state.fetchLoading = false;
                state.currentNews = null;
            })
            .addCase(createNews.pending, (state) => {
                state.createLoading = true;
            })
            .addCase(createNews.fulfilled, (state, { payload: newNews }) => {
                state.createLoading = false;
                state.news.push(newNews);
            })
            .addCase(createNews.rejected, (state) => {
                state.createLoading = false;
            })
            .addCase(deleteOneNews.pending, (state) => {
                state.deleteLoading = true;
            })
            .addCase(deleteOneNews.fulfilled, (state) => {
                state.deleteLoading = false;
            })
            .addCase(deleteOneNews.rejected, (state) => {
                state.deleteLoading = false;
            });
    }
});

export const newsReducer = newsSlice.reducer;