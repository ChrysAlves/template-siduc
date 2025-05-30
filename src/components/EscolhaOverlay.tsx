import React from "react";
import { useNavigate } from "react-router-dom";

interface EscolhaOverlayProps {
  open: boolean;
  onClose: () => void;
  onSelect: (option: string) => void;
}

const options = [
  { label: "Pesquisas", value: "Pesquisas", description: "Pesquisar por campos específicos ou realizar pesquisa avançada", icon: "🔍", bgColor: "bg-red-500" },
  { label: "Relatórios", value: "Relatório", description: "Gerar e imprimir relatórios", icon: "📄", bgColor: "bg-red-600" },
  { label: "Administração", value: "Administração", description: "Configurar o sistema", icon: "🛠️", bgColor: "bg-red-700" },
  { label: "Mapoteca", value: "Mapoteca", description: "Gerenciar Mapoteca", icon: "📂", bgColor: "bg-red-800" },
  { label: "Formulário", value: "Formulario", description: "Preencher formulários", icon: "📝", bgColor: "bg-red-900" },
];

const EscolhaOverlay: React.FC<EscolhaOverlayProps> = ({
  open,
  onClose,
  onSelect,
}) => {
  const navigate = useNavigate();

  if (!open) return null;

  const handleEscolhaSelect = (option: string) => {
    if (option === "Formulario") {
      onSelect(option);
    } else if (option === "Pesquisas") {
      onClose();
      navigate("/");
    } else if (option === "Relatório") {
      onClose();
      navigate("/relatorio");
    } else if (option === "Mapoteca") {
      onClose();
      navigate("/mapoteca");
    } else if (option === "Mapoteca") {
      onClose();
      navigate("/administracao");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-4xl relative flex flex-col items-center">
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
        <div className="w-full grid grid-cols-3 gap-4">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleEscolhaSelect(opt.value)}
              className={`flex flex-col justify-between items-start p-4  text-white font-semibold hover:opacity-90 transition ${opt.bgColor}`}
            >
              <div className="text-4xl">{opt.icon}</div>
              <div>
                <div className="text-lg font-bold">{opt.label}</div>
                <div className="text-sm mt-1">{opt.description}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EscolhaOverlay;
