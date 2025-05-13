export default function Dashboard() {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "60px 30px",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      {/* Heading */}
      <h1 style={{ fontSize: "32px", marginBottom: "30px" }}>
        Welcome to Smart Grocer
      </h1>

      {/* Instructions */}
      <div
        style={{
          background: "linear-gradient(135deg, #e6e9ec, #f5f5f5)",
          padding: "25px 30px",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.06)",
          textAlign: "left",
          marginBottom: "40px",
          border: "1px solid #ddd",
        }}
      >
        <h3 style={{ marginBottom: "15px", color: "#2c3e50" }}>
          Handler Instructions:
        </h3>
        <ul
          style={{
            lineHeight: "1.8",
            paddingLeft: "20px",
            color: "#333",
            fontSize: "15px",
          }}
        >
          <li>
            Verify the customer’s identity before starting the billing session.
          </li>
          <li>
            Click on “Start New Bill” to open the product selection screen.
          </li>
          <li>Add items to the cart based on what the customer chooses.</li>
          <li>Click “View Bill” to review the order and proceed to payment.</li>
          <li>
            The customer must authenticate using their system fingerprint at
            checkout.
          </li>
          <li>
            If authentication fails, restart the billing process from the
            beginning.
          </li>
          <li>
            Ensure the system is connected to the internet and fingerprint
            services are accessible.
          </li>
        </ul>
      </div>

      {/* Start Button */}
      <button
        onClick={() => {
          localStorage.removeItem("cart"); // ✅ clear cart
          window.location.href = "/products"; // or navigate("/products")
        }}
        style={{
          padding: "14px 28px",
          fontSize: "16px",
          backgroundColor: "#2c3e50",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Start New Bill
      </button>
    </div>
  );
}
