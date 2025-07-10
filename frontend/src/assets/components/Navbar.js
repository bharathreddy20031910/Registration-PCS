import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import Lottie from 'lottie-react';

import Planningbackground from './Planningbackground.json';
import Executingbackground from './Executingbackground.json';
import Investingbackground from './Investingbackground.json';

import kolkottaImg from './kolkotta.png';
import bangloreImg from './bengaluru.png';
import noidaImg from './noida.png';
import careerImg from './image.png';
import groupImage from './group-image.jpeg';
import lapimg from './lapimg.jpg';

import './Style.css';

const HomePage = () => {
  const navigate = useNavigate();
  const navRef = useRef();
  const cardRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(null);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const showNavbar = () => {
    navRef.current.classList.toggle('responsive_nav');
    setIsNavOpen(!isNavOpen);
  };

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const locations = [
    { city: 'Kolkotta', img: kolkottaImg },
    { city: 'Bengaluru', img: bangloreImg },
    { city: 'Noida', img: noidaImg },
  ];

  const faqData = [
    {
      question: 'How do I register?',
      answer: "Visit the NATS official website, click on 'Student', and follow the sign-up instructions. You'll need your email, phone number, and qualification details.",
    },
    {
      question: 'Which locations are available?',
      answer: 'We have training and placement tie-ups in Bangalore, Kolkata, and Noida. More cities are coming soon.',
    },
    {
      question: 'What details are needed?',
      answer: 'You need to provide your full name, qualification, year of passout, phone number with country code, and a valid email ID.',
    },
    {
      question: 'Can I modify my details later?',
      answer: 'Yes. You can edit your profile information after logging in, except your email ID. Contact support for sensitive updates.',
    },
  ];

  return (
    <>
      <div className="reddy">
        <h2>CONTACT : 6362568172 | MAIL : hr@pcsgpl.com</h2>
      </div>

      <div className="nav flex items-center justify-between p-4 bg-blue-900 shadow-md sticky top-0 z-50">
        <h3>
          <img
            src="https://www.pcsglobal.in/assets/images/Logo%20Pcs%20global.jpg"
            alt="PCS Global Logo"
            width="170"
            className="object-contain"
          />
        </h3>

        <nav ref={navRef} className="hidden md:flex gap-8 items-center">
          <button onClick={() => navigate('/about')} className="text-blue-800 font-semibold hover:text-blue-300 cursor-pointer bg-transparent border-none">ABOUT</button>
          <button onClick={() => navigate('/contactus')} className="text-blue-800 font-semibold hover:text-blue-600 cursor-pointer bg-transparent border-none">CONTACT US</button>
        </nav>

        <div className="md:hidden flex items-center gap-2">
          <button className="nav-btn" onClick={showNavbar}>
            {isNavOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      <div id="card-area" ref={cardRef}>
        <div className="wrapper">
          <div className="box-area">
            {locations.map((location, index) => (
              <div className="box" key={index}>
                <img src={location.img} alt={location.city} />
                <div className="overlay">
                  <h4 className='text-white text-3xl'>{location.city}</h4>
                  <button className="yyy" onClick={() => navigate('/registration')}>Register</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container-fluid bg-gradient-to-r from-blue-50 via-white to-slate-100 py-12">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-blue-900 leading-tight mb-8">
            Start Career With Zero Money · Grow with Customer Money · Scale with MNC Money
            <span className="block text-blue-600 mt-4 text-2xl md:text-3xl">
              Alok Halder (Founder and CEO)
            </span>
          </h1>
          <h2 className="text-2xl md:text-5xl font-semibold text-gray-700 mb-10">
            Convert your career from NON-IT to IT
          </h2>
          <div className="flex justify-center">
            <img src={careerImg} alt="Career" className="max-w-sm md:max-w-lg rounded-lg shadow-lg border border-blue-100" />
          </div>
        </div>
        <h6 className="text-center text-blue-800 font-bold mt-12 text-xl md:text-3xl tracking-wide">
          WHY TO CHOOSE PCS...?
        </h6>
      </div>

      <div className="animation-section">
        <div className="animation-item">
          <div className="animation-lottie">
            <Lottie animationData={Planningbackground} />
          </div>
          <h1>PLANNING</h1>
        </div>
        <div className="animation-item">
          <div className="animation-lottie">
            <Lottie animationData={Investingbackground} />
          </div>
          <h1>INVESTING</h1>
        </div>
        <div className="animation-item">
          <div className="animation-lottie">
            <Lottie animationData={Executingbackground} />
          </div>
          <h1>EXECUTING</h1>
        </div>
      </div>

      <div className="bg-gray-50 py-16 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto text-center mb-14">
          <h2 className="text-4xl sm:text-5xl font-semibold text-gray-800 mb-4">Effortless Registration Process</h2>
          <p className="text-lg sm:text-2xl text-gray-600">Find answers to your registration queries quickly.</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {faqData.map((item, index) => (
            <div key={index} className="border-b pb-5 hover:bg-white px-4 rounded-md transition-shadow shadow-sm hover:shadow-md">
              <div className="flex justify-between items-center cursor-pointer" onClick={() => toggle(index)}>
                <span className="text-xl sm:text-2xl font-medium text-gray-800">{item.question}</span>
                <span className={`text-base sm:text-lg text-gray-600 flex items-center gap-1 transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : 'rotate-90'}`}>⌄</span>
              </div>
              {openIndex === index && (
                <div className="mt-4 p-4 bg-white text-gray-700 rounded-md text-base sm:text-lg border border-gray-200">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center" style={{ backgroundImage: `url(${lapimg})` }}>
        <div className="bg-white bg-opacity-95 rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden w-full max-w-6xl min-h-[520px]">
          <div className="md:w-1/2">
            <img src={groupImage} alt="Students group" className="object-cover w-full h-full" />
          </div>
          <div className="p-8 md:w-1/2 flex flex-col justify-center">
            <h2 className="text-3xl font-semibold mb-4">Begin your educational adventure</h2>
            <ul className="space-y-4 text-gray-700 mb-6">
              <li className="flex items-start space-x-2">
                <span className="text-xl">↠</span>
                <span>Select your city: Bangalore, Kolkata, or Noida.<br />_________________________________________________</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-xl">↠</span>
                <span>Quick and easy registration process.<br />_________________________________________________</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-xl">↠</span>
                <span>Start with just a click.<br />_________________________________________________</span>
              </li>
            </ul>
            <button onClick={() => scrollToSection(cardRef)} className="bg-indigo-500 hover:bg-indigo-600 text-white py-3 px-8 ml-7 text-xl rounded-md w-fit">
              Register now
            </button>
          </div>
        </div>
      </div>

      <div className="footer">
        <div className="box1">
          <h4>Solutions</h4>
          <p>
            IT Management<br />
            Cyber Security<br />
            Cloud Computing<br />
            IT Consulting<br />
            Software Dev<br />
            IT Support
          </p>
        </div>
        <div className="box1">
          <h4>Hire Dedicated Developers From PCS</h4>
          <p>
            Hire AngularJS Developers<br />
            Hire ReactJS Developers<br />
            Hire Java Developers<br />
            Hire Python Developers<br />
            Hire React Native Developers<br />
            Hire MEAN Stack Developers
          </p>
        </div>
        <div className="box1">
          <h4>Resources</h4>
          <p>
            Pricing and plans<br />
            Terms of Service<br />
            Help & FAQ<br />
            Site map<br />
            Legal Team
          </p>
        </div>
      </div>
    </>
  );
};

export default HomePage;