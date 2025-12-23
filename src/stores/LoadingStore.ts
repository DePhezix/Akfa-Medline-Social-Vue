import { defineStore } from "pinia";
import { ref } from "vue";

export const useLoadingStore = defineStore("loading", () => {
  const isLoading = ref<boolean>(false);
  const amountLoading = ref<number>(0);

  function toggleLoading() {
    isLoading.value = !isLoading.value;
  }

  function addLoadingCount() {
    amountLoading.value++;
  }

  function decreaseLoadingCount() {
    amountLoading.value--;
  }

  return {
    isLoading,
    amountLoading,
    toggleLoading,
    addLoadingCount,
    decreaseLoadingCount,
  };
});
