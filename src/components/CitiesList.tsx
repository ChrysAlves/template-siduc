
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface City {
  id: number;
  name: string;
  documentCount: number;
}

const CitiesList = () => {
  const cities: City[] = [
    { id: 1, name: 'Fortaleza', documentCount: 42 },
    { id: 2, name: 'Recife', documentCount: 38 },
    { id: 3, name: 'Salvador', documentCount: 35 },
    { id: 4, name: 'Natal', documentCount: 29 },
    { id: 5, name: 'João Pessoa', documentCount: 27 },
    { id: 6, name: 'Maceió', documentCount: 23 },
    { id: 7, name: 'Aracaju', documentCount: 18 },
    { id: 8, name: 'São Luís', documentCount: 17 },
    { id: 9, name: 'Teresina', documentCount: 15 },
    { id: 10, name: 'Belém', documentCount: 12 },
    { id: 11, name: 'Manaus', documentCount: 10 },
    { id: 12, name: 'Palmas', documentCount: 8 },
  ];

  const handleDownload = (cityId: number, cityName: string) => {
    console.log(`Downloading documents for city ${cityName} (ID: ${cityId})`);
    // Implementar lógica de download aqui
  };

  return (
    <Card className="shadow-md">
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-4">Documentos por Cidade</h2>
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cidade</TableHead>
                <TableHead>Documentos</TableHead>
                <TableHead className="text-right">Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cities.map((city) => (
                <TableRow key={city.id}>
                  <TableCell className="font-medium">{city.name}</TableCell>
                  <TableCell>{city.documentCount}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleDownload(city.id, city.name)}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default CitiesList;
