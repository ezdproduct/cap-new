"use client";

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

export default function CartIcon() {
  const { totalItems } = useCart();

  return (
    <Link href="/cart" className="relative text-gray-600 hover:text-gray-800">
      <ShoppingCart />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </Link>
  );
}