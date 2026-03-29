import { Router, type Request, type Response } from "express";
import { Reservation } from "../models/Reservation";
import { sendConfirmationEmail } from "../lib/email";

const router = Router();

// Get available tables for a precise date and time slot
router.get("/reservations/booked", async (req: Request, res: Response): Promise<void> => {
  try {
    const { date, time } = req.query;
    if (!date || !time) {
      res.status(400).json({ error: "Date and time are required" });
      return;
    }

    // Find all active reservations exactly matching date & time
    const activeReservations = await Reservation.find({
      date,
      time,
      status: "booked"
    });

    const bookedTables = activeReservations.map(r => r.tableNumber);
    res.json({ bookedTables });
  } catch (error) {
    console.error("GET /reservations/booked error:", error);
    res.status(500).json({ error: "Failed to read booked tables" });
  }
});

// Admin endpoint to mark a table as completed and release it
router.patch("/reservations/:id/release", async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const reservation = await Reservation.findByIdAndUpdate(
      id,
      { status: "completed" },
      { new: true }
    );
    
    if (!reservation) {
      res.status(404).json({ error: "Reservation not found" });
      return;
    }
    
    res.json({ message: "Table released successfully", reservation });
  } catch (error) {
    console.error("PATCH /reservations/:id/release error:", error);
    res.status(500).json({ error: "Failed to release the table" });
  }
});

// Get all reservations for admin panel
router.get("/reservations", async (req: Request, res: Response): Promise<void> => {
  try {
    const reservations = await Reservation.find().sort({ createdAt: -1 });
    
    // Map _id to id so it matches our previous frontend format
    const formattedData = reservations.map(r => ({
      id: r._id.toString(),
      name: r.name,
      phone: r.phone,
      email: r.email,
      date: r.date,
      guests: r.guests,
      tableNumber: r.tableNumber,
      time: r.time,
      status: r.status,
      createdAt: r.createdAt
    }));
    
    res.json(formattedData);
  } catch (error) {
    console.error("GET /reservations error:", error);
    res.status(500).json({ error: "Failed to read reservations" });
  }
});

// Create a new reservation
router.post("/reservations", async (req: Request, res: Response): Promise<void> => {
  try {
    const newReservation = await Reservation.create({
      ...req.body,
      status: "booked"
    });

    // Send confirmation email (non-blocking)
    sendConfirmationEmail({
      to: newReservation.email as string,
      name: newReservation.name as string,
      date: newReservation.date as string,
      time: newReservation.time as string,
      tableNumber: newReservation.tableNumber as string,
      guests: newReservation.guests as string
    }).catch(err => console.error("Email send failed:", err));

    res.status(201).json({
      ...newReservation.toObject(),
      id: newReservation._id.toString()
    });
  } catch (error) {
    console.error("POST /reservations error:", error);
    res.status(500).json({ error: "Failed to save reservation" });
  }
});

export default router;
