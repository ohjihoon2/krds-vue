<script setup lang="ts">
import { computed, ref } from 'vue'
import type { KrdsInputProps, ValidationState } from '../../types'

const props = withDefaults(defineProps<KrdsInputProps>(), {
  type: 'text',
  size: 'large',
  disabled: false,
  readonly: false,
  state: 'default',
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  input: [event: Event]
}>()

const inputRef = ref<HTMLInputElement | null>(null)
const isFocused = ref(false)

const inputValue = computed({
  get: () => props.modelValue ?? '',
  set: (value: string | number) => emit('update:modelValue', value),
})

const sizeClass = computed(() => props.size)

const wrapperClasses = computed(() => ({
  'form-conts': true,
  'is-error': props.state === 'error',
  'is-success': props.state === 'success',
  'is-information': props.state === 'information',
}))

const inputClasses = computed(() => [
  'krds-input',
  sizeClass.value,
  { focus: isFocused.value },
])

const hintClass = computed(() => {
  const stateMap: Record<ValidationState, string> = {
    default: 'form-hint',
    error: 'form-hint-invalid',
    success: 'form-hint-success',
    information: 'form-hint-information',
  }
  return stateMap[props.state]
})

const hintMessage = computed(() => {
  if (props.state === 'error' && props.errorMessage) {
    return props.errorMessage
  }
  if (props.state === 'success' && props.successMessage) {
    return props.successMessage
  }
  return props.hint
})

const handleFocus = (event: FocusEvent) => {
  isFocused.value = true
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  isFocused.value = false
  emit('blur', event)
}

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  inputValue.value = target.value
  emit('input', event)
}

const focus = () => {
  inputRef.value?.focus()
}

const blur = () => {
  inputRef.value?.blur()
}

defineExpose({
  focus,
  blur,
  inputRef,
})
</script>

<template>
  <div class="krds-input-wrapper">
    <div v-if="label" class="form-tit">
      <label :for="$attrs.id as string">{{ label }}</label>
    </div>
    <div :class="wrapperClasses">
      <input
        ref="inputRef"
        v-bind="$attrs"
        :type="type"
        :class="inputClasses"
        :value="inputValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        @focus="handleFocus"
        @blur="handleBlur"
        @input="handleInput"
      />
    </div>
    <p v-if="hintMessage" :class="hintClass">{{ hintMessage }}</p>
  </div>
</template>

<style scoped lang="scss">
@mixin size-medium {
  @media (max-width: 767px) {
    @content;
  }
}

@mixin flex-layout($d: flex, $ai: stretch, $jc: flex-start, $fd: row) {
  display: $d;
  align-items: $ai;
  justify-content: $jc;
  flex-direction: $fd;
}

@mixin input-size($unit) {
  height: var(--krds-input--size-height-#{$unit});
  border-radius: var(--krds-input--radius-#{$unit});
  font-size: var(--krds-input--pc-font-size-#{$unit});

  @if ($unit == 'xlarge') {
    font-weight: var(--krds-font-weight-bold, 700);
  }

  @include size-medium {
    font-size: var(--krds-input--mobile-font-size-#{$unit});
  }
}

.krds-input-wrapper {
  @include flex-layout($fd: column);
  gap: var(--krds-gap-2, 0.8rem);
  width: 100%;
}

.form-tit {
  label {
    font-size: var(--krds-pc-font-size-label-medium, 1.4rem);
    font-weight: var(--krds-font-weight-regular, 400);
    color: var(--krds-light-color-text-basic, #171717);

    @include size-medium {
      font-size: var(--krds-mobile-font-size-label-medium, 1.4rem);
    }
  }
}

.form-conts {
  width: 100%;
}

.krds-input {
  // Size CSS variables
  --krds-input--size-height-small: var(--krds-size-height-6, 3.2rem);
  --krds-input--radius-small: var(--krds-radius-medium1, 0.6rem);
  --krds-input--pc-font-size-small: var(--krds-pc-font-size-label-small, 1.2rem);
  --krds-input--mobile-font-size-small: var(--krds-mobile-font-size-label-small, 1.2rem);

  --krds-input--size-height-medium: var(--krds-size-height-7, 4rem);
  --krds-input--radius-medium: var(--krds-radius-medium2, 0.8rem);
  --krds-input--pc-font-size-medium: var(--krds-pc-font-size-label-medium, 1.4rem);
  --krds-input--mobile-font-size-medium: var(--krds-mobile-font-size-label-medium, 1.4rem);

  --krds-input--size-height-large: var(--krds-size-height-8, 4.8rem);
  --krds-input--radius-large: var(--krds-radius-medium3, 1rem);
  --krds-input--pc-font-size-large: var(--krds-pc-font-size-label-large, 1.6rem);
  --krds-input--mobile-font-size-large: var(--krds-mobile-font-size-label-large, 1.6rem);

  --krds-input--size-height-xlarge: var(--krds-size-height-11, 8rem);
  --krds-input--radius-xlarge: var(--krds-radius-large2, 1.6rem);
  --krds-input--pc-font-size-xlarge: var(--krds-pc-font-size-heading-medium, 2rem);
  --krds-input--mobile-font-size-xlarge: var(--krds-mobile-font-size-heading-medium, 2rem);

  --krds-input--padding-x: var(--krds-padding-6, 1.6rem);

  // Color CSS variables
  --krds-input--color-surface: var(--krds-light-color-input-surface, #ffffff);
  --krds-input--color-surface-readonly: var(--krds-light-color-input-surface-disabled, #f5f5f5);
  --krds-input--color-surface-disabled: var(--krds-light-color-input-surface-disabled, #f5f5f5);
  --krds-input--color-surface-error: var(--krds-light-color-input-surface, #ffffff);
  --krds-input--color-border: var(--krds-light-color-input-border, #d4d4d4);
  --krds-input--color-border-active: var(--krds-light-color-input-border-active, #0052cc);
  --krds-input--color-border-readonly: var(--krds-light-color-input-border-disabled, #e5e5e5);
  --krds-input--color-border-disabled: var(--krds-light-color-input-border-disabled, #e5e5e5);
  --krds-input--color-border-error: var(--krds-light-color-input-border-error, #dc2626);
  --krds-input--color-text: var(--krds-light-color-text-subtle, #525252);
  --krds-input--color-text-active: var(--krds-light-color-text-basic, #171717);
  --krds-input--color-text-readonly: var(--krds-light-color-text-subtle, #525252);
  --krds-input--color-text-disabled: var(--krds-light-color-text-disabled-on, #a3a3a3);
  --krds-input--color-text-placeholder: var(--krds-light-color-text-disabled, #a3a3a3);

  // Base styles
  @include input-size(large);

  position: relative;
  width: 100%;
  padding: 0 var(--krds-input--padding-x);
  background-color: var(--krds-input--color-surface);
  border: 0.1rem solid var(--krds-input--color-border);
  font-family: inherit;
  color: var(--krds-input--color-text);
  transition: border-color 0.2s ease, background-color 0.2s ease;

  &::placeholder {
    color: var(--krds-input--color-text-placeholder);
  }

  &:focus,
  &.focus {
    border-color: var(--krds-input--color-border-active);
    border-width: 2px;
    outline: none;
    box-shadow: none;
    color: var(--krds-input--color-text-active);
  }

  &[readonly] {
    background-color: var(--krds-input--color-surface-readonly);
    border-color: var(--krds-input--color-border-readonly);
    color: var(--krds-input--color-text-readonly);

    &:focus {
      border-color: var(--krds-input--color-border-active);
    }
  }

  &[disabled] {
    background-color: var(--krds-input--color-surface-disabled);
    border-color: var(--krds-input--color-border-disabled);
    color: var(--krds-input--color-text-disabled);
    cursor: not-allowed;
  }

  // Size variants
  &.small {
    @include input-size(small);
  }

  &.medium {
    @include input-size(medium);
  }

  &.large {
    @include input-size(large);
  }

  &.xlarge {
    @include input-size(xlarge);
  }
}

// Error state
.is-error {
  .krds-input {
    background-color: var(--krds-input--color-surface-error);
    border-color: var(--krds-input--color-border-error);
    border-width: 2px;

    &:focus {
      border-color: var(--krds-input--color-border-active);
    }
  }
}

// Hint messages
.form-hint,
.form-hint-invalid,
.form-hint-success,
.form-hint-information {
  display: flex;
  align-items: center;
  gap: var(--krds-gap-1, 0.4rem);
  font-size: var(--krds-pc-font-size-body-small, 1.2rem);

  @include size-medium {
    font-size: var(--krds-mobile-font-size-body-small, 1.2rem);
  }
}

.form-hint {
  color: var(--krds-light-color-text-subtle, #525252);
}

.form-hint-invalid {
  color: var(--krds-light-color-text-danger, #dc2626);
}

.form-hint-success {
  color: var(--krds-light-color-text-success, #16a34a);
}

.form-hint-information {
  color: var(--krds-light-color-text-information, #0052cc);
}
</style>
