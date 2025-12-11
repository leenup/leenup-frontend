import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchCategories, fetchSkills, type CategoryResource, type SkillResource } from '@/services/catalog.service'

export const useCatalogStore = defineStore('catalog', () => {
  const skills = ref<SkillResource[]>([])
  const categories = ref<CategoryResource[]>([])
  const skillsLoading = ref(false)
  const categoriesLoading = ref(false)
  const skillsError = ref<string | null>(null)
  const categoriesError = ref<string | null>(null)

  const ensureSkills = async () => {
    if (skills.value.length) return
    skillsLoading.value = true
    skillsError.value = null
    try {
      skills.value = await fetchSkills()
    } catch (error: any) {
      skillsError.value = error?.message ?? 'Impossible de charger les compétences.'
      throw error
    } finally {
      skillsLoading.value = false
    }
  }

  const ensureCategories = async () => {
    if (categories.value.length) return
    categoriesLoading.value = true
    categoriesError.value = null
    try {
      categories.value = await fetchCategories()
    } catch (error: any) {
      categoriesError.value = error?.message ?? 'Impossible de charger les thèmes.'
      throw error
    } finally {
      categoriesLoading.value = false
    }
  }

  const reset = () => {
    skills.value = []
    categories.value = []
    skillsError.value = null
    categoriesError.value = null
  }

  return {
    skills,
    categories,
    skillsLoading,
    categoriesLoading,
    skillsError,
    categoriesError,
    ensureSkills,
    ensureCategories,
    reset,
  }
})
