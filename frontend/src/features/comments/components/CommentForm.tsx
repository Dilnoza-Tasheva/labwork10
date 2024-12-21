import {OneCommentMutation} from "../../../app/types";
import {useAppDispatch} from "../../../app/hooks.ts";
import {ChangeEvent, FormEvent, useState} from "react";
import {createComment, fetchComments} from "../commentsThunks.ts";
import Grid from "@mui/material/Grid2";
import {Button, TextField} from "@mui/material";

interface Props {
    newsId: string;
}

const initialState: Omit<OneCommentMutation, 'newsId'> = {
    author: '',
    text: '',
};

const CommentForm: React.FC<Props> = ({newsId}) => {
    const dispatch = useAppDispatch();
    const [form, setForm] = useState(initialState);

    const submitForm = (e: FormEvent) => {
        e.preventDefault();
        dispatch(createComment({...form, newsId}));
        dispatch(fetchComments(newsId));
        setForm(initialState);
    };

    const inputChangeHandle = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setForm((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <form onSubmit={submitForm}>
            <Grid container direction="column" spacing={2}>

                <Grid size={{xs: 12}}>
                    <TextField
                        id="author"
                        name="author"
                        label="Author"
                        value={form.author || ''}
                        onChange={inputChangeHandle}
                    />
                </Grid>

                <Grid size={{xs: 12}}>
                    <TextField
                        multiline
                        id="text"
                        name="text"
                        label="Comment Text"
                        value={form.text}
                        onChange={inputChangeHandle}
                        required
                    />
                </Grid>

                <Grid>
                    <Button color="primary" type="submit">
                        Add
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default CommentForm;