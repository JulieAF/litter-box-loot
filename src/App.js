import { Outlet, Route, Routes } from "react-router-dom";
import { AllPosts } from "./components/auth/posts/AllPosts";
import { NavBar } from "./components/auth/nav/NavBar";

export const App = () => {
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
      </Route>
    </Routes>
  );
};
