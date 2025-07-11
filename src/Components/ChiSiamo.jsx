import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  ListGroup,
} from "react-bootstrap";

function ChiSiamo() {
  const [recensioni, setRecensioni] = useState([
    { nome: "Mario", testo: "Ottimo servizio e PC di qualità!" },
    { nome: "Giulia", testo: "Staff gentile e prodotti top!" },
  ]);
  const [nome, setNome] = useState("");
  const [testo, setTesto] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nome.trim() && testo.trim()) {
      setRecensioni([...recensioni, { nome, testo }]);
      setNome("");
      setTesto("");
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card
            style={{
              background: "rgba(30,30,30,0.97)",
              color: "#fff",
              border: "none",
            }}
          >
            <Card.Body>
              <h1 className="mb-4" style={{ color: "orange", fontWeight: 700 }}>
                Chi Siamo
              </h1>
              <p>
                Siamo un team di appassionati di tecnologia con anni di
                esperienza nel settore dei PC personalizzati. La nostra missione
                è offrire soluzioni su misura per gamer, professionisti e
                creativi, garantendo qualità, assistenza e innovazione.
              </p>
              <p>
                Ogni PC che realizziamo è frutto di cura artigianale, attenzione
                ai dettagli e utilizzo di componenti di ultima generazione.
                Siamo sempre disponibili per consigliarti la configurazione
                perfetta per le tue esigenze!
              </p>
              <p>
                <strong>Contattaci</strong> per qualsiasi domanda o richiesta:
                il nostro team è pronto ad aiutarti.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-center mt-5">
        <Col md={8}>
          <Card
            style={{
              background: "rgba(30,30,30,0.97)",
              color: "#fff",
              border: "none",
            }}
          >
            <Card.Body>
              <h2 className="mb-3" style={{ color: "orange" }}>
                Lascia una recensione
              </h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-2">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Il tuo nome"
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Recensione</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={testo}
                    onChange={(e) => setTesto(e.target.value)}
                    placeholder="Scrivi la tua recensione"
                  />
                </Form.Group>
                <Button variant="warning" type="submit" className="mt-2">
                  Invia
                </Button>
              </Form>
              <h3 className="mt-4 mb-2" style={{ color: "orange" }}>
                Recensioni
              </h3>
              <ListGroup variant="flush">
                {recensioni.map((rec, idx) => (
                  <ListGroup.Item
                    key={idx}
                    style={{
                      background: "transparent",
                      color: "#fff",
                      borderBottom: "1px solid #444",
                    }}
                  >
                    <strong>{rec.nome}:</strong> {rec.testo}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ChiSiamo;
