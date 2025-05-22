
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Eye } from 'lucide-react';

interface Document {
  id: number;
  number: string;
  city: string;
  type: string;
}

const DocumentCard = ({ document }: { document: Document }) => (
  <Card className="h-full shadow-md hover:shadow-lg transition-shadow">
    <CardHeader className="pb-2">
      <CardTitle className="text-lg flex justify-between">
        <span>#{document.number}</span>
        <span className="text-sm text-muted-foreground">{document.type}</span>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-lg font-medium mb-4">{document.city}</p>
      <div className="flex justify-between mt-4">
        <Button size="sm" variant="outline">
          <Eye className="h-4 w-4 mr-1" /> Visualizar
        </Button>
        <Button size="sm">
          <Download className="h-4 w-4 mr-1" /> Baixar
        </Button>
      </div>
    </CardContent>
  </Card>
);

const DocumentCards = () => {
  const documents: Document[] = [
    { id: 1, number: "001-2024", city: "Fortaleza", type: "Relatório" },
    { id: 2, number: "002-2024", city: "Recife", type: "Ofício" },
    { id: 3, number: "003-2024", city: "Salvador", type: "Memorando" },
    { id: 4, number: "004-2024", city: "Natal", type: "Processo" },
    { id: 5, number: "005-2024", city: "João Pessoa", type: "Relatório" },
    { id: 6, number: "006-2024", city: "Maceió", type: "Ofício" },
    { id: 7, number: "007-2024", city: "Aracaju", type: "Memorando" },
    { id: 8, number: "008-2024", city: "São Luís", type: "Processo" },
    { id: 9, number: "009-2024", city: "Teresina", type: "Relatório" },
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
