import "./Profile.css";

export const ProfilePost = ({ post }) => {
  return (
    <section className="post" key={post.id}>
      <div className="post-image">
        <img src={post.image} alt={post.name} width="400px"></img>
      </div>
      <div className="post-info">
        <h2> {post.title}</h2>
        <div> {post.condition}</div>
        <h2>{post.price} </h2>
        <div>Buy It Now</div>
        <div>Free Shipping</div>
      </div>
    </section>
  );
};
