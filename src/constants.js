const ASSETS_BASE_DIRECTORY = `${process.env.PUBLIC_URL}/assets`
const HELLO_PATH = `${ASSETS_BASE_DIRECTORY}/hello`
const CROSSING_PATH = `${ASSETS_BASE_DIRECTORY}/crossing`
const JUMPING_PATH = `${ASSETS_BASE_DIRECTORY}/jumping`

export const paths = [
  { dir: HELLO_PATH, n: 71 },
  { dir: CROSSING_PATH, n: 85 },
  { dir: JUMPING_PATH, n: 53 },
]

export const PATHS = paths.reduce((acc, { dir, n }) => {
  const dirArr = Array.from({ length: n }, (_, i) => {
    const frame = (i + 1).toString().padStart(3, '0')
    return `${dir}/ezgif-frame-${frame}.png`
  })
  return [...acc, ...dirArr]
}, [])
