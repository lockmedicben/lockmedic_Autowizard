import React, { useState } from "react";
import JobberUI from "./JobberUI";
import { RAW_DATA } from "./vehicleData";

// --- IMAGE IMPORTS (Commented out for now) ---
// import imgBladed from "./assets/ign_bladed.png";
// import imgTwist from "./assets/ign_twist.png";
// import imgPush from "./assets/ign_push.png";
// import imgSlot from "./assets/ign_slot.png";
// import imgFobik from "./assets/ign_fobik.png";

// --- REUSABLE BUTTON COMPONENT ---
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
    primary: { background: "#007bff", color: "#fff" },
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

export default function AutoWizard({ onBack }) {
  // --- 1. CORE STATE ---
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    year: "",
    make: "",
    model: "",
    keyType: "",
  });
  const [filteredMakes, setFilteredMakes] = useState([]);
  const [filteredModels, setFilteredModels] = useState([]);
  const [vehicleDetails, setVehicleDetails] = useState(null);

  // --- 2. SEARCH & LINKED DATA STATE ---
  const [relatedList, setRelatedList] = useState(null);
  const [relatedTitle, setRelatedTitle] = useState("");
  const [activeFilters, setActiveFilters] = useState({});

  // --- 3. VIN DECODER STATE ---
  const [vin, setVin] = useState("");
  const [isLoadingVin, setIsLoadingVin] = useState(false);

  // --- DERIVED LISTS ---
  const years = Array.from({ length: 2026 - 1985 + 1 }, (_, i) => 2026 - i);

  /* --- HELPER: GET IGNITION IMAGE (Disabled) ---
  const getIgnitionImage = (vehicle) => {
    if (!vehicle) return null;
    const searchString = JSON.stringify(vehicle).toUpperCase();

    if (searchString.includes("FOBIK")) return imgFobik;
    if (searchString.includes("PUSH BUTTON") || searchString.includes("SMART KEY") || searchString.includes("PROX")) return imgPush;
    if (searchString.includes("TWIST") || searchString.includes("KNOB")) return imgTwist;
    if (searchString.includes("SLOT") || searchString.includes("INSERT")) return imgSlot;
    
    return imgBladed; 
  };
  */

  // --- SMART HANDLER: VIN SEARCH (Auto-Select Model + Case Fix) ---
  const handleVinDecode = async () => {
    if (vin.length !== 17) {
      alert("VIN must be 17 characters.");
      return;
    }
    setIsLoadingVin(true);

    try {
      const response = await fetch(
        `https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vin}?format=json`
      );
      const data = await response.json();
      const results = data.Results;
      const getVal = (name) => results.find((r) => r.Variable === name)?.Value;

      const year = parseInt(getVal("Model Year"));
      const apiMake = getVal("Make")?.toUpperCase(); // e.g. "SUBARU"
      const modelPartial = getVal("Model")?.toUpperCase(); // e.g. "FORESTER"

      if (year && apiMake) {
        // STEP 0: Find the "Real" Make in our database (e.g. match "SUBARU" to "Subaru")
        // We look for a make in RAW_DATA that matches the API make (case-insensitive)
        const realMake = [...new Set(RAW_DATA.map((v) => v.Make))].find(
          (m) => m.toUpperCase() === apiMake
        );

        // If we don't carry this brand, stop here.
        if (!realMake) {
          alert(
            `VIN Decoded: ${year} ${apiMake}. \nHowever, this brand is not in your database.`
          );
          return;
        }

        // 1. Calculate Valid Models using the REAL Make
        const validModels = [
          ...new Set(
            RAW_DATA.filter((v) => {
              const start = v.StartYear || v["Start Year"] || v.Year;
              const end = v.EndYear || v["End Year"] || v.Year;
              const isYearMatch =
                (start <= year && end >= year) || v.Year === year;
              return isYearMatch && v.Make === realMake; // Strict match works now!
            }).map((v) => v.Model)
          ),
        ].sort();

        // 2. Try to find the best Model match
        let selectedModel = "";

        if (validModels.length === 1) {
          selectedModel = validModels[0];
        } else if (validModels.includes(modelPartial)) {
          selectedModel = modelPartial;
        } else {
          const matches = validModels.filter((m) =>
            m.toUpperCase().includes(modelPartial)
          );
          if (matches.length === 1) {
            selectedModel = matches[0];
          }
        }

        // 3. Update State using realMake (e.g. "Subaru") instead of apiMake ("SUBARU")
        setFormData({
          year,
          make: realMake,
          model: selectedModel,
          keyType: "",
        });
        setFilteredMakes([realMake]);
        setFilteredModels(validModels);

        if (!selectedModel) {
          alert(
            `VIN Decoded: ${year} ${realMake} ${modelPartial}\nPlease select the specific Ignition Type from the dropdown.`
          );
        }
      } else {
        alert("Could not decode VIN details.");
      }
    } catch (error) {
      console.error(error);
      alert("Error connecting to VIN service.");
    } finally {
      setIsLoadingVin(false);
    }
  };

  // --- HANDLERS: DROPDOWNS ---
  // --- SMART HANDLER: YEAR CHANGE ---
  const handleYearChange = (e) => {
    const y = parseInt(e.target.value);
    setFormData({ year: y, make: "", model: "", keyType: "" });
    if (y) {
      // SMART FILTER: Checks "StartYear", "Start Year", and "Year"
      const makes = [
        ...new Set(
          RAW_DATA.filter((v) => {
            const start = v.StartYear || v["Start Year"] || v.Year;
            const end = v.EndYear || v["End Year"] || v.Year;
            return (start <= y && end >= y) || v.Year === y;
          }).map((v) => v.Make)
        ),
      ].sort();

      setFilteredMakes(makes);
    }
  };

  // --- SMART HANDLER: MAKE CHANGE ---
  const handleMakeChange = (e) => {
    const m = e.target.value;
    setFormData((prev) => ({ ...prev, make: m, model: "", keyType: "" }));

    if (m && formData.year) {
      // SMART FILTER: MODELS
      const models = [
        ...new Set(
          RAW_DATA.filter((v) => {
            const start = v.StartYear || v["Start Year"] || v.Year;
            const end = v.EndYear || v["End Year"] || v.Year;
            const isYearMatch =
              (start <= formData.year && end >= formData.year) ||
              v.Year === formData.year;
            return isYearMatch && v.Make === m;
          }).map((v) => v.Model)
        ),
      ].sort();

      setFilteredModels(models);
    }
  };

  const handleModelChange = (e) => {
    setFormData((prev) => ({ ...prev, model: e.target.value }));
  };

  // --- SMART HANDLER: FIND VEHICLE ---
  const findVehicle = () => {
    // We use the same "Smart Logic" here to ensure we match what the dropdowns showed
    const found = RAW_DATA.find((v) => {
      const start = v.StartYear || v["Start Year"] || v.Year;
      const end = v.EndYear || v["End Year"] || v.Year;

      // Check Year Match
      const isYearMatch =
        (start <= formData.year && end >= formData.year) ||
        v.Year === formData.year;

      // Check Make & Model Match
      return (
        isYearMatch && v.Make === formData.make && v.Model === formData.model
      );
    });

    if (found) {
      setVehicleDetails(found);
      setStep(3);
    } else {
      // debug helper: shows what we looked for vs what we have
      console.log("Failed to find:", formData);
      alert("Vehicle not found in database. Please check selections.");
    }
  };

  // --- HANDLER: EXPORT DATABASE ---
  const downloadMasterData = () => {
    const jsonString = JSON.stringify(RAW_DATA, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "lockmedic_master_database.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- HANDLER: LINKED SEARCH ---
  const handleRelatedSearch = (key, value, label) => {
    if (!value || value === "N/A" || !vehicleDetails) return;

    // Filter by Brand AND Value
    const matches = RAW_DATA.filter((vehicle) => {
      const isSameBrand = vehicle.Make === vehicleDetails.Make;
      const isMatch =
        String(vehicle[key]).trim().toUpperCase() ===
        String(value).trim().toUpperCase();
      return isSameBrand && isMatch;
    });

    setRelatedTitle(`${label}: ${value} (in ${vehicleDetails.Make})`);
    setRelatedList(matches);
    setActiveFilters({});
  };

  // --- COMPONENT: CLICKABLE LINK ---
  const ClickableField = ({ label, value, dataKey }) => {
    return (
      <div style={{ marginBottom: "5px" }}>
        <div
          style={{
            fontSize: "11px",
            color: "#999",
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
        >
          {label}
        </div>
        <button
          onClick={() => handleRelatedSearch(dataKey, value, label)}
          style={{
            background: "transparent",
            border: "none",
            padding: 0,
            fontSize: "16px",
            color: "#007bff",
            fontWeight: "600",
            cursor: "pointer",
            textAlign: "left",
            textDecoration: "underline",
          }}
        >
          {value}
        </button>
      </div>
    );
  };

  // --- RENDER: LINKED SEARCH RESULTS ---
  const renderRelatedView = () => {
    const filteredList = relatedList.filter((item) => {
      return Object.entries(activeFilters).every(([key, val]) => {
        if (!val) return true;
        return String(item[key]) === val;
      });
    });

    const availableMakes = [...new Set(relatedList.map((i) => i.Make))].sort();
    const availableKeyways = [
      ...new Set(
        relatedList
          .map((i) => {
            return (
              i.Keyway || i["Key Type"] || i["Blade/Keyway"] || i.Blade || "N/A"
            );
          })
          .filter((k) => k && k !== "N/A")
      ),
    ].sort();

    return (
      <div>
        <h3 style={{ marginTop: 0, color: "#333" }}>Linked Data Search</h3>
        <div
          style={{
            padding: "10px",
            background: "#e7f1ff",
            borderRadius: "8px",
            marginBottom: "15px",
            color: "#0056b3",
            fontSize: "14px",
          }}
        >
          Searching for: <strong>{relatedTitle}</strong>
          <br />
          Found <strong>{filteredList.length}</strong> matches
        </div>

        {/* Filter Bar */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
          <select
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              flex: 1,
            }}
            value={activeFilters.Make || ""}
            onChange={(e) =>
              setActiveFilters((prev) => ({ ...prev, Make: e.target.value }))
            }
          >
            <option value="">All Makes</option>
            {availableMakes.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>

          <select
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              flex: 1,
            }}
            value={activeFilters.Keyway || ""}
            onChange={(e) =>
              setActiveFilters((prev) => ({ ...prev, Keyway: e.target.value }))
            }
          >
            <option value="">All Keyways</option>
            {availableKeyways.map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>

          {(activeFilters.Make || activeFilters.Keyway) && (
            <button
              onClick={() => setActiveFilters({})}
              style={{ padding: "8px", cursor: "pointer" }}
            >
              Clear
            </button>
          )}
        </div>

        {/* List of Matches */}
        <div
          style={{
            display: "grid",
            gap: "10px",
            maxHeight: "400px",
            overflowY: "auto",
          }}
        >
          {filteredList.map((v, idx) => {
            const start = v.StartYear || v["Start Year"] || v.Year;
            const end = v.EndYear || v["End Year"] || v.Year;
            const yearDisplay =
              start && end && start !== end
                ? `${start}-${end}`
                : start || end || "Year N/A";

            return (
              <div
                key={idx}
                style={{
                  padding: "10px",
                  border: "1px solid #eee",
                  background: "white",
                  borderRadius: "5px",
                }}
              >
                <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                  {v.Make} {v.Model}
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    color: "#007bff",
                    fontWeight: "600",
                    marginTop: "2px",
                  }}
                >
                  {yearDisplay}
                </div>
                <div
                  style={{ fontSize: "12px", color: "#888", marginTop: "2px" }}
                >
                  {v.Keyway || v["Key Type"] || v["Blade/Keyway"] || ""}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: "20px" }}>
          <Button
            label="Back to Vehicle"
            type="secondary"
            fullWidth
            onClick={() => setRelatedList(null)}
          />
        </div>
      </div>
    );
  };

  // --- STEP 1: SELECT VEHICLE ---
  const renderStep1 = () => (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      <h3 style={{ textAlign: "center" }}>Vehicle Selection</h3>

      {/* VIN SEARCH */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          borderBottom: "1px solid #eee",
          paddingBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Enter 17-char VIN"
          value={vin}
          onChange={(e) => setVin(e.target.value.toUpperCase())}
          maxLength={17}
          style={{
            flex: 1,
            padding: "10px",
            fontSize: "14px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <Button
          label={isLoadingVin ? "..." : "Decode"}
          onClick={handleVinDecode}
          disabled={vin.length < 17 || isLoadingVin}
          type="secondary"
        />
      </div>

      {/* DROPDOWNS */}
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>Year</label>
        <select
          value={formData.year}
          onChange={handleYearChange}
          style={{ width: "100%", padding: "10px" }}
        >
          <option value="">Select Year...</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>Make</label>
        <select
          value={formData.make}
          onChange={handleMakeChange}
          disabled={!formData.year}
          style={{ width: "100%", padding: "10px" }}
        >
          <option value="">Select Make...</option>
          {filteredMakes.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>Model</label>
        <select
          value={formData.model}
          onChange={handleModelChange}
          disabled={!formData.make}
          style={{ width: "100%", padding: "10px" }}
        >
          <option value="">Select Model...</option>
          {filteredModels.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        {onBack && (
          <Button
            type="tertiary"
            label="Menu"
            onClick={onBack}
            icon="arrowLeft"
          />
        )}
        <Button
          label="Find Vehicle"
          fullWidth
          onClick={findVehicle}
          disabled={!formData.model}
        />
      </div>
    </div>
  );

  // --- STEP 3: VEHICLE CARD ---
  const renderStep3 = () => {
    if (relatedList) return renderRelatedView();
    const v = vehicleDetails;
    if (!v) return <div>Loading...</div>;

    const ignoredKeys = [
      "Make",
      "Model",
      "Year",
      "Start Year",
      "End Year",
      "StartYear",
      "EndYear",
      "Notes",
      "Note",
      "Comments",
    ];
    const dataFields = Object.entries(v).filter(([key, val]) => {
      if (ignoredKeys.includes(key)) return false;
      if (!val || val === "N/A" || val === "—" || val === "") return false;
      return true;
    });

    return (
      <div>
        <h2 style={{ marginTop: 0, textAlign: "center" }}>
          {v.Year || v.StartYear} {v.Make} {v.Model}
        </h2>

        {/* IGNITION IMAGE (Commented out) 
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <img 
            src={getIgnitionImage(v)} 
            alt="Ignition Type" 
            style={{ height: '80px', opacity: 0.8 }} 
          />
          <div style={{ fontSize: '10px', color: '#999', marginTop: '5px' }}>
            VISUAL REFERENCE ONLY
          </div>
        </div>
        */}

        {/* DYNAMIC DATA GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
            background: "white",
            padding: "20px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            marginBottom: "20px",
          }}
        >
          {dataFields.map(([key, val]) => (
            <ClickableField key={key} label={key} value={val} dataKey={key} />
          ))}
        </div>

        {/* NOTES */}
        {(v.Notes || v.Note || v.Comments) && (
          <div
            style={{
              padding: "15px",
              background: "#fff3cd",
              borderRadius: "6px",
              marginBottom: "20px",
            }}
          >
            <strong>Notes:</strong> {v.Notes || v.Note || v.Comments}
          </div>
        )}

        {/* BUTTONS */}
        <div style={{ display: "flex", gap: "10px" }}>
          <Button type="tertiary" label="Back" onClick={() => setStep(1)} />
          <Button
            label="Next: Service Selection"
            fullWidth
            onClick={() => setStep(4)}
          />
        </div>
      </div>
    );
  };

  // --- STEP 4: SERVICE SELECTION ---
  const renderStep4 = () => (
    <JobberUI
      vehicle={vehicleDetails}
      onBack={() => setStep(3)}
      onSubmit={(data) => {
        console.log("Job Submitted:", data);
        alert("Job Request Sent!");
        window.location.reload();
      }}
    />
  );

  // --- MAIN RENDER ---
  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      {step === 1 && renderStep1()}
      {step === 3 && renderStep3()}
      {step === 4 && renderStep4()}
    </div>
  );
}
