<template>
  <section class="hero compact-hero">
    <div class="hero-text">
      <p class="eyebrow">Contact info</p>
      <h1>Contacts</h1>
      <p class="hero-description">
        Here you can find my main contact links and send a message for studying,
        projects or communication.
      </p>
    </div>

    <img
      class="hero-photo"
      src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=700&q=80"
      alt="Laptop with an open contact form"
      width="520"
      height="360"
    />
  </section>

  <section class="section" aria-labelledby="contacts-title">
    <div class="section-heading">
      <p class="section-label">All contacts</p>
      <h2 id="contacts-title">Contact details</h2>
    </div>

    <div class="cards-grid two-columns">
      <article class="card contact-card">
        <h3>Main links</h3>

        <address>
          <p>
            <strong>Email:</strong>
            <a href="mailto:t.korol.zk41.fbmi28@lll.kpi.ua">
              t.korol.zk41.fbmi28@lll.kpi.ua
            </a>
          </p>

          <p>
            <strong>GitHub:</strong>
            <a
              href="https://github.com/UnstableMaoLi"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/UnstableMaoLi
            </a>
          </p>

          <p>
            <strong>LinkedIn:</strong>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              linkedin.com
            </a>
          </p>

          <p>
            <strong>Telegram:</strong>
            <a
              href="https://t.me/qmao_li"
              target="_blank"
              rel="noopener noreferrer"
            >
              @qmao_li
            </a>
          </p>
        </address>
      </article>

      <article class="card contact-card">
        <h3>Message topics</h3>
        <p>You can contact me about:</p>

        <ul>
          <li>study tasks and university projects;</li>
          <li>portfolio improvement;</li>
          <li>creative writing and storytelling;</li>
          <li>basic HTML/CSS/Vue practice.</li>
        </ul>

        <a class="button" href="mailto:t.korol.zk41.fbmi28@lll.kpi.ua">
          Send email
        </a>
      </article>
    </div>
  </section>

  <section class="section">
    <div class="section-heading">
      <p class="section-label">Reactive form</p>
      <h2>Message form</h2>
    </div>

    <div class="cards-grid two-columns">
      <form class="card contact-form" @submit.prevent="submitForm">
        <label>
          Your name
          <input v-model="form.name" type="text" placeholder="Enter your name" />
        </label>

        <label>
          Email
          <input v-model="form.email" type="email" placeholder="email@example.com" />
        </label>

        <label>
          Topic
          <select v-model="form.topic">
            <option value="">Choose topic</option>
            <option value="Study task">Study task</option>
            <option value="Portfolio">Portfolio</option>
            <option value="Creative writing">Creative writing</option>
            <option value="Other">Other</option>
          </select>
        </label>

        <label>
          Message
          <textarea
            v-model="form.message"
            rows="6"
            placeholder="Write your message..."
          ></textarea>
        </label>

        <p v-if="errorMessage" class="form-error">
          {{ errorMessage }}
        </p>

        <button class="button" type="submit">
          Create preview
        </button>
      </form>

      <article class="card preview-card">
        <p class="section-label">Live preview</p>
        <h3>{{ previewTitle }}</h3>

        <p><strong>Name:</strong> {{ form.name || "Your name" }}</p>
        <p><strong>Email:</strong> {{ form.email || "email@example.com" }}</p>
        <p><strong>Topic:</strong> {{ form.topic || "not selected" }}</p>
        <p>{{ form.message || "Your message will appear here." }}</p>
      </article>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref, computed } from "vue";

const form = reactive({
  name: "",
  email: "",
  topic: "",
  message: ""
});

const submitted = ref(false);
const errorMessage = ref("");

const previewTitle = computed(() => {
  return submitted.value ? "Ready message" : "Message preview";
});

function submitForm() {
  if (form.name.trim().length < 2) {
    errorMessage.value = "Name must contain at least 2 characters.";
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errorMessage.value = "Enter a valid email address.";
    return;
  }

  if (!form.topic) {
    errorMessage.value = "Choose a message topic.";
    return;
  }

  if (form.message.trim().length < 10) {
    errorMessage.value = "Message must contain at least 10 characters.";
    return;
  }

  errorMessage.value = "";
  submitted.value = true;
}
</script>