<template>
  <div class="rounded-2xl border bg-white p-6 shadow-sm">
    <p class="text-3xl font-bold mb-4" data-testid="count">{{ counter.count }}</p>
    <div class="flex gap-2">
      <button class="rounded-xl border px-3 py-2" @click="counter.dec()">-</button>
      <button class="rounded-xl border px-3 py-2" @click="counter.inc()">+</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'
const counter = useCounterStore()
</script>