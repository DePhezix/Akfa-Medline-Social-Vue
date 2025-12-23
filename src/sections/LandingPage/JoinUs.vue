<script setup lang="ts">
import Card from "../../components/Landing/Card.vue";
import Button from "../../components/Global/Button.vue";
import Star from "/svgs/star.svg";
import Circles from "/svgs/2_circles.svg";
import Community from "/svgs/community.svg";
import RightArrow from "/svgs/right-white-arrow.svg";
import bckgrndImg from "/images/doctor_holding_stethoscope.avif";

import { ref, watch } from "vue";
import type { CSSProperties } from "vue";
import { useRoute } from "vue-router";

type languagesType = "en" | "ru";

interface cardDataType {
  imgSrc: string;
  title: string;
  details: string;
  imgAlt: string;
}

interface contentType {
  header: string;
  subtitle: string;
  button: string;
  cardsData: cardDataType[];
}

const content: Record<languagesType, contentType> = {
  ru: {
    header: "Хотите работать у нас?",
    subtitle:
      "Заполните форму, чтобы заявить о своём интересе к работе в нашей клинике. Мы свяжемся с вами, как только начнётся активный этап набора.",
    button: "Подать заявку",
    cardsData: [
      {
        imgSrc: Star,
        title: "МИССИЯ",
        details:
          "Создавать рабочую среду, в которой врачи и медицинские специалисты могут реализовывать свой профессиональный потенциал, предоставляя пациентам доступную и качественную медицинскую помощь.",
        imgAlt: "star icon",
      },
      {
        imgSrc: Circles,
        title: "ВИДЕНИЕ",
        details:
          "Быть клиникой, в которой приятно и престижно работать, где каждый специалист чувствует поддержку, ценность своего труда и возможность профессионального роста. Мы стремимся стать ведущим медицинским учреждением региона не только по качеству лечения, но и по уровню командной культуры.",
        imgAlt: "circles icon",
      },
      {
        imgSrc: Community,
        title: "ЦЕННОСТИ",
        details:
          "Мы строим команду на основе взаимного уважения, сотрудничества и профессионализма. Для нас важно, чтобы каждый сотрудник чувствовал поддержку, ценность своего труда и возможность расти. Мы поощряем инициативу, открыты к новым идеям и верим, что забота о пациентах начинается с заботы друг о друге.",
        imgAlt: "community icon",
      },
    ],
  },
  en: {
    header: "Do you want to work for us?",
    subtitle:
      "Please fill out the form to express your interest in working at our clinic. We will contact you as soon as the active recruitment phase begins.",
    button: "Submit an application",
    cardsData: [
      {
        imgSrc: Star,
        title: "MISSION",
        details:
          "To create a work environment in which physicians and health care professionals can realize their professional potential by providing patients with affordable and high-quality medical care.",
        imgAlt: "star icon",
      },
      {
        imgSrc: Circles,
        title: "VISION",
        details:
          "To become a clinic where it is both pleasant and prestigious to work — a place where every specialist feels supported, understands the value of their work, and has opportunities for continuous professional growth. We strive to be the leading medical institution in the region, recognized not only for the quality of care, but also for the strength of our team culture",
        imgAlt: "vision icon",
      },
      {
        imgSrc: Community,
        title: "VALUES",
        details:
          "We are building a team founded on mutual respect, collaboration, and professionalism. We believe it is essential that every team member feels supported, that their work is valued, and that they have opportunities for continuous growth. We encourage initiative, welcome new ideas, and believe that truly caring for patients begins with caring for one another.",
        imgAlt: "community icon",
      },
    ],
  },
};

const route = useRoute();
const currentLan = ref<languagesType>(
  (route.params.language as languagesType) || "ru"
);

watch(
  () => route.params.language,
  (newLanguage) => {
    currentLan.value = (newLanguage as languagesType) || "ru";
  }
);

const additionalButtonStyle: CSSProperties = {
  borderRadius: "8px",
};
</script>

<template>
  <section
    class="max-2xl:min-[1245px]:items-center max-2xl:w-full max-2xl:overflow-x-hidden max-2xl:bg-center flex w-[1280px] flex-col gap-[60px] mb-[60px]"
  >
    <div
      class="max-2xl:w-full max-md:flex max-md:items-end max-md:justify-center max-md:w-full max-md:rounded-[12px] max-md:p-[16px] max-md:pt-[24px] max-md:pb-[24px] max-md:h-[526px] w-[1280px] h-[685px] relative text-white"
    >
      <div
        class="max-md:static flex flex-col w-[617px] absolute top-[308px] left-[60px] gap-[32px] z-10"
      >
        <header class="flex flex-col gap-[16px]">
          <h2
            class="max-md:text-[32px] max-md:leading-[40px] max-md:h-min max-md:w-full max-md:mb-28px w-[473px] h-[135px] text-[56px] leading-[67.2px] tracking-[-1px] font-[400]"
          >
            {{ content[currentLan].header }}
          </h2>
          <p
            class="max-md:leading-[1.75rem] max-md:text-[1.25rem] max-md:w-full max-md:font-[500] font-[500] text-[20px] leading-[150%] tracking-[-0.5px] w-[498px]"
          >
            {{ content[currentLan].subtitle }}
          </p>
        </header>
        <RouterLink
          :to="{
            name: 'landing',
            params: currentLan === 'ru' ? {} : { language: currentLan },
            hash: '#vacancies',
          }"
          class="max-md:w-full w-max rounded-[7px] no-underline"
        >
          <Button
            :text="content[currentLan].button"
            :imgSrc="RightArrow"
            imgAlt="right arrow"
            :additionalStyle="additionalButtonStyle"
          />
        </RouterLink>
      </div>
      <img
        :src="bckgrndImg"
        alt="Doctor holding stethoscope"
        class="max-2xl:w-full max-2xl:object-cover max-md:h-[526px] w-[1280px] h-[685px] rounded-[5px] absolute top-[0] left-[0]"
      />
    </div>

    <div class="max-2xl:flex-wrap flex justify-between gap-[11.5px]">
      <Card
        v-for="(arr, index) in content[currentLan].cardsData"
        :key="index"
        :imgSrc="arr.imgSrc"
        :title="arr.title"
        :details="arr.details"
        :imgAlt="arr.imgAlt"
      />
    </div>
  </section>
</template>
