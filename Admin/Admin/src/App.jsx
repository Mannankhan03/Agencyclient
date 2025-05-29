import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Sidebar from "./Components/Sidebar/Sidebar";
import { Routes, Route, useLocation } from "react-router-dom";
import Addagent from "./Pages/Addagent";
import Updateclient from "./Pages/Updateclient";
import Topclients from "./Pages/Topclients";
import { Admincontext } from "./Context/AdminContext";
import Login from "./Pages/login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";

function App() {
  const { aToken } = useContext(Admincontext);
  const location = useLocation();

  const isRootPage = location.pathname === "/";

  return aToken ? (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Navbar />
      <div className="app-layout">
        <Sidebar />
        <div className="main-content">
          {isRootPage && (
            <div className="dashboard-message">
              <h3>Please Click on toggle button to view options</h3>
            </div>
          )}

          <Routes>
            <Route path="/add-agent-client" element={<Addagent />} />
            <Route
              path="/add-agent-client/:agencyId/:clientId"
              element={<Addagent />}
            />
            <Route path="/update-clients-agents" element={<Updateclient />} />
            <Route
              path="/update-clients-agents/:agencyId/:clientId"
              element={<Addagent />}
            />
            <Route path="/top-clients" element={<Topclients />} />
          </Routes>
        </div>
      </div>
    </>
  ) : (
    <div>
      <Login />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
