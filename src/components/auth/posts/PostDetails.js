import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPostByPostId } from "../../../services/postService";
import { getAllUsers } from "../../../services/userService";
import { assignOrders } from "../../../services/orderService";

export const PostDetails = ({ currentUser }) => {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const [users, setUsers] = useState([]);

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
      console.log("Order Placed");
    });
  };

  return (
    <section className="post">
      <header className="post-header">{post.image}</header>
      <header className="post-info"></header>
      <div>{post.title}</div>
      <div>{post.category?.name}</div>
      <div>{post.price}</div>
      <div>{post.user?.name}</div>
      <footer>
        <div className="btn-container">
          {post.user?.id !== currentUser.id && (
            <button className="btn btn-secondary" onClick={handleBuy}>
              <Link to={`/myOrders/`}>Buy</Link>
            </button>
          )}
        </div>
      </footer>
    </section>
  );
};
