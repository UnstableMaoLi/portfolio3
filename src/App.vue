<template>
  <div :class="{ 'dark-theme': isDarkTheme }">
    <a class="skip-link" href="#main-content">Skip to content</a>

    <Header
      :is-dark-theme="isDarkTheme"
      @toggle-theme="toggleTheme"
    />

    <main id="main-content">
      <router-view />
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

const isDarkTheme = ref(false);

onMounted(() => {
  const savedTheme = localStorage.getItem("portfolio-theme");
  isDarkTheme.value = savedTheme === "dark";
});

watch(isDarkTheme, (value) => {
  localStorage.setItem("portfolio-theme", value ? "dark" : "light");
});

function toggleTheme() {
  isDarkTheme.value = !isDarkTheme.value;
}
</script>