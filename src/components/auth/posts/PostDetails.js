import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPostByPostId } from "../../../services/postService";
import { getAllUsers } from "../../../services/userService";
import { assignOrders } from "../../../services/orderService";
import "./PostDetails.css";

export const PostDetails = ({ currentUser }) => {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getPostByPostId(postId).then((data) => {
      const postObj = data[0];
      setPost(postObj);
    });
  }, [postId]);

  useEffect(() => {
    getAllUsers().then((usersArray) => {
      setUsers(usersArray);
    });
  }, []);

  const handleBuy = () => {
    const loggedInUser = users.find((user) => user.id === currentUser.id);
    const newUserOrder = {
      userId: loggedInUser.id,
      postId: post.id,
    };
    assignOrders(newUserOrder).then(() => {
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
                <button className="btn    s" onClick={handleBuy}>
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
