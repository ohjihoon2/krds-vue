// KRDS Component Types

/** 버튼 및 입력 필드 사이즈 */
export type SizeVariant = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'

/** 표준 사이즈 (일부 컴포넌트용) */
export type StandardSize = 'small' | 'medium' | 'large'

/** 버튼 계층 */
export type ButtonVariant = 'primary' | 'secondary' | 'tertiary'

/** 버튼 타입 */
export type ButtonType = 'button' | 'submit' | 'reset'

/** 폼 유효성 상태 */
export type ValidationState = 'default' | 'error' | 'success' | 'information'

/** 테마 모드 */
export type ThemeMode = 'light' | 'high-contrast'

// Component Props Interfaces

export interface KrdsButtonProps {
  variant?: ButtonVariant
  size?: SizeVariant
  type?: ButtonType
  disabled?: boolean
  loading?: boolean
  icon?: string
  iconOnly?: boolean
  href?: string
  target?: '_blank' | '_self' | '_parent' | '_top'
}

export interface KrdsInputProps {
  modelValue?: string | number
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url'
  size?: StandardSize | 'xlarge'
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  state?: ValidationState
  label?: string
  hint?: string
  errorMessage?: string
  successMessage?: string
}

export interface KrdsSelectProps {
  modelValue?: string | number | null
  options: KrdsSelectOption[]
  size?: StandardSize
  placeholder?: string
  disabled?: boolean
  state?: ValidationState
  label?: string
  hint?: string
}

export interface KrdsSelectOption {
  value: string | number
  label: string
  disabled?: boolean
}

export interface KrdsCheckboxProps {
  modelValue?: boolean | string[] | number[]
  value?: string | number
  label?: string
  description?: string
  disabled?: boolean
  size?: 'medium' | 'small'
  indeterminate?: boolean
}

export interface KrdsRadioProps {
  modelValue?: string | number | boolean
  value: string | number | boolean
  name: string
  label?: string
  description?: string
  disabled?: boolean
  size?: 'medium' | 'small'
}

export interface KrdsModalProps {
  modelValue?: boolean
  title?: string
  size?: 'small' | 'medium' | 'large'
  closable?: boolean
  closeOnBackdrop?: boolean
  closeOnEscape?: boolean
}

export interface KrdsAccordionItemProps {
  title: string
  disabled?: boolean
  defaultOpen?: boolean
}

export interface KrdsTabProps {
  modelValue?: string | number
  variant?: 'default' | 'fill' | 'line'
}

export interface KrdsTabPanelProps {
  name: string | number
  label: string
  disabled?: boolean
}

export interface KrdsIconProps {
  name: string
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'
  color?: string
  ariaLabel?: string
  ariaHidden?: boolean
}

export interface KrdsBadgeProps {
  count?: number
  max?: number
  dot?: boolean
  variant?: 'default' | 'primary' | 'danger'
}

export interface KrdsTagProps {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger'
  size?: 'small' | 'medium'
  removable?: boolean
}

export interface KrdsBreadcrumbItem {
  label: string
  href?: string
  active?: boolean
}

export interface KrdsPaginationProps {
  modelValue: number
  total: number
  perPage?: number
  maxVisible?: number
}

export interface KrdsTooltipProps {
  content: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  trigger?: 'hover' | 'click'
}
