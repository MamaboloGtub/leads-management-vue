<template>
 <v-row class="ma-0 pa-0">
  <v-col cols="3">
    <v-menu :close-on-content-click="false">
      <template #activator="{ props }">
        <v-text-field
          class="ma-0 pa-0"
          v-bind="props"
          v-model="startDate"
          label="Start date"
          hide-details
          append-inner
        >
        <template #append-inner>
          <v-icon>mdi-calendar-range</v-icon>
        </template>
      </v-text-field>
      </template>
      <v-date-picker
        v-model="date"
        :allowed-dates="allowedDates"
        scrollable
        no-title
        hide-header
      />
    </v-menu>
  </v-col>
   <v-col cols="3">
    <v-menu :close-on-content-click="false">
      <template #activator="{ props }">
        <v-text-field
          class="ma-0 pa-0"
          v-bind="props"
          v-model="endDate"
          label="end date"
          hide-details
          append-inner
        >
        <template #append-inner>
          <v-icon>mdi-calendar-range</v-icon>
        </template>
      </v-text-field>
      </template>
      <v-date-picker
        v-model="date"
        :allowed-dates="allowedDates"
        scrollable
        no-title
        hide-header
        :min="minEndDate"
      />
    </v-menu>
  </v-col>
 </v-row>
</template>

<script setup>
import { useDate } from 'vuetify';
import { ref } from 'vue';

const startDate = ref(new Date());
const endDate = ref(new Date());
const adapter = useDate();

// const offsetDate = (date) => {
//   const offsetDate = adapter.add(date, 1, 'day');
//   return adapter.toISO(offsetDate);
// };
// formattedStartDate = computed({
//   get() {
//     return offsetDate(startDate.value);
//   },

//   set(val) {
//     startDate.value = adapter.parse(val);
//     const minEnd = adapter.add(startDate.value, 1, 'day');
//     minEnd.setDate
//   },
// });
// const formattedEndDate = computed({
//   get() {
//     return offsetDate(endDate.value);
//   },
// });

const allowedDates = (val) => {
  return parseInt(adapter.toISO(val).split('-')[2], 10) % 2 === 0;
};

</script>

<style lang="scss" scoped>

</style>
