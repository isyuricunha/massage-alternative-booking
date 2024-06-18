import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Box,
  ChakraProvider,
  extendTheme,
  CSSReset,
} from "@chakra-ui/react";
import theme from "../styles/Theme.js";
import { useRouter } from "next/router"; // Importe o useRouter

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const router = useRouter(); // Inicialize o useRouter

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!isRegistering) {
        await signInWithEmailAndPassword(auth, email, password);

        // Redirecionar para a área de administração após o login
        router.push("/admin/dashboard");
      }
    } catch (error) {
      console.error("Erro ao autenticar:", error);
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        padding="1rem"
        backgroundColor="gray.50"
      >
        <Box
          p="4"
          borderRadius="md"
          boxShadow="md"
          backgroundColor="white"
          width="100%"
          maxWidth="400px"
          textAlign="center"
        >
          <Heading as="h2" size="md" mb="4">
            {isRegistering ? "Cadastro" : "Login"} de Administração
          </Heading>
          <form onSubmit={handleSubmit}>
            <FormControl mb="3">
              <FormLabel>E-mail</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                size="sm"
              />
            </FormControl>
            <FormControl mb="3">
              <FormLabel>Senha</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                size="sm"
              />
            </FormControl>
            <Button type="submit" colorScheme="teal" size="sm" mb="3">
              {isRegistering ? "Cadastrar" : "Entrar"}
            </Button>
          </form>
          {/* ... (código do botão para alternar entre cadastro e login permanece o mesmo) */}
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default AdminLogin;
