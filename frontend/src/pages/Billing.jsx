import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const products = [
  {
    id: 11,
    name: "Rice (5kg)",
    description: "Premium quality basmati rice - 5kg pack.",
    price: 320,
    image_url:
      "https://media.istockphoto.com/id/153737841/photo/rice.jpg?s=612x612&w=0&k=20&c=lfO7iLT0UsDDzra0uBOsN1rvr2d5OEtrG2uwbts33_c=",
  },
  {
    id: 12,
    name: "Wheat Flour (10kg)",
    description: "Whole wheat atta - 10kg fresh pack.",
    price: 420,
    image_url:
      "https://media.istockphoto.com/id/172876049/photo/whole-wheat-flour.jpg?s=612x612&w=0&k=20&c=bK48VqkF49oReBRhDoGfMORGapX2iWosEeImG_SXA8Q=",
  },
  {
    id: 13,
    name: "Sunflower Oil (1L)",
    description: "Refined sunflower oil - 1L bottle.",
    price: 120,
    image_url:
      "https://www.sattvicfoods.in/cdn/shop/files/SunflowerOil_1_2365179a-beca-414f-a27c-60075cb26d46.jpg?v=1744799437&width=1946",
  },
  {
    id: 14,
    name: "Toor Dal (1kg)",
    description: "Split pigeon peas (toor dal) - 1kg.",
    price: 140,
    image_url:
      "https://media.istockphoto.com/id/1309871334/photo/pigeon-pea-is-a-common-staple-food-in-south-asia.jpg?s=612x612&w=0&k=20&c=yWxpc8TWT0biIedblcUDobwn5T3QGDGTtLjLiHOMfj8=",
  },
  {
    id: 15,
    name: "Sugar (1kg)",
    description: "Refined granulated sugar - 1kg.",
    price: 48,
    image_url: "https://etimg.etb2bimg.com/photo/90705208.cms",
  },
  {
    id: 16,
    name: "Salt (1kg)",
    description: "Iodized table salt - 1kg packet.",
    price: 22,
    image_url:
      "https://media.istockphoto.com/id/516450576/photo/traditional-glass-salt-cellar.jpg?s=612x612&w=0&k=20&c=H5gLaxswJnnEKRXDbusy-uRCiARroiM-lWRZHjVgV3Y=",
  },
  {
    id: 17,
    name: "Milk (1L)",
    description: "Pasteurized cow milk - 1L packet.",
    price: 52,
    image_url:
      "https://t4.ftcdn.net/jpg/02/31/84/29/360_F_231842968_qThCnmslPbEAwhg7nuW9rAy8qRNhRli7.jpg",
  },
  {
    id: 18,
    name: "Tea Powder (500g)",
    description: "Strong blend tea powder - 500g pack.",
    price: 160,
    image_url: "https://www.pggroupoverseas.com/images/products/tea/3.jpg",
  },
  {
    id: 19,
    name: "Bath Soap (Pack of 3)",
    description: "Herbal bathing soap - 3 bar pack.",
    price: 75,
    image_url:
      "https://www.shutterstock.com/image-photo/natural-handmade-soap-bars-flowers-260nw-1086336182.jpg",
  },
  {
    id: 20,
    name: "Toothpaste (150g)",
    description: "Fluoride toothpaste - 150g tube.",
    price: 60,
    image_url:
      "https://t4.ftcdn.net/jpg/01/63/21/43/360_F_163214384_2y7oMiIhHKxm70pU3dYOFzgKfZ4WO0PG.jpg",
  },
];

export default function Billing() {
  const navigate = useNavigate();
  const [cart, setCart] = useState({});
  const [billItems, setBillItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [authAttempts, setAuthAttempts] = useState(0);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "{}");
    setCart(savedCart);

    const bill = products
      .filter((p) => savedCart[p.id])
      .map((p) => ({
        ...p,
        quantity: savedCart[p.id],
        total: savedCart[p.id] * p.price,
      }));

    setBillItems(bill);
  }, []);

  const totalAmount = billItems.reduce((acc, item) => acc + item.total, 0);

  const handleBiometricAuth = async () => {
    try {
      const publicKey = {
        challenge: new Uint8Array(32),
        timeout: 60000,
        userVerification: "required",
        // ✅ Avoid QR code popup by specifying platform only
        authenticatorSelection: {
          authenticatorAttachment: "platform", // Use system sensor only
        },
      };

      await navigator.credentials.get({ publicKey });

      navigate("/receipt?status=paid");
    } catch (err) {
      console.error("Authentication failed:", err);
      if (authAttempts >= 1) {
        navigate("/receipt?status=failed");
      } else {
        setAuthAttempts((prev) => prev + 1);
        alert("Authentication failed. Try again.");
      }
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      {/* Back Button */}
      <button
        onClick={() => navigate("/products")}
        style={{
          marginBottom: "20px",
          padding: "8px 16px",
          fontSize: "14px",
          backgroundColor: "#f0f0f0",
          border: "1px solid #ccc",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        ← Back to Products
      </button>

      <h2 style={{ marginBottom: "20px" }}>Bill Summary</h2>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f5f5f5", textAlign: "left" }}>
            <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
              Product
            </th>
            <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
              Quantity
            </th>
            <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
              Price
            </th>
            <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {billItems.map((item) => (
            <tr key={item.id}>
              <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>
                {item.name}
              </td>
              <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>
                {item.quantity}
              </td>
              <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>
                ₹{item.price}
              </td>
              <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>
                ₹{item.total}
              </td>
            </tr>
          ))}
          <tr>
            <td
              colSpan="3"
              style={{
                textAlign: "right",
                fontWeight: "bold",
                padding: "10px",
              }}
            >
              Total Amount
            </td>
            <td style={{ fontWeight: "bold", padding: "10px" }}>
              ₹{totalAmount}
            </td>
          </tr>
        </tbody>
      </table>

      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <button
          onClick={() => setShowModal(true)}
          style={{
            padding: "14px 28px",
            fontSize: "16px",
            backgroundColor: "#27ae60",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Pay Now →
        </button>
      </div>

      {/* ✅ Authentication Modal */}
      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "#fff",
              padding: "30px",
              borderRadius: "12px",
              width: "400px",
              textAlign: "left",
              boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
              border: "1px solid #e0e0e0",
            }}
          >
            <h3
              style={{
                marginBottom: "20px",
                fontSize: "22px",
                borderBottom: "1px solid #eee",
                paddingBottom: "10px",
                textAlign: "center",
              }}
            >
              🔐 Pay Using Biometric Authentication
            </h3>

            <ul
              style={{
                color: "#444",
                lineHeight: "1.8",
                fontSize: "14px",
                marginBottom: "20px",
                paddingLeft: "20px",
              }}
            >
              <li>Ensure your fingerprint is registered on this device.</li>
              <li>
                Click the button below and place your finger on the sensor when
                prompted.
              </li>
            </ul>

            <div style={{ textAlign: "center" }}>
              <button
                onClick={handleBiometricAuth}
                style={{
                  padding: "12px 24px",
                  background: "linear-gradient(to right, #a8e063, #56ab2f)",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "15px",
                }}
              >
                Pay with Biometric →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
