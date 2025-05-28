import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Sidebar from "./Components/Sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import Addagent from "./Pages/Addagent"; // this is your AddAgencyClientForm
import Updateclient from "./Pages/Updateclient";
import Topclients from "./Pages/topclients";
import { Admincontext } from "./Context/AdminContext";
import Login from "./Pages/login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";

function App() {
  const { aToken } = useContext(Admincontext);

  return aToken ? (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Navbar />
      <div className="flex items-start">
        <Sidebar />
        <Routes>
          <Route path="/add-agent-client" element={<Addagent />} />
          <Route path="/add-agent-client/:agencyId/:clientId" element={<Addagent />} />
          <Route path="/update-clients-agents" element={<Updateclient />} />
          <Route path="/update-clients-agents/:agencyId/:clientId" element={<Addagent />} />
          <Route path="/top-clients" element={<Topclients />} />
        </Routes>
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
