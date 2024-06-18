import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { auth } from "../firebase";
import {
  ChakraProvider,
  CSSReset,
  DarkMode,
  Box,
  Flex, // Importe o componente Flex
  Button, // Importe o componente Button
} from "@chakra-ui/react";
import theme from "../styles/Theme.js";
import AdminDashboard from "../components/AdminDashboard";
import AdminLogin from "../components/AdminLogin";
import AgendamentoForm from "../components/AgendamentoForm"; // Importe o componente AgendamentoForm
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [showAgendamentoForm, setShowAgendamentoForm] = useState(true); // Adicione o estado para controlar a exibição do formulário de agendamento

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Head>
        {/* Define o título da página */}
        <title>Agendamento | Laryssa Costa</title>
        {/* Define o ícone da página */}
        <link
          rel="icon"
          href="https://massagealternativa.com/images/logo-laryssa.jpg"
        />
      </Head>
      <Box className="container">
        {loading ? (
          <div>Carregando...</div>
        ) : (
          <>
            {/* Adicione o menu de escolha */}
            <Flex justify="space-between" p={4} borderBottom="1px solid #ccc">
              <Button onClick={() => setShowAgendamentoForm(false)}>
                Fazer Login
              </Button>
              <Button onClick={() => setShowAgendamentoForm(true)}>
                Marcar um Horário
              </Button>
            </Flex>

            {/* Condicionalmente renderize o formulário de agendamento ou o login */}
            {showAgendamentoForm ? (
              <AgendamentoForm />
            ) : user ? (
              <AdminDashboard />
            ) : (
              <AdminLogin />
            )}
          </>
        )}
      </Box>
    </ChakraProvider>
  );
}

export default MyApp;
