import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

/**
 * Checkout page for touchmark-nano-gcc, alongside the existing dosmembership
 * one (Checkout.tsx). Kept as its own component/route rather than a branch
 * inside Checkout.tsx, mirroring the dosmembership pattern: one dedicated
 * page per product, each hardcoded to its own domain and webhook.
 *
 * Talks to /api/razorpay/create-order-nanogcc (not create-order.ts), and to
 * nanogcc's own completion webhook, which - unlike dosmembership's - requires
 * `ref` and `razorpay_order_id` and trusts nothing else in the body beyond
 * the signature. See ORIGINBI-INTEGRATION.md in the nanogcc repo.
 */

// TODO: update once the production domain is finalised - see SITE_URL in
// nanogcc's src/lib/env.ts, which this must match exactly.
const NANOGCC_PROD_ORIGIN = 'https://touchmark-nano-gcc.vercel.app';
const NANOGCC_LOCAL_ORIGIN = 'http://localhost:3100';

const loadScript = (src: string) => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

function nanogccOrigin() {
  return window.location.hostname === 'localhost' ? NANOGCC_LOCAL_ORIGIN : NANOGCC_PROD_ORIGIN;
}

export default function CheckoutNanogcc() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [status, setStatus] = useState('initializing');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const initPayment = async () => {
      if (!token) {
        setStatus('error');
        setErrorMessage('No payment token provided.');
        return;
      }

      const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
      if (!res) {
        setStatus('error');
        setErrorMessage('Razorpay SDK failed to load. Please check your connection.');
        return;
      }

      try {
        const orderResponse = await fetch('/api/razorpay/create-order-nanogcc', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });

        const orderData = await orderResponse.json();

        if (!orderResponse.ok) {
          setStatus('error');
          const errMsg = orderData.error + (orderData.details ? `: ${orderData.details}` : '');
          setErrorMessage(errMsg || 'Failed to create Razorpay order.');
          return;
        }

        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: orderData.amount,        // already paise, from create-order-nanogcc
          currency: orderData.currency,
          name: 'DOS Club - Institution Membership',
          description: 'Nano GCC institution membership payment',
          order_id: orderData.orderId,
          handler: async function (response: any) {
            setStatus('success');

            const webhookUrl = `${nanogccOrigin()}/api/webhooks/originbi`;
            const returnUrl = `${nanogccOrigin()}/membership/return/?ref=${encodeURIComponent(orderData.ref)}&payment=success`;

            const completion = {
              ref: orderData.ref,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            };

            // Retry the fast-path notification a couple of times on a flaky
            // connection, then redirect anyway - nanogcc's server-side
            // Razorpay webhook is the actual guarantee, not this POST.
            let redirectTo = returnUrl;
            let attempts = 0;
            while (attempts < 2) {
              attempts++;
              try {
                const webhookResponse = await fetch(webhookUrl, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(completion),
                });

                if (webhookResponse.ok) {
                  const data = await webhookResponse.json();
                  if (data.redirect) redirectTo = data.redirect;
                  break;
                }

                // 401/404 mean the payment itself cannot be recorded this
                // way - do not keep retrying, but still send the buyer home;
                // the Razorpay webhook will settle it, or support can look it
                // up by `ref`.
                if (webhookResponse.status === 401 || webhookResponse.status === 404) break;
              } catch {
                // Network error - fall through to retry.
              }
            }

            window.location.href = redirectTo;
          },
          prefill: {
            name: orderData.name,
            email: orderData.email,
            contact: orderData.phone,
          },
          theme: {
            color: '#07a97b',
          },
          modal: {
            ondismiss: function () {
              setStatus('cancelled');
            },
          },
        };

        const rzp1 = new (window as any).Razorpay(options);

        rzp1.on('payment.failed', function (response: any) {
          console.error(response.error);
          setStatus('error');
          setErrorMessage(response.error.description || 'Payment failed.');
        });

        setStatus('processing');
        rzp1.open();
      } catch (err) {
        console.error('Payment initialization error:', err);
        setStatus('error');
        setErrorMessage('An unexpected error occurred.');
      }
    };

    initPayment();
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        {status === 'initializing' && (
          <div>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <h2 className="text-xl font-bold text-gray-800">Initializing Secure Checkout...</h2>
            <p className="text-gray-500 mt-2">Please wait while we connect to Razorpay.</p>
          </div>
        )}

        {status === 'processing' && (
          <div>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <h2 className="text-xl font-bold text-gray-800">Processing Payment...</h2>
            <p className="text-gray-500 mt-2">Please complete the payment in the popup window.</p>
          </div>
        )}

        {status === 'success' && (
          <div>
            <div className="h-16 w-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Payment Successful!</h2>
            <p className="text-gray-500 mt-2">Redirecting you back...</p>
          </div>
        )}

        {status === 'error' && (
          <div>
            <div className="h-16 w-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800">Payment Failed</h2>
            <p className="text-red-500 mt-2">{errorMessage}</p>
            <button
              onClick={() => window.history.back()}
              className="mt-6 w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors"
            >
              Go Back
            </button>
          </div>
        )}

        {status === 'cancelled' && (
          <div>
            <div className="h-16 w-16 bg-yellow-100 text-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800">Payment Cancelled</h2>
            <p className="text-gray-500 mt-2">You cancelled the payment process.</p>
            <button
              onClick={() => { window.location.href = nanogccOrigin(); }}
              className="mt-6 w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Return to Website
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
