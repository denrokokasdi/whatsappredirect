import React, { useEffect, useRef } from 'react';

const RedirectToWhatsApp = () => {
  const hasTracked = useRef({ viewContent: false, lead: false });

  useEffect(() => {
    const startTime = performance.now(); // Record start time

    if (window.fbq) {
      // Fire ViewContent if not fired yet
      if (!hasTracked.current.viewContent) {
        console.log('Firing ViewContent...');
        window.fbq('track', 'ViewContent');
        hasTracked.current.viewContent = true;
      }

      // Fire Lead if not fired yet
      if (!hasTracked.current.lead) {
        console.log('Firing Lead...');
        window.fbq('track', 'Lead');
        hasTracked.current.lead = true;
      }

      // Wait a short delay to ensure Pixel requests are sent
      setTimeout(() => {
        const endTime = performance.now();
        console.log(`Time taken from firing Pixel to redirect: ${Math.round(endTime - startTime)} ms`);
        window.location.href = "https://api.whatsapp.com/send?phone=601128459844&text=NakPromoLampuSolar100LED";
      }, 250); // 250ms is usually enough
    } else {
      // Fallback: Pixel not loaded, redirect immediately
      console.log('FB Pixel not loaded, redirecting immediately');
      window.location.href = "https://api.whatsapp.com/send?phone=601128459844&text=NakPromoLampuSolar100LED";
    }
  }, []);

  return (
    <div>
      <h1>Redirecting to WhatsApp...</h1>
    </div>
  );
};

export default RedirectToWhatsApp;
