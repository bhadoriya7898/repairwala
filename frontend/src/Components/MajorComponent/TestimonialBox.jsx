import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const testimonials = [
  {
    name: "Ravi Sharma",
    role: "Customer",
    image: "https://randomuser.me/api/portraits/men/11.jpg",
    rating: 5,
    title: "Quick Refrigerator Repair",
    message: `The technician arrived quickly and diagnosed the issue instantly. 
    He repaired the fridge with proper tools, explained the problem clearly 
    and ensured everything was working smoothly. Superb professional behaviour.`,
  },
  {
    name: "Amit Singh",
    role: "AC Technician",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
    rating: 5,
    title: "Perfect AC Installation",
    message: `The AC installation was neat and clean. All pipes were sealed properly, 
    wiring hidden and cooling tested. Technician explained maintenance steps too.`,
  },
  {
    name: "Neha Patel",
    role: "Customer",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    rating: 5,
    title: "Microwave Heating Issue Fixed",
    message: `Microwave stopped heating. Technician identified the coil issue and repaired 
    it quickly. Honest pricing and smooth service experience.`,
  },
  {
    name: "Priya Verma",
    role: "Customer",
    image: "https://randomuser.me/api/portraits/women/21.jpg",
    rating: 5,
    title: "Washing Machine Repair",
    message: `Drum alignment and noise issue fixed within 45 minutes. Technician was very polite 
    and experienced. Great service quality.`,
  },
  {
    name: "Harsh Mehta",
    role: "Customer",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
    rating: 4,
    title: "TV Wall Mounting",
    message: `Perfectly leveled installation. Clean and professional work. Wires hidden behind stand 
    just like showroom style.`,
  },
  {
    name: "Nisha Chauhan",
    role: "Customer",
    image: "https://randomuser.me/api/portraits/women/36.jpg",
    rating: 5,
    title: "RO Servicing",
    message: `Filters cleaned, tank flushed, TDS checked. Water taste improved instantly. 
    Very thorough work.`,
  },
];

const StarRating = ({ rating }) => (
  <div className="flex text-[18px]">
    {Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className={i < rating ? "text-orange-400" : "text-gray-300"}>
        ★
      </span>
    ))}
  </div>
);

// 3D TILT FUNCTION
const handleTilt = (e) => {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;

  const rotateX = (-y / 20).toFixed(2);
  const rotateY = (x / 20).toFixed(2);

  card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.08)`;
};

const resetTilt = (e) => {
  const card = e.currentTarget;
  card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
};

const TestimonialCard = ({ item, active }) => (
  <div
    onMouseMove={active ? handleTilt : undefined}
    onMouseLeave={active ? resetTilt : undefined}
    className={`
      bg-white rounded-3xl p-6 sm:p-8 mx-auto flex flex-col
      w-[280px] sm:w-[300px] md:w-[320px] lg:w-[340px]
      h-[380px] sm:h-[430px]
      shadow-[0_20px_40px_rgba(0,0,0,0.12)]
      transition-all duration-500
      transform-gpu
      ${active ? "scale-110 z-20" : "scale-85 opacity-50 blur-[1px] z-0"}
    `}
    style={{
      transformStyle: "preserve-3d",
      perspective: "1000px",
    }}
  >
    {/* Header */}
    <div className="flex items-center gap-3">
      <img src={item.image} className="w-12 h-12 rounded-full object-cover" />
      <div>
        <h3 className="font-heading font-bold text-[17px]">{item.name}</h3>
        <p className="font-para text-gray-500 text-[13px]">{item.role}</p>
      </div>
      <div className="ml-auto">
        <StarRating rating={item.rating} />
      </div>
    </div>

    {/* Title */}
    <h2 className="font-heading font-semibold text-[18px] text-center mt-5 mb-4">
      {item.title}
    </h2>

    {/* Message */}
    <p className="font-para text-gray-600 text-[14px] leading-6 text-center">
      {item.message}
    </p>
  </div>
);

const TestimonialBox = () => (
  <section className="py-20 w-full overflow-x-hidden">
    <h1 className="text-center font-heading font-bold text-[32px] mb-12 text-primary-text">
      What Our Clients Say About Us
    </h1>

    <Swiper
      slidesPerView={1.1}
      centeredSlides={true}
      spaceBetween={20}
      autoplay={{ delay: 2600, disableOnInteraction: false }}
      breakpoints={{
        640: { slidesPerView: 1.2 },
        768: { slidesPerView: 2.2 },
        1024: { slidesPerView: 3.1 },
        1280: { slidesPerView: 3.3 },
      }}
      modules={[Autoplay]}
      className="w-full"
    >
      {testimonials.map((t, i) => (
        <SwiperSlide key={i}>
          {({ isActive }) => <TestimonialCard item={t} active={isActive} />}
        </SwiperSlide>
      ))}
    </Swiper>
  </section>
);

export default TestimonialBox;
