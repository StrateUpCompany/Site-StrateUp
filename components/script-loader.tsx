"use client"

import { useEffect } from "react"

interface ScriptLoaderProps {
  src: string
  type?: string
  async?: boolean
  defer?: boolean
  id?: string
}

export default function ScriptLoader({
  src,
  type = "text/javascript",
  async = false,
  defer = false,
  id,
}: ScriptLoaderProps) {
  useEffect(() => {
    // Check if script already exists
    const existingScript = document.getElementById(id || src)
    if (existingScript) return

    const script = document.createElement("script")
    script.src = src
    script.type = type
    if (async) script.async = true
    if (defer) script.defer = true
    if (id) script.id = id

    document.body.appendChild(script)

    return () => {
      // Clean up
      if (id) {
        const scriptToRemove = document.getElementById(id)
        if (scriptToRemove) document.body.removeChild(scriptToRemove)
      }
    }
  }, [src, type, async, defer, id])

  return null
}
