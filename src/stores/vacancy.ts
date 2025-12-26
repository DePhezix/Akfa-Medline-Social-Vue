import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

import { useLoadingStore } from "./loading";

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

interface VacanciesByDivisionsType {
  title: string;
  numberOfApplicants: number;
  jobID: number;
}

interface databaseJobsType {
  title: string;
  onWaitingList: number;
  id: number;
}

interface VacancyStatsType {
  ru: string | undefined;
  en: string | undefined;
  count: number;
}

interface backendWaitlistDataType {
  name: string;
  response: number;
}

async function fetchJobVacancy(jobid: number): Promise<VacancyType> {
  try {
    const startTime = Date.now();

    const res = await axios.get<VacancyType>(
      `https://hr.centralasian.uz/api/social/vacancies/${jobid}`
    );

    const elapsed = Date.now() - startTime;
    const delay = Math.max(0, 200 - elapsed);
    await new Promise((resolve) => setTimeout(resolve, delay));

    return res.data;
  } catch (err) {
    console.error(err);
    return {
      title: "",
      id: jobid,
      salary: "",
      category: "",
      onWaitingList: 0,
      body: "",
      requirements: "",
      conditions: "",
    };
  }
}

async function fetchVacancies(): Promise<VacancyType[]> {
  try {
    const res = await axios.get<VacancyType[]>(
      "https://hr.centralasian.uz/api/social/vacancies"
    );

    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
}

async function fetchVacanciesByDivision(
  fieldKey: number
): Promise<VacanciesByDivisionsType[]> {
  try {
    const res = await axios.get<databaseJobsType[]>(
      `https://hr.centralasian.uz/api/social/vacancies?division=${fieldKey}`
    );

    const formattedJobs: VacanciesByDivisionsType[] = res.data.map((item) => ({
      title: item.title,
      numberOfApplicants: item.onWaitingList,
      jobID: item.id,
    }));

    return formattedJobs;
  } catch (err) {
    return [];
  }
}

async function fetchVacancyStats(): Promise<VacancyStatsType[]> {
  try {
    const res = await axios.get<backendWaitlistDataType[]>(
      "https://hr.centralasian.uz/api/dashboard/social/v3/stats/by-schools"
    );

    const parsedList: VacancyStatsType[] = res.data.map((item) => {
      const match = item.name.match(/^(.*?)\s*\((.*?)\)/);
      const russian = match ? match[1]?.trim() : item.name;
      const english = match ? match[2]?.trim() : item.name;
      return {
        ru: russian,
        en: english,
        count: item.response,
      };
    });

    return parsedList;
  } catch (err) {
    return [
      {
        ru: "",
        en: "",
        count: 0,
      },
    ];
  }
}

export const useVacancyDataStore = defineStore("vacancyData", () => {
  const route = useRoute();
  const LoadingStore = useLoadingStore();

  const jobVacancy: VacancyType = reactive({
    title: "",
    id: 0,
    salary: "",
    category: "",
    onWaitingList: 0,
    body: "",
    requirements: "",
    conditions: "",
  });
  const vacanciesByDivision = ref<VacanciesByDivisionsType[]>([]);
  const vacancies = ref<VacancyType[]>([]);
  const vacancyStats = ref<VacancyStatsType[]>([]);

  async function fetchAndSetVacancy() {
    LoadingStore.toggleLoading();
    const fetchedVacancy = await fetchJobVacancy(Number(route.params.jobid));
    LoadingStore.toggleLoading();
    Object.assign(jobVacancy, fetchedVacancy);
  }

  async function fetchAndSetVacanciesByDivision(division: number) {
    const fetchedVacancies = await fetchVacanciesByDivision(division);
    vacanciesByDivision.value = fetchedVacancies;
  }

  async function fetchAndSetVacancies() {
    const fetchedVacancies = await fetchVacancies();
    vacancies.value = fetchedVacancies;
  }

  async function fetchAndSetVacancyStats() {
    const fetchedVacancyStats = await fetchVacancyStats();
    vacancyStats.value = fetchedVacancyStats;
  }

  return {
    jobVacancy,
    vacanciesByDivision,
    vacancies,
    vacancyStats,
    fetchAndSetVacancy,
    fetchAndSetVacanciesByDivision,
    fetchAndSetVacancies,
    fetchAndSetVacancyStats,
  };
});
