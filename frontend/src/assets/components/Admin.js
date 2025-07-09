import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ username: '', password: '' });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = (e) => {
    e.preventDefault();
    if (form.username === 'admin' && form.password === 'Admin@123') {
      setIsLoggedIn(true);
      navigate('/calendar'); 
    } else {
      alert('Invalid credentials');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center  bg-gradient-to-br from-slate-600 via-slate-700">
        <div className="w-full max-w-3xl h-full bg-gradient-to-br from-white via-blue-400 bg-opacity-90 rounded-xl shadow-lg p-10">
          <h2 className="text-5xl font-bold text-center text-indigo-600 mb-10">
            Admin Login
          </h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-700 text-3xl font-semibold">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                className="w-full px-3 py-5 my-4 border text-2xl border-gray-300  rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-3xl font-semibold">
                Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-3 py-5 my-4 border text-2xl border-gray-300 rounded-md"
                required
              />
              <div className="mt-2">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                  className="mr-1 text-xl"
                />
                <label className="text-xl  text-gray-600 ">Show Password</label>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-5 px-4 rounded-md text-3xl hover:bg-indigo-500 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }


  return null;
};

export default Admin;
