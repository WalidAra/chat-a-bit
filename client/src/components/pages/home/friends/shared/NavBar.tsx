import { useLocation, Link } from "react-router-dom";
import AddFriendDialog from "./AddFriendDialog";

const NavBar = () => {
  const { pathname } = useLocation();

  const navItems = [
    { name: "Friends", path: "/friends" },
    { name: "Blocked", path: "/friends/blocked" },
    { name: "Requests", path: "/friends/requests" },
    { name: "Pending", path: "/friends/pending" },
  ];

  return (
    <header className="w-full inline">
      <div className="w-full">
        <div className="flex items-center gap-4 ">
          <nav className="flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium rounded-md transition-colors duration-150 ${
                  pathname === item.path
                    ? " text-foreground"
                    : "text-foreground/60 hover:text-foreground/80 transition-colors "
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <AddFriendDialog />
        </div>
      </div>
    </header>
  );
};

export default NavBar;
