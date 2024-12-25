# App.vue
<template>
  <NavigationProgress
      v-if="showNavigation"
      :currentStep="currentStepIndex"
  />
  <div :class="{ 'pt-16': showNavigation }">
    <router-view v-slot="{ Component, route }">
      <transition name="slide-fade" mode="out-in">
        <div :key="route.name">
          <component :is="Component" />
        </div>
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import NavigationProgress from './components/NavigationProgress.vue'

const route = useRoute()

const stepRoutes = [
  '/personal', '/experience', '/projects', '/education',
  '/miscellaneous', '/color', '/templates', '/finish'
]

const showNavigation = computed(() =>
    route.path !== '/' && route.path !== '/home'
)

const currentStepIndex = computed(() =>
    stepRoutes.indexOf(route.path)
)
</script>