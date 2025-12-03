"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import MiniCart from "@/components/MiniCart";
import { useCart } from "@/hooks/useCart";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Khóa học", href: "/shop" },
  { name: "Giải Pháp", href: "/#solutions" },
];

export default function Header() {
  const pathname = usePathname();
  const { totalItems: cartCount } = useCart();
  const [popoverOpen, setPopoverOpen] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(true);

  // Chỉ trang Order Confirmation và trang chi tiết khóa học là header tĩnh (relative)
  // Lưu ý: '/shop' là trang danh sách (giữ sticky), '/shop/slug' là chi tiết (static)
  const isStaticHeaderPage = pathname?.startsWith("/order-confirmation") || (pathname?.startsWith("/shop/") && pathname !== "/shop");

  React.useEffect(() => {
    const handleScroll = () => {
      // Nếu là trang static, không cần tính toán ẩn/hiện
      if (isStaticHeaderPage) return;

      // Logic riêng cho Trang Chủ (Home)
      if (pathname === "/") {
        const solutionsSection = document.getElementById("solutions");
        if (solutionsSection) {
          const rect = solutionsSection.getBoundingClientRect();
          // Nếu phần Solutions trượt lên gần top (đã qua phần Courses), ẩn header
          // Sử dụng offset 80px (khoảng chiều cao header + một chút đệm)
          if (rect.top <= 80) {
            setIsVisible(false);
          } else {
            setIsVisible(true);
          }
        } else {
          // Fallback nếu không tìm thấy section (luôn hiện)
          setIsVisible(true);
        }
      } else {
        // Các trang khác (Shop, Cart...): Luôn Sticky
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Gọi ngay một lần để set state đúng khi mới load/reload trang
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname, isStaticHeaderPage]);

  return (
    <header
      className={cn(
        "z-50 w-full bg-white shadow-sm",
        // Static header cho trang Order Confirmation và Detail
        isStaticHeaderPage
          ? "relative"
          : cn(
            "fixed top-0 left-0 right-0 transition-transform duration-300",
            isVisible ? "translate-y-0" : "-translate-y-full"
          )
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        {/* Logo */}
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

        {/* Desktop Navigation */}
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

        {/* CTA & Mobile Menu */}
        <div className="flex items-center space-x-2">
          <div className="hidden md:flex items-center space-x-2">

            {/* Cart Button */}
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

            <Button
              asChild
              className="bg-cap-dark-blue hover:bg-cap-purple text-white rounded-md transition-colors text-base px-4 py-1.5 h-auto"
            >
              <Link href="/login">Đăng nhập</Link>
            </Button>
          </div>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
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
                  <Button asChild className="w-full bg-cap-dark-blue hover:bg-cap-purple text-white transition-colors">
                    <Link href="/login">Đăng nhập</Link>
                  </Button>

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