import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: String, required: true },
  guests: { type: String, required: true },
  tableNumber: { type: String, required: true },
  time: { type: String, required: true },
  status: { type: String, enum: ["booked", "completed"], default: "booked" },
  createdAt: { type: Date, default: Date.now }
});

export const Reservation = mongoose.model("Reservation", reservationSchema);
