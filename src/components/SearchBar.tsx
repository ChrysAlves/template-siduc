import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface SearchBarProps {
  showSearchBar?: boolean; // nova prop
  showStatusFilters?: boolean;
  showTypeFilters?: boolean;
  showFilterButton?: boolean;
  onApplyFilters?: (filters: {
    status: string[];
    types: string[];
    search: string;
  }) => void;
}

const SearchBar = ({
  showSearchBar = false,
  showStatusFilters = false,
  showTypeFilters = false, // <-- altere aqui para false
  showFilterButton = false,
  onApplyFilters,
}: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onApplyFilters?.({
      status: selectedStatus,
      types: selectedTypes,
      search: searchTerm,
    });
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
      {(showStatusFilters || showTypeFilters) && (
        <div className="mt-4 p-4 border rounded-md bg-slate-50">
          {showSearchBar && (
            <form onSubmit={handleSearch} className="flex gap-2 mb-4 w-full">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar documentos por número ou palavras..."
                  className="pl-10 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button className="bg-red-800" type="submit">
                Buscar
              </Button>
            </form>
          )}

          {/* Filtros */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Filtros de status */}
            {showStatusFilters && (
              <div>
                <h3 className="text-sm font-medium mb-2">Status</h3>
                <div className="flex gap-4 flex-wrap">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="status-aprovado"
                      checked={selectedStatus.includes("aprovado")}
                      onCheckedChange={() => toggleStatus("aprovado")}
                    />
                    <Label htmlFor="status-aprovado">Aprovado</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="status-pendente"
                      checked={selectedStatus.includes("pendente")}
                      onCheckedChange={() => toggleStatus("pendente")}
                    />
                    <Label htmlFor="status-pendente">Pendente</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="status-anulado"
                      checked={selectedStatus.includes("anulado")}
                      onCheckedChange={() => toggleStatus("anulado")}
                    />
                    <Label htmlFor="status-anulado">Anulado</Label>
                  </div>
                  {/* Adicione outros status se quiser */}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="status-aprovado_registrado"
                      checked={selectedStatus.includes("aprovado_registrado")}
                      onCheckedChange={() =>
                        toggleStatus("aprovado_registrado")
                      }
                    />
                    <Label htmlFor="status-aprovado_registrado">
                      Aprovado - Registrado em cartório
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="status-aprovado_aguardando"
                      checked={selectedStatus.includes("aprovado_aguardando")}
                      onCheckedChange={() =>
                        toggleStatus("aprovado_aguardando")
                      }
                    />
                    <Label htmlFor="status-aprovado_aguardando">
                      Aprovado - Aguardando Registro
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="status-nao_registrado"
                      checked={selectedStatus.includes("nao_registrado")}
                      onCheckedChange={() => toggleStatus("nao_registrado")}
                    />
                    <Label htmlFor="status-nao_registrado">
                      Não registrado
                    </Label>
                  </div>
                </div>
              </div>
            )}

            {/* Filtros de tipo */}
            {showTypeFilters && (
              <div>
                <h3 className="text-sm font-medium mb-2">Tipo de Projeto</h3>
                <div className="flex gap-4 flex-wrap">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="tipo-relatorio"
                      checked={selectedTypes.includes("Relatório")}
                      onCheckedChange={() => toggleDocumentType("Relatório")}
                    />
                    <Label htmlFor="tipo-relatorio">Relatório</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="tipo-oficio"
                      checked={selectedTypes.includes("Ofício")}
                      onCheckedChange={() => toggleDocumentType("Ofício")}
                    />
                    <Label htmlFor="tipo-oficio">Ofício</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="tipo-memorando"
                      checked={selectedTypes.includes("Memorando")}
                      onCheckedChange={() => toggleDocumentType("Memorando")}
                    />
                    <Label htmlFor="tipo-memorando">Memorando</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="tipo-processo"
                      checked={selectedTypes.includes("Processo")}
                      onCheckedChange={() => toggleDocumentType("Processo")}
                    />
                    <Label htmlFor="tipo-processo">Processo</Label>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Botão aplicar filtros */}
          {(showStatusFilters || showTypeFilters) && (
            <div className="mt-4">
              <Button className="bg-red-800" onClick={handleSearch}>
                Aplicar filtros
              </Button>
            </div>
          )}
        </div>
      )}
      {/* Se NÃO tiver filtros, mas showSearchBar for true, mostra a barra de busca sozinha */}
      {!(showStatusFilters || showTypeFilters) && showSearchBar && (
        <form onSubmit={handleSearch} className="flex gap-2 mb-4 w-full">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar documentos por número ou palavras..."
              className="pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button className="bg-red-800" type="submit">
            Buscar
          </Button>
        </form>
      )}
    </div>
  );
};

export default SearchBar;
