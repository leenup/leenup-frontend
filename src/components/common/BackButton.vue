<template>
  <button type="button" @click="onClick" :aria-label="ariaLabel">
    <img :src="backIcon" alt="" aria-hidden="true" />
  </button>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import backIcon from '@/assets/icons/common/fleche-retour.svg'

const props = withDefaults(defineProps<{ ariaLabel?: string; to?: string }>(), {
  ariaLabel: 'Revenir',
  to: undefined,
})

const router = useRouter()
const onClick = () => {
  if (props.to) router.push(props.to)
  else router.back()
}
</script>
