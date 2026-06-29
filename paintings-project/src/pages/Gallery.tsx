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
    Tag,
    Wrap,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

const MotionBox = motion(Box);

const paintings = [
    {
        title: "Starry Night",
        artist: "Vincent van Gogh",
        image:
            "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=700",
    },
    {
        title: "Golden Forest",
        artist: "Unknown",
        image:
            "https://images.unsplash.com/photo-1578301979108-0a1d1d44f1e2?w=700",
    },
    {
        title: "Silent Lake",
        artist: "Unknown",
        image:
            "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=700",
    },
    {
        title: "Autumn Light",
        artist: "Unknown",
        image:
            "https://images.unsplash.com/photo-1578926375605-eaf7559b1458?w=700",
    },
    {
        title: "Dream",
        artist: "Unknown",
        image:
            "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=700",
    },
    {
        title: "Morning",
        artist: "Unknown",
        image:
            "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=700",
    },
    {
        title: "Nature",
        artist: "Unknown",
        image:
            "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=700",
    },
    {
        title: "Reflection",
        artist: "Unknown",
        image:
            "https://images.unsplash.com/photo-1578301979108-0a1d1d44f1e2?w=700",
    },
];

const filters = [
    "All",
    "Renaissance",
    "Modern",
    "Oil",
    "Portrait",
    "Landscape",
    "Abstract",
];

export default function Gallery() {
    return (
        <>
            <Navbar />

            <Box bg="#fafafa" minH="100vh" pt="120px" pb={20}>
                <Container maxW="1400px">

                    <VStack spacing={4} mb={12}>
                        <Heading
                            fontSize={{ base: "3xl", md: "5xl" }}
                            fontWeight="700"
                        >
                            Gallery
                        </Heading>

                        <Text
                            color="gray.600"
                            textAlign="center"
                            maxW="600px"
                        >
                            Explore timeless masterpieces from artists around
                            the world.
                        </Text>

                        <InputGroup maxW="650px" mt={6}>
                            <InputLeftElement
                                pointerEvents="none"
                                h="56px"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
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

                        <Wrap
                            justify="center"
                            spacing={3}
                            mt={2}
                        >
                            {filters.map((filter) => (
                                <Tag
                                    key={filter}
                                    px={5}
                                    py={2}
                                    size="lg"
                                    cursor="pointer"
                                    borderRadius="full"
                                    bg="white"
                                    transition="all .25s"
                                    border="1px solid"
                                    borderColor="blackAlpha.100"
                                    _hover={{
                                        bg: "black",
                                        color: "white",
                                        transform: "translateY(-2px)",
                                    }}
                                >
                                    {filter}
                                </Tag>
                            ))}
                        </Wrap>
                    </VStack>

                    <Grid
                        templateColumns={{
                            base: "1fr",
                            sm: "repeat(2,1fr)",
                            lg: "repeat(3,1fr)",
                            xl: "repeat(4,1fr)",
                        }}
                        gap={10}
                    >
                        {paintings.map((painting, index) => (
                            <MotionBox
                                key={index}
                                whileHover={{
                                    y: -8,
                                    scale: 1.03,
                                }}
                                transition={{
                                    duration: .25,
                                }}
                            >
                                <VStack
                                    spacing={4}
                                    align="start"
                                >
                                    <Image
                                        src={painting.image}
                                        h="420px"
                                        w="100%"
                                        objectFit="cover"
                                        borderRadius="2xl"
                                        shadow="xl"
                                        transition="all .3s"
                                    />

                                    <Box>
                                        <Heading
                                            fontSize="xl"
                                            mb={1}
                                        >
                                            {painting.title}
                                        </Heading>

                                        <Text color="gray.500">
                                            {painting.artist}
                                        </Text>
                                    </Box>
                                </VStack>
                            </MotionBox>
                        ))}
                    </Grid>

                </Container>
            </Box>
        </>
    );
}