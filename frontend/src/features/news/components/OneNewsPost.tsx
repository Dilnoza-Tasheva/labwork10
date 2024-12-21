import Comments from "../../comments/comments.tsx";
import CommentForm from "../../comments/components/CommentForm.tsx";

const OneNewsPost = () => {

    return (
        <div>
            <Comments newsId={selectedNewsId}/>
            <CommentForm/>
        </div>
    );
};

export default OneNewsPost;