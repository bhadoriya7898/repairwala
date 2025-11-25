import React, { use, useState } from "react";
import { CategoriesDivBanner, logo, MobileNavBanner } from "../../assets/Images/index.js";
import Button from "../MinorComponent/Button";
import { categories, mobileNavItems, navItems } from "../../utils/Home.utils";
import { Link, NavLink } from "react-router-dom";
import { User, AlignLeft, ShoppingCart } from 'lucide-react';
import { refrigerators } from "../../assets/Images/Categories/index.js";

const Header = () => {

    const [sideNav, setSideNav] = useState(false)
    const [cart, setCart] = useState(false)
    const [browseCategories, setBrowseCategories] = useState(false)

    return (
        <>


            {/* Header For Mobile Screen */}
            <div className="flex md:hidden items-center justify-between py-2  px-4  ">
                <div className="relative"><span onClick={() => setSideNav(!sideNav)}><AlignLeft /></span>
                    {sideNav &&
                        <div className=" left-0 top-0 w-[298px] h-screen bg-[#FFFF] shadow-lg z-50 fixed rounded-br-2xl rounded-tr-2xl ">
                            <div>
                                <div className="flex flex-col">
                                    <div className="flex justify-end">
                                        <span className="cursor-pointer p-4" onClick={() => setSideNav(!sideNav)} >X</span>
                                    </div>
                                    <div className="w-full flex items-center justify-center ">
                                        <span className="flex items-center justify-center rounded-full size-[90px] border-4 border-green-400">
                                            <img src={logo} alt="Profile Image" className="h-full w-full rounded-full " />
                                        </span>
                                    </div>
                                    <div className="flex flex-col items-center justify-center">
                                        <h1>Hudson Alvarez</h1>
                                        <h3>demo@minimals.cc</h3>
                                    </div>
                                </div>
                                <div className="flex flex-col py-[22px] px-[18px] gap-2">
                                    {mobileNavItems.map((item) => (
                                        <NavLink to={item.path} className="flex items-center w-full flex-row gap-[15px] cursor-pointer">
                                            <span><item.icon /></span>
                                            <h1>{item.name}</h1>
                                        </NavLink>
                                    ))}



                                </div>
                                <div className="w-full p-4 rounded-[15px]">
                                    <img src={MobileNavBanner} alt="Mobile Nav Banner " />
                                </div>

                            </div>

                            <div className="p-4"><button className="w-full py-3 rounded-br-3xl bg-red-50 text-red-600 font-bold hover:bg-red-100 transition">
                                Logout
                            </button></div>
                        </div>
                    }
                </div>
                <Link to={"/"}>
                    <img src={logo} alt="Logo" className="w-38 h-auto cursor-pointer" />
                </Link>
                {/* <div>
                    <span className="flex flex-row gap-4">
                        <span className="cursor-pointer"><User /></span>
                        <span className="cursor-pointer" onClick={() => setCart(!cart)}><ShoppingCart /></span>
                    </span>

                </div> */}
            </div>






            {/* // Header For DeskTop Screen  */}
            <div className="w-full hidden md:block">
                {/* Top Bar */}

                <div className="flex items-center justify-center bg-primary text-white py-2 text-sm ">
                    Welcome to Repairwala.com
                </div>
                {/* Header Content */}
                <div className="px-6 py-4 flex flex-col gap-4 bg-white shadow-md ">

                    {/* Logo Row */}
                    <div className="flex items-center justify-between border-b-1 py-2">
                        <Link to={"/"}>
                            <img src={logo} alt="Logo" className="w-38 h-auto" />
                        </Link>

                        <div className="flex flex-row ">
                            <span className="flex flex-row border-1  rounded-xl p-2 mx-2 text-[14px] font-para font-medium ">
                                <select className="pr-2 border-0 focus:outline-none" id="category" name="category">
                                    <option value="mobile">All Category</option>
                                    <option value="ac">AC Repair</option>
                                    <option value="plumbing">Plumbing</option>
                                    <option value="electrical">Electrical</option>
                                </select>
                                <input className="pl-1 border-l-1 focus:border-0 focus:outline-none" placeholder="Search for products.." />

                            </span>
                            <Button >Search</Button>
                        </div>
                        {/* {left div} */}
                        {/* <div className="flex items-center justify-center gap-4">
                            <div className="flex flex-row items-center gap-2">
                                <Link to={'/profile'}><User /></Link>
                                {<Link to={'/login'}>
                                    <h1 className="text-[14px] font-para font-light ">Sign in <br />
                                        <span className="text-[16px] font-para font-semibold "> User Account</span>
                                    </h1>
                                </Link>}

                            </div>
                            <span className="cursor-pointer" onClick={() => setCart(!cart)}><ShoppingCart /></span>
                        </div> */}

                    </div>



                    {/* Navigation Row */}
                    <div className="flex items-center justify-between flex-wrap gap-4 border-b-1 py-2 ">


                        <div className="flex justify-center items-center text-[14px]">
                            <Button onClick={()=>setBrowseCategories(!browseCategories)} className="text-[14px] font-para font-normal relative"> <AlignLeft /> Browse All Categories</Button>


                            {/* Categories Div When User CLick on Browse All Categories */}
                            {browseCategories &&
                                <div className="hidden md:flex flex-col  p-[10px]  absolute top-48 left-10 w-[268px]  rounded-[20px] bg-white gap-[4px] z-40">
                                    <div className="flex flex-col gap-[4px]">
                                        {categories.map((categorie) => (
                                            <Link className="hover:bg-accent h-[44px] w-[248px] flex items-center rounded-xl" to={'/'}>{categorie.name}</Link>
                                        ))}

                                    </div>
                                    <div className="w-[248px] h-[203px] rounded-[20px]">
                                        <img src={CategoriesDivBanner} alt="CategoriesDivBanner" className="w-[248px] h-[203px]" />
                                    </div>
                                </div>

                            }




                            <nav className="flex gap-6 text-secondary text-sm px-6 font-medium ">
                                {navItems.map((item) => (
                                    <NavLink
                                        key={item.name}
                                        to={item.path}
                                        className={({ isActive }) =>
                                            isActive
                                                ? "text-primary font-semibold border-b-2 border-primary"
                                                : "hover:text-primary"
                                        }
                                    >
                                        {item.name}
                                    </NavLink>
                                ))}
                            </nav>
                        </div>

                        <div className="flex flex-row gap-4 items-center text-[12px] font-para font-bold ">
                            <Link to={'/appointment'}>Book Appointment</Link>
                            <Link to={'/login'}><Button className="font-bold">Login Employee DashBoard</Button></Link>
                            {/* <Button 
      className="font-bold" 
      onClick={() => navigate('/appointment')}
    >
      Login Employee DashBoard
    </Button> */}
                        </div>

                    </div>

                </div>

            </div>




            {/* Cart Where User Products display */}

            {cart &&
                <div className=" right-0 top-0 w-[298px] h-screen bg-[#FFFF] shadow-lg z-50 fixed rounded-bl-2xl rounded-tl-2xl  flex flex-col justify-between p-2">
                    {/* upper div of Cart        that include hading and cart items                 */}
                    <div className="w-full gap-[34px] flex flex-col ">
                        <div className="flex flex-row justify-between w-full">
                            <span>Appliances Repair cart </span>
                            <span className="cursor-pointer " onClick={() => setCart(!cart)}>Close X</span>
                        </div>

                        <div className="flex flex-col gap-[15px]">
                            <Link className="flex flex-row items-center gap-[10px] p-[7px]">
                                <img src={refrigerators} className="size-[40px] rounded-sm" alt="cart Image" />
                                <span>
                                    <h1>Refrigrator</h1>
                                    <h3>13-11-25</h3>
                                </span>
                            </Link>
                            <Link className="flex flex-row items-center gap-[10px] p-[7px]">
                                <img src={refrigerators} className="size-[40px] rounded-sm" alt="cart Image" />
                                <span>
                                    <h1>Refrigrator</h1>
                                    <h3>13-11-25</h3>
                                </span>
                            </Link>

                        </div>
                    </div>
                    <div className="p-4 flex flex-col w-full gap-[8px] ">
                        <Button className="bg-transparent +++  w-full max-w-none text-center justify-center">View Cart</Button>
                        <Button className=" w-full max-w-none justify-center">CheckOut</Button>

                    </div>
                </div>
            }








            <div>

            </div>

        </>
    );
};

export default Header;
