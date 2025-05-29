import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { Admincontext } from "../Context/AdminContext";
import "../Pages/Addagent.css";

export default function AddAgencyClientForm() {
  const { aToken } = useContext(Admincontext);
  const { agencyId, clientId } = useParams();

  // Agency fields
  const [name, setName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");

  // Client fields
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [totalBill, setTotalBill] = useState("");

  useEffect(() => {
    const fetchExistingData = async () => {
      if (agencyId && clientId) {
        try {
          const res = await axios.get(
            `http://localhost:4000/api/get-client-agency`,
            {
              headers: {
                "Content-Type": "application/json",
                aToken,
              },
            }
          );

          if (res.data.success) {
            const { agencies, clients } = res.data;

            const agency = agencies.find((a) => a._id === agencyId);
            const client = clients.find((c) => c._id === clientId);

            if (agency && client) {
              setName(agency.name || "");
              setAddress1(agency.address1 || "");
              setAddress2(agency.address2 || "");
              setState(agency.state || "");
              setCity(agency.city || "");
              setPhone(agency.phone || "");

              setClientName(client.name || "");
              setEmail(client.email || "");
              setClientPhone(client.clientPhone || client.phone || "");
              setTotalBill(client.totalBill || "");
            } else {
              toast.error("Agency or client not found");
            }
          }
        } catch (error) {
          console.error("Failed to fetch data:", error);
          toast.error("Error fetching existing data");
        }
      }
    };

    fetchExistingData();
  }, [agencyId, clientId, aToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isEmpty = (val) =>
      val === undefined || val === null || val.toString().trim() === "";

    if (
      isEmpty(name) ||
      isEmpty(address1) ||
      isEmpty(state) ||
      isEmpty(city) ||
      isEmpty(phone) ||
      isEmpty(clientName) ||
      isEmpty(email) ||
      isEmpty(clientPhone) ||
      isEmpty(totalBill)
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    const agencyclientData = {
      name,
      address1,
      address2,
      state,
      city,
      phone,
      clientName,
      email,
      clientPhone,
      totalBill: Number(totalBill),
    };

    try {
      let response;

      if (agencyId && clientId) {
        response = await axios.put(
          `http://localhost:4000/api/update-client/${agencyId}/${clientId}`,
          {
            agency: {
              name,
              address1,
              address2,
              state,
              city,
              phone,
            },
            client: {
              name: clientName,
              email,
              phoneNumber: clientPhone,
              totalBill: Number(totalBill),
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
              aToken,
            },
          }
        );
      } else {
        response = await axios.post(
          "http://localhost:4000/api/create-agency-client",
          agencyclientData,
          {
            headers: {
              "Content-Type": "application/json",
              aToken,
            },
          }
        );
      }

      const { data } = response;

      if (data.success) {
        toast.success(data.message || "Operation Successful");
        setName("");
        setAddress1("");
        setAddress2("");
        setState("");
        setCity("");
        setPhone("");
        setClientName("");
        setEmail("");
        setClientPhone("");
        setTotalBill("");
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>
        {agencyId && clientId
          ? "Update Agency and Client"
          : "Create Agency and Client"}
      </h2>

      <div className="section">
        <h3>Agency Details</h3>
        <input
          placeholder="Agency Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Address 1"
          value={address1}
          onChange={(e) => setAddress1(e.target.value)}
        />
        <input
          placeholder="Address 2"
          value={address2}
          onChange={(e) => setAddress2(e.target.value)}
        />
        <input
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <input
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div className="section">
        <h3>Client Details</h3>
        <input
          placeholder="Client Name"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
        />
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Client Phone"
          value={clientPhone}
          onChange={(e) => setClientPhone(e.target.value)}
        />
        <input
          placeholder="Total Bill"
          type="number"
          value={totalBill}
          onChange={(e) => setTotalBill(e.target.value)}
        />
      </div>

      <button type="submit" className="submit-button">
        {agencyId && clientId ? "Update" : "Create"}
      </button>
    </form>
  );
}
