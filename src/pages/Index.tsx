import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import StatCards from "@/components/StatCards";
import SearchBar from "@/components/SearchBar";
import DocumentCards from "@/components/DocumentCards";
import SideFilters from "@/components/SideFilters";
import SearchOverlay from "@/components/SearchOverlay";

const Index = () => {
  const [showSearchOverlay, setShowSearchOverlay] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

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

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

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
          <SearchBar />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">
            Documentos Disponíveis
          </h2>
          <div className="flex flex-col-reverse lg:flex-row gap-6">
            <div className="lg:w-1/4">
              <SideFilters />
            </div>
            <div className="lg:w-3/4">
              <DocumentCards />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-primary text-white p-6 mt-12">
        <div className="container mx-auto text-center">
          <p>© 2024 SISDUC - Sistema de Documentação Unificada</p>
        </div>
      </footer>

      {/* Overlay por cima, se necessário */}
      {showSearchOverlay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur">
          <SearchOverlay
            onSearch={handleSearch}
            onClose={() => setShowSearchOverlay(false)}
          />
        </div>
      )}
    </div>
  );
};

export default Index;
