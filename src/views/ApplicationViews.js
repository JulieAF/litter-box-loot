import { Outlet, Route, Routes } from "react-router-dom";
import { NavBar } from "../components/auth/nav/NavBar";
import { AllPosts } from "../components/auth/posts/AllPosts";
import { PostDetails } from "../components/auth/posts/PostDetails";
import { useEffect, useState } from "react";
import { NewPost } from "../components/auth/posts/NewPost";
import { MyOrders } from "../components/orders/MyOrders";
import { EditPost } from "../components/forms/EditPost";
import { MyPostDetails } from "../components/auth/posts/MyPostDetails";
import { MyProfiles } from "../components/profiles/MyProfiles";
import { SellerDetails } from "../components/auth/posts/SellerDetails";

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
        <Route path="myProfile" element={<Outlet />}>
          <Route index element={<MyProfiles currentUser={currentUser} />} />
          <Route path=":postId" element={<Outlet />}>
            <Route index element={<MyPostDetails />} />
            <Route path=":editPost" element={<EditPost />} />
          </Route>
        </Route>
        <Route path="posts">
          <Route index element={<AllPosts />} />
          <Route path=":postId" element={<Outlet />}>
            <Route index element={<PostDetails currentUser={currentUser} />} />
            <Route path=":userId" index element={<SellerDetails />} />
            <Route path=":postId" element={<PostDetails />} />
          </Route>
        </Route>
      </Route>
      ;
    </Routes>
  );
};
