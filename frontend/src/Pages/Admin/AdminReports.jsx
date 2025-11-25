import { Check, X, Clock, Users } from "lucide-react";
import { useEffect, useState } from "react";

export function AdminReports() {

  // ─── PENDING EMPLOYEE DATA ────────────────────────────────
  // Later replace with API:
  // GET: /api/admin/pending-employees
  const [pendingEmployees, setPendingEmployees] = useState([
    {
      id: "1",
      firstName: "Raj",
      lastName: "Kumar",
      email: "rajkumar@gmail.com",
      joined: "2024-11-10",
    },
    {
      id: "2",
      firstName: "Simran",
      lastName: "Sharma",
      email: "simran@gmail.com",
      joined: "2024-11-12",
    }
  ]);

  // ─── APPROVE FUNCTION ───────────────────────────────
  const approveEmployee = (id) => {

    // TODO: API CALL → /api/admin/approve-employee/:id

    setPendingEmployees((prev) => prev.filter(emp => emp.id !== id));
    alert("Employee Approved Successfully!");
  };

  // ─── REJECT FUNCTION ───────────────────────────────
  const rejectEmployee = (id) => {

    // TODO: API CALL → /api/admin/reject-employee/:id

    setPendingEmployees((prev) => prev.filter(emp => emp.id !== id));
    alert("Employee Rejected!");
  };

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Employee Approval Requests</h1>
        <p className="text-gray-600 mt-2">Approve or reject new employee registrations</p>
      </div>

      {/* CARD WRAPPER */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">

        <div className="p-6 border-b border-gray-200 flex items-center gap-3">
          <Users size={28} className="text-blue-600" />
          <h2 className="text-xl font-bold text-gray-900">Pending Employees</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Joined</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">

              {pendingEmployees.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-8 text-gray-500">
                    <Clock className="inline-block mr-2" />
                    No pending employee requests
                  </td>
                </tr>
              )}

              {pendingEmployees.map((emp) => (
                <tr key={emp.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {emp.firstName} {emp.lastName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{emp.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{emp.joined}</td>

                  <td className="px-6 py-4 flex gap-3">

                    <button
                      onClick={() => approveEmployee(emp.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                    >
                      <Check size={16} /> Approve
                    </button>

                    <button
                      onClick={() => rejectEmployee(emp.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    >
                      <X size={16} /> Reject
                    </button>

                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}
