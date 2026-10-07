// client/src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { demoAccounts } from '../services/mockData';
import { apiClient } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('smart_clinic_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fall through
      }
    }
    // Default demo user is Patient
    return demoAccounts[0];
  });

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('smart_clinic_user', JSON.stringify(currentUser));
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem('smart_clinic_user');
      setIsAuthenticated(false);
    }
  }, [currentUser]);

  const login = async (email, password) => {
    // Try backend auth API
    const res = await apiClient.post('/auth/login', { email });
    if (res && res.success && res.user) {
      setCurrentUser(res.user);
      return { success: true, user: res.user };
    }

    // Fallback: check demoAccounts by email
    const found = demoAccounts.find(u => u.email.toLowerCase() === (email || '').toLowerCase());
    if (found) {
      setCurrentUser(found);
      return { success: true, user: found };
    }

    // If matching by role prefix
    const roleMatch = demoAccounts.find(u => u.role === (email || '').toLowerCase());
    if (roleMatch) {
      setCurrentUser(roleMatch);
      return { success: true, user: roleMatch };
    }

    return { success: false, message: 'Invalid credentials. Use demo buttons or demo emails.' };
  };

  const switchDemoRole = (role) => {
    const account = demoAccounts.find(u => u.role === role);
    if (account) {
      setCurrentUser(account);
      return account;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('smart_clinic_user');
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        role: currentUser?.role || 'guest',
        isAuthenticated,
        login,
        switchDemoRole,
        logout,
        demoAccounts
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
