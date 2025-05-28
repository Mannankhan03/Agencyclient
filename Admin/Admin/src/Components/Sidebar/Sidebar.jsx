import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Admincontext } from '../../Context/AdminContext';
import '../Sidebar/Sidebar.css'; // For custom styles

const Sidebar = () => {
  const { aToken } = useContext(Admincontext);

  return (
    <div
      className="sidebar-container min-h-screen bg-white border-r"
      style={{
        width: '140px',
        position: 'sticky',
        padding: '10px 20px',
        top: 0,
        height: '100vh',
        overflowY: 'auto',
      }}
    >
      {aToken && (
        <ul className="text-[#515151] mt-5 space-y-1 font-medium">
          <NavLink
            to="/add-agent-client"
            className={({ isActive }) =>
              `block px-6 py-3.5 rounded-l-md transition-all duration-200 ${
                isActive
                  ? 'bg-[#F2F3FF] border-r-4 border-blue-600 text-black font-semibold'
                  : 'hover:bg-gray-100'
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
                  ? 'bg-[#F2F3FF] border-r-4 border-blue-600 text-black font-semibold'
                  : 'hover:bg-gray-100'
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
                  ? 'bg-[#F2F3FF] border-r-4 border-blue-600 text-black font-semibold'
                  : 'hover:bg-gray-100'
              }`
            }
          >
            Top Clients
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
