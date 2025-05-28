import React, { useState } from "react";

interface LoginOverlayProps {
  open: boolean;
  onClose: () => void;
  onLoginSucesso: () => void; // NOVA PROP
}

const LoginOverlay: React.FC<LoginOverlayProps> = ({
  open,
  onClose,
  onLoginSucesso,
}) => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSucesso(); // Chama para abrir o EscolhaOverlay
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
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
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
      </div>
    </div>
  );
};

export default LoginOverlay;
