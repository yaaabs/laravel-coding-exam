<!-- Login.vue -->
<template>
  <div class="login-page">
    <div class="login-container">
      <div class="brand-section">
        <img src="@/assets/redcore-logo.png" alt="Redcore Logo" class="logo" />
        <h1>Welcome Back!</h1>
        <p>Please login to continue to YabuTech Portal</p>
      </div>
      
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label>Email Address</label>
          <input 
            v-model="email" 
            type="email" 
            class="form-control" 
            placeholder="Enter your email"
            required 
          />
        </div>
        
        <div class="form-group">
          <label>Password</label>
          <div class="password-input">
            <input 
              v-model="password" 
              :type="showPassword ? 'text' : 'password'"
              class="form-control" 
              placeholder="Enter your password"
              required 
            />
            <i 
              :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"
              @click="showPassword = !showPassword"
            ></i>
          </div>
        </div>

        <div v-if="error" class="alert alert-danger">{{ error }}</div>
        
        <button type="submit" class="submit-btn" :disabled="loading">
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>

        <div class="form-footer">
          <router-link to="/register" class="register-link">
            Don't have an account? Register here
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';

const email = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);
const showPassword = ref(false);

const router = useRouter();
const auth = useAuthStore();

const handleLogin = async () => {
  loading.value = true;
  error.value = '';
  
  try {
    const result = await auth.login(email.value, password.value);
    if (result.success) {
      router.push('/');
    } else {
      error.value = result.error || 'Login failed';
    }
  } catch (err) {
    error.value = 'An unexpected error occurred';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.login-container {
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 480px;
  padding: 40px;
}

.brand-section {
  text-align: center;
  margin-bottom: 40px;
}

.logo {
  height: 60px;
  margin-bottom: 20px;
}

.brand-section h1 {
  color: #E31837; /* Redcore red */
  font-size: 24px;
  margin-bottom: 10px;
}

.brand-section p {
  color: #666;
  font-size: 16px;
}

.form-group {
  margin-bottom: 25px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: 500;
}

.form-control {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  transition: border-color 0.3s;
}

.form-control:focus {
  border-color: #E31837;
  outline: none;
}

.password-input {
  position: relative;
}

.password-input i {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #666;
}

.submit-btn {
  width: 100%;
  padding: 14px;
  background: #E31837;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
}

.submit-btn:hover {
  background: #c01830;
}

.submit-btn:disabled {
  background: #ff8fa3;
  cursor: not-allowed;
}

.form-footer {
  margin-top: 20px;
  text-align: center;
}

.register-link {
  color: #E31837;
  text-decoration: none;
  font-weight: 500;
}

.register-link:hover {
  text-decoration: underline;
}

.alert {
  margin-bottom: 20px;
  padding: 12px;
  border-radius: 8px;
}

.alert-danger {
  background: #fee2e2;
  color: #ef4444;
  border: 1px solid #fecaca;
}
</style>
