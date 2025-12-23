<script setup lang="ts">
import LoadingImage from "/images/loading.avif";
</script>

<template>
  <div class="flex bg-white justify-center items-start w-screen">
    <img
      :src="LoadingImage"
      alt="loading"
      className="w-[100px] animate-spin"
    />
  </div>
</template>
