import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astroPlugin from 'eslint-plugin-astro';

export default tseslint.config(
  // Base JS rules
  js.configs.recommended,

  // TypeScript rules
  ...tseslint.configs.recommended,

  // Astro rules
  ...astroPlugin.configs.recommended,

  // Global ignores
  {
    ignores: ['dist/', '.astro/', 'node_modules/'],
  },

  // TypeScript file settings
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },

  // Astro file settings
  {
    files: ['**/*.astro'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
);
