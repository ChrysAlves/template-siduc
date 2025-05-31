import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import StatCards from "@/components/StatCards";
import SearchBar from "@/components/SearchBar";
import DocumentCards from "@/components/DocumentCards";
import SideFilters from "@/components/SideFilters";
import SearchOverlay from "@/components/SearchOverlay";
import EscolhaOverlay from "@/components/EscolhaOverlay";



const tiposDocumento = [
    "Relatório",
    "Ofício",
    "Memorando",
    "Processo",
    "Outro",
];

// Formulário simples como overlay/modal
const FormularioOverlayComponent = ({ onClose }: { onClose: () => void }) => {
    const [nome, setNome] = useState("");
    const [numero, setNumero] = useState("");
    const [tipoDocumento, setTipoDocumento] = useState("");
    const [regiao, setRegiao] = useState("");
    const [sigla, setSigla] = useState("");
    const [codigo, setCodigo] = useState("");
    const [ano, setAno] = useState("");
    const [processoSei, setProcessoSei] = useState("");
    const [processoAlteracao, setProcessoAlteracao] = useState("");
    const [responsavel, setResponsavel] = useState("");
    const [creaCau, setCreaCau] = useState("");
    const [legislacao, setLegislacao] = useState("");
    const [status, setStatus] = useState<string>("");
    const [dataRegistro, setDataRegistro] = useState("");
    const [files, setFiles] = useState<File[]>([]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Formulário criado com sucesso!");
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur">
            <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-xl relative flex flex-col items-center my-12">
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
                    src="/logosisductext.png"
                    alt="SISDUC"
                    className="h-24 w-auto mx-auto mb-6"
                    style={{ maxHeight: 96 }}
                />
                <h2 className="text-2xl font-bold mb-6 text-center text-red-700">
                    Cadastro de Projeto
                </h2>
                <form
                    className="w-full flex flex-col gap-4"
                    onSubmit={handleSubmit}
                >
                    {/* Nome e Número */}
                    <div className="flex gap-4">
                        <input
                            type="text"
                            className="flex-1 border-2 border-stone-700 rounded-lg px-4 py-3 focus:outline-none focus:border-stone-700  text-lg"
                            placeholder="Nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            className="w-36 border-2 border-stone-700  rounded-lg px-4 py-3 focus:outline-none focus:border-stone-700  text-lg"
                            placeholder="Número"
                            value={numero}
                            onChange={(e) => setNumero(e.target.value)}
                            required
                        />
                    </div>
                    {/* Tipo de documento */}
                    <select
                        className="border-2 border-stone-700  rounded-lg px-3 py-2 focus:outline-none focus:border-stone-700  text-base"
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
                    {/* Região administrativa */}
                    <input
                        type="text"
                        className="border-2 border-stone-700  rounded-lg px-3 py-2 focus:outline-none focus:border-stone-700  text-base"
                        placeholder="Região Administrativa"
                        value={regiao}
                        onChange={(e) => setRegiao(e.target.value)}
                        required
                    />
                    {/* Sigla, Código, Ano */}
                    <div className="flex gap-2">
                        <input
                            type="text"
                            className="flex-1 min-w-0 border-2 border-stone-700  rounded-lg px-3 py-2 focus:outline-none focus:border-stone-700  text-base"
                            placeholder="Sigla"
                            value={sigla}
                            onChange={(e) => setSigla(e.target.value)}
                        />
                        <input
                            type="text"
                            className="flex-1 min-w-0 border-2 border-stone-700  rounded-lg px-3 py-2 focus:outline-none focus:border-stone-700  text-base"
                            placeholder="Código"
                            value={codigo}
                            onChange={(e) => setCodigo(e.target.value)}
                        />
                        <input
                            type="text"
                            className="flex-1 min-w-0 border-2 border-stone-700  rounded-lg px-3 py-2 focus:outline-none focus:border-stone-700  text-base"
                            placeholder="Ano"
                            value={ano}
                            onChange={(e) => setAno(e.target.value)}
                        />
                    </div>
                    {/* Processo SEI, Processo de alteração de projeto */}
                    <div className="flex gap-2">
                        <input
                            type="text"
                            className="flex-1 border-2 border-stone-700 rounded-lg px-3 py-2 focus:outline-none focus:border-stone-700 text-base"
                            placeholder="Processo SEI"
                            value={processoSei}
                            onChange={(e) => setProcessoSei(e.target.value)}
                        />
                        <input
                            type="text"
                            className="flex-1 border-2 border-stone-700 rounded-lg px-3 py-2 focus:outline-none focus:border-stone-700 text-base"
                            placeholder="Processo de alteração de projeto"
                            value={processoAlteracao}
                            onChange={(e) => setProcessoAlteracao(e.target.value)}
                        />
                    </div>
                    {/* Responsável técnico, CREA/CAU */}
                    <div className="flex gap-2">
                        <input
                            type="text"
                            className="flex-1 border-2 border-stone-700 rounded-lg px-3 py-2 focus:outline-none focus:border-stone-700 text-base"
                            placeholder="Responsável Técnico"
                            value={responsavel}
                            onChange={(e) => setResponsavel(e.target.value)}
                        />
                        <input
                            type="text"
                            className="flex-1 border-2 border-stone-700 rounded-lg px-3 py-2 focus:outline-none focus:border-stone-700 text-base"
                            placeholder="CREA/CAU"
                            value={creaCau}
                            onChange={(e) => setCreaCau(e.target.value)}
                        />
                    </div>
                    {/* Legislação de aprovação */}
                    <input
                        type="text"
                        className="border-2 border-stone-700 rounded-lg px-3 py-2 focus:outline-none focus:border-stone-700 text-base"
                        placeholder="Legislação de aprovação"
                        value={legislacao}
                        onChange={(e) => setLegislacao(e.target.value)}
                    />
                    {/* Status checkboxes */}
                    <div className="flex flex-wrap gap-2 mt-1 text-sm">
                        <label className="flex items-center gap-1">
                            <input
                                type="radio"
                                name="status"
                                checked={status === "aprovado"}
                                onChange={() => setStatus("aprovado")}
                            />
                            Aprovado
                        </label>
                        <label className="flex items-center gap-1">
                            <input
                                type="radio"
                                name="status"
                                checked={status === "aprovado_aguardando"}
                                onChange={() => setStatus("aprovado_aguardando")}
                            />
                            Aprovado/aguardando registro
                        </label>
                        <label className="flex items-center gap-1">
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
                        <label className="flex items-center gap-1">
                            <input
                                type="radio"
                                name="status"
                                checked={status === "nao_registrado"}
                                onChange={() => setStatus("nao_registrado")}
                            />
                            Não registrado
                        </label>
                        <label className="flex items-center gap-1">
                            <input
                                type="radio"
                                name="status"
                                checked={status === "anulado"}
                                onChange={() => setStatus("anulado")}
                            />
                            Projeto anulado
                        </label>
                        <label className="flex items-center gap-1">
                            <input
                                type="radio"
                                name="status"
                                checked={status === "restrito"}
                                onChange={() => setStatus("restrito")}
                            />
                            Projeto restrito
                        </label>
                    </div>
                    {/* Upload de arquivos estilizado */}
                    <div className="mb-2">
                        <label
                            htmlFor="file-upload"
                            className="flex items-center gap-2 w-fit text-red-700 hover:text-red-800 cursor-pointer font-medium text-base transition"
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
                                setFiles((prev) => [
                                    ...prev,
                                    ...Array.from(e.target.files).filter(
                                        (file) =>
                                            !prev.some(
                                                (f) => f.name === file.name && f.size === file.size
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
                                    {files.map((file, idx) => (
                                        <li key={idx} className="flex items-center gap-2">
                                            {file.name}
                                            <button
                                                type="button"
                                                className="text-red-500 hover:text-red-700 ml-2"
                                                onClick={() =>
                                                    setFiles((prev) =>
                                                        prev.filter((_, i) => i !== idx)
                                                    )
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
                        className="w-full bg-red-700 text-white font-semibold py-3 rounded-lg mt-2 hover:bg-red-800 transition text-lg"
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
    const [searchTerm, setSearchTerm] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Número de itens por página

    // Simulação de documentos
    const documents = Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        title: `Documento ${i + 1}`,
    }));

    // Cálculo de paginação
    const totalPages = Math.ceil(documents.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentDocuments = documents.slice(startIndex, startIndex + itemsPerPage);

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
                        {<button
                            className="text-white bg-red-800 px-4 py-2 rounded shadow h-full"
                            onClick={() => setShowFormulario(true)}
                        >
                            Cadastrar Projeto
                        </button>}
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
                            <DocumentCards isInicialAdm={true} />
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
                                            className={`px-4 py-2 rounded ${currentPage === page
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
                onOpenReportModal={() => { /* Implementar ação ao abrir modal de relatório, se necessário */ }}
            />

            {/* Overlay do formulário */}
            {showFormulario && (
                <FormularioOverlayComponent onClose={() => setShowFormulario(false)} />
            )}
        </div>
    );
};

export default InicialAdm;
