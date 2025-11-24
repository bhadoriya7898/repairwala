import { useEffect } from 'react'
import './App.css'
import MainLayout from './Layout/MainLayout'
import { About, Contact, Home, Services, PrivacyPolicy, TermsAndCondition, AppointmentBooking, Profile, Login, Signup, ForgotPassword } from './Pages/index.js'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AdminDashboard } from './Pages/Admin/AdminDashboard';
import { ManageEmployees } from './Pages/Admin/ManageEmployees';
import { ManageComplaints } from './Pages/Admin/ManageComplaints';
import { ManageServices } from './Pages/Admin/ManageServices';
import { ManageCustomers } from './Pages/Admin/ManageCustomers';
import { AdminReports } from './Pages/Admin/AdminReports';
// import { AdminSettings } from './Pages/Admin/AdminSettings';
import { AdminLayout } from './Pages/Admin/AdminLayout';
import { EmployeeDashboardLayout } from './Pages/EmployeeDashboard/EmployeeDashboardLayout';
import { EmployeeDashboard } from './Pages/EmployeeDashboard/EmployeeDashboard';
import { AssignedJobs } from './Pages/EmployeeDashboard/AssignedJobs';
import { WorkHistory } from './Pages/EmployeeDashboard/WorkHistory';
import { EmployeeProfile } from './Pages/EmployeeDashboard/EmployeeProfile';


function App() {

  return (
    <>
      <div>
        <ScrollToTop />
        <Routes>
          {/* Routes inside MainLayout */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/aboutus" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contactus" element={<Contact />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route path="/termsandconditions" element={<TermsAndCondition />} />
            <Route path="/profile" element={<Profile />} /></Route>

          <Route path='/appointment' element={<AppointmentBooking />} />
          {/* Routes outside MainLayout */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />

          {/* admin dashboard */}

          <Route path="/admin" element={<AdminLayout />}>
            {/* <Route path="/admin" element={<AdminLayout/>} /> */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/employees" element={<ManageEmployees />} />
            <Route path="/admin/complaints" element={<ManageComplaints />} />
            <Route path="/admin/services" element={<ManageServices />} />
            <Route path="/admin/customers" element={<ManageCustomers />} />
            <Route path="/admin/reports" element={<AdminReports />} />
            {/* <Route path="/admin/settings" element={<AdminSettings />} /> */}
          </Route>

          <Route path="employee"element={<EmployeeDashboardLayout />}>
            <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
            <Route path="/employee/jobs" element={<AssignedJobs />} />
            <Route path="/employee/history" element={<WorkHistory />} />
            <Route path="/employee/profile" element={<EmployeeProfile />} />
          </Route>

        </Routes>
      </div >
    </>
  )
}



const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to top on route change
  }, [pathname]);

  return null;
};

export default App
