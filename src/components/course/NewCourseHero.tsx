import React from 'react';
import { Product } from '@/lib/types';
import { ChevronRight, FolderOpen, Layers, Calendar, Star } from 'lucide-react';
import Link from 'next/link';

const StarRating = ({ rating, count }: { rating: number, count: number }) => (
  <div className="flex items-center space-x-4">
    <div className="flex items-center bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm">
      <span className="font-bold text-lg mr-2 text-white">{rating.toFixed(1)}</span>
      <div className="flex space-x-1 text-[#F59E0B]">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={12} fill={i < Math.round(rating) ? "#F59E0B" : "none"} stroke={i < Math.round(rating) ? "#F59E0B" : "#F59E0B"} strokeWidth={1} />
        ))}
      </div>
    </div>
    <span className="text-sm text-gray-400">({count} đánh giá)</span>
  </div>
);

export default function NewCourseHero({ product }: { product: Product }) {
  return (
    <div className="bg-[#111827] text-white pt-12 pb-24 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#3e64de] opacity-5 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-purple-500 opacity-5 blur-3xl"></div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-10 relative z-10">
        <div className="lg:col-span-8">
          <div className="text-sm text-gray-400 mb-6 font-medium flex items-center space-x-2 flex-wrap">
            <Link href="/shop" className="hover:text-white transition-colors">Khóa học</Link>
            <ChevronRight size={10} />
            {product.categories[0] && (
              <>
                <Link href={`/category/${product.categories[0].id}`} className="hover:text-white transition-colors">{product.categories[0].name}</Link>
                <ChevronRight size={10} />
              </>
            )}
            <span className="text-white truncate">{product.name}</span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-[40px] font-bold mb-6 leading-tight tracking-tight text-white">
            {product.name}
          </h1>
          
          <div className="text-base text-gray-300 mb-6 leading-relaxed border-l-4 border-[#3e64de] pl-4">
            <p>{product.short_description}</p>
          </div>

          <div className="flex flex-wrap items-center gap-y-3 gap-x-6 text-sm text-gray-400 mb-6">
            <div className="flex items-center">
              <FolderOpen size={16} className="mr-2 text-[#3e64de]" />
              <span>Lĩnh vực: <span className="text-gray-200 font-medium">{product.categories.map(c => c.name).join(', ')}</span></span>
            </div>
            <div className="flex items-center">
              <Layers size={16} className="mr-2 text-[#3e64de]" />
              <span>Cấp độ: <span className="text-gray-200 font-medium">{product.level}</span></span>
            </div>
            <div className="flex items-center">
              <Calendar size={16} className="mr-2 text-[#3e64de]" />
              <span>Thời lượng: <span className="text-gray-200 font-medium">{product.duration}</span></span>
            </div>
          </div>

          <StarRating rating={product.rating || 5} count={product.totalEnrolled || 0} />
        </div>
        <div className="lg:col-span-4"></div>
      </div>
    </div>
  );
}