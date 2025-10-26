<template>
  <div>
    <v-progress-linear v-if="leadStore.isLoading" indeterminate color="primary"></v-progress-linear>
    <v-alert v-if="leadStore.error" type="error" dismissible @click:close="leadStore.clearError()">
      {{ leadStore.error }}
    </v-alert>

    <v-row class="mb-0 justify-end">
      <v-col cols="3" class="d-flex justify-end">
        <v-text-field
         v-model="search"
         label="search"
         hide-details
         prepend-inner-icon="mdi-magnify"
         single-line
         variant="plain"
        />
      </v-col>
      <v-col class="d-flex justify-end gap-2">
        <v-chip
          v-if="currentDateFilter"
          color="primary"
          variant="outlined"
          size="small"
          class="mr-2"
        >
          <v-icon start icon="mdi-calendar-range"></v-icon>
          {{ currentDateFilter.startDate }} to {{ currentDateFilter.endDate }}
        </v-chip>
        <v-btn @click="refreshLeads" color="secondary" variant="outlined" :loading="leadStore.isLoading">
          <v-icon left>mdi-refresh</v-icon>
          Refresh
        </v-btn>
        <v-btn @click="createLeads" color="primary">Add New Lead</v-btn>
      </v-col>
    </v-row>
    <v-data-table
      class="elevation-1"
      :headers="headers"
      hover
      :items="leadStore.leads"
      :search="search"
      density="comfortable"
      item-value="id"
      items-per-page="5"
      :loading="leadStore.isLoading"
    >
      <template v-slot:top>
        <v-btn color="primary">Leads List View ({{ leadStore.leadCount }})</v-btn>
      </template>
      <template v-slot:[`item.created_at`]="{ item }">
        {{ formatDate(item.created_at) }}
      </template>
      <template v-slot:[`item.updated_at`]="{ item }">
        {{ formatDate(item.updated_at) }}
      </template>
       <template v-slot:[`item.actions`]="{ item }">
          <div class="d-flex ga-2 justify-end">
            <v-icon color="medium-emphasis" icon="mdi-eye" size="small" @click="viewLead(item.id)"></v-icon>
            <v-icon color="medium-emphasis" icon="mdi-pencil" size="small" @click="editLead(item.id)"></v-icon>
            <v-icon color="medium-emphasis" icon="mdi-delete" size="small" @click="deleteLead(item.id)"></v-icon>
          </div>
        </template>
    </v-data-table>
    <TheLeadsModal
      v-model="modalOpen"
      :mode="modalMode"
      :lead-data="selectedLead"
      @save="handleSave"
      @delete="handleDelete"
    />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { useLeadStore } from '@/stores/leadStore';
import { useAuthStore } from '@/stores/authStore';
import TheLeadsModal from './TheLeadsModal.vue';

const router = useRouter();
const leadStore = useLeadStore();
const authStore = useAuthStore();

const search = ref('');
const modalOpen = ref(false);
const modalMode = ref('view');
const selectedLead = ref(null);
const currentDateFilter = ref(null);

const headers = [
  { title: 'Lead Name', value: 'name', sortable: true },
  { title: 'Lead Contact', value: 'email' },
  { title: 'Lead Source', value: 'leadSource' },
  { title: 'Lead Status', value: 'leadStatus' },
  { title: 'Date Created', value: 'createdAt' },
  { title: 'Date Updated', value: 'updatedAt' },
  { title: 'Actions', value: 'actions', sortable: false },
]
onMounted(async () => {
  authStore.initializeAuth();
  if (authStore.isAuthenticated) {
    await refreshLeads();
  } else {
    router.push('/login');
  }
});

const createLeads = () => {
  console.log('createLeads function called');
  try {
    router.push('/create');
    console.log('Router push executed successfully');
  } catch (error) {
    console.error('Error during navigation:', error);
  }
}

const refreshLeads = async () => {
  try {
    const filter = currentDateFilter.value ? {
      start_date: currentDateFilter.value.startDate,
      end_date: currentDateFilter.value.endDate
    } : {};

    await leadStore.fetchLeads(filter);
    console.log('Leads refreshed successfully with filter:', filter);
  } catch (error) {
    console.error('Error refreshing leads:', error);
  }
}

const filterByDate = async (dates) => {
  console.log('filterByDate called with:', dates);
  currentDateFilter.value = dates;
  console.log('currentDateFilter updated to:', currentDateFilter.value);
  await refreshLeads();
}

// Expose the filterByDate function so parent components can call it
defineExpose({
  filterByDate
});

const openModal = (itemId, mode) => {
  selectedLead.value = leadStore.leads.find(item => item.id === itemId);
  modalMode.value = mode;
  modalOpen.value = true;
}

const editLead = (itemId) => {
  openModal(itemId, 'edit');
}

const viewLead = (itemId) => {
  openModal(itemId, 'view');
}

const deleteLead = (itemId) => {
  openModal(itemId, 'delete');
}

const handleSave = async (formData) => {
  try {
    console.log('Saving lead:', formData);
    if (selectedLead.value?.id) {
      await leadStore.updateLead(selectedLead.value.id, formData);
      console.log('Lead updated successfully');

      await refreshLeads();
    }
  } catch (error) {
    console.error('Error saving lead:', error);
  }
}

const handleDelete = async (leadData) => {
  try {
    console.log('Deleting lead:', leadData);
    if (leadData?.id) {
      await leadStore.deleteLead(leadData.id);
      console.log('Lead deleted successfully');

      await refreshLeads();
    }
  } catch (error) {
    console.error('Error deleting lead:', error);
  }
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  try {
    return new Date(dateString).toLocaleDateString();
  } catch {
    return 'Invalid Date';
  }
}

</script>

<style lang="scss" scoped>

</style>
