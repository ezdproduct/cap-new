import { Product } from '@/lib/types';
import CourseCard from '@/components/landing/CourseCard';

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (!products || products.length === 0) {
    return (
        <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Chưa có khóa học nào được tìm thấy.</p>
        </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={product.id} className="h-full">
             <CourseCard product={product} />
        </div>
      ))}
    </div>
  );
}