import React, { useState, useEffect } from "react";

function AddPcCardAdmin() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("https://nursing-erna-pcstorerob-41a02745.koyeb.app/api/pc-cards", {
      headers: token ? { Authorization: "Bearer " + token } : {},
    })
      .then((res) => res.json())
      .then((data) => setProducts(Array.isArray(data) ? data : []));
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuovaCard = { name, description, price, image };
    const token = localStorage.getItem("token");
    let url = "https://nursing-erna-pcstorerob-41a02745.koyeb.app/api/pc-cards";
    let method = "POST";
    if (editId) {
      url += `/${editId}`;
      method = "PUT";
    }
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(nuovaCard),
    });
    if (res.ok) {
      setMessage(
        editId ? "PC Card modificata!" : "PC Card aggiunta con successo!"
      );
      setName("");
      setDescription("");
      setPrice("");
      setImage("");
      setEditId(null);
    } else {
      setMessage("Errore nell'operazione sulla PC Card.");
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!window.confirm("Eliminare questa card?")) return;
    const res = await fetch(
      `https://nursing-erna-pcstorerob-41a02745.koyeb.app/api/pc-cards/${id}`,
      {
        method: "DELETE",
        headers: { Authorization: "Bearer " + token },
      }
    );
    if (res.ok) {
      setMessage("PC Card eliminata!");
    } else {
      setMessage("Errore nell'eliminazione della PC Card.");
    }
  };

  const handleEdit = (pc) => {
    setEditId(pc.id);
    setName(pc.name);
    setDescription(pc.description);
    setPrice(pc.price);
    setImage(pc.image);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const ruolo = localStorage.getItem("ruolo");
  if (ruolo !== "ADMIN") {
    return (
      <div className="container py-5">
        <h2>Accesso negato</h2>
        <p>Questa sezione è riservata agli amministratori.</p>
      </div>
    );
  }

  return (
    <div className="container py-5" style={{ maxWidth: 700 }}>
      <style>
        {`
          .admin-form input::placeholder,
          .admin-form textarea::placeholder {
            color: #fff !important;
            opacity: 1;
          }
        `}
      </style>
      <h2 className="mb-4 text-center" style={{ color: "orange" }}>
        {editId ? "Modifica PC" : "Aggiungi un nuovo PC"}
      </h2>
      <form
        className="admin-form"
        onSubmit={handleSubmit}
        style={{
          background: "#23272b",
          borderRadius: 16,
          padding: 24,
          boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
          color: "#fff",
        }}
      >
        <div className="row g-3">
          <div className="col-md-6">
            <input
              className="form-control"
              style={{ background: "#181a1b", color: "#fff", border: "none" }}
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="col-md-6">
            <input
              className="form-control"
              style={{ background: "#181a1b", color: "#fff", border: "none" }}
              placeholder="Prezzo"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="col-12">
            <input
              className="form-control"
              style={{ background: "#181a1b", color: "#fff", border: "none" }}
              placeholder="URL Immagine"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </div>
          <div className="col-12">
            <textarea
              className="form-control"
              style={{
                background: "#181a1b",
                color: "#fff",
                border: "none",
                minHeight: 60,
              }}
              placeholder="Descrizione"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="btn mt-3"
          style={{
            background: "orange",
            color: "#23272b",
            fontWeight: 600,
            border: "none",
            borderRadius: 8,
            width: 140,
          }}
        >
          {editId ? "Salva Modifica" : "Aggiungi"}
        </button>
        {editId && (
          <button
            type="button"
            className="btn btn-secondary ms-2 mt-3"
            style={{ borderRadius: 8 }}
            onClick={() => {
              setEditId(null);
              setName("");
              setDescription("");
              setPrice("");
              setImage("");
            }}
          >
            Annulla
          </button>
        )}
        {message && (
          <div className="mt-3" style={{ color: "orange", fontWeight: 600 }}>
            {message}
          </div>
        )}
      </form>

      <h4 className="mt-5 mb-3" style={{ color: "orange" }}>
        PC Card esistenti
      </h4>
      <div>
        {products.length === 0 && (
          <div className="text-light-50">Nessuna card presente.</div>
        )}
        <div className="row g-3">
          {products.map((pc) => (
            <div
              key={pc.id}
              className="col-12"
              style={{
                background: "#181a1b",
                borderRadius: 12,
                marginBottom: 10,
                padding: 16,
                display: "flex",
                alignItems: "center",
                boxShadow: "0 1px 6px rgba(0,0,0,0.10)",
                color: "#fff",
              }}
            >
              <img
                src={pc.image}
                alt={pc.name}
                style={{
                  width: 60,
                  height: 60,
                  objectFit: "cover",
                  borderRadius: 8,
                  marginRight: 16,
                  background: "#23272b",
                  border: "1px solid #23272b",
                }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, color: "orange" }}>
                  {pc.name}
                </div>
                <div style={{ fontSize: 14, color: "#ccc" }}>
                  {pc.description}
                </div>
                <div style={{ fontWeight: 600, marginTop: 2 }}>
                  {pc.price} €
                </div>
              </div>
              <button
                className="btn btn-sm"
                style={{
                  background: "orange",
                  color: "#23272b",
                  fontWeight: 600,
                  border: "none",
                  borderRadius: 8,
                  marginRight: 8,
                  minWidth: 70,
                }}
                onClick={() => handleEdit(pc)}
              >
                Modifica
              </button>
              <button
                className="btn btn-sm"
                style={{
                  background: "#ff4d4d",
                  color: "#fff",
                  fontWeight: 600,
                  border: "none",
                  borderRadius: 8,
                  minWidth: 70,
                }}
                onClick={() => handleDelete(pc.id)}
              >
                Elimina
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AddPcCardAdmin;
