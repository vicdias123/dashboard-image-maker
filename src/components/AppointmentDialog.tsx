
import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AppointmentForm from "@/components/AppointmentForm";
import { AppointmentFormData } from "@/types/appointment";
import { createAppointment, updateAppointment } from "@/services/appointmentService";
import { useToast } from "@/hooks/use-toast";

interface AppointmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: Partial<AppointmentFormData>;
  appointmentId?: string;
  onSuccess?: () => void;
}

const AppointmentDialog = ({ 
  open, 
  onOpenChange, 
  initialData, 
  appointmentId, 
  onSuccess 
}: AppointmentDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (data: AppointmentFormData) => {
    setIsLoading(true);
    try {
      if (appointmentId) {
        await updateAppointment(appointmentId, data);
        toast({
          title: "Compromisso atualizado",
          description: "O compromisso foi atualizado com sucesso."
        });
      } else {
        await createAppointment(data);
        toast({
          title: "Compromisso criado",
          description: "O novo compromisso foi criado com sucesso."
        });
      }
      onOpenChange(false);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao salvar o compromisso.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Editar Compromisso" : "Novo Compromisso"}
          </DialogTitle>
        </DialogHeader>
        <AppointmentForm 
          initialData={initialData}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentDialog;
