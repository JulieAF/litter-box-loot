import { useEffect, useState } from "react";
import { getAllCategories } from "../../../services/categoryService";
import { useNavigate } from "react-router-dom";
import "./NewPost.css";

export const NewPost = ({ currentUser }) => {
  const [userChoices, setUserChoices] = useState({
    image: "",
    title: "",
    condition: "",
    categoryId: 0,
    price: "",
    about: "",
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
                value={userChoices.title ? userChoices.title : ""}
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
                value={userChoices.condition ? userChoices.condition : ""}
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
                value={userChoices.price ? userChoices.price : ""}
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
                value={userChoices.about ? userChoices.about : ""}
                onChange={(event) => {
                  const copy = { ...userChoices };
                  copy.about = event.target.value;
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
          <div className="form-btn-container">
            <button
              className="form-btn"
              onClick={(event) => {
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
