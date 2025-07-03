import express from "express";
import dotenv from "dotenv";
import connectDb from "./src/config/db.js";
import allRoutes from "./src/routes/index.js";
import logger from "./src/middlewares/loggerMiddleware.js";

dotenv.config();
const port=process.env.PORT

const app=express();

app.use(express.json());
app.use(logger)

app.use('/api',allRoutes);

app.use((req, res) => {
  res.status(404).json({ Success: false, message: "Route Not Found" });
});

app.listen(port,()=>{
    console.log("Server is Runnig on port:",port);
    // connectDb();
})