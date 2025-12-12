<template>
  <main class="min-h-screen bg-surface-bg text-primary-600 px-4 py-6 md:px-6 md:py-10">
    <div class="mx-auto flex w-full max-w-xl flex-col gap-6">
      <OnboardingStepHeader :progress="progress" :default-back="false" @back="handleBackNavigation" />

      <OnboardingHintCard>
        Dis-nous quels sont tes objectifs.<br />
        Tu as jusqu'a 3 choix possibles.
      </OnboardingHintCard>

      <section class="space-y-2 text-center">
        <h1 class="text-h2 text-primary-600">Objectifs</h1>
      </section>

      <section v-if="loading">
        <p class="text-center text-small text-secondary-700">Chargement des objectifs...</p>
      </section>

      <section
        v-else-if="errorMessage"
        class="flex flex-col items-center gap-3 rounded-400 bg-surface-panel px-4 py-6 text-center shadow-e-100"
      >
        <p class="text-small text-primary-700">{{ errorMessage }}</p>
        <button class="rounded-300 bg-primary-900 px-4 py-2 text-sm font-semibold text-white shadow-e-200" @click="fetchSkills">
          Reessayer
        </button>
      </section>

      <OnboardingScrollableList v-else>
        <ul class="flex flex-col gap-3">
          <li v-for="skill in skills" :key="skill.id">
            <button
              type="button"
              class="flex w-full items-center gap-3 rounded-400 border px-4 py-3 text-left transition"
              :class="isSelected(skill.id)
                ? 'border-primary-600 bg-primary-50 text-primary-700 shadow-e-200'
                : 'border-primary-200 bg-white text-primary-700 hover:border-orange-400'"
              @click="toggleObjective(skill.id)"
            >
              <span
                class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full"
                :class="isSelected(skill.id) ? 'bg-primary-600 text-white' : 'bg-secondary-400 text-primary-700'"
              >
                <IconTarget class="h-5 w-5" />
              </span>
              <span class="text-small text-primary-700">{{ skill.title }}</span>
              <span class="ml-auto text-mini text-secondary-700" v-if="isSelected(skill.id)">
                {{ selectionOrder(skill.id) }}/{{ MAX_SELECTION }}
              </span>
            </button>
          </li>
        </ul>
      </OnboardingScrollableList>

      <button
        class="mt-4 w-full rounded-400 bg-primary-900 px-6 py-3 text-base font-semibold text-surface-button shadow-e-300 transition disabled:cursor-not-allowed disabled:bg-secondary-500 disabled:text-primary-600"
        :disabled="!canProceed || loading"
        @click="handleNext"
      >
        Suivant
      </button>
      <ConfirmDialog
        :open="showBackDialog"
        title="Quitter l'onboarding ?"
        description="Tu vas perdre les informations renseignees pour ce parcours. Es-tu sure de vouloir revenir a l'ecran precedent ?"
        confirm-label="Revenir en arriere"
        cancel-label="Continuer"
        @update:open="showBackDialog = $event"
        @confirm="confirmBackNavigation"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import IconTarget from '@/components/icons/IconHome.vue'
import OnboardingStepHeader from '@/components/onboarding/OnboardingStepHeader.vue'
import OnboardingHintCard from '@/components/onboarding/OnboardingHintCard.vue'
import OnboardingScrollableList from '@/components/onboarding/OnboardingScrollableList.vue'
import ConfirmDialog from '@/components/common/ConfirmDialog.vue'
import { useOnboardingStore } from '@/stores/onboarding'
import { useCatalogStore } from '@/stores/catalog'

const router = useRouter()
const onboardingStore = useOnboardingStore()
const catalogStore = useCatalogStore()
const MAX_SELECTION = 3
const progress = 0.16

const loading = ref(false)
const errorMessage = ref('')
const showBackDialog = ref(false)

const fetchSkills = async () => {
  loading.value = true
  errorMessage.value = ''
  try {
    await catalogStore.ensureSkills()
  } catch (error: any) {
    errorMessage.value = error?.message ?? 'Impossible de charger les objectifs.'
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  onboardingStore.loadFromStorage()
  if (onboardingStore.role !== 'leener') {
    router.replace({ name: 'onboarding' })
    return
  }
  await fetchSkills()
})

const skills = computed(() => catalogStore.skills)
const selectedObjectives = computed(() => onboardingStore.leenerObjectives)
const canProceed = computed(() => selectedObjectives.value.length > 0)

const isSelected = (skillId: number) => selectedObjectives.value.includes(skillId)
const selectionOrder = (skillId: number) => selectedObjectives.value.indexOf(skillId) + 1

const toggleObjective = (skillId: number) => {
  onboardingStore.toggleLeenerObjective(skillId, MAX_SELECTION)
}

const handleNext = () => {
  if (!canProceed.value) return
  onboardingStore.setLeenerObjectives([...selectedObjectives.value])
  router.push({ name: 'onboarding-leener-choice-theme' })
}

const clearSession = () => {
  onboardingStore.clearLeenerObjectives()
  onboardingStore.clearLeenerThemes()
  onboardingStore.clearRole()
  if (typeof window !== 'undefined') {
    window.sessionStorage.removeItem('onboarding_role')
    window.sessionStorage.removeItem('onboarding_leener_objectives')
    window.sessionStorage.removeItem('onboarding_leener_themes')
  }
}

const handleBackNavigation = () => {
  showBackDialog.value = true
}

const confirmBackNavigation = () => {
  clearSession()
  showBackDialog.value = false
  router.push({ name: 'onboarding' })
}
</script>
