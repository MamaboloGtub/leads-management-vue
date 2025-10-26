<template>
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
    <v-col class="d-flex justify-end">
      <v-btn @click="createLeads" color="primary">Add New Lead</v-btn>
    </v-col>
  </v-row>
  <v-data-table
    class="elevation-1"
    :headers="headers"
    hover
    :items="items"
    :search="search"
    density="comfortable"
    item-value="name"
    items-per-page="5"
  >
    <template v-slot:top>
    <v-btn color="primary">Leads List View</v-btn>
  </template>
   <template v-slot:[`item.actions`]="{ item }">
        <div class="d-flex ga-2 justify-end">
          <v-icon color="medium-emphasis" icon="mdi-eye" size="small" @click="view(item.id)"></v-icon>
          <v-icon color="medium-emphasis" icon="mdi-pencil" size="small" @click="edit(item.id)"></v-icon>
          <v-icon color="medium-emphasis" icon="mdi-delete" size="small" @click="remove(item.id)"></v-icon>
        </div>
      </template>
  </v-data-table>
</template>

<script setup>
import router from '@/router';
import { ref } from 'vue';

const search = ref('');
const headers = [
  { title: 'Lead Name', value: 'name', sortable: true },
  { title: 'Lead Contact', value: 'email' },
  { title: 'Lead Source', value: 'lead_source' },
  { title: 'Lead Status', value: 'lead_status' },
  { title: 'Date Created', value: 'Created_at' },
  { title: 'Date Updated', value: 'Updated_at' },
  { title: 'Actions', value: 'actions', sortable: false },
]
// use mock data for now
const items = [
  {
    name: 'Frozen Yogurt',
    email: 'frozen.yogurt@example.com',
    lead_source: 'Website',
    lead_status: 'New',
    Created_at: '2023-01-01',
    Updated_at: '2023-01-02',
  },
  {
    name: 'Ice cream sandwich',
    email: 'ice.cream.sandwich@example.com',
    lead_source: 'Referral',
    lead_status: 'New',
    Created_at: '2023-01-01',
    Updated_at: '2023-01-02',
  },
  {
    name: 'Eclair',
    email: 'eclair@example.com',
    lead_source: 'Social Media',
    lead_status: 'In Progress',
    Created_at: '2023-01-01',
    Updated_at: '2023-01-02',
  },
  {
    name: 'Cupcake',
    email: 'cupcake@example.com',
    lead_source: 'Email',
    lead_status: 'In Progress',
    Created_at: '2023-01-01',
    Updated_at: '2023-01-02',
  },
  {
    name: 'Gingerbread',
    email: 'gingerbread@example.com',
    lead_source: 'Social Media',
    lead_status: 'In Progress',
    Created_at: '2023-01-01',
    Updated_at: '2023-01-02',
  },
    {
    name: 'Frozen Yogurt',
    email: 'frozen.yogurt@example.com',
    lead_source: 'Website',
    lead_status: 'New',
    Created_at: '2023-01-01',
    Updated_at: '2023-01-02',
  },
  {
    name: 'Ice cream sandwich',
    email: 'ice.cream.sandwich@example.com',
    lead_source: 'Referral',
    lead_status: 'New',
    Created_at: '2023-01-01',
    Updated_at: '2023-01-02',
  },
  {
    name: 'Eclair',
    email: 'eclair@example.com',
    lead_source: 'Social Media',
    lead_status: 'In Progress',
    Created_at: '2023-01-01',
    Updated_at: '2023-01-02',
  },
  {
    name: 'Cupcake',
    email: 'cupcake@example.com',
    lead_source: 'Email',
    lead_status: 'In Progress',
    Created_at: '2023-01-01',
    Updated_at: '2023-01-02',
  },
  {
    name: 'Gingerbread',
    email: 'gingerbread@example.com',
    lead_source: 'Social Media',
    lead_status: 'In Progress',
    Created_at: '2023-01-01',
    Updated_at: '2023-01-02',
  },
];

const createLeads = () => {
  router.push({ name: 'CreateLead' });
}

</script>

<style lang="scss" scoped>

</style>
