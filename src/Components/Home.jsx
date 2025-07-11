import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <Container
      className="d-flex align-items-center justify-content-center home-section"
      style={{ minHeight: "80vh" }}
    >
      <Row className="w-100">
        <Col md={7} className="mx-auto">
          <div className="home-content text-center">
            <h1 className="fw-bolder titolo2 animate-fade-in-down">
              Benvenuto nel nostro{" "}
              <span className="highlight">negozio di PC personalizzati</span>
            </h1>
            <p className="animate-fade-in">
              Scopri la nostra selezione di PC su misura, progettati per
              soddisfare ogni tua esigenza.
              <br />
              <span className="highlight">
                Gaming, lavoro, creatività:
              </span>{" "}
              abbiamo il PC perfetto per te!
            </p>
            <ul className="home-list animate-fade-in-up">
              <li>✅ Componenti di alta qualità</li>
              <li>✅ Assistenza clienti dedicata</li>
              <li>✅ Garanzia estesa</li>
              <li>✅ Spedizione rapida e sicura</li>
            </ul>
            <button
              type="button"
              className="ButtonHome animate-pop-in"
              onClick={() => navigate("/shop")}
            >
              Vedi il negozio
            </button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
