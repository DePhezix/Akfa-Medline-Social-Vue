import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import { useRoute } from "vue-router";

import { fetchJobVacancy } from "../ApiCalls/fetchJobVacany";
import { fetchVacanciesByDivision } from "../ApiCalls/fetchVacanciesByDivision";
import { fetchVacancies } from "../ApiCalls/fetchVacancies";
import { fetchVacancyStats } from "../ApiCalls/fetchVacancyStats";

import { useLoadingStore } from "./LoadingStore";

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

interface VacancyStatsType {
  ru: string | undefined;
  en: string | undefined;
  count: number;
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
