import { http } from '@/lib/http'

type HydraCollection<T> = {
  'hydra:member': T[]
}

export type CategoryResource = {
  id: number
  title: string
}

export type SkillResource = {
  id: number
  title: string
  category?: CategoryResource | null
}

export async function fetchCategories() {
  const { data } = await http.get<HydraCollection<CategoryResource>>('/categories', {
    params: { pagination: false, 'order[title]': 'asc' },
  })
  return data['hydra:member']
}

export async function fetchSkills() {
  const { data } = await http.get<HydraCollection<SkillResource>>('/skills', {
    params: { pagination: false, 'order[title]': 'asc' },
  })
  return data['hydra:member']
}
