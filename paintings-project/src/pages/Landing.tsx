import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
      px={6}
    >
      <Box textAlign="center" maxW="lg">
        <VStack spacing={6}>
          <Heading size="2xl">
            Welcome to Paintings Project 🎨
          </Heading>

          <Text fontSize="lg" color="gray.600">
            A simple full-stack app built with React, Chakra UI, and Express.
            Login or create an account to continue.
          </Text>

          <VStack spacing={3} w="full">
            <Button as={Link} to="/login" colorScheme="blue" w="full">
              Login
            </Button>

            <Button as={Link} to="/signup" colorScheme="green" w="full">
              Sign Up
            </Button>
          </VStack>
        </VStack>
      </Box>
    </Box>
  );
}