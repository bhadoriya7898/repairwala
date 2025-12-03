import { FiShield, FiUser, FiBookOpen, FiFileText, FiLock, FiSettings } from "react-icons/fi";

const navItems = [
    {
        name: "Home",
        path: "/"
    },
    {
        name: "About Us",
        path: "aboutus"
    },
    {
        name: "Services",
        path: "services"
    },
    {
        name: "Contact Us",
        path: "/contactus"
    },
];

const mobileNavItems = [
    {
        icon: FiShield,
        name: "Home",
        path: "/"
    },
    {
        icon: FiUser,
        name: "About Us",
        path: "aboutus"
    },
    {
        icon: FiBookOpen,
        name: "Services",
        path: "services"
    },
    {
        icon: FiFileText,
        name: "Contact Us",
        path: "/contactus"
    },
    {
        icon: FiLock,
        name: "Book Appointment",
        path: "/"
    },
    {
        icon: FiSettings,
        name: "Login Employee Dashboard",
        path: "/"
    }
];

export { navItems, mobileNavItems };
