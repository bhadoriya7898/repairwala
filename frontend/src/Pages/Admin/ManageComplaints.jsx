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
      c.id === id
        ? { ...c, assignedTo: employee, status: employee === 'Unassigned' ? 'Pending' : 'In Progress' }
        : c
    ));
  };

  const filteredComplaints = complaints.filter(c => {
    const s = searchTerm.toLowerCase();
    const matchesSearch = c.customer.toLowerCase().includes(s) || c.id.toLowerCase().includes(s);
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

      {/* ------------------------ DESKTOP TABLE ------------------------ */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hidden md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Customer</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Device</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Issue</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Assigned To</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredComplaints.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{c.id}</td>
                  <td className="px-6 py-4">{c.customer}</td>
                  <td className="px-6 py-4">{c.device}</td>
                  <td className="px-6 py-4">{c.issue}</td>

                  <td className="px-6 py-4">
                    <select
                      value={c.status}
                      onChange={(e) => updateStatus(c.id, e.target.value)}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(c.status)}`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>

                  <td className="px-6 py-4">
                    <select
                      value={c.assignedTo}
                      onChange={(e) => assignEmployee(c.id, e.target.value)}
                      className="text-sm px-3 py-1 border rounded-lg"
                    >
                      <option value="Unassigned">Unassigned</option>
                      {employees.map(emp => (
                        <option key={emp}>{emp}</option>
                      ))}
                    </select>
                  </td>

                  <td className="px-6 py-4">
                    <button
                      onClick={() => {
                        setSelectedComplaint(c);
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

      {/* ------------------------ MOBILE CARD VIEW ------------------------ */}
      <div className="md:hidden space-y-4">
        {filteredComplaints.map((c) => (
          <div key={c.id} className="bg-white rounded-xl shadow p-4 border">
            <div className="flex justify-between">
              <h3 className="font-semibold">{c.customer}</h3>
              <button
                onClick={() => {
                  setSelectedComplaint(c);
                  setShowViewModal(true);
                }}
                className="text-blue-600 p-2 rounded-lg"
              >
                <Eye size={20} />
              </button>
            </div>

            <p className="text-sm text-gray-600"><strong>ID:</strong> {c.id}</p>
            <p className="text-sm text-gray-600"><strong>Device:</strong> {c.device}</p>
            <p className="text-sm text-gray-600"><strong>Issue:</strong> {c.issue}</p>

            <div className="mt-2 flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(c.status)}`}>
                {c.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ------------------------ VIEW MODAL ------------------------ */}
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
                  <p className="text-lg font-semibold">{selectedComplaint.id}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="text-lg font-semibold">{selectedComplaint.date}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500">Customer</p>
                <p className="text-lg font-semibold">{selectedComplaint.customer}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Device</p>
                <p className="text-lg font-semibold">{selectedComplaint.device}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Issue</p>
                <p className="bg-gray-50 p-4 rounded-xl">{selectedComplaint.issue}</p>
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
                  <p className="text-lg font-semibold mt-2">{selectedComplaint.assignedTo}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
