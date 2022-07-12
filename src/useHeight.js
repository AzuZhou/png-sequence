import { useState, useEffect } from 'react'

const useHeight = () => {
  const [height, setHeight] = useState(0)

  useEffect(() => {
    const getHeight = () => setHeight(Math.round(window.scrollY))
    const handleScroll = () => window.requestAnimationFrame(getHeight)
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return height
}

export default useHeight
