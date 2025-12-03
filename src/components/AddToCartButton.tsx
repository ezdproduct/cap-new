"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { Product } from "@/lib/types";
import Link from "next/link";
import { ShoppingCart, Eye, PlayCircle } from "lucide-react";

interface AddToCartButtonProps {
  product: Product;
  className?: string;
  size?: "default" | "sm" | "lg" | "icon" | null | undefined;
}

export default function AddToCartButton({ product, className, size = "default" }: AddToCartButtonProps) {
  const { addItem, items } = useCart();
  
  const isInCart = items.some((item) => item.id === product.id);
  const isPurchased = false; // Giả định, cần auth thực tế

  if (isPurchased) {
      return (
        <Button size={size} className={`${className} bg-green-600 hover:bg-green-700`} asChild>
            <Link href={`https://course.learnwithcap.com/courses/${product.slug}`} target="_blank">
                <PlayCircle className="mr-2 h-4 w-4" /> Vào học
            </Link>
        </Button>
      );
  }

  if (isInCart) {
    return (
      <Button size={size} className={`${className} bg-cap-purple hover:bg-cap-dark-blue`} asChild>
        <Link href="/cart">
           <Eye className="mr-2 h-4 w-4" /> Xem giỏ hàng
        </Link>
      </Button>
    );
  }

  return (
    <Button size={size} className={className} onClick={() => addItem(product)}>
      <ShoppingCart className="mr-2 h-4 w-4" /> Thêm vào giỏ
    </Button>
  );
}