import { CheckCircle, Phone, MapPin, Smartphone, Calendar } from 'lucide-react';

export const WorkHistory = () => {
  const completedJobs = [
    {
      id: 1,
      customerName: 'Rajesh Kumar',
      phone: '+91 98765 43210',
      address: '123, MG Road, Bangalore, Karnataka - 560001',
      device: 'Samsung Galaxy S21',
      issue: 'Screen replacement needed. Display is cracked.',
      assignedDate: '2025-01-15 10:30 AM',
      resolvedDate: '2025-01-16 03:45 PM',
    },
    {
      id: 2,
      customerName: 'Sneha Reddy',
      phone: '+91 65432 10987',
      address: '321, Indiranagar, Bangalore, Karnataka - 560038',
      device: 'Xiaomi Mi 11',
      issue: 'Charging port not working. Cable keeps disconnecting.',
      assignedDate: '2025-01-14 02:30 PM',
      resolvedDate: '2025-01-15 05:20 PM',
    },
    {
      id: 3,
      customerName: 'Vikram Singh',
      phone: '+91 54321 09876',
      address: '567, Whitefield, Bangalore, Karnataka - 560066',
      device: 'Realme GT',
      issue: 'Camera not working properly. Rear camera shows black screen.',
      assignedDate: '2025-01-13 11:00 AM',
      resolvedDate: '2025-01-14 01:30 PM',
    },
    {
      id: 4,
      customerName: 'Ananya Iyer',
      phone: '+91 43210 98765',
      address: '890, HSR Layout, Bangalore, Karnataka - 560102',
      device: 'Vivo V21',
      issue: 'Software update issue. Phone stuck in boot loop.',
      assignedDate: '2025-01-12 09:45 AM',
      resolvedDate: '2025-01-12 04:15 PM',
    },
    {
      id: 5,
      customerName: 'Karthik Menon',
      phone: '+91 32109 87654',
      address: '234, Electronic City, Bangalore, Karnataka - 560100',
      device: 'Oppo Reno 6',
      issue: 'Speaker not working. No sound during calls.',
      assignedDate: '2025-01-11 03:20 PM',
      resolvedDate: '2025-01-12 11:00 AM',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Work History</h1>
          <p className="text-gray-600 font-para mt-2">
            View all your completed repair jobs
          </p>
        </div>
        <div className="bg-green-100 px-6 py-3 rounded-xl border border-green-200">
          <p className="text-sm text-green-600 font-para">Total Completed</p>
          <p className="text-2xl font-bold text-green-700">{completedJobs.length}</p>
        </div>
      </div>

      {/* Completed Jobs Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Customer Details
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Device & Issue
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Timeline
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {completedJobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <p className="font-semibold text-gray-900">{job.customerName}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-600 font-para">
                        <Phone size={14} />
                        <span>{job.phone}</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm text-gray-600 font-para">
                        <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                        <span className="line-clamp-2">{job.address}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Smartphone size={16} className="text-gray-500" />
                        <p className="font-semibold text-gray-900">{job.device}</p>
                      </div>
                      <p className="text-sm text-gray-600 font-para line-clamp-2">
                        {job.issue}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar size={14} className="text-blue-500" />
                        <div>
                          <p className="text-xs text-gray-500 font-para">Assigned</p>
                          <p className="text-gray-900 font-para">{job.assignedDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle size={14} className="text-green-500" />
                        <div>
                          <p className="text-xs text-gray-500 font-para">Resolved</p>
                          <p className="text-gray-900 font-para">{job.resolvedDate}</p>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 px-3 py-2 bg-green-100 text-green-700 rounded-full border border-green-200 w-fit">
                      <CheckCircle size={16} />
                      <span className="text-sm font-semibold">Completed</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden divide-y divide-gray-200">
          {completedJobs.map((job) => (
            <div key={job.id} className="p-6 space-y-4">
              {/* Customer Info */}
              <div>
                <h3 className="font-bold text-gray-900 text-lg">{job.customerName}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600 font-para mt-2">
                  <Phone size={14} />
                  <span>{job.phone}</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-600 font-para mt-1">
                  <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                  <span>{job.address}</span>
                </div>
              </div>

              {/* Device & Issue */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Smartphone size={16} className="text-gray-500" />
                  <p className="font-semibold text-gray-900">{job.device}</p>
                </div>
                <p className="text-sm text-gray-600 font-para">{job.issue}</p>
              </div>

              {/* Timeline */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-50 rounded-xl p-3 border border-blue-100">
                  <p className="text-xs text-blue-600 font-para mb-1">Assigned</p>
                  <p className="text-sm text-gray-900 font-para">{job.assignedDate}</p>
                </div>
                <div className="bg-green-50 rounded-xl p-3 border border-green-100">
                  <p className="text-xs text-green-600 font-para mb-1">Resolved</p>
                  <p className="text-sm text-gray-900 font-para">{job.resolvedDate}</p>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center gap-2 px-3 py-2 bg-green-100 text-green-700 rounded-full border border-green-200 w-fit">
                <CheckCircle size={16} />
                <span className="text-sm font-semibold">Completed</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};