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

  //fetches and sets profiles
  useEffect(() => {
    //getAllProfiles function returns a promise that resolves in an array
    getAllProfiles().then((profileArray) => {
      //setProfile updates the state with the profileArr
      setProfile(profileArray);
    });
  }, []);

  useEffect(() => {
    // using the filter method to create a new array (foundProfiles) that contains only the profile that belong to the current user
    const foundProfiles = profile.filter(
      // tests whether the userId property of a profile matches the id of the currentUser
      (profile) => profile.userId === currentUser.id
    );
    // updates setUserProfile with the new array of profiles (foundProfiles)
    setUserProfile(foundProfiles);
    // will re-run whenever the profile array or the currentUser object changes
  }, [profile, currentUser]);

  //fetches and sets posts
  useEffect(() => {
    //getAllPosts function returns a promise that resolves in an array
    getAllPosts().then((postArray) => {
      //setAllPosts updates the state with the postArr
      setPost(postArray);
    });
  }, []);

  useEffect(() => {
    // using the filter method to create a new array (foundPosts) that contains only the posts that belong to the current user
    const foundPosts = post.filter(
      // tests whether the userId property of a post matches the id of the currentUser
      (post) => post.userId === currentUser.id
    );
    // updates setUserPosts with the new array of posts (foundPosts)
    setUserPosts(foundPosts);
    // will re-run whenever the post array or the currentUser object changes
  }, [post, currentUser]);

  return (
    <>
      <h2 className="page-title">Litter Box Loot</h2>
      <div className="profile-container">
        {/* mapping over userProfile array */}
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
        {/* mapping over userPosts array */}
        {userPosts.map((post) => {
          return (
            <div className="post" key={post.id}>
              {/* Links to each ProfilePost */}
              <Link
                style={{ textDecoration: "none" }}
                key={post.id}
                to={`/myProfile/${post.id}`}
              >
                {/* contains post details */}
                <ProfilePost post={post} key={post.id} />
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};
