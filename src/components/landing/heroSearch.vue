<script setup lang="ts">
import { ref, watch, computed, onMounted } from "vue";
import { useRoute } from "vue-router";

import { useVacancyDataStore } from "../../stores/vacancyDataStore";
import { usePopUpStore } from "../../stores/popUpStore";

import CloseImg from "/svgs/x.svg";
import SearchImg from "/svgs/search-icon.svg";

const props = defineProps<{
  isSearchOpen: boolean;
}>();
const emit = defineEmits<{
  (e: "updateIsSearchOpen", value: boolean): void;
}>();

interface VacancyType {
  title: string;
  id: number;
  salary: string;
  category: string;
  onWaitingList: number;
  body: string;
  requirements: string;
  conditions: string;
}

type languagesType = "en" | "ru";

const store = usePopUpStore();
const vacancyStore = useVacancyDataStore();

var currentLan = ref<languagesType>("ru");
const searchTerm = ref<string>("");

const route = useRoute();

const vacancies = ref<VacancyType[]>([]);
const filteredVacancies = computed<VacancyType[]>(() => {
  if (searchTerm.value == "" && vacancies) {
    return vacancies.value.slice(0, 8);
  } else if (searchTerm.value == "") {
    return [];
  } else {
    const filtered = vacancies.value.filter((v) =>
      v.title.toLowerCase().includes(searchTerm.value)
    );
    return filtered;
  }
});

watch(
  () => route.params.language,
  (newLanguage) => {
    if (typeof newLanguage === "string") {
      currentLan.value = newLanguage as languagesType;
    } else {
      currentLan.value = "ru";
    }
  }
);

onMounted(async () => {
  await vacancyStore.fetchAndSetVacancies();
  vacancies.value = vacancyStore.vacancies;
});

const handleClose = () => {
  store.setIsPopupOpen(false);
  emit("updateIsSearchOpen", false);
};

const stopPropagation = (e: MouseEvent) => e.stopPropagation();

const clearSearch = () => {
  searchTerm.value = "";
};

const getVacancyLink = (id: number) => {
  if (currentLan.value && currentLan.value !== "ru") {
    return `/Akfa-Medline-Social-Vue/${currentLan.value}/jobs/${id}/`;
  }
  return `/Akfa-Medline-Social-Vue/jobs/${id}`;
};
</script>

<template>
  <div
    class="fixed bg-[rgba(0,0,0,0.45)] items-center justify-center z-10000 backdrop-blur-[6px] overflow-y-auto h-screen w-screen"
    :class="isSearchOpen ? 'flex' : 'hidden'"
    @click="handleClose"
  >
    <div
      class="flex flex-col w-[758px] bg-[linear-gradient(180deg,#ffffff_0%,#fafafa_100%)] text-black h-min shadow-middle translate-y-[10px] rounded-[10px] overflow-x-hidden"
      @click="stopPropagation"
    >
      <div class="flex relative">
        <img
          :src="SearchImg"
          alt="search icon"
          class="absolute left-[12px] top-1/2 -translate-y-1/2 w-[16px] h-[16px] pointer-events-none"
        />
        <input
          type="text"
          placeholder="Search..."
          v-model="searchTerm"
          class="border-0 focus:outline-0 p-[12px] pl-[40px] pr-[40px] w-full h-[51.2px] text-[100%]"
        />
        <img
          :src="CloseImg"
          alt="clear search"
          class="w-[28px] h-[28px] cursor-pointer rounded-[50%] flex justify-center items-center transition duration-250 ease-linear absolute right-[10px] top-1/2 -translate-y-1/2 hover:bg-[rgba(0,0,0,0.1) hover:translate-y-1/2 hover:rotate-90"
          @click="
            {
              clearSearch;
            }
          "
          v-if="searchTerm"
        />
      </div>

      <div>
        <div
          class="text-[rgb(75,85,99)] bg-[rgb(243,244,246)] p-[8px] pl-[16px] pr-[16px]"
        >
          {{
            searchTerm
              ? filteredVacancies.length > 0
                ? `Showing ${filteredVacancies.length} results`
                : "No vacancies found"
              : `Popular Vacancies (showing ${filteredVacancies.length})`
          }}
        </div>

        <div class="overflow-y-auto h-[70vh] max-h-[584.4px]">
          <RouterLink
            v-for="vacancy in filteredVacancies"
            :to="getVacancyLink(vacancy.id)"
            class="block p-[12px] pl-[16px] pr-[16px] border-b border-solid border-[rgba(229,231,235)] h-min no-underline hover:bg-[rgb(249,250,251)]"
            :key="vacancy.id"
            @click="handleClose"
          >
            <div class="font-[500] text-[rgb(17,24,39)] leading-[24px]">
              {{ vacancy.title }}
            </div>
            <div
              class="text-[rgb(107,114,128)] text-[0.875rem] leading-[1.25rem] mt-[0.25rem]"
            >
              {{ vacancy.category }}
            </div>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
