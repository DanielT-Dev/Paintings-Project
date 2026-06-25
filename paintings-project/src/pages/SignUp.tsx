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

export default function SignUp() {
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

  const handleSignUp = async () => {
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

      await new Promise((res) => setTimeout(res, 1200));

      toast({
        title: "Account created",
        description: "You can now log in.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      reset();
    } catch {
      toast({
        title: "Signup failed",
        description: "Please try again later.",
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
          <Heading>Sign Up</Heading>

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
            colorScheme="green"
            w="full"
            onClick={handleSignUp}
            isLoading={loading}
          >
            Create account
          </Button>

          <Text fontSize="sm">
            Already have an account? <Link to="/">Login</Link>
          </Text>
        </VStack>
      </Box>
    </Box>
  );
}