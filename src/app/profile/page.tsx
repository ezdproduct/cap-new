"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { mapCourseToProduct } from '@/lib/api';
import { Product } from '@/lib/types';
import ProductGrid from '@/components/ProductGrid';
import { BookOpen, CheckCircle, Award, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

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

const AuthRequiredMessage = () => (
  <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50">
    <LogIn className="mx-auto h-12 w-12 text-gray-400 mb-4" />
    <h3 className="text-xl font-bold text-cap-dark-blue mb-2">Yêu cầu đăng nhập</h3>
    <p className="text-gray-500 mb-6">Vui lòng đăng nhập để xem thông tin cá nhân của bạn.</p>
    <Button asChild className="bg-cap-purple hover:bg-cap-dark-blue">
      <Link href="/login">Đăng nhập ngay</Link>
    </Button>
  </div>
);

export default function DashboardPage() {
  const { token, isAuthenticated } = useAuth();
  const [stats, setStats] = useState({ enrolled: 0, completed: 0 });
  const [enrolledCourses, setEnrolledCourses] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated && token) {
      const fetchProfileData = async () => {
        setIsLoading(true);
        try {
          const res = await fetch('/api/profile', {
            headers: { 'Authorization': `Bearer ${token}` },
          });

          if (res.status === 401) {
            // Token expired or invalid
            // We need to import logout, usually from hooks
            // But hooks can't be used inside useEffect callback easily if not destructured
            window.location.href = '/login'; // Simple fallback or use router
            // Ideally use logout() from useAuth if stable
            throw new Error('Unauthorized');
          }

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
          if ((error as Error).message === 'Unauthorized') {
            // Let the effect/hook re-run or handle logout
            // Since we can't easily call logout() here without adding it to deps and maybe causing loops
            // We can rely on the fact that if we redirect to login, user handles it. 
            // Better: update useAuth to handle this or just force reload.
            localStorage.removeItem('auth-storage'); // Force clear for now
            window.location.href = '/login';
          }
        } finally {
          setIsLoading(false);
        }
      };
      fetchProfileData();
    } else {
      setIsLoading(false);
    }
  }, [token, isAuthenticated]);

  if (!isAuthenticated && !isLoading) {
    return <AuthRequiredMessage />;
  }

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