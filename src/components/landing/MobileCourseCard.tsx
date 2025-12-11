"use client";

import React from 'react';
import { Product } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';
import { Users, Clock } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface MobileCourseCardProps {
  product: Product;
}

const MobileCourseCard: React.FC<MobileCourseCardProps> = ({ product }) => {
  const imageUrl = product.images[0]?.src || '/placeholder.svg';
  const productUrl = `/course/${product.slug}`;

  return (
    <Link href={productUrl} className="bg-white p-3 rounded-3xl shadow-sm border border-gray-100 flex gap-4 hover:shadow-md transition-all duration-200 cursor-pointer group">
      {/* Cột trái: Hình ảnh & Badge */}
      <div className="relative w-32 h-24 flex-shrink-0">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          className="w-full h-full object-cover rounded-2xl"
          loading="lazy"
        />
        {/* Badge cho cấp độ */}
        {product.level && (
          <div className="absolute bottom-1 right-1 bg-cap-purple text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm">
            {product.level}
          </div>
        )}
      </div>

      {/* Cột phải: Thông tin chi tiết */}
      <div className="flex flex-col justify-between py-0.5 flex-1 min-w-0">
        <div>
          {/* Tiêu đề */}
          <h3 className="text-gray-900 font-bold text-sm leading-tight line-clamp-2 group-hover:text-cap-purple transition-colors">
            {product.name}
          </h3>

          {/* Metadata: Thời lượng & Lượt học viên */}
          <div className="flex items-center text-[11px] text-gray-500 mt-1.5 gap-2 flex-wrap">
            {product.duration && product.duration !== "N/A" && (
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" /> {product.duration}
              </span>
            )}
            {product.totalEnrolled && product.totalEnrolled > 0 && (
              <>
                {product.duration && product.duration !== "N/A" && <span className="w-1 h-1 bg-gray-300 rounded-full"></span>}
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3" /> {product.totalEnrolled} học viên
                </span>
              </>
            )}
          </div>
        </div>

        {/* Thông tin giảng viên */}
        <div className="flex items-center gap-2 mt-2">
          <Avatar className="w-5 h-5">
            <AvatarFallback className="text-[10px]">{product.instructor?.charAt(0) || 'C'}</AvatarFallback>
          </Avatar>
          <span className="text-[11px] font-medium text-gray-600 truncate">
            {product.instructor || 'CAP English'}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default MobileCourseCard;