// src/controllers/appointment.controller.js
import mongoose from "mongoose";
import Appointment from "../models/Appointment.model.js";

export const createAppointment = async (req, res) => {
  try {
    const payload = req.body;
    const newAppointment = await Appointment.create(payload);
    return res.status(201).json({
      success: true,
      message: "Appointment created successfully",
      data: newAppointment,
    });
  } catch (error) {
    console.error("CREATE APPOINTMENT ERROR:", error);
    if (error.name === "ValidationError") {
      const errors = Object.keys(error.errors).reduce((acc, key) => {
        acc[key] = error.errors[key].message;
        return acc;
      }, {});
      return res.status(400).json({ success: false, message: "Validation failed", errors });
    }
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const listAppointments = async (req, res) => {
  try {
    // optional filters: status, search, page/limit
    const { status, search, page = 1, limit = 100 } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (search) {
      const q = new RegExp(search, "i");
      filter.$or = [{ firstname: q }, { lastname: q }, { message: q }, { model: q }, { phonenumber: q }];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Appointment.countDocuments(filter);
    const data = await Appointment.find(filter)
      .populate("assignedTo", "name position email") // populate employee basic info
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    return res.json({ success: true, meta: { total, page: Number(page), limit: Number(limit) }, data });
  } catch (error) {
    console.error("LIST APPOINTMENTS ERROR:", error);
    return res.status(500).json({ success: false, message: "Server error while fetching appointments" });
  }
};

export const getAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ success: false, message: "Invalid id" });

    const appt = await Appointment.findById(id).populate("assignedTo", "name position email");
    if (!appt) return res.status(404).json({ success: false, message: "Not found" });

    return res.json({ success: true, data: appt });
  } catch (error) {
    console.error("GET APPOINTMENT ERROR:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// PATCH /api/appointments/:id  -> partial updates (status, assignedTo, notes, etc.)
export const updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ success: false, message: "Invalid id" });

    // if assignedTo is empty string or "null", convert to null
    if (updates.assignedTo === "" || updates.assignedTo === "null") updates.assignedTo = null;

    const appt = await Appointment.findByIdAndUpdate(id, updates, { new: true }).populate("assignedTo", "name position email");
    if (!appt) return res.status(404).json({ success: false, message: "Appointment not found" });

    return res.json({ success: true, data: appt });
  } catch (error) {
    console.error("UPDATE APPOINTMENT ERROR:", error);
    return res.status(500).json({ success: false, message: "Server error while updating appointment" });
  }
};
