import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { phone, amount } = req.body;

  // Environment variables (add these to your .env.local file)
  const consumerKey = process.env.MPESA_CONSUMER_KEY;
  const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
 
 
  const callbackUrl = process.env.MPESA_CALLBACK_URL; // e.g., "https://your-ngrok-url.ngrok.io/api/callback"

  // Step 1: Generate Access Token
  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");
  let accessToken;
  try {
    const tokenResponse = await axios.get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        headers: { Authorization: `Basic ${auth}` },
      }
    );
    accessToken = tokenResponse.data.access_token;
  } catch (error) {
    console.error("Token Error:", error.response?.data || error.message);
    return res.status(500).json({ message: "Failed to generate access token" });
  }

  // Step 2: Initiate STK Push
  const timestamp = new Date()
    .toISOString()
    .replace(/[^0-9]/g, "")
    .slice(0, 14); // Format: YYYYMMDDHHMMSS
  const password = Buffer.from(`${shortcode}${timestamp}`).toString("base64");

  const stkPushData = {
    BusinessShortCode: shortcode,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: amount,
    PartyA: phone, // Phone number sending the funds
    PartyB: shortcode, // Shortcode receiving the funds
    PhoneNumber: phone, // Phone number to receive STK prompt
    CallBackURL: callbackUrl,
    AccountReference: "FreeKenya Donation",
    TransactionDesc: "Donation to FreeKenya Movement",
  };

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
    return res.status(200).json({ success: true, data: stkResponse.data });
  } catch (error) {
    console.error("STK Push Error:", error.response?.data || error.message);
    return res.status(500).json({
      success: false,
      message: error.response?.data?.errorMessage || "STK Push failed",
    });
  }
  console.log("Env values:", {
    consumerKey,
    consumerSecret,
    shortcode,
    passkey,
    callbackUrl,
  });
}
 