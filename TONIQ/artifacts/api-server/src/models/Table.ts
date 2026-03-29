import mongoose from "mongoose";

const tableSchema = new mongoose.Schema({
  tableNumber: { type: Number, required: true, unique: true },
  capacity: { type: Number, required: true },
  section: { type: String, enum: ["indoor", "outdoor", "vip", "bar"], default: "indoor" },
  status: { type: String, enum: ["available", "unavailable", "maintenance"], default: "available" },
  description: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now }
});

export const Table = mongoose.model("Table", tableSchema);
