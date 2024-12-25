<template>
  <div class="preview-template">
    <div class="flex h-full">
      <div class="sidebar">
        <div class="profile-image"></div>

        <div class="name-block"></div>
        <div class="position-block"></div>

        <div class="contact-info">
          <div class="info-item"></div>
          <div class="info-item"></div>
          <div class="info-item"></div>
        </div>

        <div class="skills">
          <div class="skill"></div>
          <div class="skill"></div>
          <div class="skill"></div>
        </div>
      </div>

      <div class="main-content">
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
      </div>
    </div>
  </div>
</template>

<style scoped>
.preview-template {
  width: 100%;
  height: 100%;
  background: white;
}

.sidebar {
  width: 35%;
  height: 100%;
  background: #f3f4f6;
  padding: 20px;
}

.profile-image {
  width: 80px;
  height: 80px;
  background: #e5e7eb;
  border-radius: 50%;
  margin: 0 auto 16px;
}

.name-block {
  height: 20px;
  background: #e5e7eb;
  width: 80%;
  margin: 0 auto 8px;
  border-radius: 4px;
}

.position-block {
  height: 16px;
  background: #e5e7eb;
  width: 60%;
  margin: 0 auto 20px;
  border-radius: 4px;
}

.contact-info {
  margin-bottom: 20px;
}

.info-item {
  height: 12px;
  background: #e5e7eb;
  width: 100%;
  margin-bottom: 8px;
  border-radius: 4px;
}

.skills {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.skill {
  height: 24px;
  background: #e5e7eb;
  width: 100%;
  border-radius: 12px;
}

.main-content {
  flex: 1;
  padding: 20px;
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
</style>