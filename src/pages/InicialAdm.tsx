import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import StatCards from "@/components/StatCards";
import SearchBar from "@/components/SearchBar";
import DocumentCards from "@/components/DocumentCards";
import SideFilters from "@/components/SideFilters";
import SearchOverlay from "@/components/SearchOverlay";
import EscolhaOverlay from "@/components/EscolhaOverlay";
import ViewerSidebar from "@/components/ViewerSidebar"; // Importação do visualizador

const InicialAdm = () => {
  const [showSearchOverlay, setShowSearchOverlay] = useState(true);
  const [showEscolha, setShowEscolha] = useState(false);
  const [showFormulario, setShowFormulario] = useState(false);
  const [showTipoDocumentoModal, setShowTipoDocumentoModal] = useState(false);
  const [showSiglaModal, setShowSiglaModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Inicia com 10 documentos por página

  // Estado para o visualizador lateral
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerDoc, setViewerDoc] = useState<any>(null);
  const [viewerFile, setViewerFile] = useState<string | null>(null);

  // Simulação de documentos
  const documents = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    number: String(i + 1),
    title: `Documento ${i + 1}`,
    status: "aprovado" as "aprovado", // status must be a valid literal type
    sei: `SEI-${i + 1}`,
    dataCartorio: "2024-01-01",
    ra: "RA-01",
  }));

  // Cálculo de paginação
  const totalPages = Math.ceil(documents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentDocuments = documents.slice(
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

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-red-800">
          Sistema de Documentação Urbanística e Cartográfica
        </h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Estatísticas de Documentos
          </h2>
          <StatCards />
        </section>
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
            {
              <button
                className="text-white bg-red-800 px-4 py-2 rounded shadow h-full"
                onClick={() => setShowFormulario(true)}
              >
                Cadastrar Projeto
              </button>
            }
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold mb-6">
              Documentos Disponíveis
            </h2>
            <p className="font-semibold mr-2">
              Projetos encontrados: {documents.length}
            </p>
          </div>

          <div className="flex flex-col-reverse lg:flex-row gap-6">
            <div className="lg:w-1/4">
              <SideFilters />
            </div>
            <div className="lg:w-3/4">
              <DocumentCards
                documents={currentDocuments}
                isInicialAdm={true}
                onViewFile={(doc, fileLabel) => {
                  setViewerDoc(doc);
                  setViewerFile(fileLabel);
                  setViewerOpen(true);
                }}
              />
              {/* Paginação */}
              <div className="flex justify-center items-center gap-4 mt-6">
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
                    className={`px-4 py-2 rounded ${
                      currentPage === i + 1
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
                    onChange={(e) => {
                      handleItemsPerPageChange(Number(e.target.value));
                    }}
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

export default InicialAdm;
