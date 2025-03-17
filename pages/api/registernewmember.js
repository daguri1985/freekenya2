import connectToDatabase from "@/lib/mongodb";
import Member from "@/models/Member";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    await connectToDatabase();

    const { name, nationalId, mobile, email, county, constituency, ward } = req.body;

    // Check if all fields are provided
    if (!name || !nationalId || !mobile || !email || !county || !constituency || !ward) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if a member with the same National ID exists
    const existingMember = await Member.findOne({ nationalId });
    if (existingMember) {
      return res.status(400).json({ error: "Member with this National ID already exists" });
    }

    // Create and save new member
    const newMember = await Member.create({
      name, nationalId, mobile, email, county, constituency, ward
    });

    res.status(201).json({ message: "Member registered successfully", member: newMember });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
