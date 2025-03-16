import React from 'react'

const Register = () => {
  return (
    <div className="bg-gray-100 rounded-lg shadow-lg mt-8 mx-auto w-full flex flex-col md:flex-row overflow-hidden">
      {/* Left Content Section */}
      <div className="w-full md:w-1/2 p-6 flex flex-col justify-start">
        {/* Top Left Heading & Divider */}
        <h3 className="text-2xl font-bold text-gray-900">Become a FreeKenya Champion</h3>
        <hr className="my-2 border-gray-300" />

        {/* Intro Section */}
        <p className="text-gray-700 mt-2">
          Join the movement by actively participating in our grassroots initiatives for a better Kenya.
        </p>

        {/* Registration Link */}
        <p className="text-blue-600 font-semibold mt-2">
          Registration Link: <a href="https://freekenya.co.ke/signup" className="underline">freekenya.co.ke/signup</a>
        </p>

        {/* Description */}
        <p className="text-gray-700 mt-2">
          The FreeKenya Movement is mobilizing citizens to take an active role in shaping governance and advocating 
          for people-driven reforms at the local and national levels. Be part of the change!
        </p>

        {/* Register Button */}
        <div className="mt-4">
          <a href="https://freekenya.co.ke/signup" className="bg-blue-600 text-white px-6 py-2 rounded-full text-lg font-semibold shadow-md hover:bg-blue-700 transition">
            Register Here
          </a>
        </div>
      </div>

      {/* Right Image Section */}
      <div className="w-full md:w-1/2">
        <img src="/nairobi.jpg" alt="Nairobi City" className="w-full h-full object-cover" />
      </div>
    </div>
  )
}

export default Register