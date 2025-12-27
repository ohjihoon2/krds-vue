// KRDS Vue Component Library

// Components
export * from './components'

// Icons
export * from './icons'

// Composables
export * from './composables'

// Types
export * from './types'

// Plugin
import type { App } from 'vue'
import { KrdsButton } from './components/KrdsButton'
import { KrdsInput } from './components/KrdsInput'
import { KrdsIcon } from './icons'

export const KrdsPlugin = {
  install(app: App) {
    // Register components globally
    app.component('KrdsButton', KrdsButton)
    app.component('KrdsInput', KrdsInput)
    app.component('KrdsIcon', KrdsIcon)
  },
}

export default KrdsPlugin
