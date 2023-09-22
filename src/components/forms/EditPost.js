import "./Form.css";
import { editedPost, getPostByPostId } from "../../services/postService";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllCategories } from "../../services/categoryService";

export const EditPost = () => {
  const { editPost } = useParams();
  const [post, setPost] = useState({});
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getPostByPostId(editPost).then((data) => {
      const postObj = data[0];
      setPost(postObj);
    });
  }, [editPost]);

  useEffect(() => {
    getAllCategories().then((categoriesArray) => {
      setCategories(categoriesArray);
    });
  }, []);

  const handleSave = (event) => {
    event.preventDefault();

    const updatedPost = {
      id: post.id,
      image: post.image,
      title: post.title,
      userId: post.userId,
      price: post.price,
      categoryId: post.categoryId,
    };

    editedPost(updatedPost).then(() => {
      navigate(`/myPosts`);
    });
  };

  return (
    <form className="editPost">
      <h2>Update Post</h2>
      <fieldset>
        <div className="form-group">
          <label>Image URL:</label>
          <input
            type="text"
            name="image"
            value={post.image ? post.image : ""}
            onChange={(event) => {
              const copy = { ...post };
              copy.image = event.target.value;
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
              const copy = { ...post };
              copy.title = event.target.value;
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
              const copy = { ...post };
              copy.condition = event.target.value;
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
              const copy = { ...post };
              copy.price = event.target.value;
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
              const copy = { ...post };
              copy.about = event.target.value;
              setPost(copy);
            }}
            className="form-control"
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <div>Category:</div>
          <select
            name="categoryId"
            value={post.categoryId ? post.categoryId : ""}
            onChange={(event) => {
              console.log(event.target.value);
              const copy = { ...post };
              copy.categoryId = parseInt(event.target.value);
              setPost(copy);
            }}
          >
            <option value={0}>Please select a category</option>
            {categories.map((categoryObj) => {
              return (
                <option key={categoryObj.id} value={categoryObj.id}>
                  {categoryObj.name}
                </option>
              );
            })}
          </select>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <button className="form-btn" onClick={handleSave}>
            Save Post
          </button>
        </div>
      </fieldset>
    </form>
  );
};
