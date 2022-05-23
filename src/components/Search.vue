<template>
  <div class="search">
    <img
      alt="search icon"
      :src="state.searchIcon"
    >
    <input
      pattern="^[a-zA-Z0-9]+$"
      placeholder="Search"
      type="text"
      :value="props.value"
      @input="search"
      @keypress="keypress"
    >
  </div>
</template>

<script lang="ts" setup>
import {
  defineEmits,
  defineProps,
  reactive,
} from 'vue'
// Assets
import SvgSearch from '@/assets/search.svg'

// Props
const props = defineProps({
  value: {
    type: String,
    default: null,
  },
})

// Emits
const emits = defineEmits([
  'search',
])

// Data
const state = reactive({
  searchIcon: SvgSearch,
})

// Methods
const keypress = (e) => {
  const regex = new RegExp('^[a-zA-Z0-9]+$')
  const key = String.fromCharCode(!e.charCode ? e.which : e.charCode)
  if (!regex.test(key)) {
    e.preventDefault()
  }
}
const search = (e) => {
  emits('search', e.target.value)
}
</script>

<style lang="scss" scoped>
.search {
  margin-bottom: 24px;
  display: inline-flex;
  align-items: center;
  background: #FFFFFF;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  padding: 10px 12px;
  width: 216px;

  img {
    max-width: 14px;
    min-width: 14px;
    max-height: 14px;
    min-height: 14px;
    margin-right: 12px;
  }

  input {
    border: 0;
    outline: 0;
    font-weight: 300;
    font-size: 16px;
    line-height: 19px;
    height: 19px;

    &::placeholder {
      color: rgba(0, 0, 0, 0.45);
    }
  }
}
</style>
