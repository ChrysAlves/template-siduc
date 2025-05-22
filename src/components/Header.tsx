
import React from 'react';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const Header = () => {
  return (
    <header className="bg-slate-100 shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink 
                className={cn("px-4 py-2 hover:text-primary transition-colors")}
                href="/"
              >
                Início
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink 
                className={cn("px-4 py-2 hover:text-primary transition-colors")}
                href="/sobre"
              >
                Sobre
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink 
                className={cn("px-4 py-2 hover:text-primary transition-colors")}
                href="/contato"
              >
                Contato
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="text-2xl font-bold text-primary">SISDUC</div>
      </div>
    </header>
  );
};

export default Header;
