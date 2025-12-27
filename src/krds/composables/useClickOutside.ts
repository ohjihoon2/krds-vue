import { onMounted, onBeforeUnmount, type Ref } from 'vue'

export function useClickOutside(
  elementRef: Ref<HTMLElement | null>,
  callback: (event: MouseEvent) => void
) {
  const handleClick = (event: MouseEvent) => {
    if (!elementRef.value) return

    const target = event.target as Node
    if (!elementRef.value.contains(target)) {
      callback(event)
    }
  }

  onMounted(() => {
    document.addEventListener('click', handleClick, true)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('click', handleClick, true)
  })
}
