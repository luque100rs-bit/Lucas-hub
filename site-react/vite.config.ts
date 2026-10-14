import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

const single = process.env.SINGLE_FILE === '1'

/** No arquivo único, usa as fotos e o vídeo mais leves (src/assets-lite) para o arquivo abrir rápido no celular. */
const liteAssets: Plugin = {
  name: 'lite-assets',
  enforce: 'pre',
  async resolveId(source, importer, options) {
    if (!single || !/assets\/(fotos|video)\//.test(source)) return null
    return this.resolve(source.replace('/assets/', '/assets-lite/'), importer, { ...options, skipSelf: true })
  },
}

export default defineConfig({
  base: './',
  plugins: [liteAssets, react(), tailwindcss(), ...(single ? [viteSingleFile()] : [])],
  build: {
    // No arquivo único, tudo (fotos e vídeo) vai embutido; no build normal, só o que é pequeno.
    assetsInlineLimit: single ? 100_000_000 : 4096,
    chunkSizeWarningLimit: 700,
  },
})
