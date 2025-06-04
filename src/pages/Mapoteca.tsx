import React, { useState } from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import FolderModal from "../components/FolderModal";
import { toast } from "@/components/ui/use-toast";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import StatisticsCards from "@/components/ui/StatisticsCards";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Download, Trash2, Copy, Edit, Plus, Upload } from "lucide-react";

// Tipos de arquivos e pastas
export interface FileItem {
    id: string;
    name: string;
    type: "folder" | "file";
    size?: string;
    modified?: string;
    parentId?: string;
}

const initialFiles: FileItem[] = [
    { id: "1", name: "Águas Claras", type: "folder", size: "165 GB", modified: "2024-05-15" },
    { id: "2", name: "Arniqueira", type: "folder", size: "98.4 GB", modified: "2024-05-14" },
    { id: "3", name: "Brazlândia", type: "folder", size: "76 GB", modified: "2024-05-13" },
    { id: "4", name: "Candangolândia", type: "folder", size: "2.4 GB", modified: "2024-05-12" },
    { id: "5", name: "Ceilândia", type: "folder", size: "15.7 GB", modified: "2024-05-11" },
    { id: "6", name: "Cruzeiro", type: "folder", size: "1.2 GB", modified: "2024-05-10" },
    { id: "7", name: "Distrito Federal", type: "folder", size: "8.9 GB", modified: "2024-05-09" },
    { id: "8", name: "Fercal", type: "folder", size: "165 GB", modified: "2024-05-15" },
    { id: "9", name: "Gama", type: "folder", size: "98.4 GB", modified: "2024-05-14" },
    { id: "10", name: "Guará", type: "folder", size: "76 GB", modified: "2024-05-13" },
    { id: "11", name: "Itapoã", type: "folder", size: "2.4 GB", modified: "2024-05-12" },
    { id: "12", name: "Jardim Botânico", type: "folder", size: "15.7 GB", modified: "2024-05-11" },
    { id: "13", name: "Lago Norte", type: "folder", size: "1.2 GB", modified: "2024-05-10" },
    { id: "14", name: "Lago Sul", type: "folder", size: "8.9 GB", modified: "2024-05-09" },
    { id: "15", name: "Núcleo Bandeirante", type: "folder", size: "76 GB", modified: "2024-05-13" },
    { id: "16", name: "Paranoá", type: "folder", size: "2.4 GB", modified: "2024-05-12" },
    { id: "17", name: "Park Way", type: "folder", size: "15.7 GB", modified: "2024-05-11" },
    { id: "18", name: "Planaltina", type: "folder", size: "1.2 GB", modified: "2024-05-10" },
    { id: "19", name: "Plano Piloto", type: "folder", size: "8.9 GB", modified: "2024-05-09" },
    { id: "20", name: "Recanto das Emas", type: "folder", size: "8.9 GB", modified: "2024-05-09" },
    { id: "21", name: "Riacho Fundo", type: "folder", size: "165 GB", modified: "2024-05-15" },
    { id: "22", name: "Riacho Fundo II", type: "folder", size: "98.4 GB", modified: "2024-05-14" },
    { id: "23", name: "Samambaia", type: "folder", size: "76 GB", modified: "2024-05-13" },
    { id: "24", name: "Santa Maria", type: "folder", size: "2.4 GB", modified: "2024-05-12" },
    { id: "25", name: "São Sebastião", type: "folder", size: "15.7 GB", modified: "2024-05-11" },
    { id: "26", name: "SCIA", type: "folder", size: "1.2 GB", modified: "2024-05-10" },
    { id: "27", name: "SIA", type: "folder", size: "8.9 GB", modified: "2024-05-09" },
    { id: "28", name: "Sobradinho", type: "folder", size: "165 GB", modified: "2024-05-15" },
    { id: "29", name: "Sobradinho II", type: "folder", size: "98.4 GB", modified: "2024-05-14" },
    { id: "30", name: "Sol Nascente e Por do Sol", type: "folder", size: "76 GB", modified: "2024-05-13" },
    { id: "31", name: "Sudoeste/Octogonal", type: "folder", size: "2.4 GB", modified: "2024-05-12" },
    { id: "32", name: "Taguatinga", type: "folder", size: "15.7 GB", modified: "2024-05-11" },
    { id: "33", name: "Varjão", type: "folder", size: "1.2 GB", modified: "2024-05-10" },
    { id: "34", name: "Vicente Pires", type: "folder", size: "8.9 GB", modified: "2024-05-09" },
];

const Mapoteca = () => {
    const [files, setFiles] = useState<FileItem[]>(initialFiles);
    const [currentPath, setCurrentPath] = useState<string[]>([]);
    const [copiedFile, setCopiedFile] = useState<FileItem | null>(null);
    const [selectedFolder, setSelectedFolder] = useState<FileItem | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // Navegação entre pastas
    const handleFolderClick = (folderId: string, folderName: string) => {
        const folder = files.find((f) => f.id === folderId);
        if (folder) {
            setSelectedFolder(folder);
            setIsModalOpen(true);
        }
    };

    const handleNavigate = (index: number) => {
        if (index === -1) {
            setCurrentPath([]);
        } else {
            setCurrentPath((prev) => prev.slice(0, index + 1));
        }
    };

    // Ações nos arquivos
    const handleFileAction = (action: string, file: FileItem) => {
        switch (action) {
            case "delete":
                setFiles((prev) => prev.filter((f) => f.id !== file.id));
                toast({ title: "Arquivo excluído", description: `${file.name} foi excluído.` });
                break;
            case "rename":
                const newName = prompt("Digite o novo nome:", file.name);
                if (newName) {
                    setFiles((prev) =>
                        prev.map((f) => (f.id === file.id ? { ...f, name: newName } : f))
                    );
                    toast({ title: "Arquivo renomeado", description: `${file.name} foi renomeado.` });
                }
                break;
            case "download":
                toast({
                    title: "Download iniciado",
                    description: `${file.name} está sendo baixado.`,
                    variant: "default",
                });
                break;
            case "move":
                const targetFolderId = prompt("Digite o ID da pasta de destino:");
                if (targetFolderId) {
                    setFiles((prev) =>
                        prev.map((f) =>
                            f.id === file.id ? { ...f, parentId: targetFolderId } : f
                        )
                    );
                    toast({ title: "Arquivo movido", description: `${file.name} foi movido.` });
                }
                break;
            default:
                break;
        }
    };

    // Arrastar e soltar
    const handleDragStart = (file: FileItem) => {
        setCopiedFile(file);
    };

    const handleDrop = (targetFile: FileItem | null, draggedFile: FileItem) => {
        if (targetFile?.type === "folder" && draggedFile.id !== targetFile.id) {
            // Mover arquivo para a pasta de destino
            setFiles((prev) =>
                prev.map((f) =>
                    f.id === draggedFile.id ? { ...f, parentId: targetFile.id } : f
                )
            );
            toast({
                title: "Movido com sucesso",
                description: `${draggedFile.name} foi movido para ${targetFile.name}.`,
            });
        } else if (!targetFile) {
            // Mover para a raiz
            setFiles((prev) =>
                prev.map((f) =>
                    f.id === draggedFile.id ? { ...f, parentId: undefined } : f
                )
            );
            toast({
                title: "Movido para a raiz",
                description: `${draggedFile.name} foi movido para a raiz.`,
            });
        }
    };

    // Criar nova pasta
    const handleCreateFolder = (parentId?: string) => {
        const newFolderName = prompt("Digite o nome da nova pasta:");
        if (newFolderName) {
            const newFolder: FileItem = {
                id: `${Date.now()}`,
                name: newFolderName,
                type: "folder",
                size: "0 GB",
                modified: new Date().toISOString().split("T")[0],
                parentId: parentId || null,
            };
            setFiles((prev) => [...prev, newFolder]);
            toast({ title: "Pasta criada", description: `${newFolderName} foi criada com sucesso.` });
        }
    };

    // Upload de arquivo
    const handleUploadFile = (parentId?: string) => {
        const input = document.createElement("input");
        input.type = "file";
        input.onchange = (event: any) => {
            const file = event.target.files[0];
            if (file) {
                const newFile: FileItem = {
                    id: `${Date.now()}`,
                    name: file.name,
                    type: "file",
                    size: `${(file.size / 1024).toFixed(2)} KB`,
                    modified: new Date().toISOString().split("T")[0],
                    parentId,
                };
                setFiles((prev) => [...prev, newFile]);
                toast({ title: "Arquivo enviado", description: `${file.name} foi enviado com sucesso.` });
            }
        };
        input.click();
    };

    // Filtrar arquivos pela pasta atual e barra de pesquisa
    const filteredFiles = files
        .filter((file) => {
            const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
            if (currentPath.length === 0) {
                return !file.parentId && matchesSearch;
            }
            const parentFolder = files.find((f) => f.name === currentPath[currentPath.length - 1]);
            return file.parentId === parentFolder?.id && matchesSearch;
        })
        .sort((a, b) => {
            if (a.type === "folder" && b.type !== "folder") return -1;
            if (a.type !== "folder" && b.type === "folder") return 1;
            return a.name.localeCompare(b.name);
        });

    const handleMoveFile = (fileId: string, targetFolderId: string | null) => {
        setFiles((prev) =>
            prev.map((f) =>
                f.id === fileId ? { ...f, parentId: targetFolderId } : f
            )
        );
        toast({
            title: "Arquivo movido",
            description: `O arquivo foi movido ${targetFolderId ? "para a pasta" : "para a raiz"}.`,
        });
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <main className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-5xl font-bold text-sisduc-red mb-2">Mapoteca</h1>
                    <p className="text-gray-600">Gerenciador de Documentos</p>
                </div>
                <SearchBar query={searchQuery} onQueryChange={setSearchQuery} />
                <StatisticsCards />
                <div className="mb-4">
                    <Breadcrumbs path={currentPath} onNavigate={handleNavigate} />
                </div>
                <div className="bg-white shadow rounded-lg">
                    <div className="flex justify-start items-center p-4 space-x-2">
                        <button
                            onClick={() => handleCreateFolder()}
                            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                        >
                            <Plus size={16} className="inline-block mr-2" />
                            Nova Pasta
                        </button>
                        <button
                            onClick={() => handleUploadFile()}
                            className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-500 transition"
                        >
                            <Upload size={16} className="inline-block mr-2" />
                            Upload Arquivo
                        </button>
                    </div>
                    <div className="p-4">
                        <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-700">
                            <div className="col-span-5">Nome</div>
                            <div className="col-span-2">Tamanho</div>
                            <div className="col-span-3">Modificado</div>
                            <div className="col-span-2">Ações</div>
                        </div>
                    </div>
                    <div className="divide-y divide-gray-200">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                            {filteredFiles.map((file) => (
                                <div
                                    key={file.id}
                                    draggable
                                    onDragStart={() => handleDragStart(file)}
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={(e) => {
                                        e.preventDefault();
                                        const draggedFileId = copiedFile?.id;
                                        if (draggedFileId) {
                                            const draggedFile = files.find((f) => f.id === draggedFileId);
                                            if (draggedFile) handleDrop(file, draggedFile);
                                        }
                                    }}
                                    className="bg-white shadow rounded-lg p-4 hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                                    onClick={() => file.type === "folder" && handleFolderClick(file.id, file.name)}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            {file.type === "folder" ? "📂" : "📄"}
                                            <span className="font-semibold">{file.name}</span>
                                        </div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger>
                                                <MoreHorizontal size={16} />
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuItem onClick={() => handleFileAction("rename", file)}>
                                                    Renomear
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleFileAction("delete", file)}>
                                                    Excluir
                                                </DropdownMenuItem>
                                                {file.type === "file" && (
                                                    <DropdownMenuItem onClick={() => handleFileAction("download", file)}>
                                                        Download
                                                    </DropdownMenuItem>
                                                )}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                    <div className="mt-2 text-sm text-gray-500">
                                        <div>Tamanho: {file.size || "-"}</div>
                                        <div>Modificado: {file.modified || "-"}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
            <FolderModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                folder={selectedFolder}
                onFolderClick={(folder) => {
                    setSelectedFolder(folder);
                    setIsModalOpen(true);
                }}
                onFileAction={(action, file) => {
                    if (action === "delete") {
                        setFiles((prev) => prev.filter((f) => f.id !== file.id));
                        toast({ title: "Arquivo excluído", description: `${file.name} foi excluído.` });
                    }
                }}
                onCreateFolder={(parentId) => handleCreateFolder(parentId)}
                onUploadFile={(parentId) => handleUploadFile(parentId)}
                onMoveFile={(fileId, targetFolderId) => {
                    setFiles((prev) =>
                        prev.map((f) =>
                            f.id === fileId ? { ...f, parentId: targetFolderId } : f
                        )
                    );
                    toast({ title: "Arquivo movido", description: "O arquivo foi movido com sucesso." });
                }}
                allFolders={files}
            />
        </div>
    );
};

export default Mapoteca;