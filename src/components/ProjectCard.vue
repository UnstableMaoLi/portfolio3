<template>
  <article class="card project-card">
    <img
      :src="project.image"
      :alt="project.title"
      width="500"
      height="300"
    />

    <div class="project-card-body">
      <div class="project-meta">
        <span>{{ project.category }}</span>
        <span>{{ project.level }}</span>
        <span>{{ project.year }}</span>
      </div>

      <h3>{{ project.title }}</h3>

      <p>{{ project.shortText }}</p>

      <div class="project-tags">
        <span v-for="tag in project.tags" :key="tag">
          {{ tag }}
        </span>
      </div>

      <button class="text-button" type="button" @click="$emit('show-details', project)">
        Details
      </button>
    </div>
  </article>
</template>

<script setup>
defineProps({
  project: {
    type: Object,
    required: true
  }
});

defineEmits(["show-details"]);
</script>