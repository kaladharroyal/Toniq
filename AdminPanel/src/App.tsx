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
        <nav className="header-tabs">
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
        </nav>
      </header>

      <main className="admin-main">
        {activeTab === "overview" ? (
          loading ? (
            <p className="loading">Loading reservations...</p>
          ) : (
            <>
              {/* Active Reservations */}
              <h2 className="section-title">Active Reservations</h2>
              <div className="table-wrapper">
                <table className="reservation-table">
                  <thead>
                    <tr>
                      <th>Date & Time</th>
                      <th>Guest Name</th>
                      <th>Phone</th>
                      <th>Table</th>
                      <th>Party Size</th>
                      <th>Booked At</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservations.filter(r => r.status === "booked").length === 0 ? (
                      <tr>
                        <td colSpan={7} style={{ textAlign: "center" }}>
                          No active reservations.
                        </td>
                      </tr>
                    ) : (
                      reservations
                        .filter(r => r.status === "booked")
                        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                        .map((res) => (
                          <tr key={res.id}>
                            <td>
                              <strong>{res.date}</strong> at {res.time}
                            </td>
                            <td>{res.name}</td>
                            <td>{res.phone}</td>
                            <td>
                              <span className="badge table-badge">{res.tableNumber}</span>
                            </td>
                            <td>{res.guests}</td>
                            <td className="text-muted">
                              {new Date(res.createdAt).toLocaleString()}
                            </td>
                            <td>
                              <button
                                className="release-btn"
                                onClick={() => releaseTable(res.id)}
                              >
                                Release Table
                              </button>
                            </td>
                          </tr>
                        ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Completed Reservations */}
              <h2 className="section-title completed-title">Completed Reservations</h2>
              <div className="table-wrapper completed-wrapper">
                <table className="reservation-table">
                  <thead>
                    <tr>
                      <th>Date & Time</th>
                      <th>Guest Name</th>
                      <th>Phone</th>
                      <th>Table</th>
                      <th>Party Size</th>
                      <th>Booked At</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(() => {
                      const completed = reservations
                        .filter(r => r.status === "completed")
                        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

                      if (completed.length === 0) {
                        return (
                          <tr>
                            <td colSpan={7} style={{ textAlign: "center" }}>
                              No completed reservations yet.
                            </td>
                          </tr>
                        );
                      }

                      const displayed = showAllCompleted
                        ? completed.slice((completedPage - 1) * ITEMS_PER_PAGE, completedPage * ITEMS_PER_PAGE)
                        : completed.slice(0, 3);

                      return displayed.map((res) => (
                        <tr key={res.id}>
                          <td>
                            <strong>{res.date}</strong> at {res.time}
                          </td>
                          <td>{res.name}</td>
                          <td>{res.phone}</td>
                          <td>
                            <span className="badge table-badge">{res.tableNumber}</span>
                          </td>
                          <td>{res.guests}</td>
                          <td className="text-muted">
                            {new Date(res.createdAt).toLocaleString()}
                          </td>
                          <td>
                            <span className="badge status-completed">✅ Completed</span>
                          </td>
                        </tr>
                      ));
                    })()}
                  </tbody>
                </table>

                {(() => {
                  const completed = reservations.filter(r => r.status === "completed");
                  const totalPages = Math.ceil(completed.length / ITEMS_PER_PAGE);
                  if (completed.length <= 3 && !showAllCompleted) return null;
                  return (
                    <div className="pagination-bar">
                      {!showAllCompleted ? (
                        <button
                          className="show-more-btn"
                          onClick={() => { setShowAllCompleted(true); setCompletedPage(1); }}
                        >
                          Show All ({completed.length} reservations)
                        </button>
                      ) : (
                        <div className="pagination-controls">
                          <button className="page-btn" disabled={completedPage <= 1} onClick={() => setCompletedPage(p => p - 1)}>← Previous</button>
                          <span className="page-info">Page {completedPage} of {totalPages}</span>
                          <button className="page-btn" disabled={completedPage >= totalPages} onClick={() => setCompletedPage(p => p + 1)}>Next →</button>
                          <button className="show-less-btn" onClick={() => setShowAllCompleted(false)}>Show Less</button>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            </>
          )
        ) : activeTab === "management" ? (
          /* Table Management Tab */
          <div className="management-content">
            <div className="management-header">
              <h2 className="section-title">Manage Tables</h2>
              {!showAddForm && (
                <button className="add-table-btn" onClick={() => { resetForm(); setShowAddForm(true); }}>
                  + Add Table
                </button>
              )}
            </div>

            {showAddForm && (
              <div className="table-form-card">
                <h3 className="form-title">{editingTable ? "Edit Table" : "Add New Table"}</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Table Number</label>
                    <input
                      type="number"
                      value={tableForm.tableNumber}
                      onChange={e => setTableForm({ ...tableForm, tableNumber: e.target.value })}
                      placeholder="e.g. 1"
                      disabled={!!editingTable}
                    />
                  </div>
                  <div className="form-group">
                    <label>Capacity (seats)</label>
                    <input
                      type="number"
                      value={tableForm.capacity}
                      onChange={e => setTableForm({ ...tableForm, capacity: e.target.value })}
                      placeholder="e.g. 4"
                    />
                  </div>
                  <div className="form-group">
                    <label>Section</label>
                    <select value={tableForm.section} onChange={e => setTableForm({ ...tableForm, section: e.target.value })}>
                      <option value="indoor">Indoor</option>
                      <option value="outdoor">Outdoor</option>
                      <option value="vip">VIP</option>
                      <option value="bar">Bar</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Status</label>
                    <select value={tableForm.status} onChange={e => setTableForm({ ...tableForm, status: e.target.value })}>
                      <option value="available">Available</option>
                      <option value="unavailable">Unavailable</option>
                      <option value="maintenance">Maintenance</option>
                    </select>
                  </div>
                </div>
                <div className="form-group" style={{ marginTop: "0.75rem" }}>
                  <label>Description (optional)</label>
                  <input
                    type="text"
                    value={tableForm.description}
                    onChange={e => setTableForm({ ...tableForm, description: e.target.value })}
                    placeholder="e.g. Corner booth near the window"
                  />
                </div>
                <div className="form-actions">
                  <button className="save-btn" onClick={handleTableSubmit}>
                    {editingTable ? "Update Table" : "Create Table"}
                  </button>
                  <button className="cancel-btn" onClick={resetForm}>Cancel</button>
                </div>
              </div>
            )}

            <div className="table-wrapper">
              <table className="reservation-table">
                <thead>
                  <tr>
                    <th>Table #</th>
                    <th>Capacity</th>
                    <th>Section</th>
                    <th>Status</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tables.length === 0 ? (
                    <tr>
                      <td colSpan={6} style={{ textAlign: "center" }}>
                        No tables configured. Click "+ Add Table" to get started.
                      </td>
                    </tr>
                  ) : (
                    tables.map(t => (
                      <tr key={t._id}>
                        <td><strong>Table {t.tableNumber}</strong></td>
                        <td>{t.capacity} seats</td>
                        <td>
                          <span className={`badge section-badge section-${t.section}`}>
                            {t.section.charAt(0).toUpperCase() + t.section.slice(1)}
                          </span>
                        </td>
                        <td>
                          <span className={`badge status-${t.status}`}>
                            {t.status === "available" ? "🟢" : t.status === "maintenance" ? "🛠️" : "🔴"} {t.status.charAt(0).toUpperCase() + t.status.slice(1)}
                          </span>
                        </td>
                        <td className="text-muted">{t.description || "—"}</td>
                        <td>
                          <div className="action-btns">
                            <button className="edit-btn" onClick={() => startEdit(t)}>Edit</button>
                            <button className="delete-btn" onClick={() => deleteTable(t._id)}>Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* Tables View Tab */
          <div className="tables-view">
            <div className="view-layout">
              {/* Left: Table Grid */}
              <div className="view-left">
                <h2 className="section-title">Restaurant Floor &mdash; Tables View</h2>
                <div className="tables-grid">
                  {tables.length === 0 ? (
                    <p className="text-muted" style={{ gridColumn: "1 / -1", textAlign: "center", padding: "3rem" }}>
                      No tables configured. Go to Table Management to add tables.
                    </p>
                  ) : (
                    tables.map(t => {
                      const activeBooking = reservations.find(
                        r => r.tableNumber === `Table ${t.tableNumber}` && r.status === "booked" && r.date === selectedDate
                      );
                      return (
                        <div
                          key={t._id}
                          className={`table-card ${t.status === "maintenance" ? "table-maintenance" :
                              t.status === "unavailable" ? "table-unavailable" :
                                activeBooking ? "table-occupied" : "table-free"
                            }`}
                        >
                          <div className="table-card-header">
                            <span className="table-card-number">Table {t.tableNumber}</span>
                            <span className={`table-dot ${t.status === "maintenance" ? "dot-maintenance" :
                                t.status === "unavailable" ? "dot-unavailable" :
                                  activeBooking ? "dot-occupied" : "dot-free"
                              }`} />
                          </div>
                          <div className="table-card-body">
                            <p className="table-card-capacity">{t.capacity} seats &middot; {t.section.charAt(0).toUpperCase() + t.section.slice(1)}</p>
                            {activeBooking ? (
                              <div className="table-card-booking">
                                <p className="booking-guest">{activeBooking.name}</p>
                                <p className="booking-time">{activeBooking.time}</p>
                              </div>
                            ) : t.status === "maintenance" ? (
                              <p className="table-card-status">🛠️ Maintenance</p>
                            ) : t.status === "unavailable" ? (
                              <p className="table-card-status">🔴 Unavailable</p>
                            ) : (
                              <p className="table-card-status">🟢 Available</p>
                            )}
                          </div>
                          {t.description && (
                            <p className="table-card-desc">{t.description}</p>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Right: Date Calendar & Bookings */}
              <div className="view-right">
                <div className="calendar-card">
                  <h3 className="calendar-title">Bookings by Date</h3>
                  <input
                    type="date"
                    className="calendar-input"
                    value={selectedDate}
                    onChange={e => setSelectedDate(e.target.value)}
                  />
                  <div className="calendar-bookings">
                    {(() => {
                      const dayBookings = reservations
                        .filter(r => r.date === selectedDate && r.status === "booked")
                        .sort((a, b) => a.time.localeCompare(b.time));

                      if (dayBookings.length === 0) {
                        return <p className="no-bookings">No bookings for this date.</p>;
                      }

                      return dayBookings.map(r => (
                        <div key={r.id} className={`cal-booking-item ${r.status === "completed" ? "cal-completed" : ""}`}>
                          <div className="cal-booking-time">{r.time}</div>
                          <div className="cal-booking-details">
                            <p className="cal-booking-name">{r.name}</p>
                            <p className="cal-booking-meta">
                              {r.tableNumber} &middot; {r.guests} guests
                            </p>
                          </div>
                          <span className={`cal-dot ${r.status === "booked" ? "dot-occupied" : "dot-free"}`} />
                        </div>
                      ));
                    })()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
