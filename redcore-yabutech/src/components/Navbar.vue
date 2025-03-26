<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container">
      <router-link class="navbar-brand" to="/">YabuTech</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/users">Users</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/roles">Roles</router-link>
          </li>
        </ul>
        <div class="navbar-nav" v-if="auth.user">
          <span class="nav-link">Welcome, {{ auth.user.name }}</span>
          <a @click.prevent="logout" href="#" class="nav-link">Logout</a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'vue-router';

const auth = useAuthStore();
const router = useRouter();

const logout = () => {
  auth.logout();
  router.push('/login');
};
</script>
