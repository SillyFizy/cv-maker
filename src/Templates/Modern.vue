<template>
  <div class="bg-white p-8 mx-auto" style="width: 210mm;">
    <div class="border-b pb-6 mb-6">
      <h1 class="text-3xl font-bold mb-2" :style="{ color: cvStore.design.color }">
        {{ cvStore.fullName }}
      </h1>
      <p class="text-xl text-gray-600">{{ cvStore.personal.position }}</p>
    </div>

    <div class="grid grid-cols-2 gap-4 mb-8">
      <div v-if="cvStore.personal.email" class="flex items-center">
        <i class="pi pi-envelope mr-2" :style="{ color: cvStore.design.color }"></i>
        {{ cvStore.personal.email }}
      </div>
      <div v-if="cvStore.personal.phone" class="flex items-center">
        <i class="pi pi-phone mr-2" :style="{ color: cvStore.design.color }"></i>
        {{ cvStore.personal.phone }}
      </div>
      <div v-if="cvStore.personal.linkedin" class="flex items-center">
        <i class="pi pi-linkedin mr-2" :style="{ color: cvStore.design.color }"></i>
        {{ cvStore.personal.linkedin }}
      </div>
      <div v-if="cvStore.personal.github" class="flex items-center">
        <i class="pi pi-github mr-2" :style="{ color: cvStore.design.color }"></i>
        {{ cvStore.personal.github }}
      </div>
      <div v-if="cvStore.personal.city && cvStore.personal.country" class="flex items-center">
        <i class="pi pi-map-marker mr-2" :style="{ color: cvStore.design.color }"></i>
        {{ cvStore.personal.city }}, {{ cvStore.personal.country }}
      </div>
    </div>

    <div class="mb-8" v-if="cvStore.experience.length > 0">
      <h2 class="text-2xl font-bold mb-4 pb-2 border-b-2" :style="{ borderColor: cvStore.design.color }">
        Experience
      </h2>
      <div v-for="(exp, index) in cvStore.sortedExperience" :key="index" class="mb-6">
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

    <div class="mb-8" v-if="cvStore.education.length > 0">
      <h2 class="text-2xl font-bold mb-4 pb-2 border-b-2" :style="{ borderColor: cvStore.design.color }">
        Education
      </h2>
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

    <div class="mb-8" v-if="cvStore.projects.length > 0">
      <h2 class="text-2xl font-bold mb-4 pb-2 border-b-2" :style="{ borderColor: cvStore.design.color }">
        Projects
      </h2>
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

    <div class="mb-8" v-if="cvStore.personal.skills.length > 0">
      <h2 class="text-2xl font-bold mb-4 pb-2 border-b-2" :style="{ borderColor: cvStore.design.color }">
        Skills
      </h2>
      <div class="flex flex-wrap gap-2">
        <span
            v-for="skill in cvStore.personal.skills"
            :key="skill"
            class="px-3 py-1 rounded-full text-sm"
            :style="{
            backgroundColor: `${cvStore.design.color}1A`,
            color: cvStore.design.color
          }"
        >
          {{ skill }}
        </span>
      </div>
    </div>

    <div class="mb-8" v-if="cvStore.miscellaneous.languages.length > 0">
      <h2 class="text-2xl font-bold mb-4 pb-2 border-b-2" :style="{ borderColor: cvStore.design.color }">
        Languages
      </h2>
      <div class="flex flex-wrap gap-2">
        <span
            v-for="language in cvStore.miscellaneous.languages"
            :key="language"
            class="px-3 py-1 rounded-full text-sm"
            :style="{
            backgroundColor: `${cvStore.design.color}1A`,
            color: cvStore.design.color
          }"
        >
          {{ language }}
        </span>
      </div>
    </div>

    <div v-if="cvStore.miscellaneous.certifications.length > 0">
      <h2 class="text-2xl font-bold mb-4 pb-2 border-b-2" :style="{ borderColor: cvStore.design.color }">
        Certifications
      </h2>
      <ul class="list-disc pl-5">
        <li
            v-for="cert in cvStore.miscellaneous.certifications"
            :key="cert"
            class="mb-2 text-gray-700"
        >
          {{ cert }}
        </li>
      </ul>
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
  .bg-white {
    margin: 0;
    padding: 20mm;
  }

  :deep(.text-white) {
    color: #000000 !important;
  }

  :deep([class*='text-']) {
    color: #000000 !important;
  }
}
</style>