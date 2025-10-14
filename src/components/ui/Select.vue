<template>
  <select
    class="w-full rounded-200 border border-primary-200 bg-white px-3 py-2
           focus:border-primary-400 focus:ring-2 focus:ring-secondary-200 outline-none"
    v-bind="$attrs"
  ><slot /></select>
</template>
<script setup lang="ts"></script>