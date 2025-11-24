import { useState } from 'react';
import { Plus, Edit, Trash2, X, Search } from 'lucide-react';

export function ManageEmployees() {
  const [employees, setEmployees] = useState([
    { id: 'EMP-001', name: 'Ramesh Kumar', phone: '+91 98765 43210', role: 'Senior Technician', status: 'Active' },
    { id: 'EMP-002', name: 'Suresh Reddy', phone: '+91 87654 32109', role: 'Technician', status: 'Active' },
    { id: 'EMP-003', name: 'Vikram Singh', phone: '+91 76543 21098', role: 'Junior Technician', status: 'Active' },
    { id: 'EMP-004', name: 'Ananya Iyer', phone: '+91 65432 10987', role: 'Technician', status: 'Suspended' },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    role: '',
    status: 'Active',
  });

  const handleAddEmployee = () => {
    const newEmployee = {
      id: `EMP-${String(employees.length + 1).padStart(3, '0')}`,
      ...formData,
    };
    setEmployees([...employees, newEmployee]);
    setShowAddModal(false);
    setFormData({ name: '', phone: '', role: '', status: 'Active' });
  };

  const handleEditEmployee = () => {
    setEmployees(employees.map(emp => 
      emp.id === selectedEmployee.id ? { ...selectedEmployee, ...formData } : emp
    ));
    setShowEditModal(false);
    setFormData({ name: '', phone: '', role: '', status: 'Active' });
  };

  const handleDeleteEmployee = () => {
    setEmployees(employees.filter(emp => emp.id !== selectedEmployee.id));
    setShowDeleteModal(false);
    setSelectedEmployee(null);
  };

  const toggleStatus = (id) => {
    setEmployees(employees.map(emp => 
      emp.id === id ? { ...emp, status: emp.status === 'Active' ? 'Suspended' : 'Active' } : emp
    ));
  };

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Employees</h1>
          <p className="text-gray-600 mt-2">Add, edit, and manage your team members</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-[#00A884] hover:bg-[#008f6f] text-white px-6 py-3 rounded-xl shadow-lg transition-all"
        >
          <Plus size={20} />
          Add Employee
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl shadow-lg p-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00A884] focus:border-transparent"
          />
        </div>
      </div>

      {/* Employees Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Phone</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Role</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{employee.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{employee.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{employee.phone}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{employee.role}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleStatus(employee.id)}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        employee.status === 'Active'
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-red-100 text-red-700 hover:bg-red-200'
                      } transition-colors`}
                    >
                      {employee.status}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedEmployee(employee);
                          setFormData(employee);
                          setShowEditModal(true);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedEmployee(employee);
                          setShowDeleteModal(true);
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
      </div>

      {/* Add Employee Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Add New Employee</h2>
              <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00A884] focus:border-transparent"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00A884] focus:border-transparent"
              />
              <input
                type="text"
                placeholder="Role"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00A884] focus:border-transparent"
              />
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00A884] focus:border-transparent"
              >
                <option value="Active">Active</option>
                <option value="Suspended">Suspended</option>
              </select>
              <button
                onClick={handleAddEmployee}
                className="w-full bg-[#00A884] hover:bg-[#008f6f] text-white py-3 rounded-xl font-semibold transition-all"
              >
                Add Employee
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Employee Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Edit Employee</h2>
              <button onClick={() => setShowEditModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00A884] focus:border-transparent"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00A884] focus:border-transparent"
              />
              <input
                type="text"
                placeholder="Role"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00A884] focus:border-transparent"
              />
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00A884] focus:border-transparent"
              >
                <option value="Active">Active</option>
                <option value="Suspended">Suspended</option>
              </select>
              <button
                onClick={handleEditEmployee}
                className="w-full bg-[#00A884] hover:bg-[#008f6f] text-white py-3 rounded-xl font-semibold transition-all"
              >
                Update Employee
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Delete Employee</h2>
              <button onClick={() => setShowDeleteModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={24} />
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete <strong>{selectedEmployee?.name}</strong>? This action cannot be undone.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-xl font-semibold transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteEmployee}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition-all"
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