import React from 'react';
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
    { name: 'Frontend Development', icon: Code2, color: 'text-blue-500' },
    { name: 'UI/UX Design', icon: Palette, color: 'text-purple-500' },
    { name: 'Backend Development', icon: Database, color: 'text-green-500' },
    { name: 'DevOps & Deployment', icon: Rocket, color: 'text-orange-500' },
  ];

  return (
    <div className="min-h-screen">
      {/* Slow animation styles */}
      <style>{`
        .slow-scale {
          transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1),
                      box-shadow 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .slow-scale:hover {
          transform: scale(1.04);
          box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
        }
        .slow-img-zoom img,
        .slow-img-zoom {
          transition: transform 0.9s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .slow-img-zoom:hover img,
        .group:hover .slow-img-zoom {
          transform: scale(1.08);
        }
        .slow-color {
          transition: color 0.6s ease;
        }
        .slow-color:hover {
          color: var(--primary);
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-primary/10 via-background to-background overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-right space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold">
                مرحباً بك في
                <span className="block text-primary mt-2">AMIR TECH  </span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                مطور ويب متخصص في بناء تطبيقات حديثة وسريعة باستخدام أحدث التقنيات
              </p>
              <div className="flex gap-4 justify-end">
                <Button size="lg" onClick={() => onNavigate('booking')}>
                  احجز زيار
                </Button>
                <Button size="lg" variant="outline" onClick={() => onNavigate('init-admin')}>
                  🚀 ابدأ الآن
                </Button>
              </div>

              {/* Social Icons */}
              <div className="flex gap-5 justify-end pt-4">
                {/* WhatsApp */}
                <a
                  href="https://wa.me/201552451705"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="slow-color text-muted-foreground hover:text-green-500"
                  title="واتساب"
                >
                  <WhatsAppIcon />
                </a>

                {/* Facebook */}
                <a
                  href="https://www.facebook.com/share/17vGQz8fBN/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="slow-color text-muted-foreground hover:text-blue-600"
                  title="فيسبوك"
                >
                  <FacebookIcon />
                </a>

                {/* Phone */}
                <a
                  href="tel:+201552451705"
                  className="slow-color text-muted-foreground hover:text-primary"
                  title="اتصل بنا: 01552451705"
                >
                  <Phone className="w-6 h-6" />
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl slow-scale">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrc3BhY2UlMjBkZXZlbG9wZXJ8ZW58MXx8fHwxNzcxNDcyNzE2fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Workspace"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">المهارات والخبرات</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <Card
                key={index}
                className="p-6 text-center slow-scale cursor-default"
                style={{ transition: 'box-shadow 0.8s ease, transform 0.8s ease' }}
              >
                <skill.icon className={`w-12 h-12 mx-auto mb-4 ${skill.color}`} />
                <h3 className="font-semibold text-lg">{skill.name}</h3>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">المشاريع المميزة</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            مجموعة مختارة من أعمالي السابقة
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card
                key={project.id}
                className="overflow-hidden group"
                style={{ transition: 'box-shadow 0.8s ease' }}
              >
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover slow-img-zoom"
                    style={{ transition: 'transform 0.9s cubic-bezier(0.4, 0, 0.2, 1)' }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, idx) => (
                      <Badge key={idx} variant="secondary">{tech}</Badge>
                    ))}
                  </div>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary slow-color"
                  >
                    عرض المشروع
                  </a>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">نبذة عني</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            مطور ويب شغوف بخبرة أكثر من 5 سنوات في تطوير تطبيقات الويب الحديثة.
            أتخصص في بناء حلول قابلة للتوسع باستخدام React، Node.js، والتقنيات السحابية.
            أؤمن بقوة الكود النظيف والتصميم البسيط لإنشاء تجارب مستخدم استثنائية.
          </p>
          <Button size="lg" onClick={() => onNavigate('booking')}>
            دعنا نعمل معاً
          </Button>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 px-4 bg-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">هل لديك مشروع في ذهنك؟</h2>
          <p className="text-lg text-muted-foreground mb-8">
            دعنا نتحدث عن كيف يمكنني مساعدتك في تحقيق أهدافك
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" onClick={() => onNavigate('booking')}>
              احجز موعد استشارة مجانية
            </Button>
            <a href="https://wa.me/201552451705" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="gap-2">
                <WhatsAppIcon />
                تواصل عبر واتساب
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};