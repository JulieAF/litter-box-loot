import { useEffect, useState } from "react";
import { deletePost, getPostByPostId } from "../../../services/postService";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./MyPost.css";

export const MyPostDetails = () => {
  // extracting the postId parameter from the current URL
  const { postId } = useParams();
  // create a state variable post and a function setPost to update it
  const [post, setPost] = useState({});
  // uses the useNavigate hook to create a navigate function
  const navigate = useNavigate();

  useEffect(() => {
    //calling function getPostByPostId which returns a Promise. .then() handles the response when the Promise resolves. The data parameter contains the response from the network request.
    getPostByPostId(postId).then((data) => {
      //  extracts the first item from the data array and assigns it to a new variable postObj
      const postObj = data[0];
      // updates the state of the component with the post object fetched from the API
      setPost(postObj);
    });
    // will only re-run if the values in this array change
  }, [postId]);

  const handleDelete = () => {
    //calls deletePost function with argument of postId which returns a promise
    deletePost(postId).then(() => {
      // navigate is invoked inside of the .then callback function which navigates to the /myProfile route
      navigate(`/myProfile`);
    });
  };

  return (
    <>
      <h2 className="page-title">Litter Box Loot</h2>
      <section className="my-post-details-container">
        <div className="my-post-details">
          <div className="my-post-details-image">
            <img src={post.image} alt={post.name} width="400px"></img>
          </div>
          <div className="my-post-details-info">
            <h2>Title: {post.title}</h2>
            <div>Condition: {post.condition}</div>
            <h2>Price: {post.price}</h2>
            <Link
              style={{ textDecoration: "none", color: "rgb(79, 17, 146)" }}
              post={post}
              key={post.id}
              to={`/myProfile`}
            >
              <div className="seller">Seller: {post.user?.name}</div>
            </Link>
            <div>Item Specifics: {post.about}</div>
            <div>Shipping: Free Economy Shipping</div>
          </div>
          <div className="my-btn-container">
            <button className="my-btn-1">
              <Link
                style={{ textDecoration: "none", color: "rgb(79, 17, 146)" }}
                post={post}
                key={post.id}
                to={`/myProfile/${post.id}/${post.id}`}
              >
                Edit Post
              </Link>
            </button>
            <button className="my-btn-2" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
