import React from 'react';
import { cn } from '@/lib/utils';

interface CourseTitleProps {
  title: string;
  className?: string;
}

const CourseTitle: React.FC<CourseTitleProps> = ({ title, className }) => {
  return (
    <h3
      className={cn(
        "text-lg font-bold mb-2 text-cap-dark-blue transition-colors",
        "overflow-hidden text-ellipsis",
        "group-hover:text-cap-purple",
        // Giới hạn 2 dòng mặc định
        "line-clamp-2",
        // Khi hover, loại bỏ giới hạn dòng
        "group-hover:line-clamp-none",
        // Đặt chiều cao cố định tương đương 2 dòng để căn chỉnh
        "h-14",
        className
      )}
    >
      {title}
    </h3>
  );
};

export default CourseTitle;