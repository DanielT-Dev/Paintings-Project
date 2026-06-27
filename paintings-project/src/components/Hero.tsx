import { Box, Text, Button, VStack, HStack } from "@chakra-ui/react";
import { FiArrowRight } from "react-icons/fi";

export default function Hero() {
    return (
        <Box
            position="relative"
            zIndex={2}
            pt="140px"
            textAlign="center"
        >
            <VStack spacing={6}>
                <Text
                    fontSize={{ base: "36px", md: "56px" }}
                    fontWeight="600"
                    lineHeight="1.1"
                >
                    Paintings that tell stories
                </Text>

                <Text opacity={0.6} maxW="600px">
                    Discover meaning, history, and emotion hidden inside masterpieces from around the world.
                </Text>

                <HStack spacing={4} pt={4}>
                    <Button
                        bg="black"
                        color="white"
                        _hover={{ bg: "gray.800" }}
                        rightIcon={<FiArrowRight />}
                    >
                        Explore Gallery
                    </Button>

                    <Button variant="ghost">
                        Learn more
                    </Button>
                </HStack>
            </VStack>
        </Box>
    );
}