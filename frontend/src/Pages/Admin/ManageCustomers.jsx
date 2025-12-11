import { useState, useEffect } from "react";
import { Eye, X, Phone, Mail, MapPin, Calendar } from "lucide-react";
import toast from "react-hot-toast";

export function ManageCustomers() {
  const [customers, setCustomers] = useState([]);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const API_BASE = "http://localhost:5000";

  // ---- FETCH ALL APPOINTMENTS ----
  const fetchCustomers = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/appointments`);
      const result = await res.json();

      if (!result.success) {
        toast.error("Failed to load appointments");
        return;
      }

      const appointments = result.data || [];

      // ---- GROUP BY EMAIL ----
      const grouped = {};

      appointments.forEach((a) => {
        const email = a.email;

        if (!grouped[email]) {
          grouped[email] = {
            email,
            firstname: a.firstname,
            lastname: a.lastname,
            phonenumber: a.phonenumber,
            address: a.stress || "Not Provided",
            joinDate: a.createdAt, // will update with earliest
            complaints: [],
          };
        }

        // Add complaint into history
        grouped[email].complaints.push({
          id: a._id,
          device: `${a.brand} ${a.model}`,
          issue: a.message,
          date: new Date(a.createdAt).toLocaleDateString(),
          status: a.status,
        });

        // Update join date to earliest
        if (new Date(a.createdAt) < new Date(grouped[email].joinDate)) {
          grouped[email].joinDate = a.createdAt;
        }
      });

      // ---- FINAL CUSTOMER ARRAY ----
      const finalCustomers = Object.values(grouped).map((c, index) => ({
        customerId: `C-${index + 1}`, // same as complaint ID pattern
        name: `${c.firstname} ${c.lastname}`,
        phone: c.phonenumber,
        email: c.email,
        address: c.address,
        joinDate: new Date(c.joinDate).toLocaleDateString(),
        totalComplaints: c.complaints.length,
        complaints: c.complaints,
      }));

      setCustomers(finalCustomers);
    } catch (err) {
      console.error(err);
      toast.error("Server error while loading customers");
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Manage Customers</h1>
        <p className="text-gray-600 mt-2">View customer information and complaint history</p>
      </div>

      {/* Desktop Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hidden md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Phone</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Total Complaints</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Join Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {customers.map((customer) => (
                <tr key={customer.customerId} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium">{customer.customerId}</td>
                  <td className="px-6 py-4">{customer.name}</td>
                  <td className="px-6 py-4 text-gray-600">{customer.phone}</td>
                  <td className="px-6 py-4 text-gray-600">{customer.email}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      {customer.totalComplaints}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{customer.joinDate}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => {
                        setSelectedCustomer(customer);
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

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {customers.map((customer) => (
          <div key={customer.customerId} className="bg-white rounded-xl shadow p-4 border flex justify-between items-center">
            <div>
              <p className="font-bold">{customer.name}</p>
              <p className="text-gray-600 text-sm">{customer.phone}</p>
            </div>

            <button
              onClick={() => {
                setSelectedCustomer(customer);
                setShowViewModal(true);
              }}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
            >
              <Eye size={20} />
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showViewModal && selectedCustomer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full p-6 max-h-[90vh] overflow-y-auto">

            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Customer Details</h2>
              <button onClick={() => setShowViewModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={24} />
              </button>
            </div>

            {/* Banner */}
            <div className="bg-gradient-to-r from-[#00A884] to-[#00c49a] rounded-xl p-6 text-white mb-6">
              <h3 className="text-2xl font-bold mb-4">{selectedCustomer.name}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Phone size={18} />
                  <span>{selectedCustomer.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={18} />
                  <span>{selectedCustomer.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={18} />
                  <span>{selectedCustomer.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={18} />
                  <span>Joined: {selectedCustomer.joinDate}</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-100">
                <p className="text-3xl font-bold text-blue-600">{selectedCustomer.totalComplaints}</p>
                <p className="text-sm text-gray-600 mt-1">Total Complaints</p>
              </div>

              <div className="bg-green-50 rounded-xl p-4 text-center border border-green-100">
                <p className="text-3xl font-bold text-green-600">
                  {selectedCustomer.complaints.filter(c => c.status === "Completed").length}
                </p>
                <p className="text-sm text-gray-600 mt-1">Completed</p>
              </div>

              <div className="bg-yellow-50 rounded-xl p-4 text-center border border-yellow-100">
                <p className="text-3xl font-bold text-yellow-600">
                  {selectedCustomer.complaints.filter(c => c.status !== "Completed").length}
                </p>
                <p className="text-sm text-gray-600 mt-1">Active</p>
              </div>
            </div>

            {/* Complaint History */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Complaint History</h3>

              <div className="space-y-3">
                {selectedCustomer.complaints.map((complaint) => (
                  <div
                    key={complaint.id}
                    className="border border-gray-200 rounded-xl p-4 hover:border-[#00A884] transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-semibold">{complaint.id}</span>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              complaint.status
                            )}`}
                          >
                            {complaint.status}
                          </span>
                        </div>

                        <p className="text-sm text-gray-600">
                          <strong>Device:</strong> {complaint.device}
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>Issue:</strong> {complaint.issue}
                        </p>
                      </div>

                      <span className="text-sm text-gray-500">{complaint.date}</span>
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default ManageCustomers;
