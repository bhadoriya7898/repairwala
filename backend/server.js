import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./src/routes/authRoutes.js";
// import old adminRoutes if you have separate admin actions elsewhere
// import adminRoutes from "./src/routes/adminRoutes.js";
import categoryRoutes from "./src/routes/categoryRoutes.js";
import brandRoutes from "./src/routes/brandRoutes.js";
import profileRoute from "./src/routes/profileRoute.js";
import employeeRoutes from "./src/routes/admin/employee.routes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

// Fix dirname for static uploads
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "src/uploads")));

// Routes
app.use("/api/auth", authRoutes);

// Mount admin employee routes at /api/admin
app.use("/api/admin", employeeRoutes);

// Other routes
app.use("/api/categories", categoryRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/profile", profileRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
