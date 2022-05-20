import { useState, useEffect } from "react";
import Post from "../../components/Post/Post";
import usePosts from "../../hooks/usePosts";
import { Button } from "@mui/material";

const Ask = () => {
    const [posts, setPosts] = useState([]);
    const [orderby, setOrderby] = useState("likes");
    const [isClicked, setIsClicked] = useState(false);
    const { getAllAskPosts } = usePosts();

    const handleClick = () => {
        if(orderby == "likes"){
            setOrderby("creationTime");
        }else{
            setOrderby("likes");
        }
        setIsClicked(!isClicked);
    };

    useEffect(() => {
        async function fetchData() {
            const result = await getAllAskPosts(orderby);
            setPosts(result);
        }
        fetchData();
    }, [isClicked]);
    
  return (
    <div className="postContainer">
      <Button onClick={handleClick}>Ordered by {orderby}</Button>
      {posts.map((post, index) => {
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
  );
};

export default Ask;
