import mongoose from "mongoose";

// .env
import dotenv from "dotenv";
import { log } from "node:console";
dotenv.config();

const connectioString = process.env.MONGODB_URI;

mongoose
  .connect(connectioString)
  .then(() => console.log("conexion abierta con mongoDB"))
  .catch((error) => console.log("no se pudo conectar con mongoDB", error));

export default mongoose;
