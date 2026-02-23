import React, { useState, useEffect, useRef } from 'react';

// Icons
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{width:'20px',height:'20px'}}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{width:'20px',height:'20px'}}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const CodeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:'28px',height:'28px'}}>
    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
  </svg>
);

const NetworkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:'28px',height:'28px'}}>
    <circle cx="12" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/>
    <line x1="12" y1="7" x2="5" y2="17"/><line x1="12" y1="7" x2="19" y2="17"/>
  </svg>
);

const ServerIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:'28px',height:'28px'}}>
    <rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/>
    <line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>
  </svg>
);

const PaletteIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:'28px',height:'28px'}}>
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 2a10 10 0 0 1 10 10c0 3-2 4-4 4h-2c-2 0-3 1-3 3s-1 3-1 3"/>
  </svg>
);

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{width:'18px',height:'18px'}}>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:'20px',height:'20px'}}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.86a16 16 0 0 0 6.13 6.13l.86-.86a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.78 16.92z"/>
  </svg>
);

export default function HomePage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [visible, setVisible] = useState({});
  const sectionRefs = useRef({});

  useEffect(() => {
    const handleMouse = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('mousemove', handleMouse);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.15 }
    );
    Object.values(sectionRefs.current).forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const registerRef = (id) => (el) => {
    sectionRefs.current[id] = el;
  };

  const projects = [
    {
      id: 1,
      title: 'منصة التجارة الإلكترونية',
      description: 'منصة متكاملة مع نظام دفع آمن وإدارة ذكية للمنتجات',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      color: '#00E5FF',
      num: '01',
    },
    {
      id: 2,
      title: 'تطبيق إدارة المشاريع',
      description: 'لوحة تحكم تفاعلية لإدارة الفرق والمهام بكفاءة عالية',
      technologies: ['React', 'TypeScript', 'Firebase', 'Tailwind'],
      color: '#B8FF57',
      num: '02',
    },
    {
      id: 3,
      title: 'نظام إدارة الشبكات',
      description: 'أداة رصد وإدارة للشبكات مع تنبيهات فورية وتقارير تفصيلية',
      technologies: ['Python', 'Cisco', 'VLAN', 'Docker'],
      color: '#FF6B6B',
      num: '03',
    },
  ];

  const skills = [
    { name: 'تطوير الواجهات', sub: 'React · JS · CSS', icon: <CodeIcon />, color: '#00E5FF' },
    { name: 'إدارة الشبكات', sub: 'Cisco · VLAN · TCP/IP', icon: <NetworkIcon />, color: '#B8FF57' },
    { name: 'تطوير الخوادم', sub: 'Node.js · PHP · SQL', icon: <ServerIcon />, color: '#FF6B6B' },
    { name: 'تصميم UI/UX', sub: 'Figma · Design Systems', icon: <PaletteIcon />, color: '#C084FC' },
  ];

  const parallaxX = (mousePos.x / window.innerWidth - 0.5) * 20;
  const parallaxY = (mousePos.y / window.innerHeight - 0.5) * 20;

  return (
    <div dir="rtl" style={{
      fontFamily: "'Cairo', 'Tajawal', sans-serif",
      background: '#0A0A0F',
      color: '#E8E8F0',
      minHeight: '100vh',
      overflowX: 'hidden',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;900&family=Space+Mono:wght@400;700&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0A0A0F; }
        ::-webkit-scrollbar-thumb { background: #00E5FF; border-radius: 2px; }

        .nav-link {
          color: #888;
          text-decoration: none;
          font-size: 14px;
          letter-spacing: 1px;
          transition: color 0.3s;
          cursor: pointer;
        }
        .nav-link:hover { color: #00E5FF; }

        .hero-name {
          font-size: clamp(52px, 10vw, 120px);
          font-weight: 900;
          line-height: 0.9;
          letter-spacing: -2px;
          background: linear-gradient(135deg, #ffffff 0%, #00E5FF 50%, #B8FF57 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-family: 'Space Mono', monospace;
          color: #00E5FF;
          font-size: 13px;
          letter-spacing: 4px;
          text-transform: uppercase;
        }

        .btn-primary {
          background: #00E5FF;
          color: #0A0A0F;
          border: none;
          padding: 14px 32px;
          font-family: 'Cairo', sans-serif;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
          transition: all 0.3s;
          text-decoration: none;
          display: inline-block;
        }
        .btn-primary:hover {
          background: #B8FF57;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,229,255,0.3);
        }

        .btn-outline {
          background: transparent;
          color: #E8E8F0;
          border: 1px solid rgba(255,255,255,0.2);
          padding: 14px 32px;
          font-family: 'Cairo', sans-serif;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
          transition: all 0.3s;
          text-decoration: none;
          display: inline-block;
        }
        .btn-outline:hover {
          border-color: #00E5FF;
          color: #00E5FF;
        }

        .skill-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          padding: 32px 24px;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          cursor: default;
        }
        .skill-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: var(--card-color);
          transform: scaleX(0);
          transition: transform 0.4s ease;
        }
        .skill-card:hover::before { transform: scaleX(1); }
        .skill-card:hover {
          background: rgba(255,255,255,0.05);
          border-color: var(--card-color);
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }

        .project-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          padding: 32px;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        .project-card:hover {
          background: rgba(255,255,255,0.04);
          border-color: var(--proj-color);
          transform: translateY(-4px);
          box-shadow: 0 24px 48px rgba(0,0,0,0.5);
        }

        .social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border: 1px solid rgba(255,255,255,0.1);
          color: #888;
          text-decoration: none;
          transition: all 0.3s;
          clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
        }
        .social-btn:hover {
          border-color: #00E5FF;
          color: #00E5FF;
          background: rgba(0,229,255,0.08);
        }

        .tech-tag {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          padding: 4px 10px;
          border: 1px solid rgba(255,255,255,0.1);
          color: #888;
          letter-spacing: 1px;
        }

        .section-label {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          letter-spacing: 4px;
          color: #00E5FF;
          text-transform: uppercase;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .section-label::after {
          content: '';
          flex: 1;
          height: 1px;
          background: rgba(0,229,255,0.3);
          max-width: 60px;
        }

        .fade-up {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .fade-up.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .grid-bg {
          background-image:
            linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,229,255,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        .glow-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          opacity: 0.12;
        }

        .stat-num {
          font-family: 'Space Mono', monospace;
          font-size: 48px;
          font-weight: 700;
          line-height: 1;
          color: #00E5FF;
        }

        .contact-link {
          display: flex;
          align-items: center;
          gap: 14px;
          color: #888;
          text-decoration: none;
          padding: 16px 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          transition: all 0.3s;
          font-size: 15px;
        }
        .contact-link:hover { color: #00E5FF; padding-right: 8px; }
        .contact-link:hover .cl-icon { color: #00E5FF; }
        .cl-icon { transition: color 0.3s; }

        @media (max-width: 768px) {
          .hero-name { font-size: 52px; }
          .hero-grid { grid-template-columns: 1fr !important; }
          .projects-grid { grid-template-columns: 1fr !important; }
          .skills-grid { grid-template-columns: 1fr 1fr !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(10,10,15,0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '0 40px',
        height: '64px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '16px',
          fontWeight: 700,
          color: '#00E5FF',
          letterSpacing: '2px',
        }}>AMIR.TECH</div>
        <div style={{ display: 'flex', gap: '32px' }}>
          {['الأعمال', 'المهارات', 'تواصل'].map(t => (
            <span key={t} className="nav-link">{t}</span>
          ))}
        </div>
        <a href="https://wa.me/201552451705" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{padding:'8px 20px', fontSize:'13px'}}>
          احجز الآن
        </a>
      </nav>

      {/* HERO */}
      <section className="grid-bg" style={{
        minHeight: '100vh',
        paddingTop: '80px',
        display: 'flex', alignItems: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <div className="glow-orb" style={{
          width: '600px', height: '600px',
          background: '#00E5FF',
          top: '-200px', right: '-200px',
          transform: `translate(${parallaxX * 0.5}px, ${parallaxY * 0.5}px)`,
          transition: 'transform 0.1s',
        }} />
        <div className="glow-orb" style={{
          width: '400px', height: '400px',
          background: '#B8FF57',
          bottom: '-100px', left: '-100px',
          opacity: 0.07,
        }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px', width: '100%' }}>
          <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            
            {/* Text */}
            <div>
              <div className="hero-subtitle" style={{ marginBottom: '24px' }}>
                ✦ مطور ويب · مهندس شبكات
              </div>
              <h1 className="hero-name" style={{ marginBottom: '32px' }}>
                أمير<br />أبو<br />النجاه
              </h1>
              <p style={{
                color: '#888',
                fontSize: '17px',
                lineHeight: '1.8',
                marginBottom: '40px',
                maxWidth: '440px',
              }}>
                طالب في تكنولوجيا المعلومات بجامعة برج العرب التكنولوجية. أبني تطبيقات ويب متكاملة تجمع بين أداء قوي وتجربة مستخدم استثنائية.
              </p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '40px' }}>
                <a href="https://wa.me/201552451705" target="_blank" rel="noopener noreferrer" className="btn-primary">
                  احجز استشارة مجانية
                </a>
                <span className="btn-outline" style={{cursor:'pointer'}}>
                  تصفح الأعمال ↓
                </span>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <a href="https://wa.me/201552451705" target="_blank" rel="noopener noreferrer" className="social-btn" title="واتساب">
                  <WhatsAppIcon />
                </a>
                <a href="https://www.facebook.com/share/17vGQz8fBN/" target="_blank" rel="noopener noreferrer" className="social-btn" title="فيسبوك">
                  <FacebookIcon />
                </a>
                <a href="tel:+201552451705" className="social-btn" title="اتصل بنا">
                  <PhoneIcon />
                </a>
              </div>
            </div>

            {/* Visual */}
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'relative',
                transform: `translate(${parallaxX * 0.3}px, ${parallaxY * 0.3}px)`,
                transition: 'transform 0.1s',
              }}>
                {/* Main card */}
                <div style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(0,229,255,0.2)',
                  padding: '40px',
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                    background: 'linear-gradient(90deg, transparent, #00E5FF, transparent)',
                  }} />
                  
                  {/* Code mock */}
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '13px', lineHeight: '1.8' }}>
                    <div style={{ color: '#555', marginBottom: '16px' }}>// profile.js</div>
                    <div><span style={{color:'#C084FC'}}>const</span> <span style={{color:'#00E5FF'}}>amir</span> = {'{'}</div>
                    <div style={{paddingRight:'20px'}}>
                      <div><span style={{color:'#B8FF57'}}>name</span>: <span style={{color:'#FF6B6B'}}>"أمير أبو النجاه"</span>,</div>
                      <div><span style={{color:'#B8FF57'}}>age</span>: <span style={{color:'#00E5FF'}}>20</span>,</div>
                      <div><span style={{color:'#B8FF57'}}>university</span>: <span style={{color:'#FF6B6B'}}>"برج العرب"</span>,</div>
                      <div><span style={{color:'#B8FF57'}}>year</span>: <span style={{color:'#00E5FF'}}>2</span>,</div>
                      <div><span style={{color:'#B8FF57'}}>skills</span>: [</div>
                      <div style={{paddingRight:'20px'}}>
                        <div><span style={{color:'#FF6B6B'}}>"Frontend"</span>,</div>
                        <div><span style={{color:'#FF6B6B'}}>"Backend"</span>,</div>
                        <div><span style={{color:'#FF6B6B'}}>"Networks"</span>,</div>
                      </div>
                      <div>],</div>
                      <div><span style={{color:'#B8FF57'}}>available</span>: <span style={{color:'#B8FF57'}}>true</span> ✦</div>
                    </div>
                    <div>{'}'}</div>
                  </div>
                </div>

                {/* Floating badge */}
                <div style={{
                  position: 'absolute',
                  bottom: '-20px',
                  left: '-20px',
                  background: '#B8FF57',
                  color: '#0A0A0F',
                  padding: '12px 20px',
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '1px',
                  clipPath: 'polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)',
                }}>
                  OPEN TO WORK
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{
        background: 'rgba(0,229,255,0.03)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        padding: '60px 40px',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '40px', textAlign: 'center' }}>
            {[
              { num: '5+', label: 'مشاريع مكتملة' },
              { num: '2+', label: 'سنوات خبرة' },
              { num: '20', label: 'سنة عمر' },
              { num: '∞', label: 'شغف بالتطوير' },
            ].map((s, i) => (
              <div key={i}>
                <div className="stat-num">{s.num}</div>
                <div style={{ color: '#555', fontSize: '13px', marginTop: '8px', letterSpacing: '1px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section
        id="skills-sec"
        ref={registerRef('skills-sec')}
        style={{ padding: '120px 40px' }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className={`fade-up ${visible['skills-sec'] ? 'visible' : ''}`}>
            <div className="section-label">المهارات والخبرات</div>
            <h2 style={{ fontSize: '48px', fontWeight: 900, marginBottom: '60px', lineHeight: 1 }}>
              ماذا أفعل<br />
              <span style={{ color: '#00E5FF' }}>بشكل ممتاز</span>
            </h2>
          </div>
          <div className="skills-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1px', background: 'rgba(255,255,255,0.05)' }}>
            {skills.map((skill, i) => (
              <div
                key={i}
                className={`skill-card fade-up ${visible['skills-sec'] ? 'visible' : ''}`}
                style={{
                  '--card-color': skill.color,
                  transitionDelay: `${i * 100}ms`,
                }}
              >
                <div style={{ color: skill.color, marginBottom: '20px' }}>{skill.icon}</div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>{skill.name}</h3>
                <p style={{ color: '#555', fontSize: '13px', fontFamily: "'Space Mono', monospace", letterSpacing: '1px' }}>{skill.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section
        id="projects-sec"
        ref={registerRef('projects-sec')}
        style={{ padding: '0 40px 120px' }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className={`fade-up ${visible['projects-sec'] ? 'visible' : ''}`}>
            <div className="section-label">المشاريع المميزة</div>
            <h2 style={{ fontSize: '48px', fontWeight: 900, marginBottom: '60px', lineHeight: 1 }}>
              أعمالي<br />
              <span style={{ color: '#B8FF57' }}>السابقة</span>
            </h2>
          </div>
          <div className="projects-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1px', background: 'rgba(255,255,255,0.05)' }}>
            {projects.map((p, i) => (
              <div
                key={p.id}
                className={`project-card fade-up ${visible['projects-sec'] ? 'visible' : ''}`}
                style={{ '--proj-color': p.color, transitionDelay: `${i * 120}ms` }}
              >
                <div style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '48px', fontWeight: 700,
                  color: p.color, opacity: 0.15, lineHeight: 1,
                  marginBottom: '24px',
                }}>{p.num}</div>
                <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '12px' }}>{p.title}</h3>
                <p style={{ color: '#666', fontSize: '14px', lineHeight: 1.7, marginBottom: '24px' }}>{p.description}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                  {p.technologies.map((t, ti) => (
                    <span key={ti} className="tech-tag">{t}</span>
                  ))}
                </div>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                  style={{ color: p.color, fontSize: '13px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', letterSpacing: '1px' }}>
                  <GithubIcon /> عرض المشروع ↗
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about-sec"
        ref={registerRef('about-sec')}
        style={{
          padding: '120px 40px',
          background: 'rgba(255,255,255,0.01)',
          borderTop: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            <div className={`fade-up ${visible['about-sec'] ? 'visible' : ''}`}>
              <div className="section-label">نبذة عني</div>
              <h2 style={{ fontSize: '48px', fontWeight: 900, lineHeight: 1, marginBottom: '32px' }}>
                مطور شاب<br />
                <span style={{ color: '#C084FC' }}>بعقل مهندس</span>
              </h2>
              <p style={{ color: '#777', fontSize: '16px', lineHeight: 1.9, marginBottom: '24px' }}>
                أنا أمير أبو النجاه، طالب في الفرقة الثانية تكنولوجيا معلومات بجامعة برج العرب التكنولوجية. عمري 20 عامًا وأجمع بين عالمين: الشبكات والبرمجة.
              </p>
              <p style={{ color: '#777', fontSize: '16px', lineHeight: 1.9, marginBottom: '40px' }}>
                أؤمن أن الكود الجيد ليس فقط كوداً يعمل — بل كود يُقرأ، يُصان، ويُوسَّع. أسعى لبناء منتجات رقمية تحل مشكلات حقيقية بتصميم استثنائي.
              </p>
              <a href="https://wa.me/201552451705" target="_blank" rel="noopener noreferrer" className="btn-primary">
                دعنا نبني شيئاً معاً
              </a>
            </div>
            <div className={`fade-up ${visible['about-sec'] ? 'visible' : ''}`} style={{ transitionDelay: '200ms' }}>
              <div style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                padding: '40px',
              }}>
                <div style={{ marginBottom: '32px' }}>
                  <div style={{ color: '#555', fontSize: '12px', letterSpacing: '2px', marginBottom: '8px', fontFamily: "'Space Mono', monospace" }}>التعليم</div>
                  <div style={{ fontSize: '18px', fontWeight: 700 }}>جامعة برج العرب التكنولوجية</div>
                  <div style={{ color: '#666', fontSize: '14px', marginTop: '4px' }}>تكنولوجيا المعلومات · الفرقة الثانية</div>
                </div>
                {[
                  { label: 'Frontend', pct: 85, color: '#00E5FF' },
                  { label: 'Backend', pct: 75, color: '#B8FF57' },
                  { label: 'Networks', pct: 80, color: '#FF6B6B' },
                  { label: 'UI/UX', pct: 70, color: '#C084FC' },
                ].map((bar, i) => (
                  <div key={i} style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '13px' }}>
                      <span style={{ fontFamily: "'Space Mono', monospace", letterSpacing: '1px' }}>{bar.label}</span>
                      <span style={{ color: bar.color }}>{bar.pct}%</span>
                    </div>
                    <div style={{ height: '3px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px' }}>
                      <div style={{
                        height: '100%',
                        width: visible['about-sec'] ? `${bar.pct}%` : '0%',
                        background: bar.color,
                        borderRadius: '2px',
                        transition: `width 1.2s ease ${i * 150}ms`,
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section
        id="contact-sec"
        ref={registerRef('contact-sec')}
        style={{ padding: '120px 40px', background: '#0A0A0F', position: 'relative', overflow: 'hidden' }}
      >
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,229,255,0.06) 0%, transparent 70%)',
        }} />
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <div className={`fade-up ${visible['contact-sec'] ? 'visible' : ''}`}>
            <div className="section-label" style={{ justifyContent: 'center' }}>
              تواصل معي
            </div>
            <h2 style={{ fontSize: '56px', fontWeight: 900, lineHeight: 1.1, marginBottom: '24px' }}>
              لديك مشروع؟<br />
              <span style={{ color: '#00E5FF' }}>لنتحدث.</span>
            </h2>
            <p style={{ color: '#666', fontSize: '17px', lineHeight: 1.8, marginBottom: '56px', maxWidth: '500px', margin: '0 auto 56px' }}>
              سواء كان موقعاً، تطبيقاً، أو استشارة تقنية — أنا هنا لمساعدتك في تحقيق رؤيتك الرقمية
            </p>
            <div>
              <a href="https://wa.me/201552451705" className="contact-link" style={{ justifyContent: 'center', borderBottom: 'none', marginBottom: '12px', display: 'flex' }}>
                <span className="cl-icon"><WhatsAppIcon /></span>
                <span>+20 155 245 1705 — واتساب</span>
              </a>
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '32px', flexWrap: 'wrap' }}>
                <a href="https://wa.me/201552451705" target="_blank" rel="noopener noreferrer" className="btn-primary">
                  تواصل عبر واتساب
                </a>
                <a href="https://www.facebook.com/share/17vGQz8fBN/" target="_blank" rel="noopener noreferrer" className="btn-outline">
                  صفحة فيسبوك
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '32px 40px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: '16px',
      }}>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '14px', color: '#00E5FF', letterSpacing: '2px' }}>
          AMIR.TECH
        </div>
        <div style={{ color: '#444', fontSize: '13px', fontFamily: "'Space Mono', monospace" }}>
          © 2025 · Amir Abu Al-Najah · All rights reserved
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <a href="https://wa.me/201552451705" target="_blank" rel="noopener noreferrer" className="social-btn"><WhatsAppIcon /></a>
          <a href="https://www.facebook.com/share/17vGQz8fBN/" target="_blank" rel="noopener noreferrer" className="social-btn"><FacebookIcon /></a>
          <a href="tel:+201552451705" className="social-btn"><PhoneIcon /></a>
        </div>
      </footer>
    </div>
  );
}
