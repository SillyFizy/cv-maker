<template>
  <div class="min-h-screen bg-gray-50 py-8 px-4">
    <div class="max-w-6xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
            class="cursor-pointer rounded-lg overflow-hidden"
            :class="{ 'ring-2 ring-[#4f46e5]': selectedTemplate === 'pro' }"
            @click="selectTemplate('pro')"
        >
          <h3 class="text-lg p-4 border-b">Professional</h3>
          <div class="p-4 bg-white">
            <div class="aspect-[210/297] border rounded-lg overflow-hidden">
              <ProfessionalPreview />
            </div>
          </div>
        </div>

        <div
            class="cursor-pointer rounded-lg overflow-hidden"
            :class="{ 'ring-2 ring-[#4f46e5]': selectedTemplate === 'modern' }"
            @click="selectTemplate('modern')"
        >
          <h3 class="text-lg p-4 border-b">Modern</h3>
          <div class="p-4 bg-white">
            <div class="aspect-[210/297] border rounded-lg overflow-hidden">
              <ModernPreview />
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-between mt-8">
        <Button
            label="Prev"
            icon="pi pi-arrow-left"
            class="p-button-outlined p-button-primary"
            @click="$router.push('/color')"
        />
        <Button
            label="Next"
            icon="pi pi-arrow-right"
            iconPos="right"
            class="p-button-primary"
            @click="onNext"
            :disabled="!selectedTemplate"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCvStore } from '@/cvStore'
import Button from 'primevue/button'
import { useToast } from 'primevue/usetoast'
import ProfessionalPreview from '@/previews/ProfessionalPreview.vue'
import ModernPreview from '@/previews/ModernPreview.vue'

const router = useRouter()
const cvStore = useCvStore()
const toast = useToast()

const selectedTemplate = ref(cvStore.design.template || '')

const selectTemplate = (template) => {
  selectedTemplate.value = template
}

const onNext = () => {
  if (!selectedTemplate.value) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Please select a template',
      life: 3000
    })
    return
  }

  cvStore.updateDesign({
    ...cvStore.design,
    template: selectedTemplate.value
  })

  toast.add({
    severity: 'success',
    summary: 'Success',
    detail: 'Template selected successfully',
    life: 3000
  })

  router.push('/finish')
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
</style>