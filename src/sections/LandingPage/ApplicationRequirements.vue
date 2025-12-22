<script setup lang="ts">
import Button from "../../components/Global/Button.vue";
import RightArrow from "/svgs/right-white-arrow.svg";
import { useRoute, RouterLink } from "vue-router";
import { watch, ref, computed } from "vue";

interface textType {
  header: string;
  requirements: string;
  workMode: string;
  deadline: string;
  date: string;
  button: string;
}

type languagesType = "ru" | "en";

const text: Record<languagesType, textType> = {
  ru: {
    header: "Общие требования и условия",
    requirements:
      "Требования: Закончившиеся или учащиеся в резидентуре, работающие или стажеры, учащиеся или работающие в других странах.",
    workMode:
      "Режим работы: 6/7, с 8:00 до 5:00. Кандидаты рассматриваются на полный рабочий график.",
    deadline: "Подача резюме открыта до",
    date: "31 марта 2026",
    button: "Подать заявку",
  },
  en: {
    header: "General Requirements & Conditions",
    requirements:
      "Requirements: Completed or currently enrolled in a residency program. Working or interning in the medical field. Studying or working in other countries is also considered.",
    workMode:
      "Working hours: 6 days a week (Monday–Saturday), from 8:00 AM to 5:00 PM. Candidates will be considered for full-time positions.",
    deadline: "Applications are open until",
    date: "March 31, 2026",
    button: "Submit an application",
  },
};

const route = useRoute();

const currentLan = ref<languagesType>(route.params.language as languagesType || "ru");

const currentText = computed(() => text[currentLan.value]);

watch(
  () => route.params.language,
  (newLanguage) => {
    currentLan.value = newLanguage as languagesType || "ru"
  }
);
</script>

<template>
  <section
    class="max-2xl:w-full max-md:flex-col max-md:p-[20px] w-[1280px] flex rounded-[12px] p-[40px] gap-[42px] bg-[#f3f4f4] mb-[80px]"
    ref="{container}"
  >
    <div class="max-md:w-full w-[568px]">
      <header
        class="max-md:text-[32px] max-md:leading-[40px] font-[600] text-[36px] leading-[140%] tracking-[-0.5px] align-middle text-black"
      >
        <h4 class="w-full">{{ currentText.header }}</h4>
      </header>
    </div>

    <div class="max-2xl:w-full flex flex-col pr-[8.28px] gap-[16px]">
      <div
        class="max-2xl:w-full text-[16px] leading-[22.4px] align-middle w-[469px]"
      >
        <span class="font-[600]">
          {{ currentText.requirements.split(":")[0] }}:
        </span>
        {{ currentText.requirements.split(":")[1] }}
      </div>
      <div
        class="max-2xl:w-full text-[16px] leading-[22.4px] align-middle w-[469px]"
      >
        <span
        v-for="(item, index) in currentText.workMode.split(':')"
          :key="index"
        >
          <span class="font-[600]" v-if="index === 0">{{ item }}:</span>
          <span v-else-if="index != currentText.workMode.split(':').length - 1">
            {{ item }}:
          </span>
          <span v-else>
            {{ item }}
          </span>
        </span>
      </div>
      <div
        class="max-2xl:w-full max-md:text-[18px] max-md:leading-[120%] w-[469px] font-[600] text-[20px] leading-[150%] align-middle"
      >
        {{currentText.deadline}} <br />
        {{currentText.date}}
      </div>
      <RouterLink
        smooth
        :to="
          currentLan === 'ru'
            ? '/Akfa-Medline-Social-Vue/#vacancies'
            : `/Akfa-Medline-Social-Vue/${currentLan}#vacancies`
        "
        class="max-md:w-full w-max no-underline"
      >
        <Button
          :text="currentText.button"
          :imgSrc="RightArrow"
          imgAlt="right arrow"
          variant="black"
        />
      </RouterLink>
    </div>
  </section>
</template>
