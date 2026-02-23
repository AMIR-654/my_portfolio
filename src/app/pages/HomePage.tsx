import React, { useState, useEffect } from 'react';
import { Phone, Code2, Palette, Database, Rocket } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

// WhatsApp SVG Icon
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

// Facebook SVG Icon
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('mousemove', handleMouse);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const projects = [
    {
      id: 1,
      title: 'منصة التجارة الإلكترونية',
      description: 'منصة متكاملة للتجارة الإلكترونية مع نظام دفع آمن وإدارة المنتجات',
      image: 'https://images.unsplash.com/photo-1758873268877-3cd8ed329ed8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMHByb2plY3QlMjBzY3JlZW58ZW58MXx8fHwxNzcxNDY2MTEyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      github: 'https://github.com',
    },
    {
      id: 2,
      title: 'تطبيق إدارة المشاريع',
      description: 'تطبيق ويب لإدارة المشاريع والفرق مع لوحة تحكم تفاعلية',
      image: 'https://images.unsplash.com/photo-1661246627162-feb0269e0c07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXNpZ24lMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzcxNTAyMzU1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      technologies: ['React', 'TypeScript', 'Firebase', 'Tailwind'],
      github: 'https://github.com',
    },
    {
      id: 3,
      title: 'نظام إدارة المحتوى',
      description: 'CMS متقدم لإدارة المحتوى مع محرر نصوص غني ونظام أذونات',
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjBwcm9ncmFtbWluZyUyMGFic3RyYWN0fGVufDF8fHx8MTc3MTUwMjM1NXww&ixlib=rb-4.1.0&q=80&w=1080',
      technologies: ['Next.js', 'PostgreSQL', 'GraphQL', 'Docker'],
      github: 'https://github.com',
    },
  ];

  const skills = [
    { name: 'Frontend Development', icon: Code2, color: 'text-cyan-400' },
    { name: 'UI/UX Design', icon: Palette, color: 'text-purple-400' },
    { name: 'Backend Development', icon: Database, color: 'text-green-400' },
    { name: 'DevOps & Deployment', icon: Rocket, color: 'text-orange-400' },
  ];

  const parallaxX = typeof window !== 'undefined' ? (mousePos.x / window.innerWidth - 0.5) * 15 : 0;
  const parallaxY = typeof window !== 'undefined' ? (mousePos.y / window.innerHeight - 0.5) * 15 : 0;

  return (
    <div className="min-h-screen" style={{ background: '#0A0A0F', color: '#E8E8F0', fontFamily: "'Cairo', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;900&family=Space+Mono:wght@400;700&display=swap');

        .amir-skill-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          padding: 32px 24px;
          text-align: center;
          transition: all 0.5s cubic-bezier(0.4,0,0.2,1);
          position: relative;
          overflow: hidden;
        }
        .amir-skill-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: #00E5FF;
          transform: scaleX(0);
          transition: transform 0.4s ease;
        }
        .amir-skill-card:hover::before { transform: scaleX(1); }
        .amir-skill-card:hover {
          background: rgba(0,229,255,0.04);
          border-color: rgba(0,229,255,0.3);
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.5);
        }

        .amir-project-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 0 !important;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.4,0,0.2,1);
        }
        .amir-project-card:hover {
          background: rgba(255,255,255,0.04);
          border-color: rgba(0,229,255,0.3);
          transform: translateY(-4px);
          box-shadow: 0 24px 48px rgba(0,0,0,0.6);
        }
        .amir-project-img {
          transition: transform 0.9s cubic-bezier(0.4,0,0.2,1);
        }
        .amir-project-card:hover .amir-project-img {
          transform: scale(1.08);
        }

        .amir-btn-primary {
          background: #00E5FF !important;
          color: #0A0A0F !important;
          border: none !important;
          font-weight: 700 !important;
          clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
          transition: all 0.3s !important;
        }
        .amir-btn-primary:hover {
          background: #B8FF57 !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,229,255,0.3) !important;
        }

        .amir-btn-outline {
          border-color: rgba(255,255,255,0.15) !important;
          color: #E8E8F0 !important;
          clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
          transition: all 0.3s !important;
        }
        .amir-btn-outline:hover {
          border-color: #00E5FF !important;
          color: #00E5FF !important;
        }

        .amir-social {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border: 1px solid rgba(255,255,255,0.1);
          color: #666;
          text-decoration: none;
          transition: all 0.3s;
          clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
        }
        .amir-social:hover {
          border-color: #00E5FF;
          color: #00E5FF;
          background: rgba(0,229,255,0.08);
        }

        .amir-tech-badge {
          font-family: 'Space Mono', monospace !important;
          font-size: 11px !important;
          background: rgba(255,255,255,0.05) !important;
          border: 1px solid rgba(255,255,255,0.1) !important;
          color: #888 !important;
          border-radius: 0 !important;
          letter-spacing: 1px;
        }

        .amir-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          opacity: 0.1;
        }

        .amir-grid-bg {
          background-image:
            linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,229,255,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        .amir-section-label {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          letter-spacing: 4px;
          color: #00E5FF;
          text-transform: uppercase;
          margin-bottom: 16px;
        }

        .amir-project-link {
          color: #00E5FF;
          text-decoration: none;
          font-size: 13px;
          letter-spacing: 1px;
          transition: color 0.3s;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .amir-project-link:hover { color: #B8FF57; }
      `}</style>

      {/* HERO SECTION */}
      <section className="amir-grid-bg relative py-20 px-4 overflow-hidden" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        {/* Glow orbs */}
        <div className="amir-glow" style={{ width: '500px', height: '500px', background: '#00E5FF', top: '-150px', right: '-150px', transform: `translate(${parallaxX * 0.5}px, ${parallaxY * 0.5}px)`, transition: 'transform 0.1s' }} />
        <div className="amir-glow" style={{ width: '350px', height: '350px', background: '#B8FF57', bottom: '-100px', left: '-100px', opacity: 0.06 }} />

        <div className="max-w-6xl mx-auto relative z-10 w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div className="text-right space-y-6">
              <div className="amir-section-label" style={{ justifyContent: 'flex-end', display: 'flex' }}>
                ✦ مطور ويب · مهندس شبكات
              </div>
              <h1 style={{ fontSize: 'clamp(48px, 9vw, 96px)', fontWeight: 900, lineHeight: 0.95, letterSpacing: '-2px', background: 'linear-gradient(135deg, #ffffff 0%, #00E5FF 50%, #B8FF57 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '24px' }}>
                مرحباً في<br />
                <span style={{ display: 'block', marginTop: '8px' }}>AMIR TECH</span>
              </h1>
              <p style={{ color: '#888', fontSize: '17px', lineHeight: '1.8' }}>
                مطور ويب متخصص في بناء تطبيقات حديثة وسريعة باستخدام أحدث التقنيات
              </p>
              <div className="flex gap-4 justify-end flex-wrap">
                <Button size="lg" className="amir-btn-primary" onClick={() => onNavigate('booking')}>
                  احجز زيارة
                </Button>
                <Button size="lg" variant="outline" className="amir-btn-outline" onClick={() => onNavigate('init-admin')}>
                  🚀 ابدأ الآن
                </Button>
              </div>

              {/* Social Icons */}
              <div className="flex gap-3 justify-end pt-2">
                <a href="https://wa.me/201552451705" target="_blank" rel="noopener noreferrer" className="amir-social" title="واتساب">
                  <WhatsAppIcon />
                </a>
                <a href="https://www.facebook.com/share/17vGQz8fBN/" target="_blank" rel="noopener noreferrer" className="amir-social" title="فيسبوك">
                  <FacebookIcon />
                </a>
                <a href="tel:+201552451705" className="amir-social" title="اتصل بنا">
                  <Phone className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Visual card */}
            <div className="relative" style={{ transform: `translate(${parallaxX * 0.3}px, ${parallaxY * 0.3}px)`, transition: 'transform 0.1s' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(0,229,255,0.2)', padding: '36px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, #00E5FF, transparent)' }} />
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '13px', lineHeight: '1.9', color: '#ccc' }}>
                  <div style={{ color: '#555', marginBottom: '12px' }}>{'// developer.profile'}</div>
                  <div><span style={{ color: '#C084FC' }}>const</span> <span style={{ color: '#00E5FF' }}>amir</span> = {'{'}</div>
                  <div style={{ paddingRight: '20px' }}>
                    <div><span style={{ color: '#B8FF57' }}>name</span>: <span style={{ color: '#FF6B6B' }}>"أمير أبو النجاه"</span>,</div>
                    <div><span style={{ color: '#B8FF57' }}>role</span>: <span style={{ color: '#FF6B6B' }}>"Full Stack Dev"</span>,</div>
                    <div><span style={{ color: '#B8FF57' }}>university</span>: <span style={{ color: '#FF6B6B' }}>"برج العرب"</span>,</div>
                    <div><span style={{ color: '#B8FF57' }}>skills</span>: [<span style={{ color: '#FF6B6B' }}>"React"</span>, <span style={{ color: '#FF6B6B' }}>"Node"</span>, <span style={{ color: '#FF6B6B' }}>"Networks"</span>],</div>
                    <div><span style={{ color: '#B8FF57' }}>available</span>: <span style={{ color: '#B8FF57' }}>true</span> ✦</div>
                  </div>
                  <div>{'}'}</div>
                </div>
                {/* Badge */}
                <div style={{ position: 'absolute', bottom: '-16px', left: '-12px', background: '#B8FF57', color: '#0A0A0F', padding: '8px 18px', fontFamily: "'Space Mono', monospace", fontSize: '11px', fontWeight: 700, letterSpacing: '1px', clipPath: 'polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)' }}>
                  OPEN TO WORK
                </div>
              </div>

              {/* Old workspace image below code card */}
              <div className="relative rounded-none overflow-hidden mt-6" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrc3BhY2UlMjBkZXZlbG9wZXJ8ZW58MXx8fHwxNzcxNDcyNzE2fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Workspace"
                  className="w-full object-cover"
                  style={{ height: '200px', filter: 'brightness(0.6) saturate(0.8)' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,15,0.9) 0%, transparent 60%)' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section style={{ background: 'rgba(0,229,255,0.03)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '48px 16px' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { num: '5+', label: 'مشاريع مكتملة' },
            { num: '2+', label: 'سنوات خبرة' },
            { num: '20', label: 'سنة عمر' },
            { num: '∞', label: 'شغف بالتطوير' },
          ].map((s, i) => (
            <div key={i}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '40px', fontWeight: 700, color: '#00E5FF', lineHeight: 1 }}>{s.num}</div>
              <div style={{ color: '#555', fontSize: '13px', marginTop: '8px', letterSpacing: '1px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="amir-section-label text-center">المهارات والخبرات</div>
          <h2 style={{ fontSize: '48px', fontWeight: 900, textAlign: 'center', marginBottom: '48px', lineHeight: 1 }}>
            ماذا أفعل <span style={{ color: '#00E5FF' }}>بشكل ممتاز</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: 'rgba(255,255,255,0.05)' }}>
            {skills.map((skill, index) => (
              <div key={index} className="amir-skill-card">
                <skill.icon className={`w-10 h-10 mx-auto mb-4 ${skill.color}`} />
                <h3 style={{ fontWeight: 700, fontSize: '17px', color: '#E8E8F0' }}>{skill.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="py-20 px-4" style={{ background: 'rgba(255,255,255,0.01)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="amir-section-label text-center">المشاريع المميزة</div>
          <h2 style={{ fontSize: '48px', fontWeight: 900, textAlign: 'center', marginBottom: '12px', lineHeight: 1 }}>
            أعمالي <span style={{ color: '#B8FF57' }}>السابقة</span>
          </h2>
          <p style={{ textAlign: 'center', color: '#666', marginBottom: '48px', fontSize: '16px' }}>
            مجموعة مختارة من أعمالي
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: 'rgba(255,255,255,0.05)' }}>
            {projects.map((project) => (
              <div key={project.id} className="amir-project-card group">
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="amir-project-img w-full h-full object-cover"
                    style={{ filter: 'brightness(0.7) saturate(0.8)' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,15,0.9) 0%, transparent 60%)' }} />
                </div>
                <div className="p-6">
                  <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '10px', color: '#E8E8F0' }}>{project.title}</h3>
                  <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.7', marginBottom: '20px' }}>{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.technologies.map((tech, idx) => (
                      <Badge key={idx} className="amir-tech-badge">{tech}</Badge>
                    ))}
                  </div>
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="amir-project-link">
                    عرض المشروع ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="amir-section-label text-center">نبذة عني</div>
          <h2 style={{ fontSize: '48px', fontWeight: 900, marginBottom: '24px', lineHeight: 1 }}>
            مطور شاب <span style={{ color: '#C084FC' }}>بعقل مهندس</span>
          </h2>
          <p style={{ color: '#777', fontSize: '17px', lineHeight: '1.9', marginBottom: '16px', maxWidth: '600px', margin: '0 auto 16px' }}>
            مطور ويب شغوف بخبرة أكثر من 5 سنوات في تطوير تطبيقات الويب الحديثة.
            أتخصص في بناء حلول قابلة للتوسع باستخدام React، Node.js، والتقنيات السحابية.
          </p>
          <p style={{ color: '#666', fontSize: '15px', lineHeight: '1.8', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
            أؤمن بقوة الكود النظيف والتصميم البسيط لإنشاء تجارب مستخدم استثنائية.
          </p>
          <Button size="lg" className="amir-btn-primary" onClick={() => onNavigate('booking')}>
            دعنا نعمل معاً
          </Button>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="py-16 px-4" style={{ background: 'rgba(0,229,255,0.03)', borderTop: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(0,229,255,0.05) 0%, transparent 70%)' }} />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="amir-section-label text-center">تواصل معي</div>
          <h2 style={{ fontSize: '40px', fontWeight: 900, marginBottom: '16px', lineHeight: 1 }}>
            هل لديك مشروع في ذهنك؟ <span style={{ color: '#00E5FF' }}>لنتحدث.</span>
          </h2>
          <p style={{ color: '#666', fontSize: '17px', lineHeight: '1.8', marginBottom: '40px' }}>
            دعنا نتحدث عن كيف يمكنني مساعدتك في تحقيق أهدافك
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="amir-btn-primary" onClick={() => onNavigate('booking')}>
              احجز موعد استشارة مجانية
            </Button>
            <a href="https://wa.me/201552451705" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="amir-btn-outline gap-2">
                <WhatsAppIcon />
                تواصل عبر واتساب
              </Button>
            </a>
          </div>
        </div>
      </section>

      /* {/* FOOTER */}
      {/* <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '28px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '14px', color: '#00E5FF', letterSpacing: '2px', fontWeight: 700 }}>
          AMIR.TECH
        </div>
        <div style={{ color: '#444', fontSize: '12px', fontFamily: "'Space Mono', monospace" }}>
          © 2025 · Amir Abu Al-Najah
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <a href="https://wa.me/201552451705" target="_blank" rel="noopener noreferrer" className="amir-social"><WhatsAppIcon /></a>
          <a href="https://www.facebook.com/share/17vGQz8fBN/" target="_blank" rel="noopener noreferrer" className="amir-social"><FacebookIcon /></a>
          <a href="tel:+201552451705" className="amir-social"><Phone className="w-5 h-5" /></a>
        </div>
      </footer> */ */}
    </div>
  );
};
