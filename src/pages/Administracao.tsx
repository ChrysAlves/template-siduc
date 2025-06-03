import React, { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import { Listbox, Portal } from "@headlessui/react";

const membrosExemplo = [
  {
    nome: "Alexandre Cotins",
    usuario: "@05947975190",
    origem: "Herdado de SEDUH / DISIS",
    funcao: "Proprietário",
    expiracao: "",
    cor: "bg-red-700",
    iniciais: "AC",
  },
  {
    nome: "Ana Caroline Evangelista da Silva",
    usuario: "@05831454165",
    origem: "Membro direto por Henrique Goffeau Garnier de Souza",
    funcao: "Desenvolvedor",
    expiracao: "",
    cor: "bg-gray-500",
    iniciais: "AE",
  },
  {
    nome: "Chrystian Alves Dos Santos",
    usuario: "@03340480109",
    origem: "Membro direto por João Paulo Silva Porto",
    funcao: "Convidado",
    expiracao: "",
    cor: "bg-red-700",
    iniciais: "CA",
  },
  {
    nome: "ciuserseduh",
    usuario: "@ciuserseduh",
    origem: "Herdado de SEDUH / DISIS",
    funcao: "Desenvolvedor",
    expiracao: "",
    cor: "bg-red-700",
    iniciais: "CI",
  },
  {
    nome: "Emanuel Alvares Lima Camargo Ribeiro",
    usuario: "@Aug 17, 4157",
    origem: "Herdado de SEDUH",
    funcao: "Proprietário",
    expiracao: "",
    cor: "bg-red-700",
    iniciais: "EA",
  },
];

const funcoes = [
  "Proprietário",
  "Desenvolvedor",
  "Convidado",
  "Planejador",
  "Relator",
  "Mantenedor",
];

const membrosMapoteca = [
  {
    nome: "Alexandre Cotins",
    usuario: "@05947975190",
    origem: "Herdado de SEDUH / DISIS",
    funcao: "Com acesso",
    expiracao: "",
    cor: "bg-red-700",
    iniciais: "AC",
  },
  {
    nome: "Ana Caroline Evangelista da Silva",
    usuario: "@05831454165",
    origem: "Membro direto por Henrique Goffeau Garnier de Souza",
    funcao: "Com acesso",
    expiracao: "",
    cor: "bg-gray-500",
    iniciais: "AE",
  },
  {
    nome: "Chrystian Alves Dos Santos",
    usuario: "@03340480109",
    origem: "Membro direto por João Paulo Silva Porto",
    funcao: "Leitor",
    expiracao: "",
    cor: "bg-red-700",
    iniciais: "CA",
  },
  {
    nome: "ciuserseduh",
    usuario: "@ciuserseduh",
    origem: "Herdado de SEDUH / DISIS",
    funcao: "Editor",
    expiracao: "",
    cor: "bg-red-700",
    iniciais: "CI",
  },
  {
    nome: "Emanuel Alvares Lima Camargo Ribeiro",
    usuario: "@Aug 17, 4157",
    origem: "Herdado de SEDUH",
    funcao: "Sem acesso",
    expiracao: "",
    cor: "bg-red-700",
    iniciais: "EA",
  },
];

const funcoesMapoteca = [
  "Sem acesso",
  "Com acesso",
  "Leitor",
  "Editor",
];

const Administracao: React.FC = () => {
  const [membros, setMembros] = useState(membrosExemplo);
  const [membrosMap, setMembrosMap] = useState(membrosMapoteca);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMenu, setShowMenu] = useState<number | null>(null);
  const [abaAtiva, setAbaAtiva] = useState<"geral" | "mapoteca">("geral"); // <-- NOVO
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showNotifications) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        notifRef.current &&
        !notifRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showNotifications]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showMenu !== null) {
        setShowMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMenu]);

  const handleFuncaoChange = (index: number, novaFuncao: string) => {
    const novosMembros = [...membros];
    novosMembros[index].funcao = novaFuncao;
    setMembros(novosMembros);
  };

  const handleExpiracaoChange = (index: number, novaData: string) => {
    const novosMembros = [...membros];
    novosMembros[index].expiracao = novaData;
    setMembros(novosMembros);
  };

  const handleFuncaoMapotecaChange = (index: number, novaFuncao: string) => {
    const novosMembros = [...membrosMap];
    novosMembros[index].funcao = novaFuncao;
    setMembrosMap(novosMembros);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="container mx-auto mt-28 px-4 py-4">
        <div className="flex items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Pesquisar membros"
            className="border px-3 py-2 rounded-lg w-full shadow-sm"
          />
        </div>

        {/* Abas de controle de acesso */}
        <div className="flex mb-4">
          <button
            className={`flex-1 py-2 rounded-t-lg font-semibold transition ${abaAtiva === "geral"
              ? "bg-white text-black shadow border border-b-0"
              : "bg-gray-100 text-gray-500"
              }`}
            onClick={() => setAbaAtiva("geral")}
          >
            Controle de Acesso Geral
          </button>
          <button
            className={`flex-1 py-2 rounded-t-lg font-semibold transition ${abaAtiva === "mapoteca"
              ? "bg-white text-black shadow border border-b-0"
              : "bg-gray-100 text-gray-500"
              }`}
            onClick={() => setAbaAtiva("mapoteca")}
          >
            Controle de Acesso Mapoteca
          </button>
        </div>

        {/* Conteúdo das abas */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {abaAtiva === "geral" ? (
            // Tabela de Controle de Acesso Geral
            <table className="min-w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="py-4 px-4 text-left font-semibold">Conta</th>
                  <th className="py-4 px-4 text-left font-semibold">Origem</th>
                  <th className="py-4 pr-4  font-semibold">Função</th>
                  <th className="py-4 pr-14  font-semibold">Expiração</th>
                </tr>
              </thead>
              <tbody>
                {membros.map((m, idx) => (
                  <tr
                    key={idx}
                    className="border-b last:border-b-0 hover:bg-gray-50 transition"
                  >
                    <td className="py-4 px-4 flex items-center gap-3">
                      <span
                        className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-bold text-base ${m.cor}`}
                      >
                        {m.iniciais}
                      </span>
                      <div>
                        <div className="font-semibold">{m.nome}</div>
                        <div className="text-xs text-gray-500">{m.usuario}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm leading-tight">
                      {m.origem.startsWith("Membro direto por") ? (
                        <>
                          <div className="text-gray-700">Membro direto por</div>
                          <div className="text-red-700">
                            {m.origem.replace("Membro direto por ", "")}
                          </div>
                        </>
                      ) : m.origem.startsWith("Herdado de") ? (
                        <>
                          <div className="text-gray-700">Herdado de</div>
                          <div className="text-red-700">
                            {m.origem.replace("Herdado de ", "")}
                          </div>
                        </>
                      ) : (
                        <div className="text-gray-700">{m.origem}</div>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <div className="relative flex items-center justify-center">
                        <Listbox
                          value={m.funcao}
                          onChange={(valor) => handleFuncaoChange(idx, valor)}
                        >
                          <div className="relative w-48 mx-auto">
                            <Listbox.Button className="w-full rounded-xl bg-gray-800 text-white font-semibold py-2 px-4 shadow-xl ring-2 ring-red-400 focus:ring-4 flex justify-between items-center">
                              {m.funcao}
                              <svg
                                width="18"
                                height="18"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  d="M7 10l5 5 5-5"
                                  stroke="white"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </Listbox.Button>
                            <Listbox.Options
                              className="absolute z-50 mb-2 w-full max-h-48 overflow-y-auto bg-gray-900 rounded-xl shadow-2xl py-1 flex flex-col gap-1 px-1"
                              style={{
                                top: idx < 2 ? "100%" : "auto", // Abre para baixo nas duas primeiras opções
                                bottom: idx < 2 ? "auto" : "100%", // Abre para cima nas demais
                              }}
                            >
                              {funcoes.map((f) => (
                                <Listbox.Option
                                  key={f}
                                  value={f}
                                  className={({ active, selected }) =>
                                    `cursor-pointer text-center py-2 px-2 rounded-lg text-white text-base font-medium transition-all
                                    ${active ? "bg-red-500 scale-100" : "bg-gray-800"}
                                    ${selected ? "ring-2 ring-red-400" : ""}`
                                  }
                                >
                                  {f}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </div>
                        </Listbox>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <input
                        type="date"
                        value={m.expiracao}
                        onChange={(e) =>
                          handleExpiracaoChange(idx, e.target.value)
                        }
                        className="border px-3 py-2 rounded-lg shadow-sm"
                      />
                    </td>
                    <td className="py-4 px-4 text-right relative">
                      <button
                        className="text-gray-400 hover:text-gray-700 rounded-full p-2 transition"
                        onClick={() =>
                          setShowMenu(showMenu === idx ? null : idx)
                        }
                      >
                        <span className="material-icons">more_vert</span>
                      </button>
                      {showMenu === idx && (
                        <div
                          className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg"
                          onClick={(e) => e.stopPropagation()} // Evita que o clique dentro do menu feche-o
                        >
                          <button
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                            onClick={() => alert("Excluir usuário clicado!")}
                          >
                            Excluir usuário
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            // Tabela de controle de acesso Mapoteca
            <table className="min-w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="py-4 px-4 text-left font-semibold">Conta</th>
                  <th className="py-4 px-4 text-left font-semibold">Origem</th>
                  <th className="py-4 pr-4  font-semibold">Função</th>
                  <th className="py-4 pr-14 font-semibold">Expiração</th>
                </tr>
              </thead>
              <tbody>
                {membrosMap.map((m, idx) => (
                  <tr
                    key={idx}
                    className="border-b last:border-b-0 hover:bg-gray-50 transition"
                  >
                    <td className="py-4 px-4 flex items-center gap-3">
                      <span
                        className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-bold text-base ${m.cor}`}
                      >
                        {m.iniciais}
                      </span>
                      <div>
                        <div className="font-semibold">{m.nome}</div>
                        <div className="text-xs text-gray-500">{m.usuario}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm leading-tight">
                      {m.origem.startsWith("Membro direto por") ? (
                        <>
                          <div className="text-gray-700">Membro direto por</div>
                          <div className="text-red-700">
                            {m.origem.replace("Membro direto por ", "")}
                          </div>
                        </>
                      ) : m.origem.startsWith("Herdado de") ? (
                        <>
                          <div className="text-gray-700">Herdado de</div>
                          <div className="text-red-700">
                            {m.origem.replace("Herdado de ", "")}
                          </div>
                        </>
                      ) : (
                        <div className="text-gray-700">{m.origem}</div>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <div className="relative flex items-center justify-center">
                        <Listbox
                          value={m.funcao}
                          onChange={(valor) => handleFuncaoMapotecaChange(idx, valor)}
                        >
                          <div className="relative w-48 mx-auto">
                            <Listbox.Button className="w-full rounded-xl bg-gray-800 text-white font-semibold py-2 px-4 shadow-xl ring-2 ring-red-400 focus:ring-4 flex justify-between items-center">
                              {m.funcao}
                              <svg
                                width="18"
                                height="18"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  d="M7 10l5 5 5-5"
                                  stroke="white"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </Listbox.Button>
                            <Listbox.Options
                              className="absolute z-50 mb-2 w-full max-h-48 overflow-y-auto bg-gray-900 rounded-xl shadow-2xl py-1 flex flex-col gap-1 px-1"
                              style={{
                                top: idx < 2 ? "100%" : "auto", // Abre para baixo nas duas primeiras opções
                                bottom: idx < 2 ? "auto" : "100%", // Abre para cima nas demais
                              }}
                            >
                              {funcoesMapoteca.map((f) => (
                                <Listbox.Option
                                  key={f}
                                  value={f}
                                  className={({ active, selected }) =>
                                    `cursor-pointer text-center py-2 px-2 rounded-lg text-white text-base font-medium transition-all
                                    ${active ? "bg-red-500 scale-100" : "bg-gray-800"}
                                    ${selected ? "ring-2 ring-red-400" : ""}`
                                  }
                                >
                                  {f}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </div>
                        </Listbox>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <input
                        type="date"
                        value={m.expiracao}
                        onChange={(e) => {
                          const novosMembros = [...membrosMap];
                          novosMembros[idx].expiracao = e.target.value;
                          setMembrosMap(novosMembros);
                        }}
                        className="border px-3 py-2 rounded-lg shadow-sm"
                      />
                    </td>
                    <td className="py-4 px-4 text-right relative">
                      <button
                        className="text-gray-400 hover:text-gray-700 rounded-full p-2 transition"
                        onClick={() =>
                          setShowMenu(
                            showMenu === idx + 1000 ? null : idx + 1000
                          )
                        }
                      >
                        <span className="material-icons">more_vert</span>
                      </button>
                      {showMenu === idx + 1000 && (
                        <div
                          className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                            onClick={() => alert("Excluir usuário clicado!")}
                          >
                            Excluir usuário
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
};

export default Administracao;
