import { Link, useFetcher, useLocation } from "react-router-dom";
import { NavElementsType } from "../types";
import { ROUTES } from "../config/router";
import { AdminAuthProvider } from "../utils/auth";

const Navbar = () => {
  const location = useLocation();
  const role = AdminAuthProvider.getRole();
  const navElements: NavElementsType[] = [
    {
      name: "Home",
      route: ROUTES.ROOT,
    },
  ];

  const filteredNavElements = navElements.filter((navItem) => {
    if (navItem.route === ROUTES.ROOT && location.pathname !== ROUTES.ROOT) {
      return true;
    }
    if (role === "admin" && navItem.route === ROUTES.ADMIN) {
      return true;
    }
    if (role === "user" && navItem.route === ROUTES.USER) {
      return true;
    }
    return false;
  });

  const fetcher = useFetcher();
  const isLoggingOut = fetcher.formData != null;

  return (
    <nav className="navbar px-6">
      <div className="flex w-full items-center justify-between">
        <a href={ROUTES.ROOT} className="text-xl font-bold hover:text-blue-400">
          <h2>Easy CV</h2>
        </a>
      </div>
      <div className="gap-5 text-sm font-medium">
        {filteredNavElements.map((navItem: NavElementsType, index) => (
          <Link key={index} to={navItem.route} className="hover:text-blue-500">
            {navItem.name}
          </Link>
        ))}

        {AdminAuthProvider.isAuthenticated() ? (
          <>
            {role === "admin" && (
              <>
                <button className="py-1.1 order-1 ml-7 bg-blue-300 px-2 text-xs hover:bg-blue-200">
                  <Link to={ROUTES.ADMIN}>Admin</Link>
                </button>
              </>
            )}
            {role === "user" && (
              <button className="py-1.1 order-1 ml-7 bg-blue-300 px-2 text-xs hover:bg-blue-200">
                <Link to={ROUTES.USER}>My Cv User</Link>
              </button>
            )}
            <fetcher.Form method="post" action="/logout" className="order-2">
              <button
                type="submit"
                disabled={isLoggingOut}
                className="py-1.1 bg-blue-300 px-3 text-xs text-black hover:bg-blue-200"
              >
                {isLoggingOut ? "Logging out..." : "Logout"}
              </button>
            </fetcher.Form>
          </>
        ) : (
          <button className="bg-blue-400 hover:bg-blue-300">
            <Link to={ROUTES.LOGIN}>Login</Link>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
