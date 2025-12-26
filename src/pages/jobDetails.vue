<script setup lang="ts">
import { useRoute } from "vue-router";
import { ref, reactive, watch, onMounted } from "vue";

import { useVacancyDataStore } from "../stores/vacancy";
import { useLoadingStore } from "../stores/loading";

import Hero from "../components/jobDetails/hero.vue";
import Overview from "../components/jobDetails/overview.vue";
import JobDetail from "../components/jobDetails/jobDetail.vue";
import JoinWaitingList from "../components/jobDetails/joinWaitingList.vue";
import WaitingList from "../components/jobDetails/waitingList.vue";
import Loading from "../components/global/loading.vue";

interface JobVacancyType {
  title: string;
  id: number;
  salary: string;
  category: string;
  onWaitingList: number;
  body: string;
  requirements: string;
  conditions: string;
}

const route = useRoute();
const loadingStore = useLoadingStore();
const vacancyStore = useVacancyDataStore();

const jobData: JobVacancyType = reactive({
  title: "",
  id: 0,
  salary: "",
  category: "string",
  onWaitingList: 0,
  body: "",
  requirements: "string",
  conditions: "",
});

const isWaitingListOpen = ref<boolean>(false);
const currentLan = ref<string | string[]>(route.params.language || "ru");

const setIsWaitingListOpen = (state: boolean) => {
  isWaitingListOpen.value = state;
};

const fetchAndAssignVacany = async () => {
  await vacancyStore.fetchAndSetVacancy();

  Object.assign(jobData, vacancyStore.jobVacancy);
};

onMounted(fetchAndAssignVacany);

watch(
  () => route.params.language,
  (newLanguage) => {
    currentLan.value = newLanguage || "ru";
  }
);
watch(() => route.params.jobid, fetchAndAssignVacany);
</script>

<template>
  <div
    class="h-[300px] flex flex-col items-center justify-center text-red text-[20px] font-[600] gap-[20px] mt-[40px]"
    v-if="loadingStore.isLoading"
  >
    <Loading />
    <p>{{ currentLan === "ru" ? "Загрузка..." : "Loading..." }}</p>
  </div>
  <section
    class="w-full flex flex-col gap-[40px] items-center bg-[#f3f4f4] pb-[50px] max-2xl:w-screen"
    v-else
  >
    <div class="flex flex-col gap-[40px] items-center bg-[#f3f4f4] w-full">
      <Hero
        :SubHeading="(jobData?.category?.split('(')[0] ?? '').trim()"
        :Heading="(jobData?.title?.split('(')[0] ?? '').trim()"
        :CandidatesNumber="jobData?.onWaitingList"
        :Salary="jobData?.salary"
      />
      <div
        class="flex gap-[24px] w-[1280px] justify-between max-2xl:w-full max-md:flex-col max-2xl:pr-[30px] max-2xl:pl-[30px]"
      >
        <div class="flex flex-col max-2xl:w-full">
          <Overview
            :title="jobData?.title"
            :salary="jobData?.salary"
            :category="(jobData?.category?.split('(')[0] ?? '').trim()"
          />
          <JobDetail :text="jobData.body" v-if="jobData?.body" />
          <JobDetail
            :text="jobData.requirements"
            v-if="jobData?.requirements"
          />
          <JobDetail :text="jobData.conditions" v-if="jobData?.conditions" />
        </div>
        <div class="w-[200px] max-2xl:w-[230px] max-md:w-full">
          <WaitingList
            @updateIsWaitingListOpen="(val) => setIsWaitingListOpen(val)"
          />
        </div>
      </div>
    </div>

    <JoinWaitingList
      :isOpen="isWaitingListOpen"
      @updateIsOpen="(val) => setIsWaitingListOpen(val)"
    />
  </section>
</template>
