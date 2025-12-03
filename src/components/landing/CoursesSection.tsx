"use client";

import React, { useState, useMemo, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CourseCard from "./CourseCard";
import { Product } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

// Các bộ lọc này khớp chính xác với các giá trị `level` mà chúng ta đã map trong src/lib/api.ts
const filters = ["Tất cả trình độ", "Tiêu chuẩn", "Mở rộng", "Nâng cao"];

// Helper function to chunk an array into smaller arrays
function chunk<T>(array: T[], size: number): T[][] {
  const chunked_arr: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunked_arr.push(array.slice(i, i + size));
  }
  return chunked_arr;
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

interface CoursesSectionProps {
    courses: Product[];
}

export default function CoursesSection({ courses }: CoursesSectionProps) {
  const [activeFilter, setActiveFilter] = useState(filters[0]);
  const isMobile = useIsMobile();
  const tabsRef = useRef<HTMLDivElement>(null);

  const handleFilterClick = (filter: string, index: number) => {
    setActiveFilter(filter);
    
    if (tabsRef.current) {
      const container = tabsRef.current;
      const button = container.children[index] as HTMLElement;

      if (button) {
        // Tính toán vị trí để đưa button về giữa container
        // Browser sẽ tự động giới hạn scroll (không vượt quá 0 hoặc maxScroll)
        // nên tab đầu và tab cuối sẽ tự động dính vào mép thay vì ra giữa (đúng yêu cầu)
        const containerWidth = container.clientWidth;
        const buttonWidth = button.clientWidth;
        const buttonLeft = button.offsetLeft;
        
        const scrollLeft = buttonLeft - (containerWidth / 2) + (buttonWidth / 2);
        
        container.scrollTo({
          left: scrollLeft,
          behavior: "smooth",
        });
      }
    }
  };

  // Lọc dữ liệu thật từ Backend dựa trên tab đang chọn
  const filteredCourses = useMemo(() => {
    return courses.filter(
      (course) =>
        activeFilter === "Tất cả trình độ" || course.level === activeFilter
    );
  }, [courses, activeFilter]);

  // Logic hiển thị cho mobile: 1 thẻ/slide
  const mobileCourseChunks = useMemo(() => chunk(filteredCourses, 1), [filteredCourses]);

  return (
    <section id="courses" className="bg-white">
      <div className="container mx-auto px-4 md:px-8">
        {/* Filters UI - Giống 100% app mẫu */}
        <div className="flex justify-center my-8 md:my-12">
          <div 
            ref={tabsRef}
            className="flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-2 bg-gray-50 p-1.5 rounded-full overflow-x-auto max-w-full no-scrollbar" 
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {filters.map((filter, index) => (
              <button
                key={filter}
                onClick={() => handleFilterClick(filter, index)}
                className={`rounded-full px-4 py-2 text-sm md:text-base font-medium transition-all duration-200 flex-shrink-0 whitespace-nowrap ${
                  activeFilter === filter
                    ? "bg-cap-purple text-white shadow-md"
                    : "bg-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Carousel Area */}
        <div className="pb-8 md:pb-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Carousel opts={{ align: "start" }} className="w-full mx-auto">
                <CarouselContent className="-ml-2 md:-ml-4">
                  {filteredCourses.length > 0 ? (
                     isMobile ? (
                      mobileCourseChunks.map((chunk, index) => (
                        <CarouselItem key={index} className="basis-full pl-2 md:pl-4">
                          <div className="space-y-4">
                            {chunk.map((course) => (
                               <motion.div key={course.id} className="p-1 h-full" variants={itemVariants} initial="hidden" animate="visible">
                                 <CourseCard product={course} />
                               </motion.div>
                            ))}
                          </div>
                        </CarouselItem>
                      ))
                    ) : (
                      filteredCourses.map((course, index) => (
                        <CarouselItem
                          key={course.id}
                          className="basis-1/2 lg:basis-1/3 xl:basis-1/4 pl-2 md:pl-4"
                        >
                          <motion.div 
                            className="p-1 h-full" 
                            variants={itemVariants} 
                            initial="hidden" 
                            animate="visible"
                            custom={index}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                          >
                            <CourseCard product={course} />
                          </motion.div>
                        </CarouselItem>
                      ))
                    )
                  ) : (
                      <div className="w-full text-center py-12 text-gray-500 col-span-full">
                          Không tìm thấy khóa học nào phù hợp với tiêu chí này.
                      </div>
                  )}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex -left-12 bg-white border border-gray-200 shadow-sm hover:bg-gray-50 text-gray-800 h-10 w-10" />
                <CarouselNext className="hidden md:flex -right-12 bg-white border border-gray-200 shadow-sm hover:bg-gray-50 text-gray-800 h-10 w-10" />
              </Carousel>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}