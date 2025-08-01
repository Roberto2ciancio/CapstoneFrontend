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
    // Fetch PC Cards
    fetch("https://nursing-erna-pcstorerob-41a02745.koyeb.app/api/pc-cards", {
      headers: token ? { Authorization: "Bearer " + token } : {},
    })
      .then((res) => res.json())
      .then((data) => setProducts(Array.isArray(data) ? data : []));
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuovoItem = { name, description, price, image };
    const token = localStorage.getItem("token");
    let url = `https://nursing-erna-pcstorerob-41a02745.koyeb.app/api/pc-cards`;
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
      body: JSON.stringify(nuovoItem),
    });

    if (res.ok) {
      setMessage(
        editId ? "PC Card modificato!" : "PC Card aggiunto con successo!"
      );
      setName("");
      setDescription("");
      setPrice("");
      setImage("");
      setEditId(null);
    } else {
      setMessage("Errore nell'operazione sul PC.");
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    if (!window.confirm("Eliminare questo PC?")) return;

    const res = await fetch(
      `https://nursing-erna-pcstorerob-41a02745.koyeb.app/api/pc-cards/${id}`,
      {
        method: "DELETE",
        headers: { Authorization: "Bearer " + token },
      }
    );

    if (res.ok) {
      setMessage("PC Card eliminato!");
    } else {
      setMessage("Errore nell'eliminazione del PC.");
    }
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setName(item.name);
    setDescription(item.description);
    setPrice(item.price);
    setImage(item.image);
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
        Gestione PC Desktop
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
        <h4 className="mb-3" style={{ color: "orange" }}>
          {editId ? "Modifica PC Desktop" : "Aggiungi PC Desktop"}
        </h4>
        <div className="row g-3">
          <div className="col-md-6">
            <input
              className="form-control"
              style={{
                background: "#181a1b",
                color: "#fff",
                border: "none",
              }}
              placeholder="Nome PC"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="col-md-6">
            <input
              className="form-control"
              style={{
                background: "#181a1b",
                color: "#fff",
                border: "none",
              }}
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
              style={{
                background: "#181a1b",
                color: "#fff",
                border: "none",
              }}
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
          {editId ? "Salva Modifica" : "Aggiungi PC"}
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
      </form>

      {message && (
        <div className="mt-3" style={{ color: "orange", fontWeight: 600 }}>
          {message}
        </div>
      )}

      <h4 className="mt-5 mb-3" style={{ color: "orange" }}>
        PC Desktop esistenti
      </h4>

      <div>
        {products.length === 0 && (
          <div className="text-light-50">Nessun PC presente.</div>
        )}
        <div className="row g-3">
          {products.map((item) => (
            <div
              key={item.id}
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
                src={item.image}
                alt={item.name}
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
                  {item.name}
                </div>
                <div style={{ fontSize: 14, color: "#ccc" }}>
                  {item.description}
                </div>
                <div style={{ fontWeight: 600, marginTop: 2 }}>
                  {item.price} €
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
                onClick={() => handleEdit(item)}
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
                onClick={() => handleDelete(item.id)}
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
