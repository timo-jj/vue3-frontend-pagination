<template>
  <section class="pagination">
    <button @click="onPrevious">
      <img
        alt="left arrow"
        :src="arrowIcon"
      >
    </button>

    <span>{{ props.count }} of {{ props.total }}</span>

    <button @click="onNext">
      <img
        alt="right arrow"
        :src="arrowIcon"
      >
    </button>
  </section>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref } from 'vue'
// Assets
import SvgArrow from '@/assets/arrow.svg'

// Props
const props = defineProps({
  total: {
    type: Number,
    default: null,
  },
  count: {
    type: String,
    default: null,
  },
})

// Emits
const emits = defineEmits([
  'previous',
  'next',
])

// Data
const arrowIcon = ref(SvgArrow)

// Methods
const onPrevious = () => {
  emits('previous')
}
const onNext = () => {
  emits('next')
}
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 255px;
  margin: 48px auto 0;

  button {
    background: transparent;
    border: 0;
    outline: 0;
    cursor: pointer;
    padding: 0;
    border-radius: 50%;
    width: 45px;
    height: 45px;

    &:first-child {
      img {
        transform: rotateZ(180deg)
      }
    }
  }

  span {
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: rgba(0, 0, 0, 0.45);
    mix-blend-mode: normal;
    opacity: 0.7;
  }
}
</style>
