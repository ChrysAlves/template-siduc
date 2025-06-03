import React, { useState } from "react";
import Select from "react-select";
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
  const [selectedRAs, setSelectedRAs] = useState<readonly any[]>([]);

  const options = [
    { value: "aguas-claras", label: "Águas Claras" },
    { value: "arniqueira", label: "Arniqueira" },
    { value: "brazlandia", label: "Brazlândia" },
    { value: "candangolandia", label: "Candangolândia" },
    { value: "ceilandia", label: "Ceilândia" },
    { value: "cruzeiro", label: "Cruzeiro" },
    { value: "distrito-federal", label: "Distrito Federal" },
    { value: "fercal", label: "Fercal" },
    { value: "gama", label: "Gama" },
    { value: "guara", label: "Guará" },
    { value: "itapoa", label: "Itapoã" },
    { value: "jardim-botanico", label: "Jardim Botânico" },
    { value: "lago-norte", label: "Lago Norte" },
    { value: "lago-sul", label: "Lago Sul" },
    { value: "nucleo-bandeirante", label: "Núcleo Bandeirante" },
    { value: "paranoa", label: "Paranoá" },
    { value: "park-way", label: "Park Way" },
    { value: "planaltina", label: "Planaltina" },
    { value: "plano-piloto", label: "Plano Piloto" },
    { value: "recanto-das-emas", label: "Recanto das Emas" },
    { value: "riacho-fundo", label: "Riacho Fundo" },
    { value: "riacho-fundo-ii", label: "Riacho Fundo II" },
    { value: "samambaia", label: "Samambaia" },
    { value: "santa-maria", label: "Santa Maria" },
    { value: "sao-sebastiao", label: "São Sebastião" },
    { value: "scia", label: "SCIA" },
    { value: "sia", label: "SIA" },
    { value: "sobradinho", label: "Sobradinho" },
    { value: "sobradinho-ii", label: "Sobradinho II" },
    { value: "sol-nascente", label: "Sol Nascente e Por do Sol" },
    { value: "sudoeste", label: "Sudoeste/Octogonal" },
    { value: "taguatinga", label: "Taguatinga" },
    { value: "varjao", label: "Varjão" },
    { value: "vicente-pires", label: "Vicente Pires" },
  ];

  return (
    <Card className="shadow-md sticky top-4">
      <CardHeader>
        <CardTitle className="text-lg">Filtros</CardTitle>
      </CardHeader>
      <CardContent>
        {/* RA */}
        <FilterSection title="RA">
          <div className="space-y-2">
            <Select
              options={options}
              isMulti
              value={selectedRAs}
              onChange={(selected) => setSelectedRAs([...selected])}
              placeholder="Selecione as RAs"
              className="basic-multi-select"
              classNamePrefix="select"
            />
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
