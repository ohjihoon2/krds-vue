<script setup lang="ts">
import { computed } from 'vue'
import type { KrdsButtonProps } from '../../types'
import { KrdsIcon } from '../../icons'

const props = withDefaults(defineProps<KrdsButtonProps>(), {
  variant: 'primary',
  size: 'large',
  type: 'button',
  disabled: false,
  loading: false,
  iconOnly: false,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const isLink = computed(() => !!props.href)

const componentTag = computed(() => (isLink.value ? 'a' : 'button'))

const classes = computed(() => [
  'krds-btn',
  props.size,
  props.variant,
  {
    icon: props.iconOnly,
    disabled: props.disabled || props.loading,
  },
])

const attrs = computed(() => {
  if (isLink.value) {
    return {
      href: props.disabled ? undefined : props.href,
      target: props.target,
      rel: props.target === '_blank' ? 'noopener noreferrer' : undefined,
    }
  }
  return {
    type: props.type,
    disabled: props.disabled || props.loading,
  }
})

const handleClick = (event: MouseEvent) => {
  if (props.disabled || props.loading) {
    event.preventDefault()
    return
  }
  emit('click', event)
}
</script>

<template>
  <component
    :is="componentTag"
    :class="classes"
    v-bind="attrs"
    @click="handleClick"
  >
    <template v-if="loading">
      <span class="krds-btn__loading">
        <KrdsIcon name="ico_spinner" :size="size === 'xsmall' || size === 'small' ? 'small' : 'medium'" />
      </span>
    </template>
    <template v-else>
      <KrdsIcon v-if="icon" :name="icon" class="svg-icon" />
      <slot />
    </template>
  </component>
</template>

<style scoped lang="scss">
// Mixins
@mixin flex-layout($d: flex, $ai: stretch, $jc: flex-start) {
  display: $d;
  align-items: $ai;
  justify-content: $jc;
}

@mixin square($size) {
  width: $size;
  height: $size;
}

@mixin size-medium {
  @media (max-width: 767px) {
    @content;
  }
}

// Button size mixin
@mixin btn-size($size) {
  height: var(--krds-button--size-height-#{$size});
  padding: var(--krds-button--padding-y-#{$size}) var(--krds-button--padding-x-#{$size});
  gap: var(--krds-button--gap-#{$size});
  border-radius: var(--krds-button--radius-#{$size});
  font-size: var(--krds-button--pc-font-size-#{$size});
  font-weight: var(--krds-button--font-weight-#{$size});

  @include size-medium {
    font-size: var(--krds-button--mobile-font-size-#{$size});
  }
}

// Button color mixins
@mixin btn-color($color) {
  background-color: var(--krds-button--color-#{$color}-fill);
  border-color: var(--krds-button--color-#{$color}-border);
  color: var(--krds-button--color-#{$color}-text);
}

@mixin btn-color-hover($color) {
  background-color: var(--krds-button--color-#{$color}-fill-hover);
}

@mixin btn-color-pressed($color) {
  background-color: var(--krds-button--color-#{$color}-fill-pressed);
}

@mixin btn-color-disabled($color) {
  background-color: var(--krds-button--color-#{$color}-fill-disabled);
  border-color: var(--krds-button--color-#{$color}-border-disabled);
  color: var(--krds-button--color-#{$color}-text-disabled);
}

// Size variables
$button-sizes: xsmall, small, medium, large, xlarge;

// Button styles
.krds-btn {
  // Size CSS variables
  --krds-button--size-height-xsmall: var(--krds-size-height-5, 2.4rem);
  --krds-button--padding-x-xsmall: var(--krds-padding-4, 0.8rem);
  --krds-button--padding-y-xsmall: 0;
  --krds-button--gap-xsmall: var(--krds-gap-1, 0.4rem);
  --krds-button--radius-xsmall: var(--krds-radius-small3, 0.4rem);
  --krds-button--pc-font-size-xsmall: var(--krds-pc-font-size-label-small, 1.2rem);
  --krds-button--mobile-font-size-xsmall: var(--krds-mobile-font-size-label-small, 1.2rem);
  --krds-button--font-weight-xsmall: var(--krds-font-weight-regular, 400);

  --krds-button--size-height-small: var(--krds-size-height-6, 3.2rem);
  --krds-button--padding-x-small: var(--krds-padding-5, 1.2rem);
  --krds-button--padding-y-small: 0;
  --krds-button--gap-small: var(--krds-gap-1, 0.4rem);
  --krds-button--radius-small: var(--krds-radius-medium1, 0.6rem);
  --krds-button--pc-font-size-small: var(--krds-pc-font-size-label-small, 1.2rem);
  --krds-button--mobile-font-size-small: var(--krds-mobile-font-size-label-small, 1.2rem);
  --krds-button--font-weight-small: var(--krds-font-weight-regular, 400);

  --krds-button--size-height-medium: var(--krds-size-height-7, 4rem);
  --krds-button--padding-x-medium: var(--krds-padding-6, 1.6rem);
  --krds-button--padding-y-medium: 0;
  --krds-button--gap-medium: var(--krds-gap-2, 0.8rem);
  --krds-button--radius-medium: var(--krds-radius-medium2, 0.8rem);
  --krds-button--pc-font-size-medium: var(--krds-pc-font-size-label-medium, 1.4rem);
  --krds-button--mobile-font-size-medium: var(--krds-mobile-font-size-label-medium, 1.4rem);
  --krds-button--font-weight-medium: var(--krds-font-weight-regular, 400);

  --krds-button--size-height-large: var(--krds-size-height-8, 4.8rem);
  --krds-button--padding-x-large: var(--krds-padding-7, 2rem);
  --krds-button--padding-y-large: 0;
  --krds-button--gap-large: var(--krds-gap-2, 0.8rem);
  --krds-button--radius-large: var(--krds-radius-medium3, 1rem);
  --krds-button--pc-font-size-large: var(--krds-pc-font-size-label-large, 1.6rem);
  --krds-button--mobile-font-size-large: var(--krds-mobile-font-size-label-large, 1.6rem);
  --krds-button--font-weight-large: var(--krds-font-weight-regular, 400);

  --krds-button--size-height-xlarge: var(--krds-size-height-9, 5.6rem);
  --krds-button--padding-x-xlarge: var(--krds-padding-8, 2.4rem);
  --krds-button--padding-y-xlarge: 0;
  --krds-button--gap-xlarge: var(--krds-gap-2, 0.8rem);
  --krds-button--radius-xlarge: var(--krds-radius-medium4, 1.2rem);
  --krds-button--pc-font-size-xlarge: var(--krds-pc-font-size-label-large, 1.6rem);
  --krds-button--mobile-font-size-xlarge: var(--krds-mobile-font-size-label-large, 1.6rem);
  --krds-button--font-weight-xlarge: var(--krds-font-weight-regular, 400);

  // Color CSS variables (light mode)
  --krds-button--color-primary-fill: var(--krds-light-color-button-primary-fill, #0052cc);
  --krds-button--color-primary-fill-hover: var(--krds-light-color-button-primary-fill-hover, #0047b3);
  --krds-button--color-primary-fill-pressed: var(--krds-light-color-button-primary-fill-pressed, #003d99);
  --krds-button--color-primary-fill-disabled: var(--krds-light-color-button-disabled-fill, #f4f4f4);
  --krds-button--color-primary-border: var(--krds-light-color-button-primary-fill, #0052cc);
  --krds-button--color-primary-border-disabled: var(--krds-light-color-button-disabled-border, #d4d4d4);
  --krds-button--color-primary-text: var(--krds-light-color-text-inverse-static, #ffffff);
  --krds-button--color-primary-text-disabled: var(--krds-light-color-text-disabled-on, #a3a3a3);

  --krds-button--color-secondary-fill: var(--krds-light-color-button-secondary-fill, #ffffff);
  --krds-button--color-secondary-fill-hover: var(--krds-light-color-button-secondary-fill-hover, #f5f5f5);
  --krds-button--color-secondary-fill-pressed: var(--krds-light-color-button-secondary-fill-pressed, #ebebeb);
  --krds-button--color-secondary-fill-disabled: var(--krds-light-color-button-disabled-fill, #f4f4f4);
  --krds-button--color-secondary-border: var(--krds-light-color-button-secondary-border, #0052cc);
  --krds-button--color-secondary-border-disabled: var(--krds-light-color-button-disabled-border, #d4d4d4);
  --krds-button--color-secondary-text: var(--krds-light-color-text-primary, #0052cc);
  --krds-button--color-secondary-text-disabled: var(--krds-light-color-text-disabled-on, #a3a3a3);

  --krds-button--color-tertiary-fill: var(--krds-light-color-button-tertiary-fill, #ffffff);
  --krds-button--color-tertiary-fill-hover: var(--krds-light-color-button-tertiary-fill-hover, #f5f5f5);
  --krds-button--color-tertiary-fill-pressed: var(--krds-light-color-button-tertiary-fill-pressed, #ebebeb);
  --krds-button--color-tertiary-fill-disabled: var(--krds-light-color-button-disabled-fill, #f4f4f4);
  --krds-button--color-tertiary-border: var(--krds-light-color-button-tertiary-border, #d4d4d4);
  --krds-button--color-tertiary-border-disabled: var(--krds-light-color-button-disabled-border, #d4d4d4);
  --krds-button--color-tertiary-text: var(--krds-light-color-text-basic, #171717);
  --krds-button--color-tertiary-text-disabled: var(--krds-light-color-text-disabled-on, #a3a3a3);

  // Base styles
  @include flex-layout($d: inline-flex, $ai: center, $jc: center);
  @include btn-size(large);
  @include btn-color(primary);

  width: auto;
  border-style: solid;
  border-width: 0.1rem;
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
  text-decoration: none;
  font-family: inherit;

  &:hover {
    @include btn-color-hover(primary);
  }

  &:active,
  &:focus {
    @include btn-color-pressed(primary);
  }

  &[disabled],
  &.disabled {
    @include btn-color-disabled(primary);
    cursor: not-allowed;
    pointer-events: none;
  }

  // Size variants
  @each $size in $button-sizes {
    &.#{$size} {
      @include btn-size($size);
    }
  }

  // Color variants
  &.secondary {
    @include btn-color(secondary);

    &:hover {
      @include btn-color-hover(secondary);
    }

    &:active,
    &:focus {
      @include btn-color-pressed(secondary);
    }

    &[disabled],
    &.disabled {
      @include btn-color-disabled(secondary);
    }
  }

  &.tertiary {
    @include btn-color(tertiary);

    &:hover {
      @include btn-color-hover(tertiary);
    }

    &:active,
    &:focus {
      @include btn-color-pressed(tertiary);
    }

    &[disabled],
    &.disabled {
      @include btn-color-disabled(tertiary);
    }
  }

  // Icon only button
  &.icon {
    --krds-button--icon-size-xsmall: var(--krds-size-height-2, 1.6rem);
    --krds-button--icon-size-small: var(--krds-size-height-3, 2rem);
    --krds-button--icon-size-medium: var(--krds-size-height-4, 2.4rem);
    --krds-button--icon-size-large: var(--krds-size-height-5, 3.2rem);
    --krds-button--icon-size-xlarge: var(--krds-size-height-6, 4rem);

    @include square(var(--krds-button--icon-size-medium));
    padding: 0;
    background-color: transparent;
    border: none;

    &:hover,
    &:active {
      background-color: transparent;
    }

    @each $size in $button-sizes {
      &.#{$size} {
        @include square(var(--krds-button--icon-size-#{$size}));
      }
    }
  }

  // Loading state
  &__loading {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    animation: spin 1s linear infinite;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

// Icon inside button
.svg-icon {
  flex-shrink: 0;
}
</style>
