import {News} from "../../app/types";
import {RootState} from "../../app/store.ts";
import {createSlice} from "@reduxjs/toolkit";
import {fetchNews} from "./newsThunks.ts";

interface NewsState {
    news: News[];
    fetchLoading: boolean;
    createLoading: boolean;
}

const initialState: NewsState = {
    news: [],
    fetchLoading: false,
    createLoading: false,
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
    }
});

export const newsReducer = newsSlice.reducer;