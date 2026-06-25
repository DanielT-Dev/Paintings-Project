import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Input,
  VStack,
  Heading,
  Text,
} from "@chakra-ui/react";

export default function Login() {
  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
    >
      <Box
        w="sm"
        p={8}
        borderRadius="lg"
        boxShadow="md"
        bg="white"
      >
        <VStack spacing={4}>
          <Heading size="lg">Login</Heading>

          <Input placeholder="Email" type="email" />
          <Input placeholder="Password" type="password" />

          <Button colorScheme="blue" w="full">
            Login
          </Button>

          <Text fontSize="sm">
            No account?{" "}
            <Link to="/signup" style={{ color: "#3182ce" }}>
              Sign up
            </Link>
          </Text>
        </VStack>
      </Box>
    </Box>
  );
}