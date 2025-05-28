
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const StatisticsCards = () => {
  const stats = [
    { title: 'Relatórios', count: 128, color: 'bg-blue-500' },
    { title: 'Ofícios', count: 85, color: 'bg-green-500' },
    { title: 'Memorandos', count: 64, color: 'bg-yellow-500' },
    { title: 'Processos', count: 42, color: 'bg-purple-500' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {stat.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-gray-900">
                {stat.count}
              </div>
              <div className={`w-4 h-4 rounded ${stat.color}`} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatisticsCards;
