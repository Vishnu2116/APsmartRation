import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function HomeLayout() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Navbar />
      <div
        style={{
          flex: 1,
          padding: "30px 60px",
          width: "100vw", // ✅ Full width
          boxSizing: "border-box",
          backgroundColor: "#f9f9f9",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}
