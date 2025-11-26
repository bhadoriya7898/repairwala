import { useState } from "react";
import { Plus, Edit, Trash2, X, Search, Check, XCircle } from "lucide-react";

export function ManageEmployees() {
  /* ---------------- STATE ---------------- */

  // Pending Approval Employees (Static for now, backend later)
  const [pendingEmployees, setPendingEmployees] = useState([
    { id: "P-001", firstName: "Amit", lastName: "Sharma", email: "amit@gmail.com" },
    { id: "P-002", firstName: "Rohit", lastName: "Verma", email: "rohit@gmail.com" },
  ]);

  // Approved Employees
  const [employees, setEmployees] = useState([
    {
      id: "EMP-001",
      firstName: "Ramesh",
      lastName: "Kumar",
      email: "ramesh@gmail.com",
      phone: "9876543210",
      role: "Technician",
      status: "Active",
    },
    {
      id: "EMP-002",
      firstName: "Suresh",
      lastName: "Reddy",
      email: "suresh@gmail.com",
      phone: "8765432109",
      role: "Senior Tech",
      status: "Active",
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "",
    password: "",
  });

  /* ---------------- HANDLERS ---------------- */

  // Approve Employee
  const approveEmployee = (id) => {
    const emp = pendingEmployees.find((e) => e.id === id);

    const newEmp = {
      id: `EMP-${String(employees.length + 1).padStart(3, "0")}`,
      firstName: emp.firstName,
      lastName: emp.lastName,
      email: emp.email,
      phone: "0000000000",
      role: "Technician",
      status: "Active",
    };

    setEmployees([...employees, newEmp]);
    setPendingEmployees(pendingEmployees.filter((e) => e.id !== id));
  };

  // Reject Employee
  const rejectEmployee = (id) => {
    setPendingEmployees(pendingEmployees.filter((e) => e.id !== id));
  };

  // Add New Employee
  const handleAddEmployee = () => {
    const newEmp = {
      id: `EMP-${String(employees.length + 1).padStart(3, "0")}`,
      ...formData,
      status: "Active",
    };

    setEmployees([...employees, newEmp]);
    setShowAddModal(false);
  };

  // Edit Employee
  const handleEditEmployee = () => {
    setEmployees(
      employees.map((emp) =>
        emp.id === selectedEmployee.id ? { ...selectedEmployee, ...formData } : emp
      )
    );
    setShowEditModal(false);
  };

  // Delete Employee
  const handleDeleteEmployee = () => {
    setEmployees(employees.filter((emp) => emp.id !== selectedEmployee.id));
    setShowDeleteModal(false);
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="space-y-10">

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Manage Employees</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-[#00A884] hover:bg-[#008f6f] text-white px-6 py-3 rounded-xl shadow-lg"
        >
          <Plus size={20} /> Add Employee
        </button>
      </div>

      {/* ---------------- Pending Approval Section ---------------- */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Employee Approval Requests</h2>

        {pendingEmployees.length === 0 ? (
          <p className="text-gray-500">No pending requests</p>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {pendingEmployees.map((emp) => (
                <tr key={emp.id} className="border-b">
                  <td className="px-6 py-4">{emp.firstName} {emp.lastName}</td>
                  <td className="px-6 py-4">{emp.email}</td>
                  <td className="px-6 py-4 flex gap-3">
                    <button
                      onClick={() => approveEmployee(emp.id)}
                      className="flex items-center gap-1 text-green-600 hover:bg-green-100 px-3 py-1 rounded-lg"
                    >
                      <Check size={16} /> Approve
                    </button>

                    <button
                      onClick={() => rejectEmployee(emp.id)}
                      className="flex items-center gap-1 text-red-600 hover:bg-red-100 px-3 py-1 rounded-lg"
                    >
                      <XCircle size={16} /> Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ---------------- Approved Employees Section ---------------- */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Employees</h2>

        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">ID</th>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Phone</th>
              <th className="px-6 py-3 text-left">Role</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id} className="border-b">
                <td className="px-6 py-4">{emp.id}</td>
                <td className="px-6 py-4">{emp.firstName} {emp.lastName}</td>
                <td className="px-6 py-4">{emp.email}</td>
                <td className="px-6 py-4">{emp.phone}</td>
                <td className="px-6 py-4">{emp.role}</td>
                <td className="px-6 py-4">{emp.status}</td>

                <td className="px-6 py-4">
                  <div className="flex gap-3">

                    {/* Edit Button */}
                    <button
                      onClick={() => {
                        setSelectedEmployee(emp);
                        setFormData(emp);
                        setShowEditModal(true);
                      }}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                    >
                      <Edit size={18} />
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => {
                        setSelectedEmployee(emp);
                        setShowDeleteModal(true);
                      }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---------------- Add Employee Modal ---------------- */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Add New Employee</h2>
              <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <input type="text" placeholder="First Name" value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full px-4 py-3 border rounded-xl"
              />

              <input type="text" placeholder="Last Name" value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full px-4 py-3 border rounded-xl"
              />

              <input type="email" placeholder="Email" value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border rounded-xl"
              />

              <input type="password" placeholder="Password" value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 border rounded-xl"
              />

              <button
                onClick={handleAddEmployee}
                className="w-full bg-[#00A884] hover:bg-[#008f6f] text-white py-3 rounded-xl font-semibold"
              >
                Add Employee
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- Edit Modal ---------------- */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">

            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Edit Employee</h2>
              <button onClick={() => setShowEditModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <input type="text" placeholder="First Name" value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full px-4 py-3 border rounded-xl"
              />

              <input type="text" placeholder="Last Name" value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full px-4 py-3 border rounded-xl"
              />

              <input type="email" placeholder="Email" value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border rounded-xl"
              />

              <input type="text" placeholder="Phone Number" value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 border rounded-xl"
              />

              <input type="text" placeholder="Role" value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-4 py-3 border rounded-xl"
              />

              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-3 border rounded-xl"
              >
                <option value="Active">Active</option>
                <option value="Suspended">Suspended</option>
              </select>

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

      {/* ---------------- Delete Confirmation ---------------- */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">

            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Delete Employee</h2>
              <button onClick={() => setShowDeleteModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={24} />
              </button>
            </div>

            <p className="mb-6 text-gray-700">
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
