<template>
  <v-dialog :model-value="show" max-width="400" persistent @update:model-value="$emit('update:show', $event)">
    <v-card>
      <v-card-title class="text-h6">
        <v-icon color="warning" class="mr-2">mdi-alert-circle</v-icon>
        Confirm Logout
      </v-card-title>

      <v-card-text>
        Are you sure you want to logout?
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="grey"
          variant="text"
          @click="$emit('cancel')"
        >
          Cancel
        </v-btn>
        <v-btn
          color="error"
          variant="flat"
          @click="$emit('confirm')"
        >
          Logout
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
defineProps({
  show: {
    type: Boolean,
    required: true
  }
})

defineEmits(['confirm', 'cancel', 'update:show'])
</script>
