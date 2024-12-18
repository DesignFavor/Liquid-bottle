import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import { Bottle } from "./Bottle";

export default function App() {
  const [selectedColor, setSelectedColor] = useState("#FF0000"); // Default color
  const [labelTexture, setLabelTexture] = useState(null); // Uploaded label texture

  // Parse URL parameters
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const colorFromURL = params.get("color");
    const labelFromURL = params.get("label");

    if (colorFromURL) {
      setSelectedColor(colorFromURL);
    }

    if (labelFromURL) {
      setLabelTexture(labelFromURL);
    }
  }, []);

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleLabelUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setLabelTexture(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100vh",
        fontFamily: "'Poppins', sans-serif",
        backgroundColor: "#F8F9FA",
        flexWrap: "wrap", 
      }}
    >
      <div style={{ flex: 1 }}>
        <Canvas shadows camera={{ position: [0, 0, 8], fov: 20 }}>
          <ambientLight intensity={1} />
          <Environment files="./ShowcaseEnvy.hdr" />
          
          <OrbitControls/>

          <Bottle color={selectedColor} labelTexture={labelTexture} />
          <ContactShadows
            position={[0, -1.02, 0]}
            scale={10}
            blur={0.5}
            far={10}
            opacity={0.75}
          />
        </Canvas>
      </div>

      <div
        style={{
          width: "400px",
          padding: "30px",
          backgroundColor: "#FFFFFF",
          boxShadow: "-2px 0 10px rgba(0, 0, 0, 0.2)",
          borderRadius: "15px 0 0 15px",
          position: "relative", 
        }}
      >
        <h3
          style={{
            color: "#999",
            fontSize: "12px",
            textTransform: "uppercase",
            letterSpacing: "2px",
            textAlign: "center",
          }}
        >
          Bottle Configurator
        </h3>
        <h1 style={{ fontSize: "26px", color: "#212529", marginBottom: "15px", textAlign: "center" }}>
          Customize Your Bottle
        </h1>
        <p style={{ color: "#6C757D", fontSize: "14px", marginBottom: "25px", textAlign: "center" }}>
          Choose a color and upload a label to design your perfect bottle.
        </p>

        <h4 style={{ color: "#495057", fontSize: "16px", marginBottom: "15px", textAlign: "center" }}>
          Bottle Color
        </h4>
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "30px",
            justifyContent: "center", 
            flexWrap: "wrap", 
          }}
        >
          {["#56ff34", "#00a6d5", "#8B4513", "#FFA500", "#f00"].map((color) => (
            <div
              key={color}
              onClick={() => handleColorChange(color)}
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                backgroundColor: color,
                border: selectedColor === color ? "3px solid black" : "1px solid #DDD",
                cursor: "pointer",
                transition: "transform 0.3s, border 0.3s",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            />
          ))}
        </div>

        <h4 style={{ color: "#495057", fontSize: "16px", marginBottom: "15px", textAlign: "center" }}>
          Bottle Label
        </h4>
        <label
          style={{
            display: "block",
            marginBottom: "30px",
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "#FFF",
            textAlign: "center",
            borderRadius: "5px",
            fontSize: "14px",
            cursor: "pointer",
            transition: "background-color 0.3s",
            width: "100%", 
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#428752")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#28a745")}
        >
          Choose File
          <input
            type="file"
            accept="image/*"
            onChange={handleLabelUpload}
            style={{ display: "none" }}
          />
        </label>

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <button
            style={{
              padding: "15px 25px",
              backgroundColor: "#28A745",
              color: "#FFF",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              cursor: "pointer",
              transition: "background-color 0.3s",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
              width: "100%", 
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#218838")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#28A745")}
          >
            Add to Cart
          </button>
          <h2 style={{ fontSize: "24px", color: "#212529", left: "10px", marginLeft: "10px" }}>$148</h2>
        </div>
      </div>
    </div>
  );
}
