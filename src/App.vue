<script setup lang="ts">
import { watch } from "vue";
import useModal from "./composables/useModal";

const modal = useModal();
watch(
  () => modal.isShowModal,
  (newValue) => {
    document.body.style.overflow = newValue ? "hidden" : "auto";
  }
);
</script>

<template>
  <RouterView />
</template>
