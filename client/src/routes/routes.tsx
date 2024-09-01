import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthMiddleware, HomeMiddleware } from "@/components/utils/";
import { Login, Register } from "@/components/pages/auth";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <AuthMiddleware>
              <Login />
            </AuthMiddleware>
          }
        />
        <Route
          path="/register"
          element={
            <AuthMiddleware>
              <Register />
            </AuthMiddleware>
          }
        />
        <Route
          path="/"
          element={
            <HomeMiddleware>
              <h1>Home</h1>
            </HomeMiddleware>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
