<script setup lang="ts">
import { ref, useSlots, computed, Fragment } from "vue";
import type { VNode } from "vue";
import DownArrow from "/svgs/downArrow.svg";

const props = defineProps<{
  itemsPerPage: number;
  className: string;
  paginationFor: string;
}>();

type PaginationType = Record<string, number>;
const paginationRecords = ref<PaginationType>({});

const currentPage = computed(
  () => paginationRecords.value[props.paginationFor] ?? 1
);

const slots = useSlots();

const childrenArray = computed(() => {
  const slotContent = slots.default?.() ?? [];
  const flattened: VNode[] = [];
  
  slotContent.forEach((vnode) => {
    if (vnode.type === Fragment && Array.isArray(vnode.children)) {
      flattened.push(...(vnode.children as VNode[]));
    } else {
      flattened.push(vnode);
    }
  });
  
  return flattened;
});

const totalPages = computed(() =>
  Math.max(1, Math.ceil(childrenArray.value.length / props.itemsPerPage))
);

const startIndex = computed(() => 
  (currentPage.value - 1) * props.itemsPerPage
);

const currentItems = computed<VNode[]>(() =>
  childrenArray.value.slice(
    startIndex.value, 
    startIndex.value + props.itemsPerPage
  )
);

const handlePageChange = (page: number) => {
  if (page < 1 || page > totalPages.value) return;
  paginationRecords.value[props.paginationFor] = page;
};
</script>

<template>
  <div class="flex flex-col items-center gap-[24px] w-full">
    <div class="w-full" :class="className">
      <component 
        v-for="(item, index) in currentItems" 
        :key="index"
        :is="item"
      />
    </div>

    <div
      class="flex items-center justify-center gap-[16px] text-[1rem] select-none"
    >
      <button
        @click="handlePageChange(currentPage - 1)"
        :disabled="currentPage === 1"
        class="w-[35px] h-[35px] flex items-center justify-center bg-red border-0 rounded-[8px] cursor-pointer hover:not-disabled:bg-[#c30629] active:not-disabled:translate-y-[0] disabled:opacity-40 disabled:cursor-default disabled:transform-none"
      >
        <img
          :src="DownArrow"
          alt="back arrow"
          class="w-[18px] h-[18px] invert transition-transform duration-200 ease-linear rotate-90"
        />
      </button>
      <span class="font-[500] text-[#333] m-w-[60px] text-center">
        {{ currentPage }} / {{ totalPages }}
      </span>
      <button
        @click="handlePageChange(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="w-[35px] h-[35px] flex items-center justify-center bg-red border-0 rounded-[8px] cursor-pointer hover:not-disabled:bg-[#c30629] active:not-disabled:translate-y-[0] disabled:opacity-40 disabled:cursor-default disabled:transform-none"
      >
        <img
          :src="DownArrow"
          alt="next arrow"
          class="w-[18px] h-[18px] invert transition-transform duration-200 ease-linear -rotate-90"
        />
      </button>
    </div>
  </div>
</template>