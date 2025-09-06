import mongoose from "mongoose";
import config from "./config.js";

const connectioString = config.MONGO_URL;

mongoose
  .connect(connectioString)
  .then(() => console.log("conexion abierta con mongoDB"))
  .catch((error) => console.log("no se pudo conectar con mongoDB", error));

export default mongoose;
