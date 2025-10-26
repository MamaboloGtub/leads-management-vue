<template>
  <v-alert
    v-model="show"
    type="error"
    variant="tonal"
    closable
    class="mb-4"
    :class="alertClass"
  >
    <v-row align="center" no-gutters>
      <v-col>
        <div class="d-flex align-center">
          <v-icon class="me-2" size="small">mdi-account-alert</v-icon>
          <div>
            <div class="text-subtitle-2 font-weight-medium">{{ title }}</div>
            <div class="text-body-2 mt-1">{{ message }}</div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-alert>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: true
  },
  title: {
    type: String,
    default: 'Account Not Found'
  },
  message: {
    type: String,
    default: 'Seems like you do not have an account'
  },
  showActions: {
    type: Boolean,
    default: true
  },
  showCreateAccount: {
    type: Boolean,
    default: true
  },
  showForgotPassword: {
    type: Boolean,
    default: true
  },
  persistent: {
    type: Boolean,
    default: false
  },
  variant: {
    type: String,
    default: 'tonal',
    validator: (value) => ['flat', 'outlined', 'tonal'].includes(value)
  },
  dense: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'create-account', 'forgot-password', 'close'])

const show = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
    if (!value) {
      emit('close')
    }
  }
})

const alertClass = computed(() => ({
  'pa-2': props.dense,
  'pa-4': !props.dense
}))
</script>

<style scoped>
.v-alert {
  border-radius: 8px;
}

.v-alert--variant-tonal {
  background-color: rgba(244, 67, 54, 0.08);
  border: 1px solid rgba(244, 67, 54, 0.2);
}

.gap-2 {
  gap: 8px;
}
</style>
