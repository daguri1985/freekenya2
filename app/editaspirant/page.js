"use client";
import { useState, useEffect } from "react";
import Navbar from '@/components/Navbar';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/Footer";

const EditAspirant = () => {
  const [aspirants, setAspirants] = useState([]);
  const [editingAspirant, setEditingAspirant] = useState(null);
  const [loading, setLoading] = useState(false);
  const [counties, setCounties] = useState([]);
  const [formData, setFormData] = useState({
    name: "", nationalId: "", mobile: "", email: "",
    position: "", county: "", constituency: "", ward: "",
  });

  const fetchAspirants = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/aspirantnew");
      if (!response.ok) throw new Error("Failed to fetch aspirants");
      const data = await response.json();
      setAspirants(data);
    } catch (error) {
      console.error("Error fetching aspirants:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCountyData = async () => {
    try {
      const res = await fetch("/county.json");
      if (!res.ok) throw new Error("Failed to load counties");
      const data = await res.json();
      setCounties(data);
    } catch (err) {
      console.error("Error loading counties:", err);
    }
  };

  useEffect(() => {
    fetchAspirants();
    fetchCountyData();
  }, []);

  const handleEdit = (aspirant) => {
    setEditingAspirant(aspirant._id);
    setFormData({ ...aspirant });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/aspirantnew", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingAspirant, ...formData }),
      });
      if (!response.ok) throw new Error("Failed to update aspirant");
      fetchAspirants();
      setEditingAspirant(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this aspirant?")) return;
    try {
      await fetch(`/api/aspirantnew?id=${id}`, { method: "DELETE" });
      fetchAspirants();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6 min-h-screen bg-gray-50">
        <h1 className="text-3xl font-extrabold mb-8 text-green-700">Manage Aspirants</h1>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : aspirants.length === 0 ? (
          <div className="text-center text-gray-500">No aspirants available yet.</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aspirants.map((aspirant) => (
              <div key={aspirant._id} className="bg-white rounded-xl p-5 shadow hover:shadow-md transition">
                <h2 className="text-xl font-bold text-green-600">{aspirant.name}</h2>
                <p className="text-sm text-gray-500 mb-4">{aspirant.position}</p>
                <div className="space-y-1 text-sm">
                  <p><strong>ID:</strong> {aspirant.nationalId}</p>
                  <p><strong>Mobile:</strong> {aspirant.mobile}</p>
                  <p><strong>Email:</strong> {aspirant.email}</p>
                  <p><strong>County:</strong> {aspirant.county}</p>
                  <p><strong>Constituency:</strong> {aspirant.constituency}</p>
                  <p><strong>Ward:</strong> {aspirant.ward}</p>
                </div>
                <div className="flex space-x-4 mt-4">
                  <button
                    onClick={() => handleEdit(aspirant)}
                    className="flex items-center gap-1 px-3 py-1 text-sm bg-green-500 hover:bg-green-600 text-white rounded-md shadow"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(aspirant._id)}
                    className="flex items-center gap-1 px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded-md shadow"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Edit Form Modal */}
        <AnimatePresence>
          {editingAspirant && (
            <motion.div 
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
            >
              <motion.div 
                className="bg-white p-8 rounded-xl shadow-xl w-11/12 md:w-96"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
              >
                <h2 className="text-2xl font-bold mb-6 text-green-600">Edit Aspirant</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {["name", "nationalId", "mobile", "email", "position", "constituency", "ward"].map((field) => (
                    <input
                      key={field}
                      type={field === "email" ? "email" : "text"}
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                      className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                    />
                  ))}
                  
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setEditingAspirant(null)}
                      className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </>
  );
};

export default EditAspirant;
