<template>
  <main class="min-h-screen bg-surface-bg text-primary-600 px-4 py-6 md:px-6 md:py-10">
    <div class="mx-auto flex w-full max-w-3xl flex-col gap-6">
      <OnboardingStepHeader :progress="progress" :default-back="false" @back="handleBackNavigation" />

      <OnboardingHintCard>
        Dis-nous quels sujets t'interessent.<br />
        Tu as jusqu'a 5 choix possibles.
      </OnboardingHintCard>

      <section class="space-y-2 text-center">
        <h1 class="text-h2 text-primary-600">Themes</h1>
        <p class="text-small text-secondary-700">Ces themes nous aideront a te proposer les mentors les plus pertinents.</p>
      </section>

      <section v-if="loading">
        <p class="text-center text-small text-secondary-700">Chargement des themes...</p>
      </section>

      <section
        v-else-if="errorMessage"
        class="flex flex-col items-center gap-3 rounded-400 bg-surface-panel px-4 py-6 text-center shadow-e-100"
      >
        <p class="text-small text-primary-700">{{ errorMessage }}</p>
        <button class="rounded-300 bg-primary-900 px-4 py-2 text-sm font-semibold text-white shadow-e-200" @click="fetchCatalog">
          Reessayer
        </button>
      </section>

      <section v-else class="space-y-8">
        <section v-if="preferredCategories.length" class="space-y-3">
          <div class="space-y-1 text-left">
            <h2 class="text-h3 text-primary-800">Recommande pour toi</h2>
            <p class="text-mini text-secondary-700">Selectionnes d'abord les themes relies a tes objectifs.</p>
          </div>
          <ThemeSlider
            v-if="preferredCategories.length > 3"
            :themes="preferredCategories"
            :selected="selectedThemes"
            :max-selection="MAX_THEMES"
            @toggle="toggleTheme"
          />
          <div v-else class="grid grid-cols-2 gap-3 md:grid-cols-3">
            <button
              v-for="category in preferredCategories"
              :key="category.id"
              type="button"
              class="flex h-28 flex-col items-center justify-center gap-3 rounded-400 border px-4 py-3 text-center transition"
              :class="isThemeSelected(category.id)
                ? 'border-primary-900 bg-primary-900 text-surface-button shadow-e-200'
                : 'border-primary-200 bg-white text-primary-800 hover:border-primary-500'"
              @click="toggleTheme(category.id)"
            >
              <span
                class="flex h-12 w-12 items-center justify-center rounded-full border"
                :class="isThemeSelected(category.id) ? 'border-white text-white bg-primary-800' : 'border-primary-400 text-primary-600'"
              >
                <IconTheme class="h-6 w-6" />
              </span>
              <span class="text-small font-semibold">{{ category.title }}</span>
              <span class="text-mini text-secondary-500" v-if="isThemeSelected(category.id)">
                {{ selectionOrder(category.id) }}/{{ MAX_THEMES }}
              </span>
            </button>
          </div>
        </section>

        <section class="space-y-3">
          <div class="space-y-1 text-left">
            <h2 class="text-h3 text-primary-800">Autres themes</h2>
            <p class="text-mini text-secondary-700">Tu peux ajouter d'autres sujets si besoin.</p>
          </div>
          <ThemeSlider
            v-if="otherCategories.length > 3"
            :themes="otherCategories"
            :selected="selectedThemes"
            :max-selection="MAX_THEMES"
            @toggle="toggleTheme"
          />
          <div v-else class="grid grid-cols-2 gap-3 md:grid-cols-3">
            <button
              v-for="category in otherCategories"
              :key="category.id"
              type="button"
              class="flex h-28 flex-col items-center justify-center gap-3 rounded-400 border px-4 py-3 text-center transition"
              :class="isThemeSelected(category.id)
                ? 'border-primary-900 bg-primary-900 text-surface-button shadow-e-200'
                : 'border-primary-200 bg-white text-primary-800 hover:border-primary-500'"
              @click="toggleTheme(category.id)"
            >
              <span
                class="flex h-12 w-12 items-center justify-center rounded-full border"
                :class="isThemeSelected(category.id) ? 'border-white text-white bg-primary-800' : 'border-primary-400 text-primary-600'"
              >
                <IconTheme class="h-6 w-6" />
              </span>
              <span class="text-small font-semibold">{{ category.title }}</span>
              <span class="text-mini text-secondary-500" v-if="isThemeSelected(category.id)">
                {{ selectionOrder(category.id) }}/{{ MAX_THEMES }}
              </span>
            </button>
          </div>
        </section>
      </section>

      <button
        class="mt-4 w-full rounded-400 bg-primary-900 px-6 py-3 text-base font-semibold text-surface-button shadow-e-300 transition disabled:cursor-not-allowed disabled:bg-secondary-500 disabled:text-primary-600"
        :disabled="!canProceed || loading"
        @click="handleNext"
      >
        Suivant
      </button>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import IconTheme from '@/components/icons/IconHome.vue'
import OnboardingStepHeader from '@/components/onboarding/OnboardingStepHeader.vue'
import OnboardingHintCard from '@/components/onboarding/OnboardingHintCard.vue'
import ThemeSlider from '@/components/onboarding/ThemeSlider.vue'
import { useOnboardingStore } from '@/stores/onboarding'
import { useCatalogStore } from '@/stores/catalog'

const router = useRouter()
const onboardingStore = useOnboardingStore()
const catalogStore = useCatalogStore()
const progress = 0.26
const MAX_THEMES = 5

const loading = ref(false)
const errorMessage = ref('')

const fetchCatalog = async () => {
  loading.value = true
  errorMessage.value = ''
  try {
    await Promise.all([catalogStore.ensureSkills(), catalogStore.ensureCategories()])
  } catch (error: any) {
    errorMessage.value = error?.message ?? 'Impossible de charger les themes.'
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
  if (onboardingStore.leenerObjectives.length === 0) {
    router.replace({ name: 'onboarding-leener' })
    return
  }
  await fetchCatalog()
})

const categories = computed(() => catalogStore.categories)
const skills = computed(() => catalogStore.skills)
const selectedThemes = computed(() => onboardingStore.leenerThemes)
const canProceed = computed(() => selectedThemes.value.length > 0)

const selectedCategoryIds = computed(() => {
  const ids = new Set<number>()
  skills.value.forEach((skill) => {
    if (onboardingStore.leenerObjectives.includes(skill.id) && skill.category?.id) {
      ids.add(skill.category.id)
    }
  })
  return Array.from(ids)
})

const preferredCategories = computed(() => {
  const set = new Set(selectedCategoryIds.value)
  return categories.value.filter((category) => set.has(category.id))
})

const otherCategories = computed(() => {
  const set = new Set(selectedCategoryIds.value)
  return categories.value.filter((category) => !set.has(category.id))
})

const isThemeSelected = (categoryId: number) => selectedThemes.value.includes(categoryId)
const selectionOrder = (categoryId: number) => selectedThemes.value.indexOf(categoryId) + 1

const toggleTheme = (categoryId: number) => {
  onboardingStore.toggleLeenerTheme(categoryId, MAX_THEMES)
}

const handleNext = () => {
  if (!canProceed.value) return
  onboardingStore.setLeenerThemes([...selectedThemes.value])
  router.push({ name: 'onboarding-leener-profile' })
}

const handleBackNavigation = () => {
  const confirmed = window.confirm('Revenir en arriere effacera vos themes selectionnes. Continuer ?')
  if (!confirmed) return
  onboardingStore.clearLeenerThemes()
  router.back()
}
</script>
