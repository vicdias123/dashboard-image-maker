
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Clientes from "./pages/Clientes";
import Processos from "./pages/Processos";
import Agenda from "./pages/Agenda";
import Documentos from "./pages/Documentos";
import Financeiro from "./pages/Financeiro";
import Equipe from "./pages/Equipe";
import Marketing from "./pages/Marketing";
import Relatorios from "./pages/Relatorios";
import Configuracoes from "./pages/Configuracoes";
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
          <Route path="/documentos" element={<Documentos />} />
          <Route path="/financeiro" element={<Financeiro />} />
          <Route path="/equipe" element={<Equipe />} />
          <Route path="/marketing" element={<Marketing />} />
          <Route path="/relatorios" element={<Relatorios />} />
          <Route path="/configuracoes" element={<Configuracoes />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
