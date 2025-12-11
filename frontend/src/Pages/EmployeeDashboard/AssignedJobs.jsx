import {
  CheckCircle,
  Clock,
  AlertCircle,
  Phone,
  MapPin,
  Smartphone,
  Calendar,
} from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const AssignedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE = "http://localhost:5000";

  /* --------------------------------------------
     FETCH ASSIGNED JOBS FOR LOGGED-IN EMPLOYEE
  ---------------------------------------------*/
  const loadJobs = async () => {
    try {
      const employeeId = localStorage.getItem("userId");

      if (!employeeId) {
        toast.error("No employeeId found. Please login.");
        return;
      }

    const res = await fetch(
  `${API_BASE}/api/employee/dashboard/assigned-jobs/${employeeId}`
);

      const result = await res.json();

      if (result.success) {
        setJobs(result.data);
      } else {
        toast.error(result.message || "Failed to load assigned jobs");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error while loading assigned jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  /* --------------------------------------------
     UPDATE JOB STATUS (Pending → In Progress → Completed)
  ---------------------------------------------*/
  const updateStatus = async (jobId, newStatus) => {
    try {
    const res = await fetch(
  `${API_BASE}/api/employee/dashboard/assigned-jobs/update/${jobId}`,
  {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: newStatus }),
  }
);


      const result = await res.json();

      if (result.success) {
        toast.success("Status updated successfully!");

        // Update UI without reload
        setJobs((prev) =>
          prev.map((j) => (j._id === jobId ? result.data : j))
        );
      } else {
        toast.error(result.message || "Failed to update status");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error updating job status");
    }
  };

  /* --------------------------------------------
     STATUS UI CONFIG
  ---------------------------------------------*/
  const getStatusConfig = (status) => {
    switch (status) {
      case "Completed":
        return {
          icon: CheckCircle,
          color: "bg-green-100 text-green-700 border-green-200",
          iconColor: "text-green-600",
        };
      case "In Progress":
        return {
          icon: Clock,
          color: "bg-blue-100 text-blue-700 border-blue-200",
          iconColor: "text-blue-600",
        };
      case "Pending":
        return {
          icon: AlertCircle,
          color: "bg-yellow-100 text-yellow-700 border-yellow-200",
          iconColor: "text-yellow-600",
        };
      default:
        return {
          icon: AlertCircle,
          color: "bg-gray-100 text-gray-700 border-gray-200",
          iconColor: "text-gray-600",
        };
    }
  };

  if (loading)
    return <div className="text-center py-10 text-gray-600">Loading jobs...</div>;

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
        {jobs.length === 0 && (
          <p className="text-center text-gray-500">No jobs assigned yet.</p>
        )}

        {jobs.map((job) => {
          const statusConfig = getStatusConfig(job.status);
          const StatusIcon = statusConfig.icon;

          return (
            <div
              key={job._id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden"
            >
              {/* Job Header */}
              <div className="bg-gradient-to-r from-[#00A884] to-[#00c49a] p-6 text-white">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">
                      {job.firstname} {job.lastname}
                    </h2>
                    <div className="flex items-center gap-2 mt-2">
                      <Phone size={16} />
                      <span className="font-para">{job.phonenumber}</span>
                    </div>
                  </div>

                  {/* Status Badge */}
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
                    <p className="text-gray-900 font-para mt-1">
                      {`${job.stress || ""} ${job.stress2 || ""}, ${job.city || ""}, ${job.state || ""} - ${job.Postel || ""}`}
                    </p>
                  </div>
                </div>

                {/* Device */}
                <div className="flex items-start gap-3">
                  <Smartphone size={20} className="text-gray-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 font-para">Device</p>
                    <p className="text-gray-900 font-semibold mt-1">
                      {job.brand} {job.model}
                    </p>
                  </div>
                </div>

                {/* Issue Description */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-gray-500 font-para mb-2">
                    Issue Description
                  </p>
                  <p className="text-gray-900 font-para leading-relaxed">
                    {job.message}
                  </p>
                </div>

                {/* Status Action Buttons */}
                <div className="flex gap-4 mt-6">
                  {job.status === "Pending" && (
                    <button
                      onClick={() => updateStatus(job._id, "In Progress")}
                      className="bg-blue-600 text-white px-5 py-2 rounded-xl"
                    >
                      Start Job
                    </button>
                  )}

                  {job.status === "In Progress" && (
                    <button
                      onClick={() => updateStatus(job._id, "Completed")}
                      className="bg-green-600 text-white px-5 py-2 rounded-xl"
                    >
                      Mark Completed
                    </button>
                  )}
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
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">Assigned</p>
                        <p className="text-sm text-gray-600 font-para mt-1">
                          {new Date(job.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* Started */}
                    <div className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            job.timeline?.started ? "bg-blue-500" : "bg-gray-300"
                          }`}
                        ></div>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">Work Started</p>
                        <p className="text-sm text-gray-600 font-para mt-1">
                          {job.timeline?.started
                            ? new Date(job.timeline.started).toLocaleString()
                            : "Not started yet"}
                        </p>
                      </div>
                    </div>

                    {/* Resolved */}
                    <div className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            job.timeline?.resolved ? "bg-green-500" : "bg-gray-300"
                          }`}
                        ></div>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">Resolved</p>
                        <p className="text-sm text-gray-600 font-para mt-1">
                          {job.timeline?.resolved
                            ? new Date(job.timeline.resolved).toLocaleString()
                            : "Pending resolution"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                    <p className="text-sm text-blue-600 font-para mb-1">
                      Assigned Date
                    </p>
                    <p className="text-gray-900 font-semibold">
                      {new Date(job.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div
                    className={`rounded-xl p-4 border ${
                      job.timeline?.resolved
                        ? "bg-green-50 border-green-100"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <p
                      className={`text-sm font-para mb-1 ${
                        job.timeline?.resolved
                          ? "text-green-600"
                          : "text-gray-500"
                      }`}
                    >
                      Resolved Date
                    </p>
                    <p className="text-gray-900 font-semibold">
                      {job.timeline?.resolved
                        ? new Date(job.timeline.resolved).toLocaleString()
                        : "Not resolved yet"}
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
