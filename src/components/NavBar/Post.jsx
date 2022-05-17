import "./Post.css";

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

  return (
    <div className="post">
        <div className="postHeader">
            <span>{index}. {title} </span>
            {url ? <span>({url})</span> : null}
        </div>
        <div className="postInfo">
            <span>{likes} points by {username} | </span>
            <span> {creationTime} | {commentsNum} comments</span>
        </div>
    </div>
  );
};

export default Post;
