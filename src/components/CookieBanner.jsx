import React, { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('ot_cookie_consent');
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem('ot_cookie_consent', 'accepted');
    setVisible(false);
  };

  const refuse = () => {
    localStorage.setItem('ot_cookie_consent', 'refused');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 9999,
      background: 'rgba(10,10,18,0.97)',
      borderTop: '1px solid rgba(212,175,55,0.35)',
      backdropFilter: 'blur(16px)',
      padding: '16px 24px',
      display: 'flex', flexWrap: 'wrap', alignItems: 'center',
      justifyContent: 'space-between', gap: '12px',
      fontFamily: "'Montserrat', sans-serif",
    }}>
      <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '0.82rem', margin: 0, flex: '1 1 300px', lineHeight: '1.5' }}>
        🍪 Ce site utilise des cookies pour améliorer votre expérience.
        En continuant, vous acceptez notre{' '}
        <a href="/mentions-legales" style={{ color: '#D4AF37', textDecoration: 'underline' }}>
          politique de confidentialité
        </a>.
      </p>
      <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
        <button onClick={refuse} style={{
          background: 'transparent', border: '1px solid rgba(212,175,55,0.4)',
          color: 'rgba(255,255,255,0.6)', borderRadius: '50px',
          padding: '8px 18px', fontSize: '0.78rem', cursor: 'pointer',
          fontFamily: "'Montserrat', sans-serif", letterSpacing: '0.05em',
        }}>
          Refuser
        </button>
        <button onClick={accept} style={{
          background: 'linear-gradient(135deg,#C8A84B,#D4AF37,#B8922E)',
          border: 'none', color: '#0a0a12', borderRadius: '50px',
          padding: '8px 22px', fontSize: '0.78rem', fontWeight: 700,
          cursor: 'pointer', fontFamily: "'Montserrat', sans-serif",
          letterSpacing: '0.05em',
        }}>
          Accepter
        </button>
      </div>
    </div>
  );
}
