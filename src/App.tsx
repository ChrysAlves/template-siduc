import React, { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Mapoteca from "./pages/Mapoteca";

import Administracao from "./pages/Administracao";
import InicialAdm from "./pages/InicialAdm";
import ReportGeneratorModal from "@/components/ReportGeneratorModal";
import Header from "@/components/Header";
import EscolhaOverlay from "@/components/EscolhaOverlay";

// Criando o queryClient fora do componente para evitar recriações
const queryClient = new QueryClient();

// Convertendo para função tradicional para melhor compatibilidade
function App() {
  const [showReportModal, setShowReportModal] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {/* Só o modal aqui */}
          <ReportGeneratorModal
            isOpen={showReportModal}
            onClose={() => setShowReportModal(false)}
          />
          <Header onOpenReportModal={() => setShowReportModal(true)} />
          <Routes>
            <Route path="/" element={<Index />} />

            <Route path="/mapoteca" element={<Mapoteca />} />

            <Route path="/administracao" element={<Administracao />} />

            <Route path="/inicialAdm" element={<InicialAdm />} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
