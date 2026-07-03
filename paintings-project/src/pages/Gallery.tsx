import { useState, useEffect, useMemo } from "react";
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
import { useGalleryData } from "../hooks/useGalleryData";

const MotionBox = motion.create(Box);

// -----------------------------------------------------------------------------
// Debounce hook
// -----------------------------------------------------------------------------
function useDebounce(value: string, delay = 300) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
}

// -----------------------------------------------------------------------------
// FIXED highlight (no regex mutation bug)
// -----------------------------------------------------------------------------
function highlightText(text: string, query: string) {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, "gi");

    return text.split(regex).map((part, i) =>
        regex.test(part) ? (
            <Box as="span" bg="yellow.200" key={i}>
                {part}
            </Box>
        ) : (
            part
        )
    );
}

export default function Gallery() {
    const navigate = useNavigate();

    const [activeFilter, setActiveFilter] = useState("all");
    const [search, setSearch] = useState("");

    const debouncedSearch = useDebounce(search, 350);

    // 🔥 IMPORTANT: prevent unnecessary rerenders feeling like reload
    const stableSearch = useMemo(() => debouncedSearch, [debouncedSearch]);

    const {
        paintings,
        categories,
        loading,
        error,
    } = useGalleryData(activeFilter, stableSearch);

    const filters = useMemo(() => [
        { name: "All", slug: "all" },
        ...categories.map((c) => ({
            name: c.name,
            slug: c.slug,
        })),
    ], [categories]);

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

                        <InputGroup maxW="650px">
                            <InputLeftElement pointerEvents="none">
                                <SearchIcon color="gray.500" />
                            </InputLeftElement>

                            <Input
                                placeholder="Search paintings..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                bg="whiteAlpha.800"
                                backdropFilter="blur(18px)"
                                border="1px solid"
                                borderColor="blackAlpha.100"
                                borderRadius="full"
                                autoComplete="off"
                                spellCheck={false}
                                _focus={{
                                    borderColor: "blackAlpha.300",
                                    boxShadow: "0 0 0 1px rgba(0,0,0,0.1)",
                                }}
                            />
                        </InputGroup>
                    </VStack>

                    {/* FILTERS (UNCHANGED STYLE) */}
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
                                const isActive = activeFilter === filter.slug;

                                return (
                                    <Box
                                        key={filter.slug}
                                        px={5}
                                        py={2}
                                        borderRadius="full"
                                        cursor="pointer"
                                        transition="all 0.25s ease"
                                        bg={isActive ? "black" : "transparent"}
                                        color={isActive ? "white" : "black"}
                                        _hover={{
                                            transform: "translateY(-1px)",
                                            bg: isActive ? "black" : "gray.100",
                                        }}
                                        onClick={() => setActiveFilter(filter.slug)}
                                    >
                                        {filter.name}
                                    </Box>
                                );
                            })}
                        </Box>
                    </Box>

                    {/* GRID (NO RELOAD FEEL FIX) */}
                    <Grid
                        templateColumns={{
                            base: "1fr",
                            sm: "repeat(2,1fr)",
                            lg: "repeat(3,1fr)",
                            xl: "repeat(4,1fr)",
                        }}
                        gap={8}
                        transition="opacity 0.25s ease, transform 0.25s ease"
                        opacity={0.95}
                    >
                        {paintings.map((painting, index) => (
                            <MotionBox
                                key={painting._id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.25 }}
                                transition={{
                                    duration: 0.6,
                                    ease: "easeOut",
                                    delay: index * 0.02,
                                }}
                            >
                                <Box
                                    role="group"
                                    cursor="pointer"
                                    onClick={() =>
                                        navigate(`/painting/${painting._id}`)
                                    }
                                    borderRadius="2xl"
                                    overflow="hidden"
                                    bg="white"
                                    boxShadow="lg"
                                    transition="all 0.35s ease"
                                    _hover={{
                                        transform: "translateY(-8px)",
                                        boxShadow: "2xl",
                                    }}
                                >
                                    {/* IMAGE (UNCHANGED STYLE) */}
                                    <Box position="relative" overflow="hidden">
                                        <Image
                                            src={painting.imageUrls?.[0]}
                                            fallbackSrc="https://via.placeholder.com/400"
                                            h={`${300 + (index % 5) * 40}px`}
                                            w="100%"
                                            objectFit="cover"
                                            transition="all 0.6s ease"
                                            _groupHover={{
                                                transform: "scale(1.09)",
                                                filter: "brightness(0.75)",
                                            }}
                                        />

                                        <Box
                                            position="absolute"
                                            bottom={0}
                                            left={0}
                                            right={0}
                                            opacity={0}
                                            transition="all 0.35s ease"
                                            _groupHover={{ opacity: 1 }}
                                            bg="linear-gradient(to top, rgba(0,0,0,0.78), transparent)"
                                            height="45%"
                                            display="flex"
                                            alignItems="flex-end"
                                            justifyContent="center"
                                            pb={6}
                                        >
                                            <Text color="white" fontWeight="500">
                                                View Painting →
                                            </Text>
                                        </Box>
                                    </Box>

                                    {/* INFO */}
                                    <Box p={4}>
                                        <Text fontWeight="600">
                                            {highlightText(painting.title, stableSearch)}
                                        </Text>

                                        <Text fontSize="13px" color="gray.500">
                                            {highlightText(painting.artist, stableSearch)}
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