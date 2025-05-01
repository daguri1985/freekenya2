"use client";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import Image from "next/image";
import Footer from "@/components/Footer";

export default function Donate() {
  const [amount, setAmount] = useState(100);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDonate = async () => {
    // Basic validation
    if (!phone || phone.length < 10 || !/^\d+$/.test(phone)) {
      alert("Please enter a valid phone number (e.g., 0712345678).");
      return;
    }
    if (amount <= 0) {
      alert("Please enter a valid amount (minimum Ksh 1).");
      return;
    }

    // Format phone to 254XXXXXXXXX
    let formattedPhone = phone;
    if (!phone.startsWith("254")) {
      formattedPhone = `254${phone.slice(1)}`;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/mpesa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: formattedPhone, amount }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        alert("M-Pesa STK Push Sent! Check your phone to complete the payment.");
      } else {
        alert("Payment failed: " + (data.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Payment failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="fixed inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center blur-md"
          style={{ backgroundImage: "url('/nairobi.jpg')" }}
        ></div>
      </div>

      <div className="relative z-10 w-full min-h-screen flex flex-col items-center">
        <div className="max-w-sm mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg text-center">
          <div className="mb-3">
            <Image src="/logo.png" alt="Logo" width={120} height={120} />
          </div>

          <h2 className="text-xl text-green-800 font-bold mb-3">Join Us in Making a Difference</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Every small act of generosity brings us closer to a better future. Your donation helps us support
            important causes and make a lasting impact. Donate securely via <strong>M-Pesa</strong>!
          </p>

          <div className="flex justify-center space-x-2 mb-3">
            {[50, 100, 500].map((value) => (
              <button
                key={value}
                className={`px-4 py-2 border-2 border-green-800 rounded-md text-green-800 transition-colors duration-300 ${
                  amount === value ? "bg-green-800 text-white" : "hover:bg-green-300"
                }`}
                onClick={() => setAmount(value)}
                disabled={loading}
              >
                Ksh {value}
              </button>
            ))}
          </div>

          <input
            type="number"
            placeholder="Enter custom amount"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-md mb-2 focus:outline-none focus:border-green-800"
            disabled={loading}
            min="1"
          />

          <input
            type="text"
            placeholder="Enter Phone Number (e.g., 0712345678)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-green-800"
            disabled={loading}
          />

          <button
            className="w-full p-4 bg-green-800 text-white rounded-md font-bold transition-colors duration-300 hover:bg-green-600 disabled:bg-gray-400"
            onClick={handleDonate}
            disabled={loading}
          >
            {loading ? "Processing..." : "Donate Now"}
          </button>

          <p className="text-xs text-gray-500 mt-3">
            Your donation will be processed securely via <strong>M-Pesa</strong>.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}