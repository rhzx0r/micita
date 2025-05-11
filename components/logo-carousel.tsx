"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface LogoCarouselProps {
  className?: string
}

const logos = [
  { name: "Company A", logo: "/placeholder.svg?height=40&width=120" },
  { name: "Company B", logo: "/placeholder.svg?height=40&width=120" },
  { name: "Company C", logo: "/placeholder.svg?height=40&width=120" },
  { name: "Company D", logo: "/placeholder.svg?height=40&width=120" },
  { name: "Company E", logo: "/placeholder.svg?height=40&width=120" },
  { name: "Company F", logo: "/placeholder.svg?height=40&width=120" },
  { name: "Company G", logo: "/placeholder.svg?height=40&width=120" },
  { name: "Company H", logo: "/placeholder.svg?height=40&width=120" },
]

export function LogoCarousel({ className }: LogoCarouselProps) {
  const [isPaused, setIsPaused] = useState(false)
  const [containerWidth, setContainerWidth] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Calculate container width on mount and resize
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth)
      }
    }

    updateWidth()
    window.addEventListener("resize", updateWidth)
    return () => window.removeEventListener("resize", updateWidth)
  }, [])

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full overflow-hidden bg-background py-10", isPaused && "cursor-pointer", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-background to-transparent z-10" />

      <div className="flex items-center">
        {/* First set of logos */}
        <div
          className={cn(
            "flex min-w-full animate-scroll items-center justify-around gap-8 px-8",
            isPaused && "animate-pause",
          )}
          style={{
            animationDuration: `${logos.length * 5}s`,
          }}
        >
          {logos.map((logo, index) => (
            <div
              key={`logo-1-${index}`}
              className="flex h-16 w-32 items-center justify-center rounded-md px-4 grayscale transition-all duration-200 hover:grayscale-0 md:w-40"
            >
              <Image
                src={logo.logo || "/placeholder.svg"}
                alt={logo.name}
                width={120}
                height={40}
                className="max-h-10 w-auto object-contain"
              />
            </div>
          ))}
        </div>

        {/* Duplicated set of logos for seamless looping */}
        <div
          className={cn(
            "flex min-w-full animate-scroll items-center justify-around gap-8 px-8",
            isPaused && "animate-pause",
          )}
          style={{
            animationDuration: `${logos.length * 5}s`,
          }}
        >
          {logos.map((logo, index) => (
            <div
              key={`logo-2-${index}`}
              className="flex h-16 w-32 items-center justify-center rounded-md px-4 grayscale transition-all duration-200 hover:grayscale-0 md:w-40"
            >
              <Image
                src={logo.logo || "/placeholder.svg"}
                alt={logo.name}
                width={120}
                height={40}
                className="max-h-10 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
