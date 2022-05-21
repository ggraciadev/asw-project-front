import axios from "axios";

const usePosts = () => {
  //const API_HOST = "http://localhost:5000";
  const API_HOST = "https://proyecto-asw-api.herokuapp.com";
  const API_KEY = "4ce9434e63b90aa82bb793cd58a478f0";
  axios.defaults.headers.post["apikey"] = "4ce9434e63b90aa82bb793cd58a478f0";

  const getAllPosts = async (orderby) => {
    try {
      const result = await axios.get(`${API_HOST}/api/post/all`, {
        params: { orderby: orderby, loggedUser: "gerard.madrid" },
      });
      const posts = result.data.posts;
      posts.map((post) => {
        post.creationTime = prettifyDate(post.creationTime);
      });
      return posts;
    } catch (error) {
      console.log(error);
    }
  };

  const getAllAskPosts = async (orderby) => {
    try {
      const result = await axios.get(`${API_HOST}/api/post/ask`, {
        params: { orderby: orderby, loggedUser: "gerard.madrid" },
      });
      const posts = result.data.posts;
      posts.map((post) => {
        post.creationTime = prettifyDate(post.creationTime);
      });
      return posts;
    } catch (error) {
      console.log(error);
    }
  };

  const getLikedPosts = async () => {
    try {
      const result = await axios.get(`${API_HOST}/api/post/likedPosts`, {
        params: { username: "gerard.madrid" },
      });
      const posts = result.data.posts;
      posts.map((post) => {
        post.creationTime = prettifyDate(post.creationTime);
      });
      return posts;
    } catch (error) {
      console.log(error);
    }
  };

  const getLikedComments = async () => {
    try {
      const result = await axios.get(`${API_HOST}/api/post/likedComments`, {
        params: { username: "gerard.madrid" },
      });
      const comments = result.data.comments;
      return comments;
    } catch (error) {
      console.log(error);
    }
  };

  const getPostById = async (postId) => {
    try {
      const result = await axios.get(`${API_HOST}/api/post/item`, {
        params: { id: postId, loggedUser: "gerard.madrid" },
      });
      const post = result.data.post;
      post.creationTime = prettifyDate(post.creationTime);
      return post;
    } catch (error) {
      console.log(error);
    }
  };

  const getUserComments = async (username) => {
    try {
      const result = await axios.get(`${API_HOST}/api/post/threads`, {
        params: { username, loggedUser: "gerard.madrid" },
      });
      return result.data.comments;
    } catch (error) {
      console.log(error);
    }
  };

  const getUserPosts = async (username) => {
    try {
      const result = await axios.get(`${API_HOST}/api/post/submitted`, {
        params: { username, loggedUser: "gerard.madrid" },
      });
      const posts = result.data.posts;
      posts.map((post) => {
        post.creationTime = prettifyDate(post.creationTime);
      });
      return posts;
    } catch (error) {
      console.log(error);
    }
  };

  const getPostWithComment = async (postid, commentId) => {
    try {
      const result = await axios.get(`${API_HOST}/api/post/reply`, {
        params: {
          id: postid,
          commentID: commentId,
          loggedUser: "gerard.madrid",
        },
      });
      const post = result.data.post;
      post.creationTime = prettifyDate(post.creationTime);
      console.log(post);
      return post;
    } catch (error) {
      console.log(error);
    }
  };

  const submitPost = async (post) => {
    try {
      const result = await axios.post(`${API_HOST}/api/post/submit`, {
        title: post.title,
        url: post.url,
        msg: post.message,
        username: "gerard.madrid",
      });
      console.log(result.data);
      return result.data.link;
    } catch (error) {
      console.log(error);
    }
  };

  const submitComment = async (comment) => {
    try {
      console.log(comment);
      const result = await axios.post(`${API_HOST}/api/post/comment`, {
        message: comment.message,
        username: "gerard.madrid",
        postid: comment.postId,
        parentid: comment.parentId,
      });
      console.log(result.data);
      return result.data.link;
    } catch (error) {
      console.log(error);
    }
  };

  const replyComment = async (comment) => {
    try {
      console.log(comment);
      const result = await axios.post(`${API_HOST}/api/post/reply`, {
        message: comment.message,
        username: "gerard.madrid",
        postid: comment.postId,
        parentid: comment.parentId,
      });
      console.log(result.data);
      return result.data.link;
    } catch (error) {
      console.log(error);
    }
  };

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

  return {
    getAllPosts,
    getAllAskPosts,
    getPostById,
    getUserComments,
    getUserPosts,
    prettifyDate,
    getLikedPosts,
    getLikedComments,
    getPostWithComment,
    submitPost,
    submitComment,
    replyComment,
  };
};

export default usePosts;
