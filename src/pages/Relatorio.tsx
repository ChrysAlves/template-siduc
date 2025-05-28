import React, { useState } from "react";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";

// Base robusta de documentos de exemplo
const allDocuments = [
  {
    id: 1,
    name: "Relatório Técnico Fortaleza",
    status: "aprovado",
    type: "Relatório",
  },
  { id: 2, name: "Ofício Circular Recife", status: "pendente", type: "Ofício" },
  {
    id: 3,
    name: "Memorando Interno Salvador",
    status: "anulado",
    type: "Memorando",
  },
  {
    id: 4,
    name: "Processo Administrativo Natal",
    status: "aprovado",
    type: "Processo",
  },
  {
    id: 5,
    name: "Relatório de Análise João Pessoa",
    status: "pendente",
    type: "Relatório",
  },
  {
    id: 6,
    name: "Ofício de Solicitação Maceió",
    status: "aprovado",
    type: "Ofício",
  },
  {
    id: 7,
    name: "Memorando de Requisição Aracaju",
    status: "pendente",
    type: "Memorando",
  },
  {
    id: 8,
    name: "Processo Disciplinar São Luís",
    status: "anulado",
    type: "Processo",
  },
  {
    id: 9,
    name: "Relatório Executivo Teresina",
    status: "aprovado",
    type: "Relatório",
  },
  {
    id: 10,
    name: "Ofício de Encaminhamento Fortaleza",
    status: "anulado",
    type: "Ofício",
  },
  {
    id: 11,
    name: "Memorando Circular Recife",
    status: "aprovado",
    type: "Memorando",
  },
  {
    id: 12,
    name: "Processo Seletivo Salvador",
    status: "pendente",
    type: "Processo",
  },
  // Documentos que se encaixam em múltiplos filtros
  {
    id: 13,
    name: "Relatório/Ofício Especial",
    status: "aprovado",
    type: "Relatório",
  },
  {
    id: 14,
    name: "Relatório/Ofício Especial",
    status: "pendente",
    type: "Ofício",
  },
  {
    id: 15,
    name: "Memorando/Processo Combinado",
    status: "aprovado",
    type: "Memorando",
  },
  {
    id: 16,
    name: "Memorando/Processo Combinado",
    status: "anulado",
    type: "Processo",
  },
  {
    id: 17,
    name: "Relatório Final Recife",
    status: "aprovado",
    type: "Relatório",
  },
  {
    id: 18,
    name: "Ofício Urgente Natal",
    status: "pendente",
    type: "Ofício",
  },
  {
    id: 19,
    name: "Memorando Extra João Pessoa",
    status: "anulado",
    type: "Memorando",
  },
  {
    id: 20,
    name: "Processo Especial Fortaleza",
    status: "aprovado",
    type: "Processo",
  },
];

const Relatorio = () => {
  const [filteredDocs, setFilteredDocs] = useState<typeof allDocuments>([]);
  const [applied, setApplied] = useState(false);

  // Função chamada pelo SearchBar ao aplicar filtros
  const handleApplyFilters = (filters: {
    status: string[];
    types: string[];
    search: string;
  }) => {
    // Se nenhum filtro estiver marcado, não mostra nada
    const noFilters =
      filters.status.length === 0 &&
      filters.types.length === 0 &&
      !filters.search.trim();

    if (noFilters) {
      setFilteredDocs([]);
      setApplied(true);
      return;
    }

    const result = allDocuments.filter((doc) => {
      const statusOk =
        filters.status.length === 0 || filters.status.includes(doc.status);
      const typeOk =
        filters.types.length === 0 || filters.types.includes(doc.type);
      const searchOk =
        !filters.search ||
        doc.name.toLowerCase().includes(filters.search.toLowerCase());
      return statusOk && typeOk && searchOk;
    });
    setFilteredDocs(result);
    setApplied(true);
  };

  // Função para baixar relatório em PDF (simples)
  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <SearchBar
          showDateFilters={false}
          showStatusFilters={true}
          showTypeFilters={true}
          onApplyFilters={handleApplyFilters}
        />
        {applied && (
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">
              Documentos encontrados: {filteredDocs.length}
            </h2>
            <ul className="list-disc pl-6">
              {filteredDocs.map((doc) => (
                <li key={doc.id} className="mb-1">
                  {doc.name}
                </li>
              ))}
            </ul>
            <button
              className="mt-4 bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800 transition"
              onClick={handleDownloadPDF}
            >
              Baixar relatório em PDF
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Relatorio;
