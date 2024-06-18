import Link from "next/link";

const EmailPendingConfirmation = () => {
  return (
    <div>
      <h2>Confirmação de E-mail Pendente</h2>
      <p>
        Você ainda não confirmou seu endereço de e-mail. Por favor, verifique
        sua caixa de entrada e clique no link de confirmação.
      </p>
      <p>
        Já confirmou seu e-mail?{" "}
        <Link href="/admin-login">Faça login aqui</Link>.
      </p>
    </div>
  );
};

export default EmailPendingConfirmation;
