import "./App.css";
import { useEffect, useState } from "react";
import { getAllPosts } from "./services/postService";

export const App = () => {
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    getAllPosts().then((postArr) => {
      setAllPosts(postArr);
    });
  }, []);

  return (
    <div className="posts-container">
      <h2>Posts</h2>
      <article className="posts">
        {allPosts.map((post) => {
          return (
            <section className="post" key={post.id}>
              <header className="post-info">{post.image}</header>
              <div>{post.title}</div>
              <div>{post.price}</div>
            </section>
          );
        })}
      </article>
    </div>
  );
};
