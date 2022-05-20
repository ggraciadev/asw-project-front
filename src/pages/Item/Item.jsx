import "./Item.css";
import Button from "@mui/material/Button";
import Post from "../../components/Post/Post";
import MsgPost from "../../components/MsgPost/MsgPost";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import usePosts from "../../hooks/usePosts";

const Item = () => {
  const [input, setInput] = useState({});
  const { getPostById } = usePosts();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const postId = searchParams.get("id");

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(input);
    //Aqui aniria el add comment hook
  };

  useEffect(() => {
    async function fetchData() {
      const result = await getPostById(postId);
      setPost(result);
      setComments(result.comments);
    }
    fetchData();
  }, [postId]);

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
            name="text"
            value={input.text || ""}
            onChange={handleChange}
          />
          <br/>
          <Button type="submit" variant="contained" color="primary">
            Add Comment
          </Button>
        </div>
      </form>

      <br />
      <div>
        {comments.map((comment, index) => {
          return (
            <MsgPost
              key={index}
              index={index + 1}
              id={comment.id}
              postID={comment.postID}
              author={comment.author}
              creationTime={comment.creationTime}
              parentID={comment.parentID}
              message={comment.message}
              likes={comment.likes}
              comments={comment.comments}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Item;
