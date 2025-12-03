import { getProductBySlug } from '@/lib/api';
import { notFound } from 'next/navigation';
import CourseHero from '@/components/course/CourseHero';
import CoursePurchaseCard from '@/components/course/CoursePurchaseCard';
import CourseMainContent from '@/components/course/CourseMainContent';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

type PageProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    return {
      title: 'Course Not Found',
      description: 'The course you are looking for could not be found.',
    };
  }

  return {
    title: `${product.name} - CAP English`,
    description: product.short_description,
    openGraph: {
      title: product.name,
      description: product.short_description,
      images: [
        {
          url: product.images[0]?.src || '',
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductPage({
  params,
}: PageProps) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-gray-50/50">
      <CourseHero product={product} />
      
      <div className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 relative">
          
          {/* Left Content Column */}
          <div className="lg:col-span-8 pt-12">
            <CourseMainContent product={product} />
          </div>

          {/* Right Sidebar Column - Floating Overlap */}
          <div className="lg:col-span-4 relative z-20 lg:-mt-[120px]">
            <CoursePurchaseCard product={product} />
          </div>

        </div>
      </div>
    </div>
  );
}