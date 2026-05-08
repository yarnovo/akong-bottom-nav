# @akong/bottom-nav

> ← 回 [akong design system](https://yarnovo.github.io/akong-core/) 总站

akong BottomNav · iOS 风底部 5 项导航栏 · 跨端 (Web + React Native)

## Demo

[GitHub Pages 演示](https://yarnovo.github.io/akong-bottom-nav/)

## 安装

```bash
npm i github:yarnovo/akong-bottom-nav github:yarnovo/akong-tokens
```

## Web

```tsx
import { BottomNav } from '@akong/bottom-nav'
import '@akong/bottom-nav/style.css'
import '@akong/tokens/style.css'  // 顶层引一次 token (整个 app 共用)

const items = [
  { key: 'home', label: '首页', icon: <HomeIcon />, iconActive: <HomeFilled /> },
  { key: 'mall', label: '市集', icon: <MallIcon /> },
  { key: 'add',  label: '发布', icon: '+', primary: true },
  { key: 'msg',  label: '消息', icon: <MsgIcon /> },
  { key: 'me',   label: '我',   icon: <MeIcon /> },
]

<BottomNav items={items} activeKey={activeKey} onSelect={setActiveKey} />
```

## React Native

```tsx
import { BottomNav } from '@akong/bottom-nav'

<BottomNav items={items} activeKey={activeKey} onSelect={setActiveKey} />
```

Metro bundler 自动按 `.native.tsx` 后缀解析 · 同 `import` 路径两端通用 · RN 端用 SafeAreaView 处理 bottom inset。

## API

### BottomNavProps

| Prop | Type | Default | 说明 |
|---|---|---|---|
| `items` | `BottomNavItem[]` | — | 必填 · 通常 5 项 |
| `activeKey` | `string` | — | 受控 · 当前激活 item 的 key |
| `onSelect` | `(key: string) => void` | — | 点击 item 回调 (primary 也走同 callback) |
| `ariaLabel` | `string` | `'底部导航'` | a11y |

### BottomNavItem

| Field | Type | Default | 说明 |
|---|---|---|---|
| `key` | `string` | — | 必填 · 唯一标识 |
| `label` | `string` | — | 必填 · 文本 (text-[10px] · active 加粗) |
| `icon` | `ReactNode` | — | 必填 · 默认状态 icon |
| `iconActive` | `ReactNode` | — | 可选 · active 状态 icon · 不传则两态共用 `icon` |
| `primary` | `boolean` | `false` | 中间突出圆按钮 (类小红书 +) |

## 设计原则

- **一份 props**：Web 跟 RN 共享 `BottomNav.types.ts`
- **两端实现**：`BottomNav.tsx` (Web · `<nav>` + `<button>`) + `BottomNav.native.tsx` (RN · `<SafeAreaView>` + `<Pressable>`)
- **触摸目标 ≥ 44pt**：每个 item 都满足 iOS HIG
- **iOS 安全区**：Web 用 `env(safe-area-inset-bottom)` · RN 用 `<SafeAreaView>`
- **极简反馈**：active 0.7 opacity (不缩放 · 不晃)
- **token 100% 接 @akong/tokens**：改一处 token 自动 update

## 视觉

| 状态 | Web | RN |
|---|---|---|
| default | text-fg-subtle | `t.fgSubtle` |
| active | text-fg + font-semibold | `t.fg` + weight semibold |
| pressed | opacity 0.7 | `pressed` opacity 0.7 |
| primary | 圆按钮 bg=fg / text=bg-inverse | `View` 圆角 bg=fg / text=fgInverse |
| focus (web) | `:focus-visible` outline | RN 默认 a11y focus |

## 布局

- `position: sticky; bottom: 0` (z-index `var(--ak-z-sticky)`)
- bg `var(--ak-bg-elevated)` · border-top 1px `var(--ak-border)`
- min-height 52px · 5 项 `justify-content: space-around`
- 内 `padding-bottom: env(safe-area-inset-bottom)` 兼容 iPhone 全面屏
