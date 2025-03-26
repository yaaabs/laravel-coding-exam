<template>
  <div class="page">
    <div class="container">
      <div class="split-container">
        <div class="brand-section">
          <img src="@/assets/redcore-logo.png" alt="Redcore Logo" class="logo" />
          <h1>Create Account</h1>
          <p>Join YabuTech Portal today</p>
        </div>

        <form @submit.prevent="handleRegister" class="form">
          <div class="form-group">
            <label>Full Name</label>
            <input 
              v-model="form.name" 
              type="text" 
              class="form-control" 
              placeholder="Enter your full name"
              required 
            />
            <span v-if="errors.name" class="error-text">{{ errors.name[0] }}</span>
          </div>

          <div class="form-group">
            <label>Email Address</label>
            <input 
              v-model="form.email" 
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
                v-model="form.password" 
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

          <div class="form-group">
            <label>Confirm Password</label>
            <div class="password-input">
              <input 
                v-model="form.password_confirmation" 
                :type="showPassword ? 'text' : 'password'"
                class="form-control" 
                placeholder="Confirm your password"
                required 
              />
            </div>
          </div>

          <div class="form-group">
            <label>Role</label>
            <select v-model="form.role" class="form-control" required>
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
            <span v-if="errors.role" class="error-text">{{ errors.role[0] }}</span>
          </div>

          <div v-if="error" class="alert alert-danger">{{ error }}</div>
          
          <button type="submit" class="submit-btn" :disabled="loading">
            {{ loading ? 'Creating Account...' : 'Register' }}
          </button>

          <div class="form-footer">
            <router-link to="/login" class="login-link">
              Already have an account? Login here
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from '@/utils/axios'; // Use configured axios instance
import { useAuthStore } from '@/store/auth';
import type { Role } from '@/types';

const router = useRouter();
const auth = useAuthStore();
const error = ref('');
const errors = ref({});
const roles = ref<Role[]>([]);
const showPassword = ref(false);
const loading = ref(false);

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  role: string | number; // Allow both string and number
}

const form = ref<RegisterForm>({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  role: ''
});

const fetchRoles = async () => {
  try {
    const response = await axios.get('/roles'); // Use relative path
    roles.value = response.data;
  } catch (error) {
    console.error('Failed to fetch roles:', error);
    roles.value = [
      { id: 1, name: 'Admin', description: 'Administrator' },
      { id: 2, name: 'User', description: 'Regular User' }
    ];
  }
};

const handleRegister = async () => {
  loading.value = true;
  error.value = '';
  errors.value = {};
  
  try {
    const formData = {
      ...form.value,
      role: Number(form.value.role) // Convert to number before sending
    };
    
    const response = await axios.post('/register', formData);
    
    if (response.data.success) {
      router.push('/login?registered=true');
    } else {
      error.value = 'Registration failed';
    }
  } catch (err: any) {
    if (err.response) {
      if (err.response.status === 422) {
        errors.value = err.response.data.errors || {};
      } else {
        error.value = err.response.data.message || 'Registration failed. Please try again.';
      }
    } else if (err.request) {
      error.value = 'No response from server. Please check your connection.';
    } else {
      error.value = 'An unexpected error occurred.';
    }
    console.error('Registration error:', err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchRoles();
});
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

.page::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(227, 24, 55, 0.1) 0%, rgba(227, 24, 55, 0.05) 100%);
  z-index: 0; /* Changed from 1 to 0 */
  pointer-events: none; /* Added to allow clicks through */
}

.container {
  background: rgba(255, 255, 255, 0.98);
  border-radius: 16px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 900px;
  position: relative;
  z-index: 1; /* Added to ensure container is above overlay */
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
  padding: 10px 16px; /* Reduced from 12px */
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

.login-link {
  color: #E31837;
  text-decoration: none;
  font-weight: 500;
}

.login-link:hover {
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

.error-text {
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
}

/* Add smooth scrollbar styling */
.form::-webkit-scrollbar {
  width: 6px;
}

.form::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.form::-webkit-scrollbar-thumb {
  background: #E31837;
  border-radius: 3px;
}

@media (max-width: 768px) {
  .split-container {
    grid-template-columns: 1fr;
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
