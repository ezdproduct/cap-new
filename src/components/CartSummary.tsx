"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, ArrowRight, ShoppingCart } from 'lucide-react';

export default function CartSummary() {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mb-6 flex justify-center">
            <div className="h-24 w-24 bg-gray-100 rounded-full flex items-center justify-center">
                <ShoppingCart className="h-12 w-12 text-gray-400" />
            </div>
        </div>
        <h2 className="text-2xl font-bold text-cap-dark-blue mb-2">Giỏ hàng của bạn đang trống</h2>
        <p className="text-gray-600 mb-8">Hãy khám phá các khóa học và bắt đầu hành trình học tập ngay hôm nay.</p>
        <Button asChild className="bg-cap-purple hover:bg-cap-dark-blue text-white px-8">
          <Link href="/shop">Khám phá khóa học</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <div className="flex items-center justify-between mb-6">
             <h2 className="text-xl font-bold text-cap-dark-blue">Danh sách khóa học ({totalItems})</h2>
             <Button variant="link" asChild className="text-cap-purple p-0 h-auto">
                <Link href="/shop">Tiếp tục xem khóa học</Link>
             </Button>
        </div>
        
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between border rounded-xl p-4 bg-white shadow-sm gap-4">
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="relative h-20 w-20 sm:h-24 sm:w-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={item.images[0]?.src || '/placeholder.svg'}
                    alt={item.name}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div>
                  <Link href={`/shop/${item.slug}`} className="font-bold text-cap-dark-blue hover:text-cap-purple transition-colors line-clamp-2 mb-1">
                    {item.name}
                  </Link>
                  <div
                    className="text-sm font-medium text-gray-900"
                    dangerouslySetInnerHTML={{ __html: item.price_html }}
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                 {/* Quantity for courses is usually just 1, but keeping logic just in case */}
                 <div className="hidden">
                    <Input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    className="w-16 text-center h-9"
                    />
                 </div>
                
                <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  <span className="sm:hidden">Xóa</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="md:col-span-1">
        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 sticky top-24">
          <h2 className="text-lg font-bold text-cap-dark-blue mb-4 border-b pb-4">Tổng cộng</h2>
          <div className="flex justify-between mb-2 text-gray-600">
            <span>Tạm tính</span>
            <span>{new Intl.NumberFormat('vi-VN').format(totalPrice)} đ</span>
          </div>
          <div className="flex justify-between mb-4 text-gray-600">
            <span>Giảm giá</span>
            <span>0 đ</span>
          </div>
          <div className="border-t pt-4 flex justify-between font-bold text-xl text-cap-dark-blue mb-6">
            <span>Thành tiền</span>
            <span>{new Intl.NumberFormat('vi-VN').format(totalPrice)} đ</span>
          </div>
          <Button asChild className="w-full bg-cap-purple hover:bg-cap-dark-blue text-white h-12 text-lg font-semibold shadow-md transition-all hover:shadow-lg">
            <Link href="/checkout" className="flex items-center justify-center">
                Thanh toán ngay <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <p className="text-xs text-center text-gray-500 mt-4">
             Bảo mật thanh toán 100%
          </p>
        </div>
      </div>
    </div>
  );
}