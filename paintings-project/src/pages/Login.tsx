import {
  Box,
  Button,
  Input,
  VStack,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuthForm } from "../hooks/useAuthForm";
import { validateAuth } from "../utils/authValidation";

export default function Login() {
  const toast = useToast();

  const {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    setLoading,
    reset,
  } = useAuthForm();

  const handleLogin = async () => {
    const errors = validateAuth(email, password);

    const hasErrors = Object.keys(errors).length > 0;

    if (hasErrors) {
      toast({
        title: "Please fix the following issues",
        description: Object.values(errors).join(" • "),
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    try {
      setLoading(true);

      await new Promise((res) => setTimeout(res, 1000));

      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      reset();
    } catch {
      toast({
        title: "Login failed",
        description: "Something went wrong. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center" bg="gray.50">
      <Box w="sm" p={8} bg="white" borderRadius="lg" boxShadow="md">
        <VStack spacing={4}>
          <Heading>Login</Heading>

          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            colorScheme="blue"
            w="full"
            onClick={handleLogin}
            isLoading={loading}
          >
            Login
          </Button>

          <Text fontSize="sm">
            No account? <Link to="/signup">Sign up</Link>
          </Text>
        </VStack>
      </Box>
    </Box>
  );
}