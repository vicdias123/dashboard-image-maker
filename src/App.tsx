
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Clientes from "./pages/Clientes";
import Processos from "./pages/Processos";
import Agenda from "./pages/Agenda";
import Financeiro from "./pages/Financeiro";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/processos" element={<Processos />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/financeiro" element={<Financeiro />} />
          {/* Placeholder routes for remaining pages */}
          <Route path="/documentos" element={<div className="p-8 text-center">Página de Documentos em desenvolvimento</div>} />
          <Route path="/equipe" element={<div className="p-8 text-center">Página de Equipe em desenvolvimento</div>} />
          <Route path="/marketing" element={<div className="p-8 text-center">Página de Marketing em desenvolvimento</div>} />
          <Route path="/relatorios" element={<div className="p-8 text-center">Página de Relatórios em desenvolvimento</div>} />
          <Route path="/configuracoes" element={<div className="p-8 text-center">Página de Configurações em desenvolvimento</div>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
