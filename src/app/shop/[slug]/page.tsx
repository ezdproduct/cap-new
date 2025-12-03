import { getProductBySlug } from '@/lib/api';
import { notFound } from 'next/navigation';
import CourseHero from '@/components/course/CourseHero';
import CoursePurchaseCard from '@/components/course/CoursePurchaseCard';
import CourseContentTabs from '@/components/course/CourseContentTabs';

export const dynamic = 'force-dynamic';

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-gray-50/50">
      <CourseHero product={product} />
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <CourseContentTabs product={product} />
          </div>

          {/* Sidebar */}
          <div className="relative mt-8 lg:mt-0">
            <div className="lg:sticky lg:top-24">
              <CoursePurchaseCard product={product} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}