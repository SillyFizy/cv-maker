import HomePage from "@/views/HomePage.vue";
import PersonalInfo from "@/views/PersonalInfo.vue";
import Experience from "@/views/Experience.vue";
import Projects from "@/views/Projects.vue";
import Education from "@/views/Education.vue";
import Miscellaneous from "@/views/Miscellaneous.vue";
import ColorSelection from "@/views/ColorSelection.vue";
import Templates from "@/views/Templates.vue";
import Finish from "@/views/Finish.vue";

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'Home',
        component: HomePage
    },
    {
        path: '/personal',
        name: 'PersonalInfo',
        component: PersonalInfo
    },
    {
        path: '/experience',
        name: 'Experience',
        component: Experience
    },
    {
        path: '/projects',
        name: 'Projects',
        component: Projects
    },
    {
        path: '/education',
        name: 'Education',
        component: Education
    },
    {
        path: '/miscellaneous',
        name: 'Miscellaneous',
        component: Miscellaneous
    },
    {
        path: '/color',
        name: 'ColorSelection',
        component: ColorSelection
    },
    {
        path: '/templates',
        name: 'Templates',
        component: Templates
    },
    {
        path: '/finish',
        name: 'Finish',
        component: Finish
    }
]

export default routes