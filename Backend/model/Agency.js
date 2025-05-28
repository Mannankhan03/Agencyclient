import mongoose from "mongoose";

const AgencySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address1: { type: String, required: true },
    address2: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    phone: { type: String, required: true },
  },
  { timestamps: true }
);

const Agency = mongoose.model("Agency", AgencySchema);

export default Agency;
