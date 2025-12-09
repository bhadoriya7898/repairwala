import express from "express";
import {
  addEmployee,
  getPendingEmployees,
  approveEmployee,
  rejectEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
} from "../../controllers/admin/employee.controller.js";

const router = express.Router();

/* ---------- Admin Employee Management Routes ---------- */

// Add employee manually
router.post("/employee", addEmployee);

// Get pending approval employees
router.get("/pending-employees", getPendingEmployees);

// Approve employee
router.post("/approve/:id", approveEmployee);

// Reject employee
router.post("/reject/:id", rejectEmployee);

// Get all employees (with profile)
router.get("/employees", getEmployees);

// Update employee
router.put("/employee/:id", updateEmployee);

// Delete employee
router.delete("/employee/:id", deleteEmployee);

export default router;
