import HeroSection from '@/components/landing/HeroSection';
import CoursesSection from '@/components/landing/CoursesSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { getProducts } from '@/lib/api';
import { Suspense } from 'react';
import Loading from './loading';

export const revalidate = 60; // Revalidate trang chủ mỗi 60s

export default async function Home() {
  // Fetch dữ liệu thật từ Tutor LMS API, lấy 20 khóa học mới nhất
  const courses = await getProducts({ per_page: 20 });

  return (
    <>
      <AnimatedSection>
        <HeroSection />
      </AnimatedSection>
      
      <Suspense fallback={<Loading />}>
        <AnimatedSection>
            {/* Truyền dữ liệu xuống Component UI */}
            <CoursesSection courses={courses} />
        </AnimatedSection>
      </Suspense>

      <AnimatedSection>
        <FeaturesSection />
      </AnimatedSection>
    </>
  );
}