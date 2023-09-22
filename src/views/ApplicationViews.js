import { Outlet, Route, Routes } from "react-router-dom";
import { NavBar } from "../components/auth/nav/NavBar";
import { AllPosts } from "../components/auth/posts/AllPosts";
import { PostDetails } from "../components/auth/posts/PostDetails";
import { useEffect, useState } from "react";
import { MyPosts } from "../components/auth/posts/MyPosts";
import { NewPost } from "../components/auth/posts/NewPost";
import { MyOrders } from "../components/orders/MyOrders";
import { EditPost } from "../components/forms/EditPost";
import { MyPostDetails } from "../components/auth/posts/MyPostDetails";

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
        <Route path="newPost" element={<NewPost currentUser={currentUser} />} />
        <Route
          path="myOrders"
          element={<MyOrders currentUser={currentUser} />}
        />
        <Route path="myPosts" element={<Outlet />}>
          <Route index element={<MyPosts currentUser={currentUser} />} />
          <Route path=":postId" element={<Outlet />}>
            <Route index element={<MyPostDetails />} />
            <Route path=":editPost" element={<EditPost />} />
          </Route>
        </Route>
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
