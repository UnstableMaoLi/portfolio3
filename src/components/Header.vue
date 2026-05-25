<template>
  <header class="site-header">
    <nav class="navbar" aria-label="Головна навігація">
      <router-link class="logo" to="/" @click="closeMenu">Tamara Korol</router-link>

      <button
        class="menu-toggle"
        type="button"
        aria-controls="main-navigation"
        :aria-expanded="isMenuOpen.toString()"
        @click="toggleMenu"
      >
        <span class="menu-icon" aria-hidden="true">{{ isMenuOpen ? "×" : "☰" }}</span>
        {{ isMenuOpen ? "Close menu" : "Menu" }}
      </button>

      <div
        id="main-navigation"
        class="nav-panel"
        :class="{ 'nav-panel-open': isMenuOpen }"
      >
        <ul class="nav-list">
          <li>
            <router-link to="/" @click="closeMenu">Main page</router-link>
          </li>
          <li>
            <router-link to="/projects" @click="closeMenu">Projects</router-link>
          </li>
          <li>
            <router-link to="/contacts" @click="closeMenu">Contacts</router-link>
          </li>
        </ul>

        <button class="theme-button" type="button" @click="changeTheme">
          {{ isDarkTheme ? "Light theme" : "Dark theme" }}
        </button>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  isDarkTheme: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(["toggle-theme"]);

const isMenuOpen = ref(false);

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

function closeMenu() {
  isMenuOpen.value = false;
}

function changeTheme() {
  emit("toggle-theme");
}
</script>
