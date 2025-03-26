<!-- Login.vue -->
<template>
  <div class="page">
    <div class="container">
      <div class="split-container">
        <div class="brand-section">
          <img src="@/assets/redcore-logo.png" alt="Redcore Logo" class="logo" />
          <h1>Welcome Back!</h1>
          <p>Please login to continue to YabuTech Portal</p>
        </div>

        <form @submit.prevent="handleLogin" class="form">
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
.page {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
}

.container {
  background: rgba(255, 255, 255, 0.98);
  border-radius: 16px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 900px;
  overflow: hidden;
}

.split-container {
  display: grid;
  grid-template-columns: 450px 1fr;
  min-height: 550px;
}

.brand-section {
  background: linear-gradient(135deg, #E31837 0%, #c01830 100%);
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
}

.logo {
  height: 60px;
  margin-bottom: 20px;
  filter: brightness(0) invert(1);
  animation: floatAnimation 3s ease-in-out infinite;
  transition: all 0.3s ease;
}

.brand-section:hover .logo {
  transform: translateY(-5px);
  filter: drop-shadow(0 5px 20px rgba(255, 255, 255, 0.6)) brightness(0) invert(1);
}

@keyframes floatAnimation {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
}

.brand-section h1 {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 12px;
}

.brand-section p {
  color: rgba(255, 255, 255, 0.9);
  font-size: 16px;
}

.form {
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  overflow-y: auto;
}

.form-group {
  margin-bottom: 15px;
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

.form-footer {
  text-align: center;
  margin-top: 20px;
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

@media (max-width: 768px) {
  .split-container {
    grid-template-columns: 1fr;
    min-height: auto;
    max-height: none;
  }
  
  .brand-section {
    padding: 25px;
    min-height: 180px;
  }
  
  .form {
    padding: 25px;
  }
}
</style>
