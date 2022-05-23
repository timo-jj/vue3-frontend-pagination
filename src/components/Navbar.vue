<template>
  <nav class="nav">
    <router-link to="/">
      <img
        alt="konnect logo"
        :src="icons.logo"
      >
    </router-link>

    <div class="nav__controls">
      <button>
        <img
          alt="notification icon"
          :src="icons.notification"
        >
      </button>

      <button>
        <img
          alt="help icon"
          :src="icons.help"
        >
      </button>

      <div class="nav__avatar">
        <img
          alt="user avatar"
          src="http://placekitten.com/300/300"
        >
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
// Assets
import SvgBrand from '@/assets/brand.svg'
import SvgNotification from '@/assets/notification.svg'
import SvgHelp from '@/assets/help.svg'

// Data
const icons = reactive({
  help: SvgHelp,
  logo: SvgBrand,
  notification: SvgNotification,
})
</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 25px;
  border-bottom: 1px solid #E5E5E5;
  transition: all 0.2s ease;

  @media all and (max-width: 980px) {
    padding: 14px 10px;
  }

  &__controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 120px;

    button {
      background: transparent;
      border: 0;
      outline: 0;
      cursor: pointer;
      padding: 0;
    }
  }

  &__avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
