# AMIR PLATFORM

منصة ويب شخصية متكاملة مع نظام حسابات احترافي ونظام حجز زيارات.

## المميزات

### 🎨 Frontend
- واجهة مستخدم عربية RTL حديثة
- دعم Dark Mode
- تصميم متجاوب (Responsive)
- React + TypeScript
- Tailwind CSS
- Radix UI Components

### 🔐 نظام الحسابات
- تسجيل مستخدمين جدد
- تسجيل الدخول
- JWT Sessions
- Supabase Authentication
- صفحة الملف الشخصي

### 📅 نظام الحجوزات
- حجز مواعيد زيارات
- اختيار التاريخ والوقت
- منع تعارض المواعيد
- عرض حجوزات المستخدم
- حذف الحجوزات

### 🛡️ لوحة تحكم Admin
- إحصائيات شاملة
- عرض جميع الحجوزات
- قبول/رفض الحجوزات
- إدارة المستخدمين
- تغيير صلاحيات المستخدمين

### 🎯 Portfolio
- نبذة شخصية
- عرض المهارات
- عرض المشاريع
- روابط التواصل الاجتماعي

## البنية التقنية

```
/src/app
  /components      # مكونات React
    /ui           # مكونات UI (Buttons, Cards, etc.)
    Navigation.tsx
    Footer.tsx
  /contexts       # React Contexts
    AuthContext.tsx
  /lib            # مكتبات مساعدة
    supabase.ts
  /pages          # صفحات التطبيق
    HomePage.tsx
    AuthPage.tsx
    BookingPage.tsx
    AdminPage.tsx
    ProfilePage.tsx
  App.tsx

/supabase/functions/server
  index.tsx       # Hono Server + API Routes
  kv_store.tsx    # قاعدة بيانات KV

/src/styles       # ملفات CSS
```

## API Endpoints

### Auth
- `POST /auth/register` - تسجيل مستخدم جديد
- `POST /auth/login` - تسجيل الدخول
- `GET /auth/me` - الحصول على معلومات المستخدم
- `PUT /auth/profile` - تحديث الملف الشخصي

### Bookings
- `POST /bookings` - إنشاء حجز جديد
- `GET /bookings/my` - حجوزات المستخدم
- `GET /bookings` - جميع الحجوزات (Admin)
- `PUT /bookings/:id` - تحديث حالة الحجز (Admin)
- `DELETE /bookings/:id` - حذف حجز

### Admin
- `GET /admin/stats` - إحصائيات Dashboard
- `GET /admin/users` - جميع المستخدمين
- `PUT /admin/users/:id/role` - تحديث صلاحيات المستخدم

## البدء

### متطلبات التشغيل
- حساب Supabase نشط
- Node.js 18+

### حساب تجريبي Admin

لإنشاء أول مستخدم Admin:

1. **الطريقة الأولى (من الواجهة):**
   - افتح المنصة
   - اضغط على "تسجيل الدخول"
   - اضغط على "إنشاء أول مستخدم Admin" في الأسفل
   - املأ البيانات وسيتم إنشاء حساب Admin تلقائياً

2. **الطريقة الثانية (من خلال API):**
   ```bash
   curl -X POST https://YOUR_PROJECT.supabase.co/functions/v1/make-server-cf19bf36/auth/init-admin \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_ANON_KEY" \
     -d '{"email":"admin@test.com","password":"password123","name":"Admin"}'
   ```

**ملاحظة:** هذا يعمل فقط إذا لم يكن هناك مستخدمين في النظام.

### خطوات الإعداد

1. **ربط المشروع بـ Supabase**
   - المشروع مربوط تلقائياً
   - Supabase Edge Functions نشطة

2. **تشغيل التطبيق**
   ```bash
   npm run build
   ```

3. **إنشاء حساب Admin**
   - سجل حساب جديد من الواجهة
   - في أول مرة، قم بإنشاء حساب `admin@test.com`
   - بعد التسجيل، سيتم تعيينه كـ Admin تلقائياً (إذا كان أول مستخدم)

## الأمان

- ✅ JWT Authentication
- ✅ Protected Routes
- ✅ Role-based Access Control (RBAC)
- ✅ Supabase Row Level Security
- ✅ Environment Variables
- ✅ CORS Configuration
- ✅ Input Validation

## التقنيات المستخدمة

### Frontend
- React 18
- TypeScript
- Tailwind CSS v4
- Radix UI
- React Router
- Next Themes (Dark Mode)
- Sonner (Toasts)
- Lucide React (Icons)

### Backend
- Hono Web Framework
- Supabase (Database + Auth + Edge Functions)
- Deno Runtime

## المساهمة

هذا مشروع شخصي، لكن يمكنك استخدامه كقالب لمشاريعك الخاصة.

## الترخيص

MIT License - يمكنك استخدام وتعديل الكود بحرية.

## التواصل

- Email: contact@amirplatform.com
- GitHub: [github.com](https://github.com)
- LinkedIn: [linkedin.com](https://linkedin.com)

---

صُنع بـ ❤️ في 2026