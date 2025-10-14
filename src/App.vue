<template>
  <div class="min-h-screen bg-gray-50 text-gray-900">
    <header class="border-b bg-white">
      <div class="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <h1 class="text-xl font-semibold">Leenup</h1>
        <nav class="space-x-4">
          <RouterLink to="/" class="hover:underline">Accueil</RouterLink>
          <RouterLink to="/about" class="hover:underline">À propos</RouterLink>
        </nav>
      </div>
    </header>
    <main class="mx-auto max-w-6xl px-4 py-8"><RouterView /></main>
  </div>
</template>
<script setup lang="ts"></script>