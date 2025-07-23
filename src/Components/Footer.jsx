import { Container, Row, Col } from "react-bootstrap";

export const Footer = () => {
  return (
    <footer
      style={{
        background: "#23272b",
        color: "#fff",
        padding: "2rem 0 1rem 0",
        marginTop: "auto",
        borderTop: "2px solid orange",
      }}
    >
      <Container>
        <Row>
          <Col md={6} className="mb-3 mb-md-0">
            <h5 style={{ color: "orange", fontWeight: 700 }}>
              Capstone PC Shop
            </h5>
            <div style={{ color: "#ccc", fontSize: "0.95rem" }}>
              &copy; {new Date().getFullYear()} Capstone PC Shop. Tutti i
              diritti riservati.
            </div>
          </Col>
          <Col md={6} className="text-md-end">
            <h6 style={{ color: "orange", fontWeight: 600 }}>Contatti</h6>
            <div style={{ color: "#ccc", fontSize: "0.95rem" }}>
              <div>
                <strong>Email:</strong> info@capstonepcshop.it
              </div>
              <div>
                <strong>Telefono:</strong> +39 02 1234 5678
              </div>
              <div>
                <strong>Indirizzo:</strong> Via delle Innovazioni 42, 20100
                Milano (MI)
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
