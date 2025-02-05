import React, { useEffect, useRef } from 'react';


const RedirectToWhatsApp = () => {
  const hasTracked = useRef(false); // Flag to check if the event has been tracked


  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "https://api.whatsapp.com/send?phone=60183943250&text=HaiSayaNak";
    }, 100); // 100ms delay before redirect
    
    return () => clearTimeout(timer); // Clean up the timer on component unmount
  }, []);

  useEffect(() => {
    if (window.fbq && !hasTracked.current) {
      console.log('Tracking ViewContent');
      window.fbq('track', 'ViewContent'); // Fire the event once
      hasTracked.current = true; // Set the flag to true after firing the event
    }
  }, []); // Fires only once when the component mounts
  
  return (
    <div>
      <h1>Redirecting to WhatsApp...</h1>
    </div>
  );
};

export default RedirectToWhatsApp;
