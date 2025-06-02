import React from 'react';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { Download, Trash2, Copy, Edit, Plus, Clipboard } from 'lucide-react';
import { FileItem } from './FileManager';

interface FileContextMenuProps {
  children: React.ReactNode;
  file: FileItem;
  onDownload: (file: FileItem) => void;
  onDelete: (file: FileItem) => void;
  onCopy: (file: FileItem) => void;
  onPaste: (file: FileItem) => void;
  onRename: (file: FileItem) => void;
  onAdd: (file: FileItem) => void;
  copiedFile: FileItem | null;
}

const FileContextMenu: React.FC<FileContextMenuProps> = ({
  children,
  file,
  onDownload,
  onDelete,
  onCopy,
  onPaste,
  onRename,
  onAdd,
  copiedFile
}) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-56 bg-white border border-gray-200 shadow-lg z-50">
        <ContextMenuItem 
          onClick={() => onDownload(file)}
          className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
        >
          <Download size={16} />
          <span>Download</span>
        </ContextMenuItem>
        
        <ContextMenuItem 
          onClick={() => onCopy(file)}
          className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
        >
          <Copy size={16} />
          <span>Copiar</span>
        </ContextMenuItem>
        
        {copiedFile && file.type === 'folder' && (
          <ContextMenuItem 
            onClick={() => onPaste(file)}
            className="flex items-center space-x-2 px-3 py-2 hover:bg-blue-100 cursor-pointer text-blue-600"
          >
            <Clipboard size={16} />
            <span>Colar "{copiedFile.name}"</span>
          </ContextMenuItem>
        )}
        
        <ContextMenuItem 
          onClick={() => onRename(file)}
          className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
        >
          <Edit size={16} />
          <span>Renomear</span>
        </ContextMenuItem>
        
        {file.type === 'folder' && (
          <>
            <ContextMenuSeparator />
            <ContextMenuItem 
              onClick={() => onAdd(file)}
              className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
            >
              <Plus size={16} />
              <span>Adicionar</span>
            </ContextMenuItem>
          </>
        )}
        
        <ContextMenuSeparator />
        <ContextMenuItem 
          onClick={() => onDelete(file)}
          className="flex items-center space-x-2 px-3 py-2 hover:bg-red-100 text-red-600 cursor-pointer"
        >
          <Trash2 size={16} />
          <span>Excluir</span>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default FileContextMenu;
