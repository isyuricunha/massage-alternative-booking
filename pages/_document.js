import Document, { Html, Head, Main, NextScript } from "next/document";
import { ColorModeScript } from "@chakra-ui/react"; // Importe o ColorModeScript do Chakra UI

class MyDocument extends Document {
  render() {
    return (
      <Html lang="pt-BR">
        <Head />
        <body>
          <ColorModeScript initialColorMode="dark" />{" "}
          {/* Altere para "dark" para um tema inicial escuro */}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
