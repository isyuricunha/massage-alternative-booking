import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { auth, initializeApp } from "../firebase";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import {
  Container,
  Heading,
  Box,
  Text,
  ChakraProvider,
  CSSReset,
  extendTheme,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import theme from "../styles/Theme.js"; // Certifique-se de ter o caminho correto para o arquivo theme.js

const AdminDashboard = () => {
  const router = useRouter();
  const [agendamentos, setAgendamentos] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        router.push("/agenda");
      } else {
        const firestore = getFirestore();

        const agendamentosRef = collection(firestore, "agendamentos");
        const snapshot = await getDocs(agendamentosRef);
        const agendamentosData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setAgendamentos(agendamentosData);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Função para formatar a data no formato DD/MM/AAAA
  const formatDate = (date) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(date).toLocaleDateString("pt-BR", options);
  };

  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Container maxW="md">
        <Box p={6}>
          <Heading as="h2" size="lg" mb={3}>
            Área de Administração
          </Heading>
          <Text mb={3}>Agendamentos:</Text>
          <UnorderedList>
            {agendamentos.map((agendamento) => (
              <ListItem key={agendamento.id}>
                <Text>
                  Nome: {agendamento.nome}, Telefone: {agendamento.telefone},
                  Email: {agendamento.email}, Data:{" "}
                  {formatDate(agendamento.data)}, Horário: {agendamento.horario}
                </Text>
              </ListItem>
            ))}
          </UnorderedList>
        </Box>
      </Container>
    </ChakraProvider>
  );
};

export default AdminDashboard;
