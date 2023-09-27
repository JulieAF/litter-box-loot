import { useEffect, useState } from "react";
import { getAllPosts } from "../../../services/postService";
import { Post } from "./Post";
import { Link } from "react-router-dom";
import "./Post.css";

export const MyPosts = ({ currentUser }) => {
  const [post, setPost] = useState([]);
  let [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    getAllPosts().then((postArray) => {
      setPost(postArray);
    });
  }, []);

  useEffect(() => {
    const foundPosts = post.filter((post) => post.userId === currentUser.id);
    setUserPosts(foundPosts);
  }, [post, currentUser]);

  return (
    <>
      <div className="posts-container">
        <h2 className="page-title">Litter Box Loot</h2>
        <article className="posts">
          {userPosts.map((post) => {
            return (
              <Link key={post.id} to={`/myPosts/${post.id}`}>
                <Post post={post} key={post.id} />
              </Link>
            );
          })}
        </article>
      </div>
    </>
  );
};
