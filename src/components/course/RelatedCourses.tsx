import { Product } from '@/lib/types';
import ProductGrid from '@/components/ProductGrid';

interface RelatedCoursesProps {
  products: Product[];
}

export default function RelatedCourses({ products }: RelatedCoursesProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Các khóa học liên quan
        </h2>
        <div className="max-w-5xl mx-auto">
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  );
}