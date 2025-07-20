import express from "express";
const app = express();
import routes from "./routes/index.js";
import db from"./config/db.js";
import views from "./routes/views.js"

import { engine } from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Config Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views")); 



// .env
import dotenv from "dotenv"
dotenv.config()

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", routes)
app.use("/",views)   

app.get("/", (req, res) => {
    res.send("funciona entrega final")
})

const PORT = process.env.PORT



app.listen(PORT, () => {
  console.log(`Servidos levantado en puerto ${PORT}`);
});

export default app;
