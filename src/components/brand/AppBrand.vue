<template>
  <div
    class="flex flex-col items-center md:items-start gap-2"
    :class="[$attrs.class]"
  >
    <!-- TODO: Remplacer '#' par l'URL de la landing page (site vitrine Leenup) -->
    <a href="#" class="block">
      <img
        src="@/assets/brand/logo/LogoSlogan.svg"
        alt="Leenup"
        class="h-10 md:h-24"
        style="margin-top: clamp(2rem, 8vh, 4rem);"
      />
    </a>
  </div>
</template>

<script setup lang="ts"></script>