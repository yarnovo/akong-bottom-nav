import type { BottomNavItem, BottomNavProps } from './BottomNav.types'
import './BottomNav.css'

const cls = (...parts: (string | false | undefined)[]) => parts.filter(Boolean).join(' ')

/** akong BottomNav · Web · iOS 风底部 5 项 · sticky bottom + safe-area inset */
export function BottomNav(props: BottomNavProps) {
  const { items, activeKey, onSelect, ariaLabel = '底部导航' } = props

  return (
    <nav className="ak-bottom-nav" aria-label={ariaLabel}>
      <ul className="ak-bottom-nav__list" role="tablist">
        {items.map((item) => (
          <BottomNavButton
            key={item.key}
            item={item}
            active={item.key === activeKey}
            onSelect={onSelect}
          />
        ))}
      </ul>
    </nav>
  )
}

interface BottomNavButtonProps {
  item: BottomNavItem
  active: boolean
  onSelect: (key: string) => void
}

function BottomNavButton({ item, active, onSelect }: BottomNavButtonProps) {
  const { key, label, icon, iconActive, primary } = item

  return (
    <li className="ak-bottom-nav__cell" role="presentation">
      <button
        type="button"
        role="tab"
        aria-selected={active}
        aria-label={label}
        onClick={() => onSelect(key)}
        className={cls(
          'ak-bottom-nav__item',
          primary && 'ak-bottom-nav__item--primary',
          active && !primary && 'ak-bottom-nav__item--active',
        )}
      >
        <span className="ak-bottom-nav__icon" aria-hidden="true">
          {active && iconActive ? iconActive : icon}
        </span>
        {!primary && <span className="ak-bottom-nav__label">{label}</span>}
      </button>
    </li>
  )
}

export default BottomNav
