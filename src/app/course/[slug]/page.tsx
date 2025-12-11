"use server";

import { getProductBySlug, getRelatedProducts } from "@/lib/api";
import { notFound } from "next/navigation";
import CourseDetailClient from "@/components/course/CourseDetailClient";
import type { Metadata } from 'next';

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
            type: 'website',
        },
    };
}

export default async function CoursePage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    const relatedProducts = await getRelatedProducts(product);

    return <CourseDetailClient course={product} relatedCourses={relatedProducts} />;
}
