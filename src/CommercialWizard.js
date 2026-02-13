import React, { useState } from "react";

// --- REUSABLE COMPONENTS (Matches your SafeWizard style) ---
const Button = ({
  onClick,
  label,
  type = "primary",
  fullWidth = false,
  disabled = false,
  icon,
}) => {
  const baseStyle = {
    padding: "12px 20px",
    borderRadius: "8px",
    border: "none",
    cursor: disabled ? "not-allowed" : "pointer",
    fontSize: "16px",
    fontWeight: "600",
    width: fullWidth ? "100%" : "auto",
    transition: "background 0.2s",
    opacity: disabled ? 0.6 : 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  };
  const typeStyles = {
    primary: { background: "#28a745", color: "#fff" }, // Green for Commercial
    secondary: { background: "#6c757d", color: "#fff" },
    tertiary: {
      background: "transparent",
      color: "#666",
      border: "1px solid #ccc",
    },
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{ ...baseStyle, ...typeStyles[type] }}
    >
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

const Input = ({ label, ...props }) => (
  <div style={{ marginBottom: "15px" }}>
    {label && (
      <label
        style={{
          display: "block",
          marginBottom: "5px",
          fontWeight: "500",
          fontSize: "14px",
          color: "#555",
        }}
      >
        {label}
      </label>
    )}
    <input
      style={{
        width: "100%",
        padding: "10px",
        borderRadius: "6px",
        border: "1px solid #ccc",
        fontSize: "16px",
        boxSizing: "border-box",
      }}
      {...props}
    />
  </div>
);

export default function CommercialWizard() {
  // --- STATE ---
  const [scope, setScope] = useState("");
  const [scopeDetails, setScopeDetails] = useState("");
  const [isExistingClient, setIsExistingClient] = useState(false);
  const [doorCount, setDoorCount] = useState("");
  const [keyCount, setKeyCount] = useState("");

  // Demographics
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [addressStreet, setAddressStreet] = useState("");
  const [addressCity, setAddressCity] = useState("");
  const [addressZip, setAddressZip] = useState("");

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = () => {
    const payload = {
      type: "JOBBER_REQUEST_COMMERCIAL",
      scope,
      details: scopeDetails,
      clientStatus: isExistingClient ? "EXISTING" : "NEW",
      jobMetrics: { doors: doorCount, keys: keyCount },
      contact: {
        company: companyName,
        name: contactName,
        phone,
        email,
        address: { street: addressStreet, city: addressCity, zip: addressZip },
      },
    };
    console.log("COMMERCIAL REQUEST:", payload);
    setFormSubmitted(true);
  };

  // --- SUCCESS VIEW ---
  if (formSubmitted) {
    return (
      <div
        style={{
          padding: "40px 20px",
          maxWidth: "600px",
          margin: "0 auto",
          textAlign: "center",
          background: "white",
          borderRadius: "8px",
        }}
      >
        <h2 style={{ color: "#28a745" }}>Request Received!</h2>
        <div style={{ fontSize: "60px", margin: "20px 0" }}>🏢✅</div>
        <p style={{ fontSize: "16px", color: "#555" }}>
          We have received your commercial request and will process the quote
          shortly.
        </p>
        <div style={{ height: "30px" }} />
        <Button
          label="Back to Main Menu"
          fullWidth
          onClick={() => window.location.reload()}
        />
      </div>
    );
  }

  // --- FORM VIEW ---
  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", paddingBottom: "40px" }}>
      {/* 1. SCOPE OF WORK */}
      <Section title="How can we help?">
        <select
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "16px",
            background: "white",
            marginBottom: "15px",
          }}
          value={scope}
          onChange={(e) => setScope(e.target.value)}
        >
          <option value="">-- Select Service --</option>
          <option value="REKEY">Rekey (New keys, old keys inoperative)</option>
          <option value="HARDWARE">Repair, replace or upgrade hardware</option>
          <option value="ACCESS_QUOTE">Access control system quote</option>
          <option value="ACCESS_REPAIR">
            Access control system repair or expansion
          </option>
          <option value="OTHER">Other / Something Else</option>
        </select>

        <label
          style={{
            display: "block",
            marginBottom: "5px",
            fontWeight: "500",
            fontSize: "14px",
            color: "#555",
          }}
        >
          Details / Work Orders:
        </label>
        <textarea
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "16px",
            height: "100px",
            fontFamily: "inherit",
            boxSizing: "border-box",
          }}
          placeholder="Paste work orders here or describe details..."
          value={scopeDetails}
          onChange={(e) => setScopeDetails(e.target.value)}
        />
      </Section>

      {/* 2. JOB SIZE & STATUS */}
      <Section title="Job Details">
        <div
          style={{
            marginBottom: "20px",
            padding: "15px",
            background: "#f8f9fa",
            borderRadius: "8px",
          }}
        >
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "10px",
              cursor: "pointer",
            }}
          >
            <input
              type="radio"
              checked={!isExistingClient}
              onChange={() => setIsExistingClient(false)}
            />
            New Client
          </label>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              cursor: "pointer",
            }}
          >
            <input
              type="radio"
              checked={isExistingClient}
              onChange={() => setIsExistingClient(true)}
            />
            Existing Client (Service within last 2 years)
          </label>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "15px",
          }}
        >
          <Input
            label="Doors to Service"
            placeholder="#"
            type="number"
            value={doorCount}
            onChange={(e) => setDoorCount(e.target.value)}
          />
          <Input
            label="Total Keys Needed"
            placeholder="#"
            type="number"
            value={keyCount}
            onChange={(e) => setKeyCount(e.target.value)}
          />
        </div>
      </Section>

      {/* 3. CONTACT INFO */}
      <Section title="Contact & Location">
        <Input
          placeholder="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <Input
          placeholder="Contact Person Name"
          value={contactName}
          onChange={(e) => setContactName(e.target.value)}
        />
        <Input
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <Input
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div
          style={{
            marginTop: "20px",
            borderTop: "1px solid #eee",
            paddingTop: "20px",
          }}
        >
          <Input
            placeholder="Street Address"
            value={addressStreet}
            onChange={(e) => setAddressStreet(e.target.value)}
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              gap: "10px",
            }}
          >
            <Input
              placeholder="City"
              value={addressCity}
              onChange={(e) => setAddressCity(e.target.value)}
            />
            <Input
              placeholder="Zip"
              value={addressZip}
              onChange={(e) => setAddressZip(e.target.value)}
            />
          </div>
        </div>
      </Section>

      <Button
        label="Request Commercial Quote"
        fullWidth
        disabled={!scope || !contactName || !phone}
        onClick={handleSubmit}
      />
    </div>
  );
}
