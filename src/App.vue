<template>
  <Navbar />

  <router-view v-slot="{ Component }">
    <transition
      mode="out-in"
      name="route-transition"
    >
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script lang="ts" setup>
import { defineAsyncComponent } from 'vue'
const Navbar = defineAsyncComponent(() => import('./components/Navbar.vue'))
</script>

<style lang="scss">
body {
  margin: 0;

  &::-webkit-scrollbar {
    display: none;
  }
}

* {
  font-family: 'Roboto', sans-serif;
  box-sizing: border-box;
}

/* route transitions */
.route-transition {
  backface-visibility: hidden;
  z-index: 1;

  &-enter-from {
    opacity: 0;
    transform: translateX(50px);
  }

  &-enter-active {
    transition: all .1s ease-in-out;
  }

  &-leave-to {
    opacity: 0;
    transform: translateX(50px);
  }

  &-leave-active {
    transition: all .1s ease-in-out;
  }
}
</style>
