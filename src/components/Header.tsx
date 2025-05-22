
import React from 'react';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const Header = () => {
  return (
    <header className="bg-primary shadow-md p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">SISDUC</div>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink 
                className={cn("px-4 py-2 hover:text-secondary transition-colors")}
                href="/"
              >
                Início
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink 
                className={cn("px-4 py-2 hover:text-secondary transition-colors")}
                href="/sobre"
              >
                Sobre
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink 
                className={cn("px-4 py-2 hover:text-secondary transition-colors")}
                href="/contato"
              >
                Contato
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
};

export default Header;
