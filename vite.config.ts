import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue';
import path from "path";
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import viteCompression from 'vite-plugin-compression'


// https://vitejs.dev/config/
export default ({ mode }) => {
  console.log('mode', loadEnv(mode, process.cwd()).VITE_BASE_URL)
  return defineConfig({
    base: './',
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      {
        ...viteCompression(),
        apply: 'build'
      }
    ],
    //这里进行配置别名
    resolve: {
      alias: {
        "@": path.resolve("./src"), // @代替src
        "#": path.resolve("./types"), // #代替types
      },
    },
    server: {
      host: '0.0.0.0',
      port: 8080,
      open: true,
      https: false,
      // proxy: {
      //   '/api': {
      //     target: 'https://53r23232p6.goho.co', //代理目标地址
      //     changeOrigin: true,
      //     ws: true,
      //     rewrite: (path: string) => path.replace(/\/api/, '')
      //   }
      // }
    },
    // 分包
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vue: ['vue', 'pinia', 'vue-router'],
            elementIcons: ['@element-plus/icons-vue']
          },
          // chunkFileNames: "static/js/[name]-[hash].js",
          // entryFileNames: "static/js/[name]-[hash].js",
          // assetFileNames: "static/[ext]/[name]-[hash].[ext]",
        }
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/style/index.scss";'
        }
      }
    }
  })
};
