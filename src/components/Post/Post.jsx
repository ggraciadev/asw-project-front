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
    userLiked,
    username,
    creationTime,
    commentsNum,
    comments,
  } = props;
  const [isLiked, setIsLiked] = useState(userLiked);
  const handleLike = () => {
    //handleLiked
    //setIsLiked(!isLiked);
  };
  return (
    <div className="post">
      <div className="postHeader">
        <img
          className="like"
          onClick={handleLike}
          src={isLiked ? heart : blankHeart}
        />
        <span className="title">
          {index ? `${index}.` : null} {title}{" "}
        </span>
        {url ? <span>({url})</span> : null}
      </div>
      <div className="postInfo">
        <div>{likes} likes by </div>
        &nbsp;
        <Link className="link" to={{ pathname: `/user/${username}` }}>
          {username}
        </Link>
        &nbsp;
        <span>
          {" | "}
          {creationTime} {" | "}
        </span>
        &nbsp;
        <Link className="link" to={{ pathname: `/item?id=${id}` }}>
          {commentsNum} comments
        </Link>
      </div>
    </div>
  );
};

export default Post;
