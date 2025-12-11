"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import { Loader2, Lock, CreditCard } from "lucide-react";
import { PaymentGateway } from "@/lib/types";
import { useAuthStore } from "@/store/auth";

interface CheckoutFormProps {
  paymentGateways: PaymentGateway[];
}

export default function CheckoutForm({ paymentGateways }: CheckoutFormProps) {
  const { items, totalPrice, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    paymentGateways.length > 0 ? paymentGateways[0].id : ''
  );
  const router = useRouter();
  const setToken = useAuthStore((state) => state.setToken);

  if (items.length === 0 && !isLoading) {
    return (
      <div className="text-center py-12">
        <p className="text-xl mb-4 text-gray-600">Giỏ hàng của bạn đang trống.</p>
        <Button asChild className="bg-cap-purple hover:bg-cap-dark-blue text-white">
          <Link href="/shop">Quay lại cửa hàng</Link>
        </Button>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (!selectedPaymentMethod) {
      toast.error("Vui lòng chọn phương thức thanh toán.");
      setIsLoading(false);
      return;
    }

    const formData = new FormData(e.currentTarget);
    const billingDetails = Object.fromEntries(formData.entries());
    const selectedGateway = paymentGateways.find(g => g.id === selectedPaymentMethod);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          billingDetails,
          items,
          paymentMethodId: selectedPaymentMethod,
          paymentMethodTitle: selectedGateway?.title || '',
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong');
      }

      // Check for token and auto-login
      if (result.token) {
        setToken(result.token);
        toast.success('Đặt hàng thành công! Một tài khoản đã được tạo và bạn đã tự động đăng nhập.');
        clearCart();
        router.push('/profile');
        return;
      } else {
        toast.success('Đặt hàng thành công!');
      }

      clearCart();
      router.push(`/order-success?order_id=${result.order.id}`);

    } catch (error: any) {
      toast.error(error.message || 'Đặt hàng thất bại. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
            <h2 className="text-xl font-bold mb-6 text-cap-dark-blue flex items-center">
              Thông tin thanh toán
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">Tên</Label>
                  <Input id="firstName" name="firstName" placeholder="Nhập tên" required disabled={isLoading} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="lastName">Họ</Label>
                  <Input id="lastName" name="lastName" placeholder="Nhập họ" required disabled={isLoading} className="mt-1" />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="email@example.com" required disabled={isLoading} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="phone">Số điện thoại</Label>
                <Input id="phone" name="phone" type="tel" placeholder="090xxxxxxx" disabled={isLoading} className="mt-1" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <h2 className="text-xl font-bold mb-4 text-cap-dark-blue">Đơn hàng của bạn</h2>
            <div className="space-y-3 mb-4">
              {items.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-700"><span className="font-medium">{item.name}</span> x {item.quantity}</span>
                  <span className="font-medium text-gray-900">{new Intl.NumberFormat('vi-VN').format(parseFloat(item.price) * item.quantity)} đ</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-4 flex justify-between font-bold text-lg text-cap-dark-blue">
              <span>Tổng cộng</span>
              <span>{new Intl.NumberFormat('vi-VN').format(totalPrice)} đ</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold mb-4 text-cap-dark-blue flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Phương thức thanh toán
            </h3>
            <div className="space-y-3">
              {paymentGateways.length > 0 ? (
                paymentGateways.map((gateway) => (
                  <div key={gateway.id} className={`flex items-start p-4 border rounded-xl cursor-pointer transition-all ${selectedPaymentMethod === gateway.id ? 'border-cap-purple bg-purple-50 ring-1 ring-cap-purple' : 'border-gray-200 hover:border-gray-300'}`}>
                    <input
                      id={gateway.id}
                      type="radio"
                      name="paymentMethod"
                      value={gateway.id}
                      checked={selectedPaymentMethod === gateway.id}
                      onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                      className="mt-1 h-4 w-4 text-cap-purple border-gray-300 focus:ring-cap-purple"
                      disabled={isLoading}
                    />
                    <Label htmlFor={gateway.id} className="ml-3 block cursor-pointer w-full">
                      <span className="block text-base font-medium text-gray-900">{gateway.title}</span>
                      {gateway.description && (
                        <div className="text-sm text-gray-500 mt-1 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: gateway.description }} />
                      )}
                    </Label>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">Không có phương thức thanh toán khả dụng.</p>
              )}
            </div>

            <Button type="submit" className="w-full mt-6 bg-cap-purple hover:bg-cap-dark-blue text-white h-12 text-lg font-semibold" size="lg" disabled={isLoading || paymentGateways.length === 0}>
              {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Lock className="mr-2 h-4 w-4" />}
              Đặt hàng ngay
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}