<script setup lang="ts">
import KrdsMasthead from './components/krds/Masthead.vue'
import KrdsButton from './krds/components/KrdsButton/KrdsButton.vue'

const handleClick = () => {
  console.log('Button clicked')
}
</script>

<template>
  <krds-masthead />
  <krds-button variant="secondary" @click="handleClick" :loading="true">Button</krds-button>
</template>

<style scoped></style>
