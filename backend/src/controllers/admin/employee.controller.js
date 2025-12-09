import User from "../../models/User.model.js";
import Profile from "../../models/Profile.js";
import bcrypt from "bcryptjs";

/* ---------------------------------------------------------
   1) GET PENDING EMPLOYEES (waiting for admin approval)
----------------------------------------------------------*/
export const getPendingEmployees = async (req, res) => {
  try {
    const pending = await User.find({
      role: "employee",
      isApproved: false,
    }).select("-password -otp -otpExpiry");

    res.json({ pending });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ---------------------------------------------------------
   2) APPROVE EMPLOYEE
----------------------------------------------------------*/
export const approveEmployee = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    );

    if (!updated) return res.status(404).json({ msg: "Employee not found" });

    res.json({ msg: "Employee approved successfully", updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ---------------------------------------------------------
   3) REJECT EMPLOYEE
----------------------------------------------------------*/
export const rejectEmployee = async (req, res) => {
  try {
    // remove user and any profile they may have
    await Profile.findOneAndDelete({ userId: req.params.id });
    await User.findByIdAndDelete(req.params.id);

    res.json({ msg: "Employee request rejected and removed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ---------------------------------------------------------
   4) ADD EMPLOYEE (Admin manually adds employee)
----------------------------------------------------------*/
export const addEmployee = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, role, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ msg: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const employee = await User.create({
      firstName,
      lastName,
      email,
      phone,
      role: role || "employee",
      password: hashed,
      isApproved: true, // Admin-added employees auto-approved
    });

    res.json({ msg: "Employee added successfully", employee });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ---------------------------------------------------------
   5) GET ALL EMPLOYEES (join Profile + User)
----------------------------------------------------------*/
export const getEmployees = async (req, res) => {
  try {
    const users = await User.find({ role: "employee" })
      .select("-password -otp -otpExpiry")
      .lean();

    const employees = await Promise.all(
      users.map(async (user) => {
        const profile = await Profile.findOne({ userId: user._id }).lean();
        return {
          ...user,
          profile: profile || null,
        };
      })
    );

    res.json({ employees });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ---------------------------------------------------------
   6) UPDATE EMPLOYEE
----------------------------------------------------------*/
export const updateEmployee = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, role, status } = req.body;

    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, email, phone, role, status },
      { new: true }
    ).select("-password");

    res.json({ msg: "Employee updated successfully", updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ---------------------------------------------------------
   7) DELETE EMPLOYEE (Also delete profile)
----------------------------------------------------------*/
export const deleteEmployee = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    await Profile.findOneAndDelete({ userId: req.params.id });

    res.json({ msg: "Employee deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
