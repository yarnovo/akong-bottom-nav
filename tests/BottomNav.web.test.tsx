/**
 * Web 端组件测试 · vitest + @testing-library/react
 *
 * 6 件事:
 * - 渲染 5 个 item
 * - 点击触发 onSelect 带正确 key
 * - activeKey 反映在 className (active 项 font-semibold class)
 * - primary 项视觉特殊 (class 不同)
 * - 空 items 不崩
 * - aria-label 正确
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BottomNav } from '../src/BottomNav'
import { bottomNavScenarios, sampleItems } from '../src/BottomNav.behavior'
import type { BottomNavItem } from '../src/BottomNav.types'

describe('BottomNav (Web) · 渲染', () => {
  it('渲染 5 个 item', () => {
    render(<BottomNav items={sampleItems} activeKey="home" onSelect={() => {}} />)
    expect(screen.getAllByRole('tab')).toHaveLength(5)
  })

  it('每个 item 渲染 label (非 primary 项)', () => {
    render(<BottomNav items={sampleItems} activeKey="home" onSelect={() => {}} />)
    expect(screen.getByText('首页')).toBeInTheDocument()
    expect(screen.getByText('市集')).toBeInTheDocument()
    expect(screen.getByText('消息')).toBeInTheDocument()
    expect(screen.getByText('我')).toBeInTheDocument()
  })

  it('nav 有正确 aria-label (默认值)', () => {
    render(<BottomNav items={sampleItems} activeKey="home" onSelect={() => {}} />)
    expect(screen.getByRole('navigation', { name: '底部导航' })).toBeInTheDocument()
  })

  it('nav 接受自定义 ariaLabel', () => {
    render(
      <BottomNav
        items={sampleItems}
        activeKey="home"
        onSelect={() => {}}
        ariaLabel="主导航"
      />,
    )
    expect(screen.getByRole('navigation', { name: '主导航' })).toBeInTheDocument()
  })

  it('每个 button 有 aria-label = item.label', () => {
    render(<BottomNav items={sampleItems} activeKey="home" onSelect={() => {}} />)
    expect(screen.getByRole('tab', { name: '首页' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: '市集' })).toBeInTheDocument()
  })
})

describe('BottomNav (Web) · activeKey 反映', () => {
  it('active 项加 active class', () => {
    const { container } = render(
      <BottomNav items={sampleItems} activeKey="mall" onSelect={() => {}} />,
    )
    const activeButton = container.querySelector('.ak-bottom-nav__item--active')
    expect(activeButton).toBeTruthy()
    expect(activeButton?.getAttribute('aria-label')).toBe('市集')
  })

  it('非 active 项不带 active class', () => {
    const { container } = render(
      <BottomNav items={sampleItems} activeKey="mall" onSelect={() => {}} />,
    )
    const activeNodes = container.querySelectorAll('.ak-bottom-nav__item--active')
    expect(activeNodes).toHaveLength(1)
  })

  it('active 项 aria-selected = true', () => {
    render(<BottomNav items={sampleItems} activeKey="me" onSelect={() => {}} />)
    expect(screen.getByRole('tab', { name: '我' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tab', { name: '首页' })).toHaveAttribute('aria-selected', 'false')
  })

  it('iconActive 在 active 状态下显示', () => {
    const items: BottomNavItem[] = [
      { key: 'a', label: 'A', icon: 'i', iconActive: 'I' },
      { key: 'b', label: 'B', icon: 'j', iconActive: 'J' },
    ]
    render(<BottomNav items={items} activeKey="a" onSelect={() => {}} />)
    expect(screen.getByText('I')).toBeInTheDocument()
    expect(screen.getByText('j')).toBeInTheDocument()
    expect(screen.queryByText('i')).not.toBeInTheDocument()
    expect(screen.queryByText('J')).not.toBeInTheDocument()
  })

  it('未传 iconActive · active 状态用默认 icon', () => {
    const items: BottomNavItem[] = [{ key: 'a', label: 'A', icon: 'X' }]
    render(<BottomNav items={items} activeKey="a" onSelect={() => {}} />)
    expect(screen.getByText('X')).toBeInTheDocument()
  })
})

describe('BottomNav (Web) · primary 项视觉特殊', () => {
  it('primary 项加 primary class', () => {
    const { container } = render(
      <BottomNav items={sampleItems} activeKey="home" onSelect={() => {}} />,
    )
    const primaryButton = container.querySelector('.ak-bottom-nav__item--primary')
    expect(primaryButton).toBeTruthy()
    expect(primaryButton?.getAttribute('aria-label')).toBe('+')
  })

  it('primary 项不显示 label 文字 (圆按钮内只有 icon)', () => {
    const items: BottomNavItem[] = [
      { key: 'add', label: '添加按钮', icon: '+', primary: true },
    ]
    const { container } = render(
      <BottomNav items={items} activeKey="x" onSelect={() => {}} />,
    )
    expect(container.querySelector('.ak-bottom-nav__label')).toBeNull()
  })

  it('primary 项不带 active class (即使 active · 视觉以 primary 为准)', () => {
    const { container } = render(
      <BottomNav items={sampleItems} activeKey="add" onSelect={() => {}} />,
    )
    const primaryButton = container.querySelector('.ak-bottom-nav__item--primary')
    expect(primaryButton?.classList.contains('ak-bottom-nav__item--active')).toBe(false)
  })
})

describe('BottomNav (Web) · 行为契约 (共享 spec)', () => {
  for (const sc of bottomNavScenarios) {
    it(sc.name, () => {
      const onSelect = vi.fn()
      render(
        <BottomNav items={sc.items} activeKey={sc.activeKey} onSelect={onSelect} />,
      )
      const target = sc.items.find((i) => i.key === sc.pressKey)!
      fireEvent.click(screen.getByRole('tab', { name: target.label }))
      if (sc.expectKey === null) {
        expect(onSelect).not.toHaveBeenCalled()
      } else {
        expect(onSelect).toHaveBeenCalledWith(sc.expectKey)
        expect(onSelect).toHaveBeenCalledOnce()
      }
    })
  }
})

describe('BottomNav (Web) · 边界', () => {
  it('空 items 不崩', () => {
    render(<BottomNav items={[]} activeKey="" onSelect={() => {}} />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.queryAllByRole('tab')).toHaveLength(0)
  })

  it('activeKey 不在 items 中 · 不崩 · 没有 active 项', () => {
    const { container } = render(
      <BottomNav items={sampleItems} activeKey="nonexistent" onSelect={() => {}} />,
    )
    expect(container.querySelector('.ak-bottom-nav__item--active')).toBeNull()
  })

  it('1 个 item 也能渲染', () => {
    const items: BottomNavItem[] = [{ key: 'only', label: '唯一', icon: 'O' }]
    render(<BottomNav items={items} activeKey="only" onSelect={() => {}} />)
    expect(screen.getByRole('tab', { name: '唯一' })).toBeInTheDocument()
  })
})
