import "./Post.css";

export const Post = ({ post }) => {
  return (
    <section className="post" key={post.id}>
      <header>
        <img src={post.image} alt={post.name} width="400px"></img>
      </header>
      <div className="post-info">
        <footer>
          <div> {post.title}</div>
          <div> {post.condition}</div>
          <div>{post.price} </div>
          <div>Buy It Now</div>
          <div>Free Shipping</div>
        </footer>
      </div>
    </section>
  );
};
