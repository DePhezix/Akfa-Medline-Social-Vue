<script setup lang="ts">
import Logo from "/svgs/header_logo.svg";
import RightArrow from "/svgs/right-white-arrow.svg";
import DownArrow from "/svgs/downArrow.svg";

import { usePopUpStore } from "../../stores/PopUpStore";

import { useRoute, useRouter, RouterLink } from "vue-router";
import Button from "../../components/Global/Button.vue";
import { ref, watch } from "vue";

const store = usePopUpStore()

const router = useRouter();

const route = useRoute();
var currentLan = ref<string | string[]>(route.params.language || "ru");

var basePath = `/Akfa-Medline-Social-Vue/`;

const isHamburgerOpen = ref<boolean>(false);

const toggleMenu = () => {
  isHamburgerOpen.value = !isHamburgerOpen.value;
  store.setIsPopupOpen(!store.isPopUpOpen)
};

const handleLanguage = (e: Event) => {
  const target = e.target as HTMLSelectElement;
  const lan = target.value;
  const mergedParams = { ...route.params, language: lan === "ru" ? "" : lan };

  router.push({
    name: route.name,
    params: mergedParams,
  });

  toggleMenu();
};

watch(
  () => route.params.language,
  (newLanguage) => {
    currentLan.value = newLanguage || "ru";
    basePath =
      currentLan.value === "ru"
        ? `/Akfa-Medline-Social-Vue/`
        : `/Akfa-Medline-Social-Vue/${currentLan.value}`;
  }
);
</script>

<template>
  <nav
    class="p-[16px] pl-[80px] pr-[50px] w-full flex justify-between items-center bg-white z-50 max-2xl:p-[16px] max-2xl:pt-[32px] max-md:fixed"
  >
    <RouterLink
      :to="{
        name: 'landing',
        params: currentLan === 'ru' ? {} : { language: currentLan },
      }"
      class="h-[50.15px] w-[100px] max-sm:h-[32px]"
    >
      <img
        :src="Logo"
        alt="Logo"
        class="h-[50.15px] w-[100px] max-sm:h-[32px] max-sm:w-min"
      />
    </RouterLink>

    <div class="flex gap-[32px] items-center max-md:hidden">
      <RouterLink
        smooth
        :to="`/Akfa-Medline-Social-Vue/${
          currentLan !== 'ru' ? currentLan : ''
        }#contacts`"
        class="appearance-none h-full font-[400] text-[16px] cursor-pointer transition duration-300 ease-linear hover:text-red"
      >
        {{ currentLan === "ru" ? "Связаться с нами" : "Contact us" }}
      </RouterLink>

      <div class="w-[120px]">
        <div class="rounded-[10px] bg-[#eee]">
          <div class="w-[100px]">
            <select
              aria-label="Select language"
              class="p-[10px] appearance-none cursor-pointer w-[100px] font-[400] text-[14px] bg-transparent border-0 focus:outline-0"
              @input="handleLanguage"
              :value="currentLan"
            >
              <option value="ru">Русский</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div
      class="hidden flex-col justify-between w-[24px] h-[24px] cursor-pointer z-1000 gap-[2px] p-[6px] pl-[3px] pr-[3px] max-md:flex max-md:sm:w-[24px] max-md:sm:h-[18px] max-md:sm:p-[0]"
      :class="{ 'p-[5px]': isHamburgerOpen }"
      @click="toggleMenu"
    >
      <span
        class="block h-[2px] bg-[#00332a] rounded-[2px] transition duration-300 origin-center flex-1 max-md:sm:h-[3px]"
        :class="{
          'translate-y-[150%] rotate-45 max-md:sm:translate-y-[6.5px] max-md:sm:rotate-45':
            isHamburgerOpen,
        }"
      />
      <span
        class="block h-[2px] bg-[#00332a] rounded-[2px] transition duration-300 origin-center flex-1 max-md:sm:h-[3px]"
        :class="{ 'opacity-0 -translate-x-1/2 scale-x-80': isHamburgerOpen }"
      />
      <span
        class="block h-[2px] bg-[#00332a] rounded-[2px] transition duration-300 origin-center flex-1 max-md:sm:h-[3px]"
        :class="{
          '-translate-y-[180%] rotate-135 max-md:sm:-translate-y-[7.5px] max-md:sm:-translate-x-[0.5px] max-md:sm:-rotate-45':
            isHamburgerOpen,
        }"
      />
    </div>

    <div
      class="fixed right-[0] bg-white z-1050 w-screen h-[calc(100vh-95.5px)] flex-col justify-end p-[32px] pl-[16px] pr-[16px] border-0 max-md:top-[95.5px] max-sm:top-[80px] max-sm:h-[calc(100vh-80px)]"
      :class="isHamburgerOpen ? 'flex' : 'hidden'"
    >
      <div class="flex flex-col gap-[24px]">
        <div class="flex flex-col gap-[32px]">
          <RouterLink
            :to="`${basePath}#benefits`"
            class="appearance-none"
            @click="toggleMenu"
          >
            {{currentLan === "ru" ? "Преимущества" : "Benefits"}}
          </RouterLink>
          <RouterLink
            :to="{
              name: 'landing',
              params: currentLan === 'ru' ? {} : { language: currentLan },
              hash: '#vacancies',
            }"
            class="appearance-none"
            @click="toggleMenu"
          >
            {{currentLan === "ru" ? "Вакансии" : "Vacancies"}}
          </RouterLink>
          <RouterLink
            smooth
            :to="`${basePath}#contacts`"
            class="appearance-none"
            @click="toggleMenu"
          >
            {{ currentLan === "ru" ? "Связаться с нами" : "Contact us" }}
          </RouterLink>
        </div>

        <div class="relative w-min">
          <select
            class="appearance-none flex items-center p-[12px] pl-[16px] pr-[16px] rounded-[4px] bg-[#eee] gap-[8px] w-[80px] h-[48px] leading-[21px] text-[14px] border-0 relative max-sm:text-[14px]"
            @input="handleLanguage"
            :value="currentLan"
          >
            <option value="ru">RU</option>
            <option value="en">EN</option>
          </select>
          <img
            :src="DownArrow"
            alt="arrow"
            class="absolute pointer-none right-[12px] top-[50%] -translate-y-1/2 w-[20px] h-[20px]"
          />
        </div>

        <RouterLink
          :to="{
            name: 'landing',
            params: currentLan === 'ru' ? {} : { language: currentLan },
            hash: '#vacancies',
          }"
          class="no_underline"
        >
          <Button
            :text="currentLan === 'ru' ? 'Подать заявку' : 'Apply now'"
            variant="black"
            :imgSrc="RightArrow"
            imgAlt="arrow"
            :onButtonClick="toggleMenu"
          />
        </RouterLink>
      </div>
    </div>
  </nav>
</template>
