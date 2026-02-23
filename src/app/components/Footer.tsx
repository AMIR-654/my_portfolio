export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-3">كود ويب برو</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              منصة احترافية لعرض الأعمال وحجز المواعيد. نقدم خدمات تطوير الويب والاستشارات التقنية.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-3">روابط سريعة</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary">الرئيسية</a></li>
              <li><a href="#projects" className="text-muted-foreground hover:text-primary">المشاريع</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">حجز موعد</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">تواصل معنا</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-bold text-lg mb-3">تواصل معنا</h3>
            <div className="flex gap-4 mb-4">

              <a
                href="https://wa.me/201552451705"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-muted hover:bg-green-500 hover:text-white"
              >
                <WhatsAppIcon />
              </a>

              <a
                href="https://www.facebook.com/share/17vGQz8fBN/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-muted hover:bg-blue-600 hover:text-white"
              >
                <FacebookIcon />
              </a>

              <a
                href="tel:+201552451705"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-muted hover:bg-primary hover:text-white"
              >
                <Phone className="w-5 h-5" />
              </a>

            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t mt-8 pt-6 text-center">
          <p className="text-sm text-muted-foreground">
            تم التصميم بواسطة أمير أبو النجاه • {currentYear} © جميع الحقوق محفوظة
          </p>
        </div>
      </div>
    </footer>
  );
};
