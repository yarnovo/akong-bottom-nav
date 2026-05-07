/**
 * akong BottomNav · React Native 实现
 *
 * Metro bundler 默认按 `.native.tsx` 后缀解析 RN 端 · `.tsx` 解析 Web 端
 * 用方 `import { BottomNav } from '@akong/bottom-nav'` 自动取对应平台
 */

import { Pressable, Text, View, useColorScheme } from 'react-native'
import { SafeAreaView } from 'react-native'
import { tokens } from '@akong/tokens'
import type { BottomNavItem, BottomNavProps } from './BottomNav.types'

export function BottomNav(props: BottomNavProps) {
  const { items, activeKey, onSelect, ariaLabel = '底部导航' } = props

  const scheme = (useColorScheme() ?? 'light') as 'light' | 'dark'
  const t = scheme === 'dark' ? tokens.dark : tokens.light

  return (
    <SafeAreaView
      style={{
        backgroundColor: t.bgElevated,
        borderTopWidth: 1,
        borderTopColor: t.border,
      }}
    >
      <View
        accessibilityRole="tablist"
        accessibilityLabel={ariaLabel}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          minHeight: 52,
        }}
      >
        {items.map((item) => (
          <BottomNavButton
            key={item.key}
            item={item}
            active={item.key === activeKey}
            onSelect={onSelect}
            t={t}
          />
        ))}
      </View>
    </SafeAreaView>
  )
}

interface BottomNavButtonProps {
  item: BottomNavItem
  active: boolean
  onSelect: (key: string) => void
  t: typeof tokens.light
}

function BottomNavButton({ item, active, onSelect, t }: BottomNavButtonProps) {
  const { key, label, icon, iconActive, primary } = item

  if (primary) {
    return (
      <Pressable
        accessibilityRole="tab"
        accessibilityLabel={label}
        accessibilityState={{ selected: active }}
        onPress={() => onSelect(key)}
        style={({ pressed }: { pressed: boolean }) => ({
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: tokens.touchMin,
          opacity: pressed ? 0.7 : 1,
        })}
      >
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: tokens.radius.full,
            backgroundColor: t.fg,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: t.fgInverse, fontSize: tokens.text.lg }}>
            {active && iconActive ? iconActive : icon}
          </Text>
        </View>
      </Pressable>
    )
  }

  return (
    <Pressable
      accessibilityRole="tab"
      accessibilityLabel={label}
      accessibilityState={{ selected: active }}
      onPress={() => onSelect(key)}
      style={({ pressed }: { pressed: boolean }) => ({
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: tokens.touchMin,
        paddingVertical: tokens.space[1],
        opacity: pressed ? 0.7 : 1,
      })}
    >
      <Text
        style={{
          fontSize: tokens.text.base,
          color: active ? t.fg : t.fgSubtle,
        }}
      >
        {active && iconActive ? iconActive : icon}
      </Text>
      <Text
        style={{
          fontSize: tokens.text.xs,
          marginTop: tokens.space[1],
          color: active ? t.fg : t.fgSubtle,
          fontWeight: active ? tokens.weight.semibold : tokens.weight.regular,
        }}
      >
        {label}
      </Text>
    </Pressable>
  )
}

export default BottomNav
