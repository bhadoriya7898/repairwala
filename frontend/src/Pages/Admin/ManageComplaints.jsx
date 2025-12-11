// ManageComplaints.jsx
import { useState, useEffect } from "react";
import { Eye, Filter, X, Search } from "lucide-react";
import toast from "react-hot-toast";

export function ManageComplaints() {
  const [appointments, setAppointments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterDevice, setFilterDevice] = useState("All");

  const API_BASE = "http://localhost:5000";

  // Helper to safely derive an employee display name from whatever backend returns
  const deriveEmployeeDisplayName = (emp) => {
    if (!emp) return "Unknown";
    if (emp.fullName) return emp.fullName;
    if (emp.name) return emp.name;
    // some backends use firstName/lastName
    if (emp.firstName || emp.lastName) return `${emp.firstName || ""} ${emp.lastName || ""}`.trim();
    // maybe profile has names
    if (emp.profile?.firstName || emp.profile?.lastName) {
      return `${emp.profile?.firstName || ""} ${emp.profile?.lastName || ""}`.trim();
    }
    // fallback to email or phone
    return emp.email || emp.phone || emp._id || "Employee";
  };

  // fetch employees
  const fetchEmployees = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/employees`);
      const result = await res.json();

      if (result.success) {
  const raw = result.data || result.employees || result || [];

  // 🔥 Filter only APPROVED employees
  const approvedEmployees = raw.filter((emp) => emp.isApproved);

  // Normalize with displayName
  const normalized = approvedEmployees.map((emp) => ({
    ...emp,
    displayName: deriveEmployeeDisplayName(emp),
  }));

  setEmployees(normalized);
}
   else {
        toast.error("Failed to load employees");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error while loading employees");
    }
  };

  // fetch appointments (complaints)
  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/appointments`);
      const result = await res.json();
      if (result.success) {
        setAppointments(result.data || []);
      } else {
        toast.error(result.message || "Failed to load complaints");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error while loading complaints!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchAppointments();
  }, []);

  // update status (PATCH)
  const updateStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`${API_BASE}/api/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const result = await res.json();
      if (result.success) {
        toast.success("Status updated");
        fetchAppointments();
      } else {
        toast.error(result.message || "Failed to update status");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    }
  };

  // assign employee (PATCH)
  const assignEmployee = async (id, employeeId) => {
    try {
      // determine new status if employee assigned/unassigned
      const newStatus = employeeId ? "In Progress" : "Pending";
      const body = { assignedTo: employeeId || null, status: newStatus };

      const res = await fetch(`${API_BASE}/api/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const result = await res.json();
      if (result.success) {
        toast.success("Employee assigned");
        fetchAppointments();
      } else {
        toast.error(result.message || "Failed to assign employee");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    }
  };

  // filter/map for UI
  const filtered = appointments.filter((a) => {
    const s = searchTerm.toLowerCase();
    const fullname = `${a.firstname || ""} ${a.lastname || ""}`.toLowerCase();
    const matchesSearch =
      fullname.includes(s) ||
      (a.phonenumber || "").toLowerCase().includes(s) ||
      (a._id || "").toLowerCase().includes(s);

    const matchesStatus = filterStatus === "All" || a.status === filterStatus;
    const matchesDevice = filterDevice === "All" || (a.model || "").includes(filterDevice);

    return matchesSearch && matchesStatus && matchesDevice;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "In Progress":
        return "bg-blue-100 text-blue-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // helper to display assigned employee name
  const assignedName = (appt) => {
    if (!appt?.assignedTo) return "Unassigned";

    // If assignedTo is populated object with name/fullName
    if (typeof appt.assignedTo === "object") {
      const ao = appt.assignedTo;
      if (ao.displayName) return ao.displayName;
      if (ao.fullName) return ao.fullName;
      if (ao.name) return ao.name;
      if (ao.firstName || ao.lastName) return `${ao.firstName || ""} ${ao.lastName || ""}`.trim();
      if (ao.profile?.firstName || ao.profile?.lastName)
        return `${ao.profile?.firstName || ""} ${ao.profile?.lastName || ""}`.trim();
      return ao.email || ao._id || "Assigned";
    }

    // If assignedTo is just an id -> lookup in employees (normalized list)
    const emp = employees.find((e) => e._id === appt.assignedTo || e._id === String(appt.assignedTo));
    if (emp) return emp.displayName || deriveEmployeeDisplayName(emp);
    return "Assigned";
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Manage Complaints</h1>
        <p className="text-gray-600 mt-2">View, assign, and track customer complaints (appointments)</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search complaints..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00A884]"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#00A884]"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={filterDevice}
              onChange={(e) => setFilterDevice(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#00A884]"
            >
              <option value="All">All Devices</option>
              <option value="iPhone">iPhone</option>
              <option value="Samsung">Samsung</option>
              <option value="OnePlus">OnePlus</option>
              <option value="Xiaomi">Xiaomi</option>
            </select>
          </div>
        </div>
      </div>

      {loading && (
        <div className="text-center py-6 text-gray-600">Loading complaints...</div>
      )}

      {/* Desktop table */}
      {!loading && (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hidden md:block">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Customer</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Device</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Issue</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold w-32">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold w-40">Assigned To</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold w-20">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {filtered.map((a, index) => (
                  <tr key={a._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{"C-" + (index + 1)}</td>
                    <td className="px-6 py-4">{a.firstname} {a.lastname}</td>
                    <td className="px-6 py-4">{a.model}</td>
                    <td className="px-6 py-4">{a.message}</td>

                    <td className="px-6 py-4">
                      <select
                        value={a.status}
                        onChange={(e) => updateStatus(a._id, e.target.value)}
                        className={`px-3 py-2 rounded-lg text-xs font-medium ${getStatusColor(a.status)}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>

                    <td className="px-6 py-4">
                      <select
                        value={a.assignedTo ? (typeof a.assignedTo === "object" ? a.assignedTo._id : a.assignedTo) : ""}
                        onChange={(e) => assignEmployee(a._id, e.target.value || null)}
                        className="text-sm px-3 py-2 border rounded-lg w-full"
                      >
                        <option value="">Unassigned</option>
                        {employees.map((emp) => (
                          <option key={emp._id} value={emp._id}>
                            {emp.displayName}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          setSelectedComplaint(a);
                          setShowViewModal(true);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                      >
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Mobile cards */}
      <div className="md:hidden space-y-4">
        {filtered.map((a, index) => (
          <div key={a._id} className="bg-white rounded-xl shadow p-4 border">
            <div className="flex justify-between">
              <h3 className="font-semibold">{a.firstname} {a.lastname}</h3>
              <button
                onClick={() => {
                  setSelectedComplaint(a);
                  setShowViewModal(true);
                }}
                className="text-blue-600 p-2 rounded-lg"
              >
                <Eye size={20} />
              </button>
            </div>

            <p className="text-sm text-gray-600"><strong>ID:</strong> {"C-" + (index + 1)}</p>
            <p className="text-sm text-gray-600"><strong>Device:</strong> {a.model}</p>
            <p className="text-sm text-gray-600"><strong>Issue:</strong> {a.message}</p>
            <div className="mt-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(a.status)}`}>
                {a.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* View modal */}
      {showViewModal && selectedComplaint && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Complaint Details</h2>
              <button onClick={() => setShowViewModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Complaint ID</p>
                  <p className="text-lg font-semibold">{"C-" + (filtered.findIndex(item => item._id === selectedComplaint._id) + 1)}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="text-lg font-semibold">{new Date(selectedComplaint.createdAt).toLocaleString()}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500">Customer</p>
                <p className="text-lg font-semibold">{selectedComplaint.firstname} {selectedComplaint.lastname}</p>
                <p className="text-sm text-gray-600">Phone: {selectedComplaint.phonenumber}</p>
                <p className="text-sm text-gray-600">Email: {selectedComplaint.email}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Device</p>
                <p className="text-lg font-semibold">{selectedComplaint.brand} {selectedComplaint.model}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Issue</p>
                <p className="bg-gray-50 p-4 rounded-xl">{selectedComplaint.message}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedComplaint.status)}`}>
                    {selectedComplaint.status}
                  </span>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Assigned To</p>
                  <p className="text-lg font-semibold mt-2">{assignedName(selectedComplaint)}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default ManageComplaints;
