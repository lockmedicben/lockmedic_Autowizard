import React from "react";

// --- REUSABLE COMPONENTS ---
const Button = ({
  onClick,
  label,
  type = "primary",
  fullWidth = false,
  icon,
}) => {
  const baseStyle = {
    padding: "12px 20px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    width: fullWidth ? "100%" : "auto",
    transition: "background 0.2s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  };
  const typeStyles = {
    primary: { background: "#fd7e14", color: "#fff" }, // Orange for Residential
    secondary: { background: "#6c757d", color: "#fff" },
    tertiary: {
      background: "transparent",
      color: "#666",
      border: "1px solid #ccc",
    },
  };
  return (
    <button onClick={onClick} style={{ ...baseStyle, ...typeStyles[type] }}>
      {icon === "arrowLeft" && "←"} {label}
    </button>
  );
};

const Section = ({ title, children }) => (
  <div
    style={{
      background: "white",
      padding: "20px",
      borderRadius: "8px",
      border: "1px solid #e0e0e0",
      marginBottom: "20px",
    }}
  >
    <h3
      style={{
        marginTop: 0,
        borderBottom: "1px solid #eee",
        paddingBottom: "10px",
        marginBottom: "15px",
        color: "#333",
      }}
    >
      {title}
    </h3>
    {children}
  </div>
);

export default function ResidentialWizard() {
  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", paddingBottom: "40px" }}>
      <Section title="Residential Services">
        <div
          style={{
            padding: "15px",
            background: "#fff3cd",
            border: "1px solid #ffeeba",
            borderRadius: "6px",
            color: "#856404",
            marginBottom: "20px",
          }}
        >
          <strong>Note:</strong> Residential lock repair or rekey services are
          not currently offered (discontinued in 2021).
        </div>

        <p style={{ marginBottom: "15px", color: "#555" }}>
          In the meantime, here is a list of trusted alternate providers in the
          Lenoir City area:
        </p>

        <div style={{ display: "grid", gap: "15px" }}>
          {/* REFERRAL 1 */}
          <div
            style={{
              padding: "15px",
              border: "1px solid #eee",
              borderRadius: "8px",
              background: "#f8f9fa",
            }}
          >
            <div
              style={{ fontWeight: "bold", fontSize: "16px", color: "#333" }}
            >
              David - Premier Locksmithing
            </div>
            <a
              href="tel:8653180579"
              style={{
                display: "block",
                marginTop: "5px",
                color: "#007bff",
                textDecoration: "none",
                fontWeight: "500",
              }}
            >
              📞 (865) 318-0579
            </a>
          </div>

          {/* REFERRAL 2 */}
          <div
            style={{
              padding: "15px",
              border: "1px solid #eee",
              borderRadius: "8px",
              background: "#f8f9fa",
            }}
          >
            <div
              style={{ fontWeight: "bold", fontSize: "16px", color: "#333" }}
            >
              Patrick - Pop-A-Lock
            </div>
            <a
              href="tel:8657659179"
              style={{
                display: "block",
                marginTop: "5px",
                color: "#007bff",
                textDecoration: "none",
                fontWeight: "500",
              }}
            >
              📞 (865) 765-9179
            </a>
          </div>
        </div>
      </Section>

      <Button
        label="Return to Main Menu"
        fullWidth
        onClick={() => window.location.reload()}
        type="tertiary"
      />
    </div>
  );
}
