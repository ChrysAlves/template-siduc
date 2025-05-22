
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Eye, ChevronDown, ChevronUp } from 'lucide-react';

interface SubDocument {
  id: number;
  name: string;
  type: string;
}

interface Document {
  id: number;
  number: string;
  city: string;
  type: string;
  documents: SubDocument[];
}

const DocumentCard = ({ document }: { document: Document }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="h-full shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <CardTitle className="text-lg flex justify-between items-center">
          <span>#{document.number}</span>
          <span className="text-sm text-muted-foreground">{document.type}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <p className="text-lg font-medium">{document.city}</p>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>

        {expanded && (
          <div className="mt-4 pt-4 border-t">
            <h4 className="text-sm font-medium mb-2">Documentos disponíveis:</h4>
            <div className="space-y-3">
              {document.documents.map((doc) => (
                <div key={doc.id} className="p-3 bg-slate-50 rounded-md flex justify-between items-center">
                  <div>
                    <p className="font-medium">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">{doc.type}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-1" /> Visualizar
                    </Button>
                    <Button size="sm">
                      <Download className="h-4 w-4 mr-1" /> Baixar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const DocumentCards = () => {
  const documents: Document[] = [
    { 
      id: 1, 
      number: "001-2024", 
      city: "Fortaleza", 
      type: "Relatório",
      documents: [
        { id: 101, name: "Relatório Técnico", type: "PDF" },
        { id: 102, name: "Anexo Fotográfico", type: "ZIP" },
        { id: 103, name: "Dados Complementares", type: "XLSX" },
      ]
    },
    { 
      id: 2, 
      number: "002-2024", 
      city: "Recife", 
      type: "Ofício",
      documents: [
        { id: 201, name: "Ofício Principal", type: "PDF" },
        { id: 202, name: "Documentação Anexa", type: "PDF" },
        { id: 203, name: "Planilha de Dados", type: "XLSX" },
      ]
    },
    { 
      id: 3, 
      number: "003-2024", 
      city: "Salvador", 
      type: "Memorando",
      documents: [
        { id: 301, name: "Memorando Interno", type: "PDF" },
        { id: 302, name: "Comprovantes", type: "PDF" },
        { id: 303, name: "Registros Digitais", type: "ZIP" },
      ]
    },
    { 
      id: 4, 
      number: "004-2024", 
      city: "Natal", 
      type: "Processo",
      documents: [
        { id: 401, name: "Auto do Processo", type: "PDF" },
        { id: 402, name: "Documentação Probatória", type: "PDF" },
        { id: 403, name: "Anexos Diversos", type: "ZIP" },
      ]
    },
    { 
      id: 5, 
      number: "005-2024", 
      city: "João Pessoa", 
      type: "Relatório",
      documents: [
        { id: 501, name: "Relatório de Análise", type: "PDF" },
        { id: 502, name: "Dados Coletados", type: "XLSX" },
        { id: 503, name: "Imagens", type: "ZIP" },
      ]
    },
    { 
      id: 6, 
      number: "006-2024", 
      city: "Maceió", 
      type: "Ofício",
      documents: [
        { id: 601, name: "Ofício Circular", type: "PDF" },
        { id: 602, name: "Anexos", type: "PDF" },
        { id: 603, name: "Tabelas", type: "XLSX" },
      ]
    },
    { 
      id: 7, 
      number: "007-2024", 
      city: "Aracaju", 
      type: "Memorando",
      documents: [
        { id: 701, name: "Memorando de Requisição", type: "PDF" },
        { id: 702, name: "Comprovantes", type: "PDF" },
        { id: 703, name: "Arquivos Complementares", type: "ZIP" },
      ]
    },
    { 
      id: 8, 
      number: "008-2024", 
      city: "São Luís", 
      type: "Processo",
      documents: [
        { id: 801, name: "Auto do Processo", type: "PDF" },
        { id: 802, name: "Documentos do Caso", type: "PDF" },
        { id: 803, name: "Material Complementar", type: "ZIP" },
      ]
    },
    { 
      id: 9, 
      number: "009-2024", 
      city: "Teresina", 
      type: "Relatório",
      documents: [
        { id: 901, name: "Relatório Executivo", type: "PDF" },
        { id: 902, name: "Dados Estatísticos", type: "XLSX" },
        { id: 903, name: "Anexos", type: "ZIP" },
      ]
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {documents.map((doc) => (
        <DocumentCard key={doc.id} document={doc} />
      ))}
    </div>
  );
};

export default DocumentCards;
