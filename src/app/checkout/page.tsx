import CheckoutForm from '@/components/CheckoutForm';
import { getPaymentGateways } from '@/lib/api';

export default async function CheckoutPage() {
  const paymentGateways = await getPaymentGateways();

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
      <CheckoutForm paymentGateways={paymentGateways} />
    </div>
  );
}