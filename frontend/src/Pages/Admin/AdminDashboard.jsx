import { Users, ClipboardList, Wrench, DollarSign, TrendingUp, Award } from 'lucide-react';

export function AdminDashboard() {
  const stats = [
    {
      title: 'Total Employees',
      value: '24',
      icon: Users,
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
      bgLight: 'bg-blue-50',
      change: '+3 this month',
    },
    {
      title: 'Active Complaints',
      value: '47',
      icon: ClipboardList,
      color: 'bg-orange-500',
      textColor: 'text-orange-600',
      bgLight: 'bg-orange-50',
      change: '12 pending',
    },
    {
      title: 'Total Services',
      value: '18',
      icon: Wrench,
      color: 'bg-purple-500',
      textColor: 'text-purple-600',
      bgLight: 'bg-purple-50',
      change: '5 categories',
    },
    {
      title: 'Monthly Revenue',
      value: '₹1.2L',
      icon: DollarSign,
      color: 'bg-green-500',
      textColor: 'text-green-600',
      bgLight: 'bg-green-50',
      change: '+15% from last month',
    },
  ];

  const todayComplaints = [
    { id: 'C-1001', customer: 'Rajesh Kumar', device: 'iPhone 13', issue: 'Screen replacement', time: '10:30 AM' },
    { id: 'C-1002', customer: 'Priya Sharma', device: 'Samsung S21', issue: 'Battery issue', time: '11:15 AM' },
    { id: 'C-1003', customer: 'Amit Patel', device: 'OnePlus 9', issue: 'Water damage', time: '02:45 PM' },
  ];

  const pendingTasks = [
    { task: 'Assign technician to C-998', priority: 'High', time: '2 hours ago' },
    { task: 'Review service pricing', priority: 'Medium', time: '5 hours ago' },
    { task: 'Update inventory', priority: 'Low', time: '1 day ago' },
  ];

  const topTechnicians = [
    { name: 'Ramesh Kumar', completed: 45, rating: 4.8 },
    { name: 'Suresh Reddy', completed: 42, rating: 4.7 },
    { name: 'Vikram Singh', completed: 38, rating: 4.6 },
  ];

  const monthlyData = [
    { month: 'Jan', value: 65 },
    { month: 'Feb', value: 78 },
    { month: 'Mar', value: 82 },
    { month: 'Apr', value: 90 },
    { month: 'May', value: 85 },
    { month: 'Jun', value: 95 },
  ];

  const maxValue = Math.max(...monthlyData.map(d => d.value));

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Overview of your business operations
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.bgLight} p-3 rounded-xl`}>
                <stat.icon className={stat.textColor} size={28} />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
            <p className="text-sm text-gray-600 mt-1">{stat.title}</p>
            <p className="text-xs text-gray-500 mt-2">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Performance Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Monthly Performance</h2>
            <TrendingUp className="text-green-500" size={24} />
          </div>
          <div className="flex items-end justify-between h-64 gap-4">
            {monthlyData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-gray-100 rounded-t-lg relative" style={{ height: '100%' }}>
                  <div
                    className="absolute bottom-0 w-full bg-gradient-to-t from-[#00A884] to-[#00c49a] rounded-t-lg transition-all duration-500"
                    style={{ height: `${(data.value / maxValue) * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-600 font-medium">{data.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Technicians */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Top Technicians</h2>
            <Award className="text-yellow-500" size={24} />
          </div>
          <div className="space-y-4">
            {topTechnicians.map((tech, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#00A884] to-[#00c49a] rounded-full flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{tech.name}</p>
                    <p className="text-sm text-gray-600">{tech.completed} jobs completed</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-yellow-600">⭐ {tech.rating}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Today's Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's New Complaints */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Today's New Complaints</h2>
          <div className="space-y-3">
            {todayComplaints.map((complaint) => (
              <div key={complaint.id} className="p-4 border border-gray-200 rounded-xl hover:border-[#00A884] transition-colors">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">{complaint.id} - {complaint.customer}</p>
                    <p className="text-sm text-gray-600 mt-1">{complaint.device} - {complaint.issue}</p>
                  </div>
                  <span className="text-xs text-gray-500">{complaint.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Pending Tasks</h2>
          <div className="space-y-3">
            {pendingTasks.map((task, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-xl hover:border-[#00A884] transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{task.task}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        task.priority === 'High' ? 'bg-red-100 text-red-700' :
                        task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {task.priority}
                      </span>
                      <span className="text-xs text-gray-500">{task.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}