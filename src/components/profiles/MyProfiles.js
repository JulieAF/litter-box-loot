import { useEffect, useState } from "react";
import "./Profile.css";
import { getAllProfiles } from "../../services/profilesService";
import { getAllPosts } from "../../services/postService";
import { ProfilePost } from "./ProfilePost";
import { Link } from "react-router-dom";

export const MyProfiles = ({ currentUser }) => {
  const [profile, setProfile] = useState([]);
  let [userProfile, setUserProfile] = useState([]);
  const [post, setPost] = useState([]);
  let [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    getAllProfiles().then((profileArray) => {
      setProfile(profileArray);
    });
  }, []);

  useEffect(() => {
    const foundProfiles = profile.filter(
      (profile) => profile.userId === currentUser.id
    );
    setUserProfile(foundProfiles);
  }, [profile, currentUser]);

  useEffect(() => {
    getAllPosts().then((postArray) => {
      setPost(postArray);
    });
  }, []);

  useEffect(() => {
    const foundPosts = post.filter((post) => post.userId === currentUser.id);
    setUserPosts(foundPosts);
  }, [post, currentUser]);

  return (
    <>
      <div className="posts-container">
        <h2 className="page-title">Litter Box Loot</h2>
        <article className="posts">
          {userProfile.map((profile) => {
            return (
              <section className="post" key={profile.id}>
                <header>
                  <img
                    src={profile.image}
                    alt={profile.name}
                    width="400px"
                  ></img>
                </header>
                <div className="post-info">
                  <footer>
                    <div> Name: {profile.user.name}</div>
                    <div> Email: {profile.user.email}</div>
                    <div>About: {profile.aboutMe} </div>
                  </footer>
                </div>
              </section>
            );
          })}
        </article>
      </div>
      <div className="posts-container">
        <h2 className="page-title">My Posts</h2>
        <article className="posts">
          {userPosts.map((post) => {
            return (
              <Link key={post.id} to={`/myProfile/${post.id}`}>
                <ProfilePost post={post} key={post.id} />
              </Link>
            );
          })}
        </article>
      </div>
    </>
  );
};
