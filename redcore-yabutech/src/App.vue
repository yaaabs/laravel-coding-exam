<template>
  <Navbar v-if="auth.token" />
  <router-view />
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
import { useAuthStore } from '@/store/auth';

const auth = useAuthStore();
</script>
