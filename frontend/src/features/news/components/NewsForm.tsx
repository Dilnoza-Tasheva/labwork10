import {useAppDispatch} from "../../../app/hooks.ts";
import {ChangeEvent, FormEvent, useState} from "react";
import {NewsMutation} from "../../../app/types";
import {createNews} from "../newsThunks.ts";
import FileInput from "../../../components/FileInput/FileInput.tsx";
import Grid from "@mui/material/Grid2";
import {Button, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";

const initialState = {
    title: '',
    content: '',
    image: null,
};

const NewsForm = () => {
    const dispatch = useAppDispatch();
    const [form, setForm] = useState<NewsMutation>(initialState);
    const navigate = useNavigate();

    const submitForm = (e: FormEvent) => {
        e.preventDefault();
        dispatch(createNews(form));
        setForm(initialState);
        navigate('/');
    };

    const inputChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const fileEventChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files) {
            setForm(prevState => ({
                ...prevState,
                [name]: files[0] ? files[0] : null,
            }));
        }
    };

    return (
        <form onSubmit={submitForm}>
            <Grid container direction={"column"} spacing={2}>
                <Grid size={{xs: 12}}>
                    <TextField
                        id="title"
                        name="title"
                        label="Title"
                        value={form.title}
                        onChange={inputChangeHandle}
                    />
                </Grid>

                <Grid size={{xs: 12}}>
                    <TextField
                        multiline
                        id="content"
                        name="content"
                        label="Content"
                        value={form.content}
                        onChange={inputChangeHandle}
                    />
                </Grid>

                <Grid size={{xs: 12}}>
                    <FileInput name="image" label="Image" onGetFile={fileEventChangeHandle}/>
                </Grid>

                <Grid>
                    <Button color="primary" type="submit">
                        Create Post
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default NewsForm;