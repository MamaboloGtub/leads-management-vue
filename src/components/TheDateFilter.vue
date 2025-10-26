<template>
  <v-row class="ma-0 pa-0">
    <v-col cols="3">
      <v-menu
        :close-on-content-click="false"
      >
        <template #activator="{ props }">
          <v-text-field
            v-model="formattedStartDate"
            class="ma-0 pa-0"
            v-bind="props"
            hide-details
            label="Start Date"
            append-inner
          >
            <template #prepend-inner>
              <v-icon>mdi-calendar-range</v-icon>
            </template>
          </v-text-field>
        </template>
        <v-date-picker
          v-model="startDate"
          color="primary"
          no-title
          scrollable
          hide-header
        />
      </v-menu>
    </v-col>
    <v-col cols="3">
      <v-menu
        :close-on-content-click="false"
      >
        <template #activator="{ props }">
          <v-text-field
            v-model="formattedEndDate"
            class="ma-0 pa-0"
            v-bind="props"
            hide-details
            label="End Date"
            append-inner
          >
            <template #prepend-inner>
              <v-icon>mdi-calendar-range</v-icon>
            </template>
          </v-text-field>
        </template>
        <v-date-picker
          v-model="endDate"
          color="primary"
          no-title
          scrollable
          hide-header
          :min="minEndDate"
        />
      </v-menu>
    </v-col>
    <v-col cols="auto" class="d-flex align-center">
      <v-btn
        icon="mdi-refresh"
        variant="text"
        size="small"
        @click="resetToLastWeek"
        title="Reset to last 7 days"
      ></v-btn>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const emit = defineEmits(['update-dates']);

const startDate = ref(new Date());
startDate.value.setDate(startDate.value.getDate() - 2);

const endDate = ref(new Date());

function formatDate(date) {
  const offsetDate = new Date(
    date.getTime() - date.getTimezoneOffset() * 60000
  );
  return offsetDate.toISOString().split('T')[0];
}

const formattedStartDate = computed({
  get() {
    return formatDate(startDate.value);
  },

  set(value) {
    startDate.value = new Date(value);
    const minEnd = new Date(startDate.value);
    minEnd.setDate(minEnd.getDate() + 1);
    if (endDate.value < minEnd) {
      endDate.value = minEnd;
    }
  }
});

const formattedEndDate = computed({
  get() {
    return formatDate(endDate.value);
  },

  set(value) {
    endDate.value = new Date(value);
  }
});

const minEndDate = computed(() => {
  if (!startDate.value) return null;

  const minEnd = new Date(startDate.value);
  minEnd.setDate(minEnd.getDate() + 1);
  return formatDate(minEnd);
});

watch(
  [startDate, endDate],
  () => {
    const newDates = {
      startDate: formattedStartDate.value,
      endDate: formattedEndDate.value,
    };
    emit('update-dates', newDates);
  },
  { deep: true, immediate: true }
);

const resetToLastWeek = () => {
  const newStartDate = new Date();
  newStartDate.setDate(newStartDate.getDate() - 7);
  const newEndDate = new Date();

  startDate.value = newStartDate;
  endDate.value = newEndDate;
};
</script>

<style lang="scss" scoped>

</style>
