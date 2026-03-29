import { Router, type Request, type Response } from "express";
import { Table } from "../models/Table";

const router = Router();

// Get all tables
router.get("/tables", async (req: Request, res: Response): Promise<void> => {
  try {
    const tables = await Table.find().sort({ tableNumber: 1 });
    res.json(tables);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tables" });
  }
});

// Get a single table
router.get("/tables/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const table = await Table.findById(req.params.id);
    if (!table) {
      res.status(404).json({ error: "Table not found" });
      return;
    }
    res.json(table);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch table" });
  }
});

// Create a new table
router.post("/tables", async (req: Request, res: Response): Promise<void> => {
  try {
    const existing = await Table.findOne({ tableNumber: req.body.tableNumber });
    if (existing) {
      res.status(409).json({ error: `Table ${req.body.tableNumber} already exists` });
      return;
    }
    const table = await Table.create(req.body);
    res.status(201).json(table);
  } catch (error) {
    res.status(500).json({ error: "Failed to create table" });
  }
});

// Update a table
router.put("/tables/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const table = await Table.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!table) {
      res.status(404).json({ error: "Table not found" });
      return;
    }
    res.json(table);
  } catch (error) {
    res.status(500).json({ error: "Failed to update table" });
  }
});

// Delete a table
router.delete("/tables/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const table = await Table.findByIdAndDelete(req.params.id);
    if (!table) {
      res.status(404).json({ error: "Table not found" });
      return;
    }
    res.json({ message: "Table deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete table" });
  }
});

export default router;
