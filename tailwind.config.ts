import type { Config } from 'tailwindcss'

import path from 'path'
const fromRoot = (p: string) => path.join(__dirname, p)

export default {
  content: [fromRoot('./app/**/*.+(js|jsx|ts|tsx|mdx|md)')],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config
