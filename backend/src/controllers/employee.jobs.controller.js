// src/controllers/employee.jobs.controller.js

import Appointment from "../models/Appointment.model.js";
import mongoose from "mongoose";

/* ---------------------------------------------------
   1) GET ALL ASSIGNED JOBS OF EMPLOYEE
   Route: GET /api/employee/assigned-jobs/:employeeId
---------------------------------------------------- */
export const getAssignedJobs = async (req, res) => {
  try {
    const { employeeId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(employeeId)) {
      return res.status(400).json({ success: false, message: "Invalid employeeId" });
    }

    const jobs = await Appointment.find({ assignedTo: employeeId })
      .sort({ createdAt: -1 })
      .lean();

    res.json({ success: true, data: jobs });

  } catch (err) {
    console.error("getAssignedJobs ERROR:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};


/* ---------------------------------------------------
   2) UPDATE JOB STATUS (Pending → In Progress → Completed)
   Route: PATCH /api/employee/assigned-jobs/update/:jobId
---------------------------------------------------- */
export const updateAssignedJobStatus = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({ success: false, message: "Invalid jobId" });
    }

    if (!status) {
      return res.status(400).json({ success: false, message: "Status is required" });
    }

    const job = await Appointment.findById(jobId);

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    /* --------------------------
        TIMELINE AUTO-UPDATE LOGIC 
       -------------------------- */

    // When work starts
    if (status === "In Progress" && !job.timeline?.started) {
      job.timeline = {
        ...job.timeline,
        started: new Date(),
      };
    }

    // When work resolves
    if (status === "Completed" && !job.timeline?.resolved) {
      job.timeline = {
        ...job.timeline,
        resolved: new Date(),
      };
    }

    // Update job status
    job.status = status;
    await job.save();

    res.json({
      success: true,
      message: "Job status updated successfully",
      data: job,
    });

  } catch (err) {
    console.error("updateAssignedJobStatus ERROR:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
