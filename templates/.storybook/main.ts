/**
 * Storybook Configuration Template
 * This is a template file for the current Storybook 8 stable line with React + Vite.
 * Copy this to your project's .storybook/main.ts and adjust paths as needed.
 * @see https://storybook.js.org/docs/react/configure/overview
 */
// @ts-nocheck - Template file, module availability depends on project dependencies
import type { StorybookConfig } from '@storybook/react-vite'
import { mergeConfig } from 'vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  typescript: {
    check: true,
    reactDocgen: 'react-docgen',
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      build: {
        rollupOptions: {
          output: {
            manualChunks: undefined,
          },
        },
      },
    })
  },
}

export default config
