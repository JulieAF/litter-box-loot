import { useState, useEffect } from "react";
import { getAllPosts } from "../../../services/postService";
import { getAllCategories } from "../../../services/categoryService";
import "./Post.css";
import { PostFilter } from "./PostFilter";
import { setSelectionRange } from "@testing-library/user-event/dist/utils";
import { Post } from "./Post";

export const AllPosts = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("0");
  let [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    getAllPosts().then((postArr) => {
      setAllPosts(postArr);
    });
  }, []);

  useEffect(() => {
    getAllCategories().then((categoriesArray) => {
      setAllCategories(categoriesArray);
    });
  }, []);

  useEffect(() => {
    const postsFiltered =
      selectedCategory === "0"
        ? allPosts
        : allPosts.filter(
            (post) => post.categoryId === parseInt(selectedCategory)
          );
    setFilteredPosts(postsFiltered);
  }, [selectedCategory, allPosts]);

  return (
    <div className="posts-container">
      <h2>Posts</h2>
      <PostFilter
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectionRange}
        allCategories={allCategories}
      />
      <article className="posts">
        {filteredPosts.map((post) => {
          return <Post post={post} />;
        })}
      </article>
    </div>
  );
};
