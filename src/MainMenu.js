import React from "react";

export default function MainMenu({ onNavigate }) {
  const menuItems = [
    {
      id: "AUTO",
      label: "🚗 Automotive",
      desc: "Keys, Remotes, & Immo Data",
      color: "#007bff",
    }, // Blue
    {
      id: "COMMERCIAL",
      label: "🏢 Commercial",
      desc: "Hardware & Master Keys",
      color: "#28a745",
    }, // Green
    {
      id: "RESIDENTIAL",
      label: "🏠 Residential",
      desc: "Locks & Rekeying",
      color: "#fd7e14",
    }, // Orange
    {
      id: "POWERSPORTS",
      label: "🏍️ Powersports / RV",
      desc: "Motorcycle, Boat, ATV",
      color: "#17a2b8",
    }, // Teal
    {
      id: "SAFES",
      label: "🔒 Safes & Vaults",
      desc: "Combos & Drilling",
      color: "#6c757d",
    }, // Grey
  ];

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1 style={{ margin: 0, color: "#333" }}>Lockmedic</h1>
        <p style={{ color: "#666", marginTop: "5px" }}>
          Technician Field Database
        </p>
      </div>

      <div style={{ display: "grid", gap: "15px" }}>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "white",
              border: `2px solid ${item.color}`,
              borderLeft: `15px solid ${item.color}`,
              borderRadius: "8px",
              padding: "20px",
              cursor: "pointer",
              textAlign: "left",
              boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
              transition: "transform 0.1s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.02)")
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <div>
              <div
                style={{ fontSize: "18px", fontWeight: "bold", color: "#333" }}
              >
                {item.label}
              </div>
              <div
                style={{ fontSize: "13px", color: "#666", marginTop: "4px" }}
              >
                {item.desc}
              </div>
            </div>
            <div style={{ fontSize: "24px", color: item.color }}>→</div>
          </button>
        ))}
      </div>
    </div>
  );
}
