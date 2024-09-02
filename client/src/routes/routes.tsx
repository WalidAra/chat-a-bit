import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import { AuthMiddleware, HomeMiddleware } from "@/components/utils/";
import { Login, Register } from "@/components/pages/auth";
import HomeLayout from "@/components/layouts/HomeLayout";
import FindFriendsCard from "@/components/pages/home/fresh/FindFriendsCard";

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
              <Outlet />
            </HomeMiddleware>
          }
        >
          <Route
            element={
              <HomeLayout>
                <Outlet />
              </HomeLayout>
            }
          >
            <Route index element={<FindFriendsCard />} />

            <Route path="chats/:chatId" element={<></>} />
            <Route path="friends" element={<></>}>
              <Route index element={<></>} />
              <Route path="blocked" element={<></>} />
              <Route path="requests" element={<></>} />
              <Route path="pending" element={<></>} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
