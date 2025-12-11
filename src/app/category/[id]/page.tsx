import { getProductsByCategory, getCategoryById } from '@/lib/api';
import ProductGrid from '@/components/ProductGrid';
import { Suspense } from 'react';
import Loading from '@/components/Loading';
import { notFound } from 'next/navigation';

async function CategoryProducts({ categoryId }: { categoryId: string }) {
  const products = await getProductsByCategory(categoryId);
  return <ProductGrid products={products} />;
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const category = await getCategoryById(id);

  if (!category) {
    notFound();
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
      <p className="text-gray-600 mb-6">Showing {category.count} products</p>
      <Suspense fallback={<Loading />}>
        <CategoryProducts categoryId={id} />
      </Suspense>
    </div>
  );
}