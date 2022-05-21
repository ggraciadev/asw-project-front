import { getBreadcrumbsUtilityClass } from "@mui/material";
import axios from "axios";
import usePosts from "./usePosts";

const useUser = () => {
  const API_HOST = "https://proyecto-asw-api.herokuapp.com";
  const API_KEY = "4ce9434e63b90aa82bb793cd58a478f0";
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

  const votePost = async (id) => {
    try {
      const result = await axios.put(
        `${API_HOST}/api/user/votePost`,  { apikey: API_KEY }, { params: { postid: id, username: "gerard.madrid" } }
      );
      return result.data;
    } catch (error) {
      console.log(error);
    }
  };

  const voteComment = async (id) => {
    try {
      const result = await axios.put(
        `${API_HOST}/api/user/voteComment`,  { apikey: API_KEY }, { params: { commentid: id, username: "gerard.madrid" } }
      );
      return result.data;
    } catch (error) {
      console.log(error);
    }
  };

  return { getUser, votePost, voteComment };
};

export default useUser;
