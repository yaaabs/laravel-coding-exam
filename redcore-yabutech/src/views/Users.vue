<template>
  <div class="container mt-4">
    <h2>User Management</h2>
    
    <!-- Create/Edit User Form -->
    <div class="card mb-4">
      <div class="card-body">
        <h3>{{ editing ? 'Edit User' : 'Create User' }}</h3>
        <form @submit.prevent="handleSubmit">
          <div class="mb-3">
            <label class="form-label">Full Name</label>
            <input v-model="form.full_name" type="text" class="form-control" required />
          </div>
          <div class="mb-3">
            <label class="form-label">Email</label>
            <input v-model="form.email" type="email" class="form-control" required />
          </div>
          <div class="mb-3">
            <label class="form-label">Password</label>
            <input v-model="form.password" type="password" class="form-control" :required="!editing" />
          </div>
          <div class="mb-3">
            <label class="form-label">Confirm Password</label>
            <input v-model="form.password_confirmation" type="password" class="form-control" :required="!editing" />
          </div>
          <div class="mb-3">
            <label class="form-label">Role</label>
            <select v-model="form.role_id" class="form-control" required>
              <option v-for="role in roles" :key="role.id" :value="role.id">
                {{ role.name }}
              </option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary">{{ editing ? 'Update' : 'Create' }}</button>
          <button v-if="editing" @click="resetForm" type="button" class="btn btn-secondary ms-2">Cancel</button>
        </form>
      </div>
    </div>

    <!-- Users List -->
    <div class="card">
      <div class="card-body">
        <h3>Users List</h3>
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td>{{ user.full_name }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.role?.name }}</td>
                <td>
                  <button @click="editUser(user)" class="btn btn-sm btn-info me-2">Edit</button>
                  <button @click="deleteUser(user.id)" class="btn btn-sm btn-danger">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useToast } from 'vue-toastification';
import type { User, UserForm, Role } from '@/types';

const toast = useToast();
const users = ref<User[]>([]);
const roles = ref<Role[]>([]);
const editing = ref(false);
const form = ref<UserForm>({
  full_name: '',
  email: '',
  password: '',
  password_confirmation: '',
  role_id: 0,
});

const fetchUsers = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/users');
    users.value = response.data;
  } catch (error) {
    toast.error('Failed to fetch users');
  }
};

const fetchRoles = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/roles');
    roles.value = response.data;
  } catch (error) {
    toast.error('Failed to fetch roles');
  }
};

const handleSubmit = async () => {
  try {
    if (editing.value) {
      await axios.put(`http://localhost:8000/api/users/${form.value.id}`, form.value);
      toast.success('User updated successfully');
    } else {
      await axios.post('http://localhost:8000/api/users', form.value);
      toast.success('User created successfully');
    }
    resetForm();
    await fetchUsers();
  } catch (error: any) {
    toast.error(error.response?.data?.message || 'Operation failed');
  }
};

const editUser = (user: User) => {
  editing.value = true;
  form.value = { ...user, password: '', password_confirmation: '' };
};

const deleteUser = async (id: number) => {
  if (!confirm('Are you sure you want to delete this user?')) return;
  
  try {
    await axios.delete(`http://localhost:8000/api/users/${id}`);
    toast.success('User deleted successfully');
    await fetchUsers();
  } catch (error) {
    toast.error('Failed to delete user');
  }
};

const resetForm = () => {
  editing.value = false;
  form.value = {
    full_name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role_id: 0,
  };
};

onMounted(() => {
  fetchUsers();
  fetchRoles();
});
</script>
