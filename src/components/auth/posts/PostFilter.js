import "./Post.css";

export const PostFilter = ({
  selectedCategory,
  setSelectedCategory,
  allCategories,
}) => {
  return (
    <article className="posts">
      <select
        className="category-select"
        id="category"
        value={selectedCategory}
        onChange={(event) => {
          setSelectedCategory(event.target.value);
        }}
      >
        <option value="0">Shop By Category</option>
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
