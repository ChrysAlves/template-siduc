import React, { useState } from "react";
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
  const navigate = useNavigate();

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
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={cn(
                    "px-4 py-2 hover:text-red-700 transition-colors"
                  )}
                  href="/sobre"
                >
                  Sobre
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={cn(
                    "px-4 py-2 hover:text-red-700 transition-colors"
                  )}
                  href="/contato"
                >
                  Contato
                </NavigationMenuLink>
              </NavigationMenuItem>
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
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </header>
      <div className="w-full h-[2px] bg-red-700" />
      <LoginOverlay
        open={showLogin}
        onClose={() => setShowLogin(false)}
        onLoginSucesso={() => {
          setShowLogin(false);
          setShowEscolha(true);
        }}
      />
      <EscolhaOverlay
        open={showEscolha}
        onClose={() => setShowEscolha(false)}
        onSelect={(option) => {
          setShowEscolha(false);
          if (option === "Pesquisas") {
            navigate("/"); // Vai para a página inicial
          }
          // Você pode adicionar outras navegações para as demais opções aqui
        }}
      />
    </>
  );
};

export default Header;
