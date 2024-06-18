import AgendamentoForm from "../components/AgendamentoForm";
import { Box, ChakraProvider, Container } from "@chakra-ui/react";
import theme from "../styles/Theme.js"; // Certifique-se de ter o caminho correto para o arquivo theme.js

export default function Home() {
  return (
    <ChakraProvider theme={theme}>
      <Container maxW="xl" centerContent p={8}>
        <Box textAlign="center">
          <h1>Agende sua Massagem Online</h1>
        </Box>
        <AgendamentoForm />
      </Container>
    </ChakraProvider>
  );
}
