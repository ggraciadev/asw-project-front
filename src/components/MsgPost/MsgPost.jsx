import { Link } from "react-router-dom";
import "./MsgPost.css";
import { useState } from "react";
import usePosts from "../../hooks/usePosts";
import heart from "../../images/heart.png";
import blankHeart from "../../images/blank-heart.png";

const MsgPost = (props) => {
  const {
    index,
    id,
    postID,
    author,
    parentID,
    message,
    likes,
    comments,
  } = props;
  let {creationTime} = props;

  const { prettifyDate } = usePosts();
  creationTime = prettifyDate(creationTime);
  const [isLiked, setIsLiked] = useState(false);
  const handleLike = () => {
    setIsLiked(!isLiked);
  };
  return (
    <div className="commentContainer">
      <div className="commentInfo">
        <img className="like" onClick={handleLike} src={isLiked ? heart : blankHeart} />
        &nbsp;
        <span>{likes} likes by {"  "}</span>
        &nbsp;
        <Link className="link" to={{ pathname: `/user/${author}` }}>{author}</Link>
        &nbsp;  
        <span>
          {" | "}
          {creationTime}
        </span>
      </div>
      <div className="commentMsg">
      <span className="msgComment">{message}</span>
      <span className="replyMsg">reply</span>
      </div>
      <div style = {{position: "relative", left: 45 }}>
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
