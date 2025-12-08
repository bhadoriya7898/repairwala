import { useState } from 'react';
import { Eye, X, Phone, Mail, MapPin, Calendar } from 'lucide-react';

export function ManageCustomers() {
  const [customers, setCustomers] = useState([
    { 
      id: 'CUST-001', 
      name: 'Rajesh Kumar', 
      phone: '+91 98765 43210', 
      email: 'rajesh@example.com',
      address: '123, MG Road, Bangalore',
      joinDate: '2024-06-15',
      totalComplaints: 5,
      complaints: [
        { id: 'C-1001', device: 'iPhone 13', issue: 'Screen replacement', date: '2025-01-15', status: 'Completed' },
        { id: 'C-0987', device: 'iPad Pro', issue: 'Battery issue', date: '2024-12-20', status: 'Completed' },
      ]
    },
    { 
      id: 'CUST-002', 
      name: 'Priya Sharma', 
      phone: '+91 87654 32109', 
      email: 'priya@example.com',
      address: '456, Brigade Road, Bangalore',
      joinDate: '2024-08-22',
      totalComplaints: 3,
      complaints: [
        { id: 'C-1002', device: 'Samsung S21', issue: 'Battery replacement', date: '2025-01-16', status: 'In Progress' },
      ]
    },
    { 
      id: 'CUST-003', 
      name: 'Amit Patel', 
      phone: '+91 76543 21098', 
      email: 'amit@example.com',
      address: '789, Koramangala, Bangalore',
      joinDate: '2024-10-10',
      totalComplaints: 2,
      complaints: [
        { id: 'C-1003', device: 'OnePlus 9', issue: 'Water damage', date: '2025-01-17', status: 'Pending' },
      ]
    },
  ]);

  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-700';
      case 'In Progress': return 'bg-blue-100 text-blue-700';
      case 'Pending': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Manage Customers</h1>
        <p className="text-gray-600 mt-2">View customer information and complaint history</p>
      </div>

      {/* ------------------------ DESKTOP TABLE ------------------------ */}
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
                <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{customer.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{customer.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{customer.phone}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{customer.email}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      {customer.totalComplaints}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{customer.joinDate}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => {
                        setSelectedCustomer(customer);
                        setShowViewModal(true);
                      }}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
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

      {/* ------------------------ MOBILE CARD VIEW ------------------------ */}
      <div className="md:hidden space-y-4">
        {customers.map((customer) => (
          <div key={customer.id} className="bg-white rounded-xl shadow p-4 border flex justify-between items-center">
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

      {/* ------------------------ VIEW CUSTOMER MODAL ------------------------ */}
      {showViewModal && selectedCustomer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full p-6 max-h-[90vh] overflow-y-auto">

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Customer Details</h2>
              <button onClick={() => setShowViewModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={24} />
              </button>
            </div>

            {/* Customer Banner */}
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
                  {selectedCustomer.complaints.filter(c => c.status === 'Completed').length}
                </p>
                <p className="text-sm text-gray-600 mt-1">Completed</p>
              </div>

              <div className="bg-yellow-50 rounded-xl p-4 text-center border border-yellow-100">
                <p className="text-3xl font-bold text-yellow-600">
                  {selectedCustomer.complaints.filter(c => c.status !== 'Completed').length}
                </p>
                <p className="text-sm text-gray-600 mt-1">Active</p>
              </div>
            </div>

            {/* Complaint History */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Complaint History</h3>

              <div className="space-y-3">
                {selectedCustomer.complaints.map((complaint) => (
                  <div key={complaint.id} className="border border-gray-200 rounded-xl p-4 hover:border-[#00A884] transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-semibold text-gray-900">{complaint.id}</span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(complaint.status)}`}>
                            {complaint.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">
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
