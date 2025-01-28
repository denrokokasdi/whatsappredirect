import React, { useEffect } from 'react';

const RedirectToWhatsApp = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "https://api.whatsapp.com/send?phone=60183943250&text=HaiSayaNak";
    }, 1); // 100ms delay before redirect
    
    return () => clearTimeout(timer); // Clean up the timer on component unmount
  }, []);
  
  return (
    <div>
      <h1>Redirecting to WhatsApp...</h1>
    </div>
  );
};

export default RedirectToWhatsApp;
