import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Create Supabase clients
const supabaseAdmin = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

const supabaseClient = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_ANON_KEY') ?? '',
);

// Enable logger
app.use('*', logger(console.log));

// دالة مساعدة للحصول على key-value pairs بالبادئة
async function getKeyValuesByPrefix(prefix: string): Promise<Array<{key: string, value: any}>> {
  const supabaseAdmin = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
  );
  const { data, error } = await supabaseAdmin
    .from('kv_store_cf19bf36')
    .select('key, value')
    .like('key', `${prefix}%`);
  
  if (error) {
    throw new Error(error.message);
  }
  return data || [];
}

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Middleware للتحقق من المستخدم
async function requireAuth(c: any, next: any) {
  const accessToken = c.req.header('Authorization')?.split(' ')[1];
  if (!accessToken) {
    return c.json({ error: 'Unauthorized - No token provided' }, 401);
  }
  
  const { data: { user }, error } = await supabaseAdmin.auth.getUser(accessToken);
  if (error || !user) {
    console.log('Authorization error in requireAuth middleware:', error);
    return c.json({ error: 'Unauthorized - Invalid token' }, 401);
  }
  
  c.set('userId', user.id);
  c.set('userEmail', user.email);
  await next();
}

// Middleware للتحقق من Admin
async function requireAdmin(c: any, next: any) {
  const userId = c.get('userId');
  const adminData = await kv.get(`user:${userId}:role`);
  
  if (adminData !== 'admin') {
    return c.json({ error: 'Forbidden - Admin access required' }, 403);
  }
  
  await next();
}

// Health check endpoint
app.get("/make-server-cf19bf36/health", (c) => {
  return c.json({ status: "ok" });
});

// ============================================
// Auth Routes
// ============================================

// إنشاء أول مستخدم Admin (لأول مرة فقط)
app.post("/make-server-cf19bf36/auth/init-admin", async (c) => {
  try {
    const { email, password, name } = await c.req.json();
    
    if (!email || !password || !name) {
      return c.json({ error: 'Email, password, and name are required' }, 400);
    }
    
    // التحقق من عدم وجود مستخدمين
    const existingUsers = await kv.getByPrefix('user:');
    const userCount = existingUsers.filter((val: any, idx: number, arr: any[]) => {
      // Filter by checking if the value is a role
      return val === 'admin' || val === 'user';
    }).length;
    
    if (userCount > 0) {
      return c.json({ error: 'Admin user already exists. Use regular registration.' }, 400);
    }
    
    // إنشاء المستخدم
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      email_confirm: true,
    });
    
    if (error) {
      console.log('Error creating admin user:', error);
      return c.json({ error: error.message }, 400);
    }
    
    // حفظ معلومات إضافية مع صلاحية admin
    await kv.set(`user:${data.user.id}:role`, 'admin');
    await kv.set(`user:${data.user.id}:name`, name);
    await kv.set(`user:${data.user.id}:created_at`, new Date().toISOString());
    
    return c.json({ 
      message: 'Admin user created successfully!', 
      user: { id: data.user.id, email: data.user.email, name, role: 'admin' } 
    });
  } catch (error) {
    console.log('Unexpected error creating admin:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// تسجيل حساب جديد
app.post("/make-server-cf19bf36/auth/register", async (c) => {
  try {
    const { email, password, name } = await c.req.json();
    
    if (!email || !password || !name) {
      return c.json({ error: 'Email, password, and name are required' }, 400);
    }
    
    // إنشاء المستخدم
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      email_confirm: true, // تأكيد البريد تلقائياً
    });
    
    if (error) {
      console.log('Error creating user during registration:', error);
      return c.json({ error: error.message }, 400);
    }
    
    // حفظ معلومات إضافية
    await kv.set(`user:${data.user.id}:role`, 'user');
    await kv.set(`user:${data.user.id}:name`, name);
    await kv.set(`user:${data.user.id}:created_at`, new Date().toISOString());
    
    return c.json({ 
      message: 'User registered successfully', 
      user: { id: data.user.id, email: data.user.email, name } 
    });
  } catch (error) {
    console.log('Unexpected error during registration:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// تسجيل الدخول
app.post("/make-server-cf19bf36/auth/login", async (c) => {
  try {
    const { email, password } = await c.req.json();
    
    if (!email || !password) {
      return c.json({ error: 'Email and password are required' }, 400);
    }
    
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      console.log('Error during login:', error);
      return c.json({ error: error.message }, 401);
    }
    
    // جلب معلومات المستخدم
    const name = await kv.get(`user:${data.user.id}:name`);
    const role = await kv.get(`user:${data.user.id}:role`) || 'user';
    
    return c.json({ 
      message: 'Login successful',
      access_token: data.session.access_token,
      user: { 
        id: data.user.id, 
        email: data.user.email, 
        name,
        role
      } 
    });
  } catch (error) {
    console.log('Unexpected error during login:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// الحصول على معلومات المستخدم الحالي
app.get("/make-server-cf19bf36/auth/me", requireAuth, async (c) => {
  try {
    const userId = c.get('userId');
    const email = c.get('userEmail');
    
    const name = await kv.get(`user:${userId}:name`);
    const role = await kv.get(`user:${userId}:role`) || 'user';
    
    return c.json({ 
      user: { id: userId, email, name, role } 
    });
  } catch (error) {
    console.log('Error fetching user info:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// تحديث الملف الشخصي
app.put("/make-server-cf19bf36/auth/profile", requireAuth, async (c) => {
  try {
    const userId = c.get('userId');
    const { name } = await c.req.json();
    
    if (!name) {
      return c.json({ error: 'Name is required' }, 400);
    }
    
    await kv.set(`user:${userId}:name`, name);
    
    return c.json({ message: 'Profile updated successfully', name });
  } catch (error) {
    console.log('Error updating profile:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// ============================================
// Bookings Routes
// ============================================

// إنشاء حجز جديد
app.post("/make-server-cf19bf36/bookings", requireAuth, async (c) => {
  try {
    const userId = c.get('userId');
    const { date, time, notes } = await c.req.json();
    
    if (!date || !time) {
      return c.json({ error: 'Date and time are required' }, 400);
    }
    
    // التحقق من عدم وجود حجز في نفس الوقت
    const existingBookings = await kv.getByPrefix('booking:');
    const conflictBooking = existingBookings.find((booking: any) => 
      booking.date === date && booking.time === time && booking.status !== 'rejected'
    );
    
    if (conflictBooking) {
      return c.json({ error: 'This time slot is already booked' }, 409);
    }
    
    const bookingId = crypto.randomUUID();
    const booking = {
      id: bookingId,
      userId,
      date,
      time,
      notes: notes || '',
      status: 'pending', // pending, approved, rejected
      createdAt: new Date().toISOString(),
    };
    
    await kv.set(`booking:${bookingId}`, booking);
    await kv.set(`user:${userId}:bookings:${bookingId}`, bookingId);
    
    return c.json({ message: 'Booking created successfully', booking });
  } catch (error) {
    console.log('Error creating booking:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// الحصول على جميع حجوزات المستخدم
app.get("/make-server-cf19bf36/bookings/my", requireAuth, async (c) => {
  try {
    const userId = c.get('userId');
    
    const userBookingIds = await kv.getByPrefix(`user:${userId}:bookings:`);
    const bookingPromises = userBookingIds.map((id: string) => kv.get(`booking:${id}`));
    const bookings = await Promise.all(bookingPromises);
    
    // ترتيب حسب التاريخ (الأحدث أولاً)
    const sortedBookings = bookings
      .filter(b => b !== null)
      .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    return c.json({ bookings: sortedBookings });
  } catch (error) {
    console.log('Error fetching user bookings:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// الحصول على جميع الحجوزات (Admin فقط)
app.get("/make-server-cf19bf36/bookings", requireAuth, requireAdmin, async (c) => {
  try {
    const allBookings = await kv.getByPrefix('booking:');
    
    // جلب أسماء المستخدمين
    const bookingsWithUserNames = await Promise.all(
      allBookings.map(async (booking: any) => {
        const userName = await kv.get(`user:${booking.userId}:name`);
        // جلب البريد الإلكتروني من Supabase
        const { data: userData } = await supabaseAdmin.auth.admin.getUserById(booking.userId);
        return { ...booking, userName, userEmail: userData?.user?.email || 'N/A' };
      })
    );
    
    // ترتيب حسب التاريخ (الأحدث أولاً)
    const sortedBookings = bookingsWithUserNames
      .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    return c.json({ bookings: sortedBookings });
  } catch (error) {
    console.log('Error fetching all bookings:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// تحديث حالة الحجز (Admin فقط)
app.put("/make-server-cf19bf36/bookings/:id", requireAuth, requireAdmin, async (c) => {
  try {
    const bookingId = c.req.param('id');
    const { status } = await c.req.json();
    
    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return c.json({ error: 'Invalid status' }, 400);
    }
    
    const booking = await kv.get(`booking:${bookingId}`);
    if (!booking) {
      return c.json({ error: 'Booking not found' }, 404);
    }
    
    const updatedBooking = { ...booking, status };
    await kv.set(`booking:${bookingId}`, updatedBooking);
    
    return c.json({ message: 'Booking status updated successfully', booking: updatedBooking });
  } catch (error) {
    console.log('Error updating booking status:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// حذف حجز
app.delete("/make-server-cf19bf36/bookings/:id", requireAuth, async (c) => {
  try {
    const bookingId = c.req.param('id');
    const userId = c.get('userId');
    const userRole = await kv.get(`user:${userId}:role`);
    
    const booking = await kv.get(`booking:${bookingId}`);
    if (!booking) {
      return c.json({ error: 'Booking not found' }, 404);
    }
    
    // فقط المستخدم صاحب الحجز أو Admin يمكنه الحذف
    if (booking.userId !== userId && userRole !== 'admin') {
      return c.json({ error: 'Forbidden' }, 403);
    }
    
    await kv.del(`booking:${bookingId}`);
    await kv.del(`user:${booking.userId}:bookings:${bookingId}`);
    
    return c.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.log('Error deleting booking:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// ============================================
// Admin Routes
// ============================================

// الحصول على إحصائيات Dashboard
app.get("/make-server-cf19bf36/admin/stats", requireAuth, requireAdmin, async (c) => {
  try {
    const allUsersKV = await getKeyValuesByPrefix('user:');
    const allBookings = await kv.getByPrefix('booking:');
    
    // عدد المستخدمين الفريد
    const userIds = new Set();
    allUsersKV.forEach((item: any) => {
      if (item.key.includes(':role')) {
        const userId = item.key.split(':')[1];
        userIds.add(userId);
      }
    });
    
    const totalUsers = userIds.size;
    const totalBookings = allBookings.length;
    const pendingBookings = allBookings.filter((b: any) => b.status === 'pending').length;
    const approvedBookings = allBookings.filter((b: any) => b.status === 'approved').length;
    const rejectedBookings = allBookings.filter((b: any) => b.status === 'rejected').length;
    
    return c.json({
      stats: {
        totalUsers,
        totalBookings,
        pendingBookings,
        approvedBookings,
        rejectedBookings,
      }
    });
  } catch (error) {
    console.log('Error fetching admin stats:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// الحصول على جميع المستخدمين (Admin فقط)
app.get("/make-server-cf19bf36/admin/users", requireAuth, requireAdmin, async (c) => {
  try {
    const allUsersKV = await getKeyValuesByPrefix('user:');
    
    const users = [];
    const processedUserIds = new Set();
    
    for (const item of allUsersKV) {
      if (item.key.includes(':role')) {
        const userId = item.key.split(':')[1];
        if (!processedUserIds.has(userId)) {
          processedUserIds.add(userId);
          
          const name = await kv.get(`user:${userId}:name`);
          const role = item.value;
          const createdAt = await kv.get(`user:${userId}:created_at`);
          
          // جلب البريد الإلكتروني من Supabase
          const { data: userData } = await supabaseAdmin.auth.admin.getUserById(userId);
          
          users.push({
            id: userId,
            email: userData?.user?.email || 'N/A',
            name,
            role,
            createdAt,
          });
        }
      }
    }
    
    return c.json({ users });
  } catch (error) {
    console.log('Error fetching users:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// تحديث دور المستخدم (Admin فقط)
app.put("/make-server-cf19bf36/admin/users/:id/role", requireAuth, requireAdmin, async (c) => {
  try {
    const targetUserId = c.req.param('id');
    const { role } = await c.req.json();
    
    if (!['user', 'admin'].includes(role)) {
      return c.json({ error: 'Invalid role' }, 400);
    }
    
    await kv.set(`user:${targetUserId}:role`, role);
    
    return c.json({ message: 'User role updated successfully' });
  } catch (error) {
    console.log('Error updating user role:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

Deno.serve(app.fetch);