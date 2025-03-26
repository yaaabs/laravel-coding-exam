<template>
  <div class="container mt-4">
    <h2>Role Management</h2>
    
    <!-- Create/Edit Role Form -->
    <div class="card mb-4">
      <div class="card-body">
        <h3>{{ editing ? 'Edit Role' : 'Create Role' }}</h3>
        <form @submit.prevent="handleSubmit">
          <div class="mb-3">
            <label class="form-label">Role Name</label>
            <input v-model="form.name" type="text" class="form-control" required />
          </div>
          <div class="mb-3">
            <label class="form-label">Description</label>
            <textarea v-model="form.description" class="form-control" required></textarea>
          </div>
          <button type="submit" class="btn btn-primary">{{ editing ? 'Update' : 'Create' }}</button>
          <button v-if="editing" @click="resetForm" type="button" class="btn btn-secondary ms-2">Cancel</button>
        </form>
      </div>
    </div>

    <!-- Roles List -->
    <div class="card">
      <div class="card-body">
        <h3>Roles List</h3>
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="role in roles" :key="role.id">
                <td>{{ role.name }}</td>
                <td>{{ role.description }}</td>
                <td>
                  <button @click="editRole(role)" class="btn btn-sm btn-info me-2">Edit</button>
                  <button @click="deleteRole(role.id)" class="btn btn-sm btn-danger">Delete</button>
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
import type { Role } from '@/types';

const toast = useToast();
const roles = ref<Role[]>([]);
const editing = ref(false);
const form = ref({
  id: 0,
  name: '',
  description: ''
});

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
      await axios.put(`http://localhost:8000/api/roles/${form.value.id}`, form.value);
      toast.success('Role updated successfully');
    } else {
      await axios.post('http://localhost:8000/api/roles', form.value);
      toast.success('Role created successfully');
    }
    resetForm();
    await fetchRoles();
  } catch (error: any) {
    toast.error(error.response?.data?.message || 'Operation failed');
  }
};

const editRole = (role: Role) => {
  editing.value = true;
  form.value = { ...role };
};

const deleteRole = async (id: number) => {
  if (!confirm('Are you sure you want to delete this role?')) return;
  
  try {
    await axios.delete(`http://localhost:8000/api/roles/${id}`);
    toast.success('Role deleted successfully');
    await fetchRoles();
  } catch (error) {
    toast.error('Failed to delete role');
  }
};

const resetForm = () => {
  editing.value = false;
  form.value = {
    id: 0,
    name: '',
    description: ''
  };
};

onMounted(() => {
  fetchRoles();
});
</script>
