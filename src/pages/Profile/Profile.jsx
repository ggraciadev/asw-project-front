import "./Profile.css";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useUser from "../../hooks/useUser";

const Profile = () => {
  const [user, setUser] = useState({});
  const [input, setInput] = useState({});
  const [isEditable, setIsEditable] = useState(false);
  const { getUser } = useUser();
  const [searchParams, setSearchParams] = useSearchParams();
  const username = searchParams.get("username");

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(input);
    //Aqui aniria el submit hook
  };

  useEffect(() => {
    async function fetchData() {
      const result = await getUser(username);
      setUser(result);
    }
    fetchData();
  }, [username]);

  return (
    <div className="infoContainer">
      <form onSubmit={handleSubmit}>
        <div className="infoField">
          <span className="fieldTitle">Email: </span>
          <span className="fieldMsg">{user.email}</span>
        </div>
        <div className="infoField">
          <span className="fieldTitle">Created: </span>
          <span className="fieldMsg">{user.creationTime}</span>
        </div>
        <div className="infoField">
          <label for="about" className="fieldTitle">
            About:{" "}
          </label>

          {isEditable ? (
            <textarea
              name="about"
              placeholder={user.aboutMe}
              value={input.about || ""}
              onChange={handleChange}
            />
          ) : (
            <span className="fieldMsg">
              {user.aboutMe ? user.aboutMe : "-"}
            </span>
          )}
        </div>
        <div className="infoField">
          <label for="phone" className="fieldTitle">
            Phone:{" "}
          </label>
          {isEditable ? (
            <input
              type="text"
              name="phone"
              placeholder={user.phone}
              className="inputField"
              value={input.phone || ""}
              onChange={handleChange}
            />
          ) : (
            <span className="fieldMsg">{user.phone ? user.phone : "-"}</span>
          )}
        </div>
        <div className="infoField">
          <label for="linkedIn" className="fieldTitle">
            LinkedIn:{" "}
          </label>
          {isEditable ? (
            <input
              type="text"
              name="linkedIn"
              className="inputField"
              placeholder={user.linUsername}
              value={input.linkedIn || ""}
              onChange={handleChange}
            />
          ) : (
            <a className="fieldMsg" href={user.linUsername}>
              {user.linUsername ? user.linUsername : "-"}
            </a>
          )}
        </div>
        <div className="infoField">
          <label for="github" className="fieldTitle">
            Github:{" "}
          </label>
          {isEditable ? (
            <input
              type="text"
              name="github"
              placeholder={user.ghUsername}
              className="inputField"
              value={input.github || ""}
              onChange={handleChange}
            />
          ) : (
            <a className="fieldMsg" href={user.ghUsername}>
              {user.ghUsername ? user.ghUsername : "-"}
            </a>
          )}
        </div>
        <div className="infoField">
          <span className="fieldTitle">Api-key: </span>
          <span className="fieldMsg">{user.apikey}</span>
        </div>
        <br />
        {isEditable ? (
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={() => setIsEditable(!isEditable)}
          >
            Submit
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsEditable(!isEditable)}
          >
            Edit
          </Button>
        )}
      </form>
    </div>
  );
};

export default Profile;
