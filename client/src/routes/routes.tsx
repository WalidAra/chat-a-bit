import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import { AuthMiddleware, HomeMiddleware } from "@/components/utils";
import { Login, Register } from "@/components/pages/auth";
import { HomeLayout } from "@/components/layouts";
import { FriendsLayout } from "@/components/layouts";
import { Blocked, Friends, Pending } from "@/components/pages/home/friends/";
import { FindFriendsCard } from "@/components/pages/home/fresh";
import { Requests } from "@/components/pages/home/friends";

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

            <Route
              path="friends"
              element={
                <FriendsLayout>
                  <Outlet />
                </FriendsLayout>
              }
            >
              <Route index element={<Friends />} />
              <Route path="blocked" element={<Blocked />} />
              <Route path="requests" element={<Requests />} />
              <Route path="pending" element={<Pending />} />
            </Route>
          </Route>
          <Route path="chats/:chatId" element={<></>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
