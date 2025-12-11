import Appointment from "../models/Appointment.model.js";
import mongoose from "mongoose";

/* -------------------------------------
   GET: Employee Dashboard Stats
-------------------------------------- */
export const getEmployeeDashboardStats = async (req, res) => {
  try {
    const { employeeId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(employeeId)) {
      return res.status(400).json({ success: false, message: "Invalid employeeId" });
    }

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const empId = new mongoose.Types.ObjectId(employeeId);

    const result = await Appointment.aggregate([
      { $match: { assignedTo: empId } },

      {
        $facet: {
          assigned: [{ $count: "count" }],

          completed: [
            { $match: { status: "Completed", assignedTo: empId } },
            { $count: "count" }
          ],

          pending: [
            { $match: { status: "In Progress", assignedTo: empId } },
            { $count: "count" }
          ],

          thisMonth: [
            { $match: { createdAt: { $gte: startOfMonth }, assignedTo: empId } },
            { $count: "count" }
          ],
        }
      },

      {
        $project: {
          assigned: { $ifNull: [{ $arrayElemAt: ["$assigned.count", 0] }, 0] },
          completed: { $ifNull: [{ $arrayElemAt: ["$completed.count", 0] }, 0] },
          pending: { $ifNull: [{ $arrayElemAt: ["$pending.count", 0] }, 0] },
          thisMonth: { $ifNull: [{ $arrayElemAt: ["$thisMonth.count", 0] }, 0] },
        }
      }
    ]);

    res.json({
      success: true,
      data: result[0] || {
        assigned: 0,
        completed: 0,
        pending: 0,
        thisMonth: 0
      }
    });

  } catch (err) {
    console.error("getEmployeeDashboardStats ERROR:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

/* -------------------------------------
   GET: Recent Activity
-------------------------------------- */
export const getEmployeeRecentActivity = async (req, res) => {
  try {
    const { employeeId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(employeeId)) {
      return res.status(400).json({ success: false, message: "Invalid employeeId" });
    }

    const recent = await Appointment.find({ assignedTo: employeeId })
      .sort({ createdAt: -1 })
      .limit(10)
      .select("firstname lastname brand model message status createdAt")
      .lean();

    res.json({
      success: true,
      data: recent
    });

  } catch (err) {
    console.error("getEmployeeRecentActivity ERROR:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
