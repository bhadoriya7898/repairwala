import api from "./axiosInstance";

/* ---------------- AUTH API ---------------- */

// Signup
export const signupAPI = (data) => api.post("/api/auth/signup", data);

// Login
export const loginAPI = (data) => api.post("/api/auth/login", data);

// Forgot Password
export const forgotPasswordAPI = (data) =>
  api.post("/api/auth/forgot-password", data);

// Reset Password
export const resetPasswordAPI = (data) =>
  api.post("/api/auth/reset-password", data);


/* ---------------- ADMIN EMPLOYEE API ---------------- */

// Pending employees
export const getPendingEmployeesAPI = () =>
  api.get("/api/admin/pending-employees");

// Approve employee
export const approveEmployeeAPI = (id) => api.post(`/api/admin/approve/${id}`);

// Reject employee
export const rejectEmployeeAPI = (id) => api.post(`/api/admin/reject/${id}`);

// Get all employees (with profile)
export const getEmployeesAPI = () => api.get("/api/admin/employees");

// Update employee
export const updateEmployeeAPI = (id, data) =>
  api.put(`/api/admin/employee/${id}`, data);

// Delete employee
export const deleteEmployeeAPI = (id) =>
  api.delete(`/api/admin/employee/${id}`);


/* ---------------- EMPLOYEE API ---------------- */

export const employeeDashboardAPI = () => api.get("/api/employee/dashboard");


/* ---------------- CATEGORY API ---------------- */

// Get all categories
export const getCategoriesAPI = () => api.get("/api/categories");

// Add category
export const addCategoryAPI = (formData) =>
  api.post("/api/categories", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// Delete category
export const deleteCategoryAPI = (id) =>
  api.delete(`/api/categories/${id}`);


/* ---------------- BRAND API ---------------- */

export const getBrandsAPI = () => api.get("/api/brands");

export const addBrandAPI = (formData) =>
  api.post("/api/brands", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const deleteBrandAPI = (id) =>
  api.delete(`/api/brands/${id}`);


/* ---------------- DYNAMIC SERVICE PAGE APIS ---------------- */

export const getBrandCategoriesAPI = () => api.get("/api/brands/categories");

export const getBrandsByCategoryAPI = (categoryId) =>
  api.get(`/api/brands/filter?category=${categoryId}`);


/* ---------------- COMPLETE PROFILE API ---------------- */
export const completeProfileAPI = (formData) =>
  api.post("/api/profile/complete-profile", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
