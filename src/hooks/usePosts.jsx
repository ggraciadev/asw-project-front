import axios from 'axios';

const usePosts = () => {
    const API_HOST = "https://proyecto-asw-api.herokuapp.com";
    const getAllPosts = async (orderby) => {
        try {
            const result = await axios.get(`${API_HOST}/api/post/all`, { params: { orderby: orderby } });
            return result.data.posts;
        } catch (error) {
            console.log(error);
        }
    };

    const getAllAskPosts = async (orderby) => {
        try {
            const result = await axios.get(`${API_HOST}/api/post/ask`, { params: { orderby: orderby } });
            return result.data.posts;
        } catch (error) {
            console.log(error);
        }
    };

    const getPostById = async (postId) => {
        try {
            const result = await axios.get(`${API_HOST}/api/post/item`, { params: { post_id: postId } });
            return result.data.post;
        } catch (error) {
            console.log(error);
        }
    };

    const votePost = async (id, vote) => {
        try {
            const result = await axios.post(`${API_HOST}/api/post/vote`, { id: id, vote: vote });
            return result.data;
        } catch (error) {
            console.log(error);
        }
    };  

    const getAllComments = async () => {
        try {
            const result = await axios.get(`${API_HOST}/api/post/threads`, { params: { username: "gerard.madrid" } });
            return result.data.comments;
        } catch (error) {
            console.log(error);
        }
    };

    return { getAllPosts, getAllAskPosts, votePost, getPostById, getAllComments };
};

export default usePosts;