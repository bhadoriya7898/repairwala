import { Link, Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  Wrench,
  UserCircle,
  FileText,
  LogOut,
  Menu,
  X,
  Layers3,
  Tags,
} from "lucide-react";
import { useState } from "react";

/* ---------------- Navigation Items (Optimized) ---------------- */

const navItems = [
  { path: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/admin/employees", icon: Users, label: "Employees" },
  { path: "/admin/complaints", icon: ClipboardList, label: "Complaints" },
  { path: "/admin/services", icon: Wrench, label: "Services" },
  { path: "/admin/customers", icon: UserCircle, label: "Customers" },
  { path: "/admin/categories", icon: Layers3, label: "Categories" },
  { path: "/admin/brands", icon: Tags, label: "Brands" },
];

/* ---------------- Sidebar Item Component ---------------- */

function SidebarItem({ path, icon: Icon, label }) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
          isActive
            ? "bg-[#00A884] text-white shadow-md"
            : "text-gray-700 hover:bg-gray-100"
        }`
      }
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </NavLink>
  );
}

/* ---------------- Main Layout Component ---------------- */

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => navigate("/");

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">

            {/* Mobile Toggle Button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
               <Link to={"/"}>
             <img
              src="/src/assets/Images/Logo.png"
              alt="RepairWala Logo"
              className="h-10 w-auto"
            />
            </Link>
          
          </div>

          <span className="text-sm text-gray-600 hidden sm:block">
            Welcome, Admin
          </span>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 
          transition-transform duration-300 ease-in-out lg:translate-x-0 flex flex-col`}
        >
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navItems.map((item) => (
              <SidebarItem key={item.path} {...item} />
            ))}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl 
              text-red-600 hover:bg-red-50 transition-all duration-200"
            >
              <LogOut size={20} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4 px-6">
        <div className="text-center text-sm text-gray-600">
          © 2025 RepairWala Admin Panel. All rights reserved.
        </div>
      </footer>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
