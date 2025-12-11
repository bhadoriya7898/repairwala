// src/Pages/Employee/EmployeeDashboard.jsx

import { useEffect, useState } from "react";
import { Briefcase, CheckCircle, Clock, TrendingUp } from "lucide-react";
import toast from "react-hot-toast";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export const EmployeeDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  // FIX: Dashboard now uses userId (not employeeId)
  const employeeId = localStorage.getItem("userId");

  if (!employeeId) {
    return (
      <p className="text-center text-red-600 font-semibold mt-10">
        No userId found. Please login again.
      </p>
    );
  }

  /* ------------------------- FETCH DASHBOARD DATA ------------------------ */
  const fetchDashboard = async () => {
    try {
      setLoading(true);

      // fetch stats
      const statsRes = await fetch(
        `${API_BASE}/api/employee/dashboard/stats/${employeeId}`
      );
      const statsData = await statsRes.json();

      // fetch recent activity
      const recentRes = await fetch(
        `${API_BASE}/api/employee/dashboard/recent/${employeeId}`
      );
      const recentData = await recentRes.json();

      if (!statsData.success) {
        toast.error("Failed to load stats");
      } else {
        setStats(statsData.data);
      }

      if (!recentData.success) {
        toast.error("Failed to load recent activity");
      } else {
        setRecent(recentData.data);
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error loading dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  /* ------------------------- STATUS BADGE COLORS ------------------------ */
  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "In Progress":
        return "bg-blue-100 text-blue-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  /* ------------------------- LOADING UI ------------------------ */
  if (loading) {
    return (
      <div className="p-6 text-center text-gray-600 animate-pulse">
        Loading dashboard...
      </div>
    );
  }

  /* ------------------------- PAGE UI ------------------------ */
  return (
    <div className="space-y-8 p-2 sm:p-4">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-2">
          Welcome back! Here’s your recent work summary.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Assigned Jobs",
            value: stats?.assigned || 0,
            icon: Briefcase,
            bg: "bg-blue-50",
            text: "text-blue-600",
          },
          {
            title: "Completed Jobs",
            value: stats?.completed || 0,
            icon: CheckCircle,
            bg: "bg-green-50",
            text: "text-green-600",
          },
          {
            title: "Pending Jobs",
            value: stats?.pending || 0,
            icon: Clock,
            bg: "bg-yellow-50",
            text: "text-yellow-600",
          },
          {
            title: "This Month",
            value: stats?.thisMonth || 0,
            icon: TrendingUp,
            bg: "bg-purple-50",
            text: "text-purple-600",
          },
        ].map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow p-6 flex justify-between items-center hover:shadow-md transition"
          >
            <div>
              <p className="text-sm text-gray-500">{card.title}</p>
              <h3 className="text-3xl font-bold mt-1">{card.value}</h3>
            </div>
            <div className={`${card.bg} p-3 rounded-xl`}>
              <card.icon size={30} className={card.text} />
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Recent Activity</h2>
          <span className="text-sm text-gray-500">Last 7 days</span>
        </div>

        {recent.length === 0 ? (
          <p className="text-gray-500">No recent activity found.</p>
        ) : (
          <div className="space-y-4">
            {recent.map((item) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 border rounded-xl hover:bg-gray-50"
              >
                <div>
                  <h3 className="font-semibold">{item.customer}</h3>
                  <p className="text-sm text-gray-600">
                    {item.brand} {item.model} — {item.message}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                  <span className="text-sm text-gray-500">{item.timeAgo}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeDashboard;
