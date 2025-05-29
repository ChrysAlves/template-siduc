import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Eye, ChevronUp, ChevronDown } from "lucide-react";

interface SubDocument {
  id: number;
  name: string;
  type: string;
}

interface Document {
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
const statusLabels: Record<Document["status"], string> = {
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
  document,
  expanded,
  onExpand,
}: {
  document: Document;
  expanded: boolean;
  onExpand: () => void;
}) => {
  const { urb, middle, suffix } = parseNumber(document.number);

  // Exemplo de anexos fictícios para cada documento
  const files = [
    { name: `${document.number}-anexo1`, label: "Matriz de Localização", icon: <Download className="w-4 h-4" /> },
    { name: `${document.number}-anexo2`, label: "Planta de Situação", icon: <Download className="w-4 h-4" /> },
    { name: `${document.number}-anexo3`, label: "Memorial Descritivo", icon: <Download className="w-4 h-4" /> },
  ];

  // Função para baixar um arquivo individual
  const handleDownload = (fileName: string) => {
    const url = `/arquivos/${fileName}.pdf`;

    // Verifica se o ambiente é o navegador
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      try {
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error("Erro ao tentar baixar o arquivo:", error);
      }
    } else {
      console.error("Ambiente não suporta downloads.");
    }
  };

  // Função para baixar todos os arquivos
  const handleDownloadAll = () => {
    files.forEach((file) => handleDownload(file.name));
  };

  return (
    <Card
      className={`shadow-md hover:shadow-lg transition-shadow cursor-pointer select-none ${
        expanded ? "py-4" : "py-1"
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
            className={`text-base px-3 py-1 rounded font-bold ${
              statusColors[document.status]
            }`}
          >
            {statusLabels[document.status]}
          </span>
        </div>
      </CardHeader>
      <CardContent className={expanded ? "pt-6 pb-4" : "py-0"}>
        {expanded && (
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            {/* Esquerda: RA e Processo de alteração */}
            <div>
              <p>
                <span className="font-semibold">RA:</span> {document.ra}
              </p>
              <p>
                <span className="font-semibold">Processo de alteração:</span>{" "}
                {document.processoAlteracao || "N/A"}
              </p>
              {(document.status === "aprovado" ||
                document.status === "aprovado_registrado" ||
                document.status === "aprovado_aguardando") && (
                <p>
                  <span className="font-semibold">
                    Legislação de aprovação:
                  </span>{" "}
                  Portaria nº 123/2024
                </p>
              )}
            </div>
            {/* Direita: Processo SEI e Data registro (condicional) */}
            <div className="text-right min-w-[180px]">
              <p>
                <span className="font-semibold">Processo SEI:</span>{" "}
                {document.sei}
              </p>
              {document.status === "aprovado_registrado" && (
                <p>
                  <span className="font-semibold">
                    Data registro em cartório:
                  </span>{" "}
                  {document.dataCartorio}
                </p>
              )}
            </div>
          </div>
        )}
        {expanded && (
          <div className="mt-8">
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 shadow-inner">
              <div className="font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <Download className="w-5 h-5 text-red-700" />
                Anexos disponíveis
              </div>
              <button
                type="button"
                className="mb-4 flex items-center gap-2 bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded transition text-sm font-semibold shadow"
                onClick={e => {
                  e.stopPropagation();
                  handleDownloadAll();
                }}
              >
                <Download className="w-4 h-4" />
                Baixar todos os anexos
              </button>
              <div className="flex flex-wrap gap-3">
                {files.map((file, idx) => (
                  <button
                    key={file.name}
                    type="button"
                    className="flex items-center gap-2 bg-white border border-slate-300 hover:bg-red-50 text-slate-800 px-3 py-2 rounded shadow-sm transition text-sm font-medium"
                    onClick={e => {
                      e.stopPropagation();
                      handleDownload(file.name);
                    }}
                  >
                    {file.icon}
                    {file.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const DocumentCards = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // Exemplo de documentos com os novos status:
  const documents: Document[] = [
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
        />
      ))}
    </div>
  );
};

export default DocumentCards;
