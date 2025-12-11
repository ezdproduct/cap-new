"use client";

import { Product } from '@/lib/types';
import Image from 'next/image';
import AddToCartButton from '@/components/AddToCartButton';
import { 
  Play, 
  Video, 
  FileText, 
  Download, 
  Infinity, 
  Smartphone, 
  Award, 
  Check,
  Facebook,
  Twitter,
  Linkedin
} from 'lucide-react';

const CoursePurchaseCard = ({ product }: { product: Product }) => {
  return (
    <div className="sticky top-6 transition-all duration-300">
      <div className="bg-white rounded-2xl shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)] overflow-hidden border border-gray-100 group hover:-translate-y-1 transition-transform duration-300">
        <div className="bg-gray-900 aspect-video w-full flex items-center justify-center relative cursor-pointer overflow-hidden">
          <Image
            src={product.images[0]?.src || '/placeholder.svg'}
            alt={product.name}
            fill
            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          
          <div className="relative z-10 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200 play-button-pulse">
            <Play size={24} className="text-[#3e64de] ml-1" fill="#3e64de" />
          </div>
          
          <div className="absolute bottom-4 left-4 right-4 text-center">
            <span className="text-white text-xs font-medium bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">Xem trước khóa học</span>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-center justify-center mb-6 pb-6 border-b border-gray-100">
            <div className="text-3xl font-bold text-gray-900 text-center"
              dangerouslySetInnerHTML={{ __html: product.price_html }}
            />
          </div>

          <AddToCartButton 
            product={product} 
            className="w-full bg-gradient-to-r from-[#032c52] to-[#1e4b7a] text-white py-4 rounded-lg font-bold text-base hover:shadow-lg hover:from-[#053765] hover:to-[#25598d] transition-all duration-300 mb-4 flex items-center justify-center h-auto" 
          />
          
          <p className="text-center text-xs text-gray-500 mb-8">Đảm bảo hoàn tiền trong 30 ngày</p>

          <h4 className="font-bold text-gray-900 text-sm mb-4 uppercase tracking-wide">Khóa học bao gồm:</h4>
          
          <ul className="space-y-4 mb-8">
            <li className="flex items-center text-sm text-gray-600">
              <div className="w-8 flex justify-center"><Video size={16} className="text-[#3e64de]" /></div>
              <span className="font-medium">Video theo yêu cầu</span>
            </li>
            <li className="flex items-center text-sm text-gray-600">
              <div className="w-8 flex justify-center"><FileText size={16} className="text-[#3e64de]" /></div>
              <span className="font-medium">Bài viết & tài liệu</span>
            </li>
            <li className="flex items-center text-sm text-gray-600">
              <div className="w-8 flex justify-center"><Infinity size={16} className="text-[#3e64de]" /></div>
              <span className="font-medium">Truy cập trọn đời</span>
            </li>
            <li className="flex items-center text-sm text-gray-600">
              <div className="w-8 flex justify-center"><Smartphone size={16} className="text-[#3e64de]" /></div>
              <span className="font-medium">Học trên mọi thiết bị</span>
            </li>
            <li className="flex items-center text-sm text-gray-600">
              <div className="w-8 flex justify-center"><Award size={16} className="text-[#3e64de]" /></div>
              <span className="font-medium">Chứng chỉ hoàn thành</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-gray-50 px-6 py-5 border-t border-gray-100 flex justify-between items-center">
          <span className="font-bold text-gray-700 text-sm">Chia sẻ:</span>
          <div className="flex space-x-2">
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-200 text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-all shadow-sm">
                  <Facebook size={12} fill="currentColor" />
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-200 text-[#1DA1F2] hover:bg-[#1DA1F2] hover:text-white transition-all shadow-sm">
                  <Twitter size={12} fill="currentColor" />
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-200 text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-all shadow-sm">
                  <Linkedin size={12} fill="currentColor" />
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePurchaseCard;