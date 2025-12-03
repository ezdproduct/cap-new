import { Product } from '@/lib/types';
import { Check, ArrowRight, Box } from 'lucide-react';
import CourseAccordion from './CourseAccordion';
import DOMPurify from 'isomorphic-dompurify';

export default function CourseMainContent({ product }: { product: Product }) {
  const sanitizedDescription = DOMPurify.sanitize(product.description);

  return (
    <>
      {product.requirements && product.requirements.length > 0 && (
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="w-1 h-8 bg-[#3e64de] rounded-full mr-3"></span>
            Yêu cầu khóa học:
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
            Bạn sẽ học được gì:
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
              <span key={idx} className="bg-white border border-gray-200 text-gray-600 px-3.5 py-1.5 rounded-full text-[13px] font-medium mr-2 mb-2">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mb-12 text-gray-600 leading-7 bg-white p-8 rounded-xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Giới thiệu tổng quan</h3>
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
      </div>

      <div className="mb-16">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <span className="w-1 h-8 bg-[#3e64de] rounded-full mr-3"></span>
          Nội dung khóa học
        </h3>
        <CourseAccordion curriculum={product.curriculum} />
      </div>
    </>
  );
}