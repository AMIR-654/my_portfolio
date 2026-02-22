import React, { createContext, useContext, useState, useEffect } from 'react';
import { API_BASE_URL } from '../lib/supabase';
import { publicAnonKey } from '/utils/supabase/info';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  accessToken: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // ================================
  // Restore session after refresh
  // ================================
  useEffect(() => {
    const restoreSession = () => {
      try {
        const token = localStorage.getItem('access_token');
        const savedUser = localStorage.getItem('user');

        if (token && savedUser) {
          setAccessToken(token);
          setUser(JSON.parse(savedUser));
        }
      } catch (err) {
        console.error('Session restore error:', err);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  // ================================
  // Fetch user from backend
  // ================================
  const fetchUserInfo = async (token: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Unauthorized');

      const data = await res.json();

      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
    } catch (err) {
      console.error('Fetch user failed:', err);
      logout();
    }
  };

  // ================================
  // LOGIN
  // ================================
  const login = async (email: string, password: string) => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'فشل تسجيل الدخول');
    }

    // Save in state
    setAccessToken(data.access_token);
    setUser(data.user);

    // Save in storage (important)
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('user', JSON.stringify(data.user));
  };

  // ================================
  // REGISTER
  // ================================
  const register = async (email: string, password: string, name: string) => {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify({ email, password, name }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'فشل إنشاء الحساب');
    }

    // Auto login
    await login(email, password);
  };

  // ================================
  // LOGOUT
  // ================================
  const logout = () => {
    setUser(null);
    setAccessToken(null);

    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
  };

  // ================================
  // Refresh user manually
  // ================================
  const refreshUser = async () => {
    if (accessToken) {
      await fetchUserInfo(accessToken);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        refreshUser,
        accessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ================================
// Hook
// ================================
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};