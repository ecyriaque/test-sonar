import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function ImageList({images}) {

  const handleClick = (currentId) => {
    document.getElementById(`id:${currentId}`).click();
  }

  const cards = images.map((image)=> (
    <Col key={image.id} xs={12} sm={6} md={4} lg={3} className="mb-3" style={{ padding: '30px' }}>
      <Card bg="secondary">
        <Card.Img variant="top" src={image.url} style={{ height: '160px', padding : '20px'}} />
        <Card.Body>
          <Card.Title>{image.title}</Card.Title>
          <div>
            <small>Publié par {image.author}</small>
          </div>
          <br/>
          <Button variant="primary" onClick={() => handleClick(image.id)}>Détail</Button>
          <Link id={`id:${image.id}`} to={`/image/${image.id}`}></Link>
        </Card.Body>
      </Card>
    </Col>
  ));

  return (
    <div>
      <Container className="text-center">
        <h1> Liste des images :</h1>
        <Row>
          {cards}
        </Row>
      </Container>
    </div>
  );
}
