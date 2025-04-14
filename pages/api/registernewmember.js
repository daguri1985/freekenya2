import fs from 'fs';
import path from 'path';
import connectToDatabase from "@/lib/mongodb";
import Member from "@/models/Member";

export default async function handler(req, res) {
  // Connect to the database
  await connectToDatabase();

  // Handle GET request (Fetch all members)
  if (req.method === "GET") {
    try {
      const members = await Member.find({}); // Fetch all members from the database
      res.status(200).json(members); // Return the members as JSON
    } catch (error) {
      console.error("Error fetching members:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  // Handle POST request (Create a new member)
  else if (req.method === "POST") {
    try {
      console.log('API req.body:', req.body); // Log the request body for debugging
      const { name, nationalId, mobile, email, county, constituency, ward } = req.body;

      // Check if all fields are provided
      if (!name || !nationalId || !mobile || !email || !county || !constituency || !ward) {
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

  // Handle PUT request (Edit a member)
  else if (req.method === "PUT") {
    try {
      const { id, name, nationalId, mobile, email, county, constituency, ward } = req.body;
  
      // Debug: Log the request body
      console.log("Request Body:", req.body);
  
      // Check if all fields are provided
      if (!id || !name || !nationalId || !mobile || !email || !county || !constituency || !ward) {
        return res.status(400).json({ error: "All fields are required" });
      }
  
      // Load county.json
      const filePath = path.join(process.cwd(), 'public', 'county.json');
      const countyData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
      // Debug: Log county data
      console.log("County Data:", countyData);
  
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
  
      // Debug: Log the member ID being updated
      console.log("Updating Member ID:", id);
  
      // Find the member by ID and update their details
      const updatedMember = await Member.findByIdAndUpdate(
        id,
        { name, nationalId, mobile, email, county, constituency, ward },
        { new: true } // Return the updated document
      );
  
      // Debug: Log the updated member
      console.log("Updated Member:", updatedMember);
  
      if (!updatedMember) {
        return res.status(404).json({ error: "Member not found" });
      }
  
      res.status(200).json({ message: "Member updated successfully", member: updatedMember });
    } catch (error) {
      console.error("Error updating member:", error.message || error);
      res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
  }

   // Handle DELETE request
   if (req.method === "DELETE") {
    try {
      const { id } = req.query;
      await Member.findByIdAndDelete(id);
      res.status(200).json({ message: "Member deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  // Handle unsupported methods
  else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}