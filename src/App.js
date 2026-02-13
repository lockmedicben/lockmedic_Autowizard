import React, { useState } from "react";
import MainMenu from "./MainMenu";

// Import all your modules
import AutoWizard from "./AutoWizard";
import PowersportsWizard from "./PowersportsWizard";
import CommercialWizard from "./CommercialWizard";
import SafeWizard from "./SafeWizard";
import ResidentialWizard from "./ResidentialWizard";

export default function App() {
  const [currentModule, setCurrentModule] = useState("MENU"); // Default to Main Menu

  const handleBackToMenu = () => setCurrentModule("MENU");

  // Reusable "Back" button for top of pages
  const BackButton = () => (
    <button
      onClick={handleBackToMenu}
      style={{
        background: "transparent",
        border: "none",
        color: "#666",
        cursor: "pointer",
        padding: "10px 0",
        fontSize: "14px",
        marginBottom: "10px",
        display: "flex",
        alignItems: "center",
        gap: "5px",
      }}
    >
      ← Back to Main Menu
    </button>
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f6f8",
        padding: "20px 10px",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* 1. MAIN MENU */}
      {currentModule === "MENU" && <MainMenu onNavigate={setCurrentModule} />}

      {/* 2. AUTOMOTIVE */}
      {currentModule === "AUTO" && (
        <div>
          <BackButton />
          <AutoWizard />
        </div>
      )}

      {/* 3. POWERSPORTS */}
      {currentModule === "POWERSPORTS" && (
        <div>
          <BackButton />
          <PowersportsWizard />
        </div>
      )}

      {/* 4. COMMERCIAL */}
      {currentModule === "COMMERCIAL" && (
        <div>
          <BackButton />
          <CommercialWizard />
        </div>
      )}

      {/* 5. SAFES */}
      {currentModule === "SAFES" && (
        <div>
          <BackButton />
          <SafeWizard />
        </div>
      )}

      {/* 6. RESIDENTIAL */}
      {currentModule === "RESIDENTIAL" && (
        <div>
          <BackButton />
          <ResidentialWizard />
        </div>
      )}
    </div>
  );
}
