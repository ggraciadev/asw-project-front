import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Home from "./pages/Home/Home";
import Submit from "./pages/Submit/Submit";
import Threads from "./pages/Threads/Threads";
import Ask from "./pages/Ask/Ask";
import User from "./pages/User/User";
import Profile from "./pages/Profile/Profile";
import Item from "./pages/Item/Item";
import { Routes, Route } from "react-router-dom";
import LikedPosts from "./pages/LikedPosts/LikedPosts";
import LikedComments from "./pages/LikedComments/LikedComments";
import Reply from "./pages/Reply/Reply";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/submit" element={<Submit />} />
        <Route path="/threads" element={<Threads />} />
        <Route path="/ask" element={<Ask />} />
        <Route path="/user" element={<User />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/item" element={<Item />} />
        <Route path="/likedPosts" element={<LikedPosts />} />
        {/*         <Route path="/likedComments" element={<LikedComments />} /> */}
        <Route path="/reply" element={<Reply />} />
      </Routes>
    </div>
  );
}

export default App;
