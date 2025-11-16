import { Link } from "react-router-dom";
import { useAuthStore } from "../services/store";
import { api } from "../services/api";

const Navbar = () => {
  const { user, setUser } = useAuthStore();

  async function handleLogout() {
    try {
      await api.post("/auth/logout");
      setUser(null);
    } catch (err) {
      console.error("Logout failed", err);
    }
  }

  return (
    <header className="w-full px-2 shadow-md border-b">
      <div className="flex items-center justify-between px-4 sm:px-8 py-4 gap-4">
        <div>
          <Link
            to="/"
            className="text-2xl text-indigo-900 font-bold border-b-2 border-transparent hover:border-b-indigo-900 px-2"
          >
            Home
          </Link>
        </div>
        {user ? (
          <button
            onClick={handleLogout}
            className="text-lg text-red-900 font-bold border-b-2 border-transparent hover:border-b-red-900 px-2"
          >
            Logout
          </button>
        ) : (
          <div className="space-x-4">
            <Link
              to="/auth/login"
              className="text-lg text-blue-900 font-bold border-b-2 border-transparent hover:border-b-blue-900 px-2"
            >
              Login
            </Link>
            <Link
              to="/auth/register"
              className="text-lg text-blue-900 font-bold border-b-2 border-transparent hover:border-b-blue-900 px-2"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
