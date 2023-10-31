import "./App.css";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
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
                <Nav />
                <Menu />
                <Routes>
                    <Route
                        path="/"
                        // element={isMobile() ? <MobileApp /> : <Home />}
                        element={<Home />}
                    />
                    <Route
                        path="/domestic"
                        // element={isMobile() ? <MobileApp /> : <Domestic />}
                        element={<Domestic />}
                    />
                    <Route
                        path="/international"
                        // element={isMobile() ? <MobileApp /> : <International />}
                        element={<International />}
                    />
                    {/* <Route path="/m" element={<MobileApp />} /> */}
                    {/* <Route path="*" element={ <NotFound />} /> */}
                </Routes>
            <Footer />

            </Container>
        </>
    );
}

const Container = styled.div`
    background-color: #171717;
    width: 100vw;
    // margin-bottom: 30vh;
`;

export default App;
