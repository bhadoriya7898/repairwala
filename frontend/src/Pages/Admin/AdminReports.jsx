import { TrendingUp, DollarSign, CheckCircle, XCircle, PieChart } from 'lucide-react';

export function AdminReports() {
  const monthlyStats = [
    { month: 'Jan', revenue: 85000, completed: 45, cancelled: 3 },
    { month: 'Feb', revenue: 92000, completed: 52, cancelled: 2 },
    { month: 'Mar', revenue: 98000, completed: 58, cancelled: 4 },
    { month: 'Apr', revenue: 105000, completed: 62, cancelled: 3 },
    { month: 'May', revenue: 112000, completed: 68, cancelled: 5 },
    { month: 'Jun', revenue: 120000, completed: 75, cancelled: 2 },
  ];

  const categoryBreakdown = [
    { category: 'Screen Replacement', count: 145, percentage: 35 },
    { category: 'Battery Replacement', count: 98, percentage: 24 },
    { category: 'Water Damage', count: 67, percentage: 16 },
    { category: 'Charging Port', count: 54, percentage: 13 },
    { category: 'Others', count: 50, percentage: 12 },
  ];

  const maxRevenue = Math.max(...monthlyStats.map(s => s.revenue));
  const totalRevenue = monthlyStats.reduce((sum, s) => sum + s.revenue, 0);
  const totalCompleted = monthlyStats.reduce((sum, s) => sum + s.completed, 0);
  const totalCancelled = monthlyStats.reduce((sum, s) => sum + s.cancelled, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
        <p className="text-gray-600 mt-2">Business performance and insights</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 p-3 rounded-xl">
              <DollarSign className="text-green-600" size={28} />
            </div>
            <TrendingUp className="text-green-500" size={20} />
          </div>
          <h3 className="text-3xl font-bold text-gray-900">₹{(totalRevenue / 1000).toFixed(0)}K</h3>
          <p className="text-sm text-gray-600 mt-1">Total Revenue</p>
          <p className="text-xs text-green-600 mt-2">+18% from last period</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-xl">
              <CheckCircle className="text-blue-600" size={28} />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-gray-900">{totalCompleted}</h3>
          <p className="text-sm text-gray-600 mt-1">Completed Jobs</p>
          <p className="text-xs text-blue-600 mt-2">Last 6 months</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-red-100 p-3 rounded-xl">
              <XCircle className="text-red-600" size={28} />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-gray-900">{totalCancelled}</h3>
          <p className="text-sm text-gray-600 mt-1">Cancelled Jobs</p>
          <p className="text-xs text-red-600 mt-2">Last 6 months</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-100 p-3 rounded-xl">
              <PieChart className="text-purple-600" size={28} />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-gray-900">96%</h3>
          <p className="text-sm text-gray-600 mt-1">Success Rate</p>
          <p className="text-xs text-purple-600 mt-2">Excellent performance</p>
        </div>
      </div>

      {/* Monthly Revenue Chart */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Monthly Revenue Trend</h2>
        <div className="flex items-end justify-between h-80 gap-4">
          {monthlyStats.map((stat, index) => (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full bg-gray-100 rounded-t-lg relative" style={{ height: '100%' }}>
                <div
                  className="absolute bottom-0 w-full bg-gradient-to-t from-[#00A884] to-[#00c49a] rounded-t-lg transition-all duration-500 hover:opacity-80 cursor-pointer group"
                  style={{ height: `${(stat.revenue / maxRevenue) * 100}%` }}
                >
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    ₹{(stat.revenue / 1000).toFixed(0)}K
                  </div>
                </div>
              </div>
              <span className="text-sm text-gray-600 font-medium">{stat.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Jobs Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Completed vs Cancelled */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Jobs Performance</h2>
          <div className="space-y-4">
            {monthlyStats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{stat.month}</span>
                  <span className="text-gray-900 font-medium">
                    {stat.completed} completed / {stat.cancelled} cancelled
                  </span>
                </div>
                <div className="flex gap-1 h-3 rounded-full overflow-hidden bg-gray-100">
                  <div
                    className="bg-green-500"
                    style={{ width: `${(stat.completed / (stat.completed + stat.cancelled)) * 100}%` }}
                  ></div>
                  <div
                    className="bg-red-500"
                    style={{ width: `${(stat.cancelled / (stat.completed + stat.cancelled)) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Category-wise Breakdown</h2>
          <div className="space-y-4">
            {categoryBreakdown.map((cat, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-900 font-medium">{cat.category}</span>
                  <span className="text-gray-600">{cat.count} jobs ({cat.percentage}%)</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#00A884] to-[#00c49a] rounded-full transition-all duration-500"
                    style={{ width: `${cat.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Details Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Monthly Details</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Month</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Revenue</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Completed</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Cancelled</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Success Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {monthlyStats.map((stat, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{stat.month}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">₹{stat.revenue.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-green-600 font-medium">{stat.completed}</td>
                  <td className="px-6 py-4 text-sm text-red-600 font-medium">{stat.cancelled}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      {((stat.completed / (stat.completed + stat.cancelled)) * 100).toFixed(1)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}