import React, { useState, useEffect } from "react";

function AddPcCardAdmin() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);

  // Carica le card esistenti
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:8080/api/pc-cards", {
      headers: token ? { Authorization: "Bearer " + token } : {},
    })
      .then((res) => res.json())
      .then((data) => setProducts(Array.isArray(data) ? data : []));
  }, [message]);

  // Aggiungi o modifica card
  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuovaCard = { name, description, price, image };
    const token = localStorage.getItem("token");
    let res;
    if (editId) {
      // Modifica
      res = await fetch(`http://localhost:8080/api/pc-cards/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(nuovaCard),
      });
      if (res.ok) {
        setMessage("PC Card modificata con successo!");
      } else {
        setMessage("Errore nella modifica della PC Card.");
      }
    } else {
      // Aggiungi
      res = await fetch("http://localhost:8080/api/pc-cards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(nuovaCard),
      });
      if (res.ok) {
        setMessage("PC Card aggiunta con successo!");
      } else {
        setMessage("Errore nell'aggiunta della PC Card.");
      }
    }
    setName("");
    setDescription("");
    setPrice("");
    setImage("");
    setEditId(null);
  };

  // Elimina card
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:8080/api/pc-cards/${id}`, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + token },
    });
    if (res.ok) {
      setMessage("PC Card eliminata!");
    } else {
      setMessage("Errore nell'eliminazione.");
    }
  };

  // Prepara la modifica
  const handleEdit = (pc) => {
    setName(pc.name);
    setDescription(pc.description);
    setPrice(pc.price);
    setImage(pc.image);
    setEditId(pc.id);
    setMessage("");
  };

  // Solo admin può vedere il form
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
    <div className="container py-5">
      <h2 className="mb-4" style={{ color: "orange" }}>
        {editId ? "Modifica PC Card" : "Backoffice: Aggiungi un nuovo PC"}
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
            type="number"
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
          {editId ? "Salva modifiche" : "Aggiungi"}
        </button>
        {editId && (
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => {
              setName("");
              setDescription("");
              setPrice("");
              setImage("");
              setEditId(null);
              setMessage("");
            }}
          >
            Annulla
          </button>
        )}
      </form>
      {message && <div className="mt-3">{message}</div>}

      <hr />
      <h3 className="mb-3" style={{ color: "orange" }}>
        Gestione PC Card
      </h3>
      <table className="table table-dark table-bordered">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrizione</th>
            <th>Prezzo</th>
            <th>Immagine</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {products.map((pc) => (
            <tr key={pc.id}>
              <td>{pc.name}</td>
              <td>{pc.description}</td>
              <td>{pc.price}€</td>
              <td>
                <img
                  src={pc.image}
                  alt={pc.name}
                  style={{ width: 60, borderRadius: 8 }}
                />
              </td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(pc)}
                >
                  Modifica
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(pc.id)}
                >
                  Elimina
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AddPcCardAdmin;
