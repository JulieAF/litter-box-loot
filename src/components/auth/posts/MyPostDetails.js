import { useEffect, useState } from "react";
import { deletePost, getPostByPostId } from "../../../services/postService";
import { Link, useNavigate, useParams } from "react-router-dom";

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
      navigate(`/myPosts`);
    });
  };

  return (
    <section className="post">
      <header className="post-header">{post.id}</header>
      <div>
        <span className="post-info">Image : </span>
        {post.image}
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
        <button className="form-btn btn-primary">
          <Link post={post} key={post.id} to={`/myPosts/${post.id}/${post.id}`}>
            Edit Post
          </Link>
        </button>
      </div>
      <button className="form-btn btn-primary" onClick={handleDelete}>
        Delete
      </button>
    </section>
  );
};
