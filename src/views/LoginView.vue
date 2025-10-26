<template>
  <v-container class="d-flex align-center justify-center min-height-screen">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="pa-6 elevation-8">
          <v-card-title class="text-center text-h4 mb-4">
            Login
          </v-card-title>
          <v-alert v-if="authStore.error" type="error" dismissible @click:close="authStore.error = null" class="mb-4">
            {{ authStore.error }}
          </v-alert>

          <v-form v-model="valid" ref="form" @submit.prevent="login">
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="Email"
              type="email"
              required
              prepend-inner-icon="mdi-email"
              variant="outlined"
              class="mb-3"
              :disabled="authStore.loading"
            />

            <v-text-field
              v-model="password"
              :rules="passwordRules"
              label="Password"
              :type="showPassword ? 'text' : 'password'"
              required
              prepend-inner-icon="mdi-lock"
              :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append-inner="showPassword = !showPassword"
              variant="outlined"
              class="mb-4"
              :disabled="authStore.loading"
            />

            <v-btn
              type="submit"
              color="primary"
              size="large"
              block
              :disabled="!valid || authStore.loading"
              :loading="authStore.loading"
            >
              Login
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const valid = ref(false)
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const form = ref(null)

const emailRules = [
  value => {
    if (value) return true
    return 'Email is required'
  },
  value => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (pattern.test(value)) return true
    return 'Invalid email format'
  }
]

const passwordRules = [
  value => {
    if (value) return true
    return 'Password is required'
  },
  value => {
    if (value && value.length >= 6) return true
    return 'Password must be at least 6 characters'
  }
]

const login = async () => {
  if (valid.value) {
    try {
      await authStore.login({
        email: email.value,
        password: password.value
      });
      await router.push('/')
    } catch (error) {
      console.error('Login failed:', error);
      await router.push({
        name: 'LoginFailed',
        query: { reason: authStore.loginFailureReason || 'default' }
      })
    }
  }
}
</script>

<style scoped>
.min-height-screen {
  min-height: 100vh;
}
</style>
