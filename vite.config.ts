import { defineConfig } from 'vite'
import type { PluginOption } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        visualizer({ template: 'sunburst', open: true }) as unknown as PluginOption,
        // visualizer({
        //     gzipSize: true,
        //     brotliSize: true,
        //     emitFile: false,
        //     filename: "test.html", //分析图生成的文件名
        //     open: true //如果存在本地服务端口，将在打包后自动展示
        // }),
    ],
    resolve: {
        alias: {
            // 设置 src 的别名为 @
            "@": path.resolve(__dirname, "src"),
        },
    },
    server: {
        host: '0.0.0.0',
        port: 8080,
        proxy: {
            '/api': {
                target: 'http://localhost:3001',
                changeOrigin: true,
            }
        }
    },
    // build: {
    //     rollupOptions: {
    //         output: {
    //             manualChunks(id) {
    //                 // 将 antd 分割到一个单独的 chunk
    //                 if (id.includes('/antd/')) {
    //                     return 'antd-chunk';
    //                 }
        
    //                 // 将 react-dom 分割到一个单独的 chunk
    //                 if (id.includes('/react-dom/')) {
    //                     return 'reactDom-chunk';
    //                 }
        
    //                 // 将其他 node_modules 分割到一个 vendors chunk
    //                 if (id.includes('/node_modules/')) {
    //                     return 'vendors-chunk';
    //                 }
    //             }
    //         }
    //     }
    // }
})
