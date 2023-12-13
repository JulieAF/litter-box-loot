import "./Post.css";

export const PostFilter = ({
  //props: current selected category, update selected category, array of categories
  selectedCategory,
  setSelectedCategory,
  allCategories,
}) => {
  return (
    <article className="category-select-container">
      {/* select dropdown menu */}
      <select
        className="category-select"
        id="category"
        value={selectedCategory}
        onChange={(event) => {
          setSelectedCategory(event.target.value);
        }}
      >
        <option value="0">Shop By Category</option>
        {/* maps over categories array and creates an option element for each category */}
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
