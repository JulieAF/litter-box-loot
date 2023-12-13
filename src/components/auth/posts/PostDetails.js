import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPostByPostId } from "../../../services/postService";
import { getAllUsers } from "../../../services/userService";
import { assignOrders } from "../../../services/orderService";
import "./PostDetails.css";

export const PostDetails = ({ currentUser }) => {
  // extracting the postId parameter from the current URL
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const [users, setUsers] = useState([]);
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

  //fetches and sets users
  useEffect(() => {
    //getAllUsers function returns a promise that resolves in an array
    getAllUsers().then((usersArray) => {
      //setUsers updates the state with the usersArr
      setUsers(usersArray);
    });
  }, []);

  const handleBuy = () => {
    // find method returns the first element in the array that satisfies the provided testing function, in this case, a user whose id matches currentUser.id
    const loggedInUser = users.find((user) => user.id === currentUser.id);
    // creates a new object newUserOrder
    const newUserOrder = {
      userId: loggedInUser.id,
      postId: post.id,
    };
    // Calling assignOrders function with newUserOrder as its argument. Returns a Promise. .then handles the Promise response
    assignOrders(newUserOrder).then(() => {
      // When the Promise is resolved the navigate function is called with the argument "/myOrders/" which redirects the user to a page showing their orders
      navigate("/myOrders/");
    });
  };

  return (
    <>
      <h2 className="page-title">Litter Box Loot</h2>
      <section className="post-details-container">
        <article className="post-details">
          <div className="post-details-image">
            <img src={post.image} alt={post.name} width="500px" />
          </div>
          <div className="post-details-info">
            <h2>{post.title}</h2>
            <div>Condition: {post.condition}</div>
            <h2>Price: {post.price}</h2>
            <Link
              style={{ textDecoration: "none", color: "rgb(79, 17, 146)" }}
              key={post.id}
              to={`/posts/${post.id}/${post.user?.id}`}
            >
              <div className="seller">Seller: {post.user?.name}</div>
            </Link>
            <div>Item Specifics: {post.about}</div>
            <div>Shipping: Free Economy Shipping</div>
            <div className="btn-container">
              {post.user?.id !== currentUser.id && (
                <button className="btn" onClick={handleBuy}>
                  Buy It Now
                </button>
              )}
            </div>
          </div>
        </article>
      </section>
    </>
  );
};
