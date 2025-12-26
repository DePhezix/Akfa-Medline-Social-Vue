<script setup lang="ts">
import { watch } from "vue";

import { usePopUpStore } from "./stores/popUpStore";

const store = usePopUpStore();
watch(
  () => store.isPopUpOpen,
  (newValue) => {
    document.body.style.overflow = newValue ? "hidden" : "auto";
  }
);
</script>

<template>
  <RouterView />
</template>
