import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";

export const NavBar = () => {
  const navigate = useNavigate;

  return (
    <ul className="navbar">
      <li className="navbar-item">
        <Link className="navbar-link" to="/home">
          Litter Box Loot
        </Link>
      </li>
      <li className="navbar-item">
        <Link className="navbar-link" to="/myProfile">
          My Profile
        </Link>
      </li>
      <li className="navbar-item">
        <Link className="navbar-link" to="/myOrders">
          My Orders
        </Link>
      </li>
      <li className="navbar-item">
        <Link className="navbar-link" to="/newPost">
          New Post
        </Link>
      </li>
      {localStorage.getItem("learning_user") ? (
        <li>
          <Link
            className="navbar-link"
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
