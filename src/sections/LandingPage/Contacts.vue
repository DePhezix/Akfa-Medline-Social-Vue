<script setup lang="ts">
import PhoneSVG from "/svgs/phone.svg";
import MailSVG from "/svgs/mail.svg";
import LocationSVG from "/svgs/location.svg";

import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";

type languagesType = "ru" | "en";

interface contactsListType {
  imgSrc: string;
  title: string;
  text1: string;
  text2: string;
  link: string;
  alt: string;
}

const ContactsList: Record<languagesType, contactsListType[]> = {
  ru: [
    {
      imgSrc: PhoneSVG,
      title: "Позвоните нам",
      text1: "Пн-Пт с 9:00 до 18:00.",
      text2: "+998 77 403-30-03",
      link: "tel:+998774033003",
      alt: "phone icon",
    },
    {
      imgSrc: MailSVG,
      title: "Напишите нам",
      text1: "Круглосуточно, каждый день",
      text2: "hr.pm@akfamedline.uz",
      link: "mailto:hr.pm@akfamedline.uz",
      alt: "mail icon",
    },
    {
      imgSrc: LocationSVG,
      title: "Мы рады видеть вас здесь",
      text1: "",
      text2:
        "Ташкент, Мирабадский район, махаллинский сход граждан Тонг Юлдузи",
      link: "https://maps.google.com/?q=Ташкент, Мирабадский район, махаллинский сход граждан Тонг Юлдузи",
      alt: "location icon",
    },
  ],
  en: [
    {
      imgSrc: PhoneSVG,
      title: "Call Us",
      text1: "Mon–Fri, from 9:00 to 18:00",
      text2: "+998 77 403-30-03",
      link: "tel:+998774033003",
      alt: "phone icon",
    },
    {
      imgSrc: MailSVG,
      title: "Email Us",
      text1: "Available 24/7, every day",
      text2: "hr.pm@akfamedline.uz",
      link: "mailto:hr.pm@akfamedline.uz",
      alt: "mail icon",
    },
    {
      imgSrc: LocationSVG,
      title: "We’re glad to see you here",
      text1: "",
      text2: "Tashkent, Mirabad District, Ton Yulduzi Citizens’ Gathering Area",
      link: "https://maps.google.com/?q=Tashkent, Mirabad District, Ton Yulduzi Citizens’ Gathering Area",
      alt: "location icon",
    },
  ],
};

const route = useRoute();
const currentLan = ref<languagesType>(
  route.params.language as languagesType | "ru"
);
const selectedContacts = computed(() => ContactsList[currentLan.value]);

watch(
  () => route.params.language,
  (newLanguage) => {
    if (typeof newLanguage === "string" && newLanguage in ContactsList) {
      currentLan.value = newLanguage as languagesType;
    } else {
      currentLan.value = "ru";
    }
  }
);
</script>

<template>
  <section
    class="flex flex-col w-[1280px] gap-[43px] mb-[80px] max-2xl:w-full"
    id="contacts"
  >
    <div class="flex w-full flex-col gap-[42px]">
      <h2
        class="max-2xl:text-[32px] max-2xl:leading-[40px] max-2xl:font-[700] text-[56px]"
      >
        {{ currentLan === "ru" ? "Контакты" : "Contacts" }}
      </h2>
      <div class="flex gap-[24px] flex-wrap" ref="{contactsContainer}">
        <a
          v-for="(contact, index) in selectedContacts"
          :href="contact.link"
          :key="index"
          class="max-2xl:p-[20px] flex flex-col flex-1 rounded-[16px] p-[32px] gap-[40px] border border-solid border-[rgba(82,82,90,0.2)] min-w-[280px] cursor-pointer no-underline text-black"
          :target="index === 2 ? '_blank' : '_self'"
          rel="noopener noreferrer"
        >
          <figure
            class="w-[40px] h-[40px] rounded-[8px] bg-red flex justify-center items-center"
          >
            <img
              :src="contact.imgSrc"
              :alt="contact.alt"
              class="w-[25px] h-[25px]"
            />
          </figure>
          <div class="flex flex-col gap-[19px]">
            <div class="flex flex-col gap-[7.09px]">
              <h3
                class="font-[600] text-[21px] leading-[33.6px] tracking-[-0.5px]"
              >
                {{ contact.title }}
              </h3>
              <p
                class="text-[16px] leading-[27.2px] text-[#232f3a] whitespace-nowrap"
              >
                {{ contact.text1 }}
              </p>
            </div>
            <p
              class="font-[500] text-[17px] leading-[27.2px] tracking-[-0.5px]"
            >
              {{ contact.text2 }}
            </p>
          </div>
        </a>
      </div>
    </div>

    <iframe
      :src="
        currentLan === 'ru'
          ? 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.0983633047304!2d69.4282954!3d41.3284744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38aef7002ad8c16d%3A0xa19673ebc50fa81c!2sCentral%20Asian%20University%20in%20Tashkent%20-%20CAU!5e0!3m2!1sru!2s!4v1761909660717!5m2!1sru!2s'
          : 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4179.3536135037575!2d69.42900458560892!3d41.329161966084264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38aef7002ad8c16d%3A0xa19673ebc50fa81c!2sCentral%20Asian%20University%20in%20Tashkent%20-%20CAU!5e0!3m2!1sen!2s!4v1761302410905!5m2!1sen!2s'
      "
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      class="max-2xl:w-full max-md:h-[440px] max-sm:h-[358px] w-[1280px] h-[550px] border-0 rounded-[10px]"
      allowFullScreen
      ref="{map}"
      title="Google
    Maps, Central Asian University"
    />
  </section>
</template>
