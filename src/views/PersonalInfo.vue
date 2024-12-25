<template>
  <div class="min-h-screen bg-gray-50 py-8 px-4">
    <div class="max-w-5xl mx-auto bg-white rounded-lg shadow-md">
      <Toast />
      <div class="p-6">
        <h1 class="text-2xl font-semibold text-center text-gray-800 mb-8">Enter Your Information</h1>

        <Form v-slot="{ errors }" :validation-schema="schema" :initial-values="initialValues" @submit="onFormSubmit" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div v-for="(field, index) in personalFields" :key="index" class="flex flex-col gap-1">
              <label class="block text-sm font-medium text-gray-700">{{ field.label }}</label>
              <Field
                  :name="field.name"
                  v-slot="{ field: fieldProps, errorMessage }"
              >
                <InputText
                    v-bind="fieldProps"
                    type="text"
                    :placeholder="field.placeholder"
                    class="w-full"
                    :class="{ 'p-invalid': errorMessage }"
                />
              </Field>
              <ErrorMessage :name="field.name" v-slot="{ message }">
                <Message severity="error" size="small" variant="simple">{{ message }}</Message>
              </ErrorMessage>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div v-for="(field, index) in addressFields" :key="index" class="flex flex-col gap-1">
              <label class="block text-sm font-medium text-gray-700">{{ field.label }}</label>
              <Field
                  :name="field.name"
                  v-slot="{ field: fieldProps, errorMessage }"
              >
                <InputText
                    v-bind="fieldProps"
                    type="text"
                    :placeholder="field.placeholder"
                    class="w-full"
                    :class="{ 'p-invalid': errorMessage }"
                />
              </Field>
              <ErrorMessage :name="field.name" v-slot="{ message }">
                <Message severity="error" size="small" variant="simple">{{ message }}</Message>
              </ErrorMessage>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div v-for="(field, index) in socialFields" :key="index" class="flex flex-col gap-1">
              <label class="block text-sm font-medium text-gray-700">{{ field.label }}</label>
              <Field
                  :name="field.name"
                  v-slot="{ field: fieldProps }"
              >
                <InputText
                    v-bind="fieldProps"
                    type="text"
                    :placeholder="field.placeholder"
                    class="w-full"
                />
              </Field>
            </div>
          </div>

          <div class="flex flex-col gap-1">
            <label class="block text-sm font-medium text-gray-700">Position</label>
            <Field
                name="position"
                v-slot="{ field: fieldProps, errorMessage }"
            >
              <InputText
                  v-bind="fieldProps"
                  type="text"
                  placeholder="Front-End Developer"
                  class="w-full"
                  :class="{ 'p-invalid': errorMessage }"
              />
            </Field>
            <ErrorMessage name="position" v-slot="{ message }">
              <Message severity="error" size="small" variant="simple">{{ message }}</Message>
            </ErrorMessage>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Skills</label>
            <div class="flex gap-2">
              <InputText
                  v-model="newSkill"
                  placeholder="Enter your skill"
                  class="w-full"
              />
              <Button
                  type="button"
                  icon="pi pi-plus"
                  @click="addSkill"
                  class="p-button-text p-button-primary"
              />
            </div>
            <div class="flex flex-wrap gap-2 mt-2">
              <Chip
                  v-for="skill in skills"
                  :key="skill"
                  :label="skill"
                  removable
                  @remove="removeSkill(skill)"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
            <div class="space-y-4">
              <FileUpload
                  mode="basic"
                  :maxFileSize="1000000"
                  accept="image/*"
                  :auto="true"
                  @select="onSelect"
                  @upload="onUpload"
                  @error="onError"
                  chooseLabel="Browse"
                  class="w-full"
              />
              <div v-if="imagePreview" class="mt-2">
                <img
                    :src="imagePreview"
                    alt="Preview"
                    class="w-32 h-32 object-cover rounded-lg border border-gray-200"
                />
              </div>
            </div>
          </div>

          <div class="flex justify-between mt-8">
            <Button
                label="Prev"
                icon="pi pi-arrow-left"
                class="p-button-outlined p-button-primary"
                type="button"
                @click="$router.push('/home')"
            />
            <Button
                label="Next"
                icon="pi pi-arrow-right"
                iconPos="right"
                type="submit"
            />
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import { useCvStore } from '@/cvStore'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Chip from 'primevue/chip'
import FileUpload from 'primevue/fileupload'
import Message from 'primevue/message'
import { useToast } from 'primevue/usetoast'
import router from "@/main.js";

const cvStore = useCvStore()
const toast = useToast()
const newSkill = ref('')
const skills = ref(cvStore.personal.skills || [])

watch(() => cvStore.personal.skills, (newSkills) => {
  skills.value = newSkills || []
}, { immediate: true })

const schema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string(),
  email: yup.string()
      .required('Email is required')
      .email('Please enter a valid email address'),
  phone: yup.string()
      .required('Phone number is required')
      .matches(/^07\d{9}$/, 'Phone number must start with 07 and be exactly 11 digits'),
  street: yup.string().required('Street is required'),
  city: yup.string().required('City is required'),
  country: yup.string().required('Country is required'),
  position: yup.string().required('Position is required'),
  linkedin: yup.string()
      .matches(/^(https?:\/\/)?([\w\d-]+\.)*linkedin\.com\/in\/[\w\d-]+\/?$/, 'Please enter a valid LinkedIn profile URL')
      .nullable(),
  github: yup.string()
      .matches(/^(https?:\/\/)?([\w\d-]+\.)*github\.com\/[\w\d-]+\/?$/, 'Please enter a valid GitHub profile URL')
      .nullable(),
})

const initialValues = {
  firstName: cvStore.personal.firstName || '',
  lastName: cvStore.personal.lastName || '',
  email: cvStore.personal.email || '',
  phone: cvStore.personal.phone || '',
  street: cvStore.personal.street || '',
  city: cvStore.personal.city || '',
  country: cvStore.personal.country || '',
  position: cvStore.personal.position || '',
  linkedin: cvStore.personal.linkedin || '',
  github: cvStore.personal.github || '',
}

watch(() => cvStore.personal, (newValues) => {
  Object.keys(initialValues).forEach(key => {
    initialValues[key] = newValues[key] || ''
  })
}, { deep: true })

const personalFields = [
  {label: 'First Name', name: 'firstName', placeholder: 'Enter your first name'},
  {label: 'Last Name', name: 'lastName', placeholder: 'Enter your last name'},
  {label: 'Email', name: 'email', placeholder: 'Enter your email'},
  {label: 'Mobile', name: 'phone', placeholder: 'Enter your mobile (07XXXXXXXXX)'}
]

const addressFields = [
  {label: 'Street', name: 'street', placeholder: 'Enter your street'},
  {label: 'City', name: 'city', placeholder: 'Enter your city'},
  {label: 'Country', name: 'country', placeholder: 'Enter your country'}
]

const socialFields = [
  {label: 'LinkedIn', name: 'linkedin', placeholder: 'Enter your LinkedIn URL'},
  {label: 'Github', name: 'github', placeholder: 'Enter your Github URL'}
]

const addSkill = () => {
  if (newSkill.value && !skills.value.includes(newSkill.value)) {
    skills.value.push(newSkill.value)
    newSkill.value = ''
  }
}

const removeSkill = (skill) => {
  skills.value = skills.value.filter(s => s !== skill)
}

const imagePreview = ref(cvStore.personal.image || '')

const onSelect = (event) => {
  const file = event.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onloadend = () => {
      imagePreview.value = reader.result
    }
    reader.readAsDataURL(file)
  }
}

const onUpload = (event) => {
  if (event.files && event.files[0]) {
    const file = event.files[0]
    cvStore.updatePersonal({
      image: imagePreview.value
    })
    toast.add({
      severity: 'success',
      summary: 'Image uploaded successfully',
      life: 3000
    })
  }
}

const onError = () => {
  toast.add({
    severity: 'error',
    summary: 'Error uploading image',
    detail: 'File size should not exceed 1MB',
    life: 3000
  })
}

const onFormSubmit = (values) => {
  cvStore.updatePersonal({
    ...values,
    skills: skills.value
  })
  toast.add({
    severity: 'success',
    summary: 'Information saved successfully',
    life: 3000
  })
  router.push('/experience')
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

:deep(.p-inputtext.p-invalid) {
  border-color: #ef4444 !important;
}

:deep(.p-fileupload-choose) {
  background: transparent !important;
  border-color: #4f46e5 !important;
  color: #4f46e5 !important;
}

:deep(.p-chip) {
  background: #e0e7ff !important;
  color: #4f46e5 !important;
}

:deep(.p-message) {
  margin-top: 0.25rem;
  padding: 0;
  border: none;
  background-color: transparent;
}

:deep(.p-message.p-message-error) {
  color: #ef4444;
}
</style>