import {defineStore} from 'pinia'

export const useCvStore = defineStore('cv', {
    state: () => ({
        language: 'en',
        personal: {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@gmail.com',
            phone: '07912345678',
            street: '123 Main St',
            city: 'London',
            country: 'United Kingdom',
            position: 'Senior Software Engineer',
            linkedin: 'linkedin.com/in/johndoe',
            github: 'github.com/johndoe',
            skills: ['JavaScript', 'Vue.js', 'React', 'Node.js', 'Python'],
            image: null,
            summary: 'Experienced software engineer with 5+ years in web development'
        },
        experience: [{
            organization: 'Dev firm',
            position: 'Front End Engineer',
            startDate: '2020-01-01',
            endDate: '2023-12-25',
            description: 'Led development of enterprise web applications using Vue.js'
        },
        ],
        projects: [{
            title: 'E-commerce Platform',
            link: 'github.com/johndoe/ecommerce',
            description: 'Built full-stack e-commerce platform using Vue.js and Node.js'
        },
            {
                title: 'Task Management App',
                link: 'github.com/johndoe/taskapp',
                description: 'Developed productivity app with real-time updates'
            }],
        education: [{
            college: 'University of Technology',
            qualification: 'BSc Computer Science',
            startDate: '2014-09-01',
            endDate: '2018-06-30',
            description: 'Focus on software engineering and web technologies'
        }],
        miscellaneous: {
            achievements: ['Best Developer Award 2022', 'Employee of the Year 2021'],
            languages: ['English', 'Spanish', 'French'],
            certifications: ['AWS Certified Developer', 'Vue.js Certification'],
        },
        design: {
            template: 'modern',
            color: '#4f46e5'
        }
    }),

    actions: {
        updateLanguage(lang) {
            this.language = lang
        },
        updatePersonal(data) {
            this.personal = {...this.personal, ...data}
        },

        addExperience(experience) {
            console.log('Adding experience:', experience)
            this.experience.push(experience)
        },

        updateExperience(index, experience) {
            console.log('Updating experience:', index, experience)
            this.experience[index] = experience
        },

        removeExperience(index) {
            this.experience.splice(index, 1)
        },

        addProject(project) {
            this.projects.push(project)
        },

        updateProject(index, project) {
            this.projects[index] = project
        },

        removeProject(index) {
            this.projects.splice(index, 1)
        },

        addEducation(education) {
            this.education.push(education)
        },

        updateEducation(index, education) {
            this.education[index] = education
        },

        removeEducation(index) {
            this.education.splice(index, 1)
        },

        updateMiscellaneous(data) {
            this.miscellaneous = {...this.miscellaneous, ...data}
        },

        updateDesign(data) {
            this.design = {...this.design, ...data}
        }
    },

    getters: {
        fullName: (state) => `${state.personal.firstName} ${state.personal.lastName}`,
        sortedExperience: (state) => [...state.experience].sort((a, b) => {
            return new Date(b.startDate) - new Date(a.startDate)
        }),
        sortedEducation: (state) => [...state.education].sort((a, b) => {
            return new Date(b.startDate) - new Date(a.startDate)
        })
    }
})