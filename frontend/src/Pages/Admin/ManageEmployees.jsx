import { useEffect, useState } from "react";
import {
  getPendingEmployeesAPI,
  approveEmployeeAPI,
  rejectEmployeeAPI,
  getEmployeesAPI,
  updateEmployeeAPI,
  deleteEmployeeAPI,
} from "../../api/api";

import { Plus, Edit, Trash2, X, Check, XCircle, Search } from "lucide-react";
import toast from "react-hot-toast";

/* ---------------- FIX FILE PATHS ---------------- */
const fixPath = (filePath) => {
  if (!filePath) return "";
  let clean = filePath.replace("src\\", "").replace("src/", "");
  clean = clean.replace(/\\/g, "/");
  return `http://localhost:5000/${clean}`;
};

export function ManageEmployees() {
  const [pendingEmployees, setPendingEmployees] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [detailsEmployee, setDetailsEmployee] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "employee",
    status: "Active",
  });

  /* ---------------- FETCH DATA ---------------- */
  const loadData = async () => {
    try {
      setLoading(true);

      const [pendingRes, empRes] = await Promise.all([
        getPendingEmployeesAPI(),
        getEmployeesAPI(),
      ]);

      setPendingEmployees(pendingRes?.data?.pending || []);

      const empList =
        empRes?.data?.employees ||
        empRes?.employees ||
        empRes?.data ||
        [];

      setEmployees(empList.filter((e) => e.isApproved));

    } catch (err) {
      console.error("LOAD ERROR:", err);
      toast.error("Failed to load employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  /* ---------------- HANDLERS ---------------- */

  const approveEmployee = async (id) => {
    try {
      await approveEmployeeAPI(id);
      toast.success("Employee approved");
      loadData();
    } catch (err) {
      console.error("Approve Error:", err);
      toast.error("Approval failed");
    }
  };

  const rejectEmployee = async (id) => {
    try {
      await rejectEmployeeAPI(id);
      toast.error("Employee rejected");
      loadData();
    } catch (err) {
      console.error("Reject Error:", err);
      toast.error("Rejection failed");
    }
  };

  const openDetailsModal = (emp) => {
    setDetailsEmployee(emp);
    setShowDetailsModal(true);
  };

  const openEditModal = (emp) => {
    setSelectedEmployee(emp);
    setFormData({
      firstName: emp.firstName || "",
      lastName: emp.lastName || "",
      email: emp.email || "",
      phone: emp.phone || "",
      role: emp.role || "employee",
      status: emp.status || "Active",
    });
    setShowEditModal(true);
  };

  const handleEditEmployee = async () => {
    try {
      await updateEmployeeAPI(selectedEmployee._id, formData);
      toast.success("Employee updated successfully");
      setShowEditModal(false);
      loadData();
    } catch (err) {
      console.error("Update Error:", err);
      toast.error("Update failed");
    }
  };

  const openDeleteModal = (emp) => {
    setSelectedEmployee(emp);
    setShowDeleteModal(true);
  };

  const handleDeleteEmployee = async () => {
    try {
      await deleteEmployeeAPI(selectedEmployee._id);
      toast.success("Employee deleted");
      setShowDeleteModal(false);
      loadData();
    } catch (err) {
      console.error("Delete Error:", err);
      toast.error("Deletion failed");
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="space-y-10 pb-20">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Manage Employees</h1>
      </div>

      {/* ---------------- LOADING STATE ---------------- */}
      {loading && (
        <div className="text-center py-10 animate-pulse text-gray-600">
          Loading employees...
        </div>
      )}

      {!loading && (
        <>
          {/* ---------------- Pending Approval Section ---------------- */}
          <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Employee Approval Requests
            </h2>

            {pendingEmployees.length === 0 ? (
              <p className="text-gray-500">No pending requests</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left">Name</th>
                      <th className="px-6 py-3 text-left">Email</th>
                      <th className="px-6 py-3 text-left">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {pendingEmployees.map((emp) => (
                      <tr key={emp._id} className="border-b hover:bg-gray-50">
                        <td className="px-6 py-4">{emp.firstName} {emp.lastName}</td>
                        <td className="px-6 py-4">{emp.email}</td>

                        <td className="px-6 py-4 flex gap-3">

                          {/* View Full Details */}
                          <button
                            onClick={() => openDetailsModal(emp)}
                            className="flex items-center gap-1 text-blue-600 hover:bg-blue-100 px-3 py-1 rounded-lg"
                          >
                            <Search size={16} /> View
                          </button>

                          <button
                            onClick={() => approveEmployee(emp._id)}
                            className="flex items-center gap-1 text-green-600 hover:bg-green-100 px-3 py-1 rounded-lg"
                          >
                            <Check size={16} /> Approve
                          </button>

                          <button
                            onClick={() => rejectEmployee(emp._id)}
                            className="flex items-center gap-1 text-red-600 hover:bg-red-100 px-3 py-1 rounded-lg"
                          >
                            <XCircle size={16} /> Reject
                          </button>

                        </td>
                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>
            )}
          </div>

          {/* ---------------- Approved Employees ---------------- */}
          <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Employees
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left">Name</th>
                    <th className="px-6 py-3 text-left">Email</th>
                    <th className="px-6 py-3 text-left">Phone</th>
                    <th className="px-6 py-3 text-left">Category</th>
                    <th className="px-6 py-3 text-left">Experience</th>
                    <th className="px-6 py-3 text-left">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {employees.map((emp) => (
                    <tr key={emp._id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4">{emp.firstName} {emp.lastName}</td>
                      <td className="px-6 py-4">{emp.email}</td>
                      <td className="px-6 py-4">{emp.phone || "—"}</td>
                      <td className="px-6 py-4">{emp.profile?.category || "—"}</td>
                      <td className="px-6 py-4">{emp.profile?.experience || "—"}</td>

                      <td className="px-6 py-4 flex gap-3">
                        <button
                          onClick={() => openDetailsModal(emp)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        >
                          <Search size={18} />
                        </button>

                        <button
                          onClick={() => openEditModal(emp)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        >
                          <Edit size={18} />
                        </button>

                        <button
                          onClick={() => openDeleteModal(emp)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </div>
        </>
      )}

      {/* ---------------- Details, Edit & Delete Modals (unchanged logic, added animations) ---------------- */}

      {/* All modals fade-in */}
      {showDetailsModal && detailsEmployee && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 animate-fadeIn">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 animate-scaleIn">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Employee Details</h2>
              <button onClick={() => setShowDetailsModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={22} />
              </button>
            </div>

            <div className="space-y-2">
              <p><b>Name:</b> {detailsEmployee.firstName} {detailsEmployee.lastName}</p>
              <p><b>Email:</b> {detailsEmployee.email}</p>
              <p><b>Phone:</b> {detailsEmployee.phone}</p>
            </div>

            <hr className="my-4" />

            {detailsEmployee.profile ? (
              <div className="space-y-2">
                <p><b>Category:</b> {detailsEmployee.profile.category}</p>
                <p><b>Experience:</b> {detailsEmployee.profile.experience} years</p>
                <img
                  src={fixPath(detailsEmployee.profile.photo)}
                  className="w-32 h-32 rounded-lg border object-cover mt-2"
                />
              </div>
            ) : (
              <p className="text-gray-600">No profile submitted yet.</p>
            )}
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 animate-fadeIn">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-scaleIn">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Edit Employee</h2>
              <button onClick={() => setShowEditModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              {["firstName", "lastName", "email", "phone"].map((field) => (
                <input
                  key={field}
                  type="text"
                  placeholder={field}
                  value={formData[field]}
                  onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                  className="w-full px-4 py-3 border rounded-xl"
                />
              ))}

              <button
                onClick={handleEditEmployee}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
              >
                Update Employee
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 animate-fadeIn">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-scaleIn">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Delete Employee</h2>
              <button onClick={() => setShowDeleteModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={24} />
              </button>
            </div>

            <p className="mb-6">
              Are you sure you want to delete{" "}
              <strong>{selectedEmployee?.firstName} {selectedEmployee?.lastName}</strong>?
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 py-3 rounded-xl"
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteEmployee}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
