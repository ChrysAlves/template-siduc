import { X, Download, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ViewerSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  document: any;
  selectedFile: string | null;
}

const ViewerSidebar = ({
  isOpen,
  onClose,
  document,
  selectedFile,
}: ViewerSidebarProps) => {
  if (!isOpen || !document || !selectedFile) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full w-1/2 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-gray-50">
            <div>
              <h3 className="font-semibold text-lg">
                Visualização do Documento
              </h3>
              <p className="text-sm text-gray-600">{selectedFile}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Toolbar */}
          <div className="flex items-center gap-2 p-4 border-b bg-gray-50">
            <Button size="sm" variant="outline">
              <ZoomIn className="h-4 w-4 mr-1" />
              Zoom +
            </Button>
            <Button size="sm" variant="outline">
              <ZoomOut className="h-4 w-4 mr-1" />
              Zoom -
            </Button>
            <Button size="sm" variant="outline">
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
          </div>

          {/* Document Info */}
          <div className="p-4 border-b">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">
                  Informações do Documento
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs space-y-1">
                <div>
                  <strong>Código:</strong> {document.number}
                </div>
                <div>
                  <strong>SEI:</strong> {document.sei}
                </div>
                <div>
                  <strong>RA:</strong> {document.ra}
                </div>
                <div>
                  <strong>Status:</strong> {document.status}
                </div>
                <div>
                  <strong>Data:</strong> {document.dataCartorio}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Viewer Area */}
          <div className="flex-1 p-4 bg-gray-100">
            <div className="w-full h-full bg-white rounded-lg shadow-inner flex items-center justify-center">
              <div className="text-center text-gray-500">
                <div className="mb-4">
                  <div className="w-16 h-16 bg-red-100 rounded-lg mx-auto flex items-center justify-center">
                    <span className="text-red-600 font-bold text-xl">PDF</span>
                  </div>
                </div>
                <p className="text-sm font-medium">{selectedFile}</p>
                <p className="text-xs mt-1">Visualização do documento PDF</p>
                <p className="text-xs text-gray-400 mt-2">
                  Em uma implementação real, aqui seria exibido o conteúdo do
                  PDF
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewerSidebar;
