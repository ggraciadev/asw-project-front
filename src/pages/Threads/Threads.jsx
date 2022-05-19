import { useState, useEffect } from "react";
import MsgPost from "../../components/MsgPost/MsgPost";
import usePosts from "../../hooks/usePosts";
import "./Threads.css";

const Threads = () => {
    const [comments, setComments] = useState([]);
    const { getAllComments } = usePosts();

    useEffect(() => {
        async function fetchData() {
            const result = await getAllComments();
            console.log(result);
            setComments(result);
        }
        fetchData();
    }, []);

    return (
        <div className="threadsContainer">
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
    );
};

export default Threads;