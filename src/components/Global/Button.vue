<script setup lang="ts">
import type { CSSProperties } from "vue";

type buttonVariant = "black" | "black2" | "white" | "transparent";
type fontsType = "sm";

const variantClasses: Record<buttonVariant, string> = {
  black: "!bg-[#222222] !text-white",
  black2: "!bg-[#1E1E1F] !text-white",
  white: "!bg-white !text-[#1E1E1F] !border !border-[#1E1E1F33]",
  transparent:
    "!bg-transparent !text-black !border !border-solid !border-[#e5e7eb]",
};

const fontClasses: Record<fontsType, string> = {
  sm: "!text-[13px]",
};

const {buttonType = 'button'} = defineProps<{
  text?: string;
  imgSrc?: string;
  variant?: buttonVariant;
  additionalStyle?: CSSProperties;
  onButtonClick?: (e: MouseEvent) => void;
  buttonType?: "reset" | "button" | "submit";
  className?: string;
  fontSize?: fontsType;
  imgAlt?: string;
}>();
</script>

<template>
  <button
    :type="buttonType"
    class="flex rounded-[5px] p-[16px] gap-[7px] bg-red items-center text-white w-full cursor-pointer border-0 justify-center duration-300 ease-in-out hover:brightness-[0.85] hover:-translate-y-px"
   :class="[className, variant && variantClasses[variant]]"
    @click="onButtonClick"
  >
    <div
      class="w-full min-w-[119px] h-[19px] text-[16px] flex items-center justify-center"
      :class="[fontSize && fontClasses[fontSize]]"
      v-if="text"
    >
      {{text}}
    </div>
    <img
      :src="imgSrc"
      class="w-[20px] h-[20px]"
      :alt="imgAlt"
      v-if="imgSrc"
    />
    <slot />
  </button>
</template>
