<script setup lang="ts">
const props = defineProps<{
  title?: string;
  salary?: string;
  category?: string;
}>();
</script>

<template>
  <section
    class="max-2xl:w-full flex flex-col w-[844px] rounded-[16px] p-[16px] pl-[0] gap-[24px] text-black mb-[40px]"
    aria-labelledby="overview-title"
  >
    <h2
      id="overview-title"
      class="w-full font-[600] text-[32px] leading-[32px]"
    >
      Описание позиции
    </h2>

    <dl class="max-2xl:w-full flex flex-col w-[368px] gap-[24px]">
      <div
        class="max-sm:flex-col max-sm:gap-[8px] flex gap-[22px] w-full text-[16px] leading-[24px]"
        v-if="title"
      >
        <dt class="basis-1/2 max-w-1/2">Должность:</dt>
        <dd class="basis-1/2 max-w-1/2 font-[500]">{{title}}</dd>
      </div>
      <div
        class="max-sm:flex-col max-sm:gap-[8px] flex gap-[22px] w-full text-[16px] leading-[24px]"
        v-if="category"
      >
        <dt class="basis-1/2 max-w-1/2">Направление:</dt>
        <dd class="basis-1/2 max-w-1/2 font-[500]">{{category}}</dd>
      </div>
      <div
        class="max-sm:flex-col max-sm:gap-[8px] flex gap-[22px] w-full text-[16px] leading-[24px]"
        v-if="salary"
      >
        <dt class="basis-1/2 max-w-1/2">Зарплата:</dt>
        <dd class="basis-1/2 max-w-1/2 font-[500]">{{salary}} UZS</dd>
      </div>
    </dl>
  </section>
</template>
