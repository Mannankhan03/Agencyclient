import React, { useState, useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Admincontext } from "../../Context/AdminContext";
import "../Sidebar/Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const { aToken, setAToken } = useContext(Admincontext);
  const [isOpen, setIsOpen] = useState(window.innerWidth > 768);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);

      if (window.innerWidth > 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    if (windowWidth <= 768) {
      setIsOpen((prev) => !prev);
    }
  };

  const handlelogout = () => {
    setAToken("");
    localStorage.removeItem("aToken");
    navigate("/login");
  };

  return (
    <>
      {windowWidth <= 768 && (
        <button
          onClick={toggleSidebar}
          className="sidebar-toggle-btn"
          aria-label="Toggle sidebar"
          style={{
            position: "fixed",
            top: 15,
            left: 15,
            zIndex: 1100,
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            padding: "8px 12px",
            cursor: "pointer",
          }}
        >
          ☰
        </button>
      )}

      {windowWidth <= 768 && (
        <div
          className={`sidebar-overlay ${isOpen ? "active" : ""}`}
          onClick={toggleSidebar}
        />
      )}

      <div className={`sidebar-container ${isOpen ? "open" : ""}`}>
        {aToken && (
          <ul>
            <NavLink
              to="/add-agent-client"
              className={({ isActive }) =>
                `block px-6 py-3.5 rounded-l-md transition-all duration-200 ${
                  isActive
                    ? "bg-[#F2F3FF] border-r-4 border-blue-600 text-black font-semibold"
                    : "hover:bg-gray-100"
                }`
              }
            >
              Add Agent
            </NavLink>

            <NavLink
              to="/update-clients-agents"
              className={({ isActive }) =>
                `block px-6 py-3.5 rounded-l-md transition-all duration-200 ${
                  isActive
                    ? "bg-[#F2F3FF] border-r-4 border-blue-600 text-black font-semibold"
                    : "hover:bg-gray-100"
                }`
              }
            >
              Update Agent
            </NavLink>

            <NavLink
              to="/top-clients"
              className={({ isActive }) =>
                `block px-6 py-3.5 rounded-l-md transition-all duration-200 ${
                  isActive
                    ? "bg-[#F2F3FF] border-r-4 border-blue-600 text-black font-semibold"
                    : "hover:bg-gray-100"
                }`
              }
            >
              Top Clients
            </NavLink>
            <NavLink onClick={handlelogout}>Logout</NavLink>
          </ul>
        )}
      </div>
    </>
  );
};

export default Sidebar;
