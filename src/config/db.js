import mongoose from "mongoose";

const connectioString = process.env.MONGODB_URL;

mongoose
  .connect(connectioString)
  .then(() => console.log("conexion abierta con mongoDB"))
  .catch((error) => console.log("no se pudo conectar con mongoDB", error));

export default mongoose;
