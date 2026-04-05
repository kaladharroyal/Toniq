import { useEffect, useState } from "react";
import "./App.css";

interface Reservation {
  id: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: string;
  tableNumber: string;
  status: string;
  createdAt: string;
}

interface TableData {
  _id: string;
  tableNumber: number;
  capacity: number;
  section: string;
  status: string;
  description: string;
}

function App() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAllCompleted, setShowAllCompleted] = useState(false);
  const [completedPage, setCompletedPage] = useState(1);
  const [activeTab, setActiveTab] = useState<"overview" | "management" | "view">("overview");
  const ITEMS_PER_PAGE = 10;

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("toniq_admin_auth") === "true");
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  // Table Management state
  const [tables, setTables] = useState<TableData[]>([]);
  const [editingTable, setEditingTable] = useState<TableData | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [tableForm, setTableForm] = useState({
    tableNumber: "",
    capacity: "",
    section: "indoor",
    status: "available",
    description: ""
  });
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError("");
    try {
      const res = await fetch("https://toniq-ozrn.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem("toniq_admin_auth", "true");
        setIsAuthenticated(true);
      } else {
        setAuthError(data.error || "Invalid credentials");
      }
    } catch (err) {
      setAuthError("Server connection failed");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("toniq_admin_auth");
    setIsAuthenticated(false);
  };

  const fetchReservations = async () => {
    try {
      const res = await fetch("https://toniq-ozrn.onrender.com/api/reservations");
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setReservations(data);
    } catch (err) {
      console.error("Error fetching reservations", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTables = async () => {
    try {
      const res = await fetch("https://toniq-ozrn.onrender.com/api/tables");
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setTables(data);
    } catch (err) {
      console.error("Error fetching tables", err);
    }
  };

  const releaseTable = async (id: string) => {
    try {
      const res = await fetch(`https://toniq-ozrn.onrender.com/api/reservations/${id}/release`, {
        method: "PATCH",
      });
      if (!res.ok) throw new Error("Failed to release");
      fetchReservations();
    } catch (err) {
      console.error("Error releasing table", err);
      alert("Failed to release the table. Please try again.");
    }
  };

  const handleTableSubmit = async () => {
    const payload = {
      tableNumber: Number(tableForm.tableNumber),
      capacity: Number(tableForm.capacity),
      section: tableForm.section,
      status: tableForm.status,
      description: tableForm.description
    };

    try {
      if (editingTable) {
        const res = await fetch(`https://toniq-ozrn.onrender.com/api/tables/${editingTable._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error("Failed to update");
      } else {
        const res = await fetch("https://toniq-ozrn.onrender.com/api/tables", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        if (!res.ok) {
          const err = await res.json();
          alert(err.error || "Failed to create table");
          return;
        }
      }
      resetForm();
      fetchTables();
    } catch (err) {
      console.error("Error saving table", err);
      alert("Failed to save table.");
    }
  };

  const deleteTable = async (id: string) => {
    if (!confirm("Are you sure you want to delete this table?")) return;
    try {
      const res = await fetch(`https://toniq-ozrn.onrender.com/api/tables/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed");
      fetchTables();
    } catch (err) {
      console.error("Error deleting table", err);
      alert("Failed to delete table.");
    }
  };

  const startEdit = (table: TableData) => {
    setEditingTable(table);
    setTableForm({
      tableNumber: String(table.tableNumber),
      capacity: String(table.capacity),
      section: table.section,
      status: table.status,
      description: table.description
    });
    setShowAddForm(true);
  };

  const resetForm = () => {
    setEditingTable(null);
    setShowAddForm(false);
    setTableForm({ tableNumber: "", capacity: "", section: "indoor", status: "available", description: "" });
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchReservations();
      fetchTables();
      const interval = setInterval(fetchReservations, 10000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="login-logo">T</div>
            <h1>TONIQE Admin</h1>
            <p>Please enter your credentials to continue</p>
          </div>
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                placeholder="Enter username"
                required
                value={loginData.username}
                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter password"
                required
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              />
            </div>
            {authError && <p className="auth-error">{authError}</p>}
            <button type="submit" className="login-submit" disabled={authLoading}>
              {authLoading ? "Verifying..." : "Login to Dashboard"}
            </button>
          </form>
          <div className="login-footer">
            <p>&copy; 2025 TONIQE Restaurant &bull; Secure Access</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <header className="admin-header">
        <div className="header-top">
          <div>
            <h1>TONIQE Admin Panel</h1>
            <p>Live Reservation Dashboard</p>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
        {/* <nav className="header-tabs">
          <button
            className={`tab-btn ${activeTab === "overview" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            Tables Overview
          </button>
          <button
            className={`tab-btn ${activeTab === "management" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("management")}
          >
            Table Management
          </button>
          <button
            className={`tab-btn ${activeTab === "view" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("view")}
          >
            Tables View
          </button>
        </nav> */}
      </header>

      <main className="admin-main" style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
        <div className="management-content" style={{ opacity: 0.7 }}>
          <h2 className="section-title" style={{ fontSize: "2.5rem", marginBottom: "1.5rem" }}>Feature Disabled</h2>
          <p className="text-muted" style={{ fontSize: "1.2rem", maxWidth: "600px", margin: "0 auto" }}>
            The Reservation and Table Management system has been disabled as per client request. 
            All booking functionalities are currently offline.
          </p>
        </div>

        {/* Existing logic disabled
        {activeTab === "overview" ? (
          ...
        ) : (
          ...
        )}
        */}
      </main>
    </div>
  );
}

export default App;
