"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, ShoppingCart, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import MiniCart from "@/components/MiniCart";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const navItems = [
  { name: "Khóa học", href: "/shop" },
  { name: "Giải Pháp", href: "/#solutions" },
];

const LOGIN_URL = "/login";

export default function Header() {
  const pathname = usePathname();
  const { totalItems: cartCount } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const [popoverOpen, setPopoverOpen] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(true);

  const isStaticHeaderPage = pathname?.startsWith("/order-confirmation") || (pathname?.startsWith("/shop/") && pathname !== "/shop");

  const handleLogout = () => {
    logout();
    toast.success("Bạn đã đăng xuất thành công.");
  };

  React.useEffect(() => {
    const handleScroll = () => {
      if (isStaticHeaderPage) return;
      if (pathname === "/") {
        const solutionsSection = document.getElementById("solutions");
        if (solutionsSection) {
          const rect = solutionsSection.getBoundingClientRect();
          if (rect.top <= 80) {
            setIsVisible(false);
          } else {
            setIsVisible(true);
          }
        } else {
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname, isStaticHeaderPage]);

  const displayName = user?.displayName || 'Student';

  return (
    <header
      className={cn(
        "z-50 w-full bg-white shadow-sm",
        isStaticHeaderPage
          ? "relative"
          : cn(
            "fixed top-0 left-0 right-0 transition-transform duration-300",
            isVisible ? "translate-y-0" : "-translate-y-full"
          )
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="https://learnwithcap.com/wp-content/uploads/2025/06/cap-logo-1.png"
            alt="CAP English Training Logo"
            width={0}
            height={0}
            sizes="100vw"
            className="h-8 w-auto"
          />
        </Link>

        <nav className="hidden md:flex items-center space-x-1 bg-gray-100 p-1 rounded-full group">
          {navItems.map((item) => {
            const NavComponent = item.href.startsWith('/#') ? 'a' : Link;
            return (
              <NavComponent
                key={item.name}
                href={item.href}
                className="rounded-full px-4 py-1.5 text-base font-medium transition-colors text-gray-900 group-hover:text-gray-400 hover:!text-gray-900"
              >
                {item.name}
              </NavComponent>
            );
          })}
        </nav>

        <div className="flex items-center space-x-2">
          <div className="hidden md:flex items-center space-x-2">
            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Shopping Cart"
                  className="relative text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                >
                  <ShoppingCart className="h-6 w-6" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-cap-purple text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-96 p-0" align="end">
                <MiniCart onClose={() => setPopoverOpen(false)} />
              </PopoverContent>
            </Popover>

            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-cap-dark-blue hover:bg-cap-purple text-white rounded-md transition-colors text-base px-4 py-1.5 h-auto">
                    {displayName}'s HUB
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{displayName}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Tài khoản</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Đăng xuất</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href={LOGIN_URL}>
                <Button className="bg-cap-dark-blue hover:bg-cap-purple text-white rounded-md transition-colors text-base px-4 py-1.5 h-auto">
                  Đăng nhập
                </Button>
              </Link>
            )}
          </div>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <div className="flex flex-col space-y-4 pt-6">
                  {navItems.map((item) => {
                    const NavComponent = item.href.startsWith('/#') ? 'a' : Link;
                    return (
                      <NavComponent
                        key={item.name}
                        href={item.href}
                        className="text-lg font-medium text-gray-800 hover:text-cap-purple"
                      >
                        {item.name}
                      </NavComponent>
                    )
                  })}
                  <div className="border-t !mt-6 !mb-2"></div>
                  {isAuthenticated && user ? (
                    <>
                      <div className="font-semibold px-1">{displayName}'s HUB</div>
                      <Button variant="ghost" className="justify-start -mx-2"><User className="mr-2 h-4 w-4" /> Tài khoản</Button>
                      <Button onClick={handleLogout} variant="ghost" className="justify-start -mx-2 text-red-500 hover:text-red-600"><LogOut className="mr-2 h-4 w-4" /> Đăng xuất</Button>
                    </>
                  ) : (
                    <Link href={LOGIN_URL}>
                      <Button className="w-full bg-cap-dark-blue hover:bg-cap-purple text-white transition-colors">Đăng nhập</Button>
                    </Link>
                  )}
                  <Button variant="outline" className="w-full flex items-center justify-center" asChild>
                    <Link href="/cart">
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      Giỏ hàng ({cartCount})
                    </Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}