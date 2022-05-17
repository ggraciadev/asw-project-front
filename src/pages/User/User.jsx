import "./User.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useUser from "../../hooks/useUser";

const User = () => {
  const { username } = useParams();
  const { getUser } = useUser();
  const [user, setUser] = useState({});
  /* const { username, creationTime, aboutMe, phone, linUsername, ghUsername } = user; */

  useEffect(() => {
    async function fetchData() {
      const result = await getUser(username);
      setUser(result);
    }
    fetchData();
  }, [username]);

  return (
    <div className="infoContainer">
      <div className="infoField">
        <span className="fieldTitle">Username: </span>
        <span className="fieldMsg">{user.username}</span>
      </div>
      <div className="infoField">
        <span className="fieldTitle">Created: </span>
        <span className="fieldMsg">{user.creationTime}</span>
      </div>
      <div className="infoField">
        <span className="fieldTitle">About me: </span>
        <span className="fieldMsg">{user.aboutMe ? user.aboutMe : "-"}</span>
      </div>
      <div className="infoField">
        <span className="fieldTitle">Phone: </span>
        <span className="fieldMsg">{user.phone ? user.phone : "-"}</span>
      </div>
      <div className="infoField">
        <span className="fieldTitle">LinkedIn: </span>
        <a className="fieldMsg" href={user.linUsername}>{user.linUsername ? user.linUsername : "-"}</a>
      </div>
      <div className="infoField">
        <span className="fieldTitle">Github: </span>
        <a className="fieldMsg" href={user.ghUsername}>{user.ghUsername ? user.ghUsername : "-"}</a>
      </div>
    </div>
  );
};

export default User;
