
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: number;
}

const StatCard = ({ title, value }: StatCardProps) => (
  <Card className="shadow-md hover:shadow-lg transition-shadow">
    <CardHeader className="pb-2">
      <CardTitle className="text-lg">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-3xl font-bold">{value}</p>
    </CardContent>
  </Card>
);

const StatCards = () => {
  const stats = [
    { title: 'Relatórios', value: 128 },
    { title: 'Ofícios', value: 85 },
    { title: 'Memorandos', value: 64 },
    { title: 'Processos', value: 42 }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => (
        <StatCard key={stat.title} title={stat.title} value={stat.value} />
      ))}
    </div>
  );
};

export default StatCards;
