<template>
  <v-card>
    <v-card-title>
      {{ isEdit ? 'Edit Lead' : 'Create New Lead' }}
    </v-card-title>
    <v-progress-linear v-if="leadStore.isLoading" indeterminate color="primary"></v-progress-linear>
    <v-alert v-if="leadStore.error" type="error" dismissible @click:close="leadStore.clearError()">
      {{ leadStore.error }}
    </v-alert>
    <v-alert v-if="successMessage" type="success" dismissible @click:close="successMessage = ''">
      {{ successMessage }}
    </v-alert>

    <v-form v-model="valid" ref="form">
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
             v-model="name"
             :rules="nameRules"
             :counter="50"
             label="Lead Name *"
             required
             :disabled="leadStore.isLoading"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
             v-model="email"
             :rules="emailRules"
             label="Email *"
             type="email"
             required
             :disabled="leadStore.isLoading"
            />
          </v-col>
        </v-row>
        <v-row>
           <v-col cols="12" md="6">
            <v-select
             v-model="leadSource"
             :rules="leadRules"
             :items="leadSourceOptions"
             label="Lead Source *"
             required
             :disabled="leadStore.isLoading"
            />
          </v-col>
        </v-row>
        <v-row>
           <v-col cols="12" md="6">
            <v-select
             v-model="leadStatus"
             :rules="leadRules"
             :items="leadStatusOptions"
             label="Lead Status *"
             required
             :disabled="leadStore.isLoading"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-btn
              color="primary"
              @click="submit"
              :disabled="!valid || leadStore.isLoading"
              :loading="leadStore.isLoading"
            >
              {{ isEdit ? 'Update Lead' : 'Save Lead' }}
            </v-btn>
            <v-btn
              color="secondary"
              @click="reset"
              class="ml-2"
              :disabled="leadStore.isLoading"
            >
              Cancel
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref, watch, defineProps, defineEmits } from 'vue'
import { useLeadStore } from '@/stores/leadStore';

const router = useRouter();
const leadStore = useLeadStore();

const props = defineProps({
  leadData: {
    type: Object,
    default: null
  },
  isEdit: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'save', 'save-complete'])

const valid = ref(false);
const name = ref('');
const email = ref('');
const leadSource = ref('');
const leadStatus = ref('');
const form = ref(null)
const successMessage = ref('');

const leadSourceOptions = [
  'Website',
  'Social Media',
  'Email Marketing',
  'Referral',
  'Cold Call',
  'Trade Show',
  'Advertisement',
  'Other'
];

const leadStatusOptions = [
  'New',
  'Contacted',
  'Qualified',
  'Proposal Sent',
  'Negotiation',
  'Closed Won',
  'Close won',
  'Closed Lost',
  'On Hold'
];

watch(() => props.leadData, (newData) => {
  if (newData && props.isEdit) {
    name.value = newData.name || '';
    email.value = newData.email || '';
    leadSource.value = newData.lead_source || '';
    leadStatus.value = newData.lead_status || '';
  }
}, { immediate: true })

watch(() => props.isEdit, (isEdit) => {
  if (!isEdit) {
    name.value = '';
    email.value = '';
    leadSource.value = '';
    leadStatus.value = '';
    successMessage.value = '';
    leadStore.clearError();
  }
}, { immediate: true })

const nameRules = [
  val => {
    if (val) return true;
    return 'Name is required';
  },
  val => {
    if (val && val.length >= 3) return true;
    return 'Name must be at least 3 characters';
  },
];

const emailRules = [
  val => {
    if (val) return true;
    return 'Email is required';
  },
  val => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (pattern.test(val)) return true;
    return 'Invalid email format';
  },
];
const leadRules = [
  val => {
    if (val && val !== '') return true;
    return 'This field is required';
  },
];

const submit = async () => {
  if (valid.value) {
    const formData = {
      name: name.value,
      email: email.value,
      leadStatus: leadStatus.value,
      leadSource: leadSource.value
    };

    try {
      if (props.isEdit && props.leadData?.id) {
        successMessage.value = 'Lead updated successfully!';

        emit('save', formData);
        setTimeout(() => {
          emit('save-complete');
        }, 1500);
      } else {
        successMessage.value = 'Lead created successfully!';

        setTimeout(() => {
          form.value?.reset();
          router.push({ name: 'Leads' });
        }, 1500);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }
}

const reset = () => {
  if (props.isEdit) {
    emit('close');
  } else {
    form.value?.reset();
    router.push({ name: 'Leads' });
  }
}
</script>

<style scoped>

</style>
