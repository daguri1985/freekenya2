export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const callbackData = req.body;
  console.log("M-Pesa Callback:", callbackData);

  // Process the callback data (e.g., save to database)
  const resultCode = callbackData.Body.stkCallback.ResultCode;
  if (resultCode === 0) {
    // Transaction successful
    console.log("Payment successful:", callbackData.Body.stkCallback.CallbackMetadata);
  } else {
    // Transaction failed
    console.log("Payment failed:", callbackData.Body.stkCallback.ResultDesc);
  }

  res.status(200).json({ status: "success" });
}