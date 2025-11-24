import { User, Mail, Phone, MapPin, Calendar, Save } from 'lucide-react';
import { useState } from 'react';

export const EmployeeProfile = () => {
  const [formData, setFormData] = useState({
    fullName: 'Ramesh Kumar',
    email: 'ramesh.kumar@repairwala.com',
    phone: '+91 98765 43210',
    address: '123, MG Road, Bangalore, Karnataka - 560001',
    joinDate: '2024-06-15',
    employeeId: 'EMP-2024-001',
    specialization: 'Mobile Repair Specialist',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add update profile logic here
    alert('Profile updated successfully!');
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
        <p className="text-gray-600 font-para mt-2">
          Manage your personal information and account settings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Photo Section */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
            <div className="text-center space-y-6">
              {/* Photo Placeholder */}
              <div className="relative inline-block">
                <div className="w-40 h-40 bg-gradient-to-br from-[#00A884] to-[#00c49a] rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <User size={80} className="text-white" />
                </div>
                <button className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-shadow">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-700"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
              </div>

              {/* Employee Info */}
              <div>
                <h2 className="text-xl font-bold text-gray-900">{formData.fullName}</h2>
                <p className="text-sm text-gray-600 font-para mt-1">
                  {formData.specialization}
                </p>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500 font-para">Employee ID</p>
                  <p className="text-sm font-semibold text-gray-900 mt-1">
                    {formData.employeeId}
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                <div className="bg-blue-50 rounded-xl p-3">
                  <p className="text-2xl font-bold text-blue-600">45</p>
                  <p className="text-xs text-gray-600 font-para mt-1">Completed</p>
                </div>
                <div className="bg-green-50 rounded-xl p-3">
                  <p className="text-2xl font-bold text-green-600">4.8</p>
                  <p className="text-xs text-gray-600 font-para mt-1">Rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Form Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md p-6 lg:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Personal Information
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Full Name
                </label>
                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00A884] focus:border-transparent font-para transition-all"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00A884] focus:border-transparent font-para transition-all"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Phone Number
                </label>
                <div className="relative">
                  <Phone
                    size={18}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00A884] focus:border-transparent font-para transition-all"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Address
                </label>
                <div className="relative">
                  <MapPin
                    size={18}
                    className="absolute left-4 top-4 text-gray-400"
                  />
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="3"
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00A884] focus:border-transparent font-para transition-all resize-none"
                    placeholder="Enter your address"
                  />
                </div>
              </div>

              {/* Join Date & Specialization */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="joinDate"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Join Date
                  </label>
                  <div className="relative">
                    <Calendar
                      size={18}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="date"
                      id="joinDate"
                      name="joinDate"
                      value={formData.joinDate}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00A884] focus:border-transparent font-para transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="specialization"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Specialization
                  </label>
                  <input
                    type="text"
                    id="specialization"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00A884] focus:border-transparent font-para transition-all"
                    placeholder="e.g., Mobile Repair Specialist"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-[#00A884] hover:bg-[#008f6f] text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Save size={20} />
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
