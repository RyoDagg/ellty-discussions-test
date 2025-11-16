import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="w-full px-2 shadow-md border-b">
      <div className="flex items-center justify-between px-4 sm:px-8 py-4 gap-4">
        <Link
          to="/"
          className="text-2xl text-indigo-900 font-bold border-b-2 border-transparent hover:border-b-indigo-900 px-2"
        >
          Home
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
