"use client";

import { useWishlist } from '@/hooks/useWishlist';
import ProductGrid from '@/components/ProductGrid';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function WishlistPage() {
  const { items } = useWishlist();

  return (
    <div className="container mx-auto px-6 py-12 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-cap-dark-blue">Danh sách yêu thích</h1>
      {items.length > 0 ? (
        <ProductGrid products={items} />
      ) : (
        <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50">
          <p className="text-xl mb-4 text-gray-500">Danh sách yêu thích của bạn đang trống.</p>
          <Button asChild className="bg-cap-purple hover:bg-cap-dark-blue">
            <Link href="/shop">Khám phá khóa học ngay</Link>
          </Button>
        </div>
      )}
    </div>
  );
}