'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect all checkout requests to the unified Enquiry Cart matching the reference workflow
    router.replace('/cart');
  }, [router]);

  return (
    <div className="py-20 text-center text-slate-500 font-bold">
      Redirecting to Your Enquiry Cart...
    </div>
  );
}
