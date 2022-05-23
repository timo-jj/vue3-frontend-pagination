<template>
  <main class="service">
    <!-- Link -->
    <router-link
      class="service__link"
      to="/"
    >
      Back
    </router-link>

    <!-- Header -->
    <div class="service__header">
      <h1>{{ state.service.name }}</h1>

      <div class="service__state">
        <div
          :class="[
            'dot',
            {
              'dot--disabled': !state.service.enabled
            }
          ]"
        />
        <span>{{ state.service.enabled ? 'enabled' : 'disabled' }}</span>
      </div>
    </div>

    <!-- Description -->
    <p
      v-if="state.service.description"
      class="service__description"
    >
      {{ state.service.description }}
    </p>

    <!-- Versions -->
    <section class="service__versions">
      <span><span>Versions count:</span> {{ state.service.versions.length }}</span>

      <!-- Versions List -->
      <div
        v-if="state.service.versions && state.service.versions.length > 0"
        class="service__list"
      >
        <div
          v-for="{id, name, description} in state.service.versions"
          :key="id"
          class="service__version"
        >
          <h3>{{ name }}</h3>
          <p>{{ description }}</p>
        </div>
      </div>
    </section>
  </main>
</template>

<script lang="ts" setup>
import {
  onBeforeMount,
  computed,
  reactive,
} from 'vue'
// Store
import { useServicesStore } from '@/stores/services'
// Router
import { useRoute } from 'vue-router'
// Types
import Service from '../types/service'

const $store = useServicesStore()
const $route = useRoute()

// Computed
const storedServices = computed(() => $store.stored)

// Data
const state = reactive({
  service: {} as Service,
  param: $route.params.id,
})

// Lifecycle
onBeforeMount(() => {
  state.service = storedServices.value.find(item => item.id === state.param)
})
</script>

<style lang="scss" scoped>
.service {
  padding: 62px 0;
  max-width: 950px;
  margin: 0 auto;
  transition: all 0.2s ease;

  @media all and (max-width: 980px) {
    padding: 40px 10px;
  }

  &__link {
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    text-decoration: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    width: 100%;
    display: block;
    padding-bottom: 12px;
  }

  &__description {
    margin: 40px 0;
    font-size: 16px;
    line-height: 24px;
    font-weight: 300;
  }

  &__state {
    display: flex;
    align-items: center;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    padding: 8px 12px;
    margin-left: 20px;

    .dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: lightgreen;
      margin-right: 8px;

      &--disabled {
        background: red;
      }
    }

    span {
      color:rgba(0, 0, 0, 0.45);
      font-weight: 300;
      font-size: 14px;
      line-height: 14px;
    }
  }

  &__header {
    display: flex;
    align-items: center;
    margin: 24px 0 0;

    h1 {
      font-weight: 500;
      font-size: 24px;
      line-height: 28px;
      margin: 0;
      color: #0A2B66;
    }
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin-top: 24px;
    transition: all 0.2s ease;

    @media all and (max-width: 767px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
    }
  }

  &__versions {
    span {
      font-size: 14px;
      line-height: 16px;
      color:#587cb9;
      font-weight: 500;

      span {
        color:rgba(0, 0, 0, 0.45);
        font-style: italic;
        font-weight: 300;
      }
    }
  }

  &__version {
    background: #FFFFFF;
    padding: 16px 14px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 5px;

    h3,
    p {
      white-space: normal;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
      -webkit-line-clamp: 1;
    }

    h3 {
      margin: 0 0 10px;
      font-size: 16px;
      line-height: 18px;
      color:#587cb9;
      font-weight: 400;
    }

    p {
      margin: 0;
      font-size: 14px;
      line-height: 16px;
      font-weight: 300;
      text-transform: capitalize;
    }
  }
}
</style>
