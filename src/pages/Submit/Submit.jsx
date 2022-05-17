import Button from "@mui/material/Button";
import { useState } from "react";
import "./Submit.css";

const Submit = () => {
    const [input, setInput] = useState({});

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
  return (
    <div className="infoContainer">
      <form onSubmit={handleSubmit}>
        <div className="infoField">
          <label for="title" className="fieldTitle">Title: </label>
          <input type="text" name="title" className="inputField" value={input.title || ""} onChange={handleChange}/>
        </div>
        <div className="infoField">
          <label for="url" className="fieldTitle">Url: </label>
          <input type="url" name="url" className="inputField" value={input.url || ""}  onChange={handleChange}/>
        </div>
        <div className="orField">
            or
        </div>
        <div className="infoField">
          <label for="text" className="fieldTitle">Text: </label>
          <textarea name="text" value={input.text || ""} onChange={handleChange}/>
        </div>
        <Button type="submit" variant="contained" color="primary">Submit</Button>
      </form>
      <br />
      <div className="explanationField">Leave url blank to submit a question for discussion. If there is no url, the text (if any) will appear at the top of the thread.</div>

    </div>
  );
};

export default Submit;
