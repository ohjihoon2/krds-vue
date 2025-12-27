import { ref, onMounted, onBeforeUnmount, type Ref } from 'vue'

const FOCUSABLE_SELECTORS = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

export function useFocusTrap(containerRef: Ref<HTMLElement | null>) {
  const isActive = ref(false)
  let previousActiveElement: HTMLElement | null = null

  const getFocusableElements = (): HTMLElement[] => {
    if (!containerRef.value) return []
    return Array.from(containerRef.value.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS))
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (!isActive.value || event.key !== 'Tab') return

    const focusableElements = getFocusableElements()
    if (focusableElements.length === 0) return

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    if (event.shiftKey) {
      if (document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      }
    } else {
      if (document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }
  }

  const activate = () => {
    if (isActive.value) return

    previousActiveElement = document.activeElement as HTMLElement
    isActive.value = true

    const focusableElements = getFocusableElements()
    if (focusableElements.length > 0) {
      focusableElements[0].focus()
    }

    document.addEventListener('keydown', handleKeyDown)
  }

  const deactivate = () => {
    if (!isActive.value) return

    isActive.value = false
    document.removeEventListener('keydown', handleKeyDown)

    if (previousActiveElement) {
      previousActiveElement.focus()
      previousActiveElement = null
    }
  }

  onBeforeUnmount(() => {
    deactivate()
  })

  return {
    isActive,
    activate,
    deactivate,
  }
}
