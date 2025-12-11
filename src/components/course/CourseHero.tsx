import React from 'react';
import { Product } from '@/lib/types';
import { Layers, ChevronRight, Star, FolderOpen, Calendar } from 'lucide-react';
import Link from 'next/link';

const StarRating = ({ rating, count }: { rating: number, count: number }) => (
  <div className="flex items-center space-x-4">
    <div className="flex items-center bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm">
      <span className="font-bold text-lg mr-2 text-white">{rating.toFixed(1)}</span>
      <div className="flex space-x-1 text-[#F59E0B]">
        {[...Array(5)].map((_, i) => {
          const fillAmount = Math.max(0, Math.min(1, rating - i));
          return (
            <div key={i} className="relative w-3 h-3">
              <Star size={12} stroke="#F59E0B" strokeWidth={1} className="absolute top-0 left-0" />
              <div style={{ width: `${fillAmount * 100}%`, overflow: 'hidden' }} className="absolute top-0 left-0 h-full">
                <Star size={12} fill="#F59E0B" strokeWidth={0} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
    {count > 0 && <span className="text-sm text-gray-400">({count} đánh giá)</span>}
  </div>
);

const CourseHero = ({ product }: { product: Product }) => {
  return (
    <header className="bg-[#111827] text-white pt-12 pb-24 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#3e64de] opacity-5 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-purple-500 opacity-5 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-sm text-gray-400 mb-6 font-medium flex items-center space-x-2 flex-wrap">
          <Link href="/shop" className="hover:text-white transition-colors">Khóa học</Link>
          {product.categories[0] && (
            <>
              <ChevronRight size={12} />
              <Link href={`/category/${product.categories[0].id}`} className="hover:text-white transition-colors">{product.categories[0].name}</Link>
            </>
          )}
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight tracking-tight">
          {product.name}
        </h1>
        
        <div className="text-base text-gray-300 mb-6 leading-relaxed border-l-4 border-[#3e64de] pl-4"
          dangerouslySetInnerHTML={{ __html: product.short_description }}
        />

        <div className="flex flex-wrap items-center gap-y-3 gap-x-6 text-sm text-gray-400 mb-6">
          <div className="flex items-center">
            <Layers size={16} className="mr-2 text-[#3e64de]" />
            <span>Cấp độ: <span className="text-gray-200 font-medium">{product.level}</span></span>
          </div>
        </div>

        <StarRating rating={product.rating || 0} count={0} />
      </div>
    </header>
  );
};

export default CourseHero;