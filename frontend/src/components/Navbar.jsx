import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const username = localStorage.getItem("loggedInUser");
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // ✅ Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    const credentialId = localStorage.getItem("credentialId");
    localStorage.clear();
    if (credentialId) {
      localStorage.setItem("credentialId", credentialId);
    }

    navigate("/login");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 30px",
        backgroundColor: "white",
        borderBottom: "1px solid #e0e0e0",
        color: "#2c3e50",
        height: "70px", // ✅ Consistent height
      }}
    >
      {/* Logo */}
      <img
        src="/andhraPradesh.png"
        alt="Logo"
        style={{ height: "70px", objectFit: "contain" }} // ✅ Taller but not stretching
      />

      {/* Heading with box styling */}
      <div
        style={{
          backgroundColor: "#f5f5f5",
          padding: "10px 25px",
          borderRadius: "8px",
          fontWeight: "bold",
          fontSize: "20px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        Andhra Pradesh Smart Ration System
      </div>

      {/* Profile dropdown */}
      <div style={{ position: "relative" }} ref={dropdownRef}>
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          style={{
            background: "#2c3e50",
            color: "white",
            borderRadius: "50%",
            width: "42px",
            height: "42px",
            border: "none",
            cursor: "pointer",
            fontSize: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center", // ✅ Center the icon
          }}
        >
          👤
        </button>

        {showDropdown && (
          <div
            style={{
              position: "absolute",
              top: "110%",
              right: 0,
              background: "white",
              color: "#2c3e50",
              padding: "10px",
              borderRadius: "5px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              zIndex: 100,
              minWidth: "160px",
            }}
          >
            {/* ✅ Box-style label for user */}
            <div
              style={{
                backgroundColor: "#f0f0f0",
                padding: "8px 12px",
                borderRadius: "5px",
                marginBottom: "10px",
                fontWeight: "500",
                fontSize: "14px",
              }}
            >
              User: {username}
            </div>

            <button
              onClick={handleLogout}
              style={{
                padding: "6px 12px",
                background: "#e74c3c",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                width: "100%",
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
