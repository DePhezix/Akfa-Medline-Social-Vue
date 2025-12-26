import { defineStore } from "pinia";
import { ref } from 'vue'

export const usePopUpStore = defineStore('popup', () => {
    const isPopUpOpen = ref<boolean>(false);
    function setIsPopupOpen(newState: boolean) {
        isPopUpOpen.value = newState
    }

    return { isPopUpOpen, setIsPopupOpen }
})