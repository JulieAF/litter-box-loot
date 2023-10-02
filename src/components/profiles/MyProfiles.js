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
      <h2 className="page-title">Litter Box Loot</h2>
      <div className="profile-container">
        {userProfile.map((profile) => {
          return (
            <section className="profile" key={profile.id}>
              <div className="profile-image">
                <img src={profile.image} alt={profile.name} width="400px"></img>
              </div>
              <div className="profile-info">
                <footer>
                  <div> Name: {profile.user.name}</div>
                  <div> Email: {profile.user.email}</div>
                  <div>About: {profile.aboutMe} </div>
                </footer>
              </div>
            </section>
          );
        })}
      </div>
      <h2 className="page-sub-title">My Posts</h2>
      <div className="post-container">
        {userPosts.map((post) => {
          return (
            <div className="post" key={post.id}>
              <Link
                style={{ textDecoration: "none" }}
                key={post.id}
                to={`/myProfile/${post.id}`}
              >
                <ProfilePost post={post} key={post.id} />
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};
