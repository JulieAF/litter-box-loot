import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProfileByUser } from "../../../services/profilesService";
import { getPostByUserId } from "../../../services/postService";
import { Post } from "./Post";
import "./Seller.css";

export const SellerDetails = () => {
  // extracting the userId parameter from the current URL
  const { userId } = useParams();
  // creating state variables
  const [sellerProfile, setSellerProfile] = useState({});
  const [post, setPost] = useState([]);

  useEffect(() => {
    //calling function getProfileByUser which returns a Promise. .then() handles the response when the Promise resolves. The profileData parameter contains the response from the network request.
    getProfileByUser(userId).then((profileData) => {
      //  extracts the first item from the profileData array and assigns it to a new variable profileObj
      const profileObj = profileData[0];
      // updates the state of the component with the profile object fetched from the API
      setSellerProfile(profileObj);
    });
    // will only re-run if the values in this array change
  }, [userId]);

  useEffect(() => {
    //calling function getPostByUserId which returns a Promise. .then() handles the response when the Promise resolves. The fetchedPosts parameter contains the response from the network request.
    getPostByUserId(userId).then((fetchedPosts) => {
      // updates the state of the component with the post array fetched from the API
      setPost(fetchedPosts);
    });
    // will only re-run if the values in this array change
  }, [userId]);

  return (
    <>
      <h2 className="page-title">Litter Box Loot</h2>
      <div className="profile-container">
        <section className="profile" key={sellerProfile?.id}>
          <div className="profile-image">
            <img
              src={
                sellerProfile?.profiles?.image ||
                "https://www.creativefabrica.com/wp-content/uploads/2023/03/16/Kawaii-Cat-Profile-With-Flower-64532988-1.png"
              }
              onError={(e) => {
                e.target.onerror = null; // Prevents looping
                e.target.src =
                  "https://www.creativefabrica.com/wp-content/uploads/2023/03/16/Kawaii-Cat-Profile-With-Flower-64532988-1.png";
              }}
              alt={sellerProfile?.name}
              width="400px"
            ></img>
          </div>
          <div className="profile-info">
            <div> Name: {sellerProfile?.name}</div>
            <div> Email: {sellerProfile?.email}</div>
            <div>
              About:{" "}
              {sellerProfile?.profiles?.aboutMe ||
                "Hi! I'm new to Litter Box Loot."}
            </div>
          </div>
        </section>
      </div>
      <h2 className="page-sub-title">My Posts</h2>
      <div className="seller-post-container">
        <div className="seller-post">
          <div className="seller-post-info">
            {/* mapping over posts array */}
            {post.map((post) => {
              return (
                // link for each post
                <Link
                  style={{ textDecoration: "none" }}
                  key={post.id}
                  to={`/posts/${post.id}`}
                >
                  {/* Post component displays post's content */}
                  <Post post={post} key={post.id} />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
