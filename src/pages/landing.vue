<script setup lang="ts">
import Hero from "../components/landing/hero.vue";
import Invitation from "../components/landing/invitation.vue";
import JoinUs from "../components/landing/joinUs.vue";
import ClinicAdvantages from "../components/landing/clinicAdvantages.vue";
import ApplicationRequirements from "../components/landing/applicationRequirements.vue";
import HiringDepartments from "../components/landing/hiringDepartments.vue";
import FieldSearch from "../components/landing/fieldSearch.vue";
import Contacts from "../components/landing/contacts.vue";
import Loading from "../components/global/loading.vue";

import { useLoadingStore } from "../stores/loading";

import { useRoute } from "vue-router";
import { ref, watch } from "vue";

const loadingStore = useLoadingStore();
const route = useRoute();

const currentLan = ref(route.params.language || "ru");

watch(
  () => route.params.language,
  (newLanguage) => {
    currentLan.value = newLanguage || "ru";
  }
);
</script>

<template>
  <div
    className="mt-[100px] h-[200px] flex flex-col items-center text-red text-[20px] font-[600] gap-[20px]"
    v-if="loadingStore.isLoading"
  >
    <Loading />
    <p className="subtitle">
      {{ currentLan === "ru" ? "Загрузка страницы..." : "Loading page..." }}
    </p>
  </div>
  <template v-else>
    <Hero />
    <div
      className="w-full flex flex-col items-center max-2xl:pl-[30px] max-2xl:pr-[30px] max-md:pl-[16px] max-md:pr-[16px] "
    >
      <Invitation />
      <JoinUs />
      <ClinicAdvantages />
      <ApplicationRequirements />
      <HiringDepartments />
      <FieldSearch />
      <Contacts />
    </div>
  </template>
</template>
