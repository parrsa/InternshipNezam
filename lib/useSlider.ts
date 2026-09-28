"use client"
import { useEffect, useState } from "react"





export const useSlider = (AutoSLide: boolean, ShowItems: number, totalLength: number) => {
    const [curr, setCurr] = useState<number>(0)
    const totalSlide = Math.ceil(totalLength / ShowItems)
    const slideWidth = 100 / ShowItems

    useEffect(() => {
        if (!AutoSLide) return;
        const interval = setInterval(() => {
            setCurr(prev => prev === totalSlide - 1 ? 0 : prev + 1)
        }, 2000)
        return () => clearInterval(interval)

    }, [AutoSLide, totalSlide])

    return { curr, setCurr, totalSlide, slideWidth }

}