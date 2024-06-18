import { useState, useEffect } from "react";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { firestore } from "../firebase";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Container,
  Box,
  Text,
  ChakraProvider,
  extendTheme,
  CSSReset,
  Alert,
  AlertIcon,
  CloseButton,
} from "@chakra-ui/react";
import theme from "../styles/Theme.js";

const AgendamentoForm = () => {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");
  const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);
  const [mensagemAviso, setMensagemAviso] = useState("");
  const [mensagemSucesso, setMensagemSucesso] = useState("");

  useEffect(() => {
    async function fetchHorariosDisponiveis() {
      if (data === "") {
        setMensagemAviso("");
        return;
      }

      const hoje = new Date();
      const dataSelecionada = new Date(data);
      dataSelecionada.setDate(dataSelecionada.getDate() + 1);

      if (dataSelecionada < hoje) {
        setMensagemAviso("Não é possível selecionar uma data passada.");
        return;
      }

      const agendamentosRef = collection(firestore, "agendamentos");
      const q = query(agendamentosRef, where("data", "==", data));
      const snapshot = await getDocs(q);

      const horariosOcupados = snapshot.docs.map((doc) => doc.data().horario);
      const todosHorarios = [
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
      ];
      const horariosDisponiveis = todosHorarios.filter(
        (horario) => !horariosOcupados.includes(horario)
      );

      setHorariosDisponiveis(horariosDisponiveis);
      setMensagemAviso("");
    }

    fetchHorariosDisponiveis();
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data || !horario) {
      setMensagemAviso("Por favor, selecione uma data e horário.");
      return;
    }

    await addDoc(collection(firestore, "agendamentos"), {
      nome,
      telefone,
      email,
      data,
      horario,
    });

    setNome("");
    setTelefone("");
    setEmail("");
    setData("");
    setHorario("");
    setMensagemSucesso("Agendamento realizado com sucesso!");
  };

  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const day = date.getDate() + 1;
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Box bg="green.300" p={6} />
      <Container maxW="md">
        <Box
          bg="green.300"
          p={6}
          borderRadius="md"
          boxShadow="md"
          mt={6} // Espaço entre a parte superior e o formulário
        >
          <form onSubmit={handleSubmit}>
            <FormControl mb={3}>
              <FormLabel color="white">Nome</FormLabel>
              <Input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel color="white">Telefone</FormLabel>
              <Input
                type="text"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel color="white">E-mail</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel color="white">Data</FormLabel>
              <Input
                type="date"
                value={data}
                onChange={(e) => setData(e.target.value)}
              />
            </FormControl>
            {data && (
              <Text color="white" mb={3}>
                Data selecionada: {formatDate(data)}
              </Text>
            )}
            <FormControl mb={3}>
              <FormLabel color="white">Horário</FormLabel>
              <Select
                value={horario}
                onChange={(e) => setHorario(e.target.value)}
              >
                <option value="">Selecione um horário</option>
                {horariosDisponiveis.map((horario) => (
                  <option key={horario} value={horario}>
                    {horario}
                  </option>
                ))}
              </Select>
            </FormControl>
            <Button type="submit" colorScheme="green" size="md" mt={3}>
              Agendar Massagem
            </Button>
            {mensagemAviso && (
              <Alert status="error" mt={3}>
                <AlertIcon />
                {mensagemAviso}
                <CloseButton onClick={() => setMensagemAviso("")} />
              </Alert>
            )}
            {mensagemSucesso && (
              <Alert status="success" mt={3}>
                <AlertIcon />
                {mensagemSucesso}
                <CloseButton onClick={() => setMensagemSucesso("")} />
              </Alert>
            )}
          </form>
        </Box>
      </Container>
    </ChakraProvider>
  );
};

export default AgendamentoForm;
