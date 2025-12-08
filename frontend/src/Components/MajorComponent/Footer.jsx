import React from "react";
import FrezzerBanner from "../MinorComponent/FrezzerBanner";
import footerBanner from '../../assets/Images/FooterBanner.png'
import Button from "../MinorComponent/Button";
import logo from "../../assets/Images/Logo.png";
import footerBg from "../../assets/Images/FooterBg.png"
import { ArrowUp, Instagram } from "lucide-react";
import SocialMediaBox from "../MinorComponent/SocialIconsBox"; 
import {Link, NavLink, useNavigate} from "react-router-dom"

const Footer = () => {
    const navigate = useNavigate()
    return (
        <footer className="flex flex-col items-center h-auto w-full px-4">

            {/* Fotter Banner Div */}
            <FrezzerBanner banner={footerBanner} >
                <div className="h-full flex items-center justify-center gap-[70px] flex-col">
                    <h1 className="text-[32px] font-heading font-medium">Having a problem? We’ll fixed it today!</h1>
                    <p className="text-para font-para font-semibold ">Please feel free to contact us. We’re super happy to talk to you.</p>
                    <Button onClick={()=>navigate('/contactus')}>Contact us Now</Button>
                </div>
            </FrezzerBanner>


            {/* Main Footer with Major Footer and Term and Conditions also */}
            <div className="flex flex-col w-full pt-10 gap-8.5" style={{backgeoundImage:`url(${footerBg})`}}>

                {/* {Main Footer With Major Components} */}
                <div className="flex  justify-between w-full flex-col md:flex-row gap-12 ">
                    {/* Left Side Div Of Footer Main */}
                    <div className="flex flex-col gap-8.5 text-para font-para font-semibold text-primary-text">
                        <img className="max-w-[213px]" src={logo} alt="Logo" />
                        <span>
                            Monday – Friday: 9 AM – 7 PM<br />
                            Saturday: 10 AM – 5 PM
                        </span>
                        <span className="flex flex-row">
                            <SocialMediaBox />
                        </span>
                    </div>

                    {/* Center Side Div Of Footer Main */}
                    <div className="flex flex-col md:flex-row gap-5 md:gap-20">

                        <div className="flex flex-col gap-5">
                            <span className="text-para font-para font-semibold text-primary-text">Navigation</span>
                            <span className="flex flex-col gap-4 text-[14px] font-para font-medium text-secondary">
                                
                                <NavLink to={"/"} >Home</NavLink>
                                <NavLink to={"/aboutus"} >About</NavLink>
                                <NavLink to={"/services"} >Service</NavLink>
                                <NavLink to={"/contactus"} >Contact Us</NavLink>
                            </span>
                        </div>
                        <div className="flex flex-col gap-5 ">
                            <span className="text-para font-para font-semibold text-primary-text">Services</span>
                            <span  className="flex flex-col gap-4 text-[14px] font-para font-medium text-secondary ">
                                <h1>Refrigerators </h1>
                                <h1>Air Conditioners </h1>
                                <h1>Window Air Conditioners </h1>
                                <h1>Water Purifiers </h1>
                                <h1>Microwave Ovens </h1>
                                <h1>Television </h1>
                            </span>
                        </div>
                        <div className="flex flex-col gap-5 ">
                            <span className="text-para font-para font-semibold text-primary-text">Contact us</span>
                            <span className="flex flex-col gap-4 text-[14px] font-para font-medium text-secondary">
                                <h1>+1(135)658-9856</h1>
                                <h1>hello@example.com</h1>
                            </span>
                        </div>
                    </div>

                    {/* Right Side Div Of Footer Main */}
                     <Link to={'/login'}><Button className="font-bold">For Employee</Button></Link>
                    
                    <div>
                        <Button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Back to top <ArrowUp/></Button>
                    </div>


                </div>
               
                {/* Foooter Below Div Of Terms And Conditions */}
                <div className="w-full flex flex-col gap-5 md:flex-row justify-between py-5 border-t-1 border-accent text-[14px] font-para font-medium text-primary-text">
                    <Link to={'termsandconditions'}>Terms and conditions</Link>
                    <span>© Electrician. All Rights Reserved. Licensing</span>
                    <Link to={'privacypolicy'}>Privacy policy</Link>

                </div>

            </div>




        </footer>

    )
}

export default Footer