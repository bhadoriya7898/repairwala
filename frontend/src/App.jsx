import { useEffect } from 'react'
import './App.css'
import MainLayout from './Layout/MainLayout'
import {
  About, Contact, Home, Services,
  PrivacyPolicy, TermsAndCondition, AppointmentBooking,
  Profile, Login, Signup, ForgotPassword
} from './Pages/index.js'
import { Routes, Route, useLocation } from 'react-router-dom'
import CompleteProfile from "./Pages/CompleteProfile";
import { AdminDashboard } from './Pages/Admin/AdminDashboard';
import { ManageEmployees } from './Pages/Admin/ManageEmployees';
import { ManageComplaints } from './Pages/Admin/ManageComplaints';
import { ManageServices } from './Pages/Admin/ManageServices';
import { ManageCustomers } from './Pages/Admin/ManageCustomers';
import { Toaster } from "react-hot-toast";
import Categories from "./Pages/Admin/Categories";
import Brand from "./Pages/Admin/Brand";

import { AdminLayout } from './Pages/Admin/AdminLayout';

import { EmployeeDashboardLayout } from './Pages/EmployeeDashboard/EmployeeDashboardLayout';
import { EmployeeDashboard } from './Pages/EmployeeDashboard/EmployeeDashboard';
import { AssignedJobs } from './Pages/EmployeeDashboard/AssignedJobs';
import { WorkHistory } from './Pages/EmployeeDashboard/WorkHistory';
import { EmployeeProfile } from './Pages/EmployeeDashboard/EmployeeProfile';

import ProtectedRoute from './ProtectedRoute';


function App() {

  return (
    <>
      <div>
         <Toaster position="top-center" reverseOrder={false} />
        <ScrollToTop />

        <Routes>

          {/* Public Routes inside MainLayout */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/aboutus" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contactus" element={<Contact />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route path="/termsandconditions" element={<TermsAndCondition />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* Public Routes */}
          <Route path="/appointment" element={<AppointmentBooking />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/complete-profile" element={<CompleteProfile />} />


          {/* ADMIN ROUTES (Protected) */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="employees" element={<ManageEmployees />} />
            <Route path="complaints" element={<ManageComplaints />} />
            <Route path="services" element={<ManageServices />} />
            <Route path="customers" element={<ManageCustomers />} />
            <Route path="categories" element={<Categories />} />
            <Route path="brands" element={<Brand />} />
          </Route>


          {/* EMPLOYEE ROUTES (Protected) */}
          <Route
            path="/employee"
            element={
              <ProtectedRoute role="employee">
                <EmployeeDashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<EmployeeDashboard />} />
            <Route path="dashboard" element={<EmployeeDashboard />} />
            <Route path="jobs" element={<AssignedJobs />} />
            <Route path="history" element={<WorkHistory />} />
            <Route path="profile" element={<EmployeeProfile />} />
          </Route>

        </Routes>
      </div>
    </>
  )
}


const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default App;
