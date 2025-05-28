import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Admincontext } from "../Context/AdminContext";
import "./UpdateClient.css";

const Updateclient = () => {
  const { aToken } = useContext(Admincontext);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/get-client-agency",
          {
            headers: {
              "Content-Type": "application/json",
              aToken,
            },
          }
        );

        if (res.data.success) {
          const { agencies, clients } = res.data;

          const combined = clients.map((client) => {
            const agency = agencies.find((fin) => fin._id === client.agencyId);
            return { agency, client };
          });

          setData(combined);
        } else {
          console.error("Data fetch failed:", res.data);
        }
      } catch (error) {
        console.error("Error fetching :", error);
      }
    };

    fetchData();
  }, [aToken]);

  const handleEdit = (agencyId, clientId) => {
    navigate(`/update-clients-agents/${agencyId}/${clientId}`);
  };

  return (
    <div className="update-client-container">
      <h2>Agency & Client List</h2>
      <div className="table-wrapper">
        <table className="styled-table">
          <thead>
            <tr>
              <th>Agency Name</th>
              <th>Client Name</th>
              <th>State</th>
              <th>City</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map(({ agency, client }) => (
                <tr key={`${agency?._id}-${client?._id}`}>
                  <td>{agency?.name || "N/A"}</td>
                  <td>{client?.name || "N/A"}</td>
                  <td>{agency?.state || "N/A"}</td>
                  <td>{agency?.city || "N/A"}</td>
                  <td>{agency?.phone || "N/A"}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(agency._id, client._id)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No agency-client data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Updateclient;
