<script setup lang="ts"></script>

<template>
  <div class="relative w-full h-screen [var(--pure-light)] z-0">
    <div class="absolute inset-0 -z-10 w-[65%] h-full">
      <img
        src="@/assets/images/hero-section.png"
        alt="Background"
        class="w-full h-full object-scale-down"
      />
    </div>
    <div
      class="w-[30%] flex flex-col items-center absolute rounded-2xl p-4 mx-4 top-1/4 right-0 bg-[var(--orange)]"
    >
      <h1 class="text-3xl font-bold mb-2 text-[var(--light-pink)]">Welcome To BuyIt</h1>
      <h2 class="text-lg mb-6 text-[var(--pure-light)]">Sign in to continue</h2>
      <input
        type="text"
        placeholder="Username"
        class="input-box w-full mb-4 border border-gray-300"
      />
      <input
        type="password"
        placeholder="Password"
        class="input-box w-full mb-6 border border-gray-300"
      />
      <button
        class="w-full bg-[var(--red)] text-white py-2 rounded hover:bg-blue-700 transition-colors duration-200"
      >
        Login
      </button>
      <p class="mt-4 text-sm text-[var(--pure-light)]">
        Don't have an account?
        <a href="#" class="text-blue-200 hover:underline">Sign Up</a>
      </p>
    </div>
  </div>
</template>
<style scoped></style>
