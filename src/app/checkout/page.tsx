import type { Metadata } from 'next';
import { CheckoutForm } from '@/components/forms/CheckoutForm';

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'Complete your Pegasus order — secure, fast, and simple.',
};

export default function CheckoutPage() {
  return (
    <div className="container-px pb-24 pt-36 md:pt-44">
      <h1 className="heading-lg mb-12 text-gradient">Checkout</h1>
      <CheckoutForm />
    </div>
  );
}
