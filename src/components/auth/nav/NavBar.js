import { Link } from "react-router-dom";
import "./NavBar.css";

export const NavBar = () => {
  return (
    <ul className="navbar">
      <li className="navbar-item">
        <Link to="/home">Home</Link>
      </li>
      <li className="navbar-item">
        <Link to="/myPosts">My Posts</Link>
      </li>
      <li className="navbar-item">
        <Link to="/myOrders">My Orders</Link>
      </li>
      <li className="navbar-item">
        <Link to="/newPost">New Post</Link>
      </li>
    </ul>
  );
};
