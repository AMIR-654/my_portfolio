import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { API_BASE_URL } from '../lib/supabase';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { User, Mail, Save, Shield, Loader2, Calendar, Clock, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';

interface ProfilePageProps {
  onNavigate: (page: string) => void;
}

interface Booking {
  id: string;
  date: string;
  time: string;
  notes: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate }) => {
  const { user, accessToken, refreshUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [isLoading, setIsLoading] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(true);

  useEffect(() => {
    if (user && accessToken) {
      fetchBookings();
    } else {
      setLoadingBookings(false);
    }
  }, [user, accessToken]);

  const fetchBookings = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/bookings/my`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setBookings(data.bookings.slice(0, 5)); // آخر 5 حجوزات
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoadingBookings(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="gap-1"><Clock className="w-3 h-3" /> قيد الانتظار</Badge>;
      case 'approved':
        return <Badge className="gap-1 bg-green-500"><CheckCircle className="w-3 h-3" /> مقبول</Badge>;
      case 'rejected':
        return <Badge variant="destructive" className="gap-1"><XCircle className="w-3 h-3" /> مرفوض</Badge>;
      default:
        return null;
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error('الرجاء إدخال الاسم');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ name }),
      });

      if (response.ok) {
        toast.success('تم تحديث الملف الشخصي بنجاح');
        await refreshUser();
      } else {
        toast.error('فشل تحديث الملف الشخصي');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('حدث خطأ أثناء التحديث');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="p-8 text-center max-w-md">
          <h2 className="text-2xl font-bold mb-4">يجب تسجيل الدخول أولاً</h2>
          <Button onClick={() => onNavigate('auth')} className="w-full">
            تسجيل الدخول
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">الملف الشخصي</h1>
          <p className="text-muted-foreground">إدارة معلومات حسابك</p>
        </div>

        <div className="space-y-6">
          {/* Profile Info Card */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              المعلومات الشخصية
            </h2>

            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">الاسم الكامل</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isLoading}
                  placeholder="أدخل اسمك الكامل"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <div className="relative">
                  <Mail className="absolute right-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={user.email}
                    disabled
                    className="pr-10 bg-muted"
                    dir="ltr"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  لا يمكن تغيير البريد الإلكتروني
                </p>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                    جاري الحفظ...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 ml-2" />
                    حفظ التغييرات
                  </>
                )}
              </Button>
            </form>
          </Card>

          {/* Account Info Card */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              معلومات الحساب
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b">
                <span className="text-muted-foreground">الصلاحية</span>
                <span className="font-semibold">
                  {user.role === 'admin' ? '🛡️ مدير' : '👤 مستخدم'}
                </span>
              </div>

              <div className="flex justify-between items-center py-3 border-b">
                <span className="text-muted-foreground">معرف المستخدم</span>
                <span className="font-mono text-sm">{user.id.slice(0, 8)}...</span>
              </div>

              <div className="flex justify-between items-center py-3">
                <span className="text-muted-foreground">حالة الحساب</span>
                <span className="text-green-500 font-semibold">✓ نشط</span>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">روابط سريعة</h2>
            <div className="grid gap-3">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => onNavigate('booking')}
              >
                📅 حجز موعد جديد
              </Button>
              {user.role === 'admin' && (
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => onNavigate('admin')}
                >
                  🛡️ لوحة تحكم الإدارة
                </Button>
              )}
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => onNavigate('home')}
              >
                🏠 الصفحة الرئيسية
              </Button>
            </div>
          </Card>

          {/* Recent Bookings */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              الحجوزات الأخيرة
            </h2>

            {loadingBookings ? (
              <div className="flex justify-center">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.length > 0 ? (
                  bookings.map((booking) => (
                    <div key={booking.id} className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">التاريخ: {booking.date}</p>
                        <p className="text-sm text-muted-foreground">الوقت: {booking.time}</p>
                      </div>
                      {getStatusBadge(booking.status)}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">لا توجد حجوزات</p>
                )}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};