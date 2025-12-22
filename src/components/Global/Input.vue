<script setup lang="ts">
import type { CSSProperties } from "vue";
import { useTemplateRef } from "vue";
import { useIMask } from "vue-imask";

type inputTypeKey =
  | "text"
  | "date"
  | "tel"
  | "dropdown"
  | "file"
  | "number"
  | "email"
  | "password";

const props = defineProps<{
  label?: string;
  placeholder?: string;
  required?: boolean;
  inputType?: inputTypeKey;
  imgSrc?: string;
  inputDisabled?: boolean;
  imgStyles?: CSSProperties;
  inputOptions?: string[];
  doubleInputPlaceholder?: string;
  doubleInputDisabled?: boolean;
  doubleInputValue?: string;
  fileNote?: string;
  fileSize?: number;
  fileType?: string;
  value?: any;
  id?: string;
  errorMessage?: string | undefined;
}>();

const emit = defineEmits<{
  (e: "doubleInputOnChange", value: string): void;
  (e: "onChange", value: any): void;
}>();

const dateRef = useTemplateRef("date-input");

const handleDateChange = (e: InputEvent) => {
  const target = e.target as HTMLInputElement;
  let val = target.value.replace(/\D/g, "");
  if (val.length > 2 && val.length <= 4) {
    val = val.slice(0, 2) + "/" + val.slice(2);
  } else if (val.length > 4) {
    val = val.slice(0, 2) + "/" + val.slice(2, 4) + "/" + val.slice(4, 8);
  }
  target.value = val;
  emit("onChange", e);
};

const handleHiddenDateChange = (e: InputEvent) => {
  const target = e.target as HTMLInputElement;
  const isoDate = target.value;
  if (!isoDate) return;

  const [year, month, day] = isoDate.split("-");
  const formatted = `${day}/${month}/${year}`;
  target.value = formatted;
  emit("onChange", {
    target: { value: formatted },
  });
};

const handleSelectChange = (e: Event & { target: HTMLSelectElement }) => {
  if (!(e.target instanceof HTMLSelectElement)) return;
  emit("onChange", e);
};

const handleFileChange = (e: InputEvent) => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;

  const maxSize = props.fileSize || 20 * 1024 * 1024;
  if (file.size > maxSize) {
    target.value = "";
    emit("onChange", e);
    return;
  }

  const allowedTypes = (props.fileType || ".pdf,.doc,.docx")
    .split(",")
    .map((t) => t.trim().replace(".", ""));

  const fileExt = file.name.split(".").pop()?.toLowerCase();

  if (!fileExt || !allowedTypes.includes(fileExt)) {
    target.value = "";
    emit("onChange", e);
    return;
  }

  emit("onChange", e);
};

const handleTelChange = (val: string) => {
  const event = {
    target: { value: val },
  } as Event & { target: HTMLInputElement };

  emit("onChange", event);
};

const { el, masked } = useIMask(
  {
    mask: "+{998} (00) 000-00-00",
  },
  {
    onAccept: () => {
      handleTelChange(masked.value);
    },
  }
);

el; //to fix 'unused variable' causing production build failure
</script>

<template>
  <div
    class="flex flex-col w-full flex-1 gap-[13px] relative text-black"
    :id="id"
  >
    <label class="text-[16px]" v-if="label">
      {{ label }} <span class="text-red3" v-if="required">*</span>
    </label>
    <div class="flex gap-[13px] relative">
      <input
        type="text"
        class="w-full border border-solid border-[#e9ebeb] bg-[#f5f5f5] p-[16px] pl-[18px] pr-[40px] flex gap-[10px] text-[16px] overflow-x-auto focus:outline-0"
        :required="required"
        :placeholder="doubleInputPlaceholder"
        :disabled="doubleInputDisabled || inputDisabled"
        :value="doubleInputValue"
        @input="
          $emit(
            'doubleInputOnChange',
            ($event.target as HTMLInputElement).value
          )
        "
        v-if="doubleInputPlaceholder"
      />

      <div
        class="relative flex items-center w-full"
        v-if="inputType === 'date'"
      >
        <input
          type="text"
          inputMode="numeric"
          class="w-full border border-solid border-[#e9ebeb] bg-[#f5f5f5] p-[16px] pl-[18px] pr-[40px] flex gap-[10px] text-[16px] overflow-x-auto focus:outline-0"
          :class="{ 'border-red2 outline-0': errorMessage }"
          :required="required"
          :placeholder="placeholder || 'ДД/ММ/ГГГГ'"
          :disabled="inputDisabled"
          :value="value"
          @input="handleDateChange"
          :maxLength="10"
        />
        <img
          src="/svgs/calender.svg"
          alt="calendar"
          @click="() => dateRef?.showPicker?.()"
          class="absolute right-[10px] w-[20px] h-[20px] cursor-pointer opacity-70 transition-opacity duration-200 ease-in-out hover:opacity-100"
        />
        <input
          ref="date-input"
          type="date"
          class="absolute left-[0] top-[0] w-full h-full opacity-0 pointer-events-none"
          @input="handleHiddenDateChange"
        />
      </div>

      <input
        v-else-if="inputType === 'tel'"
        ref="el"
        type="tel"
        :placeholder="placeholder"
        class="w-full border border-solid border-[#e9ebeb] bg-[#f5f5f5] p-[16px] pl-[18px] pr-[40px] flex gap-[10px] text-[16px] overflow-x-auto focus:outline-0"
        :class="{ 'border-red2 outline-0': errorMessage }"
      />
      <select
        class="appearance-none w-full border border-solid border-[#e9ebeb] bg-[#f5f5f5] p-[16px] pl-[18px]] flex gap-[10px] text-[16px] overflow-x-auto pr-[40px] text-[#737474] focus:outline-0 focus:text-black cursor-pointer"
        :class="{ 'border-red2 outline-0': errorMessage }"
        :required="required"
        :disabled="inputDisabled"
        :value="value"
        @input="
          {
            handleSelectChange;
          }
        "
        v-else-if="inputType === 'dropdown'"
      >
        <option value="" disabled hidden>
          {{ placeholder || "Выберите вариант" }}
        </option>
        <option key="{index}" value="{option}" v-for="option in inputOptions">
          {{ option }}
        </option>
      </select>
      <label
        class="w-full border border-solid border-[#e9ebeb] bg-[#f5f5f5] p-[16px] pl-[18px] pr-[40px] flex gap-[10px] text-[16px] overflow-x-auto focus:outline-0 justify-center h-[96px] cursor-pointer"
        :class="{ 'border-red2 outline-0': errorMessage }"
        :for="label?.replace(/\s+/g, '_') || 'file_input'"
        v-else-if="inputType === 'file'"
      >
        <input
          :id="label?.replace(/\s+/g, '_') || 'file_input'"
          type="file"
          :required="required"
          :disabled="inputDisabled"
          class="hidden"
          :accept="fileType || '.pdf,.doc,.docx'"
          @input="handleFileChange"
        />
        <div class="text-center flex flex-col gap-[12px] justify-center">
          <div class="font-[600] pointer-events-none">
            {{ value || placeholder || "Upload file" }}
          </div>
          <div
            class="text-[14px] text-[#737474] pointer-events-none"
            v-if="fileNote"
          >
            {{ fileNote }}
          </div>
        </div>
      </label>
      <input
        :type="inputType || 'text'"
        class="w-full border border-solid border-[#e9ebeb] bg-[#f5f5f5] p-[16px] pl-[18px] pr-[40px] flex gap-[10px] text-[16px] overflow-x-auto focus:outline-0"
        :class="{ 'border-red2 outline-0': errorMessage }"
        :required="required"
        :placeholder="placeholder"
        :disabled="inputDisabled"
        :value="value"
        @input="$emit('onChange', $event)"
        v-else
      />

      <img
        :src="imgSrc"
        alt=""
        class="w-[20px] f-[20px] absolute right-[18px] top-[50%] -translate-y-1/3"
        :style="{ ...imgStyles }"
        v-if="imgSrc"
      />
    </div>
    <div class="text-red2 text-[0.85rem] mt-[-4px]" v-if="errorMessage">
      {{ errorMessage }}
    </div>
  </div>
</template>
