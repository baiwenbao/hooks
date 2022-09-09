import { defineConfig } from 'dumi';
import path from 'path';

export default defineConfig({
  publicPath: process.env.NODE_ENV === 'production' ? '/hooks/' : '/',
  history: {
    type: 'hash',
  },
  title: 'hooks',
  base: '/doc/',
  // favicon: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  // logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs',
  styles: ['https://cdnjs.cloudflare.com/ajax/libs/antd/4.18.5/antd.min.css'],
  alias: {
    '@baiwenbao/hooks/esm': path.resolve(__dirname, './src'),
  },
  // extraBabelPlugins: [
  //   ['import',
  //     {
  //       libraryName: 'antd',
  //       libraryDirectory: 'es',
  //       style: true
  //     }]
  // ]
  // more config: https://d.umijs.org/config
});
