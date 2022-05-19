import axios from "axios";

const usePosts = () => {
  const API_HOST = "https://proyecto-asw-api.herokuapp.com";

  const prettifyDate = (timeStamp) => {
    let d = new Date(timeStamp);
    d.setHours(d.getHours() + 2);
    let dNow = new Date();

    let result = Math.abs(dNow - d) / 1000 / 3600;

    if (result < 0.01) {
      return "just now";
    } else if (result < 1) {
      let temp = (result * 60).toFixed(0);
      if (temp == 1) {
        return temp + " minute ago";
      } else {
        return temp + " minutes ago";
      }
    } else if (result < 24) {
      let temp = result.toFixed(0);
      if (temp == 1) {
        return temp + " hour ago";
      } else {
        return temp + " hours ago";
      }
    } else {
      let temp = (result / 24).toFixed(0);
      if (temp == 1) {
        return temp + " day ago";
      } else {
        return temp + " days ago";
      }
    }
  };

  const getAllPosts = async (orderby) => {
    try {
      const result = await axios.get(`${API_HOST}/api/post/all`, {
        params: { orderby: orderby },
      });
      return result.data.posts;
    } catch (error) {
      console.log(error);
    }
  };

  const getAllAskPosts = async (orderby) => {
    try {
      const result = await axios.get(`${API_HOST}/api/post/ask`, {
        params: { orderby: orderby },
      });
      return result.data.posts;
    } catch (error) {
      console.log(error);
    }
  };

  const getPostById = async (postId) => {
    try {
      const result = await axios.get(`${API_HOST}/api/post/item`, {
        params: { post_id: postId },
      });
      return result.data.post;
    } catch (error) {
      console.log(error);
    }
  };

  const votePost = async (id, vote) => {
    try {
      const result = await axios.post(`${API_HOST}/api/post/vote`, {
        id: id,
        vote: vote,
      });
      return result.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getAllComments = async () => {
    try {
      const result = await axios.get(`${API_HOST}/api/post/threads`, {
        params: { username: "gerard.madrid" },
      });
      return result.data.comments;
    } catch (error) {
      console.log(error);
    }
  };

  return { getAllPosts, getAllAskPosts, votePost, getPostById, getAllComments, prettifyDate };
};

export default usePosts;
