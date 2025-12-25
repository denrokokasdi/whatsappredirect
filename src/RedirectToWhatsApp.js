import React, { useEffect, useRef } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

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
    <div style={{ 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f5f5f5',
      padding: 0,
      margin: 0
    }}>
      <div style={{
        width: '100%',
        maxWidth: '100%',
        backgroundColor: 'white',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden'
      }}>
        <h1 style={{
            fontSize: '13px',
            fontWeight: 'bold',
            color: 'white',
            backgroundColor: 'black',
            margin: 0,
            padding: '5px',
            lineHeight: '1.3',
            fontFamily: 'Montserrat, sans-serif'
          }}>
            HomeProject Malaysia
          </h1>
        <h1 style={{
            fontSize: '13px',
            fontWeight: 'bold',
            color: '#000',
            backgroundColor: '#FFD700',
            margin: 0,
            padding: '5px',
            lineHeight: '1.3',
            fontFamily: 'Montserrat, sans-serif'
          }}>
            Promosi Hujung Tahun 2025
          </h1>
                  <h1 style={{
            fontSize: '13px',
            fontWeight: 'bold',
            color: 'white',
            backgroundColor: 'red',
            margin: 0,
            padding: '5px',
            lineHeight: '1.3',
            fontFamily: 'Montserrat, sans-serif'
          }}>
            Barang Sampai Baru Bayar
          </h1>

          <button
            onClick={handleClick}
            style={{
              backgroundColor: '#25D366',
              color: 'white',
              padding: '18px 40px',
              border: 'none',
              borderRadius: '50px',
              fontSize: '18px',
              fontWeight: 'bold',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              gap: '12px',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(37, 211, 102, 0.3)',
              margin: '20px auto',
              fontFamily: 'Montserrat, sans-serif'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#20BA5A';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#25D366';
              e.target.style.transform = 'scale(1)';
            }}
          >
            <FaWhatsapp size={26} />
            WhatsApp Sekarang
          </button>

        {/* Full width image with no padding */}
        <img 
          src="/image.png" 
          alt="Promo Lampu Solar" 
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            margin: 0,
            padding: 0
          }}
        />
        
        {/* Content section with padding */}
        <div style={{ 
          padding: '40px 20px',
          textAlign: 'center'
        }}>
            <button
            onClick={handleClick}
            style={{
              backgroundColor: '#25D366',
              color: 'white',
              padding: '18px 40px',
              border: 'none',
              borderRadius: '50px',
              fontSize: '18px',
              fontWeight: 'bold',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              gap: '12px',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(37, 211, 102, 0.3)',
              margin: '0 auto',
              fontFamily: 'Montserrat, sans-serif'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#20BA5A';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#25D366';
              e.target.style.transform = 'scale(1)';
            }}
          >
            <FaWhatsapp size={26} />
            WhatsApp Sekarang
          </button>
          <h1 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '10px',
            lineHeight: '1.3',
            fontFamily: 'Montserrat, sans-serif'
          }}>
            Dapatkan Promo Lampu Solar 100LED
          </h1>
          
          <p style={{
            fontSize: '16px',
            color: '#666',
            marginBottom: '30px',
            lineHeight: '1.6',
            fontFamily: 'Montserrat, sans-serif'
          }}>
            Tekan butang di atas untuk dapatkan tawaran istimewa hari ini!
          </p>
          
        
        </div>
      </div>
    </div>
  );
};

export default WhatsAppRedirect;
