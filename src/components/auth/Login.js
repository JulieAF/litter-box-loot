import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import "./Login.css"
import { getUserByEmail } from "../../services/userService";

export const Login = () => {
  const [email, set] = useState("DailyRotisserie@yahoo.com");
  // uses the useNavigate hook to create a navigate function
  const navigate = useNavigate();

  const handleLogin = (e) => {
    // prevents the form from being submitted in the traditional way, which would cause the page to refresh
    e.preventDefault();

    // calls getUserByEmail function passing in email as argument. Returns a Promise. .then method is called on the Promise. foundUsers is called when Promise is resolved
    return getUserByEmail(email).then((foundUsers) => {
      // checks if the foundUsers array has exactly one element
      if (foundUsers.length === 1) {
        // If a user was found, this line assigns the first user in the foundUsers array to a constant user
        const user = foundUsers[0];
        // if true it uses the setItem method of the localStorage object to store a new item
        localStorage.setItem(
          // key"learning_user"
          "learning_user",
          // value: stringified object that contains the "id" property
          JSON.stringify({
            id: user.id,
          })
        );

        navigate("/");
      } else {
        window.alert("Invalid login");
      }
    });
  };

  return (
    <main className="auth-container">
      <section>
        <form className="auth-form" onSubmit={handleLogin}>
          <h1 className="page-title">Litter Box Loot</h1>
          <h2 className="page-sub-title">Please sign in</h2>
          <fieldset className="auth-fieldset">
            <div>
              <input
                type="email"
                value={email}
                className="auth-form-input"
                onChange={(evt) => set(evt.target.value)}
                placeholder="Email address"
                required
                autoFocus
              />
            </div>
          </fieldset>
          <fieldset className="auth-fieldset">
            <div>
              <button className="form-btn" type="submit">
                Sign in
              </button>
            </div>
          </fieldset>
        </form>
      </section>
      <section className="register-link">
        <Link to="/register">Not a member yet?</Link>
      </section>
    </main>
  );
};
