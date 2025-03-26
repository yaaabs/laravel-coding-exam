<template>
  <div class="register-page">
    <div class="register-container">
      <div class="brand-section">
        <img src="@/assets/redcore-logo.png" alt="Redcore Logo" class="logo" />
        <h1>Create Account</h1>
        <p>Join YabuTech Portal today</p>
      </div>
      
      <form @submit.prevent="handleRegister" class="register-form">
        <div class="form-group">
          <label>Full Name</label>
          <input 
            v-model="form.full_name" 
            type="text" 
            class="form-control" 
            placeholder="Enter your full name"
            required 
          />
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
          <select v-model="form.role_id" class="form-control" required>
            <option value="">Select Role</option>
            <option v-for="role in roles" :key="role.id" :value="role.id">
              {{ role.name }}
            </option>
          </select>
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
const roles = ref<Role[]>([]);
const showPassword = ref(false);
const loading = ref(false);

const form = ref({
  full_name: '',
  email: '',
  password: '',
  password_confirmation: '',
  role_id: ''
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
  
  try {
    const formData = { ...form.value };
    if (!formData.role_id) {
      formData.role_id = 2; // Default to User role
    }
    
    const result = await auth.register(formData);
    if (result.success) {
      router.push('/');
    } else {
      error.value = result.error || 'Registration failed';
    }
  } catch (err: any) {
    console.error('Registration error:', err);
    error.value = err.response?.data?.message || 'Registration failed';
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchRoles();
});
</script>

<style scoped>
.register-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.register-container {
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
  color: #E31837;
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
</style>
