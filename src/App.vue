<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'
import TheLogoutModal from '@/components/TheLogoutModal.vue'

const authStore = useAuthStore()
const router = useRouter()
const showLogoutModal = ref(false)

const showLogoutConfirmation = () => {
  showLogoutModal.value = true
}

const handleLogoutConfirm = async () => {
  showLogoutModal.value = false
  authStore.logout()
  await router.push('/login')
}

const handleLogoutCancel = () => {
  showLogoutModal.value = false
}
</script>

<template>
  <v-app>
    <v-app-bar v-if="authStore.isAuthenticated" color="primary" dark>
      <v-app-bar-title>Leads Management</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="showLogoutConfirmation">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
    <TheLogoutModal
      v-model:show="showLogoutModal"
      @confirm="handleLogoutConfirm"
      @cancel="handleLogoutCancel"
    />
  </v-app>
</template>


