import { Box } from "@chakra-ui/react";
import GeometricBackground from "../components/GeometricBackground";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Carousel from "../components/Carousel";

export default function Landing() {
    return (
        <Box
            minH="100vh"
            position="relative"
            overflow="hidden"
            bg="gray.50"
        >
            <GeometricBackground />
            <Navbar />
            <Hero />
            <Carousel />
        </Box>
    );
}