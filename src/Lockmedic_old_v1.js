import React, { useState, useEffect } from "react";
import {
  InputText,
  Card,
  Button,
  Heading,
  Text,
  Content,
} from "@jobber/components";
import "@jobber/design/foundation.css";
// IMPORT YOUR DATABASE
import { VEHICLE_DATABASE } from "./vehicleData";

// --- 1. STATIC DATA ---
const YEAR_OPTIONS = [];
for (let i = 2026; i >= 1980; i--) {
  YEAR_OPTIONS.push({ label: i.toString(), value: i.toString() });
}

// Clean Static List of Makes (Fallback)
const POPULAR_MAKES = [
  "Acura",
  "Alfa Romeo",
  "Aston Martin",
  "Audi",
  "Bentley",
  "BMW",
  "Bugatti",
  "Buick",
  "Cadillac",
  "Chevrolet",
  "Chrysler",
  "Dodge",
  "Ferrari",
  "Fiat",
  "Fisker",
  "Ford",
  "Genesis",
  "Geo",
  "GMC",
  "Honda",
  "Hummer",
  "Hyundai",
  "Infiniti",
  "Isuzu",
  "Jaguar",
  "Jeep",
  "Karma",
  "Kia",
  "Lamborghini",
  "Land Rover",
  "Lexus",
  "Lincoln",
  "Lotus",
  "Lucid",
  "Maserati",
  "Maybach",
  "Mazda",
  "McLaren",
  "Mercedes-Benz",
  "Mercury",
  "Mini",
  "Mitsubishi",
  "Nissan",
  "Oldsmobile",
  "Plymouth",
  "Polestar",
  "Pontiac",
  "Porsche",
  "Ram",
  "Rivian",
  "Rolls-Royce",
  "Saab",
  "Saturn",
  "Scion",
  "Smart",
  "Subaru",
  "Suzuki",
  "Tesla",
  "Toyota",
  "Volkswagen",
  "Volvo",
].map((m) => ({ label: m, value: m.toUpperCase() }));

// --- IGNITION TYPES CONFIGURATION ---
const AUTO_IGNITION_TYPES = [
  {
    id: "TRADITIONAL",
    emoji: "🔑",
    title: "Traditional Key (Insert & Twist)",
    desc: "Metal key (includes flip/switchblade keys, and remote head keys)",
    exampleImages: [
      {
        src: "https://placehold.co/200x150/png?text=Standard+Metal+Key",
        label: "Standard Key",
      },
      {
        src: "https://placehold.co/200x150/png?text=Switchblade+Key",
        label: "Flip/Switchblade",
      },
    ],
  },
  {
    id: "PUSH_BUTTON",
    emoji: "🔘",
    title: "Push-to-Start Button (Smart key)",
    desc: "Key stays in your pocket or purse, press button to start",
    exampleImages: [
      {
        src: "https://placehold.co/200x150/png?text=Smart+Fob",
        label: "Smart Proximity Fob",
      },
      {
        src: "https://placehold.co/200x150/png?text=Push+Start+Button",
        label: "Dash Button",
      },
    ],
  },
  {
    id: "FOBIK",
    emoji: "🔳",
    title: "Plastic Key / Fobik",
    desc: "Plastic tip inserts into socket and turns like a key (Common in Dodge/Chrysler/Mercedes)",
    exampleImages: [
      {
        src: "https://placehold.co/200x150/png?text=Dodge+Fobik",
        label: "Fobik Remote",
      },
      {
        src: "https://placehold.co/200x150/png?text=Mercedes+IR+Key",
        label: "Mercedes IR Key",
      },
    ],
  },
  {
    id: "SLOT_BUTTON",
    emoji: "📥",
    title: "Dash Slot + Start Button",
    desc: "Insert fob into slot, THEN press separate button (BMW, Mini, etc)",
    exampleImages: [
      {
        src: "https://placehold.co/200x150/png?text=BMW+Slot+Fob",
        label: "Rectangular Slot Fob",
      },
      {
        src: "https://placehold.co/200x150/png?text=Dash+Insert+Slot",
        label: "Dashboard Slot",
      },
    ],
  },
  {
    id: "PUSH_KEY",
    emoji: "⬇️",
    title: "Push-Key Ignition",
    desc: "Insert the whole key and PUSH the back of the key to start (VW Passat/CC)",
    exampleImages: [
      {
        src: "https://placehold.co/200x150/png?text=VW+Push+Key",
        label: "VW Smart Key",
      },
    ],
  },
  {
    id: "TWIST_KNOB",
    emoji: "🎛️",
    title: "Twist Knob Smart Key",
    desc: "Key stays in pocket, you turn a plastic knob on the ignition switch",
    exampleImages: [
      {
        src: "https://placehold.co/200x150/png?text=Ignition+Twist+Knob",
        label: "Fixed Plastic Knob",
      },
      {
        src: "https://placehold.co/200x150/png?text=Oval+Smart+Key",
        label: "Nissan/Mazda Fob",
      },
    ],
  },
];

const POWERSPORTS_IGNITION_TYPES = [
  {
    id: "PS_METAL",
    emoji: "🔑",
    title: "Metal Key (Insert & Turn)",
    desc: "Traditional key you insert into the ignition and turn.",
    exampleImages: [
      {
        src: "https://placehold.co/200x150/png?text=Motorcycle+Key",
        label: "Bike Key",
      },
      {
        src: "https://placehold.co/200x150/png?text=Boat+Key",
        label: "Boat Key",
      },
    ],
  },
  {
    id: "PS_SMART",
    emoji: "📡",
    title: "Smart Fob (Keyless)",
    desc: "Key stays in your pocket. You press a start button or flip a switch.",
    exampleImages: [
      {
        src: "https://placehold.co/200x150/png?text=Harley+Fob",
        label: "Harley Smart Fob",
      },
      {
        src: "https://placehold.co/200x150/png?text=Ducati+Key",
        label: "Ducati/Indian Fob",
      },
    ],
  },
  {
    id: "PS_LANYARD",
    emoji: "🔌",
    title: "Safety Lanyard / Clip-on Key",
    desc: "A cap or dongle that clips onto a post. Often attached to life jacket.",
    exampleImages: [
      {
        src: "https://placehold.co/200x150/png?text=SeaDoo+Key",
        label: "D.E.S.S. Key",
      },
      {
        src: "https://placehold.co/200x150/png?text=JetSki+Lanyard",
        label: "Safety Lanyard",
      },
    ],
  },
];

// --- 2. MAIN MENU ---
function MainMenu({ onSelect }) {
  const menuButtonStyle = {
    cursor: "pointer",
    border: "2px solid #e0e0e0",
    borderRadius: "8px",
    backgroundColor: "white",
    marginBottom: "16px",
    transition: "border-color 0.2s",
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <Heading level={1}>Lock Medic Service Request</Heading>
      <Text>Select a service to begin your instant quote.</Text>

      <div style={{ marginTop: "20px" }}>
        {/* AUTOMOTIVE */}
        <div onClick={() => onSelect("AUTOMOTIVE")} style={menuButtonStyle}>
          <div style={{ padding: "16px" }}>
            <Heading level={3}>Automotive</Heading>
            <Text>
              Lost key replacement. Spare keys added. Broken locks or keys
              fixed.
            </Text>
          </div>
        </div>

        {/* POWERSPORTS & MARINE */}
        <div onClick={() => onSelect("POWERSPORTS")} style={menuButtonStyle}>
          <div style={{ padding: "16px" }}>
            <Heading level={3}>Powersports & Marine</Heading>
            <Text>Motorcycles, Boats, ATVs, RVs, Jet Skis.</Text>
          </div>
        </div>

        {/* SAFE & VAULT */}
        <div onClick={() => onSelect("SAFE")} style={menuButtonStyle}>
          <div style={{ padding: "16px" }}>
            <Heading level={3}>Safe & Vault</Heading>
            <Text>Opening, repair, combo changes, lock upgrades.</Text>
          </div>
        </div>

        {/* COMMERCIAL */}
        <div onClick={() => onSelect("COMMERCIAL")} style={menuButtonStyle}>
          <div style={{ padding: "16px" }}>
            <Heading level={3}>Commercial</Heading>
            <Text>
              Complete door service, rekeying, master keying, access control.
            </Text>
          </div>
        </div>

        {/* RESIDENTIAL */}
        <div
          onClick={() => onSelect("RESIDENTIAL")}
          style={{ ...menuButtonStyle, opacity: 0.7 }}
        >
          <div style={{ padding: "16px" }}>
            <Heading level={3}>Residential</Heading>
            <Text>Home rekeying, lockouts, smart locks (Coming Soon).</Text>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- 3. AUTOMOTIVE FORM (WITH LISHI TOOL & CODE SERIES FIX) ---
function AutomotiveFlow({ onBack }) {
  // --- STATE: SERVICE ---
  const [serviceType, setServiceType] = useState("");
  const [serviceIssues, setServiceIssues] = useState("");

  // --- STATE: VEHICLE ---
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [vin, setVin] = useState("");

  // --- STATE: CLIENT & ADDRESS ---
  const [isReturningClient, setIsReturningClient] = useState(false);
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [addressStreet, setAddressStreet] = useState("");
  const [addressCity, setAddressCity] = useState("");
  const [addressZip, setAddressZip] = useState("");

  // --- STATE: DETAILS ---
  const [ignitionType, setIgnitionType] = useState("");
  const [keySystemInfo, setKeySystemInfo] = useState(null);
  const [features, setFeatures] = useState({
    keylessEntry: false,
    powerHatch: false,
    powerSliders: false,
    remoteStart: false,
    smartPark: false,
  });

  // --- UI STATE ---
  const [viewExamplesFor, setViewExamplesFor] = useState(null);
  const [isDecoding, setIsDecoding] = useState(false);
  const [decodeMsg, setDecodeMsg] = useState(null);
  const [manualEntryMode, setManualEntryMode] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // --- STYLES ---
  const inputStyle = {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #dcdcdc",
    backgroundColor: "white",
    fontSize: "16px",
    marginTop: "8px",
    boxSizing: "border-box",
  };
  const labelStyle = {
    fontWeight: "bold",
    fontSize: "14px",
    marginTop: "16px",
    display: "block",
    color: "#555",
  };
  const radioCardStyle = (isSelected) => ({
    border: isSelected ? "2px solid #0070e0" : "1px solid #dcdcdc",
    backgroundColor: isSelected ? "#f0f7ff" : "white",
    borderRadius: "8px",
    padding: "12px",
    marginBottom: "10px",
    transition: "all 0.2s ease",
  });

  // --- LOGIC: DATABASE LOOKUP & FILTERING ---
  const hasDb = VEHICLE_DATABASE && Object.keys(VEHICLE_DATABASE).length > 0;

  const availableMakes = hasDb
    ? Object.keys(VEHICLE_DATABASE).sort()
    : POPULAR_MAKES.map((m) => m.value);

  const availableModels =
    hasDb && make && VEHICLE_DATABASE[make]
      ? Object.keys(VEHICLE_DATABASE[make]).sort()
      : [];

  useEffect(() => {
    if (hasDb && make && model && year) {
      const modelData = VEHICLE_DATABASE[make]?.[model];
      if (modelData) {
        const match = modelData.find((entry) =>
          entry.years.includes(parseInt(year))
        );
        if (match) {
          setKeySystemInfo(match);
          // AUTO-RESET IGNITION if not allowed
          if (
            match.allowedIgnitions &&
            !match.allowedIgnitions.includes(ignitionType)
          ) {
            setIgnitionType("");
          }
        } else {
          setKeySystemInfo(null);
        }
      }
    } else {
      setKeySystemInfo(null);
    }
  }, [make, model, year, hasDb]);

  // --- LOGIC: FILTER IGNITION TYPES ---
  const visibleIgnitionTypes = AUTO_IGNITION_TYPES.filter((type) => {
    if (keySystemInfo && keySystemInfo.allowedIgnitions) {
      return keySystemInfo.allowedIgnitions.includes(type.id);
    }
    return true;
  });

  // --- VIN DECODER ---
  const handleDecodeVin = () => {
    if (vin.length < 17) {
      setDecodeMsg({
        type: "error",
        text: "Please enter a full 17-character VIN.",
      });
      return;
    }
    setIsDecoding(true);
    setDecodeMsg(null);

    fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/${vin}?format=json`
    )
      .then((res) => res.json())
      .then((data) => {
        const vehicle = data.Results[0];
        if (vehicle && vehicle.Make && vehicle.Model) {
          const decodedYear = vehicle.ModelYear;
          const decodedMake = vehicle.Make.toUpperCase();
          const decodedModel = vehicle.Model.toUpperCase();

          setYear(decodedYear);
          setMake(decodedMake);

          if (
            hasDb &&
            VEHICLE_DATABASE[decodedMake] &&
            VEHICLE_DATABASE[decodedMake][decodedModel]
          ) {
            setModel(decodedModel);
          } else {
            if (!hasDb) setModel(decodedModel);
            else setModel("");
          }

          setDecodeMsg({
            type: "success",
            text: `✓ Found: ${decodedYear} ${decodedMake} ${decodedModel}`,
          });
        } else {
          setDecodeMsg({
            type: "error",
            text: "Could not identify vehicle. Please enter manually.",
          });
        }
        setIsDecoding(false);
      })
      .catch((err) => {
        setDecodeMsg({ type: "error", text: "Connection error." });
        setIsDecoding(false);
      });
  };

  const handleSubmit = () => {
    const requestPayload = {
      type: "JOBBER_REQUEST_AUTO",
      client: {
        isReturning: isReturningClient,
        name: isReturningClient ? "Existing Client" : clientName,
        phone: clientPhone,
        email: clientEmail,
        address: { street: addressStreet, city: addressCity, zip: addressZip },
      },
      vehicle: { vin, year, make, model, ignition: ignitionType, features },
      techNotes: keySystemInfo,
      request: {
        type: serviceType,
        details: serviceIssues,
      },
    };
    console.log("SENDING TO JOBBER:", requestPayload);
    setFormSubmitted(true);
  };

  const toggleFeature = (key) => {
    setFeatures((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (formSubmitted) {
    return (
      <div
        style={{
          padding: "20px",
          maxWidth: "600px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <Card>
          <Content>
            <Heading level={2}>Request Sent!</Heading>
            <div style={{ margin: "20px 0", fontSize: "40px" }}>✅</div>
            <Text>We have received your automotive request.</Text>
            <div style={{ height: "20px" }} />
            <Button
              label="Start New Request"
              fullWidth
              onClick={() => window.location.reload()}
            />
          </Content>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <Button
        type="tertiary"
        icon="arrowLeft"
        onClick={onBack}
        label="Back to Menu"
      />
      <div style={{ height: "20px" }} />

      <Card>
        <Content>
          <Heading level={2}>Automotive Service</Heading>

          {/* SERVICE NEEDED */}
          <Text>
            <strong>How can we help?</strong>
          </Text>
          <select
            style={inputStyle}
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
          >
            <option value="">-- Select Service --</option>
            <option value="SPARE">I have a working key, I need a spare</option>
            <option value="ALL_LOST">
              I have NO keys (Need new generated)
            </option>
            <option value="ISSUES">I have a key, but it has issues...</option>
          </select>

          {serviceType === "ISSUES" && (
            <textarea
              style={{ ...inputStyle, height: "100px", fontFamily: "inherit" }}
              placeholder="Describe the issue..."
              value={serviceIssues}
              onChange={(e) => setServiceIssues(e.target.value)}
            />
          )}

          <div
            style={{
              height: "20px",
              borderBottom: "1px solid #eee",
              margin: "20px 0",
            }}
          />

          <Heading level={2}>Vehicle Details</Heading>

          {/* VIN DECODER */}
          <Text>Enter VIN for instant decode:</Text>
          <div style={{ display: "flex", gap: "10px", alignItems: "flex-end" }}>
            <div style={{ flex: 1 }}>
              <InputText
                placeholder="17-Digit VIN"
                value={vin}
                onChange={setVin}
              />
            </div>
            <Button
              label={isDecoding ? "..." : "Decode"}
              onClick={handleDecodeVin}
              disabled={isDecoding || vin.length < 5}
            />
          </div>
          {decodeMsg && (
            <div
              style={{
                marginTop: "10px",
                color: decodeMsg.type === "success" ? "green" : "red",
              }}
            >
              {decodeMsg.text}
            </div>
          )}

          <div style={{ marginTop: "10px", textAlign: "right" }}>
            <Button
              type="tertiary"
              label={manualEntryMode ? "Use Dropdowns" : "Manual Entry"}
              onClick={() => setManualEntryMode(!manualEntryMode)}
            />
          </div>

          {/* VEHICLE INPUTS */}
          {manualEntryMode ? (
            <div style={{ display: "grid", gap: "10px" }}>
              <InputText placeholder="Year" value={year} onChange={setYear} />
              <InputText placeholder="Make" value={make} onChange={setMake} />
              <InputText
                placeholder="Model"
                value={model}
                onChange={setModel}
              />
            </div>
          ) : (
            <div>
              <label style={labelStyle}>Year</label>
              <select
                style={inputStyle}
                value={year}
                onChange={(e) => setYear(e.target.value)}
              >
                <option value="">-- Year --</option>
                {YEAR_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>

              <label style={labelStyle}>Make</label>
              <select
                style={inputStyle}
                value={make}
                onChange={(e) => {
                  setMake(e.target.value);
                  setModel("");
                }}
              >
                <option value="">-- Make --</option>
                {availableMakes.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>

              <label style={labelStyle}>Model</label>
              <select
                style={inputStyle}
                value={model}
                onChange={(e) => setModel(e.target.value)}
                disabled={!make}
              >
                <option value="">-- Model --</option>
                {availableModels.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* TECH INFO BOX - UPDATED WITH LISHI TOOL */}
          {keySystemInfo && (
            <div
              style={{
                marginTop: "15px",
                padding: "12px",
                background: "#2e3b4e",
                color: "#fff",
                borderRadius: "6px",
                fontFamily: "monospace",
                fontSize: "12px",
              }}
            >
              <div
                style={{
                  fontWeight: "bold",
                  borderBottom: "1px solid #555",
                  marginBottom: "8px",
                  paddingBottom: "4px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>🔒 TECH DATA</span>
                <span style={{ color: "#4caf50" }}>
                  LISHI: {keySystemInfo.lishiTool || "Unknown"}
                </span>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "5px",
                }}
              >
                <div>
                  <span style={{ color: "#aaa" }}>System:</span>{" "}
                  {keySystemInfo.system}
                </div>
                <div>
                  <span style={{ color: "#aaa" }}>Ref:</span>{" "}
                  {keySystemInfo.ilcoRef}
                </div>
                <div>
                  <span style={{ color: "#aaa" }}>Series:</span>{" "}
                  {keySystemInfo.codeSeries}
                </div>
                <div>
                  <span style={{ color: "#aaa" }}>Chip:</span>{" "}
                  {keySystemInfo.transponder}
                </div>
              </div>
              <div
                style={{
                  marginTop: "8px",
                  fontStyle: "italic",
                  color: "#ffd700",
                }}
              >
                "{keySystemInfo.note}"
              </div>
            </div>
          )}

          <div style={{ height: "30px", borderBottom: "1px solid #eee" }} />

          {/* DYNAMIC IGNITION TYPES */}
          <Heading level={2}>Key & Ignition Type</Heading>
          <div style={{ marginTop: "16px" }}>
            {visibleIgnitionTypes.length > 0 ? (
              visibleIgnitionTypes.map((type) => (
                <div
                  key={type.id}
                  onClick={() => setIgnitionType(type.id)}
                  style={radioCardStyle(ignitionType === type.id)}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "15px",
                    }}
                  >
                    {type.image ? (
                      <img
                        src={type.image}
                        alt=""
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "contain",
                        }}
                      />
                    ) : (
                      <span style={{ fontSize: "28px" }}>{type.emoji}</span>
                    )}
                    <div style={{ flex: 1 }}>
                      <strong>{type.title}</strong>
                      <div
                        style={{
                          fontSize: "12px",
                          color: "#666",
                          marginTop: "2px",
                        }}
                      >
                        {type.desc}
                      </div>
                      <div
                        style={{
                          color: "#0070e0",
                          fontSize: "12px",
                          fontWeight: "bold",
                          marginTop: "6px",
                          cursor: "pointer",
                          display: "inline-block",
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setViewExamplesFor(
                            viewExamplesFor === type.id ? null : type.id
                          );
                        }}
                      >
                        {viewExamplesFor === type.id
                          ? "Hide Examples"
                          : "📷 See Examples"}
                      </div>
                    </div>
                    {ignitionType === type.id && (
                      <div style={{ color: "#0070e0", fontSize: "20px" }}>
                        ✓
                      </div>
                    )}
                  </div>
                  {viewExamplesFor === type.id && (
                    <div
                      style={{
                        marginTop: "15px",
                        paddingTop: "15px",
                        borderTop: "1px dashed #ccc",
                      }}
                    >
                      <Text>
                        <strong>Examples:</strong>
                      </Text>
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          marginTop: "10px",
                          overflowX: "auto",
                        }}
                      >
                        {type.exampleImages.map((img, idx) => (
                          <div key={idx} style={{ textAlign: "center" }}>
                            <img
                              src={img.src}
                              alt={img.label}
                              style={{
                                height: "100px",
                                borderRadius: "4px",
                                border: "1px solid #eee",
                              }}
                            />
                            <div
                              style={{
                                fontSize: "10px",
                                color: "#666",
                                marginTop: "4px",
                              }}
                            >
                              {img.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <Text>
                No known ignition types found for this vehicle. Please use
                manual entry.
              </Text>
            )}
          </div>

          <div style={{ marginTop: "20px" }}>
            <Heading level={4}>Vehicle Features on your key</Heading>
            <div style={{ display: "grid", gap: "10px", marginTop: "10px" }}>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={features.keylessEntry}
                  onChange={() => toggleFeature("keylessEntry")}
                />
                Keyless Entry (Lock/Unlock)
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
                  type="checkbox"
                  checked={features.remoteStart}
                  onChange={() => toggleFeature("remoteStart")}
                />
                Remote Start
              </label>
            </div>
          </div>

          <div style={{ height: "30px", borderBottom: "1px solid #eee" }} />

          <Heading level={2}>Contact Info</Heading>
          <div style={{ display: "grid", gap: "16px" }}>
            <InputText
              placeholder="Full Name"
              value={clientName}
              onChange={setClientName}
            />
            <InputText
              placeholder="Phone Number"
              value={clientPhone}
              onChange={setClientPhone}
            />
            <InputText
              placeholder="Email Address"
              value={clientEmail}
              onChange={setClientEmail}
            />
            <InputText
              placeholder="Zip Code"
              value={addressZip}
              onChange={setAddressZip}
            />
          </div>
        </Content>
      </Card>

      <div style={{ height: "20px" }} />
      <Button
        label="Request Quote"
        fullWidth
        disabled={!year || !make || !model || !clientPhone}
        onClick={handleSubmit}
      />
    </div>
  );
}
// --- 4. SAFE & VAULT FORM ---
function SafeFlow({ onBack }) {
  // --- STATE ---
  const [situation, setSituation] = useState(""); // Moved to top
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

  // --- STYLES ---
  const inputStyle = {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #dcdcdc",
    backgroundColor: "white",
    fontSize: "16px",
    marginTop: "8px",
    boxSizing: "border-box",
  };
  const labelStyle = {
    fontWeight: "bold",
    fontSize: "14px",
    marginTop: "16px",
    display: "block",
    color: "#555",
  };
  const checkboxStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    margin: "8px 0",
    cursor: "pointer",
  };

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

  if (formSubmitted) {
    return (
      <div
        style={{
          padding: "20px",
          maxWidth: "600px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <Card>
          <Content>
            <Heading level={2}>Safe Request Received!</Heading>
            <div style={{ margin: "20px 0", fontSize: "40px" }}>🔒✅</div>
            <Text>We have received your details.</Text>
            <div style={{ height: "20px" }} />
            <Button
              label="Back to Menu"
              fullWidth
              onClick={() => window.location.reload()}
            />
          </Content>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <Button
        type="tertiary"
        icon="arrowLeft"
        onClick={onBack}
        label="Back to Menu"
      />
      <div style={{ height: "20px" }} />

      <Card>
        <Content>
          <Heading level={2}>Safe & Vault Details</Heading>

          {/* 1. SITUATION (MOVED TO TOP) */}
          <Text>
            <strong>How can we help?</strong>
          </Text>
          <select
            style={inputStyle}
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

          {/* DETAILS TEXT AREA */}
          {(situation === "OTHER" ||
            situation === "LOCKED_HANDLE" ||
            situation === "LOCKED_UNKNOWN") && (
            <textarea
              style={{ ...inputStyle, height: "100px", fontFamily: "inherit" }}
              placeholder="Please add any extra details here..."
              value={situationDetails}
              onChange={(e) => setSituationDetails(e.target.value)}
            />
          )}

          <div
            style={{
              height: "20px",
              borderBottom: "1px solid #eee",
              margin: "20px 0",
            }}
          />

          {/* 2. PHOTO UPLOAD */}
          <div
            style={{
              marginTop: "20px",
              padding: "15px",
              border: "2px dashed #ccc",
              borderRadius: "8px",
              textAlign: "center",
              backgroundColor: "#fafafa",
            }}
          >
            <Heading level={4}>📸 Upload Photo (Recommended)</Heading>
            <Text>
              A picture of the front of your safe helps us instantly identify
              major components and lock brands/types.
            </Text>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              style={{ marginTop: "10px" }}
            />
            {photoFile && (
              <div
                style={{
                  marginTop: "10px",
                  color: "green",
                  fontWeight: "bold",
                }}
              >
                ✓ Attached: {photoFile.name}
              </div>
            )}
          </div>

          {/* OPTIONAL BRAND INFO */}
          <div style={{ marginTop: "16px" }}>
            <Text>
              <strong>Safe Details (If known)</strong>
            </Text>
            <div style={{ display: "grid", gap: "10px", marginTop: "8px" }}>
              <InputText
                placeholder="Safe Brand & Model (e.g. Liberty, Cannon)"
                value={safeBrand}
                onChange={setSafeBrand}
              />
              <InputText
                placeholder="Lock Brand (e.g. S&G, La Gard)"
                value={lockBrand}
                onChange={setLockBrand}
              />
            </div>
          </div>

          <div
            style={{
              height: "20px",
              borderBottom: "1px solid #eee",
              marginBottom: "20px",
            }}
          />

          {/* 3. LOCK TYPES */}
          <Heading level={4}>
            What kind of locks are on it? (If your safe has more than one, check
            all that apply)
          </Heading>
          <div style={{ display: "grid", gap: "5px", marginTop: "10px" }}>
            <label style={checkboxStyle}>
              <input
                type="checkbox"
                checked={lockTypes.mechanical}
                onChange={() => toggleLockType("mechanical")}
              />
              Mechanical Dial (Spin dial left/right)
            </label>
            <label style={checkboxStyle}>
              <input
                type="checkbox"
                checked={lockTypes.electronic}
                onChange={() => toggleLockType("electronic")}
              />
              Electronic Keypad (Buttons)
            </label>
            <label style={checkboxStyle}>
              <input
                type="checkbox"
                checked={lockTypes.keylock}
                onChange={() => toggleLockType("keylock")}
              />
              Key Lock
            </label>
            <label style={checkboxStyle}>
              <input
                type="checkbox"
                checked={lockTypes.biometric}
                onChange={() => toggleLockType("biometric")}
              />
              Biometric (Fingerprint)
            </label>
          </div>

          <div
            style={{
              height: "30px",
              borderBottom: "1px solid #eee",
              marginBottom: "20px",
            }}
          />

          {/* 4. CONTACT INFO */}
          <Heading level={2}>Contact Info</Heading>
          <div
            style={{
              margin: "10px 0",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <input
              type="checkbox"
              id="returningSafe"
              checked={isReturningClient}
              onChange={(e) => setIsReturningClient(e.target.checked)}
              style={{ width: "20px", height: "20px" }}
            />
            <label
              htmlFor="returningSafe"
              style={{ fontSize: "16px", cursor: "pointer" }}
            >
              I have used Lock Medic before (since 2019)
            </label>
          </div>

          <div style={{ display: "grid", gap: "16px" }}>
            {!isReturningClient && (
              <InputText
                placeholder="Full Name"
                value={clientName}
                onChange={setClientName}
              />
            )}
            <InputText
              placeholder="Phone Number"
              value={clientPhone}
              onChange={setClientPhone}
            />
            <InputText
              placeholder="Email Address"
              value={clientEmail}
              onChange={setClientEmail}
            />

            <Text>Safe Location (Address)</Text>
            <InputText
              placeholder="Street Address"
              value={addressStreet}
              onChange={setAddressStreet}
            />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr",
                gap: "10px",
              }}
            >
              <InputText
                placeholder="City"
                value={addressCity}
                onChange={setAddressCity}
              />
              <InputText
                placeholder="Zip Code"
                value={addressZip}
                onChange={setAddressZip}
              />
            </div>
          </div>
        </Content>
      </Card>

      <div style={{ height: "20px" }} />
      <Button
        label="Request Safe Quote"
        fullWidth
        disabled={!situation || !clientPhone}
        onClick={handleSubmit}
      />
    </div>
  );
}

// --- 5. COMMERCIAL FORM ---
function CommercialFlow({ onBack }) {
  // --- STATE ---
  const [scope, setScope] = useState(""); // Moved to top
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

  // --- STYLES ---
  const inputStyle = {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #dcdcdc",
    backgroundColor: "white",
    fontSize: "16px",
    marginTop: "8px",
    boxSizing: "border-box",
  };
  const labelStyle = {
    fontWeight: "bold",
    fontSize: "14px",
    marginTop: "16px",
    display: "block",
    color: "#555",
  };

  // Vertical Radio Buttons
  const radioGroupStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginTop: "10px",
  };
  const radioLabelStyle = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
    fontSize: "16px",
  };

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

  if (formSubmitted) {
    return (
      <div
        style={{
          padding: "20px",
          maxWidth: "600px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <Card>
          <Content>
            <Heading level={2}>Request Received!</Heading>
            <div style={{ margin: "20px 0", fontSize: "40px" }}>🏢✅</div>
            <Text>We have received your commercial request.</Text>
            <div style={{ height: "20px" }} />
            <Button
              label="Back to Menu"
              fullWidth
              onClick={() => window.location.reload()}
            />
          </Content>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <Button
        type="tertiary"
        icon="arrowLeft"
        onClick={onBack}
        label="Back to Menu"
      />
      <div style={{ height: "20px" }} />

      <Card>
        <Content>
          <Heading level={2}>Commercial Services</Heading>

          {/* 1. SCOPE DROPDOWN (MOVED TO TOP) */}
          <Text>
            <strong>How can we help?</strong>
          </Text>
          <select
            style={inputStyle}
            value={scope}
            onChange={(e) => setScope(e.target.value)}
          >
            <option value="">-- Select Service --</option>
            <option value="REKEY">
              Rekey (New keys, old keys inoperative)
            </option>
            <option value="HARDWARE">
              Repair, replace or upgrade hardware
            </option>
            <option value="ACCESS_QUOTE">Access control system quote</option>
            <option value="ACCESS_REPAIR">
              Access control system repair or expansion
            </option>
            <option value="OTHER">Other / Something Else</option>
          </select>

          {/* ALWAYS VISIBLE TEXT AREA */}
          <label style={labelStyle}>Any other important details?</label>
          <textarea
            style={{ ...inputStyle, height: "100px", fontFamily: "inherit" }}
            placeholder="Paste work orders here or describe details..."
            value={scopeDetails}
            onChange={(e) => setScopeDetails(e.target.value)}
          />

          <div
            style={{
              height: "20px",
              borderBottom: "1px solid #eee",
              margin: "20px 0",
            }}
          />

          {/* 2. CLIENT STATUS */}
          <Text>
            <strong>Are you a new or existing client?</strong>
          </Text>
          <div style={radioGroupStyle}>
            <label style={radioLabelStyle}>
              <input
                type="radio"
                name="clientStatus"
                checked={!isExistingClient}
                onChange={() => setIsExistingClient(false)}
              />
              New Client
            </label>
            <label style={radioLabelStyle}>
              <input
                type="radio"
                name="clientStatus"
                checked={isExistingClient}
                onChange={() => setIsExistingClient(true)}
              />
              Existing Client (Service at this address within the last 2 years)
            </label>
          </div>

          <div
            style={{
              height: "20px",
              borderBottom: "1px solid #eee",
              margin: "20px 0",
            }}
          />

          {/* 3. JOB METRICS */}
          <Heading level={4}>Job Size</Heading>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px",
            }}
          >
            <div>
              <label style={{ fontSize: "14px", color: "#555" }}>
                Number of Doors to service
              </label>
              <InputText
                placeholder="#"
                value={doorCount}
                onChange={setDoorCount}
                keyboardType="numeric"
              />
            </div>
            <div>
              <label style={{ fontSize: "14px", color: "#555" }}>
                TOTAL New Keys Needed
              </label>
              <InputText
                placeholder="#"
                value={keyCount}
                onChange={setKeyCount}
                keyboardType="numeric"
              />
            </div>
          </div>

          <div
            style={{
              height: "30px",
              borderBottom: "1px solid #eee",
              marginBottom: "20px",
            }}
          />

          {/* 4. BUSINESS DEMOGRAPHICS */}
          <Heading level={2}>Contact & Location</Heading>
          <div style={{ display: "grid", gap: "16px" }}>
            <InputText
              placeholder="Company Name"
              value={companyName}
              onChange={setCompanyName}
            />
            <InputText
              placeholder="Contact Person Name"
              value={contactName}
              onChange={setContactName}
            />
            <InputText
              placeholder="Phone Number"
              value={phone}
              onChange={setPhone}
            />
            <InputText
              placeholder="Email Address"
              value={email}
              onChange={setEmail}
            />

            <Text>Service Address</Text>
            <InputText
              placeholder="Street Address"
              value={addressStreet}
              onChange={setAddressStreet}
            />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr",
                gap: "10px",
              }}
            >
              <InputText
                placeholder="City"
                value={addressCity}
                onChange={setAddressCity}
              />
              <InputText
                placeholder="Zip Code"
                value={addressZip}
                onChange={setAddressZip}
              />
            </div>
          </div>
        </Content>
      </Card>

      <div style={{ height: "20px" }} />
      <Button
        label="Request Commercial Quote"
        fullWidth
        disabled={!scope || !contactName || !phone}
        onClick={handleSubmit}
      />
    </div>
  );
}

// --- 6. POWERSPORTS & MARINE FORM ---
function PowersportsFlow({ onBack }) {
  // --- STATE ---
  // Service
  const [serviceType, setServiceType] = useState("");
  const [serviceDetails, setServiceDetails] = useState("");

  // Unit
  const [unitType, setUnitType] = useState("");
  const [rvType, setRvType] = useState("");
  const [rvChassis, setRvChassis] = useState("");
  const [rvPhoto, setRvPhoto] = useState(null);

  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");

  // Ignition
  const [ignitionType, setIgnitionType] = useState("");

  // Boat Specifics
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

  const [viewExamplesFor, setViewExamplesFor] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // --- STYLES ---
  const inputStyle = {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #dcdcdc",
    backgroundColor: "white",
    fontSize: "16px",
    marginTop: "8px",
    boxSizing: "border-box",
  };
  const radioCardStyle = (isSelected) => ({
    border: isSelected ? "2px solid #0070e0" : "1px solid #dcdcdc",
    backgroundColor: isSelected ? "#f0f7ff" : "white",
    borderRadius: "8px",
    padding: "12px",
    marginBottom: "10px",
    transition: "all 0.2s ease",
  });
  const radioGroupStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginTop: "10px",
  };
  const radioLabelStyle = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
    fontSize: "16px",
  };

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
          padding: "20px",
          maxWidth: "600px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <Card>
          <Content>
            <Heading level={2}>Request Received!</Heading>
            <div style={{ margin: "20px 0", fontSize: "40px" }}>🚤✅</div>
            <Text>We have received your powersports request.</Text>
            <div style={{ height: "20px" }} />
            <Button
              label="Back to Menu"
              fullWidth
              onClick={() => window.location.reload()}
            />
          </Content>
        </Card>
      </div>
    );
  }

  // --- LOGIC: Filter Lanyard Option ---
  // Only show Lanyard if unit is Motorcycle, Boat, or Jet Ski
  const visibleIgnitionTypes = POWERSPORTS_IGNITION_TYPES.filter((type) => {
    if (type.id === "PS_LANYARD") {
      return ["MOTORCYCLE", "BOAT", "JETSKI"].includes(unitType);
    }
    return true;
  });

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <Button
        type="tertiary"
        icon="arrowLeft"
        onClick={onBack}
        label="Back to Menu"
      />
      <div style={{ height: "20px" }} />

      <Card>
        <Content>
          <Heading level={2}>Powersports & Marine Details</Heading>

          {/* 1. SERVICE NEEDED */}
          <Text>
            <strong>How can we help?</strong>
          </Text>
          <select
            style={inputStyle}
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
          >
            <option value="">-- Select Service --</option>
            <option value="LOST_KEYS">Lockout / Replace Lost Keys</option>
            <option value="SPARE_KEYS">Provide Spare Keys</option>
            <option value="REPAIR">Lock Repair / Replacement</option>
            <option value="OTHER">Something Else</option>
          </select>

          {/* DETAILS TEXT AREA */}
          {serviceType === "OTHER" && (
            <textarea
              style={{ ...inputStyle, height: "100px", fontFamily: "inherit" }}
              placeholder="Please explain what you need..."
              value={serviceDetails}
              onChange={(e) => setServiceDetails(e.target.value)}
            />
          )}

          <div
            style={{
              height: "20px",
              borderBottom: "1px solid #eee",
              margin: "20px 0",
            }}
          />

          {/* 2. UNIT DETAILS */}
          <Text>
            <strong>What are we working on?</strong>
          </Text>
          <select
            style={inputStyle}
            value={unitType}
            onChange={(e) => {
              setUnitType(e.target.value);
              setIgnitionType(""); // Reset ignition when unit changes
            }}
          >
            <option value="">-- Select Unit Type --</option>
            <option value="MOTORCYCLE">
              Motorcycle / Scooter / Trike (Spyder, Ryker)
            </option>
            <option value="BOAT">Boat / Marine</option>
            <option value="ATV">ATV / UTV / Slingshot / Vanderhall</option>
            <option value="GOLF_CART">Golf Cart / LSV</option>
            <option value="RV">RV / Motorhome / Camper</option>
            <option value="JETSKI">Jet Ski / PWC</option>
            <option value="OTHER">Other</option>
          </select>

          {/* RV SUB-QUESTIONS */}
          {unitType === "RV" && (
            <div
              style={{
                marginTop: "15px",
                padding: "10px",
                backgroundColor: "#fff8e1",
                borderRadius: "8px",
              }}
            >
              <Text>
                <strong>What type of RV?</strong>
              </Text>
              <select
                style={inputStyle}
                value={rvType}
                onChange={(e) => setRvType(e.target.value)}
              >
                <option value="">-- Select RV Type --</option>
                <option value="CLASS_A">Motorhome - Class A (Bus Style)</option>
                <option value="CLASS_B">
                  Motorhome - Class B (Van Conversion)
                </option>
                <option value="CLASS_C">Motorhome - Class C (Cab Over)</option>
                <option value="TOWABLE">
                  Pull-Behind / Travel Trailer / 5th Wheel
                </option>
              </select>
            </div>
          )}

          {/* STANDARD UNIT INPUTS (Hidden for Towables) */}
          {rvType !== "TOWABLE" && (
            <div style={{ display: "grid", gap: "10px", marginTop: "10px" }}>
              {(rvType === "CLASS_B" || rvType === "CLASS_C") && (
                <Text style={{ fontSize: "13px", color: "#d32f2f" }}>
                  *Please enter the <strong>CHASSIS</strong> info (e.g. Ford
                  E450, Mercedes Sprinter), NOT the Coach brand (Winnebago).
                </Text>
              )}

              <InputText placeholder="Year" value={year} onChange={setYear} />
              <InputText
                placeholder={
                  rvType === "CLASS_A"
                    ? "Coach Make (e.g. Thor)"
                    : "Make (e.g. Honda, Ford, E-Z-GO)"
                }
                value={make}
                onChange={setMake}
              />
              <InputText
                placeholder="Model"
                value={model}
                onChange={setModel}
              />

              {rvType === "CLASS_A" && (
                <InputText
                  placeholder="Chassis Manufacturer (Optional)"
                  value={rvChassis}
                  onChange={setRvChassis}
                />
              )}
            </div>
          )}

          {/* TOWABLE PHOTO UPLOAD */}
          {rvType === "TOWABLE" && (
            <div
              style={{
                marginTop: "20px",
                padding: "15px",
                border: "2px dashed #ccc",
                borderRadius: "8px",
                textAlign: "center",
              }}
            >
              <Heading level={4}>📸 Upload Lock Photo</Heading>
              <Text>
                For trailers, a photo of the lock is the most helpful info.
              </Text>
              <input
                type="file"
                accept="image/*"
                onChange={handleRvPhoto}
                style={{ marginTop: "10px" }}
              />
            </div>
          )}

          <div
            style={{
              height: "20px",
              borderBottom: "1px solid #eee",
              margin: "20px 0",
            }}
          />

          {/* 3. KEY TYPE (Hidden for Towables) */}
          {rvType !== "TOWABLE" && (
            <>
              <Heading level={2}>Key Type</Heading>
              <Text>How do you start your machine?</Text>
              <div style={{ marginTop: "16px" }}>
                {visibleIgnitionTypes.map((type) => (
                  <div
                    key={type.id}
                    onClick={() => setIgnitionType(type.id)}
                    style={radioCardStyle(ignitionType === type.id)}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                      }}
                    >
                      {type.image ? (
                        <img
                          src={type.image}
                          alt=""
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "contain",
                          }}
                        />
                      ) : (
                        <span style={{ fontSize: "28px" }}>{type.emoji}</span>
                      )}
                      <div style={{ flex: 1 }}>
                        <strong>{type.title}</strong>
                        <div
                          style={{
                            fontSize: "12px",
                            color: "#666",
                            marginTop: "2px",
                          }}
                        >
                          {type.desc}
                        </div>
                        <div
                          style={{
                            color: "#0070e0",
                            fontSize: "12px",
                            fontWeight: "bold",
                            marginTop: "6px",
                            cursor: "pointer",
                            display: "inline-block",
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setViewExamplesFor(
                              viewExamplesFor === type.id ? null : type.id
                            );
                          }}
                        >
                          {viewExamplesFor === type.id
                            ? "Hide Examples"
                            : "📷 See Examples"}
                        </div>
                      </div>
                      {ignitionType === type.id && (
                        <div style={{ color: "#0070e0", fontSize: "20px" }}>
                          ✓
                        </div>
                      )}
                    </div>
                    {viewExamplesFor === type.id && (
                      <div
                        style={{
                          marginTop: "15px",
                          paddingTop: "15px",
                          borderTop: "1px dashed #ccc",
                        }}
                      >
                        <Text>
                          <strong>Examples:</strong>
                        </Text>
                        <div
                          style={{
                            display: "flex",
                            gap: "10px",
                            marginTop: "10px",
                            overflowX: "auto",
                          }}
                        >
                          {type.exampleImages.map((img, idx) => (
                            <div key={idx} style={{ textAlign: "center" }}>
                              <img
                                src={img.src}
                                alt={img.label}
                                style={{
                                  height: "100px",
                                  borderRadius: "4px",
                                  border: "1px solid #eee",
                                }}
                              />
                              <div
                                style={{
                                  fontSize: "10px",
                                  color: "#666",
                                  marginTop: "4px",
                                }}
                              >
                                {img.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {/* BOAT SPECIFIC QUESTION */}
          {unitType === "BOAT" && (
            <div
              style={{
                marginTop: "20px",
                padding: "15px",
                backgroundColor: "#e3f2fd",
                borderRadius: "8px",
              }}
            >
              <Heading level={4}>Boat Ignition Location</Heading>
              <Text>Where is the ignition switch located?</Text>
              <div style={radioGroupStyle}>
                <label style={radioLabelStyle}>
                  <input
                    type="radio"
                    name="boatLoc"
                    value="DASH"
                    checked={boatIgnitionLoc === "DASH"}
                    onChange={() => setBoatIgnitionLoc("DASH")}
                  />
                  Dash Mounted
                </label>
                <label style={radioLabelStyle}>
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

              {/* THROTTLE DETAILS */}
              {boatIgnitionLoc === "THROTTLE" && (
                <div
                  style={{
                    marginTop: "15px",
                    paddingLeft: "20px",
                    borderLeft: "3px solid #0070e0",
                  }}
                >
                  <Text>
                    <strong>Engine Details</strong>
                  </Text>
                  <div style={{ display: "grid", gap: "10px" }}>
                    <InputText
                      placeholder="Outboard Brand (e.g. Mercury, Yamaha)"
                      value={outboardBrand}
                      onChange={setOutboardBrand}
                    />
                    <InputText
                      placeholder="Approximate Year/Decade"
                      value={outboardYear}
                      onChange={setOutboardYear}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          <div
            style={{
              height: "30px",
              borderBottom: "1px solid #eee",
              marginBottom: "20px",
            }}
          />

          {/* 4. CONTACT INFO */}
          <Heading level={2}>Contact Info</Heading>
          <div
            style={{
              margin: "10px 0",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <input
              type="checkbox"
              id="returningPS"
              checked={isReturningClient}
              onChange={(e) => setIsReturningClient(e.target.checked)}
              style={{ width: "20px", height: "20px" }}
            />
            <label
              htmlFor="returningPS"
              style={{ fontSize: "16px", cursor: "pointer" }}
            >
              I have used Lock Medic before (since 2019)
            </label>
          </div>

          <div style={{ display: "grid", gap: "16px" }}>
            {!isReturningClient && (
              <InputText
                placeholder="Full Name"
                value={clientName}
                onChange={setClientName}
              />
            )}
            <InputText
              placeholder="Phone Number"
              value={clientPhone}
              onChange={setClientPhone}
            />
            <InputText
              placeholder="Email Address"
              value={clientEmail}
              onChange={setClientEmail}
            />

            <Text>Unit Location</Text>
            <InputText
              placeholder="Street Address"
              value={addressStreet}
              onChange={setAddressStreet}
            />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr",
                gap: "10px",
              }}
            >
              <InputText
                placeholder="City"
                value={addressCity}
                onChange={setAddressCity}
              />
              <InputText
                placeholder="Zip Code"
                value={addressZip}
                onChange={setAddressZip}
              />
            </div>
          </div>
        </Content>
      </Card>

      <div style={{ height: "20px" }} />
      <Button
        label="Request Quote"
        fullWidth
        disabled={!unitType || !clientPhone || !serviceType}
        onClick={handleSubmit}
      />
    </div>
  );
}

// --- 7. RESIDENTIAL PLACEHOLDER ---
function ResidentialFlow({ onBack }) {
  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "600px",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <Button
        type="tertiary"
        icon="arrowLeft"
        onClick={onBack}
        label="Back to Menu"
      />
      <div style={{ height: "40px" }} />
      <Card>
        <Content>
          <Heading level={2}>Residential Services</Heading>

          <Text>
            Residential lock repair or rekey services are not currently offered
            (discontinued in 2021).
          </Text>

          <div style={{ height: "10px" }} />

          <Text>
            In the meantime, here is a list of alternate providers in the Lenoir
            City area that do offer residential services:
          </Text>

          <div
            style={{
              textAlign: "left",
              marginTop: "10px",
              padding: "15px",
              background: "#f9f9f9",
              borderRadius: "8px",
            }}
          >
            <div style={{ marginBottom: "8px" }}>
              <strong>David</strong> with Premier Locksmithing
              <br />
              <a
                href="tel:8653180579"
                style={{ color: "#0070e0", textDecoration: "none" }}
              >
                📞 865-318-0579
              </a>
            </div>

            <div>
              <strong>Patrick</strong> with Pop A Lock
              <br />
              <a
                href="tel:8657659179"
                style={{ color: "#0070e0", textDecoration: "none" }}
              >
                📞 865-765-9179
              </a>
            </div>
          </div>

          <div style={{ height: "20px" }} />
          <Button label="Return to Menu" onClick={onBack} />
        </Content>
      </Card>
    </div>
  );
}

// --- 8. APP SHELL ---
export default function App() {
  const [currentScreen, setCurrentScreen] = useState("MENU");
  return (
    <div style={{ background: "#f5f5f5", minHeight: "100vh", padding: "40px" }}>
      {currentScreen === "MENU" && <MainMenu onSelect={setCurrentScreen} />}
      {currentScreen === "AUTOMOTIVE" && (
        <AutomotiveFlow onBack={() => setCurrentScreen("MENU")} />
      )}
      {currentScreen === "COMMERCIAL" && (
        <CommercialFlow onBack={() => setCurrentScreen("MENU")} />
      )}
      {currentScreen === "SAFE" && (
        <SafeFlow onBack={() => setCurrentScreen("MENU")} />
      )}
      {currentScreen === "POWERSPORTS" && (
        <PowersportsFlow onBack={() => setCurrentScreen("MENU")} />
      )}
      {currentScreen === "RESIDENTIAL" && (
        <ResidentialFlow onBack={() => setCurrentScreen("MENU")} />
      )}
    </div>
  );
}
