import { useState } from "react";
import { useSidebar } from "../utils/sidebarContext";
import ThemeToggle from "./ThemeToggle";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { isCollapsed } = useSidebar();
  const [showSignOut, setShowSignOut] = useState(false);

  const getUser = localStorage.getItem("user");
  const userName = JSON.parse(getUser)?.name || "";

  // Extract initials
  const initials = userName
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0]?.toUpperCase() || "")
    .slice(0, 2)
    .join("");

    const navigate = useNavigate("")

  const handleSignOut = () => {
    localStorage.clear();
    navigate("/"); // Or use navigate("/") if using React Router
  };

  return (
    <header
      className={`pl-72 pr-6 py-4 bg-white dark:bg-gray-900 shadow-sm fixed top-0 right-0 left-0 z-40 transition-all duration-300 ${
        isCollapsed ? "pl-20" : "pl-72"
      }`}
    >
      <div className="flex items-center justify-between ml-[90%]">
        <div className="flex items-center gap-4 relative">
          <ThemeToggle />
          {/* User Avatar */}
          <div
            className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-medium cursor-pointer hover:bg-indigo-600 transition"
            onClick={() => setShowSignOut((prev) => !prev)}
            title={userName}
          >
            {initials}
          </div>

          {/* Sign Out Dropdown */}
          {showSignOut && (
            <button
              onClick={handleSignOut}
              className="absolute top-10 right-0 bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-sm font-medium px-4 py-2 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              Sign Out
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
