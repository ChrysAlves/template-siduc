import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import StatCards from "@/components/StatCards";
import SearchBar from "@/components/SearchBar";
import DocumentCards from "@/components/DocumentCards";
import SideFilters from "@/components/SideFilters";
import SearchOverlay from "@/components/SearchOverlay";
import EscolhaOverlay from "@/components/EscolhaOverlay";
import ViewerSidebar from "@/components/ViewerSidebar";

const tiposDocumento = [
  "Relatório",
  "Ofício",
  "Memorando",
  "Processo",
  "Outro",
];

// Formulário simples como overlay/modal
const FormularioOverlayComponent = ({
  onClose,
  onOpenTipoDocumentoModal,
  onOpenSiglaModal,
}: {
  onClose: () => void;
  onOpenTipoDocumentoModal: () => void;
  onOpenSiglaModal: () => void;
}) => {
  const [nome, setNome] = useState("");
  const [numero, setNumero] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [regiao, setRegiao] = useState("");
  const [sigla, setSigla] = useState("");
  const [codigo, setCodigo] = useState("");
  const [mes, setMes] = useState("");
  const [ano, setAno] = useState("");
  const [processoSei, setProcessoSei] = useState("");
  const [processoAlteracao, setProcessoAlteracao] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [creaCau, setCreaCau] = useState("");
  const [legislacao, setLegislacao] = useState("");
  const [status, setStatus] = useState<string>("");
  const [dataRegistro, setDataRegistro] = useState("");
  const [files, setFiles] = useState<{ file: File; restrito: boolean }[]>([]);
  const [observacao, setObservacao] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Formulário criado com sucesso!");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur py-8 md:py-16 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl p-10 max-h-[90vh] w-full max-w-4xl relative flex flex-col items-center my-12">
        {/* Botão X para fechar */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-red-700 text-2xl"
          onClick={onClose}
          aria-label="Fechar"
          type="button"
        >
          ×
        </button>
        <img
          src="/logosisduc.png"
          alt="SISDUC"
          className="h-20 w-auto mx-auto mb-2 mt-2"
        />
        <h2 className="text-2xl font-bold mb-4 text-center text-red-700 mt-0">
          Cadastro de Projeto
        </h2>
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Grid de 3 colunas para os campos principais */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-1 font-medium text-base">Nome</label>
              <input
                type="text"
                className="border border-stone-400 rounded px-3 py-2 focus:outline-none focus:border-stone-700 text-base w-full"
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-base">Número</label>
              <input
                type="text"
                className="border border-stone-400 rounded px-3 py-2 focus:outline-none focus:border-stone-700 text-base w-full"
                placeholder="Número"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-base">
                Tipo de documento
              </label>
              <div className="flex gap-2">
                <select
                  className="border border-stone-400 rounded px-3 py-2 focus:outline-none focus:border-stone-700 text-base w-full"
                  value={tipoDocumento}
                  onChange={(e) => setTipoDocumento(e.target.value)}
                  required
                >
                  <option value="">Tipo de documento</option>
                  {tiposDocumento.map((tipo) => (
                    <option key={tipo} value={tipo}>
                      {tipo}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className="bg-gray-200 text-red-700 rounded px-3 py-2 text-xl font-bold hover:bg-gray-300"
                  onClick={onOpenTipoDocumentoModal}
                  title="Adicionar tipo de documento"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Grid de 3 colunas para Região Administrativa, Sigla, Código */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-1 font-medium text-base">
                Região Administrativa
              </label>
              <input
                type="text"
                className="border border-stone-400 rounded px-3 py-2 focus:outline-none focus:border-stone-700 text-base w-full"
                placeholder="Região Administrativa"
                value={regiao}
                onChange={(e) => setRegiao(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-base">Sigla</label>
              <div className="flex gap-2">
                <select
                  className="border border-stone-400 rounded px-3 py-2 focus:outline-none focus:border-stone-700 text-base w-full"
                  value={sigla}
                  onChange={(e) => setSigla(e.target.value)}
                >
                  <option value="">Sigla</option>
                  {/* Adicione opções de sigla aqui */}
                </select>
                <button
                  type="button"
                  className="bg-gray-200 text-red-700 rounded px-3 py-2 text-xl font-bold hover:bg-gray-300"
                  onClick={onOpenSiglaModal}
                  title="Adicionar sigla"
                >
                  +
                </button>
              </div>
            </div>
            <div>
              <label className="block mb-1 font-medium text-base">Código</label>
              <input
                type="text"
                className="border border-stone-400 rounded px-3 py-2 focus:outline-none focus:border-stone-700 text-base w-full"
                placeholder="Código"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
              />
            </div>
          </div>

          {/* Grid de 3 colunas para Ano, Processo SEI, Processo de alteração */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-1 font-medium text-base">Ano</label>
              <select
                className="border border-stone-400 rounded px-3 py-2 focus:outline-none focus:border-stone-700 text-base w-full"
                value={ano}
                onChange={(e) => setAno(e.target.value)}
                required
              >
                <option value="">Ano</option>
                {Array.from({ length: 21 }, (_, i) => 2024 - i).map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium text-base">
                Processo SEI
              </label>
              <input
                type="text"
                className="border border-stone-400 rounded px-3 py-2 focus:outline-none focus:border-stone-700 text-base w-full"
                placeholder="Processo SEI"
                value={processoSei}
                onChange={(e) => setProcessoSei(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-base">
                Processo de alteração de projeto
              </label>
              <input
                type="text"
                className="border border-stone-400 rounded px-3 py-2 focus:outline-none focus:border-stone-700 text-base w-full"
                placeholder="Processo de alteração de projeto"
                value={processoAlteracao}
                onChange={(e) => setProcessoAlteracao(e.target.value)}
              />
            </div>
          </div>

          {/* Grid de 3 colunas para Legislação, Responsável Técnico, CREA/CAU */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
            <div>
              <label className="block mb-0.5 font-medium text-xs">
                Legislação de aprovação
              </label>
              <input
                type="text"
                className="border border-stone-400 rounded px-2 py-0.5 focus:outline-none focus:border-stone-700 text-sm w-full"
                placeholder="Legislação de aprovação"
                value={legislacao}
                onChange={(e) => setLegislacao(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-0.5 font-medium text-xs">
                Responsável Técnico
              </label>
              <input
                type="text"
                className="border border-stone-400 rounded px-2 py-0.5 focus:outline-none focus:border-stone-700 text-sm w-full"
                placeholder="Responsável Técnico"
                value={responsavel}
                onChange={(e) => setResponsavel(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-0.5 font-medium text-xs">
                CREA/CAU
              </label>
              <input
                type="text"
                className="border border-stone-400 rounded px-2 py-0.5 focus:outline-none focus:border-stone-700 text-sm w-full"
                placeholder="CREA/CAU"
                value={creaCau}
                onChange={(e) => setCreaCau(e.target.value)}
              />
            </div>
          </div>

          {/* Status (checks) */}
          <div>
            <label className="block mb-0.5 font-medium text-xs">Status</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
              <label className="flex items-center gap-1 text-sm">
                <input
                  type="radio"
                  name="status"
                  checked={status === "aprovado"}
                  onChange={() => setStatus("aprovado")}
                />
                Aprovado
              </label>
              <label className="flex items-center gap-1 text-sm">
                <input
                  type="radio"
                  name="status"
                  checked={status === "aprovado_aguardando"}
                  onChange={() => setStatus("aprovado_aguardando")}
                />
                Aprovado/aguardando registro
              </label>
              <label className="flex items-center gap-1 text-sm">
                <input
                  type="radio"
                  name="status"
                  checked={status === "registrado"}
                  onChange={() => setStatus("registrado")}
                />
                Registrado em cartório
                {status === "registrado" && (
                  <input
                    type="date"
                    className="ml-2 border rounded px-1 py-1"
                    value={dataRegistro}
                    onChange={(e) => setDataRegistro(e.target.value)}
                  />
                )}
              </label>
              <label className="flex items-center gap-1 text-sm">
                <input
                  type="radio"
                  name="status"
                  checked={status === "nao_registrado"}
                  onChange={() => setStatus("nao_registrado")}
                />
                Não registrado
              </label>
              <label className="flex items-center gap-1 text-sm">
                <input
                  type="radio"
                  name="status"
                  checked={status === "anulado"}
                  onChange={() => setStatus("anulado")}
                />
                Projeto anulado
              </label>
              <label className="flex items-center gap-1 text-sm">
                <input
                  type="radio"
                  name="status"
                  checked={status === "restrito"}
                  onChange={() => setStatus("restrito")}
                />
                Projeto restrito
              </label>
            </div>
          </div>

          {/* Observação */}
          <div>
            <label className="block mb-0.5 font-medium text-xs">
              Observação
            </label>
            <textarea
              className="border border-stone-400 rounded px-2 py-1 focus:outline-none focus:border-stone-700 text-sm w-full"
              placeholder="Digite suas observações aqui..."
              value={observacao}
              onChange={(e) => setObservacao(e.target.value)}
              rows={2}
            />
          </div>

          {/* Upload de arquivos estilizado */}
          <div>
            <label
              htmlFor="file-upload"
              className="flex items-center gap-2 w-fit text-red-700 hover:text-red-800 cursor-pointer font-medium text-sm transition"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l7.071-7.07a4 4 0 00-5.657-5.657l-7.07 7.07a6 6 0 108.485 8.485l6.364-6.364"
                />
              </svg>
              <span>Anexar arquivos</span>
            </label>
            <input
              id="file-upload"
              type="file"
              multiple
              className="hidden"
              onChange={(e) => {
                if (!e.target.files) return;
                const newFiles = Array.from(e.target.files).map((file) => ({
                  file,
                  restrito: false,
                }));
                setFiles((prev) => [
                  ...prev,
                  ...newFiles.filter(
                    (nf) =>
                      !prev.some(
                        (pf) =>
                          pf.file.name === nf.file.name &&
                          pf.file.size === nf.file.size
                      )
                  ),
                ]);
                e.target.value = "";
              }}
            />
            {files && files.length > 0 && (
              <div className="mt-1 text-xs text-gray-700">
                <span className="font-semibold">
                  {files.length} arquivo{files.length > 1 ? "s" : ""}{" "}
                  selecionado{files.length > 1 ? "s" : ""}:
                </span>
                <ul className="list-disc ml-5">
                  {files.map((fileObj, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      {fileObj.file.name}
                      <label className="flex items-center gap-1">
                        <input
                          type="checkbox"
                          checked={fileObj.restrito}
                          onChange={() => {
                            setFiles((prev) =>
                              prev.map((f, i) =>
                                i === idx ? { ...f, restrito: !f.restrito } : f
                              )
                            );
                          }}
                        />
                        Restrito
                      </label>
                      <button
                        type="button"
                        className="text-red-500 hover:text-red-700 ml-2"
                        onClick={() =>
                          setFiles((prev) => prev.filter((_, i) => i !== idx))
                        }
                        title="Remover arquivo"
                      >
                        &#10005;
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-red-700 text-white font-semibold py-2 rounded-lg mt-2 hover:bg-red-800 transition text-base"
          >
            Criar
          </button>
        </form>
      </div>
    </div>
  );
};

const InicialAdm = () => {
  const [showSearchOverlay, setShowSearchOverlay] = useState(true);
  const [showEscolha, setShowEscolha] = useState(false);
  const [showFormulario, setShowFormulario] = useState(false);
  const [showTipoDocumentoModal, setShowTipoDocumentoModal] = useState(false);
  const [showSiglaModal, setShowSiglaModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Número de itens por página

  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerDoc, setViewerDoc] = useState<any>(null);
  const [viewerFile, setViewerFile] = useState<string | null>(null);

  // Simulação de documentos
  const documents = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    title: `Documento ${i + 1}`,
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
            <p className="font-semibold mr-2">Projetos encontrados: 11</p>
          </div>

          <div className="flex flex-col-reverse lg:flex-row gap-6">
            <div className="lg:w-1/4">
              <SideFilters />
            </div>
            <div className="lg:w-3/4">
              <DocumentCards
                isInicialAdm={true}
                onViewFile={(doc, fileLabel) => {
                  setViewerDoc(doc);
                  setViewerFile(fileLabel);
                  setViewerOpen(true);
                }}
              />
              {/* Paginação */}
              <div className="flex justify-center items-center gap-2 mt-6">
                <button
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Anterior
                </button>

                {Array.from({ length: Math.min(totalPages, 4) }, (_, i) => {
                  const page = currentPage <= 2 ? i + 1 : currentPage - 2 + i;
                  if (page > totalPages) return null;

                  return (
                    <button
                      key={page}
                      className={`px-4 py-2 rounded ${
                        currentPage === page
                          ? "bg-red-700 text-white"
                          : "bg-gray-200 hover:bg-gray-300"
                      }`}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  );
                })}

                <button
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Próximo
                </button>
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
          /* Implementar ação ao abrir modal de relatório, se necessário */
        }}
      />

      {/* Overlay do formulário */}
      {showFormulario && (
        <FormularioOverlayComponent
          onClose={() => setShowFormulario(false)}
          onOpenTipoDocumentoModal={() => setShowTipoDocumentoModal(true)}
          onOpenSiglaModal={() => setShowSiglaModal(true)}
        />
      )}

      {/* Modais para adicionar tipo de documento e sigla */}
      {showTipoDocumentoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-red-700 text-2xl"
              onClick={() => setShowTipoDocumentoModal(false)}
            >
              ×
            </button>
            <h2 className="text-lg font-bold mb-4 text-red-700">
              Criar Tipo de Documento
            </h2>
            <input
              className="w-full mb-2 border rounded px-3 py-2"
              placeholder="Nome do tipo de documento"
            />
            <input
              className="w-full mb-2 border rounded px-3 py-2"
              placeholder="Sigla"
            />
            <label className="flex items-center gap-2 mb-4">
              <input type="checkbox" />
              Padrão
            </label>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 rounded bg-gray-100"
                onClick={() => setShowTipoDocumentoModal(false)}
              >
                Cancelar
              </button>
              <button className="px-4 py-2 rounded bg-red-600 text-white">
                Criar
              </button>
            </div>
          </div>
        </div>
      )}
      {showSiglaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-red-700 text-2xl"
              onClick={() => setShowSiglaModal(false)}
            >
              ×
            </button>
            <h2 className="text-lg font-bold mb-4 text-red-700">Criar Sigla</h2>
            <input
              className="w-full mb-2 border rounded px-3 py-2"
              placeholder="Nome da sigla"
            />
            <input
              className="w-full mb-4 border rounded px-3 py-2"
              placeholder="Sigla"
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 rounded bg-gray-100"
                onClick={() => setShowSiglaModal(false)}
              >
                Cancelar
              </button>
              <button className="px-4 py-2 rounded bg-red-600 text-white">
                Criar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar do visualizador */}
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
