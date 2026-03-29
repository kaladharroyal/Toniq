// Seed script to populate the 10 default tables
const tables = [
  { tableNumber: 1, capacity: 2, section: "indoor", status: "available", description: "Window seat for two" },
  { tableNumber: 2, capacity: 4, section: "indoor", status: "available", description: "Central dining area" },
  { tableNumber: 3, capacity: 4, section: "indoor", status: "available", description: "Near the bar" },
  { tableNumber: 4, capacity: 6, section: "indoor", status: "available", description: "Large booth" },
  { tableNumber: 5, capacity: 2, section: "outdoor", status: "available", description: "Patio terrace" },
  { tableNumber: 6, capacity: 4, section: "outdoor", status: "available", description: "Garden view" },
  { tableNumber: 7, capacity: 8, section: "vip", status: "available", description: "Private VIP room" },
  { tableNumber: 8, capacity: 6, section: "vip", status: "available", description: "VIP lounge booth" },
  { tableNumber: 9, capacity: 2, section: "bar", status: "available", description: "Bar counter seat" },
  { tableNumber: 10, capacity: 4, section: "bar", status: "available", description: "High bar table" }
];

async function seed() {
  for (const t of tables) {
    try {
      const res = await fetch("http://localhost:3000/api/tables", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(t)
      });
      const data = await res.json();
      if (res.ok) {
        console.log(`Created Table ${t.tableNumber}`);
      } else {
        console.log(`Skipped Table ${t.tableNumber}: ${data.error}`);
      }
    } catch (err) {
      console.error(`Failed Table ${t.tableNumber}:`, err);
    }
  }
  console.log("Done seeding!");
}

seed();
