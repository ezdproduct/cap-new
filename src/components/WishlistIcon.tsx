"use client";

import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useWishlist } from '@/hooks/useWishlist';

export default function WishlistIcon() {
  const { totalItems } = useWishlist();

  return (
    <Link href="/wishlist" className="relative text-gray-600 hover:text-gray-800">
      <Heart />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </Link>
  );
}