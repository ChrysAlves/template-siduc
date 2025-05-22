
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilter, setShowFilter] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
    // Implementar lógica de busca aqui
  };

  return (
    <div className="w-full mb-8">
      <div className="flex gap-2">
        <div className="flex-1">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input 
                type="search"
                placeholder="Buscar documentos por número ou palavras..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button type="submit">Buscar</Button>
            <Button 
              type="button" 
              variant="outline"
              onClick={() => setShowFilter(!showFilter)}
            >
              <Filter className="h-5 w-5" />
              <span className="ml-1 hidden md:inline">Filtros</span>
            </Button>
          </form>
        </div>
      </div>
      
      {showFilter && (
        <div className="mt-4 p-4 border rounded-md bg-slate-50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Tipo de documento</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="relatorio">Relatórios</SelectItem>
                  <SelectItem value="oficio">Ofícios</SelectItem>
                  <SelectItem value="memorando">Memorandos</SelectItem>
                  <SelectItem value="processo">Processos</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Data inicial</label>
              <Input type="date" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Data final</label>
              <Input type="date" />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <Button variant="outline" className="mr-2">Limpar</Button>
            <Button>Aplicar filtros</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
