<template>
  <div>
    <!-- Global error message -->
    <v-alert v-if="authStore.error" type="error" dismissible @click:close="authStore.error = null">
      {{ authStore.error }}
    </v-alert>

    <!-- Authentication check -->
    <div v-if="!authStore.isAuthenticated" class="text-center pa-4">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
      <p class="mt-2">Checking authentication...</p>
    </div>

    <!-- Main content when authenticated -->
    <div v-else>
      <the-leads-form />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import TheLeadsForm from '@/components/TheLeadsForm.vue';

const router = useRouter();
const authStore = useAuthStore();

// Initialize authentication on component mount
onMounted(async () => {
  authStore.initializeAuth();

  // If not authenticated, redirect to login
  if (!authStore.isAuthenticated) {
    await router.push('/login');
  }
});
</script>

<style lang="scss" scoped>

</style>
