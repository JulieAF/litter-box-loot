import { useEffect, useState } from "react";
import { deletePost, getPostByPostId } from "../../../services/postService";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./Post.css";

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
    <section className="myPost">
      <div>
        <img src={post.image} alt={post.name} width="400px"></img>
      </div>
      <div>
        <span className="post-info">Title : </span>
        {post.title}
      </div>
      <div>
        <span className="post-info">Seller: </span>
        {post.user?.name}
      </div>
      <div>
        <span className="post-info">Category : </span>
        {post.category?.name}
      </div>
      <div>
        <span className="post-info">Price : </span>
        {post.price}
      </div>
      <div className="form-group">
        <button className="form-btn">
          <Link
            post={post}
            key={post.id}
            to={`/myProfile/${post.id}/${post.id}`}
          >
            Edit Post
          </Link>
        </button>
      </div>
      <div className="form-group">
        <button className="form-btn" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </section>
  );
};
