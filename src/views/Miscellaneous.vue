<template>
  <div class="min-h-screen bg-gray-50 py-8 px-4">
    <div class="max-w-5xl mx-auto bg-white rounded-lg shadow-md">
      <Toast />
      <div class="p-6">
        <h1 class="text-2xl font-semibold text-center text-gray-800 mb-8">Miscellaneous Information</h1>

        <Form
            :validation-schema="schema"
            @submit="onFormSubmit"
            :initial-values="initialValues"
            v-slot="{ isSubmitting }"
            class="space-y-8"
        >
          <!-- Languages Section -->
          <div class="space-y-4">
            <label class="block text-sm font-medium text-gray-700">Languages</label>
            <div class="flex gap-2">
              <InputText
                  v-model="newLanguage"
                  placeholder="Enter language"
                  class="w-full"
                  @keydown.enter.prevent="addLanguage"
              />
              <Button
                  type="button"
                  icon="pi pi-plus"
                  @click="addLanguage"
                  class="p-button-text p-button-primary"
              />
            </div>
            <div class="flex flex-wrap gap-2">
              <Chip
                  v-for="lang in languages"
                  :key="lang"
                  :label="lang"
                  removable
                  @remove="removeLanguage(lang)"
                  class="bg-indigo-100"
              />
            </div>
          </div>

          <!-- Achievements Section -->
          <div class="space-y-4">
            <label class="block text-sm font-medium text-gray-700">Achievements</label>
            <div class="flex gap-2">
              <InputText
                  v-model="newAchievement"
                  placeholder="Enter achievement"
                  class="w-full"
                  @keydown.enter.prevent="addAchievement"
              />
              <Button
                  type="button"
                  icon="pi pi-plus"
                  @click="addAchievement"
                  class="p-button-text p-button-primary"
              />
            </div>
            <div class="flex flex-wrap gap-2">
              <Chip
                  v-for="achievement in achievements"
                  :key="achievement"
                  :label="achievement"
                  removable
                  @remove="removeAchievement(achievement)"
                  class="bg-indigo-100"
              />
            </div>
          </div>

          <!-- Certificates Section -->
          <div class="space-y-4">
            <label class="block text-sm font-medium text-gray-700">Certificates</label>
            <div class="flex gap-2">
              <InputText
                  v-model="newCertificate"
                  placeholder="Enter certificate"
                  class="w-full"
                  @keydown.enter.prevent="addCertificate"
              />
              <Button
                  type="button"
                  icon="pi pi-plus"
                  @click="addCertificate"
                  class="p-button-text p-button-primary"
              />
            </div>
            <div class="flex flex-wrap gap-2">
              <Chip
                  v-for="certificate in certificates"
                  :key="certificate"
                  :label="certificate"
                  removable
                  @remove="removeCertificate(certificate)"
                  class="bg-indigo-100"
              />
            </div>
          </div>

          <div class="flex justify-between mt-8">
            <Button
                label="Prev"
                icon="pi pi-arrow-left"
                class="p-button-outlined p-button-primary"
                type="button"
                @click="$router.push('/education')"
            />
            <Button
                label="Next"
                icon="pi pi-arrow-right"
                iconPos="right"
                type="submit"
                :loading="isSubmitting"
                class="p-button-primary"
            />
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Form } from 'vee-validate'
import * as yup from 'yup'
import { useCvStore } from '@/cvStore'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Chip from 'primevue/chip'
import { useToast } from 'primevue/usetoast'

const router = useRouter()
const cvStore = useCvStore()
const toast = useToast()

const newLanguage = ref('')
const newAchievement = ref('')
const newCertificate = ref('')

const languages = ref(cvStore.miscellaneous.languages || [])
const achievements = ref(cvStore.miscellaneous.achievements || [])
const certificates = ref(cvStore.miscellaneous.certifications || [])

const schema = yup.object({})

const initialValues = computed(() => ({
  languages: languages.value,
  achievements: achievements.value,
  certificates: certificates.value
}))

const addLanguage = () => {
  if (newLanguage.value && !languages.value.includes(newLanguage.value)) {
    languages.value.push(newLanguage.value)
    newLanguage.value = ''
  }
}

const removeLanguage = (lang) => {
  languages.value = languages.value.filter(l => l !== lang)
}

const addAchievement = () => {
  if (newAchievement.value && !achievements.value.includes(newAchievement.value)) {
    achievements.value.push(newAchievement.value)
    newAchievement.value = ''
  }
}

const removeAchievement = (achievement) => {
  achievements.value = achievements.value.filter(a => a !== achievement)
}

const addCertificate = () => {
  if (newCertificate.value && !certificates.value.includes(newCertificate.value)) {
    certificates.value.push(newCertificate.value)
    newCertificate.value = ''
  }
}

const removeCertificate = (certificate) => {
  certificates.value = certificates.value.filter(c => c !== certificate)
}

const onFormSubmit = () => {
  cvStore.updateMiscellaneous({
    languages: languages.value,
    achievements: achievements.value,
    certifications: certificates.value
  })

  toast.add({
    severity: 'success',
    summary: 'Information saved successfully',
    life: 3000
  })

  router.push('/color')
}
</script>

<style scoped>
:deep(.p-button-primary) {
  background: #4f46e5 !important;
  border-color: #4f46e5 !important;
}

:deep(.p-button-outlined.p-button-primary) {
  color: #4f46e5 !important;
  background: transparent !important;
  border-color: #4f46e5 !important;
}

:deep(.p-button-text.p-button-primary) {
  color: #4f46e5 !important;
  background: transparent !important;
}

:deep(.p-inputtext) {
  background: #fff !important;
  border: 1px solid #e2e8f0 !important;
  border-radius: 0.375rem !important;
  color: black;
}

:deep(.p-inputtext:focus) {
  border-color: #4f46e5 !important;
  box-shadow: 0 0 0 2px #e0e7ff !important;
}

:deep(.p-chip) {
  background: #e0e7ff !important;
  color: #4f46e5 !important;
}

:deep(.p-chip .p-chip-remove-icon) {
  color: #4f46e5 !important;
}

:deep(.p-message) {
  margin-top: 0.25rem;
  padding: 0;
  border: none;
  background-color: transparent;
}
</style>