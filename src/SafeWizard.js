import React, { useState } from "react";

// --- REUSABLE COMPONENTS ---
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
    primary: { background: "#6c757d", color: "#fff" }, // Grey for Safes
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

export default function SafeWizard() {
  // --- STATE ---
  const [situation, setSituation] = useState("");
  const [situationDetails, setSituationDetails] = useState("");
  const [photoFile, setPhotoFile] = useState(null);
  const [safeBrand, setSafeBrand] = useState("");
  const [lockBrand, setLockBrand] = useState("");
  const [lockTypes, setLockTypes] = useState({
    mechanical: false,
    electronic: false,
    keylock: false,
    biometric: false,
  });

  // Demographics
  const [isReturningClient, setIsReturningClient] = useState(false);
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [addressStreet, setAddressStreet] = useState("");
  const [addressCity, setAddressCity] = useState("");
  const [addressZip, setAddressZip] = useState("");

  const [formSubmitted, setFormSubmitted] = useState(false);

  const toggleLockType = (key) => {
    setLockTypes((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) setPhotoFile(file);
  };

  const handleSubmit = () => {
    const payload = {
      type: "JOBBER_REQUEST_SAFE",
      situation,
      details: situationDetails,
      photo: photoFile ? photoFile.name : "No photo",
      brandInfo: { safe: safeBrand, lock: lockBrand },
      locks: lockTypes,
      client: {
        isReturning: isReturningClient,
        name: isReturningClient ? "Existing" : clientName,
        phone: clientPhone,
        email: clientEmail,
        address: { street: addressStreet, city: addressCity, zip: addressZip },
      },
    };
    console.log("SAFE REQUEST:", payload);
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
        <div style={{ fontSize: "60px", margin: "20px 0" }}>🔒✅</div>
        <p style={{ fontSize: "16px", color: "#555" }}>
          We have received your safe details and will process the quote shortly.
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
      {/* 1. SITUATION */}
      <Section title="How can we help?">
        <select
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "16px",
            background: "white",
          }}
          value={situation}
          onChange={(e) => setSituation(e.target.value)}
        >
          <option value="">-- Select Situation --</option>
          <option value="ROUTINE">
            I can open safe, need routine service/combo change
          </option>
          <option value="LOCKED_UNKNOWN">
            I CANNOT open safe (Unknown combo or malfunction)
          </option>
          <option value="LOCKED_HANDLE">
            I CANNOT open safe (Combo works, handle spins freely/stuck)
          </option>
          <option value="UPGRADE">
            I can open safe, quote for lock upgrade (Dial -> Electronic)
          </option>
          <option value="OTHER">Something else...</option>
        </select>

        {["OTHER", "LOCKED_HANDLE", "LOCKED_UNKNOWN"].includes(situation) && (
          <textarea
            style={{
              width: "100%",
              marginTop: "15px",
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              fontSize: "16px",
              height: "80px",
              fontFamily: "inherit",
              boxSizing: "border-box",
            }}
            placeholder="Please add any extra details here..."
            value={situationDetails}
            onChange={(e) => setSituationDetails(e.target.value)}
          />
        )}
      </Section>

      {/* 2. PHOTO & DETAILS */}
      <Section title="Safe Details">
        <div
          style={{
            padding: "15px",
            border: "2px dashed #ddd",
            borderRadius: "8px",
            textAlign: "center",
            background: "#f9f9f9",
            marginBottom: "20px",
          }}
        >
          <div style={{ fontSize: "24px", marginBottom: "5px" }}>📸</div>
          <strong>Upload Photo (Recommended)</strong>
          <p style={{ margin: "5px 0 15px", fontSize: "13px", color: "#666" }}>
            A picture helps us identify the lock type instantly.
          </p>
          <input type="file" accept="image/*" onChange={handlePhotoUpload} />
          {photoFile && (
            <div
              style={{ color: "green", fontWeight: "bold", marginTop: "10px" }}
            >
              ✓ Attached: {photoFile.name}
            </div>
          )}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "15px",
          }}
        >
          <Input
            placeholder="Safe Brand (e.g. Liberty)"
            value={safeBrand}
            onChange={(e) => setSafeBrand(e.target.value)}
          />
          <Input
            placeholder="Lock Brand (e.g. S&G)"
            value={lockBrand}
            onChange={(e) => setLockBrand(e.target.value)}
          />
        </div>

        <div style={{ marginTop: "10px" }}>
          <label
            style={{
              fontWeight: "bold",
              display: "block",
              marginBottom: "10px",
            }}
          >
            Lock Type (Check all that apply):
          </label>
          {Object.keys(lockTypes).map((key) => (
            <label
              key={key}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "8px",
                borderBottom: "1px solid #eee",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={lockTypes[key]}
                onChange={() => toggleLockType(key)}
                style={{ width: "18px", height: "18px" }}
              />
              <span style={{ textTransform: "capitalize" }}>{key}</span>
            </label>
          ))}
        </div>
      </Section>

      {/* 3. CONTACT INFO */}
      <Section title="Contact Info">
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "15px",
            padding: "10px",
            background: "#e7f1ff",
            borderRadius: "6px",
          }}
        >
          <input
            type="checkbox"
            checked={isReturningClient}
            onChange={(e) => setIsReturningClient(e.target.checked)}
            style={{ width: "18px", height: "18px" }}
          />
          <span>I have used Lock Medic before</span>
        </label>

        {!isReturningClient && (
          <Input
            placeholder="Full Name"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
          />
        )}
        <Input
          placeholder="Phone Number"
          value={clientPhone}
          onChange={(e) => setClientPhone(e.target.value)}
        />
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
      </Section>

      <Button
        label="Request Safe Quote"
        fullWidth
        disabled={!situation || !clientPhone}
        onClick={handleSubmit}
      />
    </div>
  );
}
