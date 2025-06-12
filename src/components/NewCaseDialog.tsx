
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { createCase } from "@/services/caseService";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

export function NewCaseDialog() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [formData, setFormData] = useState({
    process_number: "",
    client_name: "",
    legal_area: "",
    subject: "",
    court: "",
    case_value: "",
    status: "Em Andamento",
    priority: "Média",
    responsible_lawyer: "",
    distribution_date: "",
    next_deadline: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await createCase({
        ...formData,
        distribution_date: formData.distribution_date || null,
        next_deadline: formData.next_deadline || null,
        case_value: formData.case_value || null,
      });

      toast({
        title: "Processo criado",
        description: "O processo foi criado com sucesso.",
      });

      // Atualizar a lista de processos
      queryClient.invalidateQueries({ queryKey: ['cases'] });
      queryClient.invalidateQueries({ queryKey: ['cases-stats'] });
      
      setOpen(false);
      setFormData({
        process_number: "",
        client_name: "",
        legal_area: "",
        subject: "",
        court: "",
        case_value: "",
        status: "Em Andamento",
        priority: "Média",
        responsible_lawyer: "",
        distribution_date: "",
        next_deadline: "",
      });
    } catch (error) {
      console.error('Erro ao criar processo:', error);
      toast({
        title: "Erro",
        description: "Não foi possível criar o processo. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus size={16} className="mr-2" />
          Novo Processo
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Criar Novo Processo</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="process_number">Número do Processo *</Label>
              <Input
                id="process_number"
                value={formData.process_number}
                onChange={(e) => setFormData(prev => ({ ...prev, process_number: e.target.value }))}
                placeholder="0000000-00.0000.0.00.0000"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="client_name">Nome do Cliente *</Label>
              <Input
                id="client_name"
                value={formData.client_name}
                onChange={(e) => setFormData(prev => ({ ...prev, client_name: e.target.value }))}
                placeholder="Nome completo do cliente"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="legal_area">Área Jurídica *</Label>
              <Select value={formData.legal_area} onValueChange={(value) => setFormData(prev => ({ ...prev, legal_area: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a área" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Direito Civil">Direito Civil</SelectItem>
                  <SelectItem value="Direito de Família">Direito de Família</SelectItem>
                  <SelectItem value="Direito Empresarial">Direito Empresarial</SelectItem>
                  <SelectItem value="Direito Tributário">Direito Tributário</SelectItem>
                  <SelectItem value="Direito Trabalhista">Direito Trabalhista</SelectItem>
                  <SelectItem value="Direito Criminal">Direito Criminal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="responsible_lawyer">Advogado Responsável *</Label>
              <Input
                id="responsible_lawyer"
                value={formData.responsible_lawyer}
                onChange={(e) => setFormData(prev => ({ ...prev, responsible_lawyer: e.target.value }))}
                placeholder="Nome do advogado"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Assunto *</Label>
            <Textarea
              id="subject"
              value={formData.subject}
              onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
              placeholder="Descrição do assunto do processo"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="court">Tribunal *</Label>
              <Input
                id="court"
                value={formData.court}
                onChange={(e) => setFormData(prev => ({ ...prev, court: e.target.value }))}
                placeholder="Ex: TJSP - 1ª Vara de Família"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="case_value">Valor da Causa</Label>
              <Input
                id="case_value"
                value={formData.case_value}
                onChange={(e) => setFormData(prev => ({ ...prev, case_value: e.target.value }))}
                placeholder="R$ 0,00"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Em Andamento">Em Andamento</SelectItem>
                  <SelectItem value="Análise Jurídica">Análise Jurídica</SelectItem>
                  <SelectItem value="Aguardando Documentos">Aguardando Documentos</SelectItem>
                  <SelectItem value="Suspenso">Suspenso</SelectItem>
                  <SelectItem value="Finalizado">Finalizado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority">Prioridade</Label>
              <Select value={formData.priority} onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Baixa">Baixa</SelectItem>
                  <SelectItem value="Média">Média</SelectItem>
                  <SelectItem value="Alta">Alta</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="distribution_date">Data de Distribuição</Label>
              <Input
                id="distribution_date"
                type="date"
                value={formData.distribution_date}
                onChange={(e) => setFormData(prev => ({ ...prev, distribution_date: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="next_deadline">Próximo Prazo</Label>
            <Input
              id="next_deadline"
              type="date"
              value={formData.next_deadline}
              onChange={(e) => setFormData(prev => ({ ...prev, next_deadline: e.target.value }))}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Criando..." : "Criar Processo"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
