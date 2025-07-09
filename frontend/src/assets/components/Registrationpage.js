import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Aparnalogin from "./Aparnalogin.jpeg";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export default function RegistrationPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    qualification: "",
    passoutYear: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [showOtherQualification, setShowOtherQualification] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "qualification") {
      setShowOtherQualification(value === "Others");
      setFormData({
        ...formData,
        qualification: value === "Others" ? "" : value,
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName || formData.firstName.length > 18 || /\d/.test(formData.firstName)) {
      newErrors.firstName = "First name must be under 18 characters and contain no numbers.";
    }
    if (!formData.lastName || formData.lastName.length > 18 || /\d/.test(formData.lastName)) {
      newErrors.lastName = "Second name must be under 18 characters and contain no numbers.";
    }
    const emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com|protonmail\.com|icloud\.com)$/;
    if (!emailPattern.test(formData.email)) {
      newErrors.email = "Allowed domains: gmail, yahoo, outlook, hotmail, protonmail, icloud.";
    }
    const phonePattern = /^\+[0-9]{12,}$/;
    if (!phonePattern.test(formData.phone)) {
      newErrors.phone = "Enter a valid international phone number (e.g., +919876543210).";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      axios
        .post("http://localhost:8001/registration", formData)
        .then(() => {
          toast.success("Registration successful");
          setFormData({
            firstName: "",
            lastName: "",
            qualification: "",
            passoutYear: "",
            email: "",
            phone: "",
          });
          setShowOtherQualification(false);
          setTimeout(() => navigate("/"), 4000);
        })
        .catch((error) => {
  if (error.response?.data?.error) {
    const newErrors = {};
    const message = error.response.data.error;

    if (message.includes("Email")) {
      newErrors.email = message;
    } else if (message.includes("Phone")) {
      newErrors.phone = message;
    } else {
      toast.error(message); 
    }

    setErrors(newErrors);
  } else {
    toast.error("Registration failed");
  }
});

    }
  };

  return (
    <div
      className="h-screen bg-cover bg-center flex items-left justify-left p-4"
      style={{ backgroundImage: `url(${Aparnalogin})` }}
    >
      <div className="w-full h-full max-w-4xl flex flex-col md:flex-row items-center justify-center gap-4">
        <div className="w-full md:w-2/3 h-full overflow-auto bg-gradient-to-br from-white via-gray-200 bg-opacity-1000 backdrop-blur-sm text-white rounded-xl p-4 md:p-10 ">
          <h2 className="text-3xl font-bold mb-1 text-black text-center">Student Registration</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="firstName" className="block text-black text-xl">First Name</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full rounded-md border px-3 py-2 text-black"
                required
              />
              {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
            </div>
            <div>
              <label htmlFor="lastName" className="block text-black text-xl">Last Name</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Second Name"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full rounded-md border px-3 py-2 text-black"
                required
              />
              {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block text-black text-xl">Email Address</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="example@gmail.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-md borderpx-3 py-2 text-black"
                required
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="phone" className="block text-black text-xl">Phone Number</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                placeholder="e.g. +919876543210"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-md border px-3 py-2 text-black"
                required
              />
              {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
            </div>
            <div>
              <label htmlFor="qualification" className="block text-black text-xl">Qualification</label>
              <select
                name="qualification"
                onChange={handleChange}
                className="w-full rounded-md border px-3 py-2 text-black"
                required
              >
                <option value="">Select Qualification</option>
                <option value="Diploma">Diploma</option>
                <option value="B.Tech">B.Tech</option>
                <option value="M.Tech">M.Tech</option>
                <option value="MBA">MBA</option>
                <option value="BCA">BCA</option>
                <option value="B.Sc">B.Sc</option>
                <option value="M.Sc">M.Sc</option>
                <option value="MCA">MCA</option>
                <option value="BBA">BBA</option>
                <option value="Others">Others</option>
              </select>
            </div>
            {showOtherQualification && (
              <input
                type="text"
                name="qualification"
                placeholder="Enter your qualification"
                value={formData.qualification}
                onChange={handleChange}
                className="w-full rounded-md border px-3 py-2 text-black"
                required
              />
            )}
            <div>
              <label htmlFor="passoutYear" className="block text-black text-xl">Passout Year</label>
              <select
                name="passoutYear"
                id="passoutYear"
                value={formData.passoutYear}
                onChange={handleChange}
                className="w-full rounded-md border px-3 py-2 text-black"
                required
              >
                <option value="">Select Passout Year</option>
                {Array.from({ length: 10 }, (_, i) => {
                  const year = new Date().getFullYear() - i;
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-400 text-xl hover:bg-blue-900 hover:text-white text-black font-semibold px-3 py-2 rounded-md"
            >
              Register
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
