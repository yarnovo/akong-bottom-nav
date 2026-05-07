import type { BottomNavProps } from './BottomNav.types'
import './BottomNav.css'

const cls = (...parts: (string | false | undefined)[]) => parts.filter(Boolean).join(' ')

/** akong BottomNav · Web · DOM `<button>` */
export function BottomNav(props: BottomNavProps) {
  const {
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    fullWidth = false,
    iconLeft,
    iconRight,
    children,
    onClick,
    onPress,
    type = 'button',
    ariaLabel,
  } = props

  const handle = () => {
    if (disabled || loading) return
    onClick?.()
    onPress?.()
  }

  return (
    <button
      type={type}
      aria-label={ariaLabel}
      aria-busy={loading || undefined}
      aria-disabled={disabled || undefined}
      disabled={disabled}
      onClick={handle}
      className={cls(
        'ak-bottom-nav',
        `ak-bottom-nav--${variant}`,
        `ak-bottom-nav--${size}`,
        fullWidth && 'ak-bottom-nav--full-width',
        loading && 'ak-bottom-nav--loading',
      )}
    >
      {iconLeft && <span className="ak-bottom-nav__icon">{iconLeft}</span>}
      {children && <span>{children}</span>}
      {iconRight && <span className="ak-bottom-nav__icon">{iconRight}</span>}
    </button>
  )
}

export default BottomNav
