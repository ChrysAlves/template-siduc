import React, { useState, useEffect } from "react";
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

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showEscolha, setShowEscolha] = useState(false);
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

  return (
    <>
      <header className="bg-white shadow-none p-1">
        <div className="container mx-auto flex justify-between items-center">
          <img
            src="/public/logosisduc.png"
            alt="SISDUC"
            className="h-50 w-auto"
            style={{ maxHeight: 50 }}
          />
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
                      href="/gerenciador"
                    >
                      Gerenciador
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      className={cn(
                        "px-4 py-2 hover:text-red-700 transition-colors"
                      )}
                      href="/relatorio"
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
                    <NavigationMenuLink
                      className={cn(
                        "px-4 py-2 hover:text-red-700 transition-colors"
                      )}
                      href="/formulario"
                    >
                      Formulário
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
        </div>
      </header>
      <div className="w-full h-[2px] bg-red-700" />
      <LoginOverlay
        open={showLogin}
        onClose={() => setShowLogin(false)}
        onLoginSucesso={handleLoginSuccess}
      />
      <EscolhaOverlay
        open={showEscolha}
        onClose={() => setShowEscolha(false)}
        onSelect={(option) => {
          setShowEscolha(false);
          if (option === "Pesquisas") {
            navigate("/");
          }
        }}
      />
    </>
  );
};

export default Header;
