import { useState, useEffect, useCallback } from 'react'
import useHeight from 'useHeight'
import { PATHS } from 'constants'

const totalImages = PATHS.length

const useFrame = () => {
  const height = useHeight()
  const [breakpoints, setBreakpoints] = useState([])
  const [frame, setFrame] = useState(0)

  const setNextFrame = useCallback(() => {
    const currentScrollHeight = height
    const curr = frame // index / const next = curr + 1 / const prev = curr - 1

    const findIndex = (initialIndex, step) => {
      const nextStep = initialIndex + step
      const nextBreakpoint = breakpoints[nextStep]

      if (nextStep > breakpoints.length - 1) return initialIndex

      const condition = step
        ? currentScrollHeight < nextBreakpoint
        : nextBreakpoint < currentScrollHeight

      if (condition) {
        const distanceA = Math.abs(nextBreakpoint - currentScrollHeight)
        const distanceB = Math.abs(currentScrollHeight - breakpoints[initialIndex])
        return distanceA < distanceB ? nextStep : initialIndex
      }

      return findIndex(nextStep, step)
    }

    let nextIndex = curr
    if (currentScrollHeight > breakpoints[curr + 1]) nextIndex = findIndex(curr, 1)
    if (currentScrollHeight < breakpoints[curr - 1]) nextIndex = findIndex(curr, -1)
    setFrame(nextIndex)
  }, [height, breakpoints, frame])

  useEffect(() => {
    if (breakpoints.length) setNextFrame()
  }, [breakpoints, setNextFrame])

  useEffect(() => {
    const offsetHeight = document.getElementById('container').offsetHeight
    const frameHeight = document.getElementById('canvas-container').offsetHeight
    const maxScrollHeight = offsetHeight - frameHeight
    const snaps = PATHS.map((_, i) =>
      Math.round((i * maxScrollHeight) / totalImages)
    )
    setBreakpoints(snaps)
  }, [])

  return [frame]
}

export default useFrame
