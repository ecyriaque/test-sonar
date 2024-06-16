import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';

export default function VideoList({videos}) {

  const handleClick = (currentId) => {
    document.getElementById(`id:${currentId}`).click();
  }

  const cards = videos.map((video)=> (
    <Col key={video.id} xs={12} sm={6} md={4} lg={3}className="mb-3" style={{ padding: '30px' }}>
      <Card bg="secondary">
        <Card.Body>
          <ReactPlayer url={video.url} width="240px" height="130px"/>
          <br/>
          <Card.Title>{video.title}</Card.Title>
          <div>
            <small>Publié par {video.author}</small>
          </div>
          <br/>
          <Button variant="primary" onClick={() => handleClick(video.id)}>Détail</Button>
          <Link id={`id:${video.id}`} to={`/video/${video.id}`}></Link>
        </Card.Body>
      </Card>
    </Col>
  ));

  return (
    <div>
      <Container  className="text-center">
        <h1> Liste des videos :</h1>
        <Row>
          {cards}
        </Row>
      </Container>
    </div>
  );
}
