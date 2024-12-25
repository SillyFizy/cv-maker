<template>
  <div class="min-h-screen bg-gray-50 py-8 px-4">
    <div class="max-w-5xl mx-auto bg-white rounded-lg shadow-md">
      <div class="p-6">
        <h1 class="text-2xl font-semibold text-center text-gray-800 mb-8">Choose CV color</h1>

        <div class="max-w-md mx-auto space-y-8">
          <div class="flex flex-col items-center space-y-6">
            <ColorPicker
                :modelValue="selectedColor"
                @update:modelValue="updateColor"
                class="w-full"
            />

            <div class="w-full space-y-4">
              <div class="flex flex-col items-center space-y-2">
                <label class="text-sm font-medium text-gray-700">Color Preview</label>
                <div
                    class="w-32 h-32 rounded-lg shadow-md"
                    :style="{ backgroundColor: formatHex }"
                ></div>
              </div>

              <div class="flex flex-col space-y-1">
                <label class="block text-sm font-medium text-gray-700">HEX</label>
                <InputText
                    :value="formatHex"
                    class="text-center"
                    readonly
                />
              </div>

              <div class="flex flex-col space-y-1">
                <label class="block text-sm font-medium text-gray-700">RGB</label>
                <InputText
                    :value="rgbValue"
                    class="text-center"
                    readonly
                />
              </div>
            </div>
          </div>

          <div class="flex justify-between mt-8">
            <Button
                label="Prev"
                icon="pi pi-arrow-left"
                class="p-button-outlined p-button-primary"
                @click="$router.push('/miscellaneous')"
            />
            <Button
                label="Next"
                icon="pi pi-arrow-right"
                iconPos="right"
                class="p-button-primary"
                @click="onNext"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, computed, onMounted} from 'vue'
import {useRouter} from 'vue-router'
import {useCvStore} from '@/cvStore'
import ColorPicker from 'primevue/colorpicker'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import {useToast} from 'primevue/usetoast'

const router = useRouter()
const cvStore = useCvStore()
const toast = useToast()

const selectedColor = ref(cvStore.design.color || '4f46e5')

const formatHex = computed(() => {
  if (typeof selectedColor.value === 'number') {
    return '#' + selectedColor.value.toString(16).padStart(6, '0')
  }
  return selectedColor.value.startsWith('#') ? selectedColor.value : '#' + selectedColor.value
})

const rgbValue = computed(() => {
  const hex = formatHex.value.replace('#', '')
  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)
  return `${r}, ${g}, ${b}`
})

const updateColor = (value) => {
  let colorValue = value
  if (typeof value === 'number') {
    colorValue = '#' + value.toString(16).padStart(6, '0')
  } else if (!value.startsWith('#')) {
    colorValue = '#' + value
  }

  selectedColor.value = colorValue
}

const onNext = () => {
  cvStore.updateDesign({
    color: selectedColor.value
  })


  toast.add({
    severity: 'success',
    summary: 'Color saved successfully',
    life: 3000
  })

  router.push('/templates')
}

onMounted(() => {
  if (cvStore.design.color) {
    selectedColor.value = cvStore.design.color
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

:deep(.p-button-text.p-button-primary) {
  color: #4f46e5 !important;
  background: transparent !important;
}

:deep(.p-colorpicker) {
  width: 100%;
  max-width: 300px;
}

:deep(.p-inputtext) {
  background: #fff !important;
  border: 1px solid #e2e8f0 !important;
  border-radius: 0.375rem !important;
  color: black;
}

:deep(.p-inputtext:focus) {
  border-color: #4f46e5 !important;
  box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2) !important;
}
</style>