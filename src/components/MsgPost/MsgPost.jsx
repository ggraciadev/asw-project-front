import { Link } from "react-router-dom";
import "./MsgPost.css";
import { useState } from "react";
import heart from "../../images/heart.png";
import blankHeart from "../../images/blank-heart.png";

const MsgPost = (props) => {
  const {
    index,
    id,
    postID,
    author,
    creationTime,
    parentID,
    message,
    likes,
    comments,
  } = props;
  const [isLiked, setIsLiked] = useState(false);
  const handleLike = () => {
    setIsLiked(!isLiked);
  };
  return (
    <div>
      <div className="postInfo">
      <img className="like" onClick={handleLike} src={isLiked ? heart : blankHeart} />
      <span>{likes} likes by </span>
        <Link to={{ pathname: `/user/${author}` }}>{author}</Link>
        <span>
          {" | "}
          {creationTime}
        </span>
      </div>
      <span>{message}</span>
      <div>reply</div>
      <div style = {{position: "relative", left: 25 }}>
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

export default MsgPost;
