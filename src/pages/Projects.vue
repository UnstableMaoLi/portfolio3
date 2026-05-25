<template>
  <section class="hero compact-hero">
    <div class="hero-text">
      <p class="eyebrow">Vue projects</p>
      <h1>Projects</h1>
      <p class="hero-description">
        This page demonstrates reactive state in Vue: search, filtering,
        sorting and selected project details.
      </p>
    </div>

    <img
      class="hero-photo"
      src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=700&q=80"
      alt="Laptop with code on the screen"
      width="520"
      height="360"
    />
  </section>

  <section class="section">
    <div class="section-heading">
      <p class="section-label">Interactive list</p>
      <h2>Project list</h2>
    </div>

    <div class="card filters-card">
      <label>
        Search project
        <input
          v-model="search"
          type="search"
          placeholder="Enter project name or tag..."
        />
      </label>

      <label>
        Category
        <select v-model="category">
          <option value="all">All</option>
          <option v-for="item in categories" :key="item" :value="item">
            {{ item }}
          </option>
        </select>
      </label>

      <label>
        Sort
        <select v-model="sortType">
          <option value="default">Default</option>
          <option value="title-asc">Title A-Z</option>
          <option value="title-desc">Title Z-A</option>
          <option value="year-desc">Newest first</option>
          <option value="year-asc">Oldest first</option>
        </select>
      </label>

      <button class="button button-secondary" type="button" @click="resetFilters">
        Reset filters
      </button>
    </div>

    <p class="result-count">
      Found projects: {{ filteredProjects.length }} / {{ projects.length }}
    </p>

    <div class="cards-grid two-columns">
      <ProjectCard
        v-for="project in filteredProjects"
        :key="project.id"
        :project="project"
        @show-details="selectProject"
      />

      <article v-if="filteredProjects.length === 0" class="card empty-card">
        <h3>No projects found</h3>
        <p>Try changing the search text, category or sorting type.</p>
      </article>
    </div>
  </section>

  <section class="section">
    <article class="card selected-project">
      <p class="section-label">Selected project</p>

      <template v-if="selectedProject">
        <h2>{{ selectedProject.title }}</h2>
        <p>{{ selectedProject.details }}</p>

        <ul>
          <li><strong>Category:</strong> {{ selectedProject.category }}</li>
          <li><strong>Level:</strong> {{ selectedProject.level }}</li>
          <li><strong>Year:</strong> {{ selectedProject.year }}</li>
          <li><strong>Tags:</strong> {{ selectedProject.tags.join(", ") }}</li>
        </ul>
      </template>

      <template v-else>
        <h2>No project selected</h2>
        <p>Click the “Details” button on any project card to show more information here.</p>
      </template>
    </article>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";
import ProjectCard from "../components/ProjectCard.vue";
import { projects } from "../data/projects";

const search = ref("");
const category = ref("all");
const sortType = ref("default");
const selectedProject = ref(null);

const categories = computed(() => {
  return [...new Set(projects.map((project) => project.category))];
});

const filteredProjects = computed(() => {
  const searchText = search.value.toLowerCase().trim();

  const result = projects.filter((project) => {
    const matchesCategory =
      category.value === "all" || project.category === category.value;

    const fullText = `
      ${project.title}
      ${project.shortText}
      ${project.details}
      ${project.category}
      ${project.level}
      ${project.tags.join(" ")}
    `.toLowerCase();

    const matchesSearch = !searchText || fullText.includes(searchText);

    return matchesCategory && matchesSearch;
  });

  return [...result].sort((a, b) => {
    if (sortType.value === "title-asc") {
      return a.title.localeCompare(b.title);
    }

    if (sortType.value === "title-desc") {
      return b.title.localeCompare(a.title);
    }

    if (sortType.value === "year-desc") {
      return b.year - a.year;
    }

    if (sortType.value === "year-asc") {
      return a.year - b.year;
    }

    return projects.indexOf(a) - projects.indexOf(b);
  });
});

function selectProject(project) {
  selectedProject.value = project;
}

function resetFilters() {
  search.value = "";
  category.value = "all";
  sortType.value = "default";
  selectedProject.value = null;
}
</script>