import { AgencyClientcont, deleteAgencyClientDetails, getagencyandclient, getClientAgencyById, UpdateClientAgency } from "../controller/AgencyClient.js";
import express from "express";
import Authuser from "../middleware/Auth.js";

const Router = express.Router();

Router.post("/create-agency-client", Authuser, AgencyClientcont);
Router.put("/update-client/:agencyId/:clientId",Authuser, UpdateClientAgency);
Router.delete("/delete-agency-clinet/:id",Authuser, deleteAgencyClientDetails);
Router.get("/get-client-agency", Authuser, getagencyandclient)
Router.get("/get-client-agency/:agencyId/:clientId", Authuser, getClientAgencyById)




export default Router;
