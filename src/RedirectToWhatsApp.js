import React, { useEffect, useRef } from 'react';

const RedirectToWhatsApp = () => {
  const hasTracked = useRef({ viewContent: false, lead: false });

  useEffect(() => {
    // Redirect after 100ms
    const timer = setTimeout(() => {
      window.location.href = "https://api.whatsapp.com/send?phone=601128459844&text=NakPromoLampuSolar100LED";
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (window.fbq) {
      // Track ViewContent once
      if (!hasTracked.current.viewContent) {
        console.log('Tracking ViewContent');
        window.fbq('track', 'ViewContent');
        hasTracked.current.viewContent = true;
      }

      // Track Lead once
      if (!hasTracked.current.lead) {
        console.log('Tracking Lead');
        window.fbq('track', 'Lead');
        hasTracked.current.lead = true;
      }
    }
  }, []);

  return (
    <div>
      <h1>Redirecting to WhatsApp...</h1>
    </div>
  );
};

export default RedirectToWhatsApp;
