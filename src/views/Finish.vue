<template>
  <div class="min-h-screen bg-gray-50 py-8 px-4">
    <div class="max-w-3xl mx-auto">
      <div class="bg-white rounded-lg shadow-md p-8">
        <h1 class="text-2xl font-semibold text-center text-gray-800 mb-8">Download your CV</h1>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
              class="border rounded-lg p-6 cursor-pointer hover:shadow-lg transition-all duration-200"
              @click="downloadPDF"
          >
            <div class="flex flex-col items-center">
              <i class="pi pi-file-pdf text-4xl mb-4 text-red-500"></i>
              <h3 class="text-lg font-medium mb-2">PDF Format</h3>
              <Button
                  label="Download PDF"
                  icon="pi pi-download"
                  class="p-button-danger"
                  @click="downloadPDF"
              />
            </div>
          </div>

          <div
              class="border rounded-lg p-6 cursor-pointer hover:shadow-lg transition-all duration-200"
              @click="downloadDOC"
          >
            <div class="flex flex-col items-center">
              <i class="pi pi-file-word text-4xl mb-4 text-blue-500"></i>
              <h3 class="text-lg font-medium mb-2">Word Format</h3>
              <Button
                  label="Download DOC"
                  icon="pi pi-download"
                  class="p-button-primary"
                  @click="downloadDOC"
              />
            </div>
          </div>
        </div>

        <div class="mt-8 border-t pt-8">
          <h2 class="text-xl font-medium mb-4">Preview</h2>
          <div class="border rounded-lg overflow-hidden bg-white">
            <div id="cv-template-container" class="w-full">
              <component
                  :is="selectedTemplate"
                  class="preview-template"
                  :style="{ transform: 'scale(1)', width: '210mm' }"
              />
            </div>
          </div>
        </div>

        <div class="flex justify-between mt-8">
          <Button
              label="Back"
              icon="pi pi-arrow-left"
              class="p-button-outlined p-button-primary"
              @click="$router.push('/templates')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed} from 'vue'
import {useRouter} from 'vue-router'
import {useCvStore} from '@/cvStore'
import Button from 'primevue/button'
import {useToast} from 'primevue/usetoast'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import Pro from '@/Templates/Pro.vue'
import Modern from '@/Templates/Modern.vue'
import {Document, Packer, Paragraph, TextRun} from 'docx'

const router = useRouter()
const cvStore = useCvStore()
const toast = useToast()

const selectedTemplate = computed(() => {
  return cvStore.design.template === 'pro' ? Pro : Modern
})


const downloadPDF = async () => {
  try {
    const template = document.querySelector('#cv-template-container')

    const clone = template.cloneNode(true)
    document.body.appendChild(clone)
    clone.style.position = 'absolute'
    clone.style.left = '-9999px'
    clone.style.top = '0'

    clone.querySelectorAll('*').forEach(el => {
      const style = window.getComputedStyle(el)
      if (style.color === 'rgb(255, 255, 255)') {
        el.style.color = '#000000'
      }
    })

    const canvas = await html2canvas(clone, {
      scale: 2,
      useCORS: true,
      logging: true,
      backgroundColor: '#ffffff',
      width: 794,
      height: 1123,
      onclone: (clonedDoc) => {
        const elements = clonedDoc.querySelectorAll('*')
        elements.forEach(el => {
          if (window.getComputedStyle(el).color === 'rgb(255, 255, 255)') {
            el.style.color = '#000000'
          }
        })
      }
    })

    document.body.removeChild(clone)

    const imgData = canvas.toDataURL('image/jpeg', 1.0)
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    })

    pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297)
    pdf.save(`${cvStore.fullName.replace(/\s+/g, '_')}_CV.pdf`)

  } catch (error) {
    console.error('PDF generation error:', error)
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to generate PDF: ' + error.message,
      life: 3000
    })
  }
}

const downloadDOC = async () => {
  try {
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: cvStore.fullName,
                bold: true,
                size: 32
              })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: cvStore.personal.position,
                size: 24
              })
            ]
          }),
        ]
      }]
    })

    const blob = await Packer.toBlob(doc)
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${cvStore.fullName.replace(/\s+/g, '_')}_CV.docx`
    link.click()
    window.URL.revokeObjectURL(url)

    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'DOC downloaded successfully',
      life: 3000
    })
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to generate DOC',
      life: 3000
    })
  }
}
</script>

<style scoped>
#cv-template-container {
  position: relative;
  width: 210mm;
  min-height: 297mm;
  background: white;
  margin: 0 auto;
}

.preview-template {
  width: 100%;
  background: white;
}

@media print {
  * {
    color: #000000 !important;
  }
}

:deep(.p-button-primary) {
  background: #4f46e5 !important;
  border-color: #4f46e5 !important;
}

:deep(.p-button-outlined.p-button-primary) {
  color: #4f46e5 !important;
  background: transparent !important;
  border-color: #4f46e5 !important;
}

:deep(.preview-template) {
  transform: scale(1);
  transform-origin: top left;
}
</style>