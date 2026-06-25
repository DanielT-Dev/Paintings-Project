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
    errors,
    setErrors,
    reset,
  } = useAuthForm();

  const handleSignUp = async () => {
    const result = validateAuth(email, password);
    setErrors(result);

    if (Object.keys(result).length > 0) return;

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Signup failed");
      }

      toast({
        title: "Account created",
        description: data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      reset();
    } catch (err: any) {
      toast({
        title: "Signup failed",
        description: err.message,
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
        <VStack spacing={3} align="stretch">
          <Heading textAlign="center">Sign Up</Heading>

          <Box>
            <Input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <Text fontSize="sm" color="red.500">
                {errors.email}
              </Text>
            )}
          </Box>

          <Box>
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <Text fontSize="sm" color="red.500">
                {errors.password}
              </Text>
            )}
          </Box>

          <Button
            colorScheme="green"
            onClick={handleSignUp}
            isLoading={loading}
          >
            Create account
          </Button>

          <Text fontSize="sm" textAlign="center">
            Already have an account? <Link to="/">Login</Link>
          </Text>
        </VStack>
      </Box>
    </Box>
  );
}