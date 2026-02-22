import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../lib/supabase';
import { publicAnonKey } from '/utils/supabase/info';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card } from '../components/ui/card';
import { Shield, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface InitAdminPageProps {
  onNavigate: (page: string) => void;
}

export const InitAdminPage: React.FC<InitAdminPageProps> = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // ✅ يخفي الصفحة لو فيه Admin
  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/auth/has-admin`);
        const data = await res.json();

        if (data.hasAdmin) {
          onNavigate('home');
        }
      } catch (err) {
        console.error('Admin check failed', err);
      }
    };

    checkAdmin();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error('الرجاء ملء جميع الحقول');
      return;
    }

    if (password.length < 6) {
      toast.error('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/init-admin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        toast.success('تم إنشاء حساب Admin بنجاح!');
      } else {
        toast.error(data.error || 'فشل إنشاء حساب Admin');
      }
    } catch (error) {
      console.error('Error creating admin:', error);
      toast.error('حدث خطأ أثناء الإنشاء');
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ بعد النجاح
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="p-8 text-center max-w-md">
          <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
          <h2 className="text-2xl font-bold mb-4">تم إنشاء الحساب بنجاح</h2>
          <Button onClick={() => onNavigate('auth')} className="w-full">
            تسجيل الدخول
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-6">
          <Shield className="w-16 h-16 mx-auto mb-4 text-primary" />
          <h1 className="text-3xl font-bold mb-2">إنشاء حساب Admin</h1>
          <p className="text-muted-foreground">
            هذه الصفحة لإنشاء أول أدمن فقط
          </p>
        </div>

        <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4 mb-6 flex gap-3">
          <AlertCircle className="w-5 h-5 text-orange-500" />
          <p className="text-sm text-muted-foreground">
            لن تظهر هذه الصفحة إذا كان هناك Admin بالفعل
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>الاسم الكامل</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div>
            <Label>البريد الإلكتروني</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              dir="ltr"
            />
          </div>

          <div>
            <Label>كلمة المرور</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'جاري الإنشاء...' : 'إنشاء Admin'}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <Button variant="ghost" onClick={() => onNavigate('home')}>
            العودة للرئيسية
          </Button>
        </div>
      </Card>
    </div>
  );
};