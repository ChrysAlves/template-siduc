import React from "react";
import { X, Folder, FileText, MoreHorizontal, Plus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { FileItem } from "./FileManager";
import { toast } from "@/components/ui/use-toast";

interface FolderModalProps {
  isOpen: boolean;
  onClose: () => void;
  folder: FileItem | null;
  onFolderClick: (folder: FileItem) => void;
  onFileAction: (action: string, file: FileItem) => void;
  onCreateFolder: (parentId: string) => void;
  onUploadFile: (parentId: string) => void;
  onMoveFile: (fileId: string, targetFolderId: string | null) => void;
  allFolders: FileItem[];
}

const FolderModal: React.FC<FolderModalProps> = ({
  isOpen,
  onClose,
  folder,
  onFolderClick,
  onFileAction,
  onCreateFolder,
  onUploadFile,
  onMoveFile,
  allFolders,
}) => {
  if (!isOpen || !folder) return null;

  const getFileIcon = (type: string) => {
    if (type === "folder") {
      return <Folder className="text-yellow-500" size={20} />;
    }
    return <FileText className="text-blue-500" size={20} />;
  };

  const filesInFolder = allFolders.filter((file) => file.parentId === folder.id);

  const handleDragStart = (file: FileItem) => {
    file.isDragging = true;
  };

  const handleDrop = (targetFolderId: string | null, draggedFile: FileItem) => {
    onMoveFile(draggedFile.id, targetFolderId);
  };

  const handleFileAction = (action: string, file: FileItem) => {
    switch (action) {
      case "delete":
        onFileAction("delete", file);
        break;
      case "rename":
        onFileAction("rename", file);
        break;
      case "download":
        toast({
          title: "Download iniciado",
          description: `${file.name} está sendo baixado.`,
          variant: "default", // Mantém o estilo padrão
        });
        break;
      case "move":
        const targetFolderId = prompt("Digite o ID da pasta de destino:");
        if (targetFolderId) {
          onMoveFile(file.id, targetFolderId);
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-red-900 text-white overflow-y-auto">
        <div className="p-4 border-b border-gray-700">
          <h3 className="text-sm font-medium text-gray-50">Todas as Pastas</h3>
        </div>
        <div className="p-2">
          {allFolders.map((item) => (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData("text/plain", item.id); // Armazena o ID do arquivo arrastado
              }}
              onDragOver={(e) => e.preventDefault()} // Permite o drop
              onDrop={(e) => {
                e.preventDefault();
                const draggedFileId = e.dataTransfer.getData("text/plain");
                const draggedFile = allFolders.find((f) => f.id === draggedFileId);
                if (draggedFile) {
                  onMoveFile(draggedFile.id, item.type === "folder" ? item.id : null); // Move para a pasta ou para fora
                }
              }}
              onClick={() => {
                if (item.type === "folder") {
                  onFolderClick(item); // Navega para a pasta ao clicar
                }
              }}
              className={`w-full flex items-center space-x-2 px-3 py-2 rounded text-sm transition-colors ${
                item.id === folder?.id
                  ? "bg-black text-white"
                  : "text-gray-50 hover:bg-gray-700 hover:text-white"
              }`}
            >
              {item.type === "folder" ? (
                <Folder size={16} className="text-yellow-500" />
              ) : (
                <FileText size={16} className="text-blue-500" />
              )}
              <span className="truncate">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Content */}
      <div className="flex-1 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[80vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b bg-gray-50">
            <div className="flex items-center space-x-3">
              <Folder className="text-yellow-500" size={24} />
              <h2 className="text-xl font-semibold text-gray-900">{folder.name}</h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="p-2"
            >
              <X size={20} />
            </Button>
          </div>

          {/* Toolbar */}
          <div className="flex justify-start items-center p-4 border-b space-x-2">
            <Button
              onClick={() => onCreateFolder(folder.id)}
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-600 transition"
            >
              <Plus size={16} className="inline-block mr-2" />
              Nova Pasta
            </Button>
            <Button
              onClick={() => onUploadFile(folder.id)} // Certifique-se de que o folder.id está sendo passado
              className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-500 transition"
            >
              <Upload size={16} className="inline-block mr-2" />
              Upload Arquivo
            </Button>
          </div>

          {/* Content */}
          <div className="overflow-auto max-h-[60vh]">
            {/* Table Header */}
            <div className="bg-gray-50 border-b border-gray-200 px-6 py-3 sticky top-0">
              <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-700">
                <div className="col-span-5">Nome</div>
                <div className="col-span-2">Tamanho</div>
                <div className="col-span-3">Modificado</div>
                <div className="col-span-2">Ações</div>
              </div>
            </div>

            {/* File List */}
            <div className="divide-y divide-gray-200">
              {filesInFolder.length === 0 ? (
                <div className="px-6 py-12 text-center text-gray-500">
                  <Folder size={48} className="mx-auto mb-4 text-gray-300" />
                  <p>Esta pasta está vazia</p>
                </div>
              ) : (
                filesInFolder.map((file) => (
                  <div
                    key={file.id}
                    draggable
                    onDragStart={() => handleDragStart(file)}
                    onDrop={(e) => {
                      e.preventDefault();
                      handleDrop(folder.id, file);
                    }}
                    className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors duration-150"
                  >
                    <div className="col-span-5 flex items-center space-x-3">
                      {getFileIcon(file.type)}
                      <span>{file.name}</span>
                    </div>
                    <div className="col-span-2">{file.size || "-"}</div>
                    <div className="col-span-3">{file.modified}</div>
                    <div className="col-span-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-1">
                            <MoreHorizontal size={16} />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => handleFileAction("move", file)}>
                            Mover
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleFileAction("rename", file)}>
                            Renomear
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleFileAction("delete", file)}>
                            Excluir
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleFileAction("download", file)}>
                            Download
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FolderModal;