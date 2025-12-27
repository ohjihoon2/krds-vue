<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
import type { KrdsIconProps } from '../types'

const props = withDefaults(defineProps<KrdsIconProps>(), {
  size: 'medium',
  ariaHidden: true,
})

const iconModules = import.meta.glob('./svg/*.svg', { eager: false })

const iconComponent = computed(() => {
  const path = `./svg/${props.name}.svg`
  if (iconModules[path]) {
    return defineAsyncComponent(() => iconModules[path]() as Promise<{ default: any }>)
  }
  return null
})

const sizeClass = computed(() => `krds-icon--${props.size}`)

const iconStyle = computed(() => {
  if (props.color) {
    return { '--krds-icon-color': props.color }
  }
  return undefined
})
</script>

<template>
  <span
    class="krds-icon"
    :class="sizeClass"
    :style="iconStyle"
    :aria-label="ariaLabel"
    :aria-hidden="ariaHidden && !ariaLabel"
    role="img"
  >
    <component :is="iconComponent" v-if="iconComponent" />
  </span>
</template>

<style scoped lang="scss">
.krds-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  :deep(svg) {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }
}

.krds-icon--xsmall {
  width: var(--krds-icon--size-xsmall, 1.2rem);
  height: var(--krds-icon--size-xsmall, 1.2rem);
}

.krds-icon--small {
  width: var(--krds-icon--size-small, 1.6rem);
  height: var(--krds-icon--size-small, 1.6rem);
}

.krds-icon--medium {
  width: var(--krds-icon--size-medium, 2rem);
  height: var(--krds-icon--size-medium, 2rem);
}

.krds-icon--large {
  width: var(--krds-icon--size-large, 2.4rem);
  height: var(--krds-icon--size-large, 2.4rem);
}

.krds-icon--xlarge {
  width: var(--krds-icon--size-xlarge, 3.2rem);
  height: var(--krds-icon--size-xlarge, 3.2rem);
}
</style>
