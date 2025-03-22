"use client";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import Image from "next/image";

export default function Donate() {
  const [amount, setAmount] = useState(100);
  const [phone, setPhone] = useState("");

  const handleDonate = async () => {
    if (!phone || phone.length < 10) {
      alert("Please enter a valid phone number.");
      return;
    }

    try {
      const response = await fetch("/api/mpesa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, amount }),
      });

      const data = await response.json();
      if (data.success) {
        alert("M-Pesa STK Push Sent! Check your phone.");
      } else {
        alert("Payment failed, try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Payment failed.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-sm mx-auto mt-5 p-6 bg-white rounded-lg shadow-lg text-center">
        <div className="mb-3">
          <Image src="/logo.png" alt="Logo" width={120} height={120} />
        </div>
        <h2 className="text-xl text-green-800 font-bold mb-3">Join Us in Making a Difference</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Every small act of generosity brings us closer to a better future. Your donation helps us support
          important causes and make a lasting impact. Donate securely via <strong>M-Pesa</strong> and be
          part of this transformative journey!
        </p>

        <div className="flex justify-center space-x-2 mb-3">
          <button
            className={`px-4 py-2 border-2 border-green-800 rounded-md text-green-800 transition-colors duration-300 ${
              amount === 50 ? "bg-green-800 text-white" : "hover:bg-green-300"
            }`}
            onClick={() => setAmount(50)}
          >
            Ksh 50
          </button>
          <button
            className={`px-4 py-2 border-2 border-green-800 rounded-md text-green-800 transition-colors duration-300 ${
              amount === 100 ? "bg-green-800 text-white" : "hover:bg-green-300"
            }`}
            onClick={() => setAmount(100)}
          >
            Ksh 100
          </button>
          <button
            className={`px-4 py-2 border-2 border-green-800 rounded-md text-green-800 transition-colors duration-300 ${
              amount === 500 ? "bg-green-800 text-white" : "hover:bg-green-300"
            }`}
            onClick={() => setAmount(500)}
          >
            Ksh 500
          </button>
        </div>

        <input
          type="number"
          placeholder="Enter custom amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md mb-2 focus:outline-none focus:border-green-800"
        />
        <input
          type="text"
          placeholder="Enter Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-green-800"
        />

        <button
          className="w-full p-4 bg-green-800 text-white rounded-md font-bold transition-colors duration-300 hover:bg-green-600"
          onClick={handleDonate}
        >
          Donate Now
        </button>

        <p className="text-xs text-gray-500 mt-3">Your donation will be processed securely via <strong>M-Pesa</strong>.</p>
      </div>
    </>
  );
}