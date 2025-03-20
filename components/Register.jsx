"use client";
import { useState, useEffect } from "react";
import VideoPlayer from "@/components/VideoPlayer";


const Register = () => {
  const [showForm, setShowForm] = useState(false);
  const [counties, setCounties] = useState([]);
  const [selectedCounty, setSelectedCounty] = useState("");
  const [constituencies, setConstituencies] = useState([]);
  const [selectedConstituency, setSelectedConstituency] = useState("");
  const [wards, setWards] = useState([]);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    nationalId: "",
    mobile: "",
    email: "",
    county: "",
    constituency: "",
    ward: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchCounties = async () => {
      try {
        const response = await fetch("/county.json");
        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        console.log("Fetched Counties:", data);

        setCounties(data);
      } catch (error) {
        console.error("Error fetching counties:", error);
      }
    };

    fetchCounties();
  }, []);

  const handleChange = (e) => {
    
    const { name, value } = e.target; // Destructure name and value from e.target
  
    // Update formData
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  
    // Update constituencies and wards based on the selected county
    if (name === "county") {
      const selectedCounty = counties.find((county) => county.county_name === value);
      setConstituencies(selectedCounty ? selectedCounty.constituencies : []);
      setWards([]);
      setFormData((prev) => ({ ...prev, constituency: "", ward: "" }));
    }
  
    // Update wards based on the selected constituency
    if (name === "constituency") {
      const selectedConstituency = constituencies.find(
        (consti) => consti.constituency_name === value
      );
      setWards(selectedConstituency ? selectedConstituency.wards : []);
      setFormData((prev) => ({ ...prev, ward: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Before Validation:", formData); // Debugging
  
    // Ensure all required fields are filled
    if (
      !formData.name ||
      !formData.nationalId ||
      !formData.mobile ||
      !formData.email ||
      !formData.county ||
      !formData.constituency ||
      !formData.ward
    ) {
      setMessage("Please fill in all required fields.");
      console.error("Missing fields:", formData);
      return;
    }
  
    try {
      const response = await fetch("/api/registernewmember", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      let data;
      try {
        data = await response.json(); // Ensure response is JSON
      } catch (jsonError) {
        console.error("Invalid JSON response", jsonError);
        setMessage("Unexpected server response.");
        return;
      }
  
      if (response.ok) {
        setShowSuccessPopup(true);
        setFormData({
          name: "",
          nationalId: "",
          mobile: "",
          email: "",
          county: "",
          constituency: "",
          ward: "",
        });
        setConstituencies([]);
        setWards([]);
      } else {
        setMessage(data.error || "Registration failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred. Please try again.");
    }
  };
  return (
    <div className="bg-gray-100 rounded-lg shadow-lg mt-8 mx-auto w-full flex flex-col md:flex-row overflow-hidden">
      <div className="w-full md:w-1/2 p-6 flex flex-col justify-start">
        <h3 className="text-2xl font-bold text-gray-900">
          Become a FreeKenya Champion
        </h3>
        <hr className="my-2 border-gray-300" />
        <p className="text-gray-700 mt-2">
          Join the movement by actively participating in our grassroots
          initiatives for a better Kenya.
        </p>
        <p>
        By registering as a FreeKenya Champion, you become part of a nationwide network of dedicated
         individuals committed to driving positive change. 
         As a champion, you’ll have the opportunity to engage in impactful community projects, 
         advocate for better governance, and contribute to meaningful reforms at both local and national levels. 
         You'll gain access to exclusive training sessions, leadership development programs, and collaborative
          forums where your voice will be heard. Whether you’re passionate about social justice, economic empowerment, or policy transformation, this is your chance to be on the frontlines of change. 
          Together, we can build a more just, inclusive, and prosperous Kenya for all. 
        Sign up today and be the difference our nation needs!
        </p>
        <div className="mt-4">
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-full text-lg font-semibold shadow-md hover:bg-blue-700 transition"
          >
            Register Here
          </button>
        </div>
      </div>

     <VideoPlayer />

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold text-gray-900">
              Register as a FreeKenya Champion
            </h2>
          
            <form className="mt-4" onSubmit={handleSubmit}>
            

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full p-2 border rounded mb-2"
              />
              <input
                type="text"
                name="nationalId"
                value={formData.nationalId}
                onChange={handleChange}
                placeholder="National ID Number"
                className="w-full p-2 border rounded mb-2"
              />
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Mobile Number"
                className="w-full p-2 border rounded mb-2"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full p-2 border rounded mb-2"
              />

            <select
  name="county"
  value={formData.county} // Ensure this comes from formData
  onChange={(e) => {
    const countyName = e.target.value;
    setSelectedCounty(countyName);
    
    // Find selected county and its constituencies
    const county = counties.find((c) => c.county_name === countyName);
    setConstituencies(county ? county.constituencies : []);
    setSelectedConstituency("");
    setWards([]);

    // Update formData
    setFormData((prev) => ({ ...prev, county: countyName, constituency: "", ward: "" }));
  }}
  className="w-full p-2 border rounded mb-2"
>
  <option value="">Select County</option>
  {counties.map((county, index) => (
    <option key={index} value={county.county_name}>
      {county.county_name}
    </option>
  ))}
</select>

<select
  name="constituency"
  value={formData.constituency} // Ensure this comes from formData
  onChange={(e) => {
    const constituencyName = e.target.value;
    setSelectedConstituency(constituencyName);
    
    // Find selected constituency and its wards
    const constituency = constituencies.find((c) => c.constituency_name === constituencyName);
    setWards(constituency ? constituency.wards : []);

    // Update formData
    setFormData((prev) => ({ ...prev, constituency: constituencyName, ward: "" }));
  }}
  className="w-full p-2 border rounded mb-2"
>
  <option value="">Select Constituency</option>
  {constituencies.map((constituency, index) => (
    <option key={index} value={constituency.constituency_name}>
      {constituency.constituency_name}
    </option>
  ))}
</select>

<select
  name="ward"
  value={formData.ward}
  onChange={handleChange} // This is fine as is
  className="w-full p-2 border rounded mb-2"
>
  <option value="">Select Ward</option>
  {wards.map((ward, index) => (
    <option key={index} value={ward}>
      {ward}
    </option>
  ))}
</select>

              <div className="flex justify-between mt-4">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Close
                </button>
              </div>
              
            </form>
          </div>
        </div>
      )}

      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80">
          <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg w-80 text-center">
            <h2 className="text-xl font-bold">🎉 Registration Successful!</h2>
            <p className="mt-2">
              You have successfully registered as a FreeKenya Champion.
            </p>
            <button
              onClick={() => setShowSuccessPopup(false)}
              className="mt-4 bg-white text-green-700 px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-gray-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
