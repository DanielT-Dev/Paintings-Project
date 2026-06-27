import { Box } from "@chakra-ui/react";
import GeometricBackground from "../components/GeometricBackground";
import Navbar from "../components/Navbar";

export default function Landing() {
    return (
        <Box minH="100vh" position="relative" overflow="hidden" bg="gray.50">
            <GeometricBackground />
            <Navbar />
            <Box h="80px" />
        </Box>
    );
}