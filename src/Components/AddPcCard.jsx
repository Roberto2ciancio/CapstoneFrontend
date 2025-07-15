import React, { useState } from "react";

function AddPcCard() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuovaCard = { name, description, price, image };
    const res = await fetch("http://localhost:8080/api/pc-cards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(nuovaCard),
    });
    if (res.ok) {
      setMessage("PC Card aggiunta con successo!");
      setName("");
      setDescription("");
      setPrice("");
      setImage("");
    } else {
      setMessage("Errore nell'aggiunta della PC Card.");
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4" style={{ color: "orange" }}>
        Aggiungi una nuova PC Card
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nome</label>
          <input
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Descrizione</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Prezzo</label>
          <input
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>URL Immagine</label>
          <input
            className="form-control"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-warning">
          Aggiungi
        </button>
      </form>
      {message && <div className="mt-3">{message}</div>}
    </div>
  );
}

export default AddPcCard;
