"use client";

import { Product } from '@/lib/types';
import Image from 'next/image';
import AddToCartButton from '@/components/AddToCartButton';
import { 
  Check, 
  PlayCircle, 
  Video, 
  FileText, 
  Infinity, 
  Smartphone, 
  Award,
  Facebook,
  Twitter,
  Linkedin
} from 'lucide-react';

const CoursePurchaseCard = ({ product }: { product: Product }) => {
  const courseIncludes = [
    { icon: Video, text: "Video theo yêu cầu" },
    { icon: FileText, text: `${product.curriculum?.reduce((acc, topic) => acc + topic.lessons.length, 0) || 5}+ bài học` },
    { icon: Infinity, text: "Truy cập trọn đời" },
    { icon: Smartphone, text: "Học trên mọi thiết bị" },
    { icon: Award, text: "Chứng chỉ hoàn thành" },
  ];

  const whoFor = product.requirements || [
    "Người muốn xây dựng nền tảng tiếng Anh vững chắc.",
    "Người đi làm muốn cải thiện kỹ năng giao tiếp trong công việc.",
    "Bất kỳ ai muốn học tiếng Anh một cách bài bản và hiệu quả."
  ];

  return (
    <div className="sticky top-6 transition-all duration-300">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 group hover:-translate-y-1 transition-transform duration-300">
        <div className="relative aspect-video w-full cursor-pointer overflow-hidden">
          <Image 
            src={product.images[0]?.src || '/placeholder.svg'} 
            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" 
            alt={product.name}
            fill 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative z-10 w-16 h-16 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
              <PlayCircle size={32} className="text-cap-purple" />
            </div>
          </div>
          <div className="absolute bottom-4 left-4 right-4 text-center">
            <span className="text-white text-xs font-medium bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">Xem trước khóa học</span>
          </div>
        </div>
        
        <div className="p-6">
          <div 
            className="text-3xl font-bold text-cap-dark-blue mb-6 text-center"
            dangerouslySetInnerHTML={{ __html: product.price_html }}
          />

          <AddToCartButton product={product} className="w-full h-12 text-lg font-bold" />
          
          <p className="text-center text-xs text-gray-500 my-4">Đảm bảo hoàn tiền trong 30 ngày</p>

          <h4 className="font-bold text-gray-900 text-sm mb-4 uppercase tracking-wide">Khóa học bao gồm:</h4>
          <ul className="space-y-3 mb-6">
            {courseIncludes.map((item, index) => (
              <li key={index} className="flex items-center text-sm text-gray-600">
                <div className="w-8 flex justify-center"><item.icon size={16} className="text-cap-purple" /></div>
                <span className="font-medium">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-between items-center">
          <span className="font-bold text-gray-700 text-sm">Chia sẻ:</span>
          <div className="flex space-x-2">
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-500 hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                  <Facebook size={14} />
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-500 hover:bg-sky-500 hover:text-white transition-all shadow-sm">
                  <Twitter size={14} />
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-500 hover:bg-blue-700 hover:text-white transition-all shadow-sm">
                  <Linkedin size={14} />
              </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 mt-6">
        <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">Dành cho ai?</h4>
        <ul className="space-y-3">
          {whoFor.map((item, index) => (
            <li key={index} className="flex items-start text-sm text-gray-600">
              <Check size={14} className="text-green-500 mt-0.5 mr-3 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CoursePurchaseCard;