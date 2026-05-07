/**
 * 跨端行为契约 · Web + RN 都遵循
 *
 * 写法是"给定 props · 期望 · 该发生 / 不该发生"的纯描述
 * 各端测试 import 这份 spec 跑 · 行为强一致
 */

import type { BottomNavItem } from './BottomNav.types'

export interface SelectScenario {
  name: string
  /** 列表中的所有项 */
  items: BottomNavItem[]
  /** 当前激活的 key */
  activeKey: string
  /** 模拟点击的 item key (按 key 找按钮) */
  pressKey: string
  /** 期望 onSelect 收到的 key · null = 不触发 */
  expectKey: string | null
}

const sampleItems: BottomNavItem[] = [
  { key: 'home', label: '首页', icon: 'H' },
  { key: 'mall', label: '市集', icon: 'M' },
  { key: 'add', label: '+', icon: '+', primary: true },
  { key: 'msg', label: '消息', icon: 'N' },
  { key: 'me', label: '我', icon: 'U' },
]

/** 共享场景 · Web + RN 都跑 */
export const bottomNavScenarios: SelectScenario[] = [
  {
    name: '点普通项 · onSelect 收到 key',
    items: sampleItems,
    activeKey: 'home',
    pressKey: 'mall',
    expectKey: 'mall',
  },
  {
    name: '点已 active 项 · onSelect 仍收到 key (上层自决要不要重 fetch)',
    items: sampleItems,
    activeKey: 'home',
    pressKey: 'home',
    expectKey: 'home',
  },
  {
    name: '点 primary 项 · onSelect 收到 primary key',
    items: sampleItems,
    activeKey: 'home',
    pressKey: 'add',
    expectKey: 'add',
  },
  {
    name: '点最后一项',
    items: sampleItems,
    activeKey: 'home',
    pressKey: 'me',
    expectKey: 'me',
  },
]

export { sampleItems }
