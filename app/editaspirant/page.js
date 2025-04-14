"use client"; // Required for client-side interactivity
import { useState, useEffect } from "react";
import Navbar from '@/components/Navbar';

const EditAspirant = () => {
    const [aspirants, setAspirants] = useState([]); //state to store aspirants
    const [editingAspirant, setEditingAspirant] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        nationalId: "",
        mobile: "",
        email: "",
        position: "",
        county: "",
        constituency: "",
        ward: "",
    }) ;
    // Fetch all aspirants from the API
  const fetchAspirants = async () => {
    try {
      const response = await fetch("/api/aspirantnew");
      console.log("Response status:", response.status);
      if (!response.ok) {
        const errorText = await response.text(); // Capture error message
        throw new Error("Failed to fetch aspirants");
      }
      const data = await response.json();
      setAspirants(data);
    } catch (error) {
      console.error("Error fetching aspirants:", error);
    }
  };
  
  // Fetch aspirants when the component mounts
  useEffect(() => {
    fetchAspirants();
  }, []);

  // Handle editing a member
  const handleEdit = (aspirant) => {
    setEditingAspirant(aspirant._id); // Set the aspirant ID being edited
    setFormData({
      name: aspirant.name,
      nationalId: aspirant.nationalId,
      mobile: aspirant.mobile,
      email: aspirant.email,
      position: aspirant.position,
      county: aspirant.county,
      constituency: aspirant.constituency,
      ward: aspirant.ward,
    });
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission (update aspirant)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/aspirantnew", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: editingAspirant,
          ...formData,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error updating Apirant:", errorData);
        throw new Error(errorData.error || "Failed to update aspirant");
      }
  
      const updatedAspirant = await response.json();
      console.log("Aspirant updated:", updatedAspirant);
  
      // Refresh the Aspirants list
      fetchAspirants();
  
      // Reset the form and editing state
      setEditingMember(null);
      setFormData({
        name: "",
        nationalId: "",
        mobile: "",
        email: "",
        position:"",
        county: "",
        constituency: "",
        ward: "",
      });
    } catch (error) {
      console.error("Error updating aspirant:", error.message || error);
    }
  };

  // Handle deleting an aspirant
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/aspirantnew?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete ASpirant");

      // Refresh the Aspirants list
      fetchAspirants();
    } catch (error) {
      console.error("Error deleting Aspirant:", error);
    }
  };

  return (
    <div>
        <>
        <Navbar />
        <div className="p-4">
        <h1 className="text-2xl font-bold mb-6 text-green-600">Edit Aspirants</h1>

        {/* Members Table */}
        <div className="overflow-x-auto">
          {/* Desktop Table */}
          <table className="min-w-full bg-white border border-gray-200 hidden md:table">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="py-3 px-4 border">Name</th>
                <th className="py-3 px-4 border">National ID</th>
                <th className="py-3 px-4 border">Mobile</th>
                <th className="py-3 px-4 border">Email</th>
                <th className="py-3 px-4 border">Position</th>
                <th className="py-3 px-4 border">County</th>
                <th className="py-3 px-4 border">Constituency</th>
                <th className="py-3 px-4 border">Ward</th>
                <th className="py-3 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {aspirants.map((aspirant) => (
                <tr key={aspirant._id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-2 px-4 border">{aspirant.name}</td>
                  <td className="py-2 px-4 border">{aspirant.nationalId}</td>
                  <td className="py-2 px-4 border">{aspirant.mobile}</td>
                  <td className="py-2 px-4 border">{aspirant.email}</td>
                  <td className="py-2 px-4 border">{aspirant.position}</td>
                  <td className="py-2 px-4 border">{aspirant.county}</td>
                  <td className="py-2 px-4 border">{aspirant.constituency}</td>
                  <td className="py-2 px-4 border">{aspirant.ward}</td>
                  <td className="py-2 px-4 border">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(aspirant)}
                        className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 shadow-md"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(aspirant._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 shadow-md"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile Table (Stacked Layout) */}
          <div className="md:hidden">
            {aspirants.map((aspirant) => (
              <div key={aspirant._id} className="bg-white p-4 mb-4 rounded-lg shadow-md">
                <div className="space-y-2">
                  <p><strong>Name:</strong> {aspirant.name}</p>
                  <p><strong>National ID:</strong> {aspirant.nationalId}</p>
                  <p><strong>Mobile:</strong> {aspirant.mobile}</p>
                  <p><strong>Email:</strong> {aspirant.email}</p>
                  <p><strong>County:</strong> {aspirant.county}</p>
                  <p><strong>Constituency:</strong> {aspirant.constituency}</p>
                  <p><strong>Ward:</strong> {aspirant.ward}</p>
                </div>
                <div className="flex space-x-2 mt-4">
                  <button
                    onClick={() => handleEdit(aspirant)}
                    className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 shadow-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(aspirant._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 shadow-md"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Edit Form */}
        {editingAspirant && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-96">
              <h2 className="text-xl font-bold mb-4 text-green-600">Edit Aspirant</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full p-2 border rounded mb-2 shadow-sm"
                />
                <input
                  type="text"
                  name="nationalId"
                  value={formData.nationalId}
                  onChange={handleChange}
                  placeholder="National ID"
                  className="w-full p-2 border rounded mb-2 shadow-sm"
                />
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Mobile"
                  className="w-full p-2 border rounded mb-2 shadow-sm"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full p-2 border rounded mb-2 shadow-sm"
                />
                 <input
                  type="position"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  placeholder="Position"
                  className="w-full p-2 border rounded mb-2 shadow-sm"
                />
                <input
                  type="text"
                  name="county"
                  value={formData.county}
                  onChange={handleChange}
                  placeholder="County"
                  className="w-full p-2 border rounded mb-2 shadow-sm"
                />
                <input
                  type="text"
                  name="constituency"
                  value={formData.constituency}
                  onChange={handleChange}
                  placeholder="Constituency"
                  className="w-full p-2 border rounded mb-2 shadow-sm"
                />
                <input
                  type="text"
                  name="ward"
                  value={formData.ward}
                  onChange={handleChange}
                  placeholder="Ward"
                  className="w-full p-2 border rounded mb-2 shadow-sm"
                />
                <div className="flex justify-end mt-4">
                  <button
                    type="button"
                    onClick={() => setEditingAspirant(null)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-600 shadow-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 shadow-md"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
        </>
    </div>
  )
}

export default EditAspirant
