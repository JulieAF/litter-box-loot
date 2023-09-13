import { Outlet, Route, Routes } from "react-router-dom";
import { NavBar } from "../components/auth/nav/NavBar";
import { AllPosts } from "../components/auth/posts/AllPosts";
import { PostDetails } from "../components/auth/posts/PostDetails";
import { useEffect, useState } from "react";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const localLearningUser = localStorage.getItem("learning_user");
    const learningUserObject = JSON.parse(localLearningUser);
    setCurrentUser(learningUserObject);
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NavBar />
            <Outlet />
          </>
        }
      >
        <Route index element={<AllPosts />} />
        <Route path="home" element={<AllPosts />} />
        <Route path="posts">
          <Route index element={<AllPosts />} />
          <Route
            path=":postId"
            element={<PostDetails currentUser={currentUser} />}
          />
        </Route>
      </Route>
      ;
    </Routes>
  );
};
