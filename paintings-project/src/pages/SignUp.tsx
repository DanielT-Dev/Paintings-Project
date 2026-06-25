import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Input,
  VStack,
  Heading,
  Text,
} from "@chakra-ui/react";

export default function SignUp() {
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
          <Heading size="lg">Sign Up</Heading>

          <Input placeholder="Email" type="email" />
          <Input placeholder="Password" type="password" />

          <Button colorScheme="green" w="full">
            Create account
          </Button>

          <Text fontSize="sm">
            Already have an account?{" "}
            <Link to="/" style={{ color: "#3182ce" }}>
              Login
            </Link>
          </Text>
        </VStack>
      </Box>
    </Box>
  );
}