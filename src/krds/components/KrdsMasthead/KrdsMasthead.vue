<script setup lang="ts">
import { computed } from 'vue'
import type { KrdsMastheadProps } from '@/krds'
import { KrdsIcon } from '../../icons'

const props = withDefaults(defineProps<KrdsMastheadProps>(), {
  mode: 'light',
  text: '이 누리집은 대한민국 공식 전자정부 누리집입니다.'
})

const classes = computed(() => ({
  'high-contrast': props.mode === 'high-contrast',
}))

</script>

<template>
  <!-- masthead -->
  <div id="krds-masthead" :class="classes">
    <div class="toggle-wrap">
      <div class="toggle-head">
        <div class="inner">
          <span class="nuri-txt">
            <KrdsIcon name="ico_flag" size="small" />
            {{text}}
          </span>
        </div>
      </div>
    </div>
  </div>
  <!-- //masthead -->
</template>

<style scoped lang="scss">
// Breakpoint mixins
@mixin size-medium {
  @media (max-width: 767px) {
    @content;
  }
}

@mixin size-large-less {
  @media (max-width: 1023px) {
    @content;
  }
}

@mixin flex-layout($d: flex, $ai: stretch, $jc: flex-start) {
  display: $d;
  align-items: $ai;
  justify-content: $jc;
}

// 사이즈 정의
@mixin masthead-size-variable() {
  --krds-masthead--inner-gap-y: var(--krds-gap-2, 0.8rem);
  --krds-masthead--inner-gap-x: var(--krds-gap-5, 2rem);
  --krds-masthead--inner-min-size-height: var(--krds-size-height-5, 2.4rem);
  --krds-masthead--inner-padding-y: var(--krds-padding-2, 0.8rem);
  --krds-masthead--pc-font-size: var(--krds-pc-font-size-body-small, 1.4rem);
  --krds-masthead--mobile-font-size: var(--krds-mobile-font-size-body-small, 1.4rem);

  //태블릿 & 모바일 전용 속성
  @include size-large-less {
    --krds-masthead--inner-padding-y: 0;
  }
}

//컬러 정의
@mixin masthead-color-variable($mode: light) {
  @if $mode == 'light' {
    --krds-masthead--color-surface: var(--krds-light-color-surface-secondary-subtler, #f4f4f4);
  } @else if $mode == 'high-contrast' {
    --krds-masthead--color-surface: var(--krds-high-contrast-color-surface-secondary-subtler, #171717);
  }
}

#krds-masthead {
  @include masthead-color-variable('light');
  @include masthead-size-variable();

  position: relative;
  z-index: 70;
  background-color: var(--krds-masthead--color-surface);

  &.high-contrast {
    @include masthead-color-variable('high-contrast');
    color: #fff;
  }

  .toggle-head {
    .inner {
      position: relative;
      @include flex-layout($ai: center);
      flex-wrap: wrap;
      gap: var(--krds-masthead--inner-gap-y) var(--krds-masthead--inner-gap-x);
      min-height: var(--krds-masthead--inner-min-size-height);
      padding-top: var(--krds-masthead--inner-padding-y);
      padding-bottom: var(--krds-masthead--inner-padding-y);
    }
    .nuri-txt {
      @include flex-layout($ai: center);
      gap: var(--krds-gap-3, 1.2rem);
      font-size: var(--krds-masthead--pc-font-size);
      word-break: break-all;

      @include size-medium {
        font-size: var(--krds-masthead--mobile-font-size);
      }
    }
  }

  .inner {
    @include flex-layout($ai: center);
    flex-wrap: wrap;
    max-width: var(--krds-grid-container-width, 1280px);
    margin: 0 auto;
    padding-left: var(--krds-grid-gutter, 20px);
    padding-right: var(--krds-grid-gutter, 20px);
  }
}
</style>
