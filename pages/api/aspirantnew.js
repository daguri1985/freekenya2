import fs from 'fs';
import path from 'path';
import connectToDatabase from "@/lib/mongodb";
import Aspirant from "@/models/Aspirant";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await connectToDatabase();
      const aspirants = await Aspirant.find();
      return res.status(200).json(aspirants);
    } catch (error) {
      console.error("Error fetching aspirants:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  if (req.method === "POST") {
    try {
      await connectToDatabase();

      const { name, nationalId, mobile, email, county, constituency, ward, position } = req.body;

      if (!name || !nationalId || !mobile || !email || !position || !county || !constituency || !ward) {
        return res.status(400).json({ error: "All fields are required" });
      }

      let countyData;
      try {
        const filePath = path.join(process.cwd(), 'public', 'county.json');
        countyData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      } catch (err) {
        console.error("Error loading county.json:", err);
        return res.status(500).json({ error: "Error loading county data" });
      }

      const selectedCounty = countyData.find(c => c.county_name === county);
      if (!selectedCounty) {
        return res.status(400).json({ error: "Invalid County" });
      }

      const selectedConstituency = selectedCounty.constituencies.find(c => c.constituency_name === constituency);
      if (!selectedConstituency) {
        return res.status(400).json({ error: "Invalid Constituency for selected County" });
      }

      if (!selectedConstituency.wards.includes(ward)) {
        return res.status(400).json({ error: "Invalid Ward for selected Constituency" });
      }

      const existingAspirant = await Aspirant.findOne({ nationalId });
      if (existingAspirant) {
        return res.status(400).json({ error: "Aspirant with this National ID already exists" });
      }

      const newAspirant = await Aspirant.create({ name, nationalId, mobile, email, county, constituency, ward, position });

      return res.status(201).json({ message: "Aspirant registered successfully", aspirant: newAspirant });
    } catch (error) {
      console.error("Registration Error:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  // **ADD THIS BLOCK TO HANDLE UPDATES**
  if (req.method === "PUT" || req.method === "PATCH") {
    try {
      await connectToDatabase();
      const { id } = req.body;
      const { name, nationalId, mobile, email, county, constituency, ward, position } = req.body;

      if (!name || !nationalId || !mobile || !email || !position || !county || !constituency || !ward) {
        return res.status(400).json({ error: "All fields are required" });
      }

      // Validate county, constituency, and ward
      let countyData;
      try {
        const filePath = path.join(process.cwd(), 'public', 'county.json');
        countyData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      } catch (err) {
        console.error("Error loading county.json:", err);
        return res.status(500).json({ error: "Error loading county data" });
      }

      const selectedCounty = countyData.find(c => c.county_name === county);
      if (!selectedCounty) {
        return res.status(400).json({ error: "Invalid County" });
      }

      const selectedConstituency = selectedCounty.constituencies.find(c => c.constituency_name === constituency);
      if (!selectedConstituency) {
        return res.status(400).json({ error: "Invalid Constituency for selected County" });
      }

      if (!selectedConstituency.wards.includes(ward)) {
        return res.status(400).json({ error: "Invalid Ward for selected Constituency" });
      }

      const updatedAspirant = await Aspirant.findByIdAndUpdate(
        id,
        { name, nationalId, mobile, email, county, constituency, ward, position },
        { new: true }
      );

      if (!updatedAspirant) {
        return res.status(404).json({ error: "Aspirant not found" });
      }

      return res.status(200).json({ message: "Aspirant updated successfully", aspirant: updatedAspirant });
    } catch (error) {
      console.error("Update Error:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  // Default case to handle unsupported methods
  return res.status(405).json({ error: "Method Not Allowed" });
}
