import "./Form.css";
import { editedPost, getPostByPostId } from "../../services/postService";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllCategories } from "../../services/categoryService";

export const EditPost = () => {
  // extracting the editPost parameter from the current URL
  const { editPost } = useParams();
  const [post, setPost] = useState({});
  const [categories, setCategories] = useState([]);
  // uses the useNavigate hook to create a navigate function
  const navigate = useNavigate();

  useEffect(() => {
    //calling function getPostByPostId which returns a Promise. .then() handles the response when the Promise resolves. The data parameter contains the response from the network request.
    getPostByPostId(editPost).then((data) => {
      //  extracts the first item from the data array and assigns it to a new variable postObj
      const postObj = data[0];
      // updates the state of the component with the post object fetched from the API
      setPost(postObj);
    });
    // will only re-run if the values in this array change
  }, [editPost]);

  //fetches and sets categories
  useEffect(() => {
    //getAllCategories function returns a promise that resolves in an array
    getAllCategories().then((categoriesArray) => {
      //setAllCategories updates the state with the categoriesArr
      setCategories(categoriesArray);
    });
  }, []);

  const handleSave = (event) => {
    // prevents the default action of the form submission event, which is to refresh the page
    event.preventDefault();
    // defining updatedPost with properties and values
    const updatedPost = {
      id: post.id,
      image: post.image,
      title: post.title,
      condition: post.condition,
      userId: post.userId,
      price: post.price,
      about: post.about,
      categoryId: post.categoryId,
    };
    // calling editedPost function with updatedPost as argument. Returns a Promise. .then handles promise response.
    editedPost(updatedPost).then(() => {
      // navigate function is called with the string /myProfile as an argument which routes to routes to /myProfile.
      navigate(`/myProfile`);
    });
  };

  return (
    <>
      <h2 className="page-title">Litter Box Loot</h2>
      <div className="form-container">
        <form>
          <h2 className="page-sub-title">Update Post</h2>
          <fieldset>
            <div className="form-group">
              <label>Image URL:</label>
              <input
                type="text"
                name="image"
                value={post.image ? post.image : ""}
                onChange={(event) => {
                  // using the spread operator to create a shallow copy of the object. This is done to avoid mutating the original state directly
                  const copy = { ...post };
                  // updates the image property of the copied userChoices object with the new value from the input element
                  copy.image = event.target.value;
                  // updates the userChoices state with the new copy object
                  setPost(copy);
                }}
                required
                className="form-control"
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={post.title ? post.title : ""}
                onChange={(event) => {
                  // using the spread operator to create a shallow copy of the object. This is done to avoid mutating the original state directly
                  const copy = { ...post };
                  // updates the title property of the copied userChoices object with the new value from the input element
                  copy.title = event.target.value;
                  // updates the userChoices state with the new copy object
                  setPost(copy);
                }}
                required
                className="form-control"
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label>Item Condition:</label>
              <input
                type="text"
                name="condition"
                value={post.condition ? post.condition : ""}
                required
                onChange={(event) => {
                  // using the spread operator to create a shallow copy of the object. This is done to avoid mutating the original state directly
                  const copy = { ...post };
                  // updates the condition property of the copied userChoices object with the new value from the input element
                  copy.condition = event.target.value;
                  // updates the userChoices state with the new copy object
                  setPost(copy);
                }}
                className="form-control"
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label>Price:</label>
              <input
                type="text"
                name="price"
                value={post.price ? post.price : ""}
                required
                onChange={(event) => {
                  // using the spread operator to create a shallow copy of the object. This is done to avoid mutating the original state directly
                  const copy = { ...post };
                  // updates the price property of the copied userChoices object with the new value from the input element
                  copy.price = event.target.value;
                  // updates the userChoices state with the new copy object
                  setPost(copy);
                }}
                className="form-control"
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label>Item Details:</label>
              <input
                type="text"
                name="about"
                value={post.about ? post.about : ""}
                required
                onChange={(event) => {
                  // using the spread operator to create a shallow copy of the object. This is done to avoid mutating the original state directly
                  const copy = { ...post };
                  // updates the about property of the copied userChoices object with the new value from the input element
                  copy.about = event.target.value;
                  // updates the userChoices state with the new copy object
                  setPost(copy);
                }}
                className="form-control"
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-category-select-container">
              <div>Category:</div>
              <select
                className="form-category-select"
                name="categoryId"
                value={post.categoryId ? post.categoryId : ""}
                onChange={(event) => {
                  // using the spread operator to create a shallow copy of the object. This is done to avoid mutating the original state directly
                  const copy = { ...post };
                  // updates the category property of the copied userChoices object with the new value from the input element
                  copy.categoryId = parseInt(event.target.value);
                  // updates the userChoices state with the new copy object
                  setPost(copy);
                }}
              >
                {/* rendering a default option in the dropdown */}
                <option value={0}>Please select a category</option>
                {/* using the map() function to iterate over each item in the categories array */}
                {categories.map((categoryObj) => {
                  return (
                    // returns a JSX <option> element for each category
                    <option key={categoryObj.id} value={categoryObj.id}>
                      {categoryObj.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </fieldset>
          <fieldset>
            <div className="form-btn-container">
              <button className="form-btn" onClick={handleSave}>
                Save Post
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </>
  );
};
