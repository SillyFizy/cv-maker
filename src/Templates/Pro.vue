<template>
  <div class="bg-white min-h-screen flex">
    <div class="w-1/3 bg-white" style="min-height: 297mm;">
      <div class="h-full" :style="{ backgroundColor: cvStore.design.color }">
        <div class="p-8 text-white">
          <h1 class="text-3xl font-bold mb-2">{{ cvStore.fullName }}</h1>
          <p class="text-xl mb-6">{{ cvStore.personal.position }}</p>

          <div class="space-y-4 mb-8">
            <div v-if="cvStore.personal.email" class="flex items-center">
              <i class="pi pi-envelope mr-2"></i>
              {{ cvStore.personal.email }}
            </div>
          </div>

          <div class="mb-8">
            <h2 class="text-2xl font-bold mb-4">Skills</h2>
            <div class="flex flex-wrap gap-2">
              <span v-for="skill in cvStore.personal.skills"
                    :key="skill"
                    class="px-3 py-1 rounded-full bg-white/10">
                {{ skill }}
              </span>
            </div>
          </div>

          <div class="mb-8">
            <h2 class="text-2xl font-bold mb-4">Languages</h2>
            <div class="flex flex-wrap gap-2">
              <span v-for="lang in cvStore.miscellaneous.languages"
                    :key="lang"
                    class="px-3 py-1 rounded-full bg-white/10">
                {{ lang }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-1 p-8">
      <div class="mb-8" v-if="cvStore.experience && cvStore.experience.length > 0">
        <h2 class="text-2xl font-bold mb-6" :style="{ color: cvStore.design.color }">Experience</h2>
        <div v-for="(exp, index) in cvStore.experience" :key="index" class="mb-6">
          <div class="flex justify-between items-start mb-2">
            <div>
              <h3 class="font-bold text-lg">{{ exp.position }}</h3>
              <div class="text-gray-600">{{ exp.organization }}</div>
            </div>
            <div class="text-sm text-gray-500">
              {{ formatDate(exp.startDate) }} - {{ formatDate(exp.endDate) }}
            </div>
          </div>
          <p class="text-gray-700">{{ exp.description }}</p>
        </div>
      </div>

      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-6" :style="{ color: cvStore.design.color }">Education</h2>
        <div v-for="(edu, index) in cvStore.sortedEducation" :key="index" class="mb-6">
          <div class="flex justify-between items-start mb-2">
            <div>
              <h3 class="font-bold text-lg">{{ edu.college }}</h3>
              <div class="text-gray-600">{{ edu.qualification }}</div>
            </div>
            <div class="text-sm text-gray-500">
              {{ formatDate(edu.startDate) }} - {{ formatDate(edu.endDate) }}
            </div>
          </div>
          <p class="text-gray-700">{{ edu.description }}</p>
        </div>
      </div>

      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-6" :style="{ color: cvStore.design.color }">Projects</h2>
        <div v-for="(project, index) in cvStore.projects" :key="index" class="mb-6">
          <div class="flex justify-between items-start mb-2">
            <h3 class="font-bold text-lg">{{ project.title }}</h3>
            <a
                :href="project.link"
                target="_blank"
                class="text-sm hover:underline"
                :style="{ color: cvStore.design.color }"
            >View Project</a>
          </div>
          <p class="text-gray-700">{{ project.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useCvStore} from '@/cvStore'

const cvStore = useCvStore()

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric'
  });
}
</script>

<style scoped>
@media print {
  .print-dark {
    color: #000000 !important;
  }

  .print-friendly {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}
</style>