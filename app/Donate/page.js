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
      <div className="donate-container">
        <div className="logo-container">
          <Image src="/logo.png" alt="Logo" width={120} height={120} />
        </div>
        <h2>Join Us in Making a Difference</h2>
        <p>
          Every small act of generosity brings us closer to a better future. Your donation helps us support
          important causes and make a lasting impact. Donate securely via <strong>M-Pesa</strong> and be
          part of this transformative journey!
        </p>

        <div className="amount-buttons">
          <button className={amount === 50 ? "selected" : ""} onClick={() => setAmount(50)}>Ksh 50</button>
          <button className={amount === 100 ? "selected" : ""} onClick={() => setAmount(100)}>Ksh 100</button>
          <button className={amount === 500 ? "selected" : ""} onClick={() => setAmount(500)}>Ksh 500</button>
        </div>

        <input type="number" placeholder="Enter custom amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <input type="text" placeholder="Enter Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />

        <button className="donate-btn" onClick={handleDonate}>Donate Now</button>

        <p className="disclaimer">Your donation will be processed securely via <strong>M-Pesa</strong>.</p>

        <style jsx>{`
          .donate-container {
            max-width: 420px;
            margin: 20px auto;
            text-align: center;
            background: #fff;
            padding: 25px;
            border-radius: 12px;
            box-shadow: 0px 5px 12px rgba(0, 0, 0, 0.15);
          }

          .logo-container {
            margin-bottom: 10px;
          }

          h2 {
            font-size: 22px;
            color: #228B22;
            font-weight: bold;
            margin-bottom: 12px;
          }

          p {
            font-size: 16px;
            color: #444;
            line-height: 1.6;
            margin-bottom: 15px;
          }

          .amount-buttons {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-bottom: 12px;
          }

          .amount-buttons button {
            padding: 10px 18px;
            border: 2px solid #228B22;
            background: #fff;
            color: #228B22;
            font-size: 16px;
            border-radius: 6px;
            cursor: pointer;
            transition: 0.3s;
          }

          .amount-buttons .selected {
            background: #228B22;
            color: #fff;
          }

          .amount-buttons button:hover {
            background: #32CD32;
            color: white;
          }

          input {
            width: 100%;
            padding: 12px;
            margin: 8px 0;
            border: 2px solid #ddd;
            border-radius: 6px;
            font-size: 16px;
            outline: none;
            transition: 0.3s;
          }

          input:focus {
            border-color: #228B22;
          }

          .donate-btn {
            background: #228B22;
            color: white;
            padding: 14px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            width: 100%;
            font-size: 18px;
            font-weight: bold;
            transition: 0.3s;
          }

          .donate-btn:hover {
            background: #32CD32;
          }

          .disclaimer {
            font-size: 12px;
            color: #777;
            margin-top: 12px;
          }
        `}</style>
      </div>
    </>
  );
}
