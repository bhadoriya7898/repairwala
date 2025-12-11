// src/routes/appointment.routes.js
import express from "express";
import {
  createAppointment,
  listAppointments,
  getAppointmentById,
  updateAppointment,
} from "../controllers/Appointment.controller.js";

const router = express.Router();

router.post("/", createAppointment);
router.get("/", listAppointments);
router.get("/:id", getAppointmentById);
router.patch("/:id", updateAppointment); // <-- PATCH to assign employee / update status

export default router;
