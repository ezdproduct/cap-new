import { getProducts } from '@/lib/api';
import ShopClient from '@/components/shop/ShopClient';
import { Suspense } from 'react';
import Loading from '@/components/Loading';

async function ShopContent() {
  const products = await getProducts();
  return <ShopClient initialProducts={products} />;
}

export default function ShopPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ShopContent />
    </Suspense>
  );
}