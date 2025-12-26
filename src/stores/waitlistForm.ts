import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import axios from "axios";

import { useLoadingStore } from "./loadingStore";

type languagesType = { name: string; level: string }[];
type fileType = { file: File | undefined | null; name: string };

interface ApplicantArguments {
  jobid: string | string[];
  fullName: string;
  email: string;
  phone: string;
  citizenship: string;
  educationLevel: string;
  languages: { name: string; level: string }[];
  total_years?: string;
  startDate?: string;
  job_recent_title?: string;
  interested_joint_university?: string;
  relocate?: boolean;
  resume: File;
}

interface toastType {
  message: string;
  visible: boolean;
  error: boolean;
}

interface errorsType {
  fullName?: string;
  email?: string;
  phone?: string;
  citizenship?: string;
  dob?: string;
  placeOfBirth?: string;
  educationLevel?: string;
  languages?: string;
  startDate?: string;
  employmentStatus?: string;
  cv?: string;
}

interface formType {
  fullName: string;
  email: string;
  phone: string;
  citizenship: string;
  dob: string;
  placeOfBirth: string;
  educationLevel: string;
  languages: languagesType;
  startDate: string;
  employmentStatus: string;
  cv: fileType;
}

interface postApplicantArgumentsType extends formType {
  jobid: string | string[];
  resume: File;
}

async function postApplicant(formData: ApplicantArguments): Promise<string> {
  try {
    const formDataToSend: any = new FormData();

    formDataToSend.append("vacancyId", Number(formData.jobid));
    formDataToSend.append("full_name", formData.fullName);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone_number", formData.phone);
    formDataToSend.append("country_of_citizenship", formData.citizenship);
    formDataToSend.append("degree_and_field_of_study", formData.educationLevel);
    formDataToSend.append(
      "language",
      formData.languages.map((l) => l.name).join(", ")
    );
    formDataToSend.append("total_years", "Unknown");
    formDataToSend.append("when_you_start", formData.startDate);
    formDataToSend.append("relocate", true);
    formDataToSend.append("job_recent_title", "LinkedIn");
    formDataToSend.append("interested_joint_university", "string");
    formDataToSend.append("resume", formData.resume);

    await axios.post(
      "https://hr.centralasian.uz/api/applicants/apply",
      formDataToSend
    );

    return "success";
  } catch (err: any) {
    const msg =
      err.response?.data?.message || "Failed to submit form. Please try again.";
    return msg;
  }
}

export const useWaitlistFormStore = defineStore("waitlistForm", () => {
  const loadingStore = useLoadingStore();

  const errorOccured = ref<boolean>(false);
  const errors = reactive<errorsType>({});
  const toast = reactive<toastType>({
    message: "",
    visible: false,
    error: false,
  });
  const formData = reactive<formType>({
    fullName: "",
    email: "",
    phone: "",
    citizenship: "",
    dob: "",
    placeOfBirth: "",
    educationLevel: "",
    languages: [{ name: "", level: "" }],
    startDate: "",
    employmentStatus: "",
    cv: { file: null, name: "" },
  });

  const setFormDataField = <K extends keyof formType>(
    formField: K,
    newValue: formType[K]
  ) => {
    formData[formField] = newValue;
  };

  const setFormData = (newFormData: formType) => {
    Object.assign(formData, newFormData);
  };

  const setErrorField = <K extends keyof errorsType>(
    errorField: K,
    newValue: errorsType[K]
  ) => {
    errors[errorField] = newValue;
  };

  const setErrors = (newErrors: errorsType) => {
    Object.assign(errors, newErrors);
  };

  const setToastField = <K extends keyof toastType>(
    toastField: K,
    newValue: toastType[K]
  ) => {
    toast[toastField] = newValue;
  };

  const setToast = (newToast: toastType) => {
    Object.assign(toast, newToast);
  };

  const validateForm = () => {
    const newErrors: errorsType = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email format";

    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\+998 \(\d{2}\) \d{3}-\d{2}-\d{2}$/.test(formData.phone))
      newErrors.phone = "Invalid phone number format";

    if (!formData.citizenship.trim())
      newErrors.citizenship = "Citizenship is required";

    if (!formData.dob.trim()) {
      newErrors.dob = "Date of birth is required";
    } else {
      const parts = formData.dob.split("/").map(Number);
      var [day, month, year] = parts;
      day = Number(day);
      month = Number(month);
      year = Number(year);

      if (
        parts.length !== 3 ||
        parts.some((n) => isNaN(n)) ||
        year < 1900 ||
        month < 1 ||
        month > 12 ||
        day < 1
      ) {
        newErrors.dob = "Invalid date format (dd/mm/yyyy)";
      } else {
        const daysInMonth = new Date(year, month, 0).getDate();
        if (day > daysInMonth) {
          newErrors.dob = `Invalid day for month ${month}`;
        } else {
          const dob = new Date(year, month - 1, day);
          const today = new Date();
          today.setHours(0, 0, 0, 0);

          if (dob > today) {
            newErrors.dob = "Date of birth cannot be in the future";
          }
        }
      }
    }

    if (!formData.placeOfBirth.trim())
      newErrors.placeOfBirth = "Place of birth is required";

    if (!formData.educationLevel.trim())
      newErrors.educationLevel = "Education level is required";

    if (!formData.employmentStatus.trim())
      newErrors.employmentStatus = "Employment status is required";

    if (!formData.cv?.file) newErrors.cv = "Resume is required";

    return newErrors;
  };

  const showToast = (msg: string, error: boolean) => {
    setToast({
      message: msg,
      visible: true,
      error: error,
    });
    setTimeout(() => {
      setToast({
        message: "",
        visible: false,
        error: false,
      });
    }, 4000);
  };

  const handleLanguageChange = (
    index: number,
    field: keyof languagesType[number],
    value: string
  ) => {
    const item = formData.languages[index];
    if (item) {
      item[field] = value;
    }
  };

  const addLanguage = () => {
    formData.languages.push({ name: "", level: "" });
  };

  const removeLanguage = () => {
    if (formData.languages.length > 1) {
      formData.languages.pop();
    }
  };

  const resetForm = () => {
    Object.assign(formData, {
      fullName: "",
      email: "",
      phone: "",
      citizenship: "",
      dob: "",
      placeOfBirth: "",
      educationLevel: "",
      languages: [{ name: "", level: "" }],
      startDate: "",
      employmentStatus: "",
      cv: { file: null, name: "" },
    });
  };

  const onFormSubmit = () => {
    const validationErrors: errorsType = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      errorOccured.value = true;
      Object.assign(errors, validationErrors);

      const firstErrorField = Object.keys(validationErrors)[0];
      if (firstErrorField) {
        const firstErrorEl = document.getElementById(firstErrorField);
        if (firstErrorEl) {
          firstErrorEl.scrollIntoView({ behavior: "smooth", block: "center" });
          firstErrorEl.focus();
        }
      }
    } else {
      errorOccured.value = false;
      Object.assign(errors, {});
    }
  };

  const onFormConfirm = async (jobid: string | string[] | undefined) => {
    if (!jobid || !formData.cv.file) return;
    const postApplicantArguments: postApplicantArgumentsType = {
      ...formData,
      jobid,
      resume: formData.cv.file,
    };

    loadingStore.toggleLoading();
    const applicantPost = await postApplicant(postApplicantArguments);
    loadingStore.toggleLoading();

    if (applicantPost == "success") {
      errorOccured.value = false;
      resetForm();
      return true;
    } else {
      errorOccured.value = true;
      showToast(applicantPost, true);
      return false;
    }
  };

  return {
    errorOccured,
    errors,
    toast,
    formData,
    setErrorField,
    setErrors,
    setFormData,
    setFormDataField,
    setToast,
    setToastField,
    validateForm,
    showToast,
    handleLanguageChange,
    addLanguage,
    removeLanguage,
    resetForm,
    onFormSubmit,
    onFormConfirm,
  };
});
