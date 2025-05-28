import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDb = async () => {
    try {
        
         mongoose.connection.on("connected", () =>
    console.log("Database Connected Successfully")
  );

  await mongoose.connect(`${process.env.MONGODB_URL}/agencyclient`);
    } catch (error) {
         console.error("MongoDB connection failed:", error.message);
    }
 
};


export default connectDb;
