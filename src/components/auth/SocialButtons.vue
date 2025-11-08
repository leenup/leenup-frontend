<template>
  <div :class="stackClass">
    <Button variant="primary" class="w-full font-sans typography-button" @click="onEmail">Connexion E-mail</Button>
    <Button variant="white" class="w-full flex items-center justify-center gap-2 font-sans typography-button" @click="onGoogle">
      <img src="@/assets/brand/icons/google.svg" alt="" class="h-5 w-5" aria-hidden="true" />
      Connexion Google
    </Button>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/ui/Button.vue'
import { useAuthProviders } from '@/composables/useAuthProviders'
import { useAnalytics } from '@/composables/useAnalytics'
import { computed } from 'vue'

const { loginWithEmail, loginWithGoogle } = useAuthProviders()
const { track } = useAnalytics()

const stackClass = computed(() => 'flex flex-col md:flex-row md:items-center md:gap-3 gap-3')

const onEmail = () => { track('login_email_clicked'); loginWithEmail() }
const onGoogle = () => { track('login_google_clicked'); loginWithGoogle() }
</script>