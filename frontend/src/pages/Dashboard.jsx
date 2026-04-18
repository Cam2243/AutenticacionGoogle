import React, { useEffect, useState } from "react";
import api from "../services/api";

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",   
  height: "100vh",        
  width: "100vw",        
  background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
  fontFamily: "Arial, sans-serif",
};

const profileCardStyle = {
  width: "100%",
  maxWidth: "420px",
  padding: "35px 25px",
  borderRadius: "14px",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  boxShadow: "0 8px 25px rgba(0, 0, 0, 0.3)",
  textAlign: "center",
  color: "#fff",
  backdropFilter: "blur(10px)", 
};

const imageStyle = {
  borderRadius: "50%",
  width: "110px",
  height: "110px",
  objectFit: "cover",
  margin: "20px 0",
  border: "3px solid #4285F4",
};

const infoTextStyle = {
  color: "#ccc",
  fontSize: "14px",
  marginBottom: "25px",
};

const Dashboard = () => {
  const [user, setUser] = useState(null); 

  useEffect(() => {
    api.get("/auth/user")
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  if (!user) {
    return (
      <div style={containerStyle}>
        <div style={profileCardStyle}>
          <h2 style={{ color: "#ddd" }}>Cargando datos de sesión...</h2>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={profileCardStyle}>
        <h1 style={{ marginBottom: "8px", fontSize: "2rem", lineHeight: "1.2", letterSpacing: "0.01em" }}>
          Hola, {user.displayName}
        </h1>
        <p style={{ marginBottom: "20px", color: "#ccc", fontSize: "16px", lineHeight: "1.5" }}>
          ¡Autenticación exitosa con Google!
        </p>
        <img
          src={user.photos?.[0]?.value}
          alt="Foto de perfil"
          style={imageStyle}
        />
        <h3 style={{ margin: "10px 0 5px", color: "#fff" }}>
          {user.emails?.[0]?.value}
        </h3>
        <p style={{ color: "#bbb", fontSize: "13px" }}>
          ID de sesión: {user.id}
        </p>
      </div>
    </div>
  );
};

export default Dashboard;