import React, { useEffect } from 'react';
import { Container,  Nav, Navbar } from 'react-bootstrap';
import Home from './Home';
import Details from './Details';
import Favorites from './Favorites';

import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";


import './Main.scss';

/*
    Breakpoint:
        xs < 576px
        sm ≥ 576px
        md ≥ 768px
        lg ≥ 992px
        xl ≥ 1200px
*/

export default function Main() {
    useEffect(() => {
        checkLocalStorageExists();
    }, []);

    function checkLocalStorageExists(){
        if(!localStorage.favPokes) {
            localStorage.setItem('favPokes', '[]')
        }
    }

  return (
    <Router>
        <Container>
            <header className="main-header">
                <Navbar bg="light">
                    <Container>
                        <Navbar.Brand href="/">Pokemon List</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/favorites">Favorites</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
            </header>
    
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>

                <Route path="/favorites">
                    <Favorites />
                </Route>

                <Route path="/:id">
                    <Details />
                </Route>
            </Switch>

            <footer className="main-footer">
                <span>by @R31N4LD0</span>
                <p>images from <a href="https://github.com/PokeAPI/sprites.git" target="_blank" rel="noreferrer">this repository</a>.</p>
            </footer>
        </Container>
    </Router>
  );
}
