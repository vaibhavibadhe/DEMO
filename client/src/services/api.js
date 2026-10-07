// client/src/services/api.js - Central API connector with resilient fallback
const API_BASE = window.location.port === '5173' ? '/api' : 'http://localhost:5000/api';

export const apiClient = {
  async get(endpoint, role) {
    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...(role ? { 'x-user-role': role } : {})
        }
      });
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn(`[API] Server unavailable for GET ${endpoint}. Using local state.`);
      return null;
    }
  },

  async post(endpoint, data, role) {
    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(role ? { 'x-user-role': role } : {})
        },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn(`[API] Server unavailable for POST ${endpoint}. Using local state.`);
      return null;
    }
  },

  async patch(endpoint, data, role) {
    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(role ? { 'x-user-role': role } : {})
        },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn(`[API] Server unavailable for PATCH ${endpoint}. Using local state.`);
      return null;
    }
  }
};
