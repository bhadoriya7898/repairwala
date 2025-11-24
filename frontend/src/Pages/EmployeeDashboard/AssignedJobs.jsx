import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Phone, 
  MapPin, 
  Smartphone,
  Calendar
} from 'lucide-react';

export const AssignedJobs = () => {
  const jobs = [
    {
      id: 1,
      customerName: 'Rajesh Kumar',
      phone: '+91 98765 43210',
      address: '123, MG Road, Bangalore, Karnataka - 560001',
      device: 'Samsung Galaxy S21',
      issue: 'Screen replacement needed. Display is cracked and touch is not responding properly.',
      assignedDate: '2025-01-15 10:30 AM',
      resolvedDate: '2025-01-16 03:45 PM',
      status: 'Completed',
      timeline: {
        assigned: '2025-01-15 10:30 AM',
        started: '2025-01-15 02:00 PM',
        resolved: '2025-01-16 03:45 PM',
      },
    },
    {
      id: 2,
      customerName: 'Priya Sharma',
      phone: '+91 87654 32109',
      address: '456, Brigade Road, Bangalore, Karnataka - 560025',
      device: 'iPhone 13 Pro',
      issue: 'Battery draining very fast. Phone shuts down at 30% battery.',
      assignedDate: '2025-01-16 09:15 AM',
      resolvedDate: null,
      status: 'In Progress',
      timeline: {
        assigned: '2025-01-16 09:15 AM',
        started: '2025-01-16 11:30 AM',
        resolved: null,
      },
    },
    {
      id: 3,
      customerName: 'Amit Patel',
      phone: '+91 76543 21098',
      address: '789, Koramangala, Bangalore, Karnataka - 560034',
      device: 'OnePlus 9',
      issue: 'Water damage. Phone fell in water and not turning on.',
      assignedDate: '2025-01-17 08:00 AM',
      resolvedDate: null,
      status: 'Pending',
      timeline: {
        assigned: '2025-01-17 08:00 AM',
        started: null,
        resolved: null,
      },
    },
    {
      id: 4,
      customerName: 'Sneha Reddy',
      phone: '+91 65432 10987',
      address: '321, Indiranagar, Bangalore, Karnataka - 560038',
      device: 'Xiaomi Mi 11',
      issue: 'Charging port not working. Cable keeps disconnecting.',
      assignedDate: '2025-01-14 02:30 PM',
      resolvedDate: null,
      status: 'In Progress',
      timeline: {
        assigned: '2025-01-14 02:30 PM',
        started: '2025-01-15 10:00 AM',
        resolved: null,
      },
    },
  ];

  const getStatusConfig = (status) => {
    switch (status) {
      case 'Completed':
        return {
          icon: CheckCircle,
          color: 'bg-green-100 text-green-700 border-green-200',
          iconColor: 'text-green-600',
        };
      case 'In Progress':
        return {
          icon: Clock,
          color: 'bg-blue-100 text-blue-700 border-blue-200',
          iconColor: 'text-blue-600',
        };
      case 'Pending':
        return {
          icon: AlertCircle,
          color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
          iconColor: 'text-yellow-600',
        };
      default:
        return {
          icon: AlertCircle,
          color: 'bg-gray-100 text-gray-700 border-gray-200',
          iconColor: 'text-gray-600',
        };
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Assigned Jobs</h1>
        <p className="text-gray-600 font-para mt-2">
          Manage and track your assigned repair jobs
        </p>
      </div>

      {/* Jobs List */}
      <div className="space-y-6">
        {jobs.map((job) => {
          const statusConfig = getStatusConfig(job.status);
          const StatusIcon = statusConfig.icon;

          return (
            <div
              key={job.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden"
            >
              {/* Job Header */}
              <div className="bg-gradient-to-r from-[#00A884] to-[#00c49a] p-6 text-white">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">{job.customerName}</h2>
                    <div className="flex items-center gap-2 mt-2">
                      <Phone size={16} />
                      <span className="font-para">{job.phone}</span>
                    </div>
                  </div>
                  <div
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 ${statusConfig.color} bg-white`}
                  >
                    <StatusIcon size={18} className={statusConfig.iconColor} />
                    <span className="font-semibold">{job.status}</span>
                  </div>
                </div>
              </div>

              {/* Job Details */}
              <div className="p-6 space-y-6">
                {/* Address */}
                <div className="flex items-start gap-3">
                  <MapPin size={20} className="text-gray-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 font-para">Address</p>
                    <p className="text-gray-900 font-para mt-1">{job.address}</p>
                  </div>
                </div>

                {/* Device */}
                <div className="flex items-start gap-3">
                  <Smartphone size={20} className="text-gray-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 font-para">Device</p>
                    <p className="text-gray-900 font-semibold mt-1">{job.device}</p>
                  </div>
                </div>

                {/* Issue Description */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-gray-500 font-para mb-2">Issue Description</p>
                  <p className="text-gray-900 font-para leading-relaxed">{job.issue}</p>
                </div>

                {/* Timeline */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Calendar size={20} className="text-[#00A884]" />
                    Complaint Timeline
                  </h3>
                  <div className="space-y-4">
                    {/* Assigned */}
                    <div className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 rounded-full bg-[#00A884]"></div>
                        <div className="w-0.5 h-full bg-gray-300 mt-1"></div>
                      </div>
                      <div className="flex-1 pb-4">
                        <p className="font-semibold text-gray-900">Assigned</p>
                        <p className="text-sm text-gray-600 font-para mt-1">
                          {job.timeline.assigned}
                        </p>
                      </div>
                    </div>

                    {/* Work Started */}
                    <div className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            job.timeline.started ? 'bg-blue-500' : 'bg-gray-300'
                          }`}
                        ></div>
                        {job.timeline.resolved && (
                          <div className="w-0.5 h-full bg-gray-300 mt-1"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <p className="font-semibold text-gray-900">Work Started</p>
                        <p className="text-sm text-gray-600 font-para mt-1">
                          {job.timeline.started || 'Not started yet'}
                        </p>
                      </div>
                    </div>

                    {/* Resolved */}
                    <div className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            job.timeline.resolved ? 'bg-green-500' : 'bg-gray-300'
                          }`}
                        ></div>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">Resolved</p>
                        <p className="text-sm text-gray-600 font-para mt-1">
                          {job.timeline.resolved || 'Pending resolution'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                    <p className="text-sm text-blue-600 font-para mb-1">Assigned Date</p>
                    <p className="text-gray-900 font-semibold">{job.assignedDate}</p>
                  </div>
                  <div
                    className={`rounded-xl p-4 border ${
                      job.resolvedDate
                        ? 'bg-green-50 border-green-100'
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <p
                      className={`text-sm font-para mb-1 ${
                        job.resolvedDate ? 'text-green-600' : 'text-gray-500'
                      }`}
                    >
                      Resolved Date
                    </p>
                    <p className="text-gray-900 font-semibold">
                      {job.resolvedDate || 'Not resolved yet'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};