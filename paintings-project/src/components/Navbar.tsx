import { Box, Flex, Text, HStack, Button } from "@chakra-ui/react";
import { FiLogIn, FiUserPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();

    return (
        <Box
            position="fixed"
            top="0"
            left="0"
            w="100%"
            zIndex="1000"
            backdropFilter="blur(16px)"
            bg="rgba(255,255,255,0.65)"
            borderBottom="1px solid rgba(0,0,0,0.06)"
        >
            <Flex
                maxW="1200px"
                mx="auto"
                px={6}
                py={4}
                align="center"
                justify="space-between"
            >
                {/* Logo */}
                <Text
                    fontWeight="600"
                    fontSize="18px"
                    cursor="pointer"
                    onClick={() => navigate("/")}
                >
                    Paintings
                </Text>

                {/* Links */}
                <HStack spacing={8} display={{ base: "none", md: "flex" }}>
                    <Text fontSize="14px" opacity={0.7} cursor="pointer">
                        Gallery
                    </Text>
                    <Text fontSize="14px" opacity={0.7} cursor="pointer">
                        Stories
                    </Text>
                    <Text fontSize="14px" opacity={0.7} cursor="pointer">
                        Explore
                    </Text>
                </HStack>

                {/* Buttons */}
                <HStack spacing={3}>
                    <Button
                        size="sm"
                        variant="ghost"
                        leftIcon={<FiLogIn />}
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </Button>

                    <Button
                        size="sm"
                        bg="black"
                        color="white"
                        leftIcon={<FiUserPlus />}
                        _hover={{ bg: "gray.800" }}
                        onClick={() => navigate("/signup")}
                    >
                        Sign up
                    </Button>
                </HStack>
            </Flex>
        </Box>
    );
}