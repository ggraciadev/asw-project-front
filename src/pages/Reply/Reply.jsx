import "./Reply.css";
import Button from "@mui/material/Button";
import Comment from "../../components/Comment/Comment";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import usePosts from "../../hooks/usePosts";
import { useNavigate } from "react-router-dom";

const Reply = () => {
  const [input, setInput] = useState({});
  const { getPostWithComment, submitComment } = usePosts();
  const [comment, setComment] = useState([]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const postId = searchParams.get("pid");
  const commentId = searchParams.get("cid");

  const handleChange = (e) => {
    setInput({
      ...input,
      postId: postId,
      parentId: commentId,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setInput({
      ...input,
      message: "",
    });
    await submitComment(input);
    navigate("/item?id=" + postId);
  };

  useEffect(() => {
    async function fetchData() {
      const result = await getPostWithComment(postId, commentId);
      console.log(result);
      setComment(result.comments[0]);
    }
    fetchData();
  }, []);

  return (
    <div className="itemContainer">
      <div>
        <Comment
          id={comment.id}
          postID={comment.postID}
          author={comment.author}
          creationTime={comment.creationTime}
          parentID={comment.parentID}
          message={comment.message}
          likes={comment.likes}
          userLiked={comment.userLiked}
          reply={false}
        />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="formContainer">
          <textarea
            name="message"
            value={input.message || ""}
            onChange={handleChange}
          />
          <br />
          <Button type="submit" variant="contained" color="primary">
            Reply Comment
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Reply;
