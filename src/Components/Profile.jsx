import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [whiteMode, setWhiteMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setNome(localStorage.getItem("nome") || "");
    setCognome(localStorage.getItem("cognome") || "");
    setUsername(localStorage.getItem("username") || "");
    setAvatar(localStorage.getItem("avatar") || "");
    setWhiteMode(localStorage.getItem("whiteMode") === "true");
  }, []);

  const handleSave = () => {
    localStorage.setItem("nome", nome);
    localStorage.setItem("cognome", cognome);
    localStorage.setItem("username", username);
    localStorage.setItem("avatar", avatar);
    localStorage.setItem("whiteMode", whiteMode);
    window.location.reload();
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/"); // Torna alla home
    window.location.reload();
  };

  return (
    <div className={`container py-5 ${whiteMode ? "white-mode" : ""}`}>
      <h2>Profilo Utente</h2>
      <div>
        <label>Immagine profilo (URL):</label>
        <input
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          className="form-control mb-2"
        />
        {avatar ? (
          <img
            src={avatar}
            alt="avatar"
            style={{ width: 80, height: 80, borderRadius: "50%" }}
          />
        ) : (
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "orange",
              color: "#222",
              fontWeight: 700,
              fontSize: 32,
              textAlign: "center",
              lineHeight: "80px",
            }}
          >
            {nome[0]?.toUpperCase()}
            {cognome[0]?.toUpperCase()}
          </div>
        )}
      </div>
      <div className="mt-3">
        <label>Username:</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="form-control mb-2"
        />
      </div>
      <div className="form-check form-switch mt-3">
        <input
          className="form-check-input"
          type="checkbox"
          checked={whiteMode}
          onChange={(e) => setWhiteMode(e.target.checked)}
          id="whiteModeSwitch"
        />
        <label className="form-check-label" htmlFor="whiteModeSwitch">
          White Mode
        </label>
      </div>
      <button className="btn btn-warning mt-3" onClick={handleSave}>
        Salva
      </button>
      <hr />
      <button className="btn btn-danger mt-2" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Profile;
