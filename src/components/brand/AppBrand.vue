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
        class="h-14 md:h-20"
      />
    </a>
  </div>
</template>

<script setup lang="ts"></script>