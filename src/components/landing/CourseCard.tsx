"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Clock, Star, ShoppingCart, Eye, PlayCircle, Tag } from "lucide-react";
import CourseTitle from "./CourseTitle";
import { Product } from "@/lib/types";
import { useCart } from "@/hooks/useCart";
import WishlistButton from "@/components/WishlistButton";

interface CourseCardProps {
  product: Product;
}

export default function CourseCard({ product }: CourseCardProps) {
  // Sử dụng useCart hook để đảm bảo đồng bộ hydration và lấy state items
  const { addItem, items } = useCart();

  const {
    name: title,
    level = "Mọi cấp độ",
    images,
    rating = 5,
    duration = "N/A",
    instructor = "CAP",
    price,
    discountedPrice,
    categories,
    slug,
    id
  } = product;

  // Logic kiểm tra trạng thái
  const isInCart = items.some((item) => item.id === id);
  // Giả định logic đã mua (cần tích hợp auth thực tế để check field is_purchased)
  const isPurchased = false;

  const imageUrl = images[0]?.src || '/placeholder.svg';
  const isFree = product.price === "0";
  const categoryName = categories[0]?.name || "";
  const displayPrice = discountedPrice || price;

  const productUrl = `/course/${product.slug}`;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  // Render Button Logic
  const renderActionButton = () => {
    if (isPurchased) {
      return (
        <Button
          variant="default"
          className="w-auto bg-green-600 hover:bg-green-700 text-white flex-shrink-0"
          asChild
        >
          <Link href={`https://course.learnwithcap.com/courses/${slug}`} target="_blank">
            <PlayCircle className="h-4 w-4 sm:mr-2" />
            <span>Vào học</span>
          </Link>
        </Button>
      );
    }

    if (isInCart) {
      return (
        <Button
          variant="outline"
          className="w-auto border-cap-purple bg-cap-purple text-white hover:bg-cap-dark-blue hover:text-white transition-colors flex-shrink-0"
          asChild
        >
          <Link href="/cart">
            <Eye className="h-4 w-4 sm:mr-2" />
            <span>Xem</span>
          </Link>
        </Button>
      );
    }

    return (
      <Button
        variant="outline"
        className="w-auto border-cap-purple text-cap-purple hover:bg-cap-purple hover:text-white transition-colors bg-white flex-shrink-0"
        onClick={handleAddToCart}
      >
        <ShoppingCart className="h-4 w-4 sm:mr-2" />
        <span>Thêm</span>
      </Button>
    );
  };

  return (
    <Card className="overflow-hidden border h-full flex flex-col bg-white hover:shadow-lg transition-shadow duration-300 group relative">
      {/* Image Section */}
      <div className="relative">
        <Link href={productUrl}>
          <Image
            src={imageUrl}
            alt={title}
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-48 object-cover"
            loading="lazy"
          />
        </Link>
        <div className="absolute top-3 left-3 bg-cap-purple text-white px-3 py-1 text-xs font-semibold rounded-full z-10 pointer-events-none">
          {level}
        </div>

        {/* Wishlist Button - Positioned absolutely on top of the image */}
        <div className="absolute top-3 right-3 z-20">
          <WishlistButton
            product={product}
            className="bg-white/50 backdrop-blur-sm rounded-full w-8 h-8 border-none hover:bg-white"
          />
        </div>
      </div>

      <CardContent className="p-4 pb-0 flex flex-col flex-grow">
        <div className="flex items-center mb-2 space-x-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${i < rating
                ? "text-yellow-500 fill-yellow-500"
                : "text-yellow-500"
                }`}
            />
          ))}
        </div>

        <Link href={productUrl} className="hover:underline decoration-cap-purple underline-offset-2">
          <CourseTitle title={title} />
        </Link>

        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <Clock className="h-4 w-4 mr-1.5" />
          <span>{duration}</span>
        </div>

        {/* Category only - Removed Instructor/Avatar */}
        {categoryName && (
          <div className="flex items-center text-sm text-muted-foreground mb-4">
            <Tag className="h-4 w-4 mr-1.5" />
            <span className="text-gray-600">{categoryName}</span>
          </div>
        )}

        {/* Spacer để đẩy phần giá xuống dưới cùng nếu nội dung ngắn */}
        <div className="flex-grow" />
      </CardContent>

      <div className="px-4 pb-4 pt-0 border-t-0 mt-auto">
        <div className="pt-4 border-t flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-shrink-0">
            {isFree ? (
              <p className="text-lg font-bold text-cap-dark-blue">Miễn phí</p>
            ) : (
              <>
                {discountedPrice && (
                  <p className="text-sm line-through text-muted-foreground font-normal">
                    {price}
                  </p>
                )}
                <p className="text-lg font-bold text-cap-dark-blue">
                  {displayPrice}
                </p>
              </>
            )}
          </div>

          {renderActionButton()}
        </div>
      </div>
    </Card>
  );
}