import api from "./axiosInstance";

/* ---------------- AUTH API ---------------- */

// Signup
export const signupAPI = (data) => api.post("/api/auth/signup", data);

// Login
export const loginAPI = (data) => api.post("/api/auth/login", data);

// Forgot Password
export const forgotPasswordAPI = (data) => api.post("/api/auth/forgot-password", data);

// Reset Password
export const resetPasswordAPI = (data) => api.post("/api/auth/reset-password", data);


/* ---------------- ADMIN API ---------------- */

// Approve Employee
export const getPendingEmployeesAPI = () =>
  api.get("/admin/pending-employees");

// Approve employee
export const approveEmployeeAPI = (id) =>
  api.post(`/admin/approve/${id}`);

// Reject employee
export const rejectEmployeeAPI = (id) =>
  api.post(`/admin/reject/${id}`);

// (Optional) Get all employees
export const getEmployeesAPI = () => api.get("/admin/employees");


/* ---------------- EMPLOYEE API ---------------- */

export const employeeDashboardAPI = () => api.get("/employee/dashboard");

