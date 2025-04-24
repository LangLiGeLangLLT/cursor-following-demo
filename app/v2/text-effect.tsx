'use client'

import React from 'react'
import { md } from './page'

export default function TextEffect({
  text,
  typing,
  speed = 5,
  onTypingComplete,
}: {
  text: string
  typing?: boolean
  speed?: number
  onTypingComplete?: () => void
}) {
  const [displayedText, setDisplayedText] = React.useState('')
  const [currentIndex, setCurrentIndex] = React.useState(0)

  React.useEffect(() => {
    if (typing && currentIndex < text.length) {
      // 逐个字符显示
      const timer = setTimeout(() => {
        setDisplayedText(text.substring(0, currentIndex + 1))
        setCurrentIndex((prev) => prev + 1)
      }, speed) // 调整打字速度（毫秒）

      return () => clearTimeout(timer)
    } else if (typing && currentIndex === text.length) {
      // 打字完成后停止
      onTypingComplete?.()
      return
    } else if (!typing && currentIndex === text.length) {
      // 打字完成后重置
      const resetTimer = setTimeout(() => {
        setCurrentIndex(0)
        setDisplayedText('')
      }, 200) // 等待0.2秒后重置
      return () => clearTimeout(resetTimer)
    }
  }, [currentIndex, typing, text, speed, onTypingComplete])

  return <div dangerouslySetInnerHTML={{ __html: md.render(displayedText) }} />
}
