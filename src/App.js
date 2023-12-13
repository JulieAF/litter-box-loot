import { Route, Routes } from "react-router-dom";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { ApplicationViews } from "./views/ApplicationViews";
import { Authorized } from "./views/Authorized";

export const App = () => {
  return (
    <Routes>
      {/* defining a route for the path "/login" and "/register"*/}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        // a catch-all route
        path="*"
        element={
          // when the URL does not match any of the other routes, the Authorized component will be rendered which in turn renders the ApplicationViews component
          <Authorized>
            <ApplicationViews />
          </Authorized>
        }
      />
    </Routes>
  );
};

export default App;
