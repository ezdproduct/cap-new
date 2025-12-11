"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { mapCourseToProduct } from '@/lib/api';
import { Product } from '@/lib/types';
import ProductGrid from '@/components/ProductGrid';
import { BookOpen, CheckCircle, Award } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, isLoading }: { title: string, value: number, icon: React.ElementType, isLoading: boolean }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      {isLoading ? (
        <Skeleton className="h-8 w-12" />
      ) : (
        <div className="text-2xl font-bold">{value}</div>
      )}
    </CardContent>
  </Card>
);

export default function DashboardPage() {
  const { token } = useAuth();
  const [stats, setStats] = useState({ enrolled: 0, completed: 0 });
  const [enrolledCourses, setEnrolledCourses] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token) {
      const fetchProfileData = async () => {
        setIsLoading(true);
        try {
          const res = await fetch('/api/profile', {
            headers: { 'Authorization': `Bearer ${token}` },
          });
          if (!res.ok) throw new Error('Failed to fetch profile data');
          const data = await res.json();
          
          const mappedCourses = data.enrolled_courses.map(mapCourseToProduct);
          setEnrolledCourses(mappedCourses);
          setStats({
            enrolled: data.enrolled_courses.length,
            completed: data.completed_courses_count,
          });
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchProfileData();
    } else {
      setIsLoading(false);
    }
  }, [token]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-cap-dark-blue">Bảng điều khiển</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="Khóa học đã đăng ký" value={stats.enrolled} icon={BookOpen} isLoading={isLoading} />
        <StatCard title="Khóa học đã hoàn thành" value={stats.completed} icon={CheckCircle} isLoading={isLoading} />
        <StatCard title="Chứng chỉ" value={0} icon={Award} isLoading={isLoading} />
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4 text-cap-dark-blue">Các khóa học đang theo học</h2>
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
    </div>
  );
}