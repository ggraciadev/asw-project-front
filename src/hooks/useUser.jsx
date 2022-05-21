import { getBreadcrumbsUtilityClass } from "@mui/material";
import axios from "axios";
import usePosts from "./usePosts";

const useUser = () => {
  //const API_HOST = "http://localhost:5000";
  const API_HOST = "https://proyecto-asw-api.herokuapp.com";
  const API_KEY = "4ce9434e63b90aa82bb793cd58a478f0";
  axios.defaults.headers.put["apikey"] = "4ce9434e63b90aa82bb793cd58a478f0";
  const { prettifyDate } = usePosts();
  const getUser = async (username) => {
    try {
      const result = await axios.get(`${API_HOST}/api/user/`, {
        params: { username: username },
      });
      const user = result.data.user;
      user.creationTime = prettifyDate(user.creationTime);
      return user;
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = (user) => {
    try {
      const result = axios.put(`${API_HOST}/api/user/`, {
        username: user.username,
        aboutme: user.about,
        phone: user.phone,
        linkedin: user.linkedIn,
        github: user.github,
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const votePost = async (id) => {
    try {
      const result = await axios.put(
        `${API_HOST}/api/user/votePost?postid=${id}&username=gerard.madrid`
      );
      return result.data;
    } catch (error) {
      console.log(error);
    }
  };

  const voteComment = async (id) => {
    try {
      const result = await axios.put(
        `${API_HOST}/api/user/voteComment?commentid=${id}&username=gerard.madrid`
      );
      return result.data;
    } catch (error) {
      console.log(error);
    }
  };

  return { getUser, votePost, voteComment, updateUser };
};

export default useUser;
