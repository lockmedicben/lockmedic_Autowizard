import React from "react";

// --- STYLED COMPONENTS ---

export const Card = ({ children, style }) => (
  <div
    style={{
      background: "white",
      borderRadius: "8px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      overflow: "hidden",
      ...style,
    }}
  >
    {children}
  </div>
);

export const Content = ({ children, style }) => (
  <div style={{ padding: "20px", ...style }}>{children}</div>
);

export const Heading = ({ level = 1, children, style }) => {
  const Tag = `h${level}`;
  return (
    <Tag
      style={{
        margin: 0,
        color: "#2e3b4e",
        fontSize: level === 1 ? "24px" : "18px",
        fontWeight: "bold",
        ...style,
      }}
    >
      {children}
    </Tag>
  );
};

export const InputText = ({ style, ...props }) => (
  <input
    type="text"
    style={{
      width: "100%",
      padding: "12px",
      borderRadius: "4px",
      border: "1px solid #dcdcdc",
      fontSize: "16px",
      outline: "none",
      boxSizing: "border-box",
      ...style,
    }}
    {...props}
  />
);

export const Button = ({
  label,
  onClick,
  type = "primary",
  fullWidth,
  icon,
  style,
}) => {
  const baseStyle = {
    padding: "12px 20px",
    borderRadius: "4px",
    border: "none",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    transition: "background 0.2s",
    width: fullWidth ? "100%" : "auto",
    ...style,
  };

  const variants = {
    primary: { background: "#0070e0", color: "white" },
    secondary: { background: "#f2f2f2", color: "#333" },
    tertiary: { background: "transparent", color: "#666", padding: "8px 0" },
  };

  return (
    <button onClick={onClick} style={{ ...baseStyle, ...variants[type] }}>
      {icon === "arrowLeft" && <span>←</span>}
      {label}
    </button>
  );
};
