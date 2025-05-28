import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface SearchOverlayProps {
  onSearch: (term: string) => void;
  onClose: () => void;
}

const SearchOverlay = ({ onSearch, onClose }: SearchOverlayProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
    }
  };

  const toggleDocumentType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl">
      <div className="text-center mb-8">
        <img
          src="/logosisductext.png"
          alt="SISDUC"
          className="h-180 w-auto mx-auto mb-2"
          style={{ maxHeight: 180 }}
        />
      </div>

      <form
        onSubmit={handleSearch}
        className="flex flex-col gap-6 max-w-2xl mx-auto"
      >
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

        {/* <div className="bg-slate-50 p-4 rounded-md">
          <h3 className="font-medium mb-3">Filtrar por tipo de documento:</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="relatorios"
                checked={selectedTypes.includes("Relatório")}
                onCheckedChange={() => toggleDocumentType("Relatório")}
              />
              <Label htmlFor="relatorios">Relatórios</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="oficios"
                checked={selectedTypes.includes("Ofício")}
                onCheckedChange={() => toggleDocumentType("Ofício")}
              />
              <Label htmlFor="oficios">Ofícios</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="memorandos"
                checked={selectedTypes.includes("Memorando")}
                onCheckedChange={() => toggleDocumentType("Memorando")}
              />
              <Label htmlFor="memorandos">Memorandos</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="processos"
                checked={selectedTypes.includes("Processo")}
                onCheckedChange={() => toggleDocumentType("Processo")}
              />
              <Label htmlFor="processos">Processos</Label>
            </div>
          </div>
        </div> */}

        <Button type="submit" size="lg" className="shadow-lg bg-red-700">
          Buscar
        </Button>
      </form>
    </div>
  );
};

export default SearchOverlay;
