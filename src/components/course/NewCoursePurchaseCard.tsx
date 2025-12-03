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

export default function NewCoursePurchaseCard({ product }: { product: Product }) {
  const isFree = product.price === "0";

  return (
    <div className="sticky top-6 transition-all duration-300">
      <style>{`
        @keyframes pulse-ring {
            0% { transform: scale(0.8); opacity: 0.5; }
            100% { transform: scale(1.3); opacity: 0; }
        }
        .play-button-pulse::before {
            content: '';
            position: absolute;
            left: 0; top: 0; width: 100%; height: 100%;
            background-color: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            z-index: -1;
            animation: pulse-ring 2s infinite;
        }
      `}</style>
      <div className="bg-white rounded-2xl shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)] overflow-hidden border border-gray-100 group hover:-translate-y-1 transition-transform duration-300">
        <div className="bg-gray-900 h-[220px] w-full flex items-center justify-center relative cursor-pointer overflow-hidden">
          <Image src={product.images[0]?.src || '/placeholder.svg'} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" alt={product.name} fill />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          <div className="relative z-10 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200 play-button-pulse">
            <Play size={24} className="text-[#3e64de] ml-1" fill="#3e64de" />
          </div>
          <div className="absolute bottom-4 left-4 right-4 text-center">
            <span className="text-white text-xs font-medium bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">Xem trước khóa học</span>
          </div>
        </div>
        
        <div className="p-8">
          <div 
            className="text-3xl font-bold text-gray-900 mb-6 pb-6 border-b border-gray-100"
            dangerouslySetInnerHTML={{ __html: product.price_html }}
          />

          <AddToCartButton product={product} className="w-full bg-gradient-to-r from-[#032c52] to-[#1e4b7a] text-white py-4 rounded-lg font-bold text-base hover:shadow-lg hover:from-[#053765] hover:to-[#25598d] transition-all duration-300 mb-4 flex items-center justify-center h-auto" size="lg" />
          
          <p className="text-center text-xs text-gray-500 mb-8">Đảm bảo hoàn tiền trong 30 ngày</p>

          <h4 className="font-bold text-gray-900 text-sm mb-4 uppercase tracking-wide">Khóa học bao gồm:</h4>
          
          <ul className="space-y-4 mb-8">
            <li className="flex items-center text-sm text-gray-600">
              <div className="w-8 flex justify-center"><Video size={16} className="text-[#3e64de]" /></div>
              <span className="font-medium">{product.duration} video</span>
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
        
        <div className="bg-gray-50 px-8 py-5 border-t border-gray-100 flex justify-between items-center">
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

      {product.requirements && product.requirements.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mt-6">
          <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">Dành cho ai?</h4>
          <ul className="space-y-3">
            {product.requirements.map((req, index) => (
              <li key={index} className="flex items-start text-sm text-gray-600">
                <Check size={14} className="text-green-500 mt-1 mr-3 shrink-0" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}