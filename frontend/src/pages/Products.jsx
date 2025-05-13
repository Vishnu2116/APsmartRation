import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// 📌 Your products array goes here
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

export default function Products() {
  const navigate = useNavigate();
  const [cart, setCart] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);

  // ✅ Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "{}");
    setCart(savedCart);
  }, []);

  // ✅ Sync cart to localStorage on update
  const increment = (id) => {
    setCart((prev) => {
      const updated = { ...prev, [id]: (prev[id] || 0) + 1 };
      localStorage.setItem("cart", JSON.stringify(updated));
      return updated;
    });
  };

  const decrement = (id) => {
    setCart((prev) => {
      const updated = { ...prev };
      if (updated[id] > 1) updated[id]--;
      else delete updated[id];
      localStorage.setItem("cart", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div style={{ padding: "8px" }}>
      {/* Back Button */}
      <button
        onClick={() => navigate("/dashboard")}
        style={{
          marginBottom: "8px",
          padding: "8px 16px",
          fontSize: "14px",
          backgroundColor: "#f0f0f0",
          border: "1px solid #ccc",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        ← Go Back
      </button>

      {/* Heading */}
      <h2 style={{ marginBottom: "20px" }}>Available Products</h2>

      {/* Product Cards */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => setSelectedProduct(product)}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              width: "220px",
              borderRadius: "8px",
              cursor: "pointer",
              textAlign: "center",
              backgroundColor: "#fff",
              boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
            }}
          >
            <img
              src={product.image_url}
              alt={product.name}
              style={{
                width: "100%",
                height: "140px",
                objectFit: "cover",
                borderRadius: "5px",
              }}
            />
            <h4>{product.name}</h4>
            <p>
              <strong>Price:</strong> ₹{product.price}
            </p>
            <p style={{ fontSize: "13px", color: "#666", marginTop: "10px" }}>
              <strong>Description:</strong> {product.description}
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "10px",
                marginTop: "10px",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => decrement(product.id)}>-</button>
              <span>{cart[product.id] || 0}</span>
              <button onClick={() => increment(product.id)}>+</button>
            </div>
          </div>
        ))}
      </div>

      {/* Description Modal */}
      {selectedProduct && (
        <div
          onClick={() => setSelectedProduct(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "8px",
              width: "350px",
              textAlign: "center",
            }}
          >
            <h3>{selectedProduct.name}</h3>
            <img
              src={selectedProduct.image_url}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
              alt={selectedProduct.name}
            />
            <p style={{ marginTop: "10px", fontWeight: "bold" }}>
              Price: ₹{selectedProduct.price}
            </p>
            <p style={{ marginTop: "8px" }}>{selectedProduct.description}</p>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "10px",
                marginTop: "15px",
              }}
            >
              <button onClick={() => decrement(selectedProduct.id)}>-</button>
              <span>{cart[selectedProduct.id] || 0}</span>
              <button onClick={() => increment(selectedProduct.id)}>+</button>
            </div>

            <button
              onClick={() => setSelectedProduct(null)}
              style={{
                marginTop: "20px",
                padding: "8px 16px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Proceed to Checkout Button */}
      {Object.keys(cart).length > 0 && (
        <div
          style={{
            position: "fixed",
            bottom: "30px",
            right: "30px",
            zIndex: 100,
          }}
        >
          <button
            onClick={() => {
              localStorage.setItem("cart", JSON.stringify(cart));
              navigate("/billing");
            }}
            style={{
              padding: "14px 24px",
              fontSize: "16px",
              backgroundColor: "#2c3e50",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              fontWeight: "bold",
            }}
          >
            Proceed to Checkout →
          </button>
        </div>
      )}
    </div>
  );
}
