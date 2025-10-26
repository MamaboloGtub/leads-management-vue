<template>
  <div>
    <v-alert v-if="authStore.error" type="error" dismissible @click:close="authStore.error = null">
      {{ authStore.error }}
    </v-alert>
    <div v-if="!authStore.isAuthenticated" class="text-center pa-4">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
      <p class="mt-2">Checking authentication...</p>
    </div>
    <div v-else>
      <the-date-filter @update-dates="handleDateFilterChange" />
      <the-leads-grid ref="leadsGridRef" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import TheDateFilter from '@/components/TheDateFilter.vue';
import TheLeadsGrid from '@/components/TheLeadsGrid.vue';

const router = useRouter();
const authStore = useAuthStore();
const leadsGridRef = ref(null);
const pendingDateFilter = ref(null);

onMounted(async () => {
  authStore.initializeAuth();
  if (!authStore.isAuthenticated) {
    await router.push('/login');
  }
});

const handleDateFilterChange = (dates) => {
  console.log('Date filter changed in MainView:', dates);
  console.log('leadsGridRef.value:', leadsGridRef.value);

  if (leadsGridRef.value) {
    console.log('Calling filterByDate on grid');
    leadsGridRef.value.filterByDate(dates);
  } else {
    console.log('leadsGridRef is null, storing pending filter');
    pendingDateFilter.value = dates;
    // Try again after a short delay to allow the grid to mount
    setTimeout(() => {
      if (leadsGridRef.value && pendingDateFilter.value) {
        console.log('Applying pending date filter');
        leadsGridRef.value.filterByDate(pendingDateFilter.value);
        pendingDateFilter.value = null;
      }
    }, 100);
  }
};
</script>

<style lang="scss" scoped>

</style>
