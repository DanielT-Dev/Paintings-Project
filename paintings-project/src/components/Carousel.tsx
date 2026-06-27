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
        <Box mt="120px" position="relative" overflow="hidden" zIndex={2}>

            {/* fades */}
            <Box
                position="absolute"
                left={0}
                top={0}
                w="120px"
                h="100%"
                bg="linear-gradient(to right, #f7fafc, transparent)"
                zIndex={5}
                pointerEvents="none"
            />

            <Box
                position="absolute"
                right={0}
                top={0}
                w="120px"
                h="100%"
                bg="linear-gradient(to left, #f7fafc, transparent)"
                zIndex={5}
                pointerEvents="none"
            />

            <HStack
                spacing={16}
                w="max-content"
                animation="carouselScroll 50s linear infinite"
                align="center"
            >
                {[...images, ...images].map((src, i) => {
                    const centerBoost = i % 8 === 4;

                    return (
                        <Box
                            key={i}
                            flex="0 0 auto"
                            transition="0.4s"
                            transform={`scale(${centerBoost ? 1.05 : 0.95}) rotate(${i % 2 ? 2 : -2}deg)`}
                            opacity={centerBoost ? 1 : 0.7}
                            _hover={{
                                transform: "scale(1.08) rotate(0deg)",
                                opacity: 1,
                            }}
                        >
                            <Image
                                src={src}
                                w="320px"
                                h="420px"
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