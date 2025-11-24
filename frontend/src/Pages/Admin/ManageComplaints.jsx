import { useState } from 'react';
import { Eye, Filter, X, Search } from 'lucide-react';

export function ManageComplaints() {
  const [complaints, setComplaints] = useState([
    { id: 'C-1001', customer: 'Rajesh Kumar', device: 'iPhone 13', issue: 'Screen replacement', status: 'Pending', assignedTo: 'Unassigned', date: '2025-01-18' },
    { id: 'C-1002', customer: 'Priya Sharma', device: 'Samsung S21', issue: 'Battery issue', status: 'In Progress', assignedTo: 'Ramesh Kumar', date: '2025-01-17' },
    { id: 'C-1003', customer: 'Amit Patel', device: 'OnePlus 9', issue: 'Water damage', status: 'Completed', assignedTo: 'Suresh Reddy', date: '2025-01-16' },
    { id: 'C-1004', customer: 'Sneha Reddy', device: 'Xiaomi Mi 11', issue: 'Charging port', status: 'In Progress', assignedTo: 'Vikram Singh', date: '2025-01-18' },
  ]);

  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterDevice, setFilterDevice] = useState('All');

  const employees = ['Ramesh Kumar', 'Suresh Reddy', 'Vikram Singh', 'Ananya Iyer'];

  const updateStatus = (id, newStatus) => {
    setComplaints(complaints.map(c => 
      c.id === id ? { ...c, status: newStatus } : c
    ));
  };

  const assignEmployee = (id, employee) => {
    setComplaints(complaints.map(c => 
      c.id === id ? { ...c, assignedTo: employee, status: employee === 'Unassigned' ? 'Pending' : 'In Progress' } : c
    ));
  };

  const filteredComplaints = complaints.filter(c => {
    const matchesSearch = c.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         c.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || c.status === filterStatus;
    const matchesDevice = filterDevice === 'All' || c.device.includes(filterDevice);
    return matchesSearch && matchesStatus && matchesDevice;
  });

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
        <h1 className="text-3xl font-bold text-gray-900">Manage Complaints</h1>
        <p className="text-gray-600 mt-2">View, assign, and track customer complaints</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search complaints..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00A884] focus:border-transparent"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00A884] focus:border-transparent appearance-none"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={filterDevice}
              onChange={(e) => setFilterDevice(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00A884] focus:border-transparent appearance-none"
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

      {/* Complaints Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Customer</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Device</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Issue</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Assigned To</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredComplaints.map((complaint) => (
                <tr key={complaint.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{complaint.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{complaint.customer}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{complaint.device}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{complaint.issue}</td>
                  <td className="px-6 py-4">
                    <select
                      value={complaint.status}
                      onChange={(e) => updateStatus(complaint.id, e.target.value)}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(complaint.status)} border-0 cursor-pointer`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={complaint.assignedTo}
                      onChange={(e) => assignEmployee(complaint.id, e.target.value)}
                      className="text-sm px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A884] focus:border-transparent"
                    >
                      <option value="Unassigned">Unassigned</option>
                      {employees.map(emp => (
                        <option key={emp} value={emp}>{emp}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => {
                        setSelectedComplaint(complaint);
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

      {/* View Complaint Modal */}
      {showViewModal && selectedComplaint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Complaint Details</h2>
              <button onClick={() => setShowViewModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Complaint ID</p>
                  <p className="text-lg font-semibold text-gray-900">{selectedComplaint.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="text-lg font-semibold text-gray-900">{selectedComplaint.date}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Customer Name</p>
                <p className="text-lg font-semibold text-gray-900">{selectedComplaint.customer}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Device</p>
                <p className="text-lg font-semibold text-gray-900">{selectedComplaint.device}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Issue Description</p>
                <p className="text-gray-900 bg-gray-50 p-4 rounded-xl">{selectedComplaint.issue}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${getStatusColor(selectedComplaint.status)}`}>
                    {selectedComplaint.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Assigned To</p>
                  <p className="text-lg font-semibold text-gray-900 mt-2">{selectedComplaint.assignedTo}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}