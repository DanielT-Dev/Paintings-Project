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
      newErrors.password =
        "Password must contain at least 6 characters";
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
      position="relative"
      overflow="hidden"
      bgGradient="linear(to-br, gray.50, purple.50, blue.50)"
    >

      {/* Decorative background glow */}
      <Box
        position="absolute"
        width="450px"
        height="450px"
        bg="purple.200"
        opacity={0.35}
        filter="blur(120px)"
        top="-150px"
        left="-100px"
      />

      <Box
        position="absolute"
        width="400px"
        height="400px"
        bg="blue.200"
        opacity={0.35}
        filter="blur(120px)"
        bottom="-150px"
        right="-100px"
      />



      {/* Main card */}
      <Box
        width={{
          base: "90%",
          sm: "420px",
        }}
        p={10}
        bg="rgba(255,255,255,0.75)"
        backdropFilter="blur(20px)"
        borderRadius="3xl"
        border="1px solid"
        borderColor="gray.200"
        boxShadow="0 20px 60px rgba(0,0,0,0.12)"
        position="relative"
      >

        <VStack
          spacing={5}
          align="stretch"
        >

          <Heading
            textAlign="center"
            fontSize="3xl"
            color="gray.800"
            fontWeight="700"
          >
            Create Account
          </Heading>


          <Text
            textAlign="center"
            color="gray.500"
            fontSize="sm"
          >
            Join the digital museum experience
          </Text>



          {/* Username */}
          <Box>
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              bg="white"
              borderColor="gray.200"
              borderRadius="xl"
              height="48px"
              _hover={{
                borderColor: "purple.300",
              }}
              _focus={{
                borderColor: "purple.400",
                boxShadow: "0 0 0 2px rgba(159,122,234,0.3)",
              }}
            />

            {errors.username && (
              <Text
                mt={1}
                fontSize="sm"
                color="red.500"
              >
                {errors.username}
              </Text>
            )}
          </Box>



          {/* Email */}
          <Box>
            <Input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              bg="white"
              borderColor="gray.200"
              borderRadius="xl"
              height="48px"
              _hover={{
                borderColor: "purple.300",
              }}
              _focus={{
                borderColor: "purple.400",
                boxShadow: "0 0 0 2px rgba(159,122,234,0.3)",
              }}
            />

            {errors.email && (
              <Text
                mt={1}
                fontSize="sm"
                color="red.500"
              >
                {errors.email}
              </Text>
            )}
          </Box>



          {/* Password */}
          <Box>
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              bg="white"
              borderColor="gray.200"
              borderRadius="xl"
              height="48px"
              _hover={{
                borderColor: "purple.300",
              }}
              _focus={{
                borderColor: "purple.400",
                boxShadow: "0 0 0 2px rgba(159,122,234,0.3)",
              }}
            />

            {errors.password && (
              <Text
                mt={1}
                fontSize="sm"
                color="red.500"
              >
                {errors.password}
              </Text>
            )}
          </Box>



          <Button
            mt={3}
            height="50px"
            borderRadius="xl"
            color="white"
            bgGradient="linear(to-r, purple.500, blue.500)"
            onClick={handleSignUp}
            isLoading={loading}
            fontSize="md"
            boxShadow="0 10px 25px rgba(128,90,213,0.25)"
            transition="all 0.25s"
            _hover={{
              transform: "translateY(-2px)",
              boxShadow:
                "0 15px 35px rgba(128,90,213,0.35)",
            }}
          >
            Create account
          </Button>



          <Text
            textAlign="center"
            fontSize="sm"
            color="gray.500"
          >
            Already have an account?{" "}

            <Link
              to="/login"
              style={{
                color: "#805AD5",
                fontWeight: "600",
              }}
            >
              Login
            </Link>

          </Text>


        </VStack>

      </Box>

    </Box>
  );
}