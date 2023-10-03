import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue';
import path from "path";
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'


// https://vitejs.dev/config/
export default ({ mode }) => {
  console.log('mode', loadEnv(mode, process.cwd()).VITE_BASE_URL)
  return defineConfig({
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),],
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
      proxy: {
        '/api': {
          target: 'http://localhost:3000', //代理目标地址
          changeOrigin: true,
          ws: true,
          rewrite: (path: string) => path.replace(/\/api/, '')
        }
      }
    },
    // 分包
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vue: ['vue', 'pinia', 'vue-router'],
            elementIcons: ['@element-plus/icons-vue']
          }
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
