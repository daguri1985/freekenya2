import axios from "axios";
import { sanityClient } from '@/lib/sanity'; // Import the Sanity client

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { phone, amount } = req.body;

  // Load environment variables
  const consumerKey = process.env.MPESA_CONSUMER_KEY;
  const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
  const shortcode = process.env.MPESA_SHORTCODE || "174379"; // default sandbox shortcode
  const passkey = process.env.MPESA_PASSKEY;
  const callbackUrl = process.env.MPESA_CALLBACK_URL;

  if (!consumerKey || !consumerSecret || !passkey || !callbackUrl) {
    return res.status(500).json({
      message: "Missing required environment variables",
    });
  }

  if (!phone || !amount) {
    return res.status(400).json({ message: "Phone and amount are required" });
  }

  // Step 1: Generate Access Token
  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");
  console.log("Encoded Auth Header:", auth);

  let accessToken;
  try {
    const tokenResponse = await axios.get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    );
    accessToken = tokenResponse.data.access_token;
    console.log("Access Token:", accessToken);
  } catch (error) {
    console.error("Token Error:", error.response?.data || error.message);
    return res.status(500).json({
      message: "Failed to generate access token",
      details: error.response?.data || error.message,
    });
  }

  // Step 2: Prepare STK Push
  const timestamp = new Date()
    .toISOString()
    .replace(/[^0-9]/g, "")
    .slice(0, 14); // YYYYMMDDHHMMSS

  const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString("base64");

  const stkPushData = {
    BusinessShortCode: shortcode,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: amount,
    PartyA: phone,
    PartyB: shortcode,
    PhoneNumber: phone,
    CallBackURL: callbackUrl,
    AccountReference: "FreeKenya Donation",
    TransactionDesc: "Donation to FreeKenya Movement",
  };

  console.log("STK Push Payload:", stkPushData);

  try {
    const stkResponse = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      stkPushData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("STK Push Success:", stkResponse.data);

    // Step 3: Store donation in Sanity
    const { CheckoutRequestID, ResponseCode } = stkResponse.data;
    if (ResponseCode === "0") {
      const donation = {
        _type: 'donation',
        phoneNumber: phone,
        amount: parseFloat(amount),
        transactionId: CheckoutRequestID,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };

      try {
        await sanityClient.create(donation);
        console.log("Donation saved to Sanity:", donation);
      } catch (sanityError) {
        console.error("Sanity Error:", sanityError.message);
        // Don't fail the request if Sanity fails; log the error and proceed
      }
    } else {
      console.warn("STK Push ResponseCode not 0:", ResponseCode);
    }

    return res.status(200).json({ success: true, data: stkResponse.data });
  } catch (error) {
    console.error("STK Push Error:", error.response?.data || error.message);
    return res.status(500).json({
      success: false,
      message: error.response?.data?.errorMessage || "STK Push failed",
      details: error.response?.data || error.message,
    });
  }
}