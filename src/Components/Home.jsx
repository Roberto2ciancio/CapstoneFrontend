import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <Container className="d-flex">
      <Row>
        <Col>
          <div>
            <h1 className="text-center fw-bolder titolo2">
              Benvenuto nel nostro negozio di PC personalizzati
            </h1>
            <p>
              Scopri la nostra selezione di PC personalizzati, progettati per
              soddisfare ogni tua esigenza. Che tu sia un gamer, un
              professionista o un creativo, abbiamo il PC perfetto per te.
            </p>
            <h2>Perché scegliere i nostri PC?</h2>
            <ul>
              <li>Componenti di alta qualità</li>
              <li>Assistenza clienti dedicata</li>
              <li>Garanzia estesa</li>
              <li>Spedizione rapida e sicura</li>
            </ul>
            <button
              type="button"
              className="ButtonHome"
              onClick={() => navigate("/shop")}
            >
              vedi negozio
            </button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
export default Home;
