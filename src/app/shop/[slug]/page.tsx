import { getProductBySlug } from '@/lib/api';
import { notFound } from 'next/navigation';
import CourseHero from '@/components/course/CourseHero';
import CoursePurchaseCard from '@/components/course/CoursePurchaseCard';
import CourseContentTabs from '@/components/course/CourseContentTabs';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    return {
      title: "Course Not Found",
      description: "The course you are looking for could not be found.",
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

export default async function ProductPage({ params }: Props) {
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