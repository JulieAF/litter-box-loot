import { useEffect, useState } from "react";
import { getAllCategories } from "../../../services/categoryService";
import { useNavigate } from "react-router-dom";
import "./Post.css";

export const NewPost = ({ currentUser }) => {
  const [userChoices, setUserChoices] = useState({
    image: "",
    title: "",
    categoryId: 0,
    price: "",
  });
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllCategories().then((categoriesData) => {
      setCategories(categoriesData);
    });
  }, []);

  const handleSave = (event) => {
    event.preventDefault();

    if (
      userChoices.image &&
      userChoices.title &&
      userChoices.categoryId &&
      userChoices.price
    ) {
      const userChoicesWithId = {
        ...userChoices,
        userId: currentUser.id,
      };
      fetch("http://localhost:8088/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userChoicesWithId),
      }).then(() => {
        fetch(`http://localhost:8088/posts`).then(() => {
          navigate("/");
        });
      });
    } else {
      alert("Form not filled");
    }
  };

  return (
    <form className="needName">
      <h2>Add a Post</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="image">image: </label>
          <input
            required
            id="image"
            type="text"
            className="form-control"
            placeholder="Image Url"
            value={userChoices.image}
            onChange={(event) => {
              const copy = { ...userChoices };
              copy.image = event.target.value;
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
            value={userChoices.title}
            onChange={(event) => {
              const copy = { ...userChoices };
              copy.title = event.target.value;
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
            value={userChoices.condition}
            onChange={(event) => {
              const copy = { ...userChoices };
              copy.condition = event.target.value;
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
            value={userChoices.price}
            onChange={(event) => {
              const copy = { ...userChoices };
              copy.price = event.target.value;
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
            value={userChoices.about}
            onChange={(event) => {
              const copy = { ...userChoices };
              copy.about = event.target.value;
              setUserChoices(copy);
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <div>Category: </div>
          <select
            className="category-select"
            value={userChoices.categoryId}
            onChange={(event) => {
              const copy = { ...userChoices };
              copy.categoryId = parseInt(event.target.value);
              setUserChoices(copy);
            }}
          >
            <option value="0">Please select a Category</option>
            {categories.map((categoryObj) => {
              return (
                <option value={categoryObj.id} key={categoryObj.id}>
                  {categoryObj.name}
                </option>
              );
            })}
          </select>
        </div>
      </fieldset>
      <button
        className=""
        onClick={(event) => {
          handleSave(event);
        }}
      >
        Add Post
      </button>
    </form>
  );
};
