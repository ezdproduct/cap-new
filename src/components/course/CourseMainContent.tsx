"use client";

import { useState } from 'react';
import { Product } from '@/lib/types';
import { Check, ChevronDown, Play, FolderOpen, Box, ArrowRight } from 'lucide-react';
import DOMPurify from 'isomorphic-dompurify';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const CourseMainContent = ({ product }: { product: Product }) => {
  const sanitizedDescription = DOMPurify.sanitize(product.description);
  const hasVisibleDescription = sanitizedDescription.replace(/<[^>]*>?/gm, '').trim().length > 0;

  // Determine the default open item (first topic)
  const defaultOpenValue = product.curriculum?.[0]?.title || undefined;

  return (
    <div>
      {product.requirements && product.requirements.length > 0 && (
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="w-1 h-8 bg-[#3e64de] rounded-full mr-3"></span>
            Yêu cầu khóa học
          </h3>
          <div className="bg-white p-6 rounded-xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] border border-gray-100">
            <ul className="space-y-3 text-gray-600">
              {product.requirements.map((req, index) => (
                <li key={index} className="flex items-start">
                  <span className="bg-blue-50 text-[#3e64de] rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 shrink-0">
                    <Check size={12} />
                  </span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {product.benefits && product.benefits.length > 0 && (
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="w-1 h-8 bg-[#3e64de] rounded-full mr-3"></span>
            Lợi ích khóa học
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {product.benefits.map((benefit, index) => (
              <div key={index} className="flex p-4 bg-white rounded-xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] border border-gray-100 hover:shadow-md transition-shadow">
                <Check size={18} className="text-[#10B981] mt-1 mr-4 shrink-0" />
                <span className="text-gray-600 text-sm font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {product.tags && product.tags.length > 0 && (
        <div className="mb-12">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Từ khóa phổ biến:</h3>
          <div className="flex flex-wrap">
            {product.tags.map((tag, idx) => (
              <a key={idx} href="#" className="bg-white border border-gray-200 text-gray-600 px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-all duration-200 mr-2 mb-2 hover:border-[#3e64de] hover:text-[#3e64de] hover:bg-blue-50 hover:-translate-y-px hover:shadow-sm">
                {tag}
              </a>
            ))}
          </div>
        </div>
      )}

      {hasVisibleDescription && (
        <div className="mb-12 text-gray-600 leading-7 bg-white p-8 rounded-xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Giới thiệu tổng quan</h3>
          <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
        </div>
      )}

      {product.curriculum && product.curriculum.length > 0 && (
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="w-1 h-8 bg-[#3e64de] rounded-full mr-3"></span>
            Nội dung khóa học
          </h3>
          <Accordion 
            type="single" 
            collapsible 
            defaultValue={defaultOpenValue}
            className="bg-white rounded-xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] border border-gray-200 overflow-hidden"
          >
            {product.curriculum.map((topic) => {
              const totalLessons = topic.lessons.length;
              const meta = `${totalLessons} bài học`;
              const value = topic.title; // Use title as the unique value

              return (
                <AccordionItem key={value} value={value} className="border-b border-gray-100 last:border-0">
                  <AccordionTrigger className="group w-full flex justify-between items-center px-6 py-5 text-left hover:no-underline transition duration-200 bg-gray-50 hover:bg-gray-100 data-[state=open]:bg-gray-100">
                    <div className="flex items-center">
                      <span className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center mr-4 shadow-sm bg-white text-gray-500 transition-colors group-hover:text-[#3e64de] data-[state=open]:bg-blue-50 data-[state=open]:text-[#3e64de]">
                        <FolderOpen size={14} />
                      </span>
                      <div>
                        <span className="font-bold text-gray-800 block text-sm sm:text-base">{topic.title}</span>
                        <span className="text-xs text-gray-500 font-normal">{meta}</span>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="py-0">
                    <ul className="py-2 bg-white">
                      {topic.lessons.map((lesson: any, idx: number) => (
                        <li key={idx} className="flex justify-between items-center px-6 py-3 hover:bg-blue-50/50 transition-colors cursor-pointer group">
                          <div className="flex items-center">
                            <div className="mr-4 text-gray-400 group-hover:text-[#3e64de] transition-colors">
                                <Play size={14} fill="currentColor" />
                            </div>
                            <span className="text-gray-600 text-sm font-medium group-hover:text-[#3e64de] transition-colors">{lesson.title}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      )}
    </div>
  );
};

export default CourseMainContent;