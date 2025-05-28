import express from "express";
import cors from "cors";
import connectDb from "./config/db.js";
import Router from "./route/AgencyRoute.js";
import http from "http";
import userRouter from "./route/UserRoute.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

connectDb();

const server = http.createServer(app);

app.use("/api", Router);
app.use("/user", userRouter);

const PORT = 4000;

app.get("/client", (req, res) => {
  res.send("Api testing");
});

server.listen(PORT, () => {
  console.log("Server Started", PORT);
});
