import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllPosts, getPostByUserId } from "../../../services/postService";
import { assignOrders } from "../../../services/orderService";

export const PostDetails = ({ currentUser }) => {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getPostByUserId(postId).then((data) => {
      const postObj = data[0];
      setPost(postObj);
    });
  }, [postId]);

  const getAndSetPosts = () => {
    getAllPosts().then((postArray) => {
      setPost(postArray);
    });
  };

  const handleBuy = () => {
    const currentUserLoggedIn = users.find(
      (user) => user.userId === currentUser.id
    );

    const newOrder = {
      userId: currentUserLoggedIn.id,
      postId: post.id, //doesn't read post.id here
    };

    assignOrders(newOrder).then(() => {
      getAndSetPosts();
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
            <Link to={`/myOrders/`}>Buy</Link>
          </button>
        </div>
      </footer>
    </section>
  );
};
