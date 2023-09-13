import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllPosts, getPostDetails } from "../../../services/postService";
import { getAllUsers } from "../../../services/userService";
import { assignOrders } from "../../../services/orderService";

export const PostDetails = ({ currentUser }) => {
  const [post, setPost] = useState({});
  const { postId } = useParams();
  const [users, setUsers] = useState([]);
  const [postForOrders, setPostsForOrders] = useState([]);

  useEffect(() => {
    getPostDetails(postId).then((data) => {
      const postObj = data[0];
      setPost(postObj);
    });
  }, [postId]);

  useEffect(() => {
    getAllPosts().then((postArr) => {
      setPostsForOrders(postArr);
    });
  }, []);

  useEffect(() => {
    getAllUsers().then((usersArray) => {
      setUsers(usersArray);
    });
  }, []);

  const handleBuy = () => {
    const currentUserLoggedIn = users.find(
      (user) => user.userId === currentUser.id
    );
    const newOrder = {
      userId: currentUserLoggedIn.id,
      postId: post.id,
    };

    assignOrders(newOrder).then(() => {
      console.log("poop");
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
          <button className="btn btn-secondary" onClick={handleBuy}>
            Buy
          </button>
        </div>
      </footer>
    </section>
  );
};
