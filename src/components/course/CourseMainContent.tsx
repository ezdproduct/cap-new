"use client";

import { useState } from 'react';
import { Product } from '@/lib/types';
import { Check, PlayCircle, ChevronDown, BookOpen } from 'lucide-react';
import DOMPurify from 'isomorphic-dompurify';

const AccordionItem = ({ topic, isOpen, onClick }: { topic: any, isOpen: boolean, onClick: () => void }) => {
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button 
        className={`w-full flex justify-between items-center px-6 py-5 transition duration-200 text-left group ${isOpen ? 'bg-gray-100' : 'bg-gray-50 hover:bg-gray-100'}`}
        onClick={onClick}
      >
        <div className="flex items-center">
          <span className={`w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center mr-4 shadow-sm transition-colors ${isOpen ? 'bg-purple-50 text-cap-purple' : 'bg-white text-gray-500 group-hover:text-cap-purple'}`}>
            <BookOpen size={14} />
          </span>
          <div>
            <span className="font-bold text-gray-800 block text-sm sm:text-base">{topic.title}</span>
          </div>
        </div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm transition-colors ${isOpen ? 'bg-purple-50 text-cap-purple' : 'bg-white text-gray-400'}`}>
          <ChevronDown size={14} className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} /> 
        </div>
      </button>
      
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <ul className="py-2 bg-white">
          {topic.lessons.map((lesson: any, idx: number) => (
            <li key={idx} className="flex justify-between items-center px-6 py-3 hover:bg-purple-50/50 transition-colors cursor-pointer group">
              <div className="flex items-center">
                <div className="mr-4 text-gray-400 group-hover:text-cap-purple transition-colors">
                    <PlayCircle size={16} />
                </div>
                <span className="text-gray-600 text-sm font-medium group-hover:text-cap-purple transition-colors">{lesson.title}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const CourseMainContent = ({ product }: { product: Product }) => {
  const [openSectionId, setOpenSectionId] = useState(product.curriculum?.[0]?.title || null);
  const sanitizedDescription = DOMPurify.sanitize(product.description);

  const toggleSection = (id: string) => {
    setOpenSectionId(openSectionId === id ? null : id);
  };

  return (
    <div className="space-y-12">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Lợi ích khóa học:</h3>
        {product.benefits && product.benefits.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.benefits.map((benefit, index) => (
              <div key={index} className="flex p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                <Check size={18} className="text-green-500 mt-0.5 mr-4 shrink-0" />
                <span className="text-gray-600 text-sm font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center text-gray-500 text-sm">
            <p>Nội dung đang được cập nhật.</p>
          </div>
        )}
      </div>

      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Giới thiệu tổng quan</h3>
        {sanitizedDescription ? (
          <div
            className="prose max-w-none text-gray-700 leading-relaxed bg-white p-6 rounded-xl shadow-sm border border-gray-100"
            dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
          />
        ) : (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center text-gray-500 text-sm">
            <p>Nội dung đang được cập nhật.</p>
          </div>
        )}
      </div>

      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Nội dung khóa học</h3>
        {product.curriculum && product.curriculum.length > 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {product.curriculum.map((topic) => (
              <AccordionItem 
                key={topic.title} 
                topic={topic} 
                isOpen={openSectionId === topic.title} 
                onClick={() => toggleSection(topic.title)} 
              />
            ))}
          </div>
        ) : (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center text-gray-500 text-sm">
            <p>Nội dung đang được cập nhật.</p>
          </div>
        )}
      </div>

      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Từ khóa phổ biến:</h3>
        {product.tags && product.tags.length > 0 ? (
          <div className="flex flex-wrap">
            {product.tags.map((tag, idx) => (
              <a key={idx} href="#" className="bg-white border border-gray-200 text-gray-600 px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-all duration-200 mr-2 mb-2 hover:border-cap-purple hover:text-cap-purple hover:bg-purple-50 hover:-translate-y-px hover:shadow-sm">
                {tag}
              </a>
            ))}
          </div>
        ) : (
           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center text-gray-500 text-sm">
            <p>Chưa có từ khóa nào.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseMainContent;