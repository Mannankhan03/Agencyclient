import mongoose from "mongoose";

const ClientAgency = new mongoose.Schema(
  {
    agencyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agency",
      required: true,
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    totalBill: { type: Number, required: true },
  },
  { timestamps: true }
);

const Client = mongoose.model("Client", ClientAgency);

export default Client;
