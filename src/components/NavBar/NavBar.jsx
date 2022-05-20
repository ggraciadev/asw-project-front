import "./NavBar.css";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const NavBar = () => {
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
        <Link className="link" to="/threads">
          <Button>Threads</Button>
        </Link>
      </div>
      <Link className="link" to={{ pathname: `/profile/gerard.madrid`}}>
          <Button>Gerard Madrid</Button>
        </Link>
    </nav>
  );
};

export default NavBar;
