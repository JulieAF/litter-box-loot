export const Post = ({ post }) => {
  return (
    <section className="post" key={post.id}>
      <header className="post-info"></header>
      <div>{post.image}</div>
      <footer>
        <div>{post.title}</div>
        <div>{post.price}</div>
      </footer>
    </section>
  );
};
