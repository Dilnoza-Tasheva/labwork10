import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectComments, selectFetchLoading} from "./commentsSlice.ts";
import {useEffect} from "react";
import {fetchComments, deleteOneComment} from "./commentsThunks.ts";
import Grid from "@mui/material/Grid2";
import {Button, Card, CardActions, CardContent, CircularProgress, Typography} from "@mui/material";

interface Props {
    newsId: string | undefined;
}

const Comments: React.FC<Props> = ({newsId}) => {
    const dispatch = useAppDispatch();
    const comments = useAppSelector(selectComments);
    const fetchLoading = useAppSelector(selectFetchLoading);

    useEffect(() => {
        if (newsId) {
            dispatch(fetchComments(newsId));
        }
    }, [dispatch, newsId]);


    const deleteComment = async (commentId: string) => {
        if (window.confirm('Are you sure you want to delete this comment?')) {
            dispatch(deleteOneComment(commentId));
            await dispatch(fetchComments(newsId || ''));
        }
    };

    return (
        <Grid container direction={"column"} spacing={2}>

            <Grid>
                {fetchLoading ? (
                    <CircularProgress/>
                ) : (
                    <>
                        {comments.length === 0 ? (
                            <Typography variant="h6">No comments available</Typography>
                        ) : (
                            comments.map((comment) => (
                                <Grid size={{xs: 12, sm: 6, md: 4, lg: 4}} key={comment.id}>
                                    <Card>
                                        <CardContent>
                                            <Typography variant="h6">
                                                {comment.author || "Anonymous"}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                {comment.text}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button
                                                size="small"
                                                color="secondary"
                                                onClick={() => deleteComment(comment.id)}>
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

export default Comments;