import { onMounted, onBeforeUnmount } from 'vue'

export function useEscapeKey(callback: () => void, enabled: () => boolean = () => true) {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && enabled()) {
      callback()
    }
  }

  onMounted(() => {
    document.addEventListener('keydown', handleKeyDown)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('keydown', handleKeyDown)
  })
}
