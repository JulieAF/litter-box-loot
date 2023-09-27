import "./Profile.css";

export const Profile = ({ profile }) => {
  return (
    <section className="post" key={profile.id}>
      <header>
        <img src={profile.image} alt={profile.name} width="400px"></img>
      </header>
      <div className="post-info">
        <footer>
          <div> {profile.user.name}</div>
          <div> {profile.user.email}</div>
          <div>{profile.aboutMe} </div>
        </footer>
      </div>
    </section>
  );
};
