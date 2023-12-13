import { useState, useEffect } from "react";
import { getAllPosts } from "../../../services/postService";
import { getAllCategories } from "../../../services/categoryService";
import "./Post.css";
import { PostFilter } from "./PostFilter";
import { Post } from "./Post";
import { Link } from "react-router-dom";

export const AllPosts = () => {
  // Declaring four pieces of state using useState hook
  const [allPosts, setAllPosts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  // selectedCategory is a string that will hold the id of the currently selected category
  const [selectedCategory, setSelectedCategory] = useState("0");
  // filteredPosts is an array that will hold the posts that match the selected category
  let [filteredPosts, setFilteredPosts] = useState([]);

  //fetches and sets posts
  useEffect(() => {
    //getAllPosts function returns a promise that resolves in an array
    getAllPosts().then((postArr) => {
      //setAllPosts updates the state with the postArr
      setAllPosts(postArr);
    });
  }, []);
  //fetches and sets categories
  useEffect(() => {
    //getAllCategories function returns a promise that resolves in an array
    getAllCategories().then((categoriesArray) => {
      //setAllCategories updates the state with the categoriesArr
      setAllCategories(categoriesArray);
    });
  }, []);
  //updates the displayed posts based on the selected category
  useEffect(() => {
    const postsFiltered =
      // ternary operation. Checks if selectedCategory is equal to 0
      selectedCategory === "0"
        ? //if true all posts
          allPosts
        : //else filter all posts
          allPosts.filter(
            //checking if category id equals the selected category id after it has been converted into an integer
            (post) => post.categoryId === parseInt(selectedCategory)
          );
    //updating state of postsFiltered
    setFilteredPosts(postsFiltered);
    //rerun the effect if the values in the dependency array change
  }, [selectedCategory, allPosts]);

  return (
    <>
      {/* JSX what will be rendered to the DOM */}
      <h2 className="page-title">Litter Box Loot</h2>
      <article className="posts-container">
        <div className="posts">
          {/* rendering PostFilter component */}
          <PostFilter
            // key-value pairs as props
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            allCategories={allCategories}
          />
          {/* mapping over filteredPosts array */}
          {filteredPosts.map((post) => {
            return (
              // link for each post
              <Link
                // passing a key
                key={post.id}
                style={{ textDecoration: "none", color: "rgb(79, 17, 146)" }}
                //url that includes the post's id
                to={`/posts/${post.id}`}
              >
                {/* Post component displays post's content */}
                <Post post={post} key={post.id} />
              </Link>
            );
          })}
        </div>
      </article>
    </>
  );
};
