import React, { useEffect, useRef } from 'react';
import { FaWhatsapp } from 'react-icons/fa'; // npm install react-icons

const WhatsAppRedirect = () => {
  const hasTracked = useRef({ viewContent: false, lead: false });

  useEffect(() => {
    // Fire ViewContent on page load
    if (window.fbq && !hasTracked.current.viewContent) {
      console.log('Firing ViewContent on page load');
      window.fbq('track', 'ViewContent');
      hasTracked.current.viewContent = true;
    }
  }, []);

  const handleClick = () => {
    const startTime = performance.now();

    if (window.fbq && !hasTracked.current.lead) {
      console.log('Firing Lead on button click...');
      window.fbq('track', 'Lead');
      hasTracked.current.lead = true;
    }

    // Wait a short delay to ensure Pixel request is sent
    setTimeout(() => {
      const endTime = performance.now();
      console.log(`Time taken from firing Lead to redirect: ${Math.round(endTime - startTime)} ms`);
      window.location.href = "https://api.whatsapp.com/send?phone=601128459844&text=NakPromoLampuSolar100LED";
    }, 250); // 250ms delay
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Get Your Promo Lampu Solar 100LED</h1>
      <button
        onClick={handleClick}
        style={{
          backgroundColor: '#25D366',
          color: 'white',
          padding: '15px 25px',
          border: 'none',
          borderRadius: '8px',
          fontSize: '18px',
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          gap: '10px',
        }}
      >
        <FaWhatsapp size={24} />
        WhatsApp Here
      </button>
    </div>
  );
};

export default WhatsAppRedirect;
