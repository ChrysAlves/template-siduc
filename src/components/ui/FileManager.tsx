import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Folder, 
  Upload, 
  Search, 
  Filter,
  MoreVertical,
  FolderPlus,
  Eye,
  Edit,
  Trash,
  Move,
  Download
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface FileItem {
  id: string;
  name: string;
  type: 'folder' | 'dwg' | 'shp' | 'pdf' | 'jpg' | 'kml';
  size?: string;
  modified: string;
  status: 'aprovado' | 'pendente' | 'rejeitado';
}

const FileManager = () => {
  const [currentPath, setCurrentPath] = useState(['']);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [searchTerm, setSearchTerm] = useState('');

  const mockFiles: FileItem[] = [
    { id: '1', name: 'Projetos Urbanísticos', type: 'folder', modified: '2024-05-15', status: 'aprovado' },
    { id: '2', name: 'Mapas Cartográficos', type: 'folder', modified: '2024-05-14', status: 'aprovado' },
    { id: '3', name: 'Infraestrutura', type: 'folder', modified: '2024-05-13', status: 'pendente' },
    { id: '4', name: 'Planta_Loteamento_001.dwg', type: 'dwg', size: '2.4 MB', modified: '2024-05-12', status: 'aprovado' },
    { id: '5', name: 'Malha_Viaria.shp', type: 'shp', size: '15.7 MB', modified: '2024-05-11', status: 'pendente' },
    { id: '6', name: 'Relatorio_Tecnico.pdf', type: 'pdf', size: '1.2 MB', modified: '2024-05-10', status: 'rejeitado' },
    { id: '7', name: 'Foto_Aerea_Setor_A.jpg', type: 'jpg', size: '8.9 MB', modified: '2024-05-09', status: 'aprovado' },
    { id: '8', name: 'Coordenadas_GPS.kml', type: 'kml', size: '0.5 MB', modified: '2024-05-08', status: 'pendente' },
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'folder': return '📁';
      case 'dwg': return '📐';
      case 'shp': return '🗺️';
      case 'pdf': return '📄';
      case 'jpg': return '🖼️';
      case 'kml': return '📍';
      default: return '📄';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'aprovado': return 'bg-sisduc-green text-white';
      case 'pendente': return 'bg-sisduc-yellow text-black';
      case 'rejeitado': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const handleFileSelect = (fileId: string) => {
    setSelectedFiles(prev => 
      prev.includes(fileId) 
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  const breadcrumbs = currentPath.map((path, index) => (
    <span key={index} className="flex items-center">
      {index > 0 && <span className="mx-2 text-gray-400">/</span>}
      <button 
        className="text-sisduc-red hover:text-sisduc-red-dark"
        onClick={() => setCurrentPath(currentPath.slice(0, index + 1))}
      >
        {path}
      </button>
    </span>
  ));

  return (
    <div className="flex-1 p-6">
      {/* Breadcrumb */}
      <div className="flex items-center mb-6">
        <div className="flex items-center text-sm">
          {breadcrumbs}
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button className="bg-sisduc-red hover:bg-sisduc-red-dark text-white">
            <Upload className="w-4 h-4 mr-2" />
            Upload
          </Button>
          <Button variant="outline">
            <FolderPlus className="w-4 h-4 mr-2" />
            Nova Pasta
          </Button>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Buscar arquivos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-80"
            />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filtros
          </Button>
        </div>
      </div>

      {/* Selected Files Info */}
      {selectedFiles.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-sm text-blue-800">
              {selectedFiles.length} arquivo(s) selecionado(s)
            </span>
            <div className="flex items-center space-x-2">
              <Button size="sm" variant="outline">
                <Move className="w-4 h-4 mr-1" />
                Mover
              </Button>
              <Button size="sm" variant="outline">
                <Download className="w-4 h-4 mr-1" />
                Download
              </Button>
              <Button size="sm" variant="outline">
                <Trash className="w-4 h-4 mr-1" />
                Excluir
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* File List */}
      <div className="bg-white rounded-lg border">
        <div className="grid grid-cols-12 gap-4 p-4 border-b bg-gray-50 font-medium text-sm text-gray-600">
          <div className="col-span-1">
            <input 
              type="checkbox" 
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedFiles(mockFiles.map(f => f.id));
                } else {
                  setSelectedFiles([]);
                }
              }}
            />
          </div>
          <div className="col-span-5">Nome</div>
          <div className="col-span-2">Tamanho</div>
          <div className="col-span-2">Modificado</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-1">Ações</div>
        </div>

        {mockFiles.map((file) => (
          <div key={file.id} className="grid grid-cols-12 gap-4 p-4 border-b hover:bg-gray-50">
            <div className="col-span-1">
              <input 
                type="checkbox"
                checked={selectedFiles.includes(file.id)}
                onChange={() => handleFileSelect(file.id)}
              />
            </div>
            <div className="col-span-5 flex items-center space-x-3">
              <span className="text-2xl">{getFileIcon(file.type)}</span>
              <span className="font-medium">{file.name}</span>
            </div>
            <div className="col-span-2 text-sm text-gray-600">
              {file.size || '-'}
            </div>
            <div className="col-span-2 text-sm text-gray-600">
              {file.modified}
            </div>
            <div className="col-span-1">
              <Badge className={`text-xs ${getStatusColor(file.status)}`}>
                {file.status.charAt(0).toUpperCase() + file.status.slice(1)}
              </Badge>
            </div>
            <div className="col-span-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white">
                  <DropdownMenuItem>
                    <Eye className="w-4 h-4 mr-2" />
                    Visualizar
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Edit className="w-4 h-4 mr-2" />
                    Editar
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Move className="w-4 h-4 mr-2" />
                    Mover
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">
                    <Trash className="w-4 h-4 mr-2" />
                    Excluir
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileManager;