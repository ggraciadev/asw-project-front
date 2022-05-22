import Button from "@mui/material/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import usePosts from "../../hooks/usePosts";
import "./Submit.css";

const Submit = () => {
  const [input, setInput] = useState({});
  const { submitPost } = usePosts();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const destinationLink = await submitPost(input);
    navigate(destinationLink);
  };
  return (
    <div className="infoContainer">
      <form onSubmit={handleSubmit}>
        <div className="infoField">
          <label className="fieldTitle">Title: </label>
          <input
            type="text"
            name="title"
            className="inputField"
            value={input.title || ""}
            onChange={handleChange}
          />
        </div>
        <div className="infoField">
          <label className="fieldTitle">Url: </label>
          <input
            type="url"
            name="url"
            className="inputField"
            value={input.url || ""}
            onChange={handleChange}
          />
        </div>
        <div className="orField">or</div>
        <div className="infoField">
          <label className="fieldTitle">Message: </label>
          <textarea
            name="message"
            value={input.message || ""}
            onChange={handleChange}
          />
        </div>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
      <br />
      <div className="explanationField">
        Leave url blank to submit a question for discussion. If there is no url,
        the text (if any) will appear at the top of the thread.
      </div>
    </div>
  );
};

export default Submit;
