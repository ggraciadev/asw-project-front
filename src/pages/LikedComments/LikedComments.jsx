import { useState, useEffect } from "react";
import Comment from "../../components/Comment/Comment";
import usePosts from "../../hooks/usePosts";
import "./LikedComments.css";

const LikedComments = () => {
  const [comments, setComments] = useState([]);
  const { getLikedComments } = usePosts();

  useEffect(() => {
    async function fetchData() {
      const result = await getLikedComments();
      setComments(result);
    }
    fetchData();
  }, [comments]);

  return (
    <div className="threadsContainer">
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
  );
};

export default LikedComments;
