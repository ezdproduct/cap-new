"use client";

import { Product } from '@/lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Star, Check, PlayCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import DOMPurify from 'isomorphic-dompurify';

const CourseContentTabs = ({ product }: { product: Product }) => {
  const sanitizedDescription = DOMPurify.sanitize(product.description);

  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto mb-6 bg-gray-100 p-1.5 rounded-full">
        <TabsTrigger value="overview" className="py-2 text-base">Tổng quan</TabsTrigger>
        <TabsTrigger value="curriculum" className="py-2 text-base">Nội dung</TabsTrigger>
        <TabsTrigger value="instructor" className="py-2 text-base">Giảng viên</TabsTrigger>
        <TabsTrigger value="reviews" className="py-2 text-base">Đánh giá</TabsTrigger>
      </TabsList>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 min-h-[300px]">
        <TabsContent value="overview">
          {product.benefits && product.benefits.length > 0 && (
            <div className="border rounded-2xl p-6 mb-8 bg-gray-50/50">
              <h3 className="text-2xl font-bold mb-4 text-cap-dark-blue">Bạn sẽ học được gì?</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-gray-700">
                {product.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <h3 className="text-2xl font-bold mb-4 text-cap-dark-blue">Mô tả khóa học</h3>
          <div
            className="prose max-w-none text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
          />

          {product.requirements && product.requirements.length > 0 && (
            <div className="mt-8">
              <h3 className="text-2xl font-bold mb-4 text-cap-dark-blue">Yêu cầu</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {product.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
          )}
        </TabsContent>

        <TabsContent value="curriculum">
          <h3 className="text-2xl font-bold mb-4 text-cap-dark-blue">Nội dung khóa học</h3>
          {product.curriculum && product.curriculum.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {product.curriculum.map((topic, index) => (
                <AccordionItem value={`item-${index}`} key={index} className="border-b">
                  <AccordionTrigger className="text-left hover:no-underline">
                    <span className="font-bold text-base">{topic.title}</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-3 pt-2">
                      {topic.lessons.map((lesson, lessonIndex) => (
                        <li key={lessonIndex} className="flex items-center gap-3 text-gray-700">
                          <PlayCircle className="h-5 w-5 text-gray-400 flex-shrink-0" />
                          <span>{lesson.title}</span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <p className="text-gray-600">
              Nội dung chi tiết của khóa học sẽ được hiển thị tại đây. Hiện tại, bạn có thể xem mô tả tổng quan trong tab "Tổng quan".
            </p>
          )}
        </TabsContent>

        <TabsContent value="instructor">
          <h3 className="text-2xl font-bold mb-4 text-cap-dark-blue">Về giảng viên</h3>
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="text-3xl">{product.instructor?.charAt(0) || 'C'}</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="text-xl font-bold">{product.instructor}</h4>
              <p className="text-gray-500">Chuyên gia đào tạo Tiếng Anh Doanh nghiệp</p>
            </div>
          </div>
          <p className="mt-4 text-gray-700 leading-relaxed">
            Với nhiều năm kinh nghiệm giảng dạy và làm việc trong môi trường quốc tế, {product.instructor} mang đến những bài học thực tế, tập trung vào kỹ năng ứng dụng ngay vào công việc hàng ngày, giúp học viên tự tin giao tiếp và phát triển sự nghiệp.
          </p>
        </TabsContent>

        <TabsContent value="reviews">
          <h3 className="text-2xl font-bold mb-4 text-cap-dark-blue">Đánh giá từ học viên</h3>
          <div className="flex items-center gap-4 border-b pb-4 mb-4">
            <div className="text-center">
              <p className="text-5xl font-bold text-cap-dark-blue">{product.rating?.toFixed(1) || '5.0'}</p>
              <div className="flex justify-center mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < (product.rating || 5) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
                ))}
              </div>
            </div>
            <p className="text-gray-600">Dựa trên các đánh giá đã được xác thực.</p>
          </div>
          <p className="text-gray-600">Chưa có đánh giá chi tiết nào cho khóa học này.</p>
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default CourseContentTabs;