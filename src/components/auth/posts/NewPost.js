import { useEffect, useState } from "react";
import { getAllCategories } from "../../../services/categoryService";
import { useNavigate } from "react-router-dom";
import "./NewPost.css";

export const NewPost = ({ currentUser }) => {
  // Create a state variable that is an object that holds several properties
  const [userChoices, setUserChoices] = useState({
    image: "",
    title: "",
    condition: "",
    categoryId: 0,
    price: "",
    about: "",
  });
  const [categories, setCategories] = useState([]);
  // uses the useNavigate hook to create a navigate function
  const navigate = useNavigate();

  //fetches and sets categories
  useEffect(() => {
    //getAllCategories function returns a promise that resolves in an array
    getAllCategories().then((categoriesData) => {
      //setAllCategories updates the state with the categoriesData
      setCategories(categoriesData);
    });
  }, []);

  const handleSave = (event) => {
    // prevents the default action of the form submission event, which is to refresh the page
    event.preventDefault();
    // checks if all properties of the userChoices object are truthy
    if (
      userChoices.image &&
      userChoices.title &&
      userChoices.categoryId &&
      userChoices.price
    ) {
      // Creates a new object userChoicesWithId by spreading the properties of the userChoices object and adding a new property userId with the value of currentUser.id.
      const userChoicesWithId = {
        ...userChoices,
        userId: currentUser.id,
      };
      // Makes a POST request to the server.
      fetch("http://localhost:8088/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userChoicesWithId),
      }).then(() => {
        // Makes a GET request to the server to fetch the updated list of posts.
        fetch(`http://localhost:8088/posts`).then(() => {
          // navigates the user to the home page ("/")
          navigate("/");
        });
      });
      // if all properties of the userChoices object are not truthy
    } else {
      alert("Form not filled");
    }
  };

  return (
    <>
      <h2 className="page-title">Litter Box Loot</h2>
      <div className="form-container">
        <form>
          <h2 className="page-sub-title">Add a Post</h2>
          <fieldset>
            <div className="form-group">
              <label htmlFor="Image">Image: </label>
              <input
                required
                id="image"
                type="text"
                className="form-control"
                placeholder="Image Url"
                value={userChoices.image ? userChoices.image : ""}
                onChange={(event) => {
                  // using the spread operator to create a shallow copy of the object. This is done to avoid mutating the original state directly
                  const copy = { ...userChoices };
                  // updates the image property of the copied userChoices object with the new value from the input element
                  copy.image = event.target.value;
                  // updates the userChoices state with the new copy object
                  setUserChoices(copy);
                }}
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label htmlFor="title">Title: </label>
              <input
                required
                id="title"
                type="text"
                className="form-control"
                placeholder=""
                value={userChoices.title ? userChoices.title : ""}
                onChange={(event) => {
                  // using the spread operator to create a shallow copy of the object. This is done to avoid mutating the original state directly
                  const copy = { ...userChoices };
                  // updates the title property of the copied userChoices object with the new value from the input element
                  copy.title = event.target.value;
                  // updates the userChoices state with the new copy object
                  setUserChoices(copy);
                }}
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label htmlFor="condition">Item Condition:</label>
              <input
                required
                id="condition"
                type="text"
                className="form-control"
                placeholder=""
                value={userChoices.condition ? userChoices.condition : ""}
                onChange={(event) => {
                  // using the spread operator to create a shallow copy of the object. This is done to avoid mutating the original state directly
                  const copy = { ...userChoices };
                  // updates the condition property of the copied userChoices object with the new value from the input element
                  copy.condition = event.target.value;
                  // updates the userChoices state with the new copy object
                  setUserChoices(copy);
                }}
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label htmlFor="price">Price: </label>
              <input
                required
                id="price"
                type="text"
                className="form-control"
                placeholder=""
                value={userChoices.price ? userChoices.price : ""}
                onChange={(event) => {
                  // using the spread operator to create a shallow copy of the object. This is done to avoid mutating the original state directly
                  const copy = { ...userChoices };
                  // updates the price property of the copied userChoices object with the new value from the input element
                  copy.price = event.target.value;
                  // updates the userChoices state with the new copy object
                  setUserChoices(copy);
                }}
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label htmlFor="about">Item Details:</label>
              <input
                required
                id="about"
                type="text"
                className="form-control"
                value={userChoices.about ? userChoices.about : ""}
                onChange={(event) => {
                  // using the spread operator to create a shallow copy of the object. This is done to avoid mutating the original state directly
                  const copy = { ...userChoices };
                  // updates the about property of the copied userChoices object with the new value from the input element
                  copy.about = event.target.value;
                  // updates the userChoices state with the new copy object
                  setUserChoices(copy);
                }}
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-category-select-container">
              <div>Category: </div>
              <select
                className="form-category-select"
                value={userChoices.categoryId ? userChoices.categoryId : ""}
                onChange={(event) => {
                  // using the spread operator to create a shallow copy of the object. This is done to avoid mutating the original state directly
                  const copy = { ...userChoices };
                  // updates the categoryId property of the copied userChoices object with the new value from the input element
                  copy.categoryId = parseInt(event.target.value);
                  // updates the userChoices state with the new copy object
                  setUserChoices(copy);
                }}
              >
                {/* rendering a default option in the dropdown */}
                <option value="0">Please select a Category</option>
                {/* using the map() function to iterate over each item in the categories array */}
                {categories.map((categoryObj) => {
                  return (
                    // returns a JSX <option> element for each category
                    <option value={categoryObj.id} key={categoryObj.id}>
                      {categoryObj.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </fieldset>
          <div className="form-btn-container">
            <button
              className="form-btn"
              // event handler with the parameter of event
              onClick={(event) => {
                // calls the handleSave function and passes the event object to it
                handleSave(event);
              }}
            >
              Add Post
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
