"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2, ShoppingCart, ArrowRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function MiniCart({ onClose }: { onClose: () => void }) {
  const { items, removeItem, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center h-64">
        <div className="bg-gray-100 p-4 rounded-full mb-4">
            <ShoppingCart className="h-8 w-8 text-gray-400" />
        </div>
        <p className="text-gray-500 font-medium mb-4">Giỏ hàng của bạn đang trống</p>
        <Button 
            variant="outline" 
            onClick={onClose} 
            className="text-cap-purple border-cap-purple hover:bg-cap-purple hover:text-white"
        >
            Khám phá khóa học
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full max-w-sm">
      <div className="p-4 pb-2">
        <h3 className="font-bold text-lg text-cap-dark-blue flex items-center gap-2">
            Giỏ hàng <span className="text-sm font-normal text-gray-500">({items.length} khóa học)</span>
        </h3>
      </div>
      
      <div className="flex-1 overflow-y-auto max-h-[300px] px-4">
        <div className="space-y-4 py-2">
            {items.map((item) => (
            <div key={item.id} className="flex gap-3 group relative">
                <div className="relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden bg-gray-100 border border-gray-200">
                    <Image
                        src={item.images[0]?.src || '/placeholder.svg'}
                        alt={item.name}
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <Link 
                        href={`/shop/${item.slug}`} 
                        onClick={onClose}
                        className="text-sm font-semibold text-gray-900 truncate hover:text-cap-purple transition-colors"
                    >
                        {item.name}
                    </Link>
                    <div className="flex items-center justify-between mt-1">
                        <div 
                            className="text-sm font-medium text-cap-dark-blue"
                            dangerouslySetInnerHTML={{ __html: item.price_html }} 
                        />
                        <button 
                            onClick={() => removeItem(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors p-1"
                            title="Xóa"
                        >
                            <Trash2 className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
            ))}
        </div>
      </div>

      <div className="p-4 bg-gray-50 border-t mt-auto">
        <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600 font-medium">Tổng tạm tính:</span>
            <span className="text-lg font-bold text-cap-dark-blue">
                {new Intl.NumberFormat('vi-VN').format(totalPrice)} đ
            </span>
        </div>
        <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" asChild onClick={onClose} className="w-full border-gray-300">
                <Link href="/cart">Xem giỏ hàng</Link>
            </Button>
            <Button asChild onClick={onClose} className="w-full bg-cap-purple hover:bg-cap-dark-blue text-white">
                <Link href="/checkout">
                    Thanh toán <ArrowRight className="w-3 h-3 ml-1" />
                </Link>
            </Button>
        </div>
      </div>
    </div>
  );
}