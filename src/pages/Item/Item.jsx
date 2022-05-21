import "./Item.css";
import Button from "@mui/material/Button";
import Post from "../../components/Post/Post";
import Comment from "../../components/Comment/Comment";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import usePosts from "../../hooks/usePosts";

const Item = () => {
  const [input, setInput] = useState({});
  const { getPostById, submitComment } = usePosts();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [isInserted, setIsInserted] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const postId = searchParams.get("id");

  const handleChange = (e) => {
    setInput({
      ...input,
      postId: postId,
      parentId: null,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    await submitComment(input);
    setIsInserted(!isInserted);
  };

  useEffect(() => {
    async function fetchData() {
      const result = await getPostById(postId);
      setPost(result);
      console.log(post);
      setComments(result.comments);
    }
    fetchData();
  }, [postId, isInserted]);

  return (
    <div className="itemContainer">
      <div>
        <Post
          id={post.id}
          title={post.title}
          url={post.url}
          msg={post.msg}
          likes={post.likes}
          userLiked={post.userLiked}
          username={post.username}
          creationTime={post.creationTime}
          commentsNum={post.commentsNum}
          comments={post.comments}
        />
      </div>
      <div>{post.url ? null : post.msg}</div>

      <form onSubmit={handleSubmit}>
        <div className="formContainer">
          <textarea
            name="message"
            value={input.message || ""}
            onChange={handleChange}
          />
          <br />
          <Button type="submit" variant="contained" color="primary">
            Add Comment
          </Button>
        </div>
      </form>

      <br />
      <div className="commentsContainer">
        {comments.map((comment, index) => {
          return (
            <Comment
              key={index}
              index={index + 1}
              id={comment.id}
              postID={comment.postID}
              author={comment.author}
              creationTime={comment.creationTime}
              parentID={comment.parentID}
              message={comment.message}
              likes={comment.likes}
              userLiked={comment.userLiked}
              comments={comment.comments}
              reply={true}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Item;
