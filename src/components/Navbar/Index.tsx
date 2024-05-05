import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Button, Form } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./style.css"
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand href="#">Play & Win</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Link to='/'>Home</Link>
            <Link to='/admin'>Admin</Link>
          </Nav>
          <WalletMultiButton/>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Index