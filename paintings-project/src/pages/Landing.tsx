import { Box } from "@chakra-ui/react";
import GeometricBackground from "../components/GeometricBackground";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Carousel from "../components/Carousel";
import FeatureCards from "../components/FeatureCards";
import NoiseOverlay from "../components/NoiseOverlay";

export default function Landing() {
    return (
        <Box minH="100vh" position="relative" bg="gray.50" overflow="hidden">

            {/* background lighting */}
            <Box
                position="fixed"
                inset={0}
                bg="radial-gradient(circle at top, #ffffff 0%, #edf2f7 40%, #f7fafc 100%)"
                zIndex={0}
            />

            <NoiseOverlay />

            <Box position="relative" zIndex={1}>
                <Navbar />

                {/* HERO */}
                <Box position="relative" overflow="hidden">
                    <GeometricBackground />
                    <Hero />
                </Box>

                {/* CAROUSEL */}
                <Box position="relative">
                    <Carousel />
                </Box>

                {/* FEATURES */}
                <Box mt="40px">
                    <FeatureCards />
                </Box>
            </Box>
        </Box>
    );
}