import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import StatCards from "@/components/StatCards";
import SearchBar from "@/components/SearchBar";
import DocumentCards from "@/components/DocumentCards";
import SideFilters from "@/components/SideFilters";
import SearchOverlay from "@/components/SearchOverlay";
import EscolhaOverlay from "@/components/EscolhaOverlay";
import ViewerSidebar from "@/components/ViewerSidebar"; // ADICIONE ESTA LINHA

const tiposDocumento = [
  "Relatório",
  "Ofício",
  "Memorando",
  "Processo",
  "Outro",
];

const Index = () => {
  const [showSearchOverlay, setShowSearchOverlay] = useState(true);
  const [showEscolha, setShowEscolha] = useState(false);
  const [showFormulario, setShowFormulario] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // ESTADO PARA O VISUALIZADOR LATERAL
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerDoc, setViewerDoc] = useState<any>(null);
  const [viewerFile, setViewerFile] = useState<string | null>(null);

  useEffect(() => {
    const hasSearchedBefore = sessionStorage.getItem("hasSearched");
    if (hasSearchedBefore === "true") {
      setShowSearchOverlay(false);
    }
  }, []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setShowSearchOverlay(false);
    sessionStorage.setItem("hasSearched", "true");
    // Implementar a lógica de pesquisa aqui
  };

  // Função para lidar com seleção no EscolhaOverlay
  const handleEscolhaSelect = (option: string) => {
    console.log("Escolha selecionada:", option); // Para depuração
    if (option === "Formulario") {
      setShowEscolha(false); // Fecha o EscolhaOverlay
      setShowFormulario(true); // Abre o FormularioOverlay
    }
    // outros casos...
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Número de documentos por página

  // Simulação de documentos
  const allDocuments = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    number: `URB/MDE/PSG ${i + 1}-2024`,
    status:
      (i % 5 === 0
        ? "anulado"
        : i % 5 === 1
        ? "nao_registrado"
        : i % 5 === 2
        ? "aprovado"
        : i % 5 === 3
        ? "aprovado_registrado"
        : "aprovado_aguardando") as
        | "anulado"
        | "nao_registrado"
        | "aprovado"
        | "aprovado_registrado"
        | "aprovado_aguardando",
    sei: `23456${i + 1}-2024`,
    dataCartorio: `10/05/202${i % 10}`,
    ra: i % 2 === 0 ? "Paranoá" : "Ceilândia",
  }));

  // Filtrar documentos com base no contexto
  const isInicialAdm = false; // Defina conforme necessário ou obtenha de props/contexto
  const filteredDocuments = allDocuments.filter((doc) => {
    if (!isInicialAdm && (doc.status === "anulado" || doc.status === "nao_registrado")) {
      return false;
    }
    return true;
  });

  // Cálculo de paginação
  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentDocuments = filteredDocuments.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1); // Reinicia para a primeira página
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-red-800">
          Sistema de documentação urbanística e cartográfica
        </h1>

        <section>{/* ... */}</section>

        {/* <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Estatísticas de Documentos
          </h2>
          <StatCards />
        </section> */}

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Pesquisar Documentos</h2>
          <div className="flex gap-4 items-stretch mb-4">
            <div className="flex-1 flex">
              <SearchBar
                showSearchBar={true}
                showStatusFilters={false}
                showTypeFilters={false}
              />
            </div>
            {/* Só mostra o botão se o usuário já fez login */}
            {/* <button
              className="text-white bg-red-800 px-4 py-2 rounded shadow h-full"
              onClick={() => setShowFormulario(true)}
            >
              Criar Formulário
            </button> */}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold mb-6">
              Documentos Disponíveis
            </h2>
            <p className="font-semibold mr-2">
              Projetos encontrados: {filteredDocuments.length}
            </p>
          </div>

          <div className="flex flex-col-reverse lg:flex-row gap-6">
            {/* Filtros na esquerda */}
            <div className="lg:w-1/4">
              <SideFilters />
            </div>

            {/* Lista de documentos */}
            <div className="lg:w-3/4">
              <DocumentCards
                documents={currentDocuments}
                isInicialAdm={false}
                onViewFile={(doc, fileLabel) => {
                  setViewerDoc(doc);
                  setViewerFile(fileLabel);
                  setViewerOpen(true);
                }}
              />
              <div className="flex justify-center items-center gap-4 mt-6">
                {/* Paginação */}
                <button
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Anterior
                </button>

                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    className={`px-4 py-2 rounded ${currentPage === i + 1
                      ? "bg-red-700 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                      }`}
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Próximo
                </button>

                {/* Seletor de itens por página */}
                <div className="flex items-center gap-2">
                  <label htmlFor="itemsPerPage" className="text-sm font-medium">
                    Documentos por página:
                  </label>
                  <select
                    id="itemsPerPage"
                    className="border border-stone-400 rounded px-2 py-1 text-sm"
                    value={itemsPerPage}
                    onChange={(e) =>
                      handleItemsPerPageChange(Number(e.target.value))
                    }
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-primary text-white p-6 mt-12">
        <div className="container mx-auto text-center">
          <p>© 2024 SISDUC - Sistema de Documentação Unificada</p>
        </div>
      </footer>

      {/* Overlay de busca */}
      {showSearchOverlay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur">
          <SearchOverlay
            onSearch={handleSearch}
            onClose={() => setShowSearchOverlay(false)}
          />
        </div>
      )}

      {/* EscolhaOverlay */}
      <EscolhaOverlay
        open={showEscolha}
        onClose={() => setShowEscolha(false)}
        onSelect={handleEscolhaSelect}
        onOpenReportModal={() => {
          /* Implementar lógica ou deixar vazio se não necessário */
        }}
      />

      {/* VISUALIZADOR LATERAL */}
      <ViewerSidebar
        isOpen={viewerOpen}
        onClose={() => setViewerOpen(false)}
        document={viewerDoc}
        selectedFile={viewerFile}
      />
    </div>
  );
};

export default Index;
