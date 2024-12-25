<template>
  <div class="min-h-screen bg-gray-50 py-8 px-4">
    <div class="max-w-5xl mx-auto bg-white rounded-lg shadow-md">
      <Toast />
      <div class="p-6">
        <h1 class="text-2xl font-semibold text-center text-gray-800 mb-8">Work Experience</h1>

        <div class="space-y-8">
          <div v-for="(experience, index) in experiences" :key="index" class="border rounded-lg p-6 bg-gray-50">
            <Form
                :validation-schema="schema"
                :initial-values="experience"
                @submit="values => onFormSubmit(index, values)"
                class="space-y-6"
                v-slot="{ isSubmitting }"
            >
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="flex flex-col gap-1">
                  <label class="block text-sm font-medium text-gray-700">Organization</label>
                  <Field name="organization" v-slot="{ field, errorMessage }">
                    <InputText
                        v-bind="field"
                        type="text"
                        placeholder="Enter organization name"
                        class="w-full"
                        :class="{ 'p-invalid': errorMessage }"
                    />
                  </Field>
                  <ErrorMessage name="organization" v-slot="{ message }">
                    <Message severity="error" size="small" variant="simple">{{ message }}</Message>
                  </ErrorMessage>
                </div>

                <div class="flex flex-col gap-1">
                  <label class="block text-sm font-medium text-gray-700">Position</label>
                  <Field name="position" v-slot="{ field, errorMessage }">
                    <InputText
                        v-bind="field"
                        type="text"
                        placeholder="Enter your position"
                        class="w-full"
                        :class="{ 'p-invalid': errorMessage }"
                    />
                  </Field>
                  <ErrorMessage name="position" v-slot="{ message }">
                    <Message severity="error" size="small" variant="simple">{{ message }}</Message>
                  </ErrorMessage>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="flex flex-col gap-1">
                  <label class="block text-sm font-medium text-gray-700">Start Date</label>
                  <Field name="startDate" v-slot="{ field, errorMessage }">
                    <Calendar
                        v-model="field.value"
                        dateFormat="mm-yy"
                        view="month"
                        :showIcon="true"
                        placeholder="Select start date"
                        class="w-full"
                        :class="{ 'p-invalid': errorMessage }"
                    />
                  </Field>
                  <ErrorMessage name="startDate" v-slot="{ message }">
                    <Message severity="error" size="small" variant="simple">{{ message }}</Message>
                  </ErrorMessage>
                </div>

                <div class="flex flex-col gap-1">
                  <label class="block text-sm font-medium text-gray-700">End Date</label>
                  <Field name="endDate" v-slot="{ field, errorMessage }">
                    <Calendar
                        v-model="field.value"
                        dateFormat="mm-yy"
                        view="month"
                        :showIcon="true"
                        placeholder="Select end date"
                        class="w-full"
                        :class="{ 'p-invalid': errorMessage }"
                    />
                  </Field>
                  <ErrorMessage name="endDate" v-slot="{ message }">
                    <Message severity="error" size="small" variant="simple">{{ message }}</Message>
                  </ErrorMessage>
                </div>
              </div>

              <div class="flex flex-col gap-1">
                <label class="block text-sm font-medium text-gray-700">Description</label>
                <Field name="description" v-slot="{ field, errorMessage }">
                  <Textarea
                      v-bind="field"
                      rows="4"
                      placeholder="Describe your role and achievements"
                      class="w-full"
                      :class="{ 'p-invalid': errorMessage }"
                  />
                </Field>
                <ErrorMessage name="description" v-slot="{ message }">
                  <Message severity="error" size="small" variant="simple">{{ message }}</Message>
                </ErrorMessage>
              </div>

              <div class="flex justify-end">
                <Button
                    type="button"
                    icon="pi pi-trash"
                    class="p-button-danger p-button-outlined"
                    @click="removeExperience(index)"
                />
              </div>
            </Form>
          </div>
        </div>

        <div class="flex justify-center mt-6">
          <Button
              type="button"
              label="Add more experience"
              icon="pi pi-plus"
              class="p-button-outlined p-button-primary"
              @click="addNewExperience"
          />
        </div>

        <div class="flex justify-between mt-8">
          <Button
              label="Prev"
              icon="pi pi-arrow-left"
              class="p-button-outlined p-button-primary"
              type="button"
              @click="$router.push('/personal')"
          />
          <Button
              label="Next"
              icon="pi pi-arrow-right"
              iconPos="right"
              type="button"
              @click="onNext"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import { useCvStore } from '@/cvStore'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Textarea from 'primevue/textarea'
import Calendar from 'primevue/calendar'
import Message from 'primevue/message'
import { useToast } from 'primevue/usetoast'

const router = useRouter()
const cvStore = useCvStore()
const toast = useToast()

const schema = yup.object({
  organization: yup.string().required('Organization is required'),
  position: yup.string().required('Position is required'),
  startDate: yup.date().required('Start date is required'),
  endDate: yup.date().required('End date is required')
      .min(yup.ref('startDate'), 'End date must be after start date'),
  description: yup.string().required('Description is required')
})

const experiences = ref(cvStore.experience.length > 0 ? [...cvStore.experience] : [{
  organization: '',
  position: '',
  startDate: null,
  endDate: null,
  description: ''
}])

const updateExperience = (index, values) => {
  const formattedExperience = {
    organization: values.organization,
    position: values.position,
    startDate: values.startDate instanceof Date ? values.startDate.toISOString() : values.startDate,
    endDate: values.endDate instanceof Date ? values.endDate.toISOString() : values.endDate,
    description: values.description
  }

  experiences.value[index] = {
    ...formattedExperience,
    startDate: values.startDate,
    endDate: values.endDate
  }

  if (index < cvStore.experience.length) {
    cvStore.updateExperience(index, formattedExperience)
  } else {
    cvStore.addExperience(formattedExperience)
  }

  toast.add({
    severity: 'success',
    summary: 'Experience updated successfully',
    life: 3000
  })
}

const removeExperience = (index) => {
  experiences.value = experiences.value.filter((_, i) => i !== index)
  cvStore.removeExperience(index)
}

const addNewExperience = () => {
  experiences.value.push({
    organization: '',
    position: '',
    startDate: null,
    endDate: null,
    description: ''
  })
}

const onFormSubmit = (index, values) => {
  const formattedExperience = {
    ...values,
    startDate: values.startDate instanceof Date ? values.startDate.toISOString() : values.startDate,
    endDate: values.endDate instanceof Date ? values.endDate.toISOString() : values.endDate
  };

  if (index < cvStore.experience.length) {
    cvStore.updateExperience(index, formattedExperience);
  } else {
    cvStore.addExperience(formattedExperience);
  }

  toast.add({
    severity: 'success',
    summary: 'Experience updated successfully',
    life: 3000
  });
}

const onNext = () => {
  if (experiences.value.length === 0) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'At least one experience is required',
      life: 3000
    });
    return;
  }

  router.push('/projects');
}

onMounted(() => {
  if (cvStore.experience.length > 0) {
    experiences.value = [...cvStore.experience]
  }
})
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

:deep(.p-inputtext),
:deep(.p-calendar),
:deep(.p-textarea) {
  background: #fff !important;
  border: 1px solid #e2e8f0 !important;
  border-radius: 0.375rem !important;
  color: black;
}

:deep(.p-inputtext:focus),
:deep(.p-calendar:focus),
:deep(.p-textarea:focus) {
  border-color: #4f46e5 !important;
  box-shadow: 0 0 0 2px #e0e7ff !important;
}

:deep(.p-inputtext.p-invalid),
:deep(.p-calendar.p-invalid),
:deep(.p-textarea.p-invalid) {
  border-color: #ef4444 !important;
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

:deep(.p-calendar) {
  width: 100%;
}

:deep(.p-button-danger) {
  color: #ef4444 !important;
  border-color: #ef4444 !important;
}

:deep(.p-button-danger:hover) {
  background: #fee2e2 !important;
}
</style>