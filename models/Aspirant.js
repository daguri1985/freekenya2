import mongoose from "mongoose";

const AspirantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nationalId: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  county: { type: String, required: true },
  constituency: { type: String, required: true },
  ward: { type: String, required: true },
  position: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Aspirant || mongoose.model("Aspirant", AspirantSchema);
