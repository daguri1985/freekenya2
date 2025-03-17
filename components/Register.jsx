"use client";
import { useState } from "react";

const Register = () => {
  const [showForm, setShowForm] = useState(false); // State to show/hide form

  return (
    <div className="bg-gray-100 rounded-lg shadow-lg mt-8 mx-auto w-full flex flex-col md:flex-row overflow-hidden">
      {/* Left Content Section */}
      <div className="w-full md:w-1/2 p-6 flex flex-col justify-start">
        <h3 className="text-2xl font-bold text-gray-900">Become a FreeKenya Champion</h3>
        <hr className="my-2 border-gray-300" />
        <p className="text-gray-700 mt-2">
          Join the movement by actively participating in our grassroots initiatives for a better Kenya.
        </p>
        <p className="text-gray-700 mt-2">
          The FreeKenya Movement is mobilizing citizens to take an active role in shaping governance and advocating 
          for people-driven reforms at the local and national levels. Be part of the change!
        </p>

        {/* Register Button */}
        <div className="mt-4">
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-full text-lg font-semibold shadow-md hover:bg-blue-700 transition"
          >
            Register Here
          </button>
        </div>
      </div>

      {/* Right Image Section */}
      <div className="w-full md:w-1/2">
        <img src="/nairobi.jpg" alt="Nairobi City" className="w-full h-full object-cover" />
      </div>

      {/* Registration Form - Only shown when showForm is true */}
      {showForm && (
      <div 
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80"
    >
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold text-gray-900">Register as a FreeKenya Champion</h2>
            <form className="mt-4">
              <input type="text" placeholder="Full Name" className="w-full p-2 border rounded mb-2" />
              <input type="text" placeholder="National ID Number" className="w-full p-2 border rounded mb-2" />
              <input type="text" placeholder="Mobile Number" className="w-full p-2 border rounded mb-2" />
              <input type="email" placeholder="Email Address" className="w-full p-2 border rounded mb-2" />
              <input type="text" placeholder="County" className="w-full p-2 border rounded mb-2" />
              <input type="text" placeholder="Constituency" className="w-full p-2 border rounded mb-2" />
              <input type="text" placeholder="Ward" className="w-full p-2 border rounded mb-2" />

              <div className="flex justify-between mt-4">
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Submit</button>
                <button type="button" onClick={() => setShowForm(false)} className="bg-red-600 text-white px-4 py-2 rounded">Close</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
