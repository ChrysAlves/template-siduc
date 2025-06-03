import { url } from "inspector";
import React from "react";
import { useNavigate } from "react-router-dom";

interface EscolhaOverlayProps {
  open: boolean;
  onClose: () => void;
  onSelect: (option: string) => void;
  onOpenReportModal: () => void;
}

const options = [
  {
    label: "Pesquisas",
    value: "Pesquisas",
    description: "Pesquisar por campos específicos",
    icon: (
      <img
        src="/SearchICON.svg"
        alt="Pesquisar"
        className="mr-2 w-16 h-16 "
        style={{ display: "inline-block" }}
      />
    ),
    bgColor: "bg-red-500",
  },
  {
    label: "Relatórios",
    value: "Relatório",
    description: "Gerar e imprimir relatórios",
    icon: (
      <img
        src="/RelatorioICON.svg"
        alt="Relatorio"
        className="mr-2 w-16 h-16 "
        style={{ display: "inline-block" }}
      />
    ),
    bgColor: "bg-red-600",
  },
  {
    label: "Administração",
    value: "Administração",
    description: "Configurar o sistema",
    icon: (
      <img
        src="/SettingsICON.svg"
        alt="Configurações"
        className="mr-2 w-16 h-16 "
        style={{ display: "inline-block" }}
      />
    ),
    bgColor: "bg-red-700",
  },
  {
    label: "Mapoteca",
    value: "Mapoteca",
    description: "Gerenciar Mapoteca",
    icon: (
      <img
        src="/MapotecaICON.svg"
        alt="Pesquisar"
        className="mr-2 w-16 h-16 "
        style={{ display: "inline-block" }}
      />
    ),
    bgColor: "bg-red-800",
  },
];

const EscolhaOverlay: React.FC<EscolhaOverlayProps> = ({
  open,
  onClose,
  onSelect,
  onOpenReportModal,
}) => {
  const navigate = useNavigate();

  if (!open) return null;

  const handleEscolhaSelect = (option: string) => {
    if (option === "Formulario") {
      onSelect(option);
    } else if (option === "Pesquisas") {
      onClose();
      navigate("/InicialAdm");
    } else if (option === "Relatório") {
      onClose();
      onOpenReportModal();
    } else if (option === "Mapoteca") {
      onClose();
      navigate("/mapoteca");
    } else if (option === "Administração") {
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
        <div className="w-full  justify-items-center  grid grid-cols-2 gap-4">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleEscolhaSelect(opt.value)}
              className={`flex p-4 w-80 text-white font-semibold hover:opacity-90 transition ${opt.bgColor}`}
            >
              <div className="text-5xl">{opt.icon}</div>
              <div>
                <div className="text-2xl font-bold">{opt.label}</div>
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
