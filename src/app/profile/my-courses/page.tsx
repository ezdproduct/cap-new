"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import ProductGrid from '@/components/ProductGrid';
import { Skeleton } from '@/components/ui/skeleton';
import { mapCourseToProduct } from '@/lib/api';
import { Product } from '@/lib/types';

export default function MyCoursesPage() {
  const { token } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token) {
      const fetchEnrolledCourses = async () => {
        setIsLoading(true);
        try {
          const res = await fetch('/api/profile', {
            headers: { 'Authorization': `Bearer ${token}` },
          });
          if (!res.ok) throw new Error('Failed to fetch courses');
          const data = await res.json();
          const mappedCourses = data.enrolled_courses.map(mapCourseToProduct);
          setEnrolledCourses(mappedCourses);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchEnrolledCourses();
    } else {
      setIsLoading(false);
    }
  }, [token]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-cap-dark-blue">Khóa học của tôi</h1>
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-96 rounded-lg" />)}
        </div>
      ) : enrolledCourses.length > 0 ? (
        <ProductGrid products={enrolledCourses} />
      ) : (
        <p className="text-gray-500">Bạn chưa đăng ký khóa học nào.</p>
      )}
    </div>
  );
}