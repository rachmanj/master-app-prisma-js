import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";

import projectRoutes from "./routes/projectRoutes.js";
import departmentRoutes from "./routes/departmentRoutes.js";

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use(cors());

app.use("/projects", projectRoutes);
app.use("/departments", departmentRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening on port ${process.env.PORT} `);
});
