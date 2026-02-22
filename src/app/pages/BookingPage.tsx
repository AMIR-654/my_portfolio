import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { API_BASE_URL } from '../lib/supabase';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card } from '../components/ui/card';
import { Calendar, Clock, Save, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '../components/ui/badge';

interface BookingPageProps {
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

export const BookingPage: React.FC<BookingPageProps> = ({ onNavigate }) => {
  // const { user, accessToken } = useAuth();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [myBookings, setMyBookings] = useState<Booking[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(true);

 const { user, accessToken, loading } = useAuth();

useEffect(() => {
  if (!loading && user && accessToken) {
    fetchMyBookings();
  }
}, [loading, user, accessToken]);

  

  const fetchMyBookings = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/bookings/my`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setMyBookings(data.bookings);
      } else {
        console.error('Failed to fetch bookings');
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoadingBookings(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error('الرجاء تسجيل الدخول أولاً');
      onNavigate('auth');
      return;
    }

    if (!date || !time) {
      toast.error('الرجاء اختيار التاريخ والوقت');
      return;
    }

    // التحقق من أن التاريخ في المستقبل
    const selectedDate = new Date(`${date}T${time}`);
    if (selectedDate < new Date()) {
      toast.error('لا يمكن الحجز في الماضي');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ date, time, notes }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('تم إنشاء الحجز بنجاح!');
        setDate('');
        setTime('');
        setNotes('');
        fetchMyBookings();
      } else {
        toast.error(data.error || 'فشل إنشاء الحجز');
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      toast.error('حدث خطأ أثناء إنشاء الحجز');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteBooking = async (bookingId: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا الحجز؟')) return;

    try {
      const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        toast.success('تم حذف الحجز بنجاح');
        fetchMyBookings();
      } else {
        toast.error('فشل حذف الحجز');
      }
    } catch (error) {
      console.error('Error deleting booking:', error);
      toast.error('حدث خطأ أثناء حذف الحجز');
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

  const formatDateTime = (date: string, time: string) => {
    return `${date} الساعة ${time}`;
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="p-8 text-center max-w-md">
          <h2 className="text-2xl font-bold mb-4">يجب تسجيل الدخول أولاً</h2>
          <p className="text-muted-foreground mb-6">
            للوصول إلى نظام الحجوزات، يرجى تسجيل الدخول أو إنشاء حساب جديد
          </p>
          <Button onClick={() => onNavigate('auth')} className="w-full">
            تسجيل الدخول
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">نظام حجز الزيارات</h1>
          <p className="text-lg text-muted-foreground">
            احجز موعد استشارة شخصية معي
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Booking Form */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-primary" />
              حجز موعد جديد
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="date">التاريخ</Label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">الوقت</Label>
                <Input
                  id="time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">ملاحظات (اختياري)</Label>
                <Textarea
                  id="notes"
                  placeholder="اكتب أي ملاحظات أو تفاصيل إضافية هنا..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  disabled={isLoading}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                    جاري الحجز...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 ml-2" />
                    تأكيد الحجز
                  </>
                )}
              </Button>
            </form>
          </Card>

          {/* My Bookings */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">حجوزاتي</h2>
            {loadingBookings ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : myBookings.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>لا توجد حجوزات حتى الآن</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {myBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold">
                          {formatDateTime(booking.date, booking.time)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          تم الإنشاء: {new Date(booking.createdAt).toLocaleDateString('ar-EG')}
                        </p>
                      </div>
                      {getStatusBadge(booking.status)}
                    </div>
                    {booking.notes && (
                      <p className="text-sm text-muted-foreground mt-2 p-2 bg-muted rounded">
                        {booking.notes}
                      </p>
                    )}
                    <div className="mt-3 flex gap-2">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteBooking(booking.id)}
                      >
                        حذف
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};
