import "./NavBar.css";
import Button from "@mui/material/Button";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, MenuItem } from "@mui/material";

const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <nav className="navBar">
      <div className="navBarElements">
        <Link className="link" to="/">
          <Button>FiberNews</Button>
        </Link>
        <Link className="link" to="/submit">
          <Button>Submit</Button>
        </Link>
        <Link className="link" to="/ask">
          <Button>Ask</Button>
        </Link>
        <Link
          className="link"
          to={{ pathname: `/threads?username=gerard.madrid` }}
        >
          <Button>Threads</Button>
        </Link>
      </div>
      <Button onClick={handleClick}>Gerard Madrid</Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <Link
          className="link"
          style={{ color: "black" }}
          to={{ pathname: `/profile?username=gerard.madrid` }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
        </Link>
        <Link
          className="link"
          style={{ color: "black" }}
          to={{ pathname: `/likedPosts` }}
        >
          <MenuItem onClick={handleClose}>Liked Submissions</MenuItem>
        </Link>
      </Menu>
    </nav>
  );
};

export default NavBar;
