<template>
  <div class="min-h-screen flex justify-center items-center p-4">
    <div class="max-w-3xl w-full text-center p-4 md:p-8">
      <h1 class="text-4xl md:text-5xl mb-12 text-primary">Welcome to Our CV Builder</h1>

      <div class="mb-12">
        <h2 class="text-lg md:text-xl mb-6 text-gray-600">Choose the language of your cv content:</h2>
        <div class="flex justify-center gap-4">
          <SelectButton
              v-model="selectedLanguage"
              :options="languages"
              optionLabel="name"
              :unselectable="false"
              aria-labelledby="language-selection"
          />
        </div>
      </div>

      <Button
          label="Let's Start"
          icon="pi pi-arrow-right"
          iconPos="right"
          severity="info"
          size="large"
          :disabled="!selectedLanguage"
          @click="startCvCreation"
          class="px-8 py-4 text-lg md:text-base"
      />
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import {useCvStore} from '@/cvStore'
import Button from 'primevue/button'
import SelectButton from 'primevue/selectbutton'

const router = useRouter()
const cvStore = useCvStore()

const languages = [
  {name: 'English', code: 'en'},
  {name: 'Arabic', code: 'ar'}
]

const selectedLanguage = ref(null)

const startCvCreation = () => {
  cvStore.updateLanguage(selectedLanguage.value.code)
  router.push('/personal')
}
</script>