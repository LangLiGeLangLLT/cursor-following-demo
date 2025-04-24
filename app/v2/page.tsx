'use client'

import React from 'react'
import TextEffect from './text-effect'
import { Button } from '@/components/ui/button'
import markdownit from 'markdown-it'

export const md = markdownit({ html: true, breaks: true })

const text = `
> Render as markdown content to show rich text!

Link: [Ant Design X](https://x.ant.design)

> Render as markdown content to show rich text!

Link: [Ant Design X](https://x.ant.design)

> Render as markdown content to show rich text!

Link: [Ant Design X](https://x.ant.design)

> Render as markdown content to show rich text!

Link: [Ant Design X](https://x.ant.design)

> Render as markdown content to show rich text!

Link: [Ant Design X](https://x.ant.design)
`

export default function Page() {
  const [isTyping, setIsTyping] = React.useState(false)

  return (
    <div className="space-y-4">
      <div>
        <Button onClick={() => setIsTyping(!isTyping)}>
          {isTyping ? 'Stop Typing' : 'Start Typing'}
        </Button>
      </div>
      <TextEffect
        text={text}
        typing={isTyping}
        onTypingComplete={() => console.log('complete')}
      />
    </div>
  )
}
