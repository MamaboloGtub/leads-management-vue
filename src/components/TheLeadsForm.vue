<template>
  <v-card color="green lighten-1">
    <v-card-title>
      Create New Lead
    </v-card-title>
    <v-form v-model="valid" ref="form">
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
             v-model="name"
             :rules="nameRules"
             :counter="50"
             label="Lead Name"
             required
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
             v-model="email"
             :rules="emailRules"
             label="Email"
             type="email"
             required
            />
          </v-col>
        </v-row>
        <v-row>
           <v-col cols="12" md="6">
            <v-text-field
             v-model="leadSource"
             :rules="leadRules"
             label="Lead Source"
             type="text"
             required
            />
          </v-col>
        </v-row>
        <v-row>
           <v-col cols="12" md="6">
            <v-text-field
             v-model="leadStatus"
             :rules="leadRules"
             label="Lead Status"
             type="text"
             required
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-btn
              color="primary"
              @click="submit"
              :disabled="!valid"
            >
              Save Lead
            </v-btn>
            <v-btn
              color="secondary"
              @click="reset"
              class="ml-2"
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
import router from '@/router';
import { ref } from 'vue'

const valid = ref(false);
const name = ref('');
const email = ref('');
const leadSource = ref('');
const leadStatus = ref('');
const form = ref(null)

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
    if (val) return true;
    return 'LeadSource is required';
  },
  val => {
    if (val && val.length >= 3) return true;
    return 'Name must be at least 3 characters';
  },
];

// Form methods
const submit = () => {
  if (valid.value) {
    console.log('Form data:', { name: name.value, email: email.value })
    // Handle form submission here
  }
}

const reset = () => {
  form.value?.reset()
  router.push({ name: 'Leads' });
}
</script>

<style scoped>

</style>
