import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { createUser, getUserByEmail } from "../../services/userService";

export const Register = (props) => {
  const [user, setUser] = useState({
    email: "",
    name: "",
  });
  // uses the useNavigate hook to create a navigate function
  let navigate = useNavigate();

  const registerNewUser = () => {
    // creates a new object newUser
    const newUser = {
      // spread operator is used to create a shallow copy of the user object
      ...user,
    };

    // calls createUser function newUser as it's argument which returns a Promise. The createdUser callback function is called with the resolve of the Promise.
    createUser(newUser).then((createdUser) => {
      // checks if the createdUser object has a property named "id
      if (createdUser.hasOwnProperty("id")) {
        // if true it uses the setItem method of the localStorage object to store a new item
        localStorage.setItem(
          // key"learning_user"
          "learning_user",
          // value: stringified object that contains the "id" property of the createdUser object
          JSON.stringify({
            id: createdUser.id,
          })
        );

        navigate("/");
      }
    });
  };

  const handleRegister = (e) => {
    // prevents the form from being submitted in the traditional way, which would cause the page to refresh
    e.preventDefault();
    // calls getUserByEmail function passing in user.email as argument. Returns a Promise. .then method is called on the Promise. response is called when Promise is resolved
    getUserByEmail(user.email).then((response) => {
      // checks if the length of the response is greater than 0
      if (response.length > 0) {
        // Duplicate email. No good.
        window.alert("Account with that email address already exists");
      } else {
        // Good email, create user.
        registerNewUser();
      }
    });
  };

  const updateUser = (evt) => {
    // creates a shallow copy of the user object using the spread operator (...)
    const copy = { ...user };
    // updates a property in the copy object
    copy[evt.target.id] = evt.target.value;
    // update the state of the user object
    setUser(copy);
  };

  return (
    <main className="auth-container">
      <form className="auth-form" onSubmit={handleRegister}>
        <h1 className="header">Litter Box Loot</h1>
        <h2>Please Register</h2>
        <fieldset className="auth-fieldset">
          <div>
            <input
              onChange={updateUser}
              type="text"
              id="name"
              className="auth-form-input"
              placeholder="Enter your name"
              required
              autoFocus
            />
          </div>
        </fieldset>
        <fieldset className="auth-fieldset">
          <div>
            <input
              onChange={updateUser}
              type="email"
              id="email"
              className="auth-form-input"
              placeholder="Email address"
              required
            />
          </div>
        </fieldset>
        <fieldset className="auth-fieldset">
          <div>
            <button type="submit">Register</button>
          </div>
        </fieldset>
      </form>
    </main>
  );
};
