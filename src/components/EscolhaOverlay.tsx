import React from "react";
import { useNavigate } from "react-router-dom";

interface EscolhaOverlayProps {
  open: boolean;
  onClose: () => void;
  onSelect: (option: string) => void;
}

const options = [
  { label: "Pesquisas", value: "Pesquisas" },
  { label: "Relatório", value: "Relatório" },
  { label: "Administração", value: "Administração" },
];

const EscolhaOverlay: React.FC<EscolhaOverlayProps> = ({
  open,
  onClose,
  onSelect,
}) => {
  const navigate = useNavigate();

  if (!open) return null;

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
        <img
          src="/logosisductext.png"
          alt="SISDUC"
          className="h-180 w-auto mx-auto mb-8"
          style={{ maxHeight: 180 }}
        />
        <h2 className="text-2xl font-bold mb-6 text-center text-red-700">
          Escolha uma opção
        </h2>
        <div className="w-full flex flex-col gap-4">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                onSelect(opt.value);
                onClose();
                if (opt.value === "Pesquisas") {
                  navigate("/");
                }
                if (opt.value === "Relatório") {
                  navigate("/relatorio");
                }
                if (opt.value === "Administração") {
                  navigate("/administracao"); // Defina a rota desejada aqui
                }
              }}
              className="w-full bg-red-700 text-white font-semibold py-3 rounded-lg hover:bg-red-800 transition"
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EscolhaOverlay;
