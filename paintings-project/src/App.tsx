import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Landing from "./pages/Landing";
import Gallery from "./pages/Gallery";
import PaintingDetails from "./pages/PaintingDetails";
import PageTransition from "./components/PageTransition";

export default function App() {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route
                    path="/"
                    element={
                        <PageTransition>
                            <Landing />
                        </PageTransition>
                    }
                />

                <Route
                    path="/gallery"
                    element={
                        <PageTransition>
                            <Gallery />
                        </PageTransition>
                    }
                />

                <Route
                    path="/painting/:id"
                    element={
                        <PageTransition>
                            <PaintingDetails />
                        </PageTransition>
                    }
                />

                <Route
                    path="/login"
                    element={
                        <PageTransition>
                            <Login />
                        </PageTransition>
                    }
                />

                <Route
                    path="/signup"
                    element={
                        <PageTransition>
                            <SignUp />
                        </PageTransition>
                    }
                />
            </Routes>
        </AnimatePresence>
    );
}