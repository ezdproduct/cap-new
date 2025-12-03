import CartSummary from '@/components/CartSummary';

export default function CartPage() {
  return (
    <div className="container mx-auto px-6 py-12 bg-gray-50/50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-cap-dark-blue">Giỏ hàng</h1>
      <CartSummary />
    </div>
  );
}