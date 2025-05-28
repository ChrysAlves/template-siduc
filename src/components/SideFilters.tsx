
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

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
        <FilterSection title="Tipo de Documento">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="relatorios" />
              <Label htmlFor="relatorios">TIPO1</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="oficios" />
              <Label htmlFor="oficios">TIPO2</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="memorandos" />
              <Label htmlFor="memorandos">TIPO3</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="processos" />
              <Label htmlFor="processos">TIPO4</Label>
            </div>
          </div>
        </FilterSection>

        {/* <FilterSection title="Região">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="nordeste" />
              <Label htmlFor="nordeste">Nordeste</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="norte" />
              <Label htmlFor="norte">Norte</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="sudeste" />
              <Label htmlFor="sudeste">Sudeste</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="sul" />
              <Label htmlFor="sul">Sul</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="centro-oeste" />
              <Label htmlFor="centro-oeste">Centro-Oeste</Label>
            </div>
          </div>
        </FilterSection> */}

        {/* <FilterSection title="Período">
          <div className="space-y-4">
            <div>
              <Label className="mb-2 block">Ano do documento:</Label>
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>2020</span>
                <span>2025</span>
              </div>
              <Slider  defaultValue={[2023]} min={2020} max={2025} step={1} />
            </div>
          </div>
        </FilterSection> */}

        <FilterSection title="Status">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="aprovado" />
              <Label htmlFor="aprovado">Aprovado</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="pendente" />
              <Label htmlFor="pendente">Pendente</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="arquivado" />
              <Label htmlFor="arquivado">Arquivado</Label>
            </div>
          </div>
        </FilterSection>

        <div className="mt-6 space-y-2">
          <Button className="w-full bg-red-800">Aplicar Filtros</Button>
          <Button variant="outline" className="w-full">Limpar Filtros</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SideFilters;
