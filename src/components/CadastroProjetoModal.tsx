import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { X, Plus, Paperclip } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CadastroProjetoModal = ({ isOpen, onClose }) => {
    const { toast } = useToast();
    const [formData, setFormData] = useState({
        nome: "",
        numero: "",
        tipoDocumento: "",
        regiaoAdministrativa: "",
        sigla: "",
        codigo: "",
        ano: "",
        processoSEI: "",
        processoAlteracao: "",
        legislacaoAprovacao: "",
        responsavelTecnico: "",
        creaCau: "",
        status: "",
        observacao: "",
        registroStatus: "",
        dataCartorio: "", // Campo para data de registro em cartório
    });

    const [files, setFiles] = useState([]); // Estado para arquivos anexados
    const fileInputRef = useRef(null); // Referência para o input de arquivos
    const [isTipoDocumentoModalOpen, setIsTipoDocumentoModalOpen] = useState(false); // Estado para o modal de tipo de documento
    const [isTipoSiglaModalOpen, setIsSiglaModalOpen] = useState(false); // Estado para o modal de tipo de documento
    const [novoTipoDocumento, setNovoTipoDocumento] = useState({
        nome: "",
        sigla: "",
        padrao: "",
    });

    const handleInputChange = (field: string, value: string | boolean) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleNovoTipoDocumentoChange = (field: string, value: string) => {
        setNovoTipoDocumento((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFiles = Array.from(e.target.files || []).map((file) => ({
            name: file.name,
            isRestrito: false,
        }));
        setFiles((prev) => [...prev, ...uploadedFiles]);
    };

    const handleFileRemove = (index: number) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const handleFileRestritoChange = (index: number, isRestrito: boolean) => {
        setFiles((prev) =>
            prev.map((file, i) => (i === index ? { ...file, isRestrito } : file))
        );
    };

    const handleAnexarClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); // Aciona o input de arquivos
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Projeto cadastrado",
            description: "O projeto foi cadastrado com sucesso!",
        });
    };

    const handleNovoTipoDocumentoSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Tipo de documento criado",
            description: `Tipo "${novoTipoDocumento.nome}" foi criado com sucesso!`,
        });
        setIsTipoDocumentoModalOpen(false); // Fecha o modal
        setNovoTipoDocumento({ nome: "", sigla: "", padrao: "" }); // Reseta os campos
    };



    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <CardHeader className="bg-white border-b p-4 sticky top-0 z-10">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <img src="/public/logosisduc.png" alt="SISDUC" className="h-12 w-auto" />
                            <h1 className="text-xl font-bold text-red-800">Cadastro de Projeto</h1>
                        </div>
                        <Button variant="ghost" size="sm" onClick={onClose}>
                            <X className="w-4 h-4" />
                        </Button>
                    </div>
                </CardHeader>

                <CardContent className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Primeira linha */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="nome">Nome</Label>
                                <Input
                                    id="nome"
                                    placeholder="Nome"
                                    value={formData.nome}
                                    onChange={(e) => handleInputChange("nome", e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="numero">Número</Label>
                                <Input
                                    id="numero"
                                    placeholder="Número"
                                    value={formData.numero}
                                    onChange={(e) => handleInputChange("numero", e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="tipoDocumento">Tipo de documento</Label>
                                <div className="flex gap-2">
                                    <Select
                                        value={formData.tipoDocumento}
                                        onValueChange={(value) => handleInputChange("tipoDocumento", value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Tipo de documento" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="projeto">Projeto</SelectItem>
                                            <SelectItem value="relatorio">Relatório</SelectItem>
                                            <SelectItem value="estudo">Estudo</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        type="button"
                                        onClick={() => setIsTipoDocumentoModalOpen(true)}
                                    >
                                        <Plus className="w-4 h-4 text-red-600" />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Segunda linha */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="regiaoAdministrativa">Região Administrativa</Label>
                                <Input
                                    id="regiaoAdministrativa"
                                    placeholder="Região Administrativa"
                                    value={formData.regiaoAdministrativa}
                                    onChange={(e) => handleInputChange("regiaoAdministrativa", e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="sigla">Sigla</Label>
                                <div className="flex gap-2">
                                    <Select
                                        value={formData.sigla}
                                        onValueChange={(value) => handleInputChange("sigla", value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Sigla" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="DF">DF</SelectItem>
                                            <SelectItem value="GO">GO</SelectItem>
                                            <SelectItem value="MG">MG</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        type="button"
                                        onClick={() => setIsTipoDocumentoModalOpen(true)}
                                    >
                                        <Plus className="w-4 h-4 text-red-600" />
                                    </Button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="codigo">Código</Label>
                                <Input
                                    id="codigo"
                                    placeholder="Código"
                                    value={formData.codigo}
                                    onChange={(e) => handleInputChange("codigo", e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Linha com o input Ano */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="ano">Ano</Label>
                                <Select
                                    value={formData.ano}
                                    onValueChange={(value) => handleInputChange("ano", value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Ano" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="2024">2024</SelectItem>
                                        <SelectItem value="2023">2023</SelectItem>
                                        <SelectItem value="2022">2022</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="processoSEI">Processo SEI</Label>
                                <Input
                                    id="processoSEI"
                                    placeholder="Processo SEI"
                                    value={formData.processoSEI}
                                    onChange={(e) => handleInputChange("processoSEI", e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="processoAlteracao">Processo de alteração de projeto</Label>
                                <Input
                                    id="processoAlteracao"
                                    placeholder="Processo de alteração de projeto"
                                    value={formData.processoAlteracao}
                                    onChange={(e) => handleInputChange("processoAlteracao", e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Inputs adicionados abaixo da linha com o input Ano */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="legislacaoAprovacao">Legislação de aprovação</Label>
                                <Input
                                    id="legislacaoAprovacao"
                                    placeholder="Legislação de aprovação"
                                    value={formData.legislacaoAprovacao}
                                    onChange={(e) => handleInputChange("legislacaoAprovacao", e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="responsavelTecnico">Responsável Técnico</Label>
                                <Input
                                    id="responsavelTecnico"
                                    placeholder="Responsável Técnico"
                                    value={formData.responsavelTecnico}
                                    onChange={(e) => handleInputChange("responsavelTecnico", e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="creaCau">CREA/CAU</Label>
                                <Input
                                    id="creaCau"
                                    placeholder="CREA/CAU"
                                    value={formData.creaCau}
                                    onChange={(e) => handleInputChange("creaCau", e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Observação */}
                        <div className="space-y-2">
                            <Label htmlFor="observacao">Observação</Label>
                            <Textarea
                                id="observacao"
                                placeholder="Digite suas observações aqui..."
                                rows={3}
                                value={formData.observacao}
                                onChange={(e) => handleInputChange("observacao", e.target.value)}
                            />
                        </div>


                        <div className="space-y-4">
                            <Label className="text-base font-medium">Status</Label>
                            <div className="flex gap-6">
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={formData.status === "aprovado"}
                                        onChange={(e) => handleInputChange("status", e.target.checked ? "aprovado" : "")}
                                        className="text-red-600"
                                    />
                                    <span>Aprovado</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={formData.status === "aguardando"}
                                        onChange={(e) => handleInputChange("status", e.target.checked ? "aguardando" : "")}
                                        className="text-red-600"
                                    />
                                    <span>Aprovado/aguardando registro</span>
                                </label>
                            </div>
                        </div>



                        {/* Checkboxes abaixo da observação */}
                        <div className="space-y-4">
                            <Label className="text-base font-medium">Registro</Label>
                            <div className="flex gap-6">
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={formData.registroStatus === "registrado-cartorio"}
                                        onChange={(e) =>
                                            handleInputChange("registroStatus", e.target.checked ? "registrado-cartorio" : "")
                                        }
                                        className="text-red-600"
                                    />
                                    <span>Registrado em cartório</span>
                                </label>
                                {formData.registroStatus === "registrado-cartorio" && (
                                    <div className="space-y-2">
                                        <Label htmlFor="dataCartorio">Data de registro</Label>
                                        <Input
                                            id="dataCartorio"
                                            type="date"
                                            value={formData.dataCartorio}
                                            onChange={(e) => handleInputChange("dataCartorio", e.target.value)}
                                        />
                                    </div>
                                )}
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={formData.registroStatus === "nao-registrado"}
                                        onChange={(e) =>
                                            handleInputChange("registroStatus", e.target.checked ? "nao-registrado" : "")
                                        }
                                        className="text-red-600"
                                    />
                                    <span>Não registrado</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={formData.registroStatus === "projeto-anulado"}
                                        onChange={(e) =>
                                            handleInputChange("registroStatus", e.target.checked ? "projeto-anulado" : "")
                                        }
                                        className="text-red-600"
                                    />
                                    <span>Projeto anulado</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={formData.registroStatus === "projeto-restrito"}
                                        onChange={(e) =>
                                            handleInputChange("registroStatus", e.target.checked ? "projeto-restrito" : "")
                                        }
                                        className="text-red-600"
                                    />
                                    <span>Projeto restrito</span>
                                </label>
                            </div>
                        </div>

                        {/* Botão para anexar arquivos */}
                        <div className="space-y-4">
                            <Button
                                variant="outline"
                                type="button"
                                className="text-red-600 border-red-600 hover:bg-red-50"
                                onClick={handleAnexarClick}
                            >
                                <Paperclip className="w-4 h-4 mr-2" />
                                Anexar arquivos
                            </Button>
                            <input
                                type="file"
                                multiple
                                className="hidden"
                                ref={fileInputRef}
                                onChange={handleFileUpload}
                            />
                            <ul className="space-y-2">
                                {files.map((file, index) => (
                                    <li key={index} className="flex items-center justify-between border p-2 rounded">
                                        <span>{file.name}</span>
                                        <div className="flex items-center gap-2">
                                            <label className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    checked={file.isRestrito}
                                                    onChange={(e) => handleFileRestritoChange(index, e.target.checked)}
                                                    className="text-red-600"
                                                />
                                                <span>Restrito</span>
                                            </label>
                                            <Button variant="ghost" size="sm" onClick={() => handleFileRemove(index)}>
                                                <X className="w-4 h-4 text-red-600" />
                                            </Button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Botão Criar */}
                        <div className="pt-4">
                            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3">
                                Criar
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* Modal para criação de tipo de documento */}
            {isTipoDocumentoModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <Card className="shadow-lg w-full max-w-md">
                        <CardHeader className="bg-white border-b p-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-bold">Criar Tipo de Documento</h2>
                                <Button variant="ghost" size="sm" onClick={() => setIsTipoDocumentoModalOpen(false)}>
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6">
                            <form onSubmit={handleNovoTipoDocumentoSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="nomeTipoDocumento">Nome</Label>
                                    <Input
                                        id="nomeTipoDocumento"
                                        placeholder="Nome"
                                        value={novoTipoDocumento.nome}
                                        onChange={(e) => handleNovoTipoDocumentoChange("nome", e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="siglaTipoDocumento">Sigla</Label>
                                    <Input
                                        id="siglaTipoDocumento"
                                        placeholder="Sigla"
                                        value={novoTipoDocumento.sigla}
                                        onChange={(e) => handleNovoTipoDocumentoChange("sigla", e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="padraoTipoDocumento">Padrão</Label>
                                    <Input
                                        id="padraoTipoDocumento"
                                        placeholder="Padrão"
                                        value={novoTipoDocumento.padrao}
                                        onChange={(e) => handleNovoTipoDocumentoChange("padrao", e.target.value)}
                                    />
                                </div>
                                <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3">
                                    Criar Tipo
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default CadastroProjetoModal;