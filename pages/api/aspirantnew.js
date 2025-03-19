import fs from 'fs';
import path from 'path';
import connectToDatabase from "@/lib/mongodb";
import Aspirant from "@/models/Aspirant";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    await connectToDatabase();

    const { name, nationalId, mobile, email, county, constituency, ward, position } = req.body;

    // Check if all fields are provided
    if (!name || !nationalId || !mobile || !email || !county || !constituency || !ward || !position) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Load county.json
    const filePath = path.join(process.cwd(), 'public', 'county.json');
    const countyData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Validate County
    const selectedCounty = countyData.find(c => c.county_name === county);
    if (!selectedCounty) {
      return res.status(400).json({ error: "Invalid County" });
    }

    // Validate Constituency
    const selectedConstituency = selectedCounty.constituencies.find(c => c.constituency_name === constituency);
    if (!selectedConstituency) {
      return res.status(400).json({ error: "Invalid Constituency for selected County" });
    }

    // Validate Ward
    if (!selectedConstituency.wards.includes(ward)) {
      return res.status(400).json({ error: "Invalid Ward for selected Constituency" });
    }

    // Check if an Aspirant with the same National ID exists
    const existingAspirant = await Aspirant.findOne({ nationalId });
    if (existingAspirant) {
      return res.status(400).json({ error: "Aspirant with this National ID already exists" });
    }

    // Create and save new aspirant
    const newAspirant = await Aspirant.create({
      name, nationalId, mobile, email, county, constituency, ward, position
    });

    res.status(201).json({ message: "Aspirant registered successfully",aspirantr: newAspirant });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}