import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Eye, ChevronUp, ChevronDown, Settings } from "lucide-react";

interface SubDocument {
  id: number;
  name: string;
  type: string;
}

interface DocumentData {
  id: number;
  number: string;
  status:
  | "aprovado"
  | "aprovado_registrado"
  | "aprovado_aguardando"
  | "anulado"
  | "nao_registrado";
  sei: string;
  dataCartorio: string;
  ra: string;
  processoAlteracao?: string | null;
}

// Atualize as cores dos status
const statusColors: Record<string, string> = {
  aprovado: "text-green-600 bg-green-100",
  aprovado_registrado: "text-green-700 bg-green-200",
  aprovado_aguardando: "text-yellow-700 bg-yellow-100",
  anulado: "text-red-600 bg-red-100",
  nao_registrado: "text-red-700 bg-red-200",
};

// Função para exibir o texto correto do status
const statusLabels: Record<DocumentData["status"], string> = {
  aprovado: "Aprovado",
  aprovado_registrado: "Aprovado - Registrado em cartório",
  aprovado_aguardando: "Aprovado - Aguardando Registro",
  anulado: "Anulado",
  nao_registrado: "Não registrado",
};

const handleDownloadAll = (documents: SubDocument[]) => {
  documents.forEach((doc) => {
    // Substitua pelo caminho real do arquivo
    const url = `/arquivos/${doc.name}.pdf`;
    const link = document.createElement("a");
    link.href = url;
    link.download = doc.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
};

const parseNumber = (number: string) => {
  // Exemplo: "urb/MDE/PSG 001-2024"
  const [prefix, rest] = number.split(" ", 2);
  const [urb, ...middle] = prefix.split("/");
  return {
    urb,
    middle: middle.join("/"),
    suffix: rest,
  };
};

const DocumentCard = ({
  document: doc,
  expanded,
  onExpand,
  isInicialAdm, // Propriedade para verificar se está na página InicialAdm
}: {
  document: DocumentData;
  expanded: boolean;
  onExpand: () => void;
  isInicialAdm?: boolean; // Propriedade opcional
}) => {
  const { urb, middle, suffix } = parseNumber(doc.number);

  // Exemplo de arquivos relacionados ao documento
  const files = [
    { name: `${doc.number}-anexo1`, label: "URB 001/2024" },
    { name: `${doc.number}-anexo2`, label: "MDE 001/2024" },
    { name: `${doc.number}-anexo3`, label: "PSG 001/2024" },
  ];

  const handleDownload = (fileName: string) => {
    const url = `/arquivos/${fileName}.pdf`;
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card
      className={`shadow-md hover:shadow-lg transition-shadow cursor-pointer select-none ${expanded ? "py-4" : "py-1"
        }`}
      onClick={onExpand}
    >
      <CardHeader className={`pb-2 pt-2 ${expanded ? "" : "py-1"}`}>
        <div className="flex items-center justify-between w-full">
          <span className="flex items-baseline gap-1 mr-4">
            <span className="text-lg font-extrabold">{urb}</span>
            {middle && (
              <span className="text-xs font-semibold text-gray-500">
                /{middle}
              </span>
            )}
            {suffix && (
              <span className="text-base font-bold ml-2">{suffix}</span>
            )}
          </span>
          <span
            className={`text-base px-3 py-1 rounded font-bold ${statusColors[doc.status]
              }`}
          >
            {statusLabels[doc.status]}
          </span>
        </div>
        {/* Botão de engrenagem no canto direito, visível apenas se expandido e na página InicialAdm */}
        {expanded && isInicialAdm && (
          <div className="absolute top-2 right-2">
            <button
              type="button"
              className="text-gray-700 hover:text-gray-900 transition"
              onClick={(e) => {
                e.stopPropagation();
                console.log("Engrenagem clicada para o documento:", doc.id);
              }}
              title="Configurações"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        )}
      </CardHeader>
      <CardContent className={expanded ? "pt-6 pb-4" : "py-0"}>
        {expanded && (
          <div>
            <p>
              <strong>SEI:</strong> {doc.sei}
            </p>
            <p>
              <strong>RA:</strong> {doc.ra}
            </p>
            <p>
              <strong>Processo de Alteração:</strong>{" "}
              {doc.processoAlteracao || "N/A"}
            </p>
            <p>
              <strong>Data de Registro:</strong> {doc.dataCartorio}
            </p>
            {/* Aba de arquivos */}
            <div className="mt-4 relative">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-gray-700">Arquivos</h4>

                {/* Botão de engrenagem para edição, visível apenas na página InicialAdm */}
                {isInicialAdm && (
                  <button
                    type="button"
                    className="text-gray-700 hover:text-gray-900 transition absolute -top-6 right-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("Engrenagem de edição clicada para o documento:", doc.id);
                    }}
                    title="Editar documento"
                  >
                    <Settings className="w-5 h-5" />
                  </button>
                )}
              </div>

              <div className="flex flex-col gap-2">
                {files.map((file) => (
                  <div
                    key={file.name}
                    className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded"
                  >
                    <span className="text-gray-800">{file.label}</span>
                    <div className="flex items-center gap-2">
                      {/* Botão de download */}
                      <button
                        type="button"
                        className="hover:text-red-600 flex items-center gap-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownload(file.name);
                        }}
                        title="Baixar arquivo"
                      >
                        <Download className="w-5 h-5" />
                      </button>
                      {/* Botão de visualizar */}
                      <button
                        type="button"
                        className="hover:text-red-600 flex items-center gap-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(`/arquivos/${file.name}.pdf`, "_blank");
                        }}
                        title="Visualizar arquivo"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface DocumentCardsProps {
  isInicialAdm?: boolean;
}

const DocumentCards: React.FC<DocumentCardsProps> = ({ isInicialAdm }) => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // Exemplo de documentos com os novos status:
  const documents: DocumentData[] = [
    {
      id: 1,
      number: "URB/MDE/PSG 001-2024",
      status: "aprovado",
      sei: "2345678-2024",
      dataCartorio: "10/05/2024",
      ra: "Paranoá",
      processoAlteracao: "ALT-2024-001",
    },
    {
      id: 2,
      number: "URB/MDE/PSG 002-2024",
      status: "aprovado_registrado",
      sei: "2345679-2024",
      dataCartorio: "12/05/2024",
      ra: "Ceilândia",
      processoAlteracao: null,
    },
    {
      id: 3,
      number: "URB/MDE/PSG 003-2024",
      status: "aprovado_aguardando",
      sei: "2345680-2024",
      dataCartorio: "13/05/2024",
      ra: "Asa Sul",
      processoAlteracao: "ALT-2024-002",
    },
    {
      id: 4,
      number: "URB/MDE/PSG 004-2024",
      status: "anulado",
      sei: "2345681-2024",
      dataCartorio: "14/05/2024",
      ra: "Samambaia",
      processoAlteracao: null,
    },
    {
      id: 5,
      number: "URB/MDE/PSG 005-2024",
      status: "nao_registrado",
      sei: "2345682-2024",
      dataCartorio: "15/05/2024",
      ra: "Águas Claras",
      processoAlteracao: "ALT-2024-003",
    },
    {
      id: 6,
      number: "URB/MDE/PSG 006-2024",
      status: "anulado",
      sei: "2345683-2024",
      dataCartorio: "16/05/2024",
      ra: "Paranoá",
      processoAlteracao: null,
    },
    {
      id: 7,
      number: "URB/MDE/PSG 007-2024",
      status: "aprovado",
      sei: "2345684-2024",
      dataCartorio: "17/05/2024",
      ra: "Ceilândia",
      processoAlteracao: "ALT-2024-004",
    },
    {
      id: 8,
      number: "URB/MDE/PSG 008-2024",
      status: "anulado",
      sei: "2345685-2024",
      dataCartorio: "18/05/2024",
      ra: "Samambaia",
      processoAlteracao: null,
    },
    {
      id: 9,
      number: "URB/MDE/PSG 009-2024",
      status: "anulado",
      sei: "2345686-2024",
      dataCartorio: "19/05/2024",
      ra: "Águas Claras",
      processoAlteracao: "ALT-2024-005",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 mb-8 items-start">
      {documents.map((doc) => (
        <DocumentCard
          key={doc.id}
          document={doc}
          expanded={expandedId === doc.id}
          onExpand={() => setExpandedId(expandedId === doc.id ? null : doc.id)}
          isInicialAdm={isInicialAdm} // Use o valor recebido da propriedade
        />
      ))}
    </div>
  );
};

export default DocumentCards;
