<template>
  <div class="preview-template">
    <div class="header">
      <div class="name-block"></div>
      <div class="position-block"></div>
    </div>

    <div class="contact-info">
      <div class="info-block"></div>
      <div class="info-block"></div>
      <div class="info-block"></div>
    </div>

    <div class="content">
      <div class="section">
        <div class="section-title"></div>
        <div class="section-content">
          <div class="line"></div>
          <div class="line"></div>
          <div class="line short"></div>
        </div>
      </div>

      <div class="section">
        <div class="section-title"></div>
        <div class="section-content">
          <div class="line"></div>
          <div class="line"></div>
          <div class="line short"></div>
        </div>
      </div>

      <div class="section">
        <div class="section-title"></div>
        <div class="section-content">
          <div class="skills">
            <div class="skill"></div>
            <div class="skill"></div>
            <div class="skill"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.preview-template {
  width: 100%;
  height: 100%;
  padding: 20px;
  background: white;
}

.header {
  margin-bottom: 20px;
}

.name-block {
  height: 24px;
  background: #e5e7eb;
  width: 60%;
  margin-bottom: 8px;
  border-radius: 4px;
}

.position-block {
  height: 16px;
  background: #e5e7eb;
  width: 40%;
  border-radius: 4px;
}

.contact-info {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.info-block {
  height: 12px;
  background: #e5e7eb;
  flex: 1;
  border-radius: 4px;
}

.section {
  margin-bottom: 20px;
}

.section-title {
  height: 20px;
  background: #e5e7eb;
  width: 30%;
  margin-bottom: 10px;
  border-radius: 4px;
}

.line {
  height: 10px;
  background: #e5e7eb;
  width: 100%;
  margin-bottom: 8px;
  border-radius: 4px;
}

.line.short {
  width: 70%;
}

.skills {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.skill {
  height: 24px;
  background: #e5e7eb;
  width: 80px;
  border-radius: 12px;
}
</style>