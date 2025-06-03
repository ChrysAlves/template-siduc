import React, { useState } from "react";
// Importe seus ícones e componentes de UI conforme necessário

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import {
  X,
  Calendar as CalendarIcon,
  Download,
  Filter,
  Sparkles,
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

interface ReportGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReportGeneratorModal: React.FC<ReportGeneratorModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [reportType, setReportType] = useState<string>("");
  const [reportName, setReportName] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const categories = [
    "Vendas",
    "Marketing",
    "Financeiro",
    "Operacional",
    "RH",
    "TI",
  ];

  const statusOptions = [
    "Ativo",
    "Inativo",
    "Pendente",
    "Concluído",
    "Em Andamento",
  ];

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    }
  };

  const handleStatusChange = (status: string, checked: boolean) => {
    if (checked) {
      setSelectedStatus([...selectedStatus, status]);
    } else {
      setSelectedStatus(selectedStatus.filter((s) => s !== status));
    }
  };

  const handleGenerateReport = async () => {
    if (!reportType || !reportName || !startDate || !endDate) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    // Simular geração do relatório
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: "Relatório gerado com sucesso!",
        description: `O relatório "${reportName}" foi gerado e está pronto para download.`,
      });
      onClose();
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-red-700 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                Gerador de Relatórios
              </h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-lg"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          {/* Filtros */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Período do Relatório */}
            <div className="bg-red-50 p-6 rounded-xl border border-red-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <CalendarIcon className="mr-2 h-5 w-5 text-red-700" />
                Período do Relatório *
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Data Inicial
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal mt-1",
                          !startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate
                          ? format(startDate, "dd/MM/yyyy", { locale: ptBR })
                          : "Selecionar"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Data Final
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal mt-1",
                          !endDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate
                          ? format(endDate, "dd/MM/yyyy", { locale: ptBR })
                          : "Selecionar"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>

            {/* Região Administrativa */}
            <div className="bg-red-50 p-6 rounded-xl border border-red-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Região Administrativa
              </h3>
              <Select onValueChange={(value) => console.log(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione uma RA" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aguas-claras">Águas Claras</SelectItem>
                  <SelectItem value="arniqueira">Arniqueira</SelectItem>
                  <SelectItem value="brazlandia">Brazlândia</SelectItem>
                  <SelectItem value="candangolandia">Candangolândia</SelectItem>
                  <SelectItem value="ceilandia">Ceilândia</SelectItem>
                  <SelectItem value="cruzeiro">Cruzeiro</SelectItem>
                  <SelectItem value="distrito-federal">Distrito Federal</SelectItem>
                  <SelectItem value="fercal">Fercal</SelectItem>
                  <SelectItem value="gama">Gama</SelectItem>
                  <SelectItem value="guara">Guará</SelectItem>
                  <SelectItem value="itapoa">Itapoã</SelectItem>
                  <SelectItem value="jardim-botanico">Jardim Botânico</SelectItem>
                  <SelectItem value="lago-norte">Lago Norte</SelectItem>
                  <SelectItem value="lago-sul">Lago Sul</SelectItem>
                  <SelectItem value="nucleo-bandeirante">Núcleo Bandeirante</SelectItem>
                  <SelectItem value="paranoa">Paranoá</SelectItem>
                  <SelectItem value="park-way">Park Way</SelectItem>
                  <SelectItem value="planaltina">Planaltina</SelectItem>
                  <SelectItem value="plano-piloto">Plano Piloto</SelectItem>
                  <SelectItem value="recanto-das-emas">Recanto das Emas</SelectItem>
                  <SelectItem value="riacho-fundo">Riacho Fundo</SelectItem>
                  <SelectItem value="riacho-fundo-ii">Riacho Fundo II</SelectItem>
                  <SelectItem value="samambaia">Samambaia</SelectItem>
                  <SelectItem value="santa-maria">Santa Maria</SelectItem>
                  <SelectItem value="sao-sebastiao">São Sebastião</SelectItem>
                  <SelectItem value="scia">SCIA</SelectItem>
                  <SelectItem value="sia">SIA</SelectItem>
                  <SelectItem value="sobradinho">Sobradinho</SelectItem>
                  <SelectItem value="sobradinho-ii">Sobradinho II</SelectItem>
                  <SelectItem value="sol-nascente">Sol Nascente e Por do Sol</SelectItem>
                  <SelectItem value="sudoeste">Sudoeste/Octogonal</SelectItem>
                  <SelectItem value="taguatinga">Taguatinga</SelectItem>
                  <SelectItem value="varjao">Varjão</SelectItem>
                  <SelectItem value="vicente-pires">Vicente Pires</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Processo SEI */}
            <div className="bg-red-50 p-6 rounded-xl border border-red-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Processo SEI
              </h3>
              <Input
                placeholder="Digite o número do processo SEI"
                className="mt-1"
              />
            </div>

            {/* Processo de Alteração de Projeto */}
            <div className="bg-red-50 p-6 rounded-xl border border-red-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Processo de Alteração de Projeto
              </h3>
              <Input
                placeholder="Digite o número do processo de alteração"
                className="mt-1"
              />
            </div>

            {/* Status */}
            <div className="bg-red-50 p-6 rounded-xl border border-red-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Status</h3>
              <div className="space-y-3">
                {[
                  "Aprovado",
                  "Aprovado - Registrado em cartório",
                  "Aprovado - Aguardando registro",
                  "Anulado",
                  "Não registrado",
                ].map((status) => (
                  <div key={status} className="flex items-center space-x-2">
                    <Checkbox
                      id={status}
                      checked={selectedStatus.includes(status)}
                      onCheckedChange={(checked) =>
                        handleStatusChange(status, checked as boolean)
                      }
                    />
                    <Label htmlFor={status} className="text-sm text-gray-700">
                      {status}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 mt-8 pt-6 border-t">
            <Button variant="outline" onClick={onClose} className="px-6 py-2">
              Cancelar
            </Button>
            <Button
              onClick={handleGenerateReport}
              disabled={isGenerating}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-8 py-2"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Gerando...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Gerar Relatório
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportGeneratorModal;
