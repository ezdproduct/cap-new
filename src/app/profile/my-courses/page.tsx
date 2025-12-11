"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import ProductGrid from '@/components/ProductGrid';
import { Skeleton } from '@/components/ui/skeleton';
import { mapCourseToProduct } from '@/lib/api';
import { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { LogIn } from 'lucide-react';

const AuthRequiredMessage = () => (
    <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50">
        <LogIn className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-xl font-bold text-cap-dark-blue mb-2">Yêu cầu đăng nhập</h3>
        <p className="text-gray-500 mb-6">Vui lòng đăng nhập để xem các khóa học của bạn.</p>
        <Button asChild className="bg-cap-purple hover:bg-cap-dark-blue">
            <Link href="/login">Đăng nhập ngay</Link>
        </Button>
    </div>
);

export default function MyCoursesPage() {
  const { token, isAuthenticated } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      if (isAuthenticated && token) {
        setIsLoading(true);
        try {
          const res = await fetch('/api/profile', {
            headers: { 'Authorization': `Bearer ${token}` },
          });
          if (!res.ok) throw new Error('Failed to fetch courses');
          const data = await res.json();
          const mappedCourses = data.enrolled_courses.map(mapCourseToProduct);
          setEnrolledCourses(mappedCourses);
        } catch (error: any) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };
    
    fetchEnrolledCourses();
  }, [token, isAuthenticated]);

  if (!isAuthenticated && !isLoading) {
      return <AuthRequiredMessage />;
  }

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