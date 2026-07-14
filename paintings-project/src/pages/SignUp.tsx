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
import { useState } from "react";
import { createUser } from "../api/users";

export default function SignUp() {
  const toast = useToast();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must contain at least 6 characters";
    }

    return newErrors;
  };

  const reset = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setErrors({});
  };

  const handleSignUp = async () => {
    const validationErrors = validateForm();

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      setLoading(true);

      const user = await createUser(
        username,
        email,
        password
      );

      toast({
        title: "Account created",
        description: `Welcome ${user.username}!`,
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
        bg="white"
        borderRadius="lg"
        boxShadow="md"
      >
        <VStack spacing={3} align="stretch">

          <Heading textAlign="center">
            Sign Up
          </Heading>

          <Box>
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            {errors.username && (
              <Text fontSize="sm" color="red.500">
                {errors.username}
              </Text>
            )}
          </Box>


          <Box>
            <Input
              placeholder="Email"
              type="email"
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
            Already have an account?{" "}
            <Link to="/login">
              Login
            </Link>
          </Text>

        </VStack>
      </Box>
    </Box>
  );
}