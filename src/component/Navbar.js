import { Container, Nav, Navbar } from 'react-bootstrap';

export default function NavbarSpacel() {

    return (
        <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">Spac-El</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '90px' }}
              navbarScroll
            >
          <Nav.Link href="/Portfolio">Portfolio</Nav.Link> 
          <Nav.Link href="/">Contact</Nav.Link>
          <Nav.Link href="/image">Image</Nav.Link>
          <Nav.Link href="/video">Video</Nav.Link>
          <Nav.Link href="/article">Article</Nav.Link>
          <Nav.Link href="/charger_document">Charger</Nav.Link>
          <Nav.Link href="/annotations">Liste Annotation</Nav.Link>
          </Nav>
           
          </Navbar.Collapse>
        </Container>
      </Navbar> 
    );
}