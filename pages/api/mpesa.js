import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end(); // Only allow POST requests

  const { phone, amount } = req.body;

  const consumerKey = process.env.MPESA_CONSUMER_KEY;
  const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
  const shortcode = process.env.MPESA_SHORTCODE;
  const passkey = process.env.MPESA_PASSKEY;
  const callbackURL = process.env.MPESA_CALLBACK_URL;

  const timestamp = new Date().toISOString().replace(/[^0-9]/g, "").slice(0, 14);
  const password = Buffer.from(shortcode + passkey + timestamp).toString("base64");

  try {
    // Get Access Token
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");
    const { data: tokenResponse } = await axios.get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      { headers: { Authorization: `Basic ${auth}` } }
    );

    const accessToken = tokenResponse.access_token;

    // Initiate STK Push
    const { data: response } = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        BusinessShortCode: shortcode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: phone,
        PartyB: shortcode,
        PhoneNumber: phone,
        CallBackURL: callbackURL,
        AccountReference: "Donation",
        TransactionDesc: "Charity Donation",
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    res.status(200).json(response);
  } catch (error) {
    console.error("M-Pesa Error:", error);
    res.status(500).json({ error: "Payment failed" });
  }
}
