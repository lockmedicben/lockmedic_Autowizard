import React, { useState } from "react";
import { Card, Content, Button, InputText, Heading } from "./JobberUI"; // Adjust path if JobberUI is in a subfolder
import AutoWizard from "./AutoWizard";
import StandardForm from "./StandardForm";

// Simple style wrapper for the menu grid
const MenuGrid = ({ children }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "20px",
      marginTop: "20px",
    }}
  >
    {children}
  </div>
);

export default function Lockmedic() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  // --- PATH A: AUTOMOTIVE WIZARD ---
  if (selectedCategory === "AUTO") {
    return <AutoWizard onBack={() => setSelectedCategory(null)} />;
  }

  // --- PATH B: SIMPLE FORM (Residential, Commercial, Safe) ---
  if (selectedCategory) {
    return (
      <StandardForm
        category={selectedCategory}
        onBack={() => setSelectedCategory(null)}
      />
    );
  }

  // --- MAIN MENU ---
  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "800px",
        margin: "0 auto",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1
          style={{ color: "#2e3b4e", fontSize: "32px", marginBottom: "10px" }}
        >
          Lock Medic Service Request
        </h1>
        <p style={{ color: "#666" }}>Select a service category to begin</p>
      </div>

      <div
        onClick={() => setSelectedCategory("AUTO")}
        style={{
          padding: "30px",
          background: "linear-gradient(135deg, #0070e0 0%, #005bb5 100%)",
          borderRadius: "12px",
          color: "white",
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(0, 112, 224, 0.3)",
          marginBottom: "20px",
          transition: "transform 0.2s",
        }}
      >
        <div style={{ fontSize: "40px", marginBottom: "10px" }}>🚗</div>
        <div style={{ fontSize: "24px", fontWeight: "bold" }}>Automotive</div>
        <div style={{ opacity: 0.9 }}>
          Lost Keys, Spares, Remotes & Programming
        </div>
      </div>

      <MenuGrid>
        {["RESIDENTIAL", "COMMERCIAL", "SAFE", "POWERSPORTS"].map((cat) => (
          <div
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: "20px",
              background: "white",
              border: "1px solid #e0e0e0",
              borderRadius: "12px",
              cursor: "pointer",
              textAlign: "center",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
            }}
          >
            <div style={{ fontSize: "30px", marginBottom: "10px" }}>
              {cat === "RESIDENTIAL" && "🏠"}
              {cat === "COMMERCIAL" && "🏢"}
              {cat === "SAFE" && "🔒"}
              {cat === "POWERSPORTS" && "🏍️"}
            </div>
            <div style={{ fontWeight: "bold", color: "#333" }}>
              {cat === "SAFE"
                ? "Safe & Vault"
                : cat === "POWERSPORTS"
                ? "Motorcycle / ATV"
                : cat.charAt(0) + cat.slice(1).toLowerCase()}
            </div>
          </div>
        ))}
      </MenuGrid>
    </div>
  );
}
