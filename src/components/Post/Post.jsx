import "./Post.css";
import { useState } from "react";
import usePosts from "../../hooks/usePosts";
import { Link } from "react-router-dom";
import heart from "../../images/heart.png";
import blankHeart from "../../images/blank-heart.png";

const Post = (props) => {
  const {
    index,
    id,
    title,
    url,
    msg,
    likes,
    username,
    creationTime,
    commentsNum,
    comments,
  } = props;
  const [isLiked, setIsLiked] = useState(false);
  const handleLike = () => {
    setIsLiked(!isLiked);
  };
  return (
    <div className="post">
      <div className="postHeader">
        <img className="like" onClick={handleLike} src={isLiked ? heart : blankHeart} />
        <span className="title">
          {index}. {title}{" "}
        </span>
        {url ? <span>({url})</span> : null}
      </div>
      <div className="postInfo">
        <span>
          {likes} likes by {" "}
        </span>
        <Link to={{ pathname: `/user/${username}`}}>{username}</Link>
        <span>
          {" | "}
          {creationTime} {" | "}
        </span>
        <Link to={{ pathname: `/item?id=${id}`}}>{commentsNum} comments</Link> 
      </div>
    </div>
  );
};

export default Post;
