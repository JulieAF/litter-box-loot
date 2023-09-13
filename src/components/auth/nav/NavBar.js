import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";

export const NavBar = () => {
  const navigate = useNavigate;

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
      {localStorage.getItem("learning_user") ? (
        <li>
          <Link
            to=""
            onClick={() => {
              localStorage.removeItem("learning_user");
              navigate("/login", { replace: true });
            }}
          >
            Logout
          </Link>
        </li>
      ) : (
        ""
      )}
    </ul>
  );
};
