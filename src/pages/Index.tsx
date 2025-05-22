
import React from 'react';
import Header from '@/components/Header';
import StatCards from '@/components/StatCards';
import SearchBar from '@/components/SearchBar';
import CitiesList from '@/components/CitiesList';

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Sistema de Documentação Unificada</h1>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Estatísticas de Documentos</h2>
          <StatCards />
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Pesquisar Documentos</h2>
          <SearchBar />
        </section>
        
        <section>
          <CitiesList />
        </section>
      </main>
      
      <footer className="bg-slate-200 p-6 mt-12">
        <div className="container mx-auto text-center text-slate-600">
          <p>© 2024 SISDUC - Sistema de Documentação Unificada</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
