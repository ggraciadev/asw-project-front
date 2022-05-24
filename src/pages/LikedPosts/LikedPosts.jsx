import { useState, useEffect } from "react";
import "./LikedPosts.css";
import Post from "../../components/Post/Post";
import Comment from "../../components/Comment/Comment";
import usePosts from "../../hooks/usePosts";
import { Button } from "@mui/material";

const LikedPosts = () => {
  const [posts, setPosts] = useState([]);
  const [isClicked, setIsClicked] = useState(true);
  const { getLikedPosts, getLikedComments } = usePosts();

  useEffect(() => {
    async function fetchData() {
      if (isClicked) {
        const result = await getLikedPosts();
        setPosts(result);
      } else {
        const result = await getLikedComments();
        setPosts(result);
      }
    }
    fetchData();
  }, [isClicked]);

  return (
    <div className="mainContainer">
      <Button onClick={() => setIsClicked(!isClicked)}>
        {isClicked ? 'Showing submissions' : 'Showing comments'}
      </Button>
      {isClicked
        ? posts.map((post, index) => {
            return (
              <Post
                key={index}
                index={index + 1}
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
            );
          })
        : posts.map((comment, index) => {
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
  );
};

export default LikedPosts;
