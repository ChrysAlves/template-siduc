import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface SearchBarProps {
  showDateFilters?: boolean;
  showStatusFilters?: boolean;
  showTypeFilters?: boolean;
  onApplyFilters?: (filters: {
    status: string[];
    types: string[];
    search: string;
  }) => void;
}

const SearchBar = ({
  showDateFilters = true,
  showStatusFilters = false,
  showTypeFilters = true,
  onApplyFilters,
}: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
    console.log("Selected types:", selectedTypes);
    console.log("Selected status:", selectedStatus);
    onApplyFilters?.({
      status: selectedStatus,
      types: selectedTypes,
      search: searchTerm,
    });
    // Implementar lógica de busca aqui
  };

  const toggleDocumentType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleStatus = (status: string) => {
    setSelectedStatus((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
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
            <Button className="bg-red-800" type="submit">
              Buscar
            </Button>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Filtros de status */}
            {showStatusFilters && (
              <div>
                <h3 className="text-sm font-medium mb-2">Status</h3>
                <div className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="status-aprovado"
                      checked={selectedStatus.includes("aprovado")}
                      onCheckedChange={() => toggleStatus("aprovado")}
                    />
                    <Label htmlFor="status-aprovado">Aprovados</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="status-pendente"
                      checked={selectedStatus.includes("pendente")}
                      onCheckedChange={() => toggleStatus("pendente")}
                    />
                    <Label htmlFor="status-pendente">Pendentes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="status-anulado"
                      checked={selectedStatus.includes("anulado")}
                      onCheckedChange={() => toggleStatus("anulado")}
                    />
                    <Label htmlFor="status-anulado">Anulados</Label>
                  </div>
                </div>
              </div>
            )}
            {/* Filtros de tipo */}
            {showTypeFilters && (
              <div>
                <h3 className="text-sm font-medium mb-2">Tipo de documento</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="filter-relatorios"
                      checked={selectedTypes.includes("Relatório")}
                      onCheckedChange={() => toggleDocumentType("Relatório")}
                    />
                    <Label htmlFor="filter-relatorios">Relatórios</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="filter-oficios"
                      checked={selectedTypes.includes("Ofício")}
                      onCheckedChange={() => toggleDocumentType("Ofício")}
                    />
                    <Label htmlFor="filter-oficios">Ofícios</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="filter-memorandos"
                      checked={selectedTypes.includes("Memorando")}
                      onCheckedChange={() => toggleDocumentType("Memorando")}
                    />
                    <Label htmlFor="filter-memorandos">Memorandos</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="filter-processos"
                      checked={selectedTypes.includes("Processo")}
                      onCheckedChange={() => toggleDocumentType("Processo")}
                    />
                    <Label htmlFor="filter-processos">Processos</Label>
                  </div>
                </div>
              </div>
            )}
            {/* Filtros de data */}
            {showDateFilters && (
              <div>
                <h3 className="text-sm font-medium mb-2">Período</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs mb-1">Data inicial</label>
                    <Input type="date" className="h-9" />
                  </div>
                  <div>
                    <label className="block text-xs mb-1">Data final</label>
                    <Input type="date" className="h-9" />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="mt-4 flex justify-end">
            <Button variant="outline" className="mr-2">
              Limpar
            </Button>
            <Button
              className="bg-red-800"
              onClick={() =>
                onApplyFilters?.({
                  status: selectedStatus, // array de status selecionados
                  types: selectedTypes, // array de tipos selecionados
                  search: searchTerm, // termo de busca
                })
              }
            >
              Aplicar filtros
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
