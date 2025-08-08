import * as React from "react"

import { cn } from "@/lib/utils"

export type TextareaProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, onInput, value, ...props }, ref) => {
    const internalRef = React.useRef<HTMLTextAreaElement | null>(null)

    const setRef = (node: HTMLTextAreaElement | null) => {
      internalRef.current = node
      if (typeof ref === "function") {
        ref(node)
      } else if (ref) {
        ;(ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = node
      }
    }

    const resize = (el: HTMLTextAreaElement) => {
      el.style.height = "auto"
      el.style.height = `${el.scrollHeight}px`
    }

    React.useEffect(() => {
      if (internalRef.current) {
        resize(internalRef.current)
      }
    }, [value])

    const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
      resize(e.currentTarget)
      onInput?.(e)
    }

    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none",
          className
        )}
        onInput={handleInput}
        ref={setRef}
        value={value}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
