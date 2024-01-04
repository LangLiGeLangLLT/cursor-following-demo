'use client'

import { useEffect, useRef } from 'react'

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleInput = () => {
    if (!textareaRef.current) return

    textareaRef.current.style.height = 'auto'
    textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
  }

  const autoAppend = async () => {
    const delay = async (time: number) => {
      return new Promise((resolve) => {
        setTimeout(resolve, time)
      })
    }

    const transfer = (text: string) => {
      return text
    }

    const getLastTextNode = (node: Node): Node | null => {
      const children = node.childNodes
      for (let i = children.length - 1; i >= 0; i--) {
        const child = children[i]
        if (
          child.nodeType === Node.TEXT_NODE &&
          child.nodeValue &&
          /\S/.test(child.nodeValue)
        ) {
          child.nodeValue = child.nodeValue.replace(/\s+$/, '')
          return child
        }
        if (child.nodeType === Node.ELEMENT_NODE) {
          const last = getLastTextNode(child)
          if (last) {
            return last
          }
        }
      }
      return null
    }

    const updateCursor = () => {
      if (!textRef.current || !containerRef.current || !cursorRef.current) {
        return
      }

      const lastText = getLastTextNode(textRef.current)
      const textNode = document.createTextNode('\u200b')
      if (lastText) {
        lastText.parentNode?.appendChild(textNode)
      } else {
        textRef.current.appendChild(textNode)
      }

      const range = document.createRange()
      range.setStart(textNode, 0)
      range.setEnd(textNode, 0)
      const rect = range.getBoundingClientRect()

      const containerRect = containerRef.current.getBoundingClientRect()
      const x = rect.x - containerRect.x
      const y = rect.y - containerRect.y
      cursorRef.current.style.left = `${x}px`
      cursorRef.current.style.top = `${y}px`

      textNode.remove()
    }

    const content =
      '<p>JavaScript（JS）是一种具有函数优先特性的轻量级、解释型或者说即时编译型的编程语言。虽然作为 Web 页面中的脚本语言被人所熟知，但是它也被用到了很多非浏览器环境中，例如 Node.js、Apache CouchDB、Adobe Acrobat 等。进一步说，JavaScript 是一种基于原型、多范式、单线程的动态语言，并且支持面向对象、命令式和声明式（如函数式编程）风格。</p><br/><p>JavaScript 的动态特性包括运行时对象的构造、变量参数列表、函数变量、动态脚本创建（通过 eval）、对象内枚举（通过 for...in 和 Object 工具方法）和源代码恢复（JavaScript 函数会存储其源代码文本，可以使用 toString() 进行检索）。</p>'

    for (let i = 0; i <= content.length; i++) {
      const text = content.slice(0, i)
      const result = transfer(text)
      if (textRef.current) textRef.current.innerHTML = result
      updateCursor()
      await delay(50)
    }
  }

  useEffect(() => {
    autoAppend()
  }, [])

  return (
    <div className="container mx-auto space-y-4">
      <div className="p-4 border rounded">
        <div ref={containerRef} className="relative">
          <div ref={textRef}>0</div>
          <div
            ref={cursorRef}
            className="absolute left-0 top-0 inline-block bg-black"
          >
            0
          </div>
        </div>
      </div>

      <textarea
        ref={textareaRef}
        className="p-2 border rounded resize-none overflow-hidden"
        rows={1}
        onInput={handleInput}
      ></textarea>
    </div>
  )
}
