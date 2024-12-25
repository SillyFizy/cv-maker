<template>
  <div class="min-h-screen bg-gray-50 py-8 px-4">
    <div class="max-w-5xl mx-auto bg-white rounded-lg shadow-md">
      <Toast />
      <div class="p-6">
        <h1 class="text-2xl font-semibold text-center text-gray-800 mb-8">Projects</h1>

        <div class="space-y-8">
          <div v-for="(project, index) in projects" :key="index" class="border rounded-lg p-6 bg-gray-50">
            <Form
                :validation-schema="schema"
                :initial-values="project"
                @submit="values => onFormSubmit(index, values)"
                class="space-y-6"
                v-slot="{ isSubmitting }"
            >
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="flex flex-col gap-1">
                  <label class="block text-sm font-medium text-gray-700">Title</label>
                  <Field name="title" v-slot="{ field, errorMessage }">
                    <InputText
                        v-bind="field"
                        type="text"
                        placeholder="Enter project title"
                        class="w-full"
                        :class="{ 'p-invalid': errorMessage }"
                    />
                  </Field>
                  <ErrorMessage name="title" v-slot="{ message }">
                    <Message severity="error" size="small" variant="simple">{{ message }}</Message>
                  </ErrorMessage>
                </div>

                <div class="flex flex-col gap-1">
                  <label class="block text-sm font-medium text-gray-700">Link</label>
                  <Field name="link" v-slot="{ field, errorMessage }">
                    <InputText
                        v-bind="field"
                        type="text"
                        placeholder="Enter project link"
                        class="w-full"
                        :class="{ 'p-invalid': errorMessage }"
                    />
                  </Field>
                  <ErrorMessage name="link" v-slot="{ message }">
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
                      placeholder="Describe your project"
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
                    @click="removeProject(index)"
                />
              </div>
            </Form>
          </div>
        </div>

        <div class="flex justify-center mt-6">
          <Button
              type="button"
              label="Add more projects"
              icon="pi pi-plus"
              class="p-button-outlined p-button-primary"
              @click="addNewProject"
          />
        </div>

        <div class="flex justify-between mt-8">
          <Button
              label="Prev"
              icon="pi pi-arrow-left"
              class="p-button-outlined p-button-primary"
              type="button"
              @click="$router.push('/experience')"
          />
          <Button
              label="Next"
              icon="pi pi-arrow-right"
              iconPos="right"
              type="submit"
              @click="onNext"
              class="p-button-primary"
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
import Message from 'primevue/message'
import { useToast } from 'primevue/usetoast'

const router = useRouter()
const cvStore = useCvStore()
const toast = useToast()

const schema = yup.object({
  title: yup.string().required('Title is required'),
  link: yup.string().url('Please enter a valid URL').required('Link is required'),
  description: yup.string().required('Description is required')
})

const projects = ref(
    cvStore.projects.length > 0
        ? [...cvStore.projects]
        : [{
          title: '',
          link: '',
          description: ''
        }]
)

const addNewProject = () => {
  projects.value.push({
    title: '',
    link: '',
    description: ''
  })
}

const removeProject = (index) => {
  projects.value = projects.value.filter((_, i) => i !== index)
  cvStore.removeProject(index)
}

const onFormSubmit = (index, values) => {
  if (index < cvStore.projects.length) {
    cvStore.updateProject(index, values)
  } else {
    cvStore.addProject(values)
  }

  toast.add({
    severity: 'success',
    summary: 'Project updated successfully',
    life: 3000
  })
}

const onNext = () => {
  if (projects.value.length === 0) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'At least one project is required',
      life: 3000
    });
    return;
  }

  router.push('/education')
}

onMounted(() => {
  if (cvStore.projects.length > 0) {
    projects.value = [...cvStore.projects]
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
:deep(.p-textarea) {
  background: #fff !important;
  border: 1px solid #e2e8f0 !important;
  border-radius: 0.375rem !important;
  color: black;
}

:deep(.p-inputtext:focus),
:deep(.p-textarea:focus) {
  border-color: #4f46e5 !important;
  box-shadow: 0 0 0 2px #e0e7ff !important;
}

:deep(.p-inputtext.p-invalid),
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

:deep(.p-button-danger) {
  color: #ef4444 !important;
  border-color: #ef4444 !important;
}

:deep(.p-button-danger:hover) {
  background: #fee2e2 !important;
}
</style>