<template>
  <li class="card">
    <router-link
      :to="{
        name: 'service',
        params: {
          id: card.id,
        },
      }"
    >
      {{ card.name }}
    </router-link>
    <p>{{ card.description }}</p>

    <div class="card__versions">
      <span>{{ card.versions.length }}</span>
      <span>versions</span>
    </div>
  </li>
</template>

<script lang="ts" setup>
import { defineProps, ref } from 'vue'

// Props
const props = defineProps({
  card: {
    type: Object,
    default: null,
  },
})

// Data
const card = ref(props.card)
</script>

<style lang="scss" scoped>
.card {
  overflow: hidden;
  background: #FFFFFF;
  padding: 24px 14px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  a,
  p {
    white-space: normal;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin: 0;
  }

  a {
    font-size: 16px;
    line-height: 18px;
    font-weight: 500;
    color:#1456CB;
    text-decoration: none;
    -webkit-line-clamp: 1;
  }

  p {
    font-size: 14px;
    line-height: 16px;
    font-weight: 400;
    color:rgba(0, 0, 0, 0.45);
     -webkit-line-clamp: 4;
  }

  &__versions {
    display: flex;
    align-items: center;

    span {
      font-weight: 500;
      font-size: 13px;
      line-height: 15px;

      &:first-child {
        color:#1456CB;
        border: 1px solid #D9E7FF;
        border-radius: 40px;
        width: 28px;
        display: block;
        margin-right: 5px;
        text-align: center;
      }

      &:last-child {
        color: rgba(0, 0, 0, 0.7);
        text-transform: capitalize;
      }
    }
  }
}

.v-highlight {
  background: yellow !important;
  color: green
}
</style>
