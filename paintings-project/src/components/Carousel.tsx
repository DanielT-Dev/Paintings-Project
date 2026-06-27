import { Box, Image, HStack } from "@chakra-ui/react";

const images = [
    "/paintings/painting1.jpg",
    "/paintings/painting2.jpg",
    "/paintings/painting3.jpg",
    "/paintings/painting4.jpg",
    "/paintings/painting5.jpg",
    "/paintings/painting6.jpg",
    "/paintings/painting7.jpg",
    "/paintings/painting8.jpg",
];

export default function Carousel() {
    return (
        <Box
            mt="100px"
            position="relative"
            overflow="hidden"
            zIndex={2}
        >
            {/* LEFT FADE */}
            <Box
                position="absolute"
                left="0"
                top="0"
                w="120px"
                h="100%"
                zIndex={5}
                pointerEvents="none"
                bg="linear-gradient(to right, #f7fafc, transparent)"
            />

            {/* RIGHT FADE */}
            <Box
                position="absolute"
                right="0"
                top="0"
                w="120px"
                h="100%"
                zIndex={5}
                pointerEvents="none"
                bg="linear-gradient(to left, #f7fafc, transparent)"
            />

            <HStack
                spacing={16}
                w="max-content"
                animation="carouselScroll 45s linear infinite"
                align="center"
            >
                {[...images, ...images].map((src, i) => {
                    const isEdge = i % 8 === 0 || i % 8 === 7;

                    return (
                        <Box
                            key={i}
                            flex="0 0 auto"
                            transform={`rotate(${i % 2 === 0 ? -2 : 2}deg)`}
                            transition="0.3s"
                            opacity={isEdge ? 0.6 : 1}
                            filter={isEdge ? "blur(0.5px)" : "none"}
                            _hover={{
                                transform: "scale(1.07) rotate(0deg)",
                                opacity: 1,
                                filter: "none",
                            }}
                        >
                            <Image
                                src={src}
                                w="310px"
                                h="410px"
                                objectFit="cover"
                                borderRadius="14px"
                                boxShadow="lg"
                            />
                        </Box>
                    );
                })}
            </HStack>
        </Box>
    );
}