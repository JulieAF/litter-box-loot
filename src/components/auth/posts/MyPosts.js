import { useEffect, useState } from "react";
import { getAllPosts } from "../../../services/postService";
import { Post } from "./Post";
import { Link } from "react-router-dom";
import "./Post.css";

export const MyPosts = ({ currentUser }) => {
  // Declaring state using useState hook
  const [post, setPost] = useState([]);
  let [userPosts, setUserPosts] = useState([]);

  //fetches and sets posts
  useEffect(() => {
    //getAllPosts function returns a promise that resolves in an array
    getAllPosts().then((postArray) => {
      //setAllPosts updates the state with the postArr
      setPost(postArray);
    });
  }, []);

  useEffect(() => {
    // filter method to create a new array (foundPosts) that includes only the posts that match the condition: post.userId === currentUser.id
    const foundPosts = post.filter((post) => post.userId === currentUser.id);
    // update the state of userPosts to be the foundPosts array
    setUserPosts(foundPosts);
    // useEffect hook will only re-run when the values in this array change
  }, [post, currentUser]);

  return (
    <>
      <div className="posts-container">
        <h2 className="page-title">Litter Box Loot</h2>
        <article className="posts">
          {/* mapping over userPosts array */}
          {userPosts.map((post) => {
            return (
              // link for each post
              <Link key={post.id} to={`/myPosts/${post.id}`}>
                {/* Post component displays post's content */}
                <Post post={post} key={post.id} />
              </Link>
            );
          })}
        </article>
      </div>
    </>
  );
};
