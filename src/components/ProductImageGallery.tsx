"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ProductImageGalleryProps {
  images: {
    id: number;
    src: string;
    alt: string;
  }[];
}

export default function ProductImageGallery({ images }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-video w-full bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
        No Image
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-gray-100 border border-gray-200 shadow-sm">
        <Image
          src={selectedImage?.src || '/placeholder.svg'}
          alt={selectedImage?.alt || 'Product image'}
          fill
          className="object-cover"
          priority
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-4 overflow-x-auto pb-2">
          {images.map((image) => (
            <button
              key={image.id}
              onClick={() => setSelectedImage(image)}
              className={cn(
                "relative aspect-square w-20 flex-shrink-0 overflow-hidden rounded-md border bg-gray-100",
                selectedImage.id === image.id ? "ring-2 ring-cap-purple border-cap-purple" : "hover:opacity-75 border-transparent"
              )}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}