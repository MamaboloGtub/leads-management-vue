import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('authToken') || null,
    user: null,
    loading: false,
    error: null,
    loginFailureReason: null,
    lastLoginAttempt: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    currentUser: (state) => state.user,
    hasLoginFailure: (state) => !!state.loginFailureReason,
  },

  actions: {
    async login(credentials) {
      this.loading = true
      this.error = null
      this.loginFailureReason = null
      this.lastLoginAttempt = new Date().toISOString()

      try {
        console.log('Attempting login with:', credentials);
        const response = await axios.post('http://localhost:8888/api/auth/login', credentials);
        this.token = response.data.token
        this.user = response.data.user
        localStorage.setItem('authToken', this.token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
        console.log('Login successful:', response.data);

        // Clear any previous failure reasons on successful login
        this.loginFailureReason = null
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'Login failed'
        this.error = errorMessage

        // Determine failure reason based on error response
        if (error.response?.status === 401) {
          if (errorMessage.toLowerCase().includes('account not found') ||
              errorMessage.toLowerCase().includes('user not found')) {
            this.loginFailureReason = 'account_not_found'
          } else if (errorMessage.toLowerCase().includes('invalid credentials') ||
                     errorMessage.toLowerCase().includes('incorrect password')) {
            this.loginFailureReason = 'invalid_credentials'
          } else {
            this.loginFailureReason = 'invalid_credentials'
          }
        } else if (error.response?.status === 423) {
          this.loginFailureReason = 'account_locked'
        } else if (error.response?.status >= 500) {
          this.loginFailureReason = 'server_error'
        } else {
          this.loginFailureReason = 'default'
        }

        console.error('Login error:', error);
        throw error
      } finally {
        this.loading = false
      }
    },

    logout() {
      this.token = null
      this.user = null
      this.error = null
      this.loginFailureReason = null
      localStorage.removeItem('authToken')
      delete axios.defaults.headers.common['Authorization']
    },

    clearLoginFailure() {
      this.loginFailureReason = null
      this.error = null
    },

    // Initialize auth state from localStorage
    initializeAuth() {
      const token = localStorage.getItem('authToken')
      if (token) {
        this.token = token
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      }
    },
  },
});
