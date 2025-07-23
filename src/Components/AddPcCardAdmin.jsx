import React, { useState, useEffect } from "react";

function AddPcCardAdmin() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [compType, setCompType] = useState("CPU");
  const [compName, setCompName] = useState("");
  const [compPrice, setCompPrice] = useState("");
  const [compMessage, setCompMessage] = useState("");
  const [components, setComponents] = useState([]);
  const [editCompId, setEditCompId] = useState(null);
  const [editCompName, setEditCompName] = useState("");
  const [editCompPrice, setEditCompPrice] = useState("");

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

  // Carica i componenti esistenti
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:8080/api/components", {
      headers: token ? { Authorization: "Bearer " + token } : {},
    })
      .then((res) => res.json())
      .then((data) => setComponents(Array.isArray(data) ? data : []));
  }, [compMessage]);

  // Aggiungi componente
  const handleComponentSubmit = async (e) => {
    e.preventDefault();
    setCompMessage("");
    const token = localStorage.getItem("token");
    const newComponent = {
      type: compType,
      name: compName,
      price: Number(compPrice),
    };
    const res = await fetch("http://localhost:8080/api/components", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(newComponent),
    });
    if (res.ok) {
      setCompMessage("Componente aggiunto con successo!");
      setCompName("");
      setCompPrice("");
    } else {
      setCompMessage("Errore nell'aggiunta del componente.");
    }
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

      {/* --- NUOVO FORM COMPONENTI --- */}
      <hr />
      <h3 className="mb-3" style={{ color: "orange" }}>
        Aggiungi componente PC
      </h3>
      <form onSubmit={handleComponentSubmit}>
        <div className="mb-3">
          <label>Tipo</label>
          <select
            className="form-control"
            value={compType}
            onChange={(e) => setCompType(e.target.value)}
          >
            <option value="CPU">CPU</option>
            <option value="RAM">RAM</option>
            <option value="GPU">GPU</option>
            <option value="Storage">Storage</option>
            <option value="Case">Case</option>
          </select>
        </div>
        <div className="mb-3">
          <label>Nome componente</label>
          <input
            className="form-control"
            value={compName}
            onChange={(e) => setCompName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Prezzo (€)</label>
          <input
            className="form-control"
            type="number"
            value={compPrice}
            onChange={(e) => setCompPrice(e.target.value)}
            required
            min={0}
          />
        </div>
        <button type="submit" className="btn btn-warning">
          Aggiungi componente
        </button>
      </form>
      {compMessage && <div className="mt-3">{compMessage}</div>}

      {/* Lista componenti aggiunti */}
      <table className="table table-dark table-bordered mt-4">
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Nome</th>
            <th>Prezzo</th>
          </tr>
        </thead>
        <tbody>
          {components.map((c) => (
            <tr key={c.id}>
              <td>{c.type}</td>
              <td>
                {editCompId === c.id ? (
                  <input
                    value={editCompName}
                    onChange={(e) => setEditCompName(e.target.value)}
                    className="form-control"
                  />
                ) : (
                  c.name
                )}
              </td>
              <td>
                {editCompId === c.id ? (
                  <input
                    type="number"
                    value={editCompPrice}
                    onChange={(e) => setEditCompPrice(e.target.value)}
                    className="form-control"
                  />
                ) : (
                  c.price + "€"
                )}
              </td>
              <td>
                {editCompId === c.id ? (
                  <>
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={async () => {
                        const token = localStorage.getItem("token");
                        await fetch(
                          `http://localhost:8080/api/components/${c.id}`,
                          {
                            method: "PUT",
                            headers: {
                              "Content-Type": "application/json",
                              Authorization: "Bearer " + token,
                            },
                            body: JSON.stringify({
                              type: c.type,
                              name: editCompName,
                              price: Number(editCompPrice),
                            }),
                          }
                        );
                        setEditCompId(null);
                        setCompMessage("Componente modificato!");
                      }}
                    >
                      Salva
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => setEditCompId(null)}
                    >
                      Annulla
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => {
                        setEditCompId(c.id);
                        setEditCompName(c.name);
                        setEditCompPrice(c.price);
                      }}
                    >
                      Modifica
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={async () => {
                        const token = localStorage.getItem("token");
                        await fetch(
                          `http://localhost:8080/api/components/${c.id}`,
                          {
                            method: "DELETE",
                            headers: {
                              Authorization: "Bearer " + token,
                            },
                          }
                        );
                        setCompMessage("Componente eliminato!");
                      }}
                    >
                      Elimina
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
