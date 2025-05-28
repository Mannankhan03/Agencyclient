import validator from "validator";
import Agency from "../model/Agency.js";
import Client from "../model/Client.js";

const AgencyClientcont = async (req, res) => {
  try {
   
    console.log("Request body received:", req.body);

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ success: false, message: "Request body is missing" });
    }

    const {
      name,
      address1,
      address2,
      state,
      city,
      phone,
      email,
      clientPhone,
      clientName,
      totalBill,
    } = req.body;

    if (
      !name ||
      !address1 ||
      !state ||
      !city ||
      !phone ||
      !email ||
      !clientPhone ||
      !clientName ||
      !totalBill
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Missing Details" });
    }

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Email Address" });
    }

    const agency = await new Agency({
      name,
      address1,
      address2,
      state,
      city,
      phone,
    }).save();

    const client = await new Client({
      agencyId: agency._id,
      name: clientName,
      email,
      phoneNumber: clientPhone,
        totalBill: Number(totalBill),
    }).save();

    res.status(201).json({
      success: true,
      message: "Agency and Client created successfully",
      agency,
      client,
      
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ success: false, message: "Error" });
  }
};

const UpdateClientAgency = async (req, res) => {
  try {
    const { agencyId, clientId } = req.params;
    const { agency, client } = req.body;

    // Basic check
    if (!agency || !client) {
      return res.status(400).json({ success: false, message: "Missing data" });
    }

    // Destructure agency and client data
    const { name, address1, address2, state, city, phone } = agency;
    const { name: clientName, email, phoneNumber, totalBill } = client;

    // Validate all required client fields
    if (
      !clientName || !email || !phoneNumber ||
      totalBill === undefined || totalBill === null || isNaN(Number(totalBill))
    ) {
      return res.status(400).json({ success: false, message: "Missing or invalid client data" });
    }

    // Update agency
    const updateAgency = await Agency.findByIdAndUpdate(
      agencyId,
      { name, address1, address2, state, city, phone },
      { new: true }
    );

    // Update client
    const updateclientData = await Client.findByIdAndUpdate(
      clientId,
      {
        name: clientName,
        email,
        phoneNumber,
        totalBill: Number(totalBill)  // Ensure number type
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Agency and Client updated successfully",
      agency: updateAgency,
      client: updateclientData,
    });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};


const getagencyandclient = async (req, res) => {
  try {
    const agencies = await Agency.find();
    const clients = await Client.find();
    res.status(200).json({ success: true, agencies, clients });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};  

const getClientAgencyById = async (req, res) => {
  const { agencyId, clientId } = req.params;

  try {
    const agency = await Agency.findById(agencyId);
    const client = await Client.findById(clientId);

    if (!agency || !client) {
      return res.status(404).json({ success: false, message: "Agency or client not found" });
    }

    res.status(200).json({ success: true, agency, client });
  } catch (error) {
    console.error("Error fetching agency/client:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


const deleteAgencyClientDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const client = await Client.deleteMany({ agencyId: id });

    const agency = await Agency.findByIdAndDelete(id);
    if (!agency) {
      return res
        .status(404)
        .json({ success: false, message: "Agency not found" });
    }

    res.status(400).json({ success: true, deleteClient: client, agency });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
};

export {
  AgencyClientcont,
  UpdateClientAgency,
  deleteAgencyClientDetails,
  getagencyandclient,
  getClientAgencyById
};
