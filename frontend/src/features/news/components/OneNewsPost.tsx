import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Grid from "@mui/material/Grid2";
import { Card, CardContent, CardHeader, CardMedia, Typography, CircularProgress } from "@mui/material";
import Comments from "../../comments/comments";
import CommentForm from "../../comments/components/CommentForm";
import { apiUrl } from "../../../globalConstants";
import NoPictureImage from "../../../assets/NoPictureImage.jpg";

const OneNewsPost = () => {
    const { id } = useParams<{ id: string }>();
    const [newsPost, setNewsPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNewsPost = async () => {
            try {
                const response = await axios.get(`${apiUrl}/news/${id}`);
                setNewsPost(response.data);
            } catch (error) {
                console.error("Failed to fetch news post:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchNewsPost();
    }, [id]);

    if (loading) return <CircularProgress />;

    if (!newsPost) return <Typography variant="h6">Post not found</Typography>;

    const { title, content, publicationDate, image } = newsPost;
    const newsImage = image ? `${apiUrl}/${image}` : NoPictureImage;

    return (
        <Grid container spacing={3} sx={{ padding: 2 }}>
            <Grid size={{ xs: 12, md: 8 }}>
                <Card>
                    <CardHeader title={title} subheader={`Published on: ${new Date(publicationDate).toLocaleDateString()}`} />
                    <CardMedia component="img" image={newsImage} alt={title} />
                    <CardContent>
                        <Typography variant="body1">{content}</Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 8 }}>
                <Comments newsId={id} />
            </Grid>

            <Grid size={{ xs: 12, md: 8 }}>
                <Typography variant="h6" gutterBottom>
                    Add a Comment
                </Typography>
                <CommentForm newsId={id || ''} />
            </Grid>
        </Grid>
    );
};

export default OneNewsPost;
