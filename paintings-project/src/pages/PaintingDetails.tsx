import {
    Box,
    Container,
    Heading,
    Text,
    Image,
    VStack,
    HStack,
    Grid,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

// TEMP SAME DATA (later you can move to shared file or API)
const paintings = [
    {
        title: "Starry Night",
        artist: "Vincent van Gogh",
        year: "1889",
        medium: "Oil on canvas",
        description:
            "A swirling night sky over a quiet town, expressing emotional turbulence and cosmic beauty.",
        image:
            "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1200",
    },
    {
        title: "Golden Horizon",
        artist: "Unknown Artist",
        year: "1900",
        medium: "Oil on canvas",
        description:
            "A warm landscape capturing the fading light of day over endless fields.",
        image:
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200",
    },
    {
        title: "Silent Lake",
        artist: "Claude Monet",
        year: "1895",
        medium: "Oil on canvas",
        description:
            "A calm reflection of nature where water and sky become one.",
        image:
            "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200",
    },
];

export default function PaintingDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const painting = paintings[Number(id) % paintings.length];

    if (!painting) return null;

    return (
        <Box bg="#fafafa" minH="100vh" pt="100px" pb={20}>
            <Container maxW="1100px">

                {/* BACK BUTTON */}
                <Text
                    mb={6}
                    cursor="pointer"
                    onClick={() => navigate(-1)}
                    opacity={0.6}
                    _hover={{ opacity: 1 }}
                >
                    ← Back to Gallery
                </Text>

                {/* HERO IMAGE */}
                <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Image
                        src={painting.image}
                        w="100%"
                        h={{ base: "300px", md: "500px" }}
                        objectFit="cover"
                        borderRadius="2xl"
                        boxShadow="xl"
                    />
                </MotionBox>

                {/* INFO */}
                <VStack align="start" mt={10} spacing={4}>
                    <Heading fontSize={{ base: "2xl", md: "4xl" }}>
                        {painting.title}
                    </Heading>

                    <HStack spacing={6} color="gray.600">
                        <Text>{painting.artist}</Text>
                        <Text>•</Text>
                        <Text>{painting.year}</Text>
                        <Text>•</Text>
                        <Text>{painting.medium}</Text>
                    </HStack>

                    <Text color="gray.700" maxW="700px" lineHeight="1.8">
                        {painting.description}
                    </Text>
                </VStack>

                {/* RELATED WORKS */}
                <Box mt={16}>
                    <Heading fontSize="xl" mb={6}>
                        Related Works
                    </Heading>

                    <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                        {paintings.map((p, i) => (
                            <Box
                                key={i}
                                cursor="pointer"
                                onClick={() => navigate(`/painting/${i}`)}
                                _hover={{ transform: "translateY(-5px)" }}
                                transition="0.3s"
                            >
                                <Image
                                    src={p.image}
                                    h="180px"
                                    w="100%"
                                    objectFit="cover"
                                    borderRadius="xl"
                                />
                                <Text mt={2} fontWeight="500">
                                    {p.title}
                                </Text>
                            </Box>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
}