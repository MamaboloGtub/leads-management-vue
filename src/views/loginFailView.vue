<template>
  <v-container class="d-flex align-center justify-center min-height-screen">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="pa-6 elevation-8">
          <v-card-title class="text-center text-h4 mb-4">
            <v-icon class="me-2" color="error">mdi-account-alert</v-icon>
            Login Failed
          </v-card-title>

          <TheInvalidCredentials
            v-model="showAlert"
            :title="failureTitle"
            :message="failureMessage"
          />

          <v-divider class="my-4"></v-divider>

          <div class="d-flex flex-column gap-3">
            <v-btn
              color="primary"
              variant="elevated"
              size="large"
              block
              @click="goToLogin"
            >
              <v-icon class="me-2">mdi-arrow-left</v-icon>
              Try Again
            </v-btn>

            <v-btn
              color="secondary"
              variant="outlined"
              size="large"
              block
              @click="goToHome"
            >
              <v-icon class="me-2">mdi-home</v-icon>
              Go to Home
            </v-btn>
          </div>

          <v-card-text class="text-center mt-4">
            <div class="text-caption text-medium-emphasis">
              Need help? Contact support at
              <a href="mailto:support@example.com" class="text-primary">support@example.com</a>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import TheInvalidCredentials from '@/components/TheInvalidCredentials.vue'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const showAlert = ref(true)
const failureTitle = ref('Login Failed')
const failureMessage = ref('Seems like you do not have an account')

onMounted(() => {
  authStore.error = null

  const reason = route.query.reason || route.params.reason || 'default'

  switch (reason) {
    case 'invalid_credentials':
      failureTitle.value = 'Invalid Credentials'
      failureMessage.value = 'The email or password you entered is incorrect'
      break
    case 'account_not_found':
      failureTitle.value = 'Account Not Found'
      failureMessage.value = 'Seems like you do not have an account'
      break
    case 'account_locked':
      failureTitle.value = 'Account Locked'
      failureMessage.value = 'Your account has been temporarily locked due to multiple failed login attempts'
      break
    case 'server_error':
      failureTitle.value = 'Server Error'
      failureMessage.value = 'Something went wrong on our end. Please try again later'
      break
    default:
      failureTitle.value = 'Login Failed'
      failureMessage.value = 'Seems like you do not have an account'
  }
})
const goToLogin = () => {
  router.push('/login')
}

const goToHome = () => {
  router.push('/')
}
</script>

<style scoped>
/* .min-height-screen {
  min-height: 100vh;
}

.gap-3 {
  gap: 12px;
}

.text-primary {
  text-decoration: none;
}

.text-primary:hover {
  text-decoration: underline;
} */
</style>
