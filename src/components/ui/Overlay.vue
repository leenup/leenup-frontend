<template>
  <div class="fixed inset-0 z-40" :class="modeClass" @click="$emit('close')"></div>
</template>
<script setup lang="ts">
const props = withDefaults(defineProps<{ mode?: 'heavy'|'medium'|'light' }>(),{ mode:'medium' })
const modeClass = { heavy:'overlay-heavy', medium:'overlay-medium', light:'overlay-light' }[props.mode]
</script>