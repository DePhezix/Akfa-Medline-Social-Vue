<script setup lang="ts">
import HeroImage from "/images/landing-hero.avif";
import SearchIcon from "/svgs/search-icon.svg";
import RightArrow from "/svgs/right-white-arrow.svg";
import Button from "../../components/Global/Button.vue";
import HeroSearch from "./HeroSearch.vue";
import { fetchVacancyStats } from "../../ApiCalls/fetchVacancyStats";

import { useRoute } from "vue-router";
import { ref, watch, onMounted } from "vue";

type languageType = "en" | "ru";

interface textType {
  heading: string;
  searchPlaceholder: string;
  buttonText: string;
  subtitle: string;
  subheader: string;
}

interface VacancyStatsType {
  ru: string | undefined;
  en: string | undefined;
  count: number;
}

const text: Record<languageType, textType> = {
  ru: {
    heading: "Набираем команду, <br /> где каждый профессионал важен",
    searchPlaceholder: "Поиск по вакансии",
    buttonText: "Подать заявку",
    subtitle: "Следите за количеством заявок",
    subheader: "Поданные заявки на вакансии по направлениям:",
  },
  en: {
    heading: "We are recruiting a team where every professional is important",

    searchPlaceholder: "Search by vacancy",
    buttonText: "Submit an Application",
    subtitle: "Keep track of the number of applications",
    subheader: "Applications submitted for vacancies in the following areas:",
  },
};

const route = useRoute();
const isSearchOpen = ref<boolean>(false);
const vacancyStats = ref<VacancyStatsType[]>([]);

var currentLan = ref<languageType>(
  (route.params.language as languageType) || "ru"
);

onMounted(async () => {
  try {
    vacancyStats.value = await fetchVacancyStats();
  } catch (err) {
    console.error("Failed to fetch vacancy stats:", err);
  }
});

watch(
  () => route.params.language,
  (newLanguage) => {
    currentLan.value = (newLanguage as languageType) || "ru";
  }
);

const handleButtonClick = () => {
  isSearchOpen.value = true;
};
</script>

<template>
  <main
    class="min-[1600px]:h-[783px] w-full h-[650px] text-[#ffff] mt-[15.85px] pl-[15.625px] pr-[15.625px] max-2xl:overflow-x-hidden max-md:mt-[0] max-md:h-min max-md:p-[0]"
  >
    <div
      class="min-[1600px]:h-[783px] h-[650px] relative rounded-[16px] bg-cover bg-center bg-no-repeat max-md:pt-[200px] max-md:flex max-md:flex-col max-md:bg-center max-md:h-min"
      :style="{ backgroundImage: HeroImage ? `url(${HeroImage})` : '' }"
    >
      <div class="w-full h-full">
        <div
          class="absolute bottom-[251px] left-[60px] gap-[36px] w-[905px] flex flex-col max-md:static max-md:content-end max-md:items-center max-md:w-full max-md:h-full max-md:gap-[44px] max-md:p-[24px] max-md:pl-[16px] max-md:pr[16px] max-md:mb-[40px]"
        >
          <div class="w-[628px] h-min max-md:w-full">
            <h1
              class="w-[628px] h-[202px] text-[56px] leading-[67.2px] tracking-[-1px] align-middle max-md:text-[40px] max-md:font-[400] max-md:leading-[40px] max-md:h-min max-md:w-full max-[640px]:text-[32px]"
              v-html="text[currentLan].heading"
            />
          </div>

          <div
            class="gap-[16px] w-max h-min flex max-md:flex-col max-md:w-full"
          >
            <div
              class="flex rounded-[5px] p-[24px] pt-[16px] pb-[16px] gap-[15px] bg-white items-center cursor-pointer max-md:w-full"
              @click="handleButtonClick"
            >
              <img
                :src="SearchIcon"
                alt="search icon"
                class="w-[20px] h-[20px]"
              />
              <input
                :placeholder="text[currentLan].searchPlaceholder"
                class="w-[256px] h-[19px] text-[#c2c2c2] text-[16px] bg-transparent pointer-events-none focus:outline-none max-md:w-full"
                readOnly
              />
            </div>
            <RouterLink
              :to="{
                name: 'landing',
                params: currentLan === 'ru' ? {} : { language: currentLan },
                hash: '#vacancies',
              }"
              class="no-underline"
            >
              <Button
                :text="text[currentLan].buttonText"
                :imgSrc="RightArrow"
                imgAlt="right arrow"
              />
            </RouterLink>
          </div>
        </div>

        <div
          class="absolute bottom-[48px] left-[60px] gap-[36px] flex flex-col max-md:static max-md:pb-[40px] max-md:pl-[16px] max-md:pr-[16px]"
        >
          <div class="flex flex-col gap-[12px] justify-center">
            <h3
              class="w-max font-[500] text-[24px] tracking-[-0.5px] align-middle max-md:w-full"
            >
              {{ text[currentLan].subtitle }}
            </h3>
            <p class="text-[12px] leading-[14.4px] h-[15px] align-middle">
              {{ text[currentLan].subheader }}
            </p>
          </div>

          <div
            class="flex gap-[16.5px] max-md:grid max-md:grid-cols-2 max-md:gap-[1rem]"
          >
            <div
              v-for="item in vacancyStats"
              key="{index}"
              class="flex flex-col pr-[24px] gap-[8px] border-r border-solid border-[rgba(255, 255, 255, 0.4)] h-[62px] max-md:h-min"
            >
              <p
                class="h-[15px] font-[500] leading-[14.4px] tracking-[-0.24px] text-[12px] max-2xl:h-max"
              >
                {{ item[currentLan] }}
              </p>
              <Suspense>
                <p
                  class="font-[500] text-[32px] leading-[38.4px] tracking-[-0.64px]"
                >
                  {{ item.count }}
                </p>
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>

  <HeroSearch
    :isSearchOpen="isSearchOpen"
    @update-is-search-open="(val) => (isSearchOpen = val)"
  />
</template>
