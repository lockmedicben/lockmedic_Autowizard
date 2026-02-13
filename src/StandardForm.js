import React from "react";
import { Card, Content, Button, InputText, Heading } from "./JobberUI";

export default function StandardForm({ category, onBack }) {
  const getTitle = () => {
    if (category === "SAFE") return "Safe & Vault Service";
    if (category === "POWERSPORTS") return "Motorcycle / ATV Key";
    return `${category.charAt(0) + category.slice(1).toLowerCase()} Locksmith`;
  };

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
          <Heading level={2}>{getTitle()}</Heading>
          <div style={{ height: "20px" }} />

          <div style={{ display: "grid", gap: "15px" }}>
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "bold",
                }}
              >
                Contact Info
              </label>
              <InputText placeholder="Full Name" />
              <div style={{ height: "10px" }} />
              <InputText placeholder="Phone Number" />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "bold",
                }}
              >
                Service Location
              </label>
              <InputText placeholder="Address, City, Zip" />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "bold",
                }}
              >
                How can we help?
              </label>
              <textarea
                placeholder="Describe the issue (e.g. 'Front door lock is stuck', 'Need combo changed')"
                style={{
                  width: "100%",
                  height: "100px",
                  padding: "10px",
                  borderRadius: "4px",
                  border: "1px solid #dcdcdc",
                  fontFamily: "inherit",
                  resize: "vertical",
                }}
              />
            </div>
          </div>

          <div style={{ marginTop: "30px" }}>
            <Button
              label="Request Service"
              fullWidth
              onClick={() => alert("This would send to Jobber!")}
            />
          </div>
        </Content>
      </Card>
    </div>
  );
}
