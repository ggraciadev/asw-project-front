import "./Item.css";
import Button from "@mui/material/Button";
import Post from "../../components/Post/Post";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import usePosts from "../../hooks/usePosts";

const Item = () => {
  const [input, setInput] = useState({});
  const { postId } = useSearchParams();
  const { getPostById } = usePosts();
  const [post, setPost] = useState();

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
    }
    fetchData();
  }, [postId]);

  return (
    <div className="infoContainer">
      <Post
        key={0}
        index={1}
        id={post.id}
        title={post.title}
        url={post.url}
        msg={post.msg}
        likes={post.likes}
        username={post.username}
        creationTime={post.creationTime}
        commentsNum={post.commentsNum}
        comments={post.comments}
      />
      <div>{post.url ? null : post.msg}</div>
      <form onSubmit={handleSubmit}>
        <div>
          <textarea
            name="text"
            value={input.text || ""}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" color="primary">
            Add Comment
          </Button>
        </div>
        </form>
        <br/>
        <div>
            {post.comments.map((comment, index) => {
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
