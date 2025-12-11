import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String },

    phonenumber: { type: String, required: true },
    email: { type: String },

    // Appointment Section
    category: { type: String, required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    message: { type: String },

    // Address
    stress: { type: String, required: true },
    stress2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    Postel: { type: String, required: true }, // same name used in frontend

    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
      default: "Pending",
    },
    timeline: {
      assigned: { type: Date, default: Date.now },
      started: { type: Date, default: null },
      resolved: { type: Date, default: null },
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Appointment", AppointmentSchema);
