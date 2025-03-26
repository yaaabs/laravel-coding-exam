<template>
  <div class="min-h-screen flex items-center justify-center bg-green-100">
    <div class="bg-white p-8 rounded-2xl shadow-lg text-center">
      <h1 class="text-3xl font-bold mb-4 text-gray-800">Welcome, {{ userName }}!</h1>
      <p class="text-gray-600">You're now logged in.</p>
      <button
        @click="logout"
        class="mt-6 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
      >
        Logout
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'vue-router';

const auth = useAuthStore();
const router = useRouter();

const userName = auth.user?.name || 'User';

const logout = () => {
  auth.logout();
  router.push('/login');
};
</script>
