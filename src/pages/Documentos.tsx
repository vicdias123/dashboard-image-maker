
import { Search, SlidersHorizontal, Plus, Upload, FileText, Download, Eye, Trash2, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Sidebar from "@/components/Sidebar";
import TopNavigation from "@/components/TopNavigation";

const Documentos = () => {
  const documentos = [
    {
      id: 1,
      nome: "Petição Inicial - Divórcio Maria Silva",
      categoria: "Petições",
      processo: "5001234-67.2024.8.26.0001",
      cliente: "Maria Silva Santos",
      tamanho: "2.5 MB",
      formato: "PDF",
      dataUpload: "15/01/2024",
      uploadPor: "Dr. Vitor Dias",
      status: "Finalizado",
      versao: "v3.2",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face"
    },
    {
      id: 2,
      nome: "Contrato de Prestação de Serviços - Empresa XYZ",
      categoria: "Contratos",
      processo: "2001890-12.2024.8.26.0224",
      cliente: "Empresa XYZ Ltda",
      tamanho: "1.8 MB",
      formato: "PDF",
      dataUpload: "10/02/2024",
      uploadPor: "Dr. Roberto Silva",
      status: "Em Revisão",
      versao: "v1.0",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&crop=face"
    },
    {
      id: 3,
      nome: "Procuração Ad Judicia - João Carlos",
      categoria: "Procurações",
      processo: "1001567-89.2024.8.26.0100",
      cliente: "João Carlos Oliveira",
      tamanho: "0.8 MB",
      formato: "PDF",
      dataUpload: "05/03/2024",
      uploadPor: "Dra. Ana Costa",
      status: "Assinado",
      versao: "v1.0",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
    }
  ];

  const categorias = [
    { nome: "Petições", quantidade: 45, cor: "bg-blue-100 text-blue-800" },
    { nome: "Contratos", quantidade: 32, cor: "bg-green-100 text-green-800" },
    { nome: "Procurações", quantidade: 28, cor: "bg-purple-100 text-purple-800" },
    { nome: "Certidões", quantidade: 18, cor: "bg-orange-100 text-orange-800" },
    { nome: "Laudos", quantidade: 12, cor: "bg-red-100 text-red-800" },
    { nome: "Outros", quantidade: 23, cor: "bg-gray-100 text-gray-800" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Finalizado": return "bg-green-100 text-green-800";
      case "Em Revisão": return "bg-yellow-100 text-yellow-800";
      case "Assinado": return "bg-blue-100 text-blue-800";
      case "Rascunho": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-accent/30 flex">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <TopNavigation />
        
        <main className="flex-1 p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-semibold text-foreground">Gestão de Documentos</h1>
                <p className="text-sm text-muted-foreground">Organize e gerencie todos os documentos do escritório</p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                  <Input className="pl-10 w-64" placeholder="Buscar documentos..." />
                </div>
                
                <Button variant="outline" size="sm">
                  <SlidersHorizontal size={16} className="mr-2" />
                  Filtros
                </Button>
                
                <Button className="bg-primary hover:bg-primary/90">
                  <Upload size={16} className="mr-2" />
                  Upload Documento
                </Button>
              </div>
            </div>

            {/* Cards de Métricas */}
            <div className="grid grid-cols-4 gap-6 mb-8">
              <div className="bg-card p-6 rounded-2xl border">
                <div className="flex items-center justify-between mb-4">
                  <FileText className="w-8 h-8 text-blue-600" />
                  <span className="text-sm text-green-600 font-medium">+15%</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">158</h3>
                <p className="text-sm text-muted-foreground">Total de Documentos</p>
              </div>
              
              <div className="bg-card p-6 rounded-2xl border">
                <div className="flex items-center justify-between mb-4">
                  <Upload className="w-8 h-8 text-green-600" />
                  <span className="text-sm text-green-600 font-medium">+8</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">23</h3>
                <p className="text-sm text-muted-foreground">Novos este Mês</p>
              </div>
              
              <div className="bg-card p-6 rounded-2xl border">
                <div className="flex items-center justify-between mb-4">
                  <FolderOpen className="w-8 h-8 text-purple-600" />
                  <span className="text-sm text-blue-600 font-medium">6</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">12</h3>
                <p className="text-sm text-muted-foreground">Categorias</p>
              </div>
              
              <div className="bg-card p-6 rounded-2xl border">
                <div className="flex items-center justify-between mb-4">
                  <Download className="w-8 h-8 text-orange-600" />
                  <span className="text-sm text-green-600 font-medium">2.8 GB</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">450</h3>
                <p className="text-sm text-muted-foreground">Downloads</p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-6 mb-8">
              {/* Categorias */}
              <div className="col-span-1">
                <div className="bg-card rounded-2xl border p-6">
                  <h2 className="text-lg font-semibold text-foreground mb-4">Categorias</h2>
                  <div className="space-y-3">
                    {categorias.map((categoria, index) => (
                      <div key={index} className="flex items-center justify-between p-3 hover:bg-accent/50 rounded-lg cursor-pointer">
                        <div className="flex items-center gap-3">
                          <FolderOpen className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm font-medium">{categoria.nome}</span>
                        </div>
                        <Badge className={`text-xs ${categoria.cor}`}>
                          {categoria.quantidade}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Lista de Documentos */}
              <div className="col-span-3">
                <div className="bg-card rounded-2xl border">
                  <div className="p-6 border-b">
                    <h2 className="text-lg font-semibold text-foreground">Documentos Recentes</h2>
                  </div>
                  
                  <div className="divide-y">
                    {documentos.map((documento) => (
                      <div key={documento.id} className="p-6 hover:bg-accent/50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4 flex-1">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                              <FileText className="w-6 h-6 text-primary" />
                            </div>
                            
                            <div className="flex-1">
                              <h3 className="font-semibold text-foreground mb-1">{documento.nome}</h3>
                              <p className="text-sm text-muted-foreground mb-2">{documento.cliente} • {documento.processo}</p>
                              
                              <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                                <div>
                                  <span className="font-medium">Categoria:</span> {documento.categoria}
                                </div>
                                <div>
                                  <span className="font-medium">Tamanho:</span> {documento.tamanho}
                                </div>
                                <div>
                                  <span className="font-medium">Upload em:</span> {documento.dataUpload}
                                </div>
                                <div>
                                  <span className="font-medium">Por:</span> {documento.uploadPor}
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <div className="text-center">
                              <Badge className={`text-xs ${getStatusColor(documento.status)}`}>
                                {documento.status}
                              </Badge>
                              <p className="text-xs text-muted-foreground mt-1">{documento.versao}</p>
                            </div>
                            
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Eye size={14} />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Download size={14} />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Trash2 size={14} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Documentos;
