import { useState } from 'react';
import { Plus, Edit, Trash2, X, Wrench } from 'lucide-react';

export function ManageServices() {
  const [services, setServices] = useState([
    { id: 1, name: 'Screen Replacement', price: '₹2,500', description: 'Complete screen replacement for all devices' },
    { id: 2, name: 'Battery Replacement', price: '₹1,800', description: 'Original battery replacement with warranty' },
    { id: 3, name: 'Water Damage Repair', price: '₹3,500', description: 'Complete water damage diagnosis and repair' },
    { id: 4, name: 'Charging Port Repair', price: '₹1,200', description: 'Charging port cleaning and replacement' },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
  });

  const handleAddService = () => {
    const newService = {
      id: services.length + 1,
      ...formData,
    };
    setServices([...services, newService]);
    setShowAddModal(false);
    setFormData({ name: '', price: '', description: '' });
  };

  const handleEditService = () => {
    setServices(services.map(s => 
      s.id === selectedService.id ? { ...selectedService, ...formData } : s
    ));
    setShowEditModal(false);
    setFormData({ name: '', price: '', description: '' });
  };

  const handleDeleteService = () => {
    setServices(services.filter(s => s.id !== selectedService.id));
    setShowDeleteModal(false);
    setSelectedService(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Services</h1>
          <p className="text-gray-600 mt-2">Add, edit, and manage repair services</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-[#00A884] hover:bg-[#008f6f] text-white px-6 py-3 rounded-xl shadow-lg transition-all"
        >
          <Plus size={20} />
          Add Service
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-[#00A884] bg-opacity-10 p-3 rounded-xl">
                <Wrench className="text-[#00A884]" size={28} />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSelectedService(service);
                    setFormData(service);
                    setShowEditModal(true);
                  }}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => {
                    setSelectedService(service);
                    setShowDeleteModal(true);
                  }}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
            <p className="text-2xl font-bold text-[#00A884] mb-3">{service.price}</p>
            <p className="text-sm text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>

      {/* Add Service Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Add New Service</h2>
              <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Service Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00A884] focus:border-transparent"
              />
              <input
                type="text"
                placeholder="Price (e.g., ₹2,500)"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00A884] focus:border-transparent"
              />
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00A884] focus:border-transparent resize-none"
              />
              <button
                onClick={handleAddService}
                className="w-full bg-[#00A884] hover:bg-[#008f6f] text-white py-3 rounded-xl font-semibold transition-all"
              >
                Add Service
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Service Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Edit Service</h2>
              <button onClick={() => setShowEditModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Service Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00A884] focus:border-transparent"
              />
              <input
                type="text"
                placeholder="Price (e.g., ₹2,500)"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00A884] focus:border-transparent"
              />
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00A884] focus:border-transparent resize-none"
              />
              <button
                onClick={handleEditService}
                className="w-full bg-[#00A884] hover:bg-[#008f6f] text-white py-3 rounded-xl font-semibold transition-all"
              >
                Update Service
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
              <h2 className="text-2xl font-bold text-gray-900">Delete Service</h2>
              <button onClick={() => setShowDeleteModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={24} />
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete <strong>{selectedService?.name}</strong>? This action cannot be undone.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-xl font-semibold transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteService}
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