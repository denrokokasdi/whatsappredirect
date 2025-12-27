import React, { useEffect, useRef, useState } from 'react';
import { FaWhatsapp, FaCheckCircle, FaShieldAlt, FaTruck, FaClock, FaStar, FaBox, FaPlayCircle } from 'react-icons/fa';

const HotLead = () => {
  const hasTracked = useRef({ viewContent: false, lead: false });
  const [stockCount, setStockCount] = useState(73);
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 45, seconds: 0 });
  const [recentOrders, setRecentOrders] = useState([
    { name: 'Ahmad', location: 'Kuala Lumpur', units: 4, time: 'baru sahaja' },
    { name: 'Siti', location: 'Johor Bahru', units: 8, time: '25 minit lepas' },
    { name: 'Kumar', location: 'Penang', units: 4, time: '12 minit lepas' },
    { name: 'Aina', location: 'Shah Alam', units: 1, time: '5 minit lepas' },
    { name: 'Faiz', location: 'Ipoh', units: 8, time: '18 minit lepas' },
    { name: 'Nur', location: 'Melaka', units: 1, time: '54 minit lepas' },
    { name: 'Daniel', location: 'Seremban', units: 4, time: '30 minit lepas' },
    { name: 'Hafiz', location: 'Kuantan', units: 4, time: '40 minit lepas' },
    { name: 'Aisyah', location: 'Alor Setar', units: 8, time: '1 jam lepas' },
    { name: 'Farhan', location: 'Miri', units: 1, time: '55 minit lepas' }
  ]);

  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const [currentOrderIndex, setCurrentOrderIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    // Fire ViewContent on page load
    if (window.fbq && !hasTracked.current.viewContent) {
      console.log('Firing ViewContent on page load');
      window.fbq('track', 'ViewContent');
      hasTracked.current.viewContent = true;
    }

    // Show notification after 5 seconds
    const notificationDelay = setTimeout(() => {
      setShowNotification(true);
    }, 5000);

    // Countdown Timer
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    // Stock Counter (simulate decrease)
    const stockTimer = setInterval(() => {
      setStockCount(prev => Math.max(15, prev - 1));
    }, 180000); // Decrease every 3 minutes

    // Recent Orders Rotation with fade animation
    const orderTimer = setInterval(() => {
      setFadeIn(false); // Start fade out
      setTimeout(() => {
        setCurrentOrderIndex(prev => (prev + 1) % recentOrders.length); // Change order
        setTimeout(() => {
          setFadeIn(true); // Fade in new order
        }, 200);
      }, 500); // Wait for fade out to complete
    }, 6000); // Total cycle: 4s display + 0.5s fade out + 0.1s change + 0.5s fade in + 2s delay = 7s, use 6s for smoother

    // Floating Button on Scroll
    const handleScroll = () => {
      // setShowFloatingButton(window.scrollY > 300);
      console.log('Scroll Y:', window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(notificationDelay);
      clearInterval(timer);
      clearInterval(stockTimer);
      clearInterval(orderTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [recentOrders.length]);

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

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      } else {
        videoRef.current.play();
        setIsVideoPlaying(true);
      }
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      padding: 0,
      margin: 0,
      position: 'relative'
    }}>
      {/* Sticky Header */}
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: 'white',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 20px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 'bold',
            fontSize: '18px',
            color: '#333'
          }}>
            🏠 HomeProject Malaysia
          </div>
          {/* <div style={{
            fontSize: '12px',
            color: '#666',
            fontFamily: 'Montserrat, sans-serif'
          }}>
            📞 01128459844
          </div> */}
        </div>
      </div>

      {/* Recent Order Notification - Floating */}
      {showNotification && (
        <div style={{
          position: 'fixed',
          top: '80px',
          left: '20px',
          backgroundColor: '#fff',
          padding: '12px 16px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 999,
          maxWidth: '280px',
          fontFamily: 'Montserrat, sans-serif',
          fontSize: '13px',
          border: '2px solid #25D366',
          opacity: fadeIn ? 1 : 0,
          transform: fadeIn ? 'translateX(0)' : 'translateX(-20px)',
          transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaCheckCircle color="#25D366" size={16} />
            <div>
              <strong>{recentOrders[currentOrderIndex].name}</strong> dari {recentOrders[currentOrderIndex].location}<br/>
              Baru order <strong>{recentOrders[currentOrderIndex].units} unit</strong> • {recentOrders[currentOrderIndex].time}
            </div>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: 'white',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
      }}>
        {/* Top Banners */}
        <div style={{
            fontSize: '13px',
            fontWeight: 'bold',
            color: 'white',
            backgroundColor: 'black',
            margin: 0,
            padding: '5px',
            lineHeight: '1.3',
            fontFamily: 'Montserrat, sans-serif',
            textAlign: 'center'
          }}>
            🏠 HomeProject Malaysia
          </div>
        <div style={{
            fontSize: '13px',
            fontWeight: 'bold',
            color: '#000',
            backgroundColor: '#FFD700',
            margin: 0,
            padding: '5px',
            lineHeight: '1.3',
            fontFamily: 'Montserrat, sans-serif',
            textAlign: 'center'
          }}>
            🎉 Promosi Hujung Tahun 2025
          </div>
        <div style={{
            fontSize: '13px',
            fontWeight: 'bold',
            color: 'white',
            backgroundColor: '#ff0000',
            margin: 0,
            padding: '5px',
            lineHeight: '1.3',
            fontFamily: 'Montserrat, sans-serif',
            textAlign: 'center'
          }}>
            ✅ Barang Sampai Baru Bayar (COD)
          </div>

        {/* Countdown Timer & Stock Counter */}
        <div style={{
          backgroundColor: '#ff0000',
          padding: '15px 20px',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '11px', color: '#fff', fontFamily: 'Montserrat, sans-serif', marginBottom: '5px' }}>
              ⏰ PROMO TAMAT DALAM:
            </div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#FFD700', fontFamily: 'Montserrat, sans-serif' }}>
              {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '11px', color: '#fff', fontFamily: 'Montserrat, sans-serif', marginBottom: '5px' }}>
              📦 STOCK TINGGAL:
            </div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#ff6b6b', fontFamily: 'Montserrat, sans-serif' }}>
              {stockCount} UNIT!
            </div>
          </div>
        </div>

        {/* Social Proof Banner */}
        {/* <div style={{
          backgroundColor: '#25D366',
          padding: '15px 20px',
          textAlign: 'center',
          color: 'white',
          fontFamily: 'Montserrat, sans-serif'
        }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '5px' }}>
            ⭐ 5,000+ Pelanggan Berpuas Hati
          </div>
          <div style={{ fontSize: '13px' }}>
            Dipercayai oleh ribuan pelanggan di seluruh Malaysia 🇲🇾
          </div>
        </div> */}

        {/* Full width main product image */}
        <img 
          src="/image.png" 
          alt="Lampu Solar 100LED - HomeProject Malaysia" 
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            margin: 0,
            padding: 0
          }}
        />

        {/* Trust Badges */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          padding: '20px 10px',
          backgroundColor: '#f8f9fa',
          flexWrap: 'wrap',
          gap: '15px'
        }}>
          <div style={{ textAlign: 'center', fontFamily: 'Montserrat, sans-serif' }}>
            <FaTruck size={30} color="#4CAF50" />
            <div style={{ fontSize: '11px', fontWeight: 'bold', marginTop: '5px' }}>Penghantaran</div>
            <div style={{ fontSize: '10px', color: '#666' }}>2-3 Hari</div>
          </div>
          <div style={{ textAlign: 'center', fontFamily: 'Montserrat, sans-serif' }}>
            <FaShieldAlt size={30} color="#2196F3" />
            <div style={{ fontSize: '11px', fontWeight: 'bold', marginTop: '5px' }}>Jaminan</div>
            <div style={{ fontSize: '10px', color: '#666' }}>Wang Kembali</div>
          </div>
          <div style={{ textAlign: 'center', fontFamily: 'Montserrat, sans-serif' }}>
            <FaBox size={30} color="#FF9800" />
            <div style={{ fontSize: '11px', fontWeight: 'bold', marginTop: '5px' }}>COD</div>
            <div style={{ fontSize: '10px', color: '#666' }}>Bayar Bila Terima</div>
          </div>
          <div style={{ textAlign: 'center', fontFamily: 'Montserrat, sans-serif' }}>
            <FaCheckCircle size={30} color="#9C27B0" />
            <div style={{ fontSize: '11px', fontWeight: 'bold', marginTop: '5px' }}>Kualiti</div>
            <div style={{ fontSize: '10px', color: '#666' }}>Premium Grade</div>
          </div>
        </div>

        {/* Full width main product image */}
        <img 
          src="/Screenshot-2021-10-03-at-1.16.11-PM-768x757.png" 
          alt="Lampu Solar 100LED - HomeProject Malaysia" 
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            margin: 0,
            padding: 0
          }}
        />
        {/* Full width main product image */}
        <img 
          src="/my-11134103-7qul4-lfphfglddiqh5b.webp" 
          alt="Lampu Solar 100LED - HomeProject Malaysia" 
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            margin: 0,
            padding: 0
          }}
        />
        {/* Full width main product image */}
        <img 
          src="/baf12b2f105f9475a0d82fc5af7c2583.webp" 
          alt="Lampu Solar 100LED - HomeProject Malaysia" 
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            margin: 0,
            padding: 0
          }}
        />
        {/* Full width main product image */}
        <img 
          src="/my-11134103-7r98p-lmqyp0if3xjq1e.webp" 
          alt="Lampu Solar 100LED - HomeProject Malaysia" 
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            margin: 0,
            padding: 0
          }}
        />
        {/* Full width main product image */}
        <img 
          src="/4df629e6698a74703c5ceebeae4d520a.webp" 
          alt="Lampu Solar 100LED - HomeProject Malaysia" 
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            margin: 0,
            padding: 0
          }}
        />
        {/* Full width main product image */}
        <img 
          src="/my-11134103-7rasi-m7asoihu76tk7f.webp" 
          alt="Lampu Solar 100LED - HomeProject Malaysia" 
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            margin: 0,
            padding: 0
          }}
        />
        
        {/* Content section */}
        <div style={{ 
          padding: '30px 20px',
          textAlign: 'center',
          backgroundColor: '#ffffff'
        }}>
          <h1 style={{
            fontSize: '26px',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '10px',
            lineHeight: '1.3',
            fontFamily: 'Montserrat, sans-serif'
          }}>
            Lampu Solar 100LED - Outdoor
          </h1>
          <div style={{
            display: 'inline-block',
            backgroundColor: '#ff0000',
            color: 'white',
            padding: '5px 15px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: 'bold',
            fontFamily: 'Montserrat, sans-serif',
            marginBottom: '20px'
          }}>
            🔥 STOCK TERHAD!
          </div>

          {/* Benefits Section with Icons */}
          <div style={{
            backgroundColor: '#fff',
            padding: '25px 20px',
            borderRadius: '12px',
            marginBottom: '25px',
            textAlign: 'left',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
          }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#333',
              marginBottom: '20px',
              fontFamily: 'Montserrat, sans-serif',
              textAlign: 'center'
            }}>
              ✨ Kenapa Ramai Pilih Lampu Solar Ni?
            </h2>
            
            <div style={{ marginBottom: '15px', fontFamily: 'Montserrat, sans-serif', fontSize: '15px', lineHeight: '1.8', color: '#444', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <FaCheckCircle color="#4CAF50" size={20} style={{ marginTop: '2px', flexShrink: 0 }} />
              <span><strong>Cas guna cahaya matahari</strong> - Tak perlu wiring, jimat bil elektrik</span>
            </div>
            <div style={{ marginBottom: '15px', fontFamily: 'Montserrat, sans-serif', fontSize: '15px', lineHeight: '1.8', color: '#444', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <FaCheckCircle color="#4CAF50" size={20} style={{ marginTop: '2px', flexShrink: 0 }} />
              <span><strong>Auto ON/OFF</strong> - Menyala bila malam, tutup bila siang</span>
            </div>
            <div style={{ marginBottom: '15px', fontFamily: 'Montserrat, sans-serif', fontSize: '15px', lineHeight: '1.8', color: '#444', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <FaCheckCircle color="#4CAF50" size={20} style={{ marginTop: '2px', flexShrink: 0 }} />
              <span><strong>Kalis air (Waterproof)</strong> - Hujan panas boleh tinggal luar</span>
            </div>
            <div style={{ marginBottom: '15px', fontFamily: 'Montserrat, sans-serif', fontSize: '15px', lineHeight: '1.8', color: '#444', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <FaCheckCircle color="#4CAF50" size={20} style={{ marginTop: '2px', flexShrink: 0 }} />
              <span><strong>Senang pasang</strong> - Cucuk atau gantung je, siap!</span>
            </div>
            <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '15px', lineHeight: '1.8', color: '#444', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <FaCheckCircle color="#4CAF50" size={20} style={{ marginTop: '2px', flexShrink: 0 }} />
              <span><strong>Rumah nampak lebih cantik</strong> - Bila pasang beberapa unit</span>
            </div>
          </div>

          {/* Video Section */}
          <div style={{
            width: '100%',
            marginBottom: '25px',
            position: 'relative',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
          }}>
            <video
              ref={videoRef}
              style={{
                width: '100%',
                height: 'auto',
                display: 'block'
              }}
              onEnded={() => setIsVideoPlaying(false)}
            >
              <source src="/my-11110103-6kh4g-mcvk1tp6zdp1c8.16000051754019450.mp4" type="video/mp4" />
              Browser anda tidak support video.
            </video>
            
            {/* Play/Pause Overlay */}
            {!isVideoPlaying && (
              <div
                onClick={handleVideoClick}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.5)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.3)'}
              >
                <FaPlayCircle 
                  size={80} 
                  color="white" 
                  style={{
                    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
                    transition: 'transform 0.3s ease'
                  }}
                />
              </div>
            )}

            {/* Pause on click when playing */}
            {isVideoPlaying && (
              <div
                onClick={handleVideoClick}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  cursor: 'pointer'
                }}
              />
            )}

            {/* Video Label */}
            <div style={{
              marginTop: '10px',
              textAlign: 'center',
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '14px',
              color: '#666',
              fontWeight: 'bold'
            }}>
              🎥 Tekan Play Untuk Tengok Video
            </div>
          </div>

          {/* Placeholder Image 1 - Product Details */}
          <div style={{
            width: '100%',
            minHeight: '250px',
            backgroundColor: '#e8e8e8',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '25px',
            border: '3px dashed #999',
            padding: '20px',
            boxSizing: 'border-box'
          }}>
            {/* <span style={{ color: '#666', fontFamily: 'Montserrat, sans-serif', fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>
              📷 Product Close-up / Features Image
            </span> */}
                    {/* Full width main product image */}
        <img 
          src="/629e29dd75c615637d683434528757bb.webp" 
          alt="Lampu Solar 100LED - HomeProject Malaysia" 
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            margin: 0,
            padding: 0
          }}
        />
        <img 
          src="/f5c653a4deb181af4549dadeb4ef01bc.webp" 
          alt="Lampu Solar 100LED - HomeProject Malaysia" 
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            margin: 0,
            padding: 0
          }}
        />
        <img 
          src="/my-11134103-820l5-mgirii5jzfgv0a.webp" 
          alt="Lampu Solar 100LED - HomeProject Malaysia" 
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            margin: 0,
            padding: 0
          }}
        />
        <img 
          src="/my-11134103-7r990-lmev3yw2brtic7.webp" 
          alt="Lampu Solar 100LED - HomeProject Malaysia" 
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            margin: 0,
            padding: 0
          }}
        />
        <img 
          src="/my-11134103-7r98x-lrzf9t1coy784b.webp" 
          alt="Lampu Solar 100LED - HomeProject Malaysia" 
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            margin: 0,
            padding: 0
          }}
        />
            {/* <span style={{ color: '#999', fontFamily: 'Montserrat, sans-serif', fontSize: '12px', textAlign: 'center' }}>
              (Gambar close-up produk / Features breakdown)
            </span> */}
          </div>

          {/* Spec Ringkas */}
          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '25px',
            borderRadius: '12px',
            marginBottom: '25px',
            border: '2px solid #e0e0e0',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: 'bold',
              marginBottom: '15px',
              fontFamily: 'Montserrat, sans-serif',
              color: '#333'
            }}>
              📋 Spesifikasi Produk
            </h3>
            <div style={{ textAlign: 'left', fontFamily: 'Montserrat, sans-serif', fontSize: '15px', lineHeight: '2', backgroundColor: 'white', padding: '15px', borderRadius: '8px', color: '#555' }}>
              • <strong>Jenis:</strong> Lampu Solar Outdoor 100LED<br/>
              • <strong>Fungsi:</strong> Auto ON/OFF (Light Sensor)<br/>
              • <strong>Pemasangan:</strong> Cucuk / Gantung<br/>
              • <strong>Kegunaan:</strong> Taman, Pagar, Halaman<br/>
              • <strong>Penyelenggaraan:</strong> Tak perlu (Solar Powered)<br/>
              • <strong>Warranty:</strong> 30 Hari Money Back Guarantee
            </div>
          </div>

        {/* Full width main product image */}
        <img 
          src="/my-11134103-7rasi-m7asoihu76tk7f.webp" 
          alt="Lampu Solar 100LED - HomeProject Malaysia" 
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            margin: 0,
            padding: 0
          }}
        />

          {/* Customer Testimonials */}
          <div style={{
            backgroundColor: '#fff',
            padding: '25px 20px',
            borderRadius: '12px',
            marginBottom: '25px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
          }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#333',
              marginBottom: '20px',
              fontFamily: 'Montserrat, sans-serif'
            }}>
              ⭐ Testimoni Pelanggan Kami
            </h2>
            
            {/* Testimonial 1 */}
            <div style={{
              backgroundColor: '#f8f9fa',
              padding: '15px',
              borderRadius: '10px',
              marginBottom: '15px',
              borderLeft: '4px solid #FFD700'
            }}>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
                <img 
                  src="https://via.placeholder.com/50/CCCCCC/666666?text=A" 
                  alt="Ahmad Avatar"
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 'bold', fontFamily: 'Montserrat, sans-serif', fontSize: '14px' }}>Ahmad Azmi</div>
                  <div style={{ color: '#FFD700', fontSize: '14px' }}>⭐⭐⭐⭐⭐</div>
                </div>
              </div>
              <p style={{ fontSize: '13px', color: '#555', fontFamily: 'Montserrat, sans-serif', lineHeight: '1.6', margin: 0 }}>
                "Lampu solar ni memang berbaloi! Dah pasang 8 unit kat taman. Malam terang je, tak payah risau bil elektrik naik. Recommend!"
              </p>
            </div>

            {/* Testimonial 2 */}
            <div style={{
              backgroundColor: '#f8f9fa',
              padding: '15px',
              borderRadius: '10px',
              marginBottom: '15px',
              borderLeft: '4px solid #FFD700'
            }}>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
                <img 
                  src="https://via.placeholder.com/50/CCCCCC/666666?text=S" 
                  alt="Siti Avatar"
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 'bold', fontFamily: 'Montserrat, sans-serif', fontSize: '14px' }}>Siti Aminah</div>
                  <div style={{ color: '#FFD700', fontSize: '14px' }}>⭐⭐⭐⭐⭐</div>
                </div>
              </div>
              <p style={{ fontSize: '13px', color: '#555', fontFamily: 'Montserrat, sans-serif', lineHeight: '1.6', margin: 0 }}>
                "Senang sangat nak pasang. Dalam 5 minit je dah siap. Kualiti pun bagus, kuat cahaya dia. Harga pun berpatutan. Thumbs up! 👍"
              </p>
            </div>

            {/* Testimonial 3 */}
            <div style={{
              backgroundColor: '#f8f9fa',
              padding: '15px',
              borderRadius: '10px',
              borderLeft: '4px solid #FFD700'
            }}>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
                <img 
                  src="https://via.placeholder.com/50/CCCCCC/666666?text=K" 
                  alt="Kumar Avatar"
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 'bold', fontFamily: 'Montserrat, sans-serif', fontSize: '14px' }}>Kumar Rajesh</div>
                  <div style={{ color: '#FFD700', fontSize: '14px' }}>⭐⭐⭐⭐⭐</div>
                </div>
              </div>
              <p style={{ fontSize: '13px', color: '#555', fontFamily: 'Montserrat, sans-serif', lineHeight: '1.6', margin: 0 }}>
                "Best purchase! Beli untuk kedai, customer pun compliment cantik. Dah order tambah 10 unit lagi. Service pun fast!"
              </p>
            </div>
          </div>

          {/* Placeholder Image 2 - Before/After or Installation */}
          {/* <div style={{
            width: '100%',
            minHeight: '250px',
            backgroundColor: '#e8e8e8',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '25px',
            border: '3px dashed #999'
            padding: '20px',
            boxSizing: 'border-box'
          }}>
            <span style={{ color: '#666', fontFamily: 'Montserrat, sans-serif', fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>
              📷 Before/After Installation Image
            </span>
            <span style={{ color: '#999', fontFamily: 'Montserrat, sans-serif', fontSize: '12px', textAlign: 'center' }}>
              (Gambar sebelum & selepas pasang / Installation guide)
            </span>
          </div> */}

          {/* Harga Promo */}
          <div style={{
            backgroundColor: '#fff',
            padding: '30px 20px',
            borderRadius: '15px',
            marginBottom: '15px',
            border: '3px solid #ff0000',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#ff0000',
              marginBottom: '10px',
              fontFamily: 'Montserrat, sans-serif'
            }}>
              🔥 HARGA PROMO HARI INI!
            </h2>
            <p style={{
              color: '#666',
              fontSize: '13px',
              marginBottom: '20px',
              fontFamily: 'Montserrat, sans-serif'
            }}>
              Tawaran terhad untuk {stockCount} unit pertama sahaja!
            </p>
            
            <div style={{
              backgroundColor: 'rgba(255,255,255,0.95)',
              padding: '18px',
              borderRadius: '10px',
              marginBottom: '12px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
            }}>
              <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '18px', fontWeight: 'bold', color: '#333' }}>
                🔹 1 unit – <span style={{ color: '#ff0000', fontSize: '26px' }}>RM30</span>
              </div>
              <div style={{ fontSize: '12px', color: '#666', fontFamily: 'Montserrat, sans-serif', marginTop: '5px' }}>
                Perfect untuk test dulu
              </div>
            </div>

            <div style={{
              backgroundColor: 'rgba(255,255,255,0.95)',
              padding: '18px',
              borderRadius: '10px',
              marginBottom: '12px',
              border: '2px solid #ffc107',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
            }}>
              <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '18px', fontWeight: 'bold', color: '#333' }}>
                🔹 4 unit – <span style={{ color: '#ff0000', fontSize: '26px' }}>RM100</span>
                <span style={{ 
                  backgroundColor: '#ffc107', 
                  color: '#000', 
                  padding: '3px 8px', 
                  borderRadius: '5px', 
                  fontSize: '11px',
                  marginLeft: '8px',
                  fontWeight: 'bold'
                }}>POPULAR</span>
              </div>
              <div style={{ fontSize: '12px', color: '#666', fontFamily: 'Montserrat, sans-serif', marginTop: '5px' }}>
                Jimat RM20! • RM25/unit je
              </div>
            </div>

            <div style={{
              backgroundColor: 'rgba(255,255,255,0.95)',
              padding: '18px',
              borderRadius: '10px',
              border: '3px solid #28a745',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
            }}>
              <div style={{
                position: 'absolute',
                top: '-5px',
                right: '-30px',
                backgroundColor: '#28a745',
                color: 'white',
                padding: '5px 40px',
                transform: 'rotate(45deg)',
                fontSize: '10px',
                fontWeight: 'bold',
                fontFamily: 'Montserrat, sans-serif'
              }}>
                BEST VALUE
              </div>
              <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '18px', fontWeight: 'bold', color: '#333' }}>
                🔹 8 unit – <span style={{ color: '#ff0000', fontSize: '26px' }}>RM150</span>
              </div>
              <div style={{ fontSize: '13px', color: '#28a745', fontFamily: 'Montserrat, sans-serif', fontWeight: 'bold', marginTop: '5px' }}>
                💰 PALING JIMAT - Jimat RM90! • RM18.75/unit
              </div>
              <div style={{ fontSize: '11px', color: '#666', fontFamily: 'Montserrat, sans-serif', marginTop: '5px' }}>
                Cukup untuk satu rumah atau jual balik!
              </div>
            </div>

            <div style={{
              backgroundColor: '#fff3cd',
              padding: '15px',
              borderRadius: '8px',
              marginTop: '20px',
              border: '2px solid #ffc107'
            }}>
              <p style={{
                fontSize: '14px',
                color: '#333',
                fontFamily: 'Montserrat, sans-serif',
                lineHeight: '1.6',
                margin: 0,
                fontWeight: 'bold'
              }}>
                ⚠️ Promo tamat dalam {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}<br/>
                🎁 FREE Installation Guide + Warranty Card<br/>
                🚚 Penghantaran 2-3 hari ke seluruh Malaysia
              </p>
            </div>
          </div>

          {/* CTA Final */}
          <div style={{
            backgroundColor: 'red',
            padding: '25px',
            borderRadius: '15px',
            marginBottom: '25px',
            boxShadow: '0 4px 15px rgba(37, 211, 102, 0.3)'
          }}>
            <p style={{
              color: 'white',
              fontSize: '20px',
              fontWeight: 'bold',
              marginBottom: '10px',
              fontFamily: 'Montserrat, sans-serif'
            }}>
              ✅ Dah Tahu Harga & Kualiti?
            </p>
            <p style={{
              color: 'white',
              fontSize: '14px',
              fontFamily: 'Montserrat, sans-serif',
              marginBottom: '15px',
              lineHeight: '1.6'
            }}>
              Tekan button di bawah untuk order sekarang!<br/>
              Team kami akan bantu anda dengan segera 😊
            </p>
            <div style={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              padding: '10px',
              borderRadius: '8px',
              fontSize: '12px',
              color: 'white',
              fontFamily: 'Montserrat, sans-serif'
            }}>
              ⚡ Response time: &lt; 2 minit
            </div>
          </div>

          <button
            onClick={handleClick}
            style={{
              backgroundColor: '#25D366',
              color: 'white',
              padding: '20px 50px',
              border: 'none',
              borderRadius: '50px',
              fontSize: '20px',
              fontWeight: 'bold',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              gap: '12px',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 25px rgba(37, 211, 102, 0.5)',
              margin: '0 auto',
              fontFamily: 'Montserrat, sans-serif',
              width: '100%',
              maxWidth: '100%',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#20BA5A';
              e.target.style.transform = 'translateY(-3px)';
              e.target.style.boxShadow = '0 12px 30px rgba(37, 211, 102, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#25D366';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 8px 25px rgba(37, 211, 102, 0.5)';
            }}
          >
            <FaWhatsapp size={28} />
            WHATSAPP SEKARANG
          </button>

          <p style={{
            marginTop: '20px',
            fontSize: '13px',
            color: '#999',
            fontFamily: 'Montserrat, sans-serif'
          }}>
            💬 Terus berhubung dengan team kami • Online 24/7
          </p>

          {/* Additional Trust Elements */}
          <div style={{
            marginTop: '30px',
            padding: '20px',
            backgroundColor: '#f8f9fa',
            borderRadius: '12px',
            textAlign: 'center'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '20px',
              marginBottom: '15px'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#4CAF50', fontFamily: 'Montserrat, sans-serif' }}>
                  1000+
                </div>
                <div style={{ fontSize: '12px', color: '#666', fontFamily: 'Montserrat, sans-serif' }}>
                  Rumah Dah Pakai
                </div>
              </div>
              {/* <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2196F3', fontFamily: 'Montserrat, sans-serif' }}>
                  4.9★
                </div>
                <div style={{ fontSize: '12px', color: '#666', fontFamily: 'Montserrat, sans-serif' }}>
                  Rating Score
                </div>
              </div> */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#FF9800', fontFamily: 'Montserrat, sans-serif' }}>
                  2-3 Hari
                </div>
                <div style={{ fontSize: '12px', color: '#666', fontFamily: 'Montserrat, sans-serif' }}>
                  Fast Delivery
                </div>
              </div>
            </div>
          </div>
          
        </div>

        {/* Footer */}
        <div style={{
          backgroundColor: '#2c3e50',
          color: 'white',
          padding: '30px 20px',
          textAlign: 'center',
          fontFamily: 'Montserrat, sans-serif'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' }}>
            HomeProject Malaysia
          </h3>
          <div style={{ fontSize: '13px', lineHeight: '2', marginBottom: '15px' }}>
            📍 Alamat: 67, Jalan Opera A U2/A, Taman TTDI Jaya, 40150 Shah Alam, Selangor<br/>
            📞 Phone: 01128459844<br/>
            📧 Email: hpmsolutions.hq@gmail.com<br/>
          </div>
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.2)',
            paddingTop: '15px',
            marginTop: '15px',
            fontSize: '11px',
            color: '#bdc3c7'
          }}>
            © 2025 HomeProject Malaysia. All Rights Reserved.<br/>
            SSM Registration: 1234567-X (Replace with actual if available)
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      {showFloatingButton && (
        <button
          onClick={handleClick}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            backgroundColor: '#25D366',
            color: 'white',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(37, 211, 102, 0.5)',
            zIndex: 1000,
            animation: 'pulse 2s infinite',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
          }}
        >
          <FaWhatsapp size={32} />
        </button>
      )}

      {/* CSS Animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 4px 20px rgba(37, 211, 102, 0.5);
          }
          50% {
            box-shadow: 0 4px 30px rgba(37, 211, 102, 0.8);
          }
        }
        
        @keyframes fadeInOut {
          0% {
            opacity: 0;
            transform: translateX(-20px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default HotLead;
