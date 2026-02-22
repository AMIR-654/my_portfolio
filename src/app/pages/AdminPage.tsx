import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { API_BASE_URL } from '../lib/supabase';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
  Users,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  Loader2,
  Shield,
  User,
} from 'lucide-react';
import { toast } from 'sonner';

interface AdminPageProps {
  onNavigate: (page: string) => void;
}

interface Stats {
  totalUsers: number;
  totalBookings: number;
  pendingBookings: number;
  approvedBookings: number;
  rejectedBookings: number;
}

interface Booking {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  date: string;
  time: string;
  notes: string;
  status: string;
  createdAt: string;
}

interface UserData {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: string;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigate }) => {
  const { user, accessToken } = useAuth();
  const [stats, setStats] = useState<Stats | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    if (user?.role === 'admin' && accessToken) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [user, accessToken]);

  const fetchData = async () => {
    try {
      const [statsRes, bookingsRes, usersRes] = await Promise.all([
        fetch(`${API_BASE_URL}/admin/stats`, {
          headers: { 'Authorization': `Bearer ${accessToken}` },
        }),
        fetch(`${API_BASE_URL}/bookings`, {
          headers: { 'Authorization': `Bearer ${accessToken}` },
        }),
        fetch(`${API_BASE_URL}/admin/users`, {
          headers: { 'Authorization': `Bearer ${accessToken}` },
        }),
      ]);

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData.stats);
      }

      if (bookingsRes.ok) {
        const bookingsData = await bookingsRes.json();
        setBookings(bookingsData.bookings);
      }

      if (usersRes.ok) {
        const usersData = await usersRes.json();
        setUsers(usersData.users);
      }
    } catch (error) {
      console.error('Error fetching admin data:', error);
      toast.error('فشل تحميل البيانات');
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId: string, status: string) => {
    setActionLoading(bookingId);
    try {
      const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        toast.success(`تم ${status === 'approved' ? 'قبول' : 'رفض'} الحجز`);
        fetchData();
      } else {
        toast.error('فشل تحديث حالة الحجز');
      }
    } catch (error) {
      console.error('Error updating booking:', error);
      toast.error('حدث خطأ أثناء التحديث');
    } finally {
      setActionLoading(null);
    }
  };

  const updateUserRole = async (userId: string, role: string) => {
    setActionLoading(userId);
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users/${userId}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ role }),
      });

      if (response.ok) {
        toast.success('تم تحديث صلاحيات المستخدم');
        fetchData();
      } else {
        toast.error('فشل تحديث الصلاحيات');
      }
    } catch (error) {
      console.error('Error updating user role:', error);
      toast.error('حدث خطأ أثناء التحديث');
    } finally {
      setActionLoading(null);
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

  if (user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="p-8 text-center max-w-md">
          <XCircle className="w-16 h-16 mx-auto mb-4 text-destructive" />
          <h2 className="text-2xl font-bold mb-4">غير مصرح</h2>
          <p className="text-muted-foreground mb-6">
            ليس لديك صلاحيات للوصول إلى لوحة التحكم
          </p>
          <Button onClick={() => onNavigate('home')} className="w-full">
            العودة للرئيسية
          </Button>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="w-8 h-8 text-primary" />
          <h1 className="text-4xl font-bold">لوحة تحكم الإدارة</h1>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <Card className="p-6">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-blue-500" />
                <div>
                  <p className="text-sm text-muted-foreground">المستخدمين</p>
                  <p className="text-2xl font-bold">{stats.totalUsers}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3">
                <Calendar className="w-8 h-8 text-purple-500" />
                <div>
                  <p className="text-sm text-muted-foreground">إجمالي الحجوزات</p>
                  <p className="text-2xl font-bold">{stats.totalBookings}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3">
                <Clock className="w-8 h-8 text-orange-500" />
                <div>
                  <p className="text-sm text-muted-foreground">قيد الانتظار</p>
                  <p className="text-2xl font-bold">{stats.pendingBookings}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-green-500" />
                <div>
                  <p className="text-sm text-muted-foreground">مقبولة</p>
                  <p className="text-2xl font-bold">{stats.approvedBookings}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3">
                <XCircle className="w-8 h-8 text-red-500" />
                <div>
                  <p className="text-sm text-muted-foreground">مرفوضة</p>
                  <p className="text-2xl font-bold">{stats.rejectedBookings}</p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Tabs */}
        <Tabs defaultValue="bookings" dir="rtl">
          <TabsList className="mb-6">
            <TabsTrigger value="bookings">
              <Calendar className="w-4 h-4 ml-2" />
              إدارة الحجوزات
            </TabsTrigger>
            <TabsTrigger value="users">
              <Users className="w-4 h-4 ml-2" />
              إدارة المستخدمين
            </TabsTrigger>
          </TabsList>

          {/* Bookings Tab */}
          <TabsContent value="bookings">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">جميع الحجوزات</h2>
              {bookings.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>لا توجد حجوزات</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                    >
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <p className="font-semibold mb-1">{booking.userName}</p>
                          <p className="text-sm text-muted-foreground">{booking.userEmail}</p>
                          <p className="text-sm text-muted-foreground mt-2">
                            {booking.date} • {booking.time}
                          </p>
                        </div>
                        <div>
                          {booking.notes && (
                            <div className="bg-muted p-3 rounded text-sm">
                              <p className="font-semibold mb-1">الملاحظات:</p>
                              <p>{booking.notes}</p>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col gap-2">
                          {getStatusBadge(booking.status)}
                          {booking.status === 'pending' && (
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() => updateBookingStatus(booking.id, 'approved')}
                                disabled={actionLoading === booking.id}
                                className="flex-1 bg-green-500 hover:bg-green-600"
                              >
                                {actionLoading === booking.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => updateBookingStatus(booking.id, 'rejected')}
                                disabled={actionLoading === booking.id}
                                className="flex-1"
                              >
                                {actionLoading === booking.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <XCircle className="w-4 h-4" />}
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">جميع المستخدمين</h2>
              {users.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>لا يوجد مستخدمين</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {users.map((userData) => (
                    <div
                      key={userData.id}
                      className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <User className="w-10 h-10 p-2 bg-primary/10 rounded-full text-primary" />
                          <div>
                            <p className="font-semibold">{userData.name}</p>
                            <p className="text-sm text-muted-foreground">{userData.email}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              انضم: {new Date(userData.createdAt).toLocaleDateString('ar-EG')}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={userData.role === 'admin' ? 'default' : 'secondary'}>
                            {userData.role === 'admin' ? 'مدير' : 'مستخدم'}
                          </Badge>
                          {userData.id !== user.id && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateUserRole(
                                userData.id,
                                userData.role === 'admin' ? 'user' : 'admin'
                              )}
                              disabled={actionLoading === userData.id}
                            >
                              {actionLoading === userData.id ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                userData.role === 'admin' ? 'إزالة الصلاحية' : 'ترقية لمدير'
                              )}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
