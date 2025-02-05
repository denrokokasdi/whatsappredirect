import React, { useEffect } from 'react';

const RedirectToWhatsApp = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "https://api.whatsapp.com/send?phone=601128459844&text=PMPromoLampuSolarDinding";
    }, 1); // 100ms delay before redirect
    
    return () => clearTimeout(timer); // Clean up the timer on component unmount
  }, []);
  
  return (
    <div>
      <h1>Promosi Untuk Anda Harini dari ProjekHome Malaysia, Redirect ke Whatsapp...</h1>
    </div>
  );
};

export default RedirectToWhatsApp;
