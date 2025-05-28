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
  city: string;
  type: string;
  status: "aprovado" | "pendente" | "anulado";
  documents: SubDocument[];
  sei?: string; // novo campo opcional
}

const statusColors: Record<string, string> = {
  aprovado: "text-green-600 bg-green-100",
  pendente: "text-yellow-700 bg-yellow-100",
  anulado: "text-red-600 bg-red-100",
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

const DocumentCard = ({
  document,
  expanded,
  onExpand,
}: {
  document: Document;
  expanded: boolean;
  onExpand: () => void;
}) => (
  <Card
    className={`shadow-md hover:shadow-lg transition-shadow cursor-pointer select-none ${
      expanded ? "py-4" : "py-1"
    }`}
    onClick={onExpand}
  >
    <CardHeader className={`pb-2 pt-2 ${expanded ? "" : "py-1"}`}>
      {!expanded ? (
        <div className="flex items-center justify-between w-full">
          <span className="text-lg font-bold mr-4">#{document.number}</span>
          <div className="flex items-center gap-2">
            <span
              className={`text-base px-3 py-1 rounded font-bold ${
                statusColors[document.status]
              }`}
            >
              {document.status.charAt(0).toUpperCase() +
                document.status.slice(1)}
            </span>
            <Button
              variant="ghost"
              size="sm"
              tabIndex={-1}
              className="h-8 w-8 p-0"
              onClick={(e) => {
                e.stopPropagation();
                onExpand();
              }}
            >
              <ChevronDown className="h-6 w-6" />
            </Button>
          </div>
        </div>
      ) : (
        <CardTitle className="flex justify-between items-center text-2xl font-bold">
          <span>#{document.number}</span>
          <span
            className={`ml-4 text-base px-3 py-1 rounded ${
              statusColors[document.status]
            }`}
          >
            {document.status.charAt(0).toUpperCase() + document.status.slice(1)}
          </span>
        </CardTitle>
      )}
    </CardHeader>
    <CardContent className={expanded ? "pt-2 pb-4" : "py-0"}>
      {expanded && (
        <>
          <div className="flex justify-between items-center mb-2">
            <p className="text-xl font-semibold">{document.city}</p>
            <Button
              variant="ghost"
              size="sm"
              tabIndex={-1}
              onClick={(e) => {
                e.stopPropagation();
                onExpand();
              }}
              className="ml-2"
            >
              <ChevronUp className="h-6 w-6" />
            </Button>
          </div>
          {/* Informações aleatórias */}
          <div className="bg-gray-50 rounded-md p-3 mb-4 relative">
            <div className="mb-2">
              <p className="text-base">
                <span className="font-semibold">Processo SEI:</span>{" "}
                <span className="text-gray-700">
                  {document.sei || "000" + document.id + "-2024"}
                </span>
              </p>
              <p className="text-base">
                <span className="font-semibold">Responsável:</span> João Silva
              </p>
              <p className="text-base">
                <span className="font-semibold">Data de envio:</span> 15/05/2024
              </p>
              <p className="text-base">
                <span className="font-semibold">Setor:</span> Engenharia
              </p>
            </div>
            <div className="absolute right-3 bottom-2 flex flex-col items-end">
              <span
                className={`text-xs px-2 py-1 rounded ${
                  statusColors[document.status]
                }`}
              >
                {document.status.charAt(0).toUpperCase() +
                  document.status.slice(1)}
              </span>
              <span className="text-xs text-gray-500 mt-1 italic">
                {document.status === "aprovado" && "Aprovado sem ressalvas"}
                {document.status === "pendente" && "Aguardando documentação"}
                {document.status === "anulado" && "Documento inválido"}
              </span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-lg font-semibold">Documentos disponíveis:</h4>
              <Button
                size="sm"
                variant="default"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownloadAll(document.documents);
                }}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Baixar todos
              </Button>
            </div>
            <div className="space-y-3">
              {document.documents.map((doc) => (
                <div
                  key={doc.id}
                  className="p-3 bg-slate-50 rounded-md flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold text-base">{doc.name}</p>
                    <p className="text-sm text-muted-foreground">{doc.type}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" title="Visualizar">
                      <Eye className="h-5 w-5" />
                    </Button>
                    <Button size="sm" title="Baixar">
                      <Download className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </CardContent>
  </Card>
);

const DocumentCards = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const documents: Document[] = [
    {
      id: 1,
      number: "001-2024",
      city: "Fortaleza",
      type: "Relatório",
      status: "aprovado",
      sei: "2345678-2024", // exemplo
      documents: [
        { id: 101, name: "Relatório Técnico", type: "PDF" },
        { id: 102, name: "Anexo Fotográfico", type: "PDF" },
        { id: 103, name: "Dados Complementares", type: "PDF" },
      ],
    },
    {
      id: 2,
      number: "002-2024",
      city: "Recife",
      type: "Ofício",
      status: "pendente",
      sei: "2345679-2024", // exemplo
      documents: [
        { id: 201, name: "Ofício Principal", type: "PDF" },
        { id: 202, name: "Documentação Anexa", type: "PDF" },
        { id: 203, name: "Planilha de Dados", type: "PDF" },
      ],
    },
    {
      id: 3,
      number: "003-2024",
      city: "Salvador",
      type: "Memorando",
      status: "anulado",
      sei: "2345680-2024", // exemplo
      documents: [
        { id: 301, name: "Memorando Interno", type: "PDF" },
        { id: 302, name: "Comprovantes", type: "PDF" },
        { id: 303, name: "Registros Digitais", type: "PDF" },
      ],
    },
    {
      id: 4,
      number: "004-2024",
      city: "Natal",
      type: "Processo",
      status: "aprovado",
      sei: "2345681-2024", // exemplo
      documents: [
        { id: 401, name: "Auto do Processo", type: "PDF" },
        { id: 402, name: "Documentação Probatória", type: "PDF" },
        { id: 403, name: "Anexos Diversos", type: "PDF" },
      ],
    },
    {
      id: 5,
      number: "005-2024",
      city: "João Pessoa",
      type: "Relatório",
      status: "pendente",
      sei: "2345682-2024", // exemplo
      documents: [
        { id: 501, name: "Relatório de Análise", type: "PDF" },
        { id: 502, name: "Dados Coletados", type: "PDF" },
        { id: 503, name: "Imagens", type: "PDF" },
      ],
    },
    {
      id: 6,
      number: "006-2024",
      city: "Maceió",
      type: "Ofício",
      status: "anulado",
      sei: "2345683-2024", // exemplo
      documents: [
        { id: 601, name: "Ofício Circular", type: "PDF" },
        { id: 602, name: "Anexos", type: "PDF" },
        { id: 603, name: "Tabelas", type: "PDF" },
      ],
    },
    {
      id: 7,
      number: "007-2024",
      city: "Aracaju",
      type: "Memorando",
      status: "aprovado",
      sei: "2345684-2024", // exemplo
      documents: [
        { id: 701, name: "Memorando de Requisição", type: "PDF" },
        { id: 702, name: "Comprovantes", type: "PDF" },
        { id: 703, name: "Arquivos Complementares", type: "PDF" },
      ],
    },
    {
      id: 8,
      number: "008-2024",
      city: "São Luís",
      type: "Processo",
      status: "pendente",
      sei: "2345685-2024", // exemplo
      documents: [
        { id: 801, name: "Auto do Processo", type: "PDF" },
        { id: 802, name: "Documentos do Caso", type: "PDF" },
        { id: 803, name: "Material Complementar", type: "PDF" },
      ],
    },
    {
      id: 9,
      number: "009-2024",
      city: "Teresina",
      type: "Relatório",
      status: "anulado",
      sei: "2345686-2024", // exemplo
      documents: [
        { id: 901, name: "Relatório Executivo", type: "PDF" },
        { id: 902, name: "Dados Estatísticos", type: "PDF" },
        { id: 903, name: "Anexos", type: "PDF" },
      ],
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
