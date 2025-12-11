// src/routes/employee.dashboard.routes.js
import express from "express";
import {
  getEmployeeDashboardStats,
  getEmployeeRecentActivity,
} from "../controllers/employee.dashboard.controller.js";

import {
  getAssignedJobs,
  updateAssignedJobStatus,
} from "../controllers/employee.jobs.controller.js";

const router = express.Router();

/* ------------------- Dashboard ------------------- */
router.get("/stats/:employeeId", getEmployeeDashboardStats);
router.get("/recent/:employeeId", getEmployeeRecentActivity);

/* ------------------- Assigned Jobs ------------------- */
router.get("/assigned-jobs/:employeeId", getAssignedJobs);

router.patch("/assigned-jobs/update/:jobId", updateAssignedJobStatus);

export default router;
