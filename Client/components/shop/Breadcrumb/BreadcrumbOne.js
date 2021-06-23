import { Container, Row, Col } from "react-bootstrap";
const BreadcrumbOne = ({ children, pageTitle, className }) => {
  return (
    <div
      className={`breadcrumb-area space-pt--70 space-pb--70 ${
        className ? className : ""
      }`}
      style={{
        backgroundImage: `url("https://i.pinimg.com/originals/23/3e/83/233e83143f573b089b4eda935cdda9d7.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container>
        <Row>
          <Col>
            <h1 className='breadcrumb__title'>{pageTitle}</h1>
            {children}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BreadcrumbOne;
