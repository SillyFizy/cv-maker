<template>
  <nav class="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <div class="flex-1 flex justify-center">
          <div class="flex space-x-8">
            <div
                v-for="(step, index) in steps"
                :key="index"
                :class="[
                currentStep === index
                  ? 'border-indigo-500 text-gray-900'
                  : 'border-transparent text-gray-500',
                'px-1 pt-1 border-b-2 text-sm font-medium cursor-default'
              ]"
            >
              {{ step.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
const props = defineProps({
  currentStep: {
    type: Number,
    required: true
  }
})

const steps = [
  { name: 'Personal Info' },
  { name: 'Experience' },
  { name: 'Projects' },
  { name: 'Education' },
  { name: 'Miscellaneous' },
  { name: 'Color' },
  { name: 'Templates' },
  { name: 'Finish' }
]
</script>