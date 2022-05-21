import { Link } from "react-router-dom";
import "./Comment.css";
import { useState, useEffect } from "react";
import usePosts from "../../hooks/usePosts";
import useUser from "../../hooks/useUser";
import heart from "../../images/heart.png";
import blankHeart from "../../images/blank-heart.png";

const Comment = (props) => {
  const {
    index,
    id,
    postID,
    author,
    parentID,
    message,
    likes,
    userLiked,
    comments,
    reply,
  } = props;
  let { creationTime } = props;

  const { prettifyDate } = usePosts();
  const { voteComment } = useUser();
  creationTime = prettifyDate(creationTime);
  const [isLiked, setIsLiked] = useState(userLiked);
  const [likesState, setLikesState] = useState(likes);
  const handleLike = async () => {
    console.log(await voteComment(id));
    isLiked ? setLikesState(likesState - 1) : setLikesState(likesState + 1);
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    setLikesState(likes);
    setIsLiked(userLiked);
  }, [likes]);

  return (
    <div className="commentContainer">
      <div className="commentInfo">
        <img
          className="like"
          onClick={handleLike}
          src={isLiked ? heart : blankHeart}
        />
        &nbsp;
        <span>
          {likesState} likes by {"  "}
        </span>
        &nbsp;
        <Link className="link" to={{ pathname: `/user/${author}` }}>
          {author}
        </Link>
        &nbsp;
        <span>
          {" | "}
          {creationTime}
        </span>
      </div>
      <div className="commentMsg">
        <span className="msgComment">{message}</span>
        <Link
          className="link"
          to={{ pathname: `/reply?cid=${id}&pid=${postID}` }}
        >
          {reply ? "Reply" : null}
        </Link>
      </div>
      <div style={{ position: "relative", top: 10, left: 45 }}>
        {comments && comments.length > 0
          ? comments.map((comment, index) => {
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
            })
          : null}
      </div>
    </div>
  );
};

export default Comment;
