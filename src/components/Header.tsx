import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import LoginOverlay from "./LoginOverlay";
import EscolhaOverlay from "./EscolhaOverlay";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const Header = ({ onOpenReportModal }) => {
  const [showLogin, setShowLogin] = useState(false); // Controle do LoginOverlay
  const [showEscolha, setShowEscolha] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false); // Controle do botão de notificações
  const notifRef = useRef<HTMLDivElement>(null); // Referência para o dropdown de notificações
  const [isLogged, setIsLogged] = useState(
    localStorage.getItem("isLogged") === "true"
  );
  const navigate = useNavigate();

  useEffect(() => {
    // Atualiza o estado se o localStorage mudar (ex: logout em outra aba)
    const onStorage = () =>
      setIsLogged(localStorage.getItem("isLogged") === "true");
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    if (!showNotifications) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        notifRef.current &&
        !notifRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showNotifications]);

  const handleLoginSuccess = () => {
    setShowLogin(false);
    setShowEscolha(true);
    setIsLogged(true);
    localStorage.setItem("isLogged", "true");
  };

  const handleLogout = () => {
    setIsLogged(false);
    localStorage.removeItem("isLogged");
    navigate("/");
  };

  const handleEscolhaSelect = (option: string) => {
    setShowEscolha(false);
    if (option === "Pesquisas") {
      navigate("/");
    }
  };

  return (
    <>
      <header className="bg-white shadow-none p-4">
        <div className="container mx-auto flex justify-between items-center">
          <img
            src="/public/logosisduc.png"
            alt="SISDUC"
            className="h-12 w-auto"
            style={{ maxHeight: 50 }}
          />
          <div className="flex items-center gap-4">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    className={cn(
                      "px-4 py-2 hover:text-red-700 transition-colors"
                    )}
                    href="/"
                  >
                    Início
                  </NavigationMenuLink>
                </NavigationMenuItem>
                {isLogged && (
                  <>
                    <NavigationMenuItem>
                      <NavigationMenuLink
                        className={cn(
                          "px-4 py-2 hover:text-red-700 transition-colors"
                        )}
                        href="/mapoteca"
                      >
                        Mapoteca
                      </NavigationMenuLink>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <NavigationMenuLink
                        className={cn(
                          "px-4 py-2 hover:text-red-700 transition-colors"
                        )}
                        href="/inicialAdm"
                      >
                        inicial Adm
                      </NavigationMenuLink>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <NavigationMenuLink
                        className={cn(
                          "px-4 py-2 hover:text-red-700 transition-colors"
                        )}
                        onClick={(e) => {
                          e.preventDefault();
                          onOpenReportModal();
                        }}
                        href="#"
                      >
                        Relatório
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuLink
                        className={cn(
                          "px-4 py-2 hover:text-red-700 transition-colors"
                        )}
                        href="/administracao"
                      >
                        Administração
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <span
                        className={cn(
                          "px-4 py-2 hover:text-red-700 transition-colors cursor-pointer"
                        )}
                        onClick={handleLogout}
                      >
                        Sair
                      </span>
                    </NavigationMenuItem>
                  </>
                )}
                {!isLogged && (
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      className={cn(
                        "px-4 py-2 hover:text-red-700 transition-colors cursor-pointer"
                      )}
                      asChild
                    >
                      <span onClick={() => setShowLogin(true)}>Login</span>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )}
              </NavigationMenuList>
            </NavigationMenu>
            {/* Botão de notificações */}
            {isLogged && (
              <div className="relative flex items-center">
                <button
                  className="flex items-center gap-2 bg-red-700 text-white px-4 py-2 rounded-lg shadow hover:bg-red-800 transition"
                  onClick={() => setShowNotifications((v) => !v)}
                >
                  <span className="material-icons">notifications</span>
                  <span className="hidden sm:inline">Notificações</span>
                </button>
                {showNotifications && (
                  <div
                    ref={notifRef}
                    className="absolute top-full mt-2 w-80 bg-white rounded-xl shadow-2xl border z-50 p-4"
                  >
                    <h3 className="font-semibold mb-2 text-red-700">
                      Notificações
                    </h3>
                    <ul className="space-y-2">
                      <li className="bg-slate-100 rounded p-2">
                        <span className="font-bold">12</span> projetos
                        registrados hoje
                      </li>
                      <li className="bg-slate-100 rounded p-2">
                        <span className="font-bold">3</span> cadastros pendentes
                        de aprovação
                      </li>
                      <li className="bg-slate-100 rounded p-2">
                        <span className="font-bold">1</span> projeto aguardando
                        documentação
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>
      <div className="w-full h-[2px] bg-red-700" />
      {/* LoginOverlay */}
      <LoginOverlay
        open={showLogin}
        onClose={() => setShowLogin(false)}
        onLoginSucesso={handleLoginSuccess}
      />
      {/* EscolhaOverlay */}
      <EscolhaOverlay
        open={showEscolha}
        onClose={() => setShowEscolha(false)}
        onSelect={handleEscolhaSelect}
        onOpenReportModal={onOpenReportModal}
      />
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />
    </>
  );
};

export default Header;
