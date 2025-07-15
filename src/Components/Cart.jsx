import React from "react";
import { Container, Table, Button } from "react-bootstrap";

function Cart({ cart, onRemove }) {
  const total = cart.reduce(
    (sum, item) => sum + parseFloat(item.price.replace(/[^\d]/g, "")),
    0
  );

  return (
    <Container className="py-5">
      <h2 style={{ color: "orange" }}>Il tuo carrello</h2>
      {cart.length === 0 ? (
        <p>Il carrello è vuoto.</p>
      ) : (
        <Table striped bordered hover variant="dark" className="mt-4">
          <thead>
            <tr>
              <th>Prodotto</th>
              <th>Prezzo</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, idx) => (
              <tr key={idx}>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => onRemove(idx)}
                  >
                    Rimuovi
                  </Button>
                </td>
              </tr>
            ))}
            <tr>
              <td>
                <b>Totale</b>
              </td>
              <td colSpan={2}>
                <b>€{total}</b>
              </td>
            </tr>
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default Cart;
