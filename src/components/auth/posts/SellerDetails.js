import { Link, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import { getProfileByUser } from "../../../services/profilesService";
import { getAllPosts, getPostByUserId } from "../../../services/postService";
import { Post } from "./Post";

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
      <div className="posts-container">
        <h2 className="page-title">Litter Box Loot</h2>
        <article className="posts">
          <section className="post" key={sellerProfile?.id}>
            <header>
              <img
                src={
                  sellerProfile?.profiles
                    ? sellerProfile.profiles[0].image
                    : "None"
                }
                alt={sellerProfile?.name}
                width="400px"
              ></img>
            </header>
            <div className="post-info">
              <footer>
                <div> Name: {sellerProfile?.name}</div>
                <div> Email: {sellerProfile?.email}</div>
                <div>
                  About:
                  {sellerProfile?.profiles
                    ? sellerProfile.profiles[0].aboutMe
                    : "None"}
                </div>
              </footer>
            </div>
          </section>
        </article>
      </div>
      <div className="posts-container">
        <h2 className="page-title">My Posts</h2>
        <article className="posts">
          {post.map((post) => {
            return <Post post={post} key={post.id} />;
          })}
        </article>
      </div>
    </>
  );
};
