import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Admincontext } from "../Context/AdminContext";
import "../Pages/Topclients.css";

export default function AgencyClientList() {
  const { aToken } = useContext(Admincontext);
  const [clientsWithAgency, setClientsWithAgency] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/get-client-agency",
          {
            headers: {
              "Content-Type": "application/json",
              aToken,
            },
          }
        );

        if (data.success) {
          const { agencies, clients } = data;

          const combineddata = clients.map((client) => {
            const agency =
              agencies.find((agency) => agency._id === client.agencyId) || {};
            return {
              clientId: client._id,
              clientName: client.name,
              email: client.email,
              clientPhone: client.phoneNumber || client.phone,
              totalBill: client.totalBill || 0,
              agencyName: agency.name || "Unknown Agency",
              agencyId: agency._id || null,
            };
          });

          combineddata.sort((a, b) => b.totalBill - a.totalBill);
          setClientsWithAgency(combineddata);
        } else {
          toast.error("Failed to fetch data");
        }
      } catch (error) {
        console.error(error);
        toast.error("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [aToken]);

  if (loading) {
    return <div className="agency-client-loading">Loading...</div>;
  }

  return (
    <div className="agency-container">
      <h2 className="agency-heading">
        Agency Client List (Sorted by Total Bill)
      </h2>
      <div className="agency-table-wrapper">
        <table className="agency-table">
          <thead>
            <tr>
              <th>Agency Name</th>
              <th>Client Name</th>
              <th>Email</th>
              <th>Client Phone</th>
              <th>Total Bill</th>
            </tr>
          </thead>
          <tbody>
            {clientsWithAgency.length === 0 ? (
              <tr>
                <td colSpan={5} className="no-data">
                  No clients found.
                </td>
              </tr>
            ) : (
              clientsWithAgency.map((item) => (
                <tr key={item.clientId}>
                  <td>{item.agencyName}</td>
                  <td>{item.clientName}</td>
                  <td>{item.email}</td>
                  <td>{item.clientPhone}</td>
                  <td>${item.totalBill.toFixed(2)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
