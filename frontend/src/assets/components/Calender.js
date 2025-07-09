import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const Calendar = () => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    { name: 'January', days: 31 },
    { name: 'February', days: 28 },
    { name: 'March', days: 31 },
    { name: 'April', days: 30 },
    { name: 'May', days: 31 },
    { name: 'June', days: 30 },
    { name: 'July', days: 31 },
    { name: 'August', days: 31 },
    { name: 'September', days: 30 },
    { name: 'October', days: 31 },
    { name: 'November', days: 30 },
    { name: 'December', days: 31 },
  ];
  const years = Array.from({ length: 50 }, (_, i) => 1999 + i);

  const today = new Date();
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    handleDateClick(today.getDate(), today.getMonth(), today.getFullYear());
  }, []);

  const isLeapYear = (year) =>
    (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

  const getDaysInMonth = (monthIndex, year) => {
    if (monthIndex === 1) return isLeapYear(year) ? 29 : 28;
    return months[monthIndex].days;
  };

  const handleMonthChange = (e) => {
    setSelectedMonthIndex(parseInt(e.target.value));
    setSelectedDay(null);
    setRegistrations([]);
  };

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
    setSelectedDay(null);
    setRegistrations([]);
  };

  const handleDateClick = async (day, month = selectedMonthIndex, year = selectedYear) => {
    setSelectedDay(day);
    setSelectedMonthIndex(month);
    setSelectedYear(year);
    setCurrentPage(1);
    await fetchRegistrationsForDate(day, month, year);
  };

  const fetchRegistrationsForDate = async (day, month, year) => {
    const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8001/registration', {
        params: { date: formattedDate },
      });
      setRegistrations(response.data);
    } catch (error) {
      console.error('Error fetching registrations:', error);
      setRegistrations([]);
    } finally {
      setLoading(false);
    }
  };

  const getStartDay = (year, monthIndex) => {
    const date = new Date(year, monthIndex, 1);
    return date.getDay();
  };

  const renderCalendarGrid = () => {
    const cells = [];
    const startDay = getStartDay(selectedYear, selectedMonthIndex);
    const totalDays = getDaysInMonth(selectedMonthIndex, selectedYear);

    for (let i = 0; i < startDay; i++) {
      cells.push(
        <div key={`empty-${i}`} className="p-4 border bg-gray-100 rounded-md"></div>
      );
    }

    for (let day = 1; day <= totalDays; day++) {
      const isToday =
        day === today.getDate() &&
        selectedMonthIndex === today.getMonth() &&
        selectedYear === today.getFullYear();

      cells.push(
        <motion.div
          key={day}
          onClick={() => handleDateClick(day)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          layout
          className={`p-4 border text-center cursor-pointer rounded-md transition-all duration-300 ease-in-out
            ${selectedDay === day ? 'bg-blue-600 text-white font-bold shadow-lg' : 'hover:bg-blue-100'}
            ${isToday ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
          `}
        >
          {day}
        </motion.div>
      );
    }

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={`${selectedMonthIndex}-${selectedYear}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-7 gap-1"
        >
          {cells}
        </motion.div>
      </AnimatePresence>
    );
  };

  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentRegistrations = registrations.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(registrations.length / rowsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-500  to-blue-200 py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
       
        <div className="col-span-1 bg-gradient-to-br from-white  backdrop-blur-lg p-6 rounded-xl shadow-xl border border-blue-900">
          <h1 className="text-3xl font-bold text-center text-black mb-4">📅 Calendar</h1>

          <div className="flex justify-center mb-4">
            <button
              onClick={() => handleDateClick(today.getDate(), today.getMonth(), today.getFullYear())}
              className="bg-slate-900 hover:bg-gray-300 hover:text-black text-white text-xl px-4 py-2 rounded-full shadow transition duration-300 transform hover:scale-105"
            >
             Today
            </button>
          </div>

          <div className="flex flex-col gap-4 mb-4">
            <div>
              <label className="text-black font-medium mr-2">Month:</label>
              <select
                value={selectedMonthIndex}
                onChange={handleMonthChange}
                className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
              >
                {months.map((month, index) => (
                  <option key={month.name} value={index}>{month.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-black font-medium mr-2">Year:</label>
              <select
                value={selectedYear}
                onChange={handleYearChange}
                className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
              >
                {years.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-7 text-center font-bold text-blue-700 bg-blue-100 rounded-t-md">
            {daysOfWeek.map((day) => (
              <div key={day} className="p-2 border">{day}</div>
            ))}
          </div>

          <div className="bg-white rounded-b-md border border-blue-100">
            {renderCalendarGrid()}
          </div>
        </div>

        
        <div className="col-span-2 bg-gradient-to-br from-white via-slate-100  backdrop-blur-md p-6 rounded-xl shadow-xl border border-blue-200 overflow-x-auto">
          <h2 className="text-3xl font-bold text-center text-black mb-4">📝 Registrations</h2>

          {selectedDay ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedDay}-${selectedMonthIndex}-${selectedYear}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center text-blue-600 font-medium mb-3 text-lg">
                  {months[selectedMonthIndex].name} {selectedDay}, {selectedYear}
                </div>

                {loading ? (
                  <p className="text-center text-blue-500">Loading...</p>
                ) : (
                  <>
                    <p className="text-center text-xl text-gray-700 mb-3">
                      Total Registrations: <span className="font-semibold">{registrations.length}</span>
                    </p>

                    {registrations.length > 0 ? (
                      <>
                        <table className="w-full text-sm border-collapse border border-blue-200 rounded overflow-hidden">
                          <thead className="bg-blue-100 text-blue-800">
                            <tr>
                              <th className="border px-4 py-2 text-left">Name</th>
                              <th className="border px-4 py-2 text-left">Email</th>
                              <th className="border px-4 py-2 text-left">Qualification</th>
                              <th className="border px-4 py-2 text-left">Passout Year</th>
                               <th className="border px-4 py-2 text-left">Phone</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentRegistrations.map((reg) => (
                              <tr key={reg._id} className="hover:bg-blue-50">
                                <td className="border px-4 py-2">{reg.firstName}<span> </span>
                                  {reg.lastName}
                                </td>
                                <td className="border px-4 py-2">{reg.email}</td>
                                <td className="border px-4 py-2">{reg.qualification}</td>
                                <td className="border px-4 py-2">{reg.passoutYear}</td>
                                <td className="border px-4 py-2">{reg.phone}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                        {totalPages > 1 && (
                          <div className="flex justify-center gap-2 mt-4 flex-wrap">
                            <button
                              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                              disabled={currentPage === 1}
                              className="px-3 py-1 bg-blue-200 text-blue-800 rounded disabled:opacity-50"
                            >
                              ◀ Prev
                            </button>

                            {Array.from({ length: totalPages }, (_, i) => (
                              <button
                                key={i + 1}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`px-3 py-1 rounded ${
                                  currentPage === i + 1
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-blue-100 text-blue-800'
                                }`}
                              >
                                {i + 1}
                              </button>
                            ))}

                            <button
                              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                              disabled={currentPage === totalPages}
                              className="px-3 py-1 bg-blue-200 text-blue-700 rounded disabled:opacity-50"
                            >
                              Next ▶
                            </button>
                          </div>
                        )}
                      </>
                    ) : (
                      <p className="text-center text-gray-600">No registrations for this date.</p>
                    )}
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          ) : (
            <p className="text-center text-gray-600">Select a date to view registrations.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
