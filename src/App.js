import { useEffect } from 'react'

import useFrame from 'useFrame'
import { PATHS } from 'constants'

import 'App.css'

function App() {
  const [frame] = useFrame()

  useEffect(() => {
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')
    const image = new Image()
    image.src = PATHS[frame]
    image.addEventListener('load', (e) => {
      ctx.drawImage(image, 0, 0)
    })
  }, [frame])

  return (
    <div className="container" id="container">
      <div className="canvas-container" id="canvas-container">
        <canvas className="canvas" id="canvas"></canvas>
      </div>
    </div>
  )
}

export default App
