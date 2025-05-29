import React, { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";

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

const Administracao: React.FC = () => {
  const [membros, setMembros] = useState(membrosExemplo);
  const [showNotifications, setShowNotifications] = useState(false);
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

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="container mx-auto mt-28 px-4 py-4">
        <div className="flex items-center gap-4 mb-6">
          <button className="bg-gray-200 px-3 py-2 rounded-lg flex items-center gap-2 text-gray-700 shadow-sm">
            <span className="material-icons">settings</span>
            Filtrar membros
          </button>
          <input
            type="text"
            placeholder="Pesquisar membros"
            className="border px-3 py-2 rounded-lg w-64 shadow-sm"
          />
          <select className="border px-3 py-2 rounded-lg shadow-sm">
            <option>Conta</option>
            {/* Adicione mais opções se necessário */}
          </select>
        </div>
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <table className="min-w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="py-4 px-4 text-left font-semibold">Conta</th>
                <th className="py-4 px-4 text-left font-semibold">Origem</th>
                <th className="py-4 px-4 text-left font-semibold">Função</th>
                <th className="py-4 px-4 text-left font-semibold">Expiração</th>
                <th className="py-4 px-4"></th>
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
                      <select
                        value={m.funcao}
                        onChange={(e) =>
                          handleFuncaoChange(idx, e.target.value)
                        }
                        className={`font-semibold pl-4 pr-10 py-2 rounded-lg shadow-sm appearance-none
                          ${
                            m.funcao === "Proprietário"
                              ? "bg-red-700 text-white"
                              : "bg-gray-600 text-white"
                          }
                          text-center`}
                        style={{
                          minWidth: 160,
                          appearance: "none",
                          WebkitAppearance: "none",
                          MozAppearance: "none",
                        }}
                      >
                        {funcoes.map((f) => (
                          <option key={f} value={f} className="text-center">
                            {f}
                          </option>
                        ))}
                      </select>
                      {/* Seta ao lado do texto, com pequeno padding */}
                      <span className="pointer-events-none absolute right-8 top-1/2 -translate-y-1/2 flex items-center">
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
                      </span>
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
                  <td className="py-4 px-4 text-right">
                    <button className="text-gray-400 hover:text-gray-700 rounded-full p-2 transition">
                      <span className="material-icons">more_vert</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      {/* Material Icons CDN */}
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      ></link>
    </div>
  );
};

export default Administracao;
