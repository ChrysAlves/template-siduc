
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface SearchOverlayProps {
  onSearch: (term: string) => void;
  onClose: () => void;
}

const SearchOverlay = ({ onSearch, onClose }: SearchOverlayProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
    }
  };

  return (
    <div className="search-overlay">
      <div className="search-overlay-container">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-primary">SISDUC</h1>
          <p className="text-lg text-gray-600">Sistema de Documentação Unificada</p>
        </div>
        
        <form onSubmit={handleSearch} className="flex gap-2 max-w-2xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-5 w-5 text-muted-foreground" />
            <Input 
              type="search"
              placeholder="Buscar documentos por número ou palavras..."
              className="pl-10 h-12 text-lg shadow-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
          </div>
          <Button type="submit" size="lg" className="shadow-lg">Buscar</Button>
        </form>
      </div>
    </div>
  );
};

export default SearchOverlay;
