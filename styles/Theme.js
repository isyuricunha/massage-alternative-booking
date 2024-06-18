import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    purple: {
      500: "#6B46C1", // Cor principal roxa
    },
  },
  components: {
    Button: {
      // Estilize o componente Button
      baseStyle: {
        borderRadius: "md",
        fontWeight: "bold",
      },
      sizes: {
        md: {
          fontSize: "md",
          px: 6,
          py: 3,
        },
      },
      variants: {
        purple: {
          bg: "purple.500",
          color: "black",
          _hover: {
            bg: "purple.600",
          },
        },
      },
    },
  },
});

export default theme;
