import { useState, useEffect } from "react";
import { getAllCategories } from "../../services/categoryService";

export const EditPostFilter = () => {
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("0");

  useEffect(() => {
    getAllCategories().then((categoriesArray) => {
      setAllCategories(categoriesArray);
    });
  }, []);

  return (
    <article className="posts">
      <select
        name="category-select"
        id="category"
        value={selectedCategory}
        onChange={(event) => {
          setSelectedCategory(event.target.value);
        }}
      >
        <option value="0">Please select a Category</option>
        {allCategories.map((category) => {
          return (
            <option value={category.id} key={category.id}>
              {category.name}
            </option>
          );
        })}
      </select>
    </article>
  );
};
