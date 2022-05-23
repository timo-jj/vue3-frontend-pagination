<template>
  <main class="services">
    <!-- Header -->
    <section class="services__header">
      <h1>Services</h1>

      <button>
        Add New Service
      </button>
    </section>

    <!-- Search -->
    <Search
      :value="searchString"
      @search="search($event)"
    />

    <section v-if="!$store.isLoading">
      <!-- Services List  -->
      <ul
        v-if="activeServices && activeServices.length > 0"
        class="services__list"
      >
        <Card
          v-for="item in activeServices"
          :key="item.id"
          :card="item"
        />
      </ul>

      <!-- If Search is empty-->
      <section
        v-else
        class="services__flag"
      >
        <h2>No result found!</h2>
      </section>
    </section>

    <!-- If Loading data in progress-->
    <section
      v-else
      class="services__flag"
    >
      <h2>...Loading</h2>
    </section>

    <!-- Pagination -->
    <Pagination
      :count="currentCount"
      :total="allServices.length"
      @next="goNextPage"
      @previous="goPreviousPage"
    />
  </main>
</template>

<script lang="ts" setup>
import {
  defineAsyncComponent,
  onMounted,
  computed,
} from 'vue'
// Store
import { useServicesStore } from '@/stores/services'
// Types
import Service from '../types/service'

const $store = useServicesStore()

// Comps
const Search = defineAsyncComponent(() => import('../components/Search.vue'))
const Card = defineAsyncComponent(() => import('../components/Card.vue'))
const Pagination = defineAsyncComponent(() => import('../components/Pagination.vue'))

// Computed
const allServices = computed(() => $store.services)
const activeServices = computed(() => $store.activeServices)
const firstActiveIdx = computed<Service>(() => $store.firstActiveIdx)
const lastActiveIdx = computed<Service>(() => $store.lastActiveIdx)
const currentCount = computed(() => {
  let count = '0'
  if (activeServices.value && activeServices.value.length > 0) {
    count = `${firstActiveIdx.value.idx} — ${lastActiveIdx.value.idx}`
  }
  return count
})
const searchString = computed(() => $store.searchString)

// Methods
const goNextPage = () => {
  $store.goNextPage()
}
const goPreviousPage = () => {
  $store.goPreviousPage()
}
const search = (str: string) => {
  $store.search(str)
}

// Lifecycle
onMounted(() => {
  if (searchString.value !== null) {
    $store.search(searchString.value)
  } else {
    $store.getServices()
  }
})
</script>

<style lang="scss" scoped>
.services {
  padding: 62px 0;
  max-width: 950px;
  margin: 0 auto;
  transition: all 0.2s ease;

  @media all and (max-width: 980px) {
    padding: 40px 10px;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;

    h1 {
      font-weight: 500;
      font-size: 24px;
      line-height: 28px;
      margin: 0;
      color: #0A2B66;
    }

    button {
      background: #1456CB;
      border-radius: 3px;
      border: 0;
      outline: 0;
      font-weight: 400;
      font-size: 16px;
      line-height: 19px;
      color: #FFFFFF;
      padding: 8px 12px;
    }
  }

  &__list,
  &__flag {
    display: grid;
  }

  &__list {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 28px;
    padding: 0;
    margin: 0;
    transition: all 0.2s ease;

    @media all and (max-width: 767px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
    }

    @media all and (max-width: 565px) {
      grid-template-columns: 1fr;
    }
  }

  &__flag {
    height: 596px;
    place-content: center;

    @media all and (max-width: 565px) {
      height: 200px;
    }

    h2 {
      font-weight: 300;
      letter-spacing: 2px;
    }
  }
}

// Transitions
/* base */
.services-transition {
  backface-visibility: hidden;
  z-index: 1;

  /* moving */
  &-move {
    transition: all .1s ease-in-out 50ms;
  }

  /* appearing */
  &-enter-active {
    transition: all .1s ease-out;
  }

  /* disappearing */
  &-leave-active {
    transition: all .1s ease-in;
    position: absolute;
    z-index: 0;
  }

  /* appear at / disappear to */
  &-enter,
  &-leave-to {
    opacity: 0;
  }
}
</style>
