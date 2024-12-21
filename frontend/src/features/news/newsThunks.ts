import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import {News, NewsMutation} from "../../app/types";

export const fetchNews = createAsyncThunk<News[], void>(
    'news/fetchNews',
    async () => {
        const newsResponse = await axiosApi<News[]>('/news');
        return newsResponse.data || [];
    }
);

export const fetchOneNewsPost = createAsyncThunk<News, string>(
    'news/fetchOneNewsPost',
    async(newsId) => {
        const response = await axiosApi<News>(`/news${newsId}`);
        return response.data;
    }
);

export const createNews = createAsyncThunk<News, NewsMutation>(
    'news/createNews',
    async (newsMutation) => {
        const formData = new FormData();

        const keys = Object.keys(newsMutation) as (keyof NewsMutation)[];

        keys.forEach(key => {
            const value = newsMutation[key];
            if (value !== null && value !== undefined) {
                formData.append(key, value);
            }
        });
        const response = await axiosApi.post('/news', formData)
        return response.data as News;
    }
);

export const deleteOneNews = createAsyncThunk<void, string>(
    'news/deleteOneNews',
    async (newsId) => {
        await axiosApi.delete(`news/${newsId}`);
    }
);

