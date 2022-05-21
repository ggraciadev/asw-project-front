import "./Reply.css";
import Button from "@mui/material/Button";
import Comment from "../../components/Comment/Comment";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import usePosts from "../../hooks/usePosts";

const Reply = () => {
  const [input, setInput] = useState({});
  const { getPostWithComment, replyComment } = usePosts();
  const [post, setPost] = useState({});
  const [comment, setComment] = useState([]);
  const [searchParams] = useSearchParams();
  const postId = searchParams.get("pid");
  const commentId = searchParams.get("cid");

  const handleChange = (e) => {
    setInput({
      ...input,
      postId: postId,
      parentId: post.parentID,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(input);
    //replyComment(input);
  };

  useEffect(() => {
    async function fetchData() {
      console.log("hola");
      const result = await getPostWithComment(postId, commentId);
      console.log(result);
      setPost(result);
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
