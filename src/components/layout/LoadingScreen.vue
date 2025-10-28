<script lang="ts"></script>
<template>
  <div class="w-full h-screen flex items-center justify-center bg-white">
    <div
      class="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-64 w-64"
    ></div>
  </div>
</template>
<style scoped>
.loader {
  border-top-color: var(--orange);
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
