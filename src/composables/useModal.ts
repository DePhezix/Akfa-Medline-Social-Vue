import { ref } from "vue";

const isShowModal = ref(false)

function updateShowModel (updatedState: boolean) {
    isShowModal.value = updatedState
}

const useModal = () => {
  return { isShowModal, updateShowModel}
}

export default useModal