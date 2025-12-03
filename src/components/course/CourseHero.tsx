import React from 'react';
import { Product } from '@/lib/types';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Star, Clock, BarChart3, Users, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const CourseHero = ({ product }: { product: Product }) => {
  const rating = product.rating || 5;

  return (
    <header className="bg-cap-dark-blue text-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl">
          <div className="mb-4 flex items-center text-sm text-gray-300 flex-wrap">
            <Link href="/shop" className="hover:text-white">Tất cả khóa học</Link>
            {product.categories.slice(0, 1).map((cat) => ( // Chỉ hiển thị category đầu tiên cho gọn
              <React.Fragment key={cat.id}>
                <ChevronRight className="h-4 w-4 mx-1" />
                <Link href={`/category/${cat.id}`} className="hover:text-white">{cat.name}</Link>
              </React.Fragment>
            ))}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">{product.name}</h1>
          <p className="text-lg text-gray-300 mb-6 max-w-3xl">{product.short_description}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback>{product.instructor?.charAt(0) || 'C'}</AvatarFallback>
              </Avatar>
              <span>{product.instructor}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              <span>{rating.toFixed(1)} xếp hạng</span>
            </div>
            {product.totalEnrolled && product.totalEnrolled > 0 && (
                <div className="flex items-center gap-1.5">
                    <Users className="h-4 w-4 text-gray-300" />
                    <span>{product.totalEnrolled} học viên</span>
                </div>
            )}
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-gray-300" />
              <span>{product.duration}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BarChart3 className="h-4 w-4 text-gray-300" />
              <span>{product.level}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default CourseHero;