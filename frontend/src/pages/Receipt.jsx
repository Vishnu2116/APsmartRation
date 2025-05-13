import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const products = [
  {
    id: 11,
    name: "Rice (5kg)",
    price: 320,
  },
  {
    id: 12,
    name: "Wheat Flour (10kg)",
    price: 420,
  },
  {
    id: 13,
    name: "Sunflower Oil (1L)",
    price: 120,
  },
  {
    id: 14,
    name: "Toor Dal (1kg)",
    price: 140,
  },
  {
    id: 15,
    name: "Sugar (1kg)",
    price: 48,
  },
  {
    id: 16,
    name: "Salt (1kg)",
    price: 22,
  },
  {
    id: 17,
    name: "Milk (1L)",
    price: 52,
  },
  {
    id: 18,
    name: "Tea Powder (500g)",
    price: 160,
  },
  {
    id: 19,
    name: "Bath Soap (Pack of 3)",
    price: 75,
  },
  {
    id: 20,
    name: "Toothpaste (150g)",
    price: 60,
  },
];

export default function Receipt() {
  const location = useLocation();
  const navigate = useNavigate();
  const status = new URLSearchParams(location.search).get("status");

  const [items, setItems] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "{}");
    const filtered = products
      .filter((p) => savedCart[p.id])
      .map((p) => ({
        ...p,
        quantity: savedCart[p.id],
        total: savedCart[p.id] * p.price,
      }));

    setItems(filtered);

    // ✅ Clear the cart after rendering the receipt
    setTimeout(() => {
      localStorage.removeItem("cart");
    }, 1000);
  }, []);

  const total = items.reduce((sum, item) => sum + item.total, 0);

  return (
    <div style={{ padding: "20px 0" }}>
      <h2
        style={{
          fontSize: "28px",
          textAlign: "center",
          color: status === "paid" ? "#2ecc71" : "#e74c3c",
          marginBottom: "30px",
        }}
      >
        {status === "paid" ? "✅ Payment Successful" : "❌ Payment Failed"}
      </h2>

      {items.length > 0 ? (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "30px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          <thead style={{ background: "#f9f9f9" }}>
            <tr>
              <th style={cellStyle}>Product</th>
              <th style={cellStyle}>Quantity</th>
              <th style={cellStyle}>Price</th>
              <th style={cellStyle}>Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td style={cellStyle}>{item.name}</td>
                <td style={cellStyle}>{item.quantity}</td>
                <td style={cellStyle}>₹{item.price}</td>
                <td style={cellStyle}>₹{item.total}</td>
              </tr>
            ))}
            <tr>
              <td
                colSpan="3"
                style={{
                  textAlign: "right",
                  padding: "15px",
                  fontWeight: "bold",
                }}
              >
                Total
              </td>
              <td style={{ padding: "15px", fontWeight: "bold" }}>₹{total}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p style={{ textAlign: "center", fontStyle: "italic" }}>
          No items found in this transaction.
        </p>
      )}

      <div style={{ textAlign: "center" }}>
        <button
          onClick={() => navigate("/dashboard")}
          style={{
            padding: "12px 24px",
            fontSize: "16px",
            backgroundColor: "#2c3e50",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Go to Dashboard →
        </button>
      </div>
    </div>
  );
}

const cellStyle = {
  padding: "12px",
  borderBottom: "1px solid #eee",
  textAlign: "left",
};
