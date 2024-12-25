<!-- components/ProgressSteps.vue -->
<template>
  <div class="w-full py-4 px-2">
    <div class="flex items-center justify-between">
      <template v-for="(step, index) in steps" :key="index">
        <div class="flex flex-col items-center">
          <div
              class="w-8 h-8 rounded-full flex items-center justify-center"
              :class="[
              currentStep > index
                ? 'bg-blue-500 text-white'
                : currentStep === index
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-600'
            ]"
          >
            {{ index + 1 }}
          </div>
          <span
              class="mt-2 text-sm"
              :class="[
              currentStep >= index
                ? 'text-blue-500'
                : 'text-gray-500'
            ]"
          >
            {{ step }}
          </span>
        </div>

        <div
            v-if="index < steps.length - 1"
            class="flex-1 h-0.5 mx-4"
            :class="[
            currentStep > index
              ? 'bg-blue-500'
              : 'bg-gray-200'
          ]"
        ></div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  steps: {
    type: Array,
    required: true
  },
  currentStep: {
    type: Number,
    required: true
  }
})
</script>