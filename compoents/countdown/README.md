# 倒计时组件 (Countdown Component)

## 概述
这是一个WeChat小程序的倒计时组件，核心特点是使用**6x6圆形视图**作为分隔符，替代传统的冒号":"文本。

## 主要改造

### 原设计（iOS Objective-C参考）
- `colon1Label` 和 `colon2Label` 使用 `UILabel` 显示 ":"
- 位于小时:分钟和分钟:秒之间

### 新设计（WeChat小程序实现）
- 使用 `<view class="circular-separator">` 替代文本标签
- 圆形分隔符样式：
  - 尺寸：6px × 6px
  - 形状：圆形 (border-radius: 50%)
  - 颜色：#0C0C0D (深色)
  - 间距：左右各3px

## 文件结构

```
compoents/countdown/
├── index.js       # 组件逻辑（倒计时计算、定时器管理）
├── index.json     # 组件配置
├── index.wxml     # 组件模板（包含圆形分隔符）
└── index.wxss     # 组件样式（圆形分隔符样式定义）

pages/countdown-test/  # 测试页面
├── countdown-test.js
├── countdown-test.json
├── countdown-test.wxml
└── countdown-test.wxss
```

## 关键代码

### WXML 模板片段
```xml
<!-- 小时标签 -->
<view class="time-label">{{hours < 10 ? '0' + hours : hours}}</view>

<!-- 圆形分隔符 (替代冒号) -->
<view class="circular-separator"></view>

<!-- 分钟标签 -->
<view class="time-label">{{minutes < 10 ? '0' + minutes : minutes}}</view>
```

### WXSS 样式定义
```css
/* 圆形分隔符（替代冒号）：6x6 圆形 */
.circular-separator {
  width: 6px;
  height: 6px;
  background-color: #0C0C0D;
  border-radius: 50%; /* 圆形 */
  margin: 0 3px; /* 左右间距 */
  flex-shrink: 0;
}
```

## 使用示例

```xml
<countdown 
  endTimestamp="{{endTimestamp}}" 
  offset="{{offset}}"
  placeholder="Queda(n) {day} día(s) {hh_mm_ss} left"
  bind:timeup="onTimeUp">
</countdown>
```

## 组件属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| endTimestamp | Number | 0 | 倒计时结束时间戳（毫秒） |
| offset | Number | 0 | 时间偏移量（秒） |
| placeholder | String | '{day} {hh_mm_ss}' | 占位符文本 |
| customBackgroundColor | String | '#FFFFFF' | 自定义背景色 |
| customFontSize | Number | 12 | 自定义字体大小 |

## 组件事件

| 事件名 | 说明 | 返回值 |
|--------|------|--------|
| timeup | 倒计时结束时触发 | 无 |

## 测试

运行小程序并导航到"倒计时组件测试"页面，可以看到：
1. 示例1：带前缀和后缀的完整倒计时
2. 示例2：简单格式的倒计时
3. 示例3：只有时分秒的倒计时

所有示例都使用**6x6圆形分隔符**替代冒号。

## UI 对比

### 原来（不符合UI走查）
```
00 : 59 : 30
```

### 现在（符合UI走查）
```
00 ● 59 ● 30
```
（圆点代表6x6圆形视图）

## 技术细节

1. **响应式布局**：使用 flexbox 实现横向布局和垂直居中
2. **自适应宽度**：天数标签根据数字位数自动调整宽度
3. **定时器管理**：组件销毁时自动清除定时器，避免内存泄漏
4. **文本解析**：支持占位符解析（{day}、{hh_mm_ss}等）

## 兼容性

- 适用于WeChat小程序基础库 2.0+
- 支持所有小程序运行环境（iOS、Android、开发者工具）
