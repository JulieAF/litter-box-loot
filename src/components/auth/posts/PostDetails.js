import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPostByPostId } from "../../../services/postService";
import { getAllUsers } from "../../../services/userService";
import { assignOrders } from "../../../services/orderService";
import "./Post.css";

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
    <section className="post-detail-container">
      <header className="post-header">
        <img src={post.image} alt={post.name} width="400px" />
      </header>
      <div className="post-info">
        <div>{post.title}</div>
        <div>Condition: {post.condition}</div>
        <div>Price: {post.price}</div>
        <Link key={post.id} to={`/posts/${post.id}/${post.user?.id}`}>
          <div>Seller: {post.user?.name}</div>
        </Link>
        <div>Item Specifics: {post.about}</div>
        <div>Shipping: Free Economy Shipping</div>
      </div>
      <footer>
        <div className="btn-container">
          {post.user?.id !== currentUser.id && (
            <button onClick={handleBuy}>Buy It Now</button>
          )}
        </div>
      </footer>
    </section>
  );
};
