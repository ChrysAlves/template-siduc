import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Relatorio from "./pages/Relatorio";

import Gerenciador from "./pages/Gerenciador";

import Administracao from "./pages/Administracao";


// Criando o queryClient fora do componente para evitar recriações
const queryClient = new QueryClient();

// Convertendo para função tradicional para melhor compatibilidade
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/relatorio" element={<Relatorio />} />

            <Route path="/gerenciador" element={<Gerenciador />} />

            <Route path="/administracao" element={<Administracao />} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
