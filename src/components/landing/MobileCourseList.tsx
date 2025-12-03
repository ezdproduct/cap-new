"use client";

import { Product } from "@/lib/types";
import { motion } from "framer-motion";
import MobileCourseCard from "./MobileCourseCard";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

interface MobileCourseListProps {
  courses: Product[];
}

export default function MobileCourseList({ courses }: MobileCourseListProps) {
  if (courses.length === 0) {
    return (
      <div className="w-full text-center py-12 text-gray-500">
        Không tìm thấy khóa học nào phù hợp với tiêu chí này.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {courses.map((course, index) => (
        <motion.div
          key={course.id}
          className="h-full"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          custom={index}
          transition={{ duration: 0.4, delay: index * 0.05 }}
        >
          <MobileCourseCard product={course} />
        </motion.div>
      ))}
    </div>
  );
}