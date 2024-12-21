import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectFetchLoading, selectNews} from "./newsSlice.ts";
import {useEffect} from "react";
import {deleteOneNews, fetchNews} from "./newsThunks.ts";
import Grid from "@mui/material/Grid2";
import {Button, Card, CardActions, CardContent, CircularProgress, Typography} from "@mui/material";
import dayjs from "dayjs";
import {Link} from "react-router-dom";


const News = () => {
    const dispatch = useAppDispatch();
    const news = useAppSelector(selectNews);
    const fetchLoading = useAppSelector(selectFetchLoading);

    useEffect(() => {
        dispatch(fetchNews());
    }, [dispatch]);

    const deleteOnePost = async (newsId: string) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            dispatch(deleteOneNews(newsId));
            await dispatch(fetchNews());
        }
    };

    const formatDate = (dateString: string) => {
        return dayjs(dateString).format("DD/MM/YY");
    };

    return (
        <Grid container direction={"column"} spacing={2}>
            <Grid>
                <Typography variant="h5">News</Typography>
            </Grid>

            <Grid>
                <Button variant="contained" color="primary" component={Link} to="/news/newPost">Add new post</Button>
            </Grid>

            <Grid>
                {fetchLoading ? (
                    <CircularProgress/>
                ) : (
                    <>
                        {news.length === 0 ? (
                            <Typography variant="h6">No news posts available</Typography>
                        ) : (
                            news.map((oneNewsPost) => (
                                <Grid size={{xs:12, sm: 6, md:4, lg: 4}}>
                                    <Card>
                                        <CardContent>
                                            <Typography variant="h6">{oneNewsPost.title}</Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                Published on: {formatDate(oneNewsPost.publicationDate)}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button
                                                size="small"
                                                color="primary"
                                                component={Link}
                                                to={`/news/${oneNewsPost.id}`}
                                            >
                                                Read full post
                                            </Button>
                                            <Button
                                                size="small"
                                                color="secondary"
                                                onClick={() => deleteOnePost(oneNewsPost.id)}>
                                                Delete
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))
                        )}
                    </>
                )}
            </Grid>

        </Grid>
    );
};

export default News;