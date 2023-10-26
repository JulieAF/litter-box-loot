import { useEffect, useState } from "react";
import { deletePost, getPostByPostId } from "../../../services/postService";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./MyPost.css";

export const MyPostDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getPostByPostId(postId).then((data) => {
      const postObj = data[0];
      setPost(postObj);
    });
  }, [postId]);

  const handleDelete = () => {
    deletePost(postId).then(() => {
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
