<script setup lang="ts">
import type { RouterLink } from "vue-router";
import RightArrow from '/svgs/right-white-arrow.svg'
import Clock from '/svgs/clock.svg'

const props = defineProps<{
  title: string;
  numberOfApplicants: number;
  jobID: number;
  language: string;
}>();

const linkPath =
  props.language === "ru"
    ? `/Akfa-Medline-Social-Vue/jobs/${props.jobID}`
    : `/Akfa-Medline-Social-Vue/${props.language}/jobs/${props.jobID}`;
</script>

<template>
  <RouterLink
    :to="linkPath"
    class="group w-[604px] h-[102.98px] rounded-[5px] bg-[#FAFAFA] relative overflow-hidden transition duration-300 ease-linear content-[''] after:absolute after:bottom-[0] after:left-[0] after:h-px after:w-[0] after:bg-red after:transition-[width] after:duration-300 after:ease-linear hover:after:w-full max-2xl:min-w-[350px] max-2xl:flex-1 max-sm:min-w-[280px]"
  >
    <div
      class="font-[500] text-[18px] leading-[25.2px] tracking-[-0.5px] text-black absolute top-[14.5px] left-[15px] max-2xl:pr-[50px]"
    >
      {{title}}
    </div>
    <img
      :src="Clock"
      alt="clock icon"
      class="absolute top-[41.57px] left-[15px] w-[18px] h-[21px] max-2xl:top-[70px]"
    />
    <div
      class="text-[14px] leading-[23.8px] text-red absolute top-[40.08px] left-[38px] max-2xl:top-[70px]"
    >
      Number of applicants: {{numberOfApplicants}}
    </div>
    <div class="absolute top-[19.48px] right-[15px] rounded-[5px]">
      <div
        class="w-[40px] h-[40px] flex justify-center items-center rounded-full border border-solid border-[#E3E5E5] cursor-pointer transition-transform duration-300 ease-linear"
      >
        <img
        :src="RightArrow"
          alt=""
          class="group-hover:-rotate-45 w-[20px] h-[20px] transition-transform duration-300 ease-linear brightness-0 grayscale-100"
        />
      </div>
    </div>
  </RouterLink>
</template>
