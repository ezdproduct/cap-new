import React from 'react';
import { Product } from '@/lib/types';
import { Star, Layers, Calendar, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const StarRating = ({ rating, count }: { rating: number, count: number }) => (
  <div className="flex items-center space-x-4">
    <div className="flex items-center bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm">
      <span className="font-bold text-lg mr-2 text-white">{rating.toFixed(1)}</span>
      <div className="flex space-x-1 text-yellow-400">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={12} fill="currentColor" strokeWidth={0} className={i < Math.round(rating) ? 'text-yellow-400' : 'text-gray-500'} />
        ))}
      </div>
    </div>
    {count > 0 && <span className="text-sm text-gray-400">({count} đánh giá)</span>}
  </div>
);

const CourseHero = ({ product }: { product: Product }) => {
  const rating = product.rating || 5;
  const reviewCount = product.totalEnrolled || 0; // Giả sử số lượt đăng ký là số lượt đánh giá

  return (
    <header className="bg-cap-dark-blue text-white pt-12 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-cap-purple opacity-10 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-cap-sky-blue opacity-10 blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-10 relative z-10">
            <div className="lg:col-span-8">
                <div className="text-sm text-gray-400 mb-6 font-medium flex items-center space-x-2 flex-wrap">
                    <Link href="/shop" className="hover:text-white transition-colors">Khóa học</Link> 
                    <ChevronRight size={12} />
                    {product.categories[0] && (
                        <Link href={`/category/${product.categories[0].id}`} className="hover:text-white transition-colors">{product.categories[0].name}</Link> 
                    )}
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-[40px] font-bold mb-6 leading-tight tracking-tight text-white">
                    {product.name}
                </h1>
                
                <div className="text-base text-gray-300 mb-6 leading-relaxed border-l-4 border-cap-sky-blue pl-4">
                    <p>{product.short_description}</p>
                </div>

                <div className="flex flex-wrap items-center gap-y-3 gap-x-6 text-sm text-gray-400 mb-6">
                    <div className="flex items-center">
                        <Layers size={16} className="mr-2 text-cap-sky-blue" />
                        <span>Cấp độ: <span className="text-gray-200 font-medium">{product.level}</span></span>
                    </div>
                    <div className="flex items-center">
                        <Calendar size={16} className="mr-2 text-cap-sky-blue" />
                        <span>Thời lượng: <span className="text-gray-200 font-medium">{product.duration}</span></span>
                    </div>
                </div>

                <StarRating rating={rating} count={reviewCount} />
            </div>
            <div className="lg:col-span-4"></div>
        </div>
    </header>
  );
};

export default CourseHero;