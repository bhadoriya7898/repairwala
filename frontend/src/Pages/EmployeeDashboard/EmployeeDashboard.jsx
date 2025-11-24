import { Briefcase, CheckCircle, Clock, TrendingUp } from 'lucide-react';

export const EmployeeDashboard = () => {
  const stats = [
    {
      title: 'Assigned Jobs',
      value: '12',
      icon: Briefcase,
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
      bgLight: 'bg-blue-50',
    },
    {
      title: 'Completed Jobs',
      value: '45',
      icon: CheckCircle,
      color: 'bg-green-500',
      textColor: 'text-green-600',
      bgLight: 'bg-green-50',
    },
    {
      title: 'Pending Jobs',
      value: '8',
      icon: Clock,
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600',
      bgLight: 'bg-yellow-50',
    },
    {
      title: 'This Month',
      value: '23',
      icon: TrendingUp,
      color: 'bg-purple-500',
      textColor: 'text-purple-600',
      bgLight: 'bg-purple-50',
    },
  ];

  const recentActivity = [
    {
      id: 1,
      customer: 'Rajesh Kumar',
      device: 'Samsung Galaxy S21',
      issue: 'Screen replacement',
      status: 'Completed',
      time: '2 hours ago',
    },
    {
      id: 2,
      customer: 'Priya Sharma',
      device: 'iPhone 13 Pro',
      issue: 'Battery replacement',
      status: 'In Progress',
      time: '4 hours ago',
    },
    {
      id: 3,
      customer: 'Amit Patel',
      device: 'OnePlus 9',
      issue: 'Water damage repair',
      status: 'Pending',
      time: '1 day ago',
    },
    {
      id: 4,
      customer: 'Sneha Reddy',
      device: 'Xiaomi Mi 11',
      issue: 'Charging port repair',
      status: 'Completed',
      time: '2 days ago',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-700';
      case 'In Progress':
        return 'bg-blue-100 text-blue-700';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 font-para mt-2">
          Welcome back! Here's your work summary
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-para">{stat.title}</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">
                  {stat.value}
                </h3>
              </div>
              <div className={`${stat.bgLight} p-3 rounded-xl`}>
                <stat.icon className={stat.textColor} size={28} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
          <span className="text-sm text-gray-500 font-para">Last 7 days</span>
        </div>

        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200 border border-gray-100"
            >
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">
                  {activity.customer}
                </h3>
                <p className="text-sm text-gray-600 font-para mt-1">
                  {activity.device} - {activity.issue}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    activity.status
                  )}`}
                >
                  {activity.status}
                </span>
                <span className="text-sm text-gray-500 font-para min-w-[100px] text-right">
                  {activity.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};