import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProfileByUser } from "../../../services/profilesService";
import { getPostByUserId } from "../../../services/postService";
import { Post } from "./Post";
import "./Seller.css";

export const SellerDetails = () => {
  const { userId } = useParams();
  const [sellerProfile, setSellerProfile] = useState({});
  const [post, setPost] = useState([]);

  useEffect(() => {
    getProfileByUser(userId).then((profileData) => {
      const profileObj = profileData[0];
      setSellerProfile(profileObj);
    });
  }, [userId]);

  useEffect(() => {
    getPostByUserId(userId).then((fetchedPosts) => {
      setPost(fetchedPosts);
    });
  }, [userId]);

  return (
    <>
      <h2 className="page-title">Litter Box Loot</h2>
      <div className="profile-container">
        <section className="profile" key={sellerProfile?.id}>
          <div className="profile-image">
            <img
              src={
                sellerProfile?.profiles
                  ? sellerProfile.profiles[0].image
                  : "None"
              }
              alt={sellerProfile?.name}
              width="400px"
            ></img>
          </div>
          <div className="profile-info">
            <div> Name: {sellerProfile?.name}</div>
            <div> Email: {sellerProfile?.email}</div>
            <div>
              About:{" "}
              {sellerProfile?.profiles
                ? sellerProfile.profiles[0].aboutMe
                : "None"}
            </div>
          </div>
        </section>
      </div>
      <h2 className="page-sub-title">My Posts</h2>
      <div className="seller-post-container">
        <div className="seller-post">
          <div className="seller-post-info">
            {post.map((post) => {
              return <Post post={post} key={post.id} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};
