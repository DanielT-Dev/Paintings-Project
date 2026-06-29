import { useState } from "react";
import {
    Box,
    Container,
    Heading,
    Text,
    Input,
    InputGroup,
    InputLeftElement,
    Grid,
    VStack,
    Image,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const MotionBox = motion(Box);

type Painting = {
    title: string;
    artist: string;
    image: string;
    height: string;
};

const paintings: Painting[] = [
    {
        title: "Starry Night",
        artist: "Vincent van Gogh",
        image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800",
        height: "420px",
    },
    {
        title: "Golden Horizon",
        artist: "Unknown Artist",
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800",
        height: "520px",
    },
    {
        title: "Silent Lake",
        artist: "Claude Monet",
        image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800",
        height: "360px",
    },
    {
        title: "Autumn Path",
        artist: "Unknown Artist",
        image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800",
        height: "480px",
    },
    {
        title: "Blue Mountains",
        artist: "Hokusai Inspired",
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800",
        height: "440px",
    },
    {
        title: "Dream Forest",
        artist: "Unknown Artist",
        image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800",
        height: "540px",
    },
    {
        title: "Morning Light",
        artist: "J. Turner",
        image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800",
        height: "380px",
    },
    {
        title: "Ancient Ruins",
        artist: "Unknown Artist",
        image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800",
        height: "500px",
    },
    {
        title: "Ocean Whisper",
        artist: "Claude Monet",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
        height: "450px",
    },
    {
        title: "Red Silence",
        artist: "Abstract Master",
        image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800",
        height: "470px",
    },
    {
        title: "Winter Glow",
        artist: "Unknown Artist",
        image: "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?w=800",
        height: "410px",
    },
    {
        title: "Eternal Fields",
        artist: "Van Gogh Inspired",
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800",
        height: "530px",
    },
];

const filters = [
    "All",
    "Renaissance",
    "Modern",
    "Impressionism",
    "Abstract",
    "Landscape",
];

export default function Gallery() {
    const navigate = useNavigate();

    const [activeFilter, setActiveFilter] = useState("All");

    const filteredPaintings =
        activeFilter === "All"
            ? paintings
            : paintings.filter((p) =>
                p.title.toLowerCase().includes(activeFilter.toLowerCase())
            );

    return (
        <>
            <Navbar />

            <Box bg="#fafafa" minH="100vh" pt="120px" pb={20}>
                <Container maxW="1400px">

                    {/* HEADER */}
                    <VStack spacing={4} mb={10}>
                        <Heading fontSize={{ base: "3xl", md: "5xl" }}>
                            Gallery
                        </Heading>

                        <Text color="gray.600" textAlign="center" maxW="600px">
                            Explore timeless masterpieces from artists around the world.
                        </Text>

                        {/* SEARCH */}
                        <InputGroup maxW="650px" mt={6}>
                            <InputLeftElement
                                h="56px"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                pointerEvents="none"
                            >
                                <SearchIcon color="gray.500" />
                            </InputLeftElement>

                            <Input
                                h="56px"
                                pl="48px"
                                placeholder="Search paintings..."
                                bg="whiteAlpha.800"
                                backdropFilter="blur(18px)"
                                border="1px solid"
                                borderColor="blackAlpha.100"
                                borderRadius="full"
                                _focus={{
                                    borderColor: "black",
                                    boxShadow: "0 0 0 1px black",
                                }}
                            />
                        </InputGroup>
                    </VStack>

                    {/* FILTERS */}
                    <Box mb={12} display="flex" justifyContent="center">
                        <Box
                            px={6}
                            py={4}
                            borderRadius="full"
                            bg="rgba(255,255,255,0.6)"
                            backdropFilter="blur(18px)"
                            border="1px solid rgba(0,0,0,0.06)"
                            boxShadow="0 10px 30px rgba(0,0,0,0.05)"
                            display="flex"
                            gap={3}
                            flexWrap="wrap"
                            justifyContent="center"
                        >
                            {filters.map((filter) => {
                                const isActive = activeFilter === filter;

                                return (
                                    <Box
                                        key={filter}
                                        px={5}
                                        py={2}
                                        borderRadius="full"
                                        fontSize="14px"
                                        cursor="pointer"
                                        transition="all 0.25s ease"
                                        bg={isActive ? "black" : "transparent"}
                                        color={isActive ? "white" : "black"}
                                        border="1px solid"
                                        borderColor={isActive ? "black" : "transparent"}
                                        _hover={{
                                            transform: "translateY(-2px)",
                                            boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                                        }}
                                        onClick={() => setActiveFilter(filter)}
                                    >
                                        {filter}
                                    </Box>
                                );
                            })}
                        </Box>
                    </Box>

                    {/* GRID */}
                    <Grid
                        templateColumns={{
                            base: "1fr",
                            sm: "repeat(2,1fr)",
                            lg: "repeat(3,1fr)",
                            xl: "repeat(4,1fr)",
                        }}
                        gap={8}
                    >
                        {filteredPaintings.map((painting, index) => (
                            <MotionBox
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.03,
                                    ease: "easeOut",
                                }}
                            >
                                <Box
                                    role="group"
                                    cursor="pointer"
                                    onClick={() => navigate(`/painting/${index}`)}
                                    borderRadius="2xl"
                                    overflow="hidden"
                                    bg="white"
                                    boxShadow="lg"
                                    position="relative"
                                >
                                    {/* IMAGE */}
                                    <Box position="relative" overflow="hidden">
                                        <Image
                                            src={painting.image}
                                            h={painting.height}
                                            w="100%"
                                            objectFit="cover"
                                            transition="all 0.5s ease"
                                            _groupHover={{
                                                transform: "scale(1.06)",
                                                filter: "brightness(0.85)",
                                            }}
                                        />

                                        {/* VIEW OVERLAY */}
                                        <Box
                                            position="absolute"
                                            bottom={0}
                                            left={0}
                                            right={0}
                                            opacity={0}
                                            transition="all 0.3s ease"
                                            _groupHover={{ opacity: 1 }}
                                            bg="linear-gradient(to top, rgba(0,0,0,0.75), transparent)"
                                            height="40%"
                                            display="flex"
                                            alignItems="flex-end"
                                            justifyContent="center"
                                            pb={6}
                                        >
                                            <Text color="white" fontWeight="500">
                                                View Painting →
                                            </Text>
                                        </Box>

                                        {/* FAVORITE */}
                                        <Box
                                            position="absolute"
                                            top="12px"
                                            right="12px"
                                            opacity={0}
                                            transition="all 0.25s ease"
                                            _groupHover={{ opacity: 1 }}
                                            bg="rgba(255,255,255,0.9)"
                                            px={3}
                                            py={2}
                                            borderRadius="full"
                                            fontSize="14px"
                                        >
                                            ❤️
                                        </Box>
                                    </Box>

                                    {/* INFO */}
                                    <Box p={4}>
                                        <Text fontWeight="600">
                                            {painting.title}
                                        </Text>
                                        <Text fontSize="13px" color="gray.500">
                                            {painting.artist}
                                        </Text>
                                    </Box>
                                </Box>
                            </MotionBox>
                        ))}
                    </Grid>

                </Container>
            </Box>
        </>
    );
}