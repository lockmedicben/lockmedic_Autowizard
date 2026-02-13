import React, { useState } from "react";

// --- REUSABLE COMPONENTS (Matches your other Wizards) ---
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
    primary: { background: "#17a2b8", color: "#fff" }, // Teal for Powersports
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

export default function PowersportsWizard() {
  // --- STATE ---
  const [serviceType, setServiceType] = useState("");
  const [serviceDetails, setServiceDetails] = useState("");

  const [unitType, setUnitType] = useState("");
  const [rvType, setRvType] = useState("");
  const [rvChassis, setRvChassis] = useState("");
  const [rvPhoto, setRvPhoto] = useState(null);

  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");

  const [ignitionType, setIgnitionType] = useState("");
  const [boatIgnitionLoc, setBoatIgnitionLoc] = useState("");
  const [outboardBrand, setOutboardBrand] = useState("");
  const [outboardYear, setOutboardYear] = useState("");

  // Demographics
  const [isReturningClient, setIsReturningClient] = useState(false);
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [addressStreet, setAddressStreet] = useState("");
  const [addressCity, setAddressCity] = useState("");
  const [addressZip, setAddressZip] = useState("");

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleRvPhoto = (e) => {
    if (e.target.files[0]) setRvPhoto(e.target.files[0]);
  };

  const handleSubmit = () => {
    const payload = {
      type: "JOBBER_REQUEST_POWERSPORTS",
      service: { type: serviceType, details: serviceDetails },
      unit: { type: unitType, subType: rvType, year, make, model },
      rvChassis,
      rvPhoto: rvPhoto ? rvPhoto.name : "N/A",
      ignition: ignitionType,
      boatDetails: {
        location: boatIgnitionLoc,
        engine: outboardBrand,
        year: outboardYear,
      },
      client: {
        isReturning: isReturningClient,
        name: isReturningClient ? "Existing" : clientName,
        phone: clientPhone,
        email: clientEmail,
        address: { street: addressStreet, city: addressCity, zip: addressZip },
      },
    };
    console.log("POWERSPORTS REQUEST:", payload);
    setFormSubmitted(true);
  };

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
        <h2 style={{ color: "#17a2b8" }}>Request Received!</h2>
        <div style={{ fontSize: "60px", margin: "20px 0" }}>🚤✅</div>
        <p style={{ fontSize: "16px", color: "#555" }}>
          We have received your powersports request and will be in touch
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

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", paddingBottom: "40px" }}>
      {/* 1. SERVICE NEEDED */}
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
          value={serviceType}
          onChange={(e) => setServiceType(e.target.value)}
        >
          <option value="">-- Select Service --</option>
          <option value="LOST_KEYS">Lockout / Replace Lost Keys</option>
          <option value="SPARE_KEYS">Provide Spare Keys</option>
          <option value="REPAIR">Lock Repair / Replacement</option>
          <option value="OTHER">Something Else</option>
        </select>

        {serviceType === "OTHER" && (
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
            placeholder="Please explain what you need..."
            value={serviceDetails}
            onChange={(e) => setServiceDetails(e.target.value)}
          />
        )}
      </Section>

      {/* 2. UNIT DETAILS */}
      <Section title="Unit Details">
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
          value={unitType}
          onChange={(e) => {
            setUnitType(e.target.value);
            setIgnitionType("");
            setRvType(""); // Reset RV sub-type
          }}
        >
          <option value="">-- Select Unit Type --</option>
          <option value="MOTORCYCLE">Motorcycle / Scooter / Trike</option>
          <option value="BOAT">Boat / Marine</option>
          <option value="ATV">ATV / UTV / Slingshot</option>
          <option value="GOLF_CART">Golf Cart / LSV</option>
          <option value="RV">RV / Motorhome / Camper</option>
          <option value="JETSKI">Jet Ski / PWC</option>
          <option value="OTHER">Other</option>
        </select>

        {/* RV SUB-TYPE */}
        {unitType === "RV" && (
          <div
            style={{
              marginBottom: "15px",
              padding: "15px",
              background: "#fff8e1",
              borderRadius: "8px",
              border: "1px solid #ffecb3",
            }}
          >
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
                fontSize: "14px",
                color: "#555",
              }}
            >
              RV Type
            </label>
            <select
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                fontSize: "16px",
                background: "white",
              }}
              value={rvType}
              onChange={(e) => setRvType(e.target.value)}
            >
              <option value="">-- Select RV Type --</option>
              <option value="CLASS_A">Class A (Bus Style)</option>
              <option value="CLASS_B">Class B (Van Conversion)</option>
              <option value="CLASS_C">Class C (Cab Over)</option>
              <option value="TOWABLE">Travel Trailer / 5th Wheel</option>
            </select>
            {(rvType === "CLASS_B" || rvType === "CLASS_C") && (
              <div
                style={{ fontSize: "13px", color: "#d32f2f", marginTop: "8px" }}
              >
                *Please enter the <strong>CHASSIS</strong> info (e.g. Ford
                E450), NOT the Coach brand.
              </div>
            )}
          </div>
        )}

        {/* MAKE / MODEL INPUTS (Skip for Towables) */}
        {rvType !== "TOWABLE" && (
          <div style={{ display: "grid", gap: "10px" }}>
            <Input
              placeholder="Year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
            <Input
              placeholder={
                rvType === "CLASS_A"
                  ? "Coach Make (e.g. Thor)"
                  : "Make (e.g. Honda, Yamaha)"
              }
              value={make}
              onChange={(e) => setMake(e.target.value)}
            />
            <Input
              placeholder="Model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
            />

            {rvType === "CLASS_A" && (
              <Input
                placeholder="Chassis Manufacturer (Optional)"
                value={rvChassis}
                onChange={(e) => setRvChassis(e.target.value)}
              />
            )}
          </div>
        )}

        {/* TOWABLE PHOTO */}
        {rvType === "TOWABLE" && (
          <div
            style={{
              padding: "15px",
              border: "2px dashed #ccc",
              borderRadius: "8px",
              textAlign: "center",
              background: "#f9f9f9",
            }}
          >
            <div style={{ fontSize: "24px", marginBottom: "5px" }}>📸</div>
            <strong>Upload Lock Photo</strong>
            <p
              style={{ margin: "5px 0 15px", fontSize: "13px", color: "#666" }}
            >
              For trailers, a photo of the lock is the most helpful info.
            </p>
            <input type="file" accept="image/*" onChange={handleRvPhoto} />
          </div>
        )}
      </Section>

      {/* 3. BOAT SPECIFICS */}
      {unitType === "BOAT" && (
        <Section title="Boat Ignition Details">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginBottom: "15px",
            }}
          >
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
                name="boatLoc"
                value="DASH"
                checked={boatIgnitionLoc === "DASH"}
                onChange={() => setBoatIgnitionLoc("DASH")}
              />
              Dash Mounted
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
                name="boatLoc"
                value="THROTTLE"
                checked={boatIgnitionLoc === "THROTTLE"}
                onChange={() => setBoatIgnitionLoc("THROTTLE")}
              />
              Throttle Control (Outboard)
            </label>
          </div>

          {boatIgnitionLoc === "THROTTLE" && (
            <div
              style={{ paddingLeft: "15px", borderLeft: "3px solid #17a2b8" }}
            >
              <Input
                placeholder="Outboard Brand (e.g. Mercury)"
                value={outboardBrand}
                onChange={(e) => setOutboardBrand(e.target.value)}
              />
              <Input
                placeholder="Approx Year"
                value={outboardYear}
                onChange={(e) => setOutboardYear(e.target.value)}
              />
            </div>
          )}
        </Section>
      )}

      {/* 4. KEY TYPE (Simplified) */}
      {rvType !== "TOWABLE" && (
        <Section title="Key Type">
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {[
              "Mechanical (Standard)",
              "Transponder (Chip)",
              "Fob / Keyless",
            ].map((type) => (
              <button
                key={type}
                onClick={() => setIgnitionType(type)}
                style={{
                  padding: "10px 15px",
                  borderRadius: "20px",
                  border:
                    ignitionType === type
                      ? "2px solid #17a2b8"
                      : "1px solid #ddd",
                  background: ignitionType === type ? "#e0f7fa" : "white",
                  color: ignitionType === type ? "#006064" : "#333",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                {type}
              </button>
            ))}
          </div>
        </Section>
      )}

      {/* 5. CONTACT INFO */}
      <Section title="Contact & Location">
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
        label="Request Quote"
        fullWidth
        disabled={!unitType || !clientPhone || !serviceType}
        onClick={handleSubmit}
      />
    </div>
  );
}
