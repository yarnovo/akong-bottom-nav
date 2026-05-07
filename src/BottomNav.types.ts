import type { ReactNode } from 'react'

/** 单个 nav 项 · 通常 5 项 · 中间一项可选 primary (类小红书 +) */
export interface BottomNavItem {
  /** 唯一 key · onSelect 回调用 */
  key: string
  /** label 文本 · 默认 text-[10px] · active 加粗 */
  label: string
  /** 默认状态 icon · ReactNode (svg / emoji / 字符) */
  icon: ReactNode
  /** active 状态 icon · 不传则两态共用 icon */
  iconActive?: ReactNode
  /** primary 项 · 中间突出圆按钮 · bg fg / text bg-inverse */
  primary?: boolean
}

export interface BottomNavProps {
  /** nav 项列表 · 通常 5 项 */
  items: BottomNavItem[]
  /** 受控当前激活 key · 不在 items 中的 key 视为无激活 */
  activeKey: string
  /** 点击 item 回调 · primary 也走同 callback */
  onSelect: (key: string) => void
  /** a11y · 默认 '底部导航' */
  ariaLabel?: string
}
