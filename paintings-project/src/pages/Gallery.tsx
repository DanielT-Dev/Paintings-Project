import { useState, useEffect } from "react";
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
import { getPaintings } from "../api/paintings";

const MotionBox = motion.create(Box);

type Painting = {
    _id?: string;
    title: string;
    artist: string;
    imageUrls?: string[];
    tags?: string[];
};

export default function Gallery() {
    const navigate = useNavigate();

    const [paintings, setPaintings] = useState<Painting[]>([]);
    const [activeFilter, setActiveFilter] = useState("All");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // -------------------------------------------------------------------------
    // LOAD PAINTINGS (NOW BACKEND FILTERED)
    // -------------------------------------------------------------------------

    useEffect(() => {
        const loadPaintings = async () => {
            try {
                setLoading(true);

                const category =
                    activeFilter === "All"
                        ? undefined
                        : activeFilter.toLowerCase();

                const data = await getPaintings(category);

                console.log("PAINTINGS FROM API:", data);
                setPaintings(data);
            } catch (err) {
                setError("Failed to load paintings");
            } finally {
                setLoading(false);
            }
        };

        loadPaintings();
    }, [activeFilter]);

    // -------------------------------------------------------------------------
    // FILTERS (NOW JUST UI STATE, NOT DATA FILTERING)
    // -------------------------------------------------------------------------

    const filters = [
        "All",
        "Neoclassicism",
        "Romanticism",
        "Symbolism",
        "Realism",
        "Religion",
        "History",
    ];

    if (loading) {
        return (
            <>
                <Navbar />
                <Box pt="120px" textAlign="center">
                    Loading gallery...
                </Box>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Navbar />
                <Box pt="120px" textAlign="center" color="red.500">
                    {error}
                </Box>
            </>
        );
    }

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

                        <InputGroup maxW="650px" mt={6}>
                            <InputLeftElement pointerEvents="none">
                                <SearchIcon color="gray.500" />
                            </InputLeftElement>

                            <Input
                                placeholder="Search paintings..."
                                bg="whiteAlpha.800"
                                backdropFilter="blur(18px)"
                                border="1px solid"
                                borderColor="blackAlpha.100"
                                borderRadius="full"
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
                                        cursor="pointer"
                                        bg={isActive ? "black" : "transparent"}
                                        color={isActive ? "white" : "black"}
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
                        {paintings.map((painting, index) => (
                            <MotionBox
                                key={painting._id ?? `${painting.title}-${index}`}
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
                                    onClick={() =>
                                        navigate(`/painting/${painting._id ?? index}`)
                                    }
                                    borderRadius="2xl"
                                    overflow="hidden"
                                    bg="white"
                                    boxShadow="lg"
                                    position="relative"
                                >
                                    {/* IMAGE */}
                                    <Box position="relative" overflow="hidden">
                                        <Image
                                            src={painting.imageUrls?.[0]}
                                            fallbackSrc="https://via.placeholder.com/400"
                                            h={`${300 + (index % 5) * 40}px`}
                                            w="100%"
                                            objectFit="cover"
                                            transition="all 0.5s ease"
                                            _groupHover={{
                                                transform: "scale(1.06)",
                                                filter: "brightness(0.85)",
                                            }}
                                        />

                                        <Box
                                            position="absolute"
                                            bottom={0}
                                            left={0}
                                            right={0}
                                            opacity={0}
                                            _groupHover={{ opacity: 1 }}
                                            bg="linear-gradient(to top, rgba(0,0,0,0.75), transparent)"
                                            height="40%"
                                            display="flex"
                                            alignItems="flex-end"
                                            justifyContent="center"
                                            pb={6}
                                        >
                                            <Text color="white">
                                                View Painting →
                                            </Text>
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