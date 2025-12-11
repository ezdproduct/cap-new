import { getProductBySlug, getRelatedProducts } from '@/lib/api';
import { notFound } from 'next/navigation';
import CourseHero from '@/components/course/CourseHero';
import CoursePurchaseCard from '@/components/course/CoursePurchaseCard';
import CourseMainContent from '@/components/course/CourseMainContent';
import RelatedCourses from '@/components/course/RelatedCourses';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Không tìm thấy khóa học',
      description: 'Khóa học bạn đang tìm kiếm không tồn tại.',
    };
  }

  const sanitizedDescription = product.short_description.replace(/<[^>]*>?/gm, '');

  return {
    title: `${product.name} - CAP English`,
    description: sanitizedDescription,
    openGraph: {
      title: product.name,
      description: sanitizedDescription,
      images: [
        {
          url: product.images[0]?.src || 'https://learnwithcap.com/wp-content/uploads/2025/06/cap-logo-1.png',
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
      locale: 'vi_VN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: sanitizedDescription,
      images: [product.images[0]?.src || 'https://learnwithcap.com/wp-content/uploads/2025/06/cap-logo-1.png'],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product);

  return (
    <div className="bg-[#f9fafb]">
      <CourseHero product={product} />
      
      <div className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 relative">
          
          {/* Left Content Column */}
          <div className="lg:col-span-8 pt-12">
            <CourseMainContent product={product} />
          </div>

          {/* Right Sidebar Column - Floating Overlap */}
          <div className="lg:col-span-4 relative z-20 lg:-mt-[220px]">
            <CoursePurchaseCard product={product} />
          </div>

        </div>
      </div>
      
      <RelatedCourses products={relatedProducts} />
    </div>
  );
}