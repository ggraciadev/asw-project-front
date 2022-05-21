import { useState, useEffect } from "react";
import Post from "../../components/Post/Post";
import Comment from "../../components/Comment/Comment";
import usePosts from "../../hooks/usePosts";
import Button from "@mui/material/Button";
import "./Threads.css";
import { useSearchParams } from "react-router-dom";

const Threads = () => {
  const [submissions, setSubmissions] = useState([]);
  const { getUserPosts, getUserComments } = usePosts();
  const [isClicked, setIsClicked] = useState(true);
  const [searchParams] = useSearchParams();
  const username = searchParams.get("username");

  useEffect(() => {
    async function fetchData() {
      if (isClicked) {
        const result = await getUserPosts(username);
        setSubmissions(result);
      } else {
        const result = await getUserComments(username);
        setSubmissions(result);
      }
    }
    fetchData();
  }, [isClicked]);

  return (
    <>
      <div className="mainContainer">
        <Button onClick={() => setIsClicked(!isClicked)}>
          Showing {isClicked ? "submissions" : "comments"}
        </Button>
        {isClicked ? (
          <div className="postContainer">
            {submissions.map((post, index) => {
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
            })}
          </div>
        ) : (
          <div className="postContainer">
            {submissions.map((comment, index) => {
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
        )}
      </div>
    </>
  );
};

export default Threads;
