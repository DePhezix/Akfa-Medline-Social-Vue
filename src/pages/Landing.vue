<script setup lang="ts">
import Hero from "../sections/LandingPage/Hero.vue";
import Invitation from "../sections/LandingPage/Invitation.vue";
import JoinUs from "../sections/LandingPage/JoinUs.vue";
import ClinicAdvantages from "../sections/LandingPage/ClinicAdvantages.vue";
import ApplicationRequirements from "../sections/LandingPage/ApplicationRequirements.vue";
import HiringDepartments from "../sections/LandingPage/HiringDepartments.vue";
import FieldSearch from "../sections/LandingPage/FieldSearch.vue";
import Contacts from "../sections/LandingPage/Contacts.vue";
import Loading from "../sections/Global/Loading.vue";

import { useLoadingStore } from "../stores/LoadingStore";

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
