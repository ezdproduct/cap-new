"use client";

import React, { useState } from 'react';
import { Product } from '@/lib/types';
import { ChevronDown, FolderOpen, Box, Play, Lock } from 'lucide-react';

interface AccordionItemProps {
  section: NonNullable<Product['curriculum']>[0];
  isOpen: boolean;
  onClick: () => void;
}

const AccordionItem = ({ section, isOpen, onClick }: AccordionItemProps) => {
  const totalLessons = section.lessons.length;
  
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button 
        className={`w-full flex justify-between items-center px-6 py-5 transition duration-200 text-left group ${isOpen ? 'bg-gray-100' : 'bg-gray-50 hover:bg-gray-100'}`}
        onClick={onClick}
      >
        <div className="flex items-center">
          <span className={`w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center mr-4 shadow-sm transition-colors ${isOpen ? 'bg-blue-50 text-[#3e64de]' : 'bg-white text-gray-500 group-hover:text-[#3e64de]'}`}>
            {isOpen ? <FolderOpen size={14} /> : <Box size={14} />}
          </span>
          <div>
            <span className="font-bold text-gray-800 block text-sm sm:text-base">{section.title}</span>
            <span className="text-xs text-gray-500 font-normal">{totalLessons} bài học</span>
          </div>
        </div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm transition-colors ${isOpen ? 'bg-blue-50 text-[#3e64de]' : 'bg-white text-gray-400'}`}>
          <ChevronDown size={14} className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} /> 
        </div>
      </button>
      
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <ul className="py-2 bg-white">
          {section.lessons.map((lesson, idx) => (
            <li key={idx} className="flex justify-between items-center px-6 py-3 hover:bg-blue-50/50 transition-colors cursor-pointer group">
              <div className="flex items-center">
                <div className="mr-4 text-gray-400 group-hover:text-[#3e64de] transition-colors">
                    <Play size={14} fill="currentColor" />
                </div>
                <span className="text-gray-600 text-sm font-medium group-hover:text-[#3e64de] transition-colors">{lesson.title}</span>
              </div>
              <div className="flex items-center">
                <Lock size={12} className="text-gray-300" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default function CourseAccordion({ curriculum }: { curriculum: Product['curriculum'] }) {
  const [openSectionId, setOpenSectionId] = useState(curriculum && curriculum.length > 0 ? 0 : null);

  const toggleSection = (id: number) => {
    setOpenSectionId(openSectionId === id ? null : id);
  };

  if (!curriculum || curriculum.length === 0) {
    return <p className="text-gray-600 p-6">Nội dung khóa học đang được cập nhật.</p>;
  }

  return (
    <div className="bg-white rounded-xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] border border-gray-200 overflow-hidden">
      {curriculum.map((section, index) => (
        <AccordionItem 
          key={index} 
          section={section} 
          isOpen={openSectionId === index} 
          onClick={() => toggleSection(index)} 
        />
      ))}
    </div>
  );
}