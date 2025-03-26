import { defineStore } from 'pinia';
import axios from '@/utils/axios';
import type { User } from '@/types';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: localStorage.getItem('token') || ''
  }),

  actions: {
    async login(email: string, password: string) {
      try {
        const response = await axios.post('/login', { email, password });
        
        if (response.data.token) {
          this.token = response.data.token;
          this.user = response.data.user;
          localStorage.setItem('token', this.token);
          return { success: true };
        }
        return { success: false, error: 'Invalid credentials' };
      } catch (error: any) {
        console.error('Login error:', error.response?.data);
        return { 
          success: false, 
          error: error.response?.data?.message || 'Login failed. Please try again.' 
        };
      }
    },

    async register(userData: any) {
      try {
        const response = await axios.post('/register', userData);
        
        if (response.data.token) {
          this.token = response.data.token;
          this.user = response.data.user;
          localStorage.setItem('token', this.token);
          return { success: true };
        }
        return { success: false, error: 'Registration failed' };
      } catch (error: any) {
        console.error('Registration error:', error.response?.data);
        return { 
          success: false, 
          error: error.response?.data?.message || 'Registration failed. Please try again.' 
        };
      }
    },

    logout() {
      this.user = null;
      this.token = '';
      localStorage.removeItem('token');
    }
  }
});
