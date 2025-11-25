// src/controllers/admin/employee.controller.js
import User from "../../models/User.model.js";
import bcrypt from "bcryptjs";

/* ---------------- ADD EMPLOYEE ---------------- */
export const addEmployee = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ msg: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const employee = await User.create({
      firstName,
      lastName,
      email,
      password: hashed,
      role: "employee",
      isApproved: true
    });

    res.json({ msg: "Employee added successfully", employee });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ---------------- GET ALL EMPLOYEES ---------------- */
export const getEmployees = async (req, res) => {
  try {
    const employees = await User.find({ role: "employee" });
    res.json({ employees });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ---------------- UPDATE EMPLOYEE ---------------- */
export const updateEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const { firstName, lastName, email, status } = req.body;

    const updated = await User.findByIdAndUpdate(
      id,
      { firstName, lastName, email, status },
      { new: true }
    );

    res.json({ msg: "Employee updated", updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ---------------- DELETE EMPLOYEE ---------------- */
export const deleteEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    await User.findByIdAndDelete(id);
    res.json({ msg: "Employee deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
