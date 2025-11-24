import React from "react";
import Button from "../Components/MinorComponent/Button";
import { categories } from "../utils/Home.utils.jsx";
import { logo } from "../assets/Images/index.js";
import { s1banner1, s1Sidebanner1, s1Sidebanner2, s2banner1, s3banner1, s5banner1, s5banner2, s5banner3, s5banner4, s5banner5, s6banner1 } from "../assets/Images/Hero/index.js";
import ServiceCard from "../Components/MajorComponent/ServiceCard.jsx";
import RequestCallbackForm from "../Components/MajorComponent/RequestCallBackForm.jsx";
import TestimonialBox from "../Components/MajorComponent/TestimonialBox.jsx";
import FrezzerBanner from "../Components/MinorComponent/FrezzerBanner.jsx";
import { useNavigate } from "react-router-dom";



const Home = () => {

    const navigate = useNavigate()

    return (
        <>
            {/* Section one that includes Main Home Page Banners and Categories below */}
            <section className="h-auto flex  justify-center  flex-col gap-10 ">

                {/* Main Banners Main Div */}
                <div className="flex flex-col md:flex-row  w-full  gap-5">

                    {/* Main Banner Sub Div Bannner 1 */}
                    <div className="flex p-4 text-white flex-col gap-[15px] w-full flex-wrap  md:w-[60%] h-[273px] md:h-[446px] bg-cover bg-no-repeat bg-center rounded-2xl" style={{ backgroundImage: `url(${s1banner1})` }} >
                        <h1 className="font-heading font-medium text-[26px]">We Bring Your <br />
                            Home Appliances Back to Life
                        </h1>
                        <p className="font-para font-light text-para ">We are Committed to Provide you a <br /> Safe Service Experience</p>
                    </div>

                    {/* Main Banner Sub Div 2  */}
                    <div className="flex flex-col w-full md:w-[40%] gap-y-2.5  md:h-[446px]">
                        {/* Sub div 2 Banner 1 */}
                        <div className="flex flex-col justify-between w-full h[185px] bg-cover bg-center rounded-2xl text-white p-4 md:h-1/2 " style={{ backgroundImage: `url(${s1Sidebanner1})` }}>
                            <p className="pb-4 font-para font-light text-[14px]">Your Local Appliance Repair Service Expert</p>
                            <h1 className="pb-4 font-bold text-[24px] ">Skilled, Affordable Service <br />
                            on Your Schedule
                            </h1>
                            <Button onClick={()=>navigate('/appointment')}>Book Appointment</Button>
                        </div>
                        {/* sub Div2 Banner 2 */}
                        <div
                            className="w-full bg-cover bg-center rounded-2xl text-white p-4 h-[185px] md:h-1/2 relative"
                            style={{ backgroundImage: `url(${s1Sidebanner2})` }}
                        >
                            <p className="absolute bottom-4 font-para font-medium text-para">
                                Home Appliances <br />
                                Repair & Installation Services <br />
                                in Indore
                            </p>
                        </div>

                    </div>

                </div>

                {/* Categories Div in Section 1 Below Banner Div */}
                <div className="flex items-center lg:justify-center gap-x-12 h-60 w-full overflow-x-auto overflow-y-hidden  scrollbar-hide">

                    {/* Categories List under Catergories div */}
                    {categories.map((categorie, idx) => (
                        <div
                            key={idx}
                            className="flex-shrink-0 flex flex-col items-center w-36 h-52 border-2 border-accent border-solid"
                        >
                            <span className="w-full h-[70%] flex justify-center items-center">
                                <img className="max-h-full object-contain" src={categorie.image} alt={categorie.name} />
                            </span>
                            <span className="bg-accent w-full h-[30%] flex justify-center items-center text-center text-[16px] font-heading font-normal text-black">
                                {categorie.name}
                            </span>
                        </div>
                    ))}

                </div>

            </section >

            {/* Section 2 Of Home Page includes Communications details and Banner */}
            <section className="flex  gap-y-2.5  w-full h-auto my-20 flex-col">

                {/*  Communication details div */}

                <div className=" w-full flex itesms-center justify-between md:h-auto flex-col md:flex-row gap-8 " >

                    <div className="flex items-center md:items-start justify-between flex-row md:flex-col w-full md:w-auto gap-4">
                        <span><h1 className="font-heading font-bold text-[28px] text-primary-text">The key to a long lasting <br />
                            relationship is <b>communication</b></h1>
                            <h1 className="font-normal font-heading text-para text-primary-text">Multiple ways to reach us.</h1>
                        </span>
                        <Button onClick={()=>navigate("/appointment")} className="" >Book Now</Button>
                    </div>

                    <div className=" flex justify-between items-end flex-col  gap-y-2.5 flex-wrap font-heading font-normal text-[16px] ">

                        <div className="flex gap-2.5">
                            <span className="bg-accent px-7.5 py-2.5 rounded-xl border-1 border-accent">Helpline number: 1800 266 1880 </span>
                            <span className=" px-7.5 py-2.5 rounded-xl border-1 border-accent">Email: service.in@bosch-home.com</span>
                        </div>

                        <div className="flex gap-2.5">
                            <span className=" px-7.5 py-2.5 rounded-xl border-1 border-accent">Chat with us via WhatsApp: +918451000555</span>
                            <span className="bg-accent px-7.5 py-2.5 rounded-xl border-1 border-accent">Book appointment online </span>
                        </div>

                        <div className="flex gap-2.5">
                            <span className=" px-7.5 py-2.5 rounded-xl border-1 border-accent">SMS Service: Please send an SMS to 9133711006 by typing- BSH "Your Pincode".  </span>

                        </div>
                    </div>
                </div>

                {/* Banner div Under communication div */}

                <div className="w-full h-91.5 rounded-2xl relative bg-cover bg-center" style={{ backgroundImage: `url(${s2banner1})` }}>
                    <img className="w-42.5 h-10 left-7.5 top-7.5 absolute" src={logo} />
                </div>


            </section>

            {/* Section 3 of Home Page */}
            <section className="flex items-center justify-center w-full h-auto ">
                <div className="flex items-center justify-center h-auto rounded-2xl w-full bg-cover bg-center text-white p-6" style={{ backgroundImage: `url(${s3banner1})` }}>


                    <FrezzerBanner banner={s3banner1} insideBoxCss={"sm:4 md:p-6"}>
                        <h1 className="font-heading font-medium text-heading">Repair Wala Services Process</h1>
                        <div className="flex items-start gap-5 justify-between flex-col md:flex-row w-full ">
                            <div className="flex flex-col gap-y-3.5 text-start">
                                <h1 className="font-bold font-heading text-[36px]">01</h1>
                                <h1 className="font-medium font-heading text-[24px]" >Book your appointment</h1>
                                <p className="font-normal font-para text-para ">Contact us via phone or online to<br />
                                    schedule your Repair service.
                                </p>
                            </div>

                            <div className="flex flex-col gap-y-3.5 text-start">
                                <h1 className="font-bold font-heading text-[36px]">02</h1>
                                <h1 className="font-medium font-heading text-[24px]">Inspection & service</h1>
                                <p className="font-normal font-para text-para ">Our certified technicians will <br />
                                    arrive on time to inspect your <br />
                                    system.
                                </p>
                            </div>

                            <div className="flex flex-col gap-y-3.5 text-start">
                                <h1 className="font-bold font-heading text-[36px]">03</h1>
                                <h1 className="font-medium font-heading text-[24px]">Follow-up & support</h1>
                                <p className="font-normal font-para text-para ">We provide follow-up support <br />
                                    and ongoing maintenance <br />
                                    options.
                                </p>
                            </div>

                        </div>
                    </FrezzerBanner>

                </div>
            </section>

            {/* Section 4 Of Home Page include services and its cards */}

            <section className="flex items-center">
                <ServiceCard />
            </section>

            {/* Section 5 On Home page below Services Section */}

            <section className="flex items-center justify-center w-full md:h-[498px] my-5">
                {/* main div */}
                <div className="flex items-center   h-full flex-col md:flex-row  w-full gap-18 ">
                    {/* image  div */}
                    <div className=" flex gap-6 h-full w-full md:w-1/2 flex-row">
                        <div className="w-1/2 h-full">
                            <img className="w-full h-full" src={s5banner1} alt="Banner 1" />
                        </div>
                        <div className="w-1/2  h-full flex gap-6 flex-col ">
                            <img className="h-1/2" src={s5banner2} alt="Banner 2" />
                            <img className="h-1/2" src={s5banner3} alt="Banner 3" />
                        </div>

                    </div>

                    {/* text div */}
                    <div className="w-full md:w-[539px] flex gap-[69px] h-full flex-col justify-between">

                        <div className="flex justify-between h-full gap-[30px] flex-col">

                            <div className="flex gap-[15px] flex-col">
                                <h1 className="font-para font-semibold text-primary-text text-[28px] ">A Worthy Appliances Repair Company</h1>
                                <p className="font-para font-normal text-primary-text text-para">Our expert Appliances Repair are available 24/7 to fix any
                                    Appliances issue,Whether it’s repairing a leak, unclogging a drain, or
                                    servicing your water heater. We Guarantee accurate service on the
                                    initial visit. </p>
                            </div>

                            <div className="flex border-1 border-accent rounded-2xl p-5 flex-col gap-[30px] text-primary-text">
                                <div className="flex flex-row gap-8">
                                    <img src={s5banner4} alt="s5banner4" />
                                    <span className="flex flex-col gap-1.5">
                                        <h1 className="font-para font-semibold text-para">Satisfaction Guaranteed</h1>
                                        <p className="font-normal font-para text-[14px] ">Our team of experienced repair is prepared to<br />
                                            tackle a variety of appliances repair problem</p>
                                    </span>
                                </div>

                                <div className="flex flex-row gap-8">
                                    <img src={s5banner5} alt="s5banner5" />
                                    <span className="flex flex-col gap-1.5">
                                        <h1 className="font-para font-semibold text-para">Trusted and Reliable</h1>
                                        <p className="font-normal font-para text-[14px] ">Our team of experienced repair is prepared to <br />
                                            tackle a variety of appliances repair problem</p>
                                    </span>
                                </div>




                            </div>

                            <div>
                                <Button  onClick={()=>navigate("/services")}>View Services</Button>
                            </div>

                        </div>

                    </div>


                </div>
            </section>

            {/* Section 6  */}
            <section className="flex items-center flex-col justify-center w-full my-20 gap-10" >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-6 md:gap-[50px]">
                    {/* Title */}
                    <div className="  leading-tight text-primary-text text-[42px] font-para font-semibold ">
                        <div className="block md:hidden">RepairWala Partner Program</div>
                        <div className="hidden md:block">
                            <div>RepairWala</div>
                            <div>Partner Program</div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="text-sm md:max-w-2xl text-primary-text font-para text-[14px]">
                        We are excited to invite you to join our trusted partner as a Repairwala Technician.
                        This opportunity offers hands-on experience with a wide range of household appliances,
                        working alongside a skilled and supportive team. If you have a passion for troubleshooting,
                        a commitment to quality service, and a desire to grow in the field of appliance repair,
                        this is the perfect role for you. Join us in delivering reliable repair solutions and exceptional customer satisfaction.
                    </div>

                    {/* Button */}
                    <div className="w-full md:w-auto">
                        <Button>
                            Join Our Partners
                        </Button>
                    </div>
                </div>

                {/* Image Div */}
                {/* <div className="" style={{ backgroundImage: `url(${s6banner1})` }}>

                </div> */}
                <img className="w-full h-[366px]  " src={s6banner1} alt="s6banner1" />

            </section>


            {/*Section 7 Request Call Back Form Section */}
            <section className="flex w-full my-20">
                <RequestCallbackForm />
            </section>


            {/* Section 8 What our client Says About Us (Client Testimonials) */}

            <section className="flex items-center justify-center my-10 flex-col ">
                    {/* <h1>What Our Clients Say About Us</h1> */}
                    <div className="w-full flex overflow-x-scroll">
                        <TestimonialBox/>
                    </div>
            
            </section>



        </>
    )
}

export default Home