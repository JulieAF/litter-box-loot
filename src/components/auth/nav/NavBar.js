import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";

export const NavBar = () => {
  const navigate = useNavigate();

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

      {/* Checks localStorage to see if a learning user is logged in */}
      {localStorage.getItem("learning_user") ? (
        <li>
          <Link
            className="navbar-link"
            // set to an empty string which won't navigate it to another page instead Onclick handles navigation
            to=""
            onClick={() => {
              // if user is logged in, this line removes the learning user from local storage
              localStorage.removeItem("learning_user");
              // uses navigate function to redirect user to the login page
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
