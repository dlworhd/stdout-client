import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Auth from "./pages/auth/Auth";
import SignUp from "./pages/SignUp";
import Users from "./pages/main/Users";

import Menu from "./components/Menu";
import Nav from "./components/Nav";
import Home from "./pages/main/Home";
import Footer from "./components/Footer";
import Domestic from "./pages/main/Domestic";
import International from "./pages/main/International";

function App() {


    return (
        <>
        <Container>
            <BrowserRouter>
                <Nav />
                <Menu />
                <Routes>
                    <Route path="/all" element={<Home />} />
                </Routes>
                <Routes>
                    <Route path="/domestic" element={<Domestic />} />
                    <Route path="/international" element={<International />} />
                </Routes>
            </BrowserRouter>
        </Container>
        <Footer />
        </>

    );
}

const Container = styled.div`
    background-color: #171717;
    width: 100vw;
    margin-bottom: 20vh;
`;

export default App;
