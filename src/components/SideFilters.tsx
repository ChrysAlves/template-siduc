import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
}

const FilterSection = ({ title, children }: FilterSectionProps) => {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <div className="mb-6">
      <div
        className="flex justify-between items-center cursor-pointer mb-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-semibold">{title}</h3>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </div>
      {isOpen && <div className="pl-1">{children}</div>}
    </div>
  );
};

const SideFilters = () => {
  return (
    <Card className="shadow-md sticky top-4">
      <CardHeader>
        <CardTitle className="text-lg">Filtros</CardTitle>
      </CardHeader>
      <CardContent>
        {/* RA */}
        <FilterSection title="RA">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="paranoa" />
              <Label htmlFor="paranoa">Paranoá</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="ceilandia" />
              <Label htmlFor="ceilandia">Ceilândia</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="asasul" />
              <Label htmlFor="asasul">Asa Sul</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="samambaia" />
              <Label htmlFor="samambaia">Samambaia</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="aguasclaras" />
              <Label htmlFor="aguasclaras">Águas Claras</Label>
            </div>
          </div>
        </FilterSection>

        {/* Tipo de Projeto */}
        <FilterSection title="Tipo de Projeto">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="residencial" />
              <Label htmlFor="residencial">Residencial</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="comercial" />
              <Label htmlFor="comercial">Comercial</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="misto" />
              <Label htmlFor="misto">Misto</Label>
            </div>
            {/* Adicione outros tipos se necessário */}
          </div>
        </FilterSection>

        {/* Processo SEI */}
        <FilterSection title="Processo SEI">
          <input
            type="text"
            className="border rounded px-2 py-1 w-full"
            placeholder="Digite o número do processo SEI"
          />
        </FilterSection>

        {/* Processo de Alterações */}
        <FilterSection title="Processo de Alterações">
          <input
            type="text"
            className="border rounded px-2 py-1 w-full"
            placeholder="Digite o número do processo de alteração"
          />
        </FilterSection>

        {/* Status */}
        <FilterSection title="Status">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="aprovado" />
              <Label htmlFor="aprovado">Aprovado</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="aprovado_registrado" />
              <Label htmlFor="aprovado_registrado">
                Aprovado - Registrado em cartório
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="aprovado_aguardando" />
              <Label htmlFor="aprovado_aguardando">
                Aprovado - Aguardando Registro
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="anulado" />
              <Label htmlFor="anulado">Anulado</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="nao_registrado" />
              <Label htmlFor="nao_registrado">Não registrado</Label>
            </div>
          </div>
        </FilterSection>

        <div className="mt-6 space-y-2">
          <Button className="w-full bg-red-800">Aplicar Filtros</Button>
          <Button variant="outline" className="w-full">
            Limpar Filtros
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SideFilters;
