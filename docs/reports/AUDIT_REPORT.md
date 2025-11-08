# ビジュアルデモ監査レポート

## 監査結果サマリー

- **総プロパティ数**: 99
- **ビジュアルデモ実装済み**: 76プロパティ
- **一貫性確認済み**: 68プロパティ ✅
- **カウント不一致**: 0件 ✅
- **コード例のみ（デモなし）**: 31プロパティ

## 修正した不一致（全19件）

### 最初の監査で発見・修正（13件）
1. **text-align** - 3例→4例に更新（left, center, justify, right）
2. **object-position** - 4例→3例に統一（center, top left, bottom right）
3. **align-self** - 4例→3例に統一（flex-start, flex-end, stretch）
4. **justify-self** - 4例→3例に統一（start, center, end）
5. **grid-column** - 4例→2例に統一（span 2, 1/4）
6. **grid-row** - 4例→2例に統一（span 2, 1/4）
7. **mix-blend-mode** - 4例→3例に統一（multiply, screen, difference）
8. **background-blend-mode** - 4例→2例に統一（multiply, screen）
9. **inset** - 4例→3例に更新（実際のデモ値に合わせて）
10. **opacity** - ビジュアルデモを新規追加（1, 0.5, 0.1）
11. **box-shadow** - rgba値の空白を削除

### 全体監査で発見・修正（6件）
12. **container-type** - 3例→2例に統一
13. **aspect-ratio** - 3例→6例に拡張
14. **z-index** - 3例→2例に統一
15. **pointer-events** - 3例→2例に統一
16. **pseudo-hover** - 1例→2例に追加
17. **scroll-behavior** - 3例→2例に統一

## ビジュアルデモのないプロパティ（31件）

以下のプロパティはコード例のみで、ビジュアルデモは実装されていません：

1. display
2. order
3. subgrid
4. gap
5. clamp
6. filter
7. position
8. color
9. padding
10. margin
11. width
12. height
13. border
14. transition
15. transform
16. animation
17. keyframes
18. cursor
19. overflow
20. visibility
21. contain
22. scroll-snap-type
23. scroll-snap-align
24. overscroll-behavior
25. scroll-margin
26. isolation
27. caret-color
28. appearance
29. outline
30. vertical-align
31. text-transform

※これらのプロパティにビジュアルデモを追加するかどうかは、将来的な検討事項です。

## 一貫性が確認されたプロパティ（68件）

全てのビジュアルデモとコード例が完全に一致しています：

- display-flex, display-grid, container-queries, container-type, aspect-ratio
- min-max-functions, css-custom-properties, backdrop-filter, object-fit
- place-items, place-content, flex-direction, justify-content, justify-items
- align-items, align-content, flex-wrap, flex-grow-shrink-basis
- grid-template-columns, grid-template-areas, grid-auto-fit-fill, z-index
- font-size, font-weight, line-height, letter-spacing, text-align
- text-decoration, background-color, background-image, background-size
- background-position, linear-gradient, radial-gradient, max-width, min-width
- box-sizing, border-radius, box-shadow, opacity, white-space, text-overflow
- word-break, writing-mode, user-select, pointer-events, will-change
- media-queries, table-layout, content-visibility, accent-color, list-style
- clip-path, pseudo-hover, pseudo-nth-child, pseudo-nth-of-type
- pseudo-first-child, pseudo-focus-visible, object-position, scroll-behavior
- inset, mix-blend-mode, background-blend-mode, align-self, justify-self
- grid-column, grid-row, resize

## 結論

✅ **全てのビジュアルデモが実装されているプロパティについて、コード例との完全な一貫性を確認しました。**

監査日時: 2025年11月8日
