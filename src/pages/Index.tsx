
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import StatCards from '@/components/StatCards';
import SearchBar from '@/components/SearchBar';
import DocumentCards from '@/components/DocumentCards';
import SideFilters from '@/components/SideFilters';
import SearchOverlay from '@/components/SearchOverlay';

const Index = () => {
  const [showSearchOverlay, setShowSearchOverlay] = useState(true);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Verificar se já fez pesquisa antes (poderia ser salvo em localStorage)
  useEffect(() => {
    const hasSearchedBefore = localStorage.getItem('hasSearched');
    if (hasSearchedBefore === 'true') {
      setShowSearchOverlay(false);
      setHasSearched(true);
    }
  }, []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setShowSearchOverlay(false);
    setHasSearched(true);
    localStorage.setItem('hasSearched', 'true');
    console.log('Searching for:', term);
    // Implementar a lógica de pesquisa aqui
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {showSearchOverlay ? (
        <SearchOverlay 
          onSearch={handleSearch} 
          onClose={() => setShowSearchOverlay(false)}
        />
      ) : (
        <>
          <Header />
          
          <main className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-primary">Sistema de Documentação Unificada</h1>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Estatísticas de Documentos</h2>
              <StatCards />
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Pesquisar Documentos</h2>
              <SearchBar />
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-6">Documentos Disponíveis</h2>
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="lg:w-3/4">
                  <DocumentCards />
                </div>
                <div className="lg:w-1/4">
                  <SideFilters />
                </div>
              </div>
            </section>
          </main>
          
          <footer className="bg-primary text-white p-6 mt-12">
            <div className="container mx-auto text-center">
              <p>© 2024 SISDUC - Sistema de Documentação Unificada</p>
            </div>
          </footer>
        </>
      )}
    </div>
  );
};

export default Index;
