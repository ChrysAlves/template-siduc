import React, { useState } from "react";

interface LoginOverlayProps {
  open: boolean;
  onClose: () => void;
  onLoginSucesso: () => void;
}

const LoginOverlay: React.FC<LoginOverlayProps> = ({
  open,
  onClose,
  onLoginSucesso,
}) => {
  const [isRegister, setIsRegister] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  // Campos de cadastro
  const [email, setEmail] = useState("");
  const [matricula, setMatricula] = useState("");
  const [orgao, setOrgao] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  if (!open) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSucesso();
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode adicionar validação e lógica de cadastro
    if (pass !== confirmPass) {
      alert("As senhas não coincidem!");
      return;
    }
    // Simula cadastro
    alert("Cadastro realizado com sucesso!");
    setIsRegister(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg relative flex flex-col items-center">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-red-700 text-2xl"
          onClick={onClose}
          aria-label="Fechar"
          type="button"
        >
          ×
        </button>
        <div className="text-center mb-8">
          <img
            src="/logosisductext.png"
            alt="SISDUC"
            className="h-180 w-auto mx-auto"
            style={{ maxHeight: 180 }}
          />
        </div>
        {isRegister ? (
          <>
            <form
              className="w-full flex flex-col gap-4"
              onSubmit={handleRegister}
            >
              <input
                type="email"
                className="w-full border-2 border-red-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-700 text-lg"
                placeholder="E-mail institucional"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="text"
                className="w-full border-2 border-red-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-700 text-lg"
                placeholder="Matrícula"
                value={matricula}
                onChange={(e) => setMatricula(e.target.value)}
                required
              />
              <input
                type="text"
                className="w-full border-2 border-red-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-700 text-lg"
                placeholder="Órgão"
                value={orgao}
                onChange={(e) => setOrgao(e.target.value)}
                required
              />
              <input
                type="password"
                className="w-full border-2 border-red-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-700 text-lg"
                placeholder="Senha"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                required
              />
              <input
                type="password"
                className="w-full border-2 border-red-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-700 text-lg"
                placeholder="Confirmar senha"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                required
              />
              <button
                type="submit"
                className="w-full bg-red-700 text-white font-semibold py-3 rounded-lg mt-2 hover:bg-red-800 transition"
              >
                Cadastrar
              </button>
            </form>
            <button
              className="mt-4 text-red-700 underline"
              onClick={() => setIsRegister(false)}
              type="button"
            >
              Já tem cadastro? Fazer login
            </button>
          </>
        ) : (
          <>
            <form className="w-full flex flex-col gap-4" onSubmit={handleLogin}>
              <input
                type="text"
                className="w-full border-2 border-red-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-700 text-lg"
                placeholder="Usuário"
                value={user}
                onChange={(e) => setUser(e.target.value)}
              />
              <input
                type="password"
                className="w-full border-2 border-red-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-700 text-lg"
                placeholder="Senha"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
              <button
                type="submit"
                className="w-full bg-red-700 text-white font-semibold py-3 rounded-lg mt-2 hover:bg-red-800 transition"
              >
                Entrar
              </button>
            </form>
            <button
              className="mt-4 text-red-700 underline"
              onClick={() => setIsRegister(true)}
              type="button"
            >
              Não tem cadastro? Clique aqui
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginOverlay;
