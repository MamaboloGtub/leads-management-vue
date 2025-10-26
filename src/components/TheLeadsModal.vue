<template>
  <v-dialog v-model="isOpen" :max-width="maxWidth" persistent>
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <span>{{ title }}</span>
        <v-btn icon="mdi-close" variant="text" @click="closeModal"></v-btn>
      </v-card-title>

      <v-card-text>
        <TheLeadsForm
          v-if="mode === 'edit'"
          :lead-data="leadData"
          :is-edit="true"
          @close="closeModal"
          @save="handleSave"
          @save-complete="closeModal"
        />
        <div v-else-if="mode === 'view'" class="lead-details">
          <v-row>
            <v-col cols="6">
              <strong>Name:</strong> {{ leadData?.name || 'N/A' }}
            </v-col>
            <v-col cols="6">
              <strong>Email:</strong> {{ leadData?.email || 'N/A' }}
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <strong>Lead Source:</strong> {{ leadData?.leadSource || 'N/A' }}
            </v-col>
            <v-col cols="6">
              <strong>Lead Status:</strong> {{ leadData?.leadStatus || 'N/A' }}
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <strong>Created:</strong> {{ formatDate(leadData?.createdAt) || 'N/A' }}
            </v-col>
            <v-col cols="6">
              <strong>Updated:</strong> {{ formatDate(leadData?.updatedAt) || 'N/A' }}
            </v-col>
          </v-row>
        </div>
        <div v-else-if="mode === 'delete'" class="text-center">
          <v-icon color="warning" size="64">mdi-alert-circle-outline</v-icon>
          <h3 class="mt-4 mb-2">Confirm Delete</h3>
          <p>Are you sure you want to delete <strong>{{ leadData?.name }}</strong>?</p>
          <p class="text-caption text-error">This action cannot be undone.</p>
        </div>
      </v-card-text>
      <v-card-actions v-if="mode !== 'edit'">
        <v-spacer></v-spacer>
        <template v-if="mode === 'view'">
          <v-btn color="secondary" @click="closeModal">Close</v-btn>
        </template>
        <template v-if="mode === 'delete'">
          <v-btn color="secondary" @click="closeModal">Cancel</v-btn>
          <v-btn color="error" @click="confirmDelete">Delete</v-btn>
        </template>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed } from 'vue';
import TheLeadsForm from './TheLeadsForm.vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  mode: {
    type: String,
    default: 'view',
    validator: (value) => ['edit', 'delete', 'view'].includes(value)
  },
  leadData: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['update:modelValue', 'save', 'delete']);

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const title = computed(() => {
  const leadName = props.leadData?.name || 'Lead';
  switch (props.mode) {
    case 'edit':
      return `Edit ${leadName}`;
    case 'delete':
      return `Delete ${leadName}`;
    case 'view':
      return `View ${leadName}`;
    default:
      return 'Lead Details';
  }
});

const maxWidth = computed(() => {
  return props.mode === 'delete' ? '400px' : '600px';
});

const closeModal = () => {
  isOpen.value = false;
};

const handleSave = (formData) => {
  emit('save', formData);
};

const confirmDelete = () => {
  emit('delete', props.leadData);
  closeModal();
};

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  try {
    return new Date(dateString).toLocaleDateString();
  } catch {
    return 'Invalid Date';
  }
}
</script>

<style scoped>
.lead-details {
  min-height: 200px;
}
</style>
