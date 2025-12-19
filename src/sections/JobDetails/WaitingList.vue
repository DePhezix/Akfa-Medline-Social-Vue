<script setup lang="ts">
import { watch, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import RightArrow from '/svgs/right-white-arrow.svg'
import Button from '../../components/Global/Button.vue'

const props = defineProps<{
  className?: string;
}>();
const emit = defineEmits<{
  (e: "updateIsWaitingListOpen", value: boolean): void;
}>();

const route = useRoute();
const router = useRouter()

var currentLan = ref<string | string[]>("ru");

watch(
  () => route.params.language,
  (newLanguage) => {
    currentLan.value = newLanguage || "ru";
  }
);

 const handleWaitingButtonClick = () => {
    emit('updateIsWaitingListOpen', true)
  };

  const handleReturnButtonClick = () => {
   router.push({
    path: currentLan.value === 'ru'
      ? '/Akfa-Medline-Social'
      : `/${currentLan.value}/Akfa-Medline-Social`,
    hash: '#vacancies',
  })
  };
</script>

<template>
        <div
        class="flex flex-col rounded-[16px] gap-[.75rem] w-full "
        :class="className"
    >
      <Button
        text="Submit an application"
        :onButtonClick="handleWaitingButtonClick"
        variant="black"
        className="p-[12px] pl-[10px] pr-[10px] rounded-none"
        fontSize='sm'
        :imgSrc="RightArrow"
        imgAlt='right arrow'
      />
      <Button
        text="Back to Job Listings"
        :onButtonClick="handleReturnButtonClick"
        className='rounded-none'
        variant="transparent"
        fontSize='sm'
      />
    </div>
  );
</template>
