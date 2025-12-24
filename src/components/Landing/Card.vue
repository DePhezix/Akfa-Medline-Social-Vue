<script setup lang="ts">
const props = defineProps<{
  imgSrc: string;
  title: string;
  details: string;
  imgAlt?: string;
}>();
</script>

<template>
  <div
    class="flex flex-col rounded-[16px] p-[20px] gap-[24px] bg-[#f3f4f4] flex-1 min-w-[340px] max-md:gap-[10px] max-sm:min-w-full"
  >
    <img :src="imgSrc" class="w-[50px] h-[50px]" :alt="imgAlt" />
    <div class="flex flex-col gap-[9px] max-md:gap-[10px]">
      <h3
        class="font-[600] text-[24px] tracking-[-0.56px] h-[29px] flex items-center max-md:font-[400]"
      >
        {{title}}
      </h3>
      <p class="text-[15px] leading-[22.5px]">{{details}}</p>
    </div>
  </div>
</template>
